#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="${1:-$PWD}"
cd "$PROJECT_ROOT"

GENERATOR="tools/gen_audio_lesson47_exercises.py"
COMPONENT="src/features/lesson-v2/exercises-v2/GridNavigationExerciseV2.tsx"
AUDIO_DIR="public/audio/teachers/taline/lesson_47_grid_navigation/exercises"

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_DIR=".lesson47_karaoke_final_backup_$STAMP"

mkdir -p "$BACKUP_DIR/tools"
mkdir -p "$BACKUP_DIR/$(dirname "$COMPONENT")"
mkdir -p "$BACKUP_DIR/$AUDIO_DIR"
mkdir -p "$AUDIO_DIR"
mkdir -p scripts/lesson47

[[ -f "$GENERATOR" ]] &&
  cp -p "$GENERATOR" "$BACKUP_DIR/$GENERATOR"

[[ -f "$COMPONENT" ]] &&
  cp -p "$COMPONENT" "$BACKUP_DIR/$COMPONENT"

cp -p "$AUDIO_DIR"/* \
  "$BACKUP_DIR/$AUDIO_DIR/" 2>/dev/null || true

echo "📦 النسخة الاحتياطية:"
echo "$BACKUP_DIR"

# ============================================================
# مولد نهائي:
# Edge TTS MP3 + VTT ثم تحويل VTT إلى كلمات متزامنة
# ============================================================

cat > "$GENERATOR" <<'PY'
#!/usr/bin/env python3

import json
import re
import shutil
import subprocess
import unicodedata
from pathlib import Path


VOICE = "ar-DZ-AminaNeural"
RATE = "-5%"
PITCH = "+6Hz"

QUESTION_FILES = {
    "ex1_direction": Path(
        "src/features/lesson-v2/content/"
        "lesson47_exercise1.ts"
    ),
    "ex2_destination": Path(
        "src/features/lesson-v2/content/"
        "lesson47_exercise2.ts"
    ),
    "ex3_missing_arrow": Path(
        "src/features/lesson-v2/content/"
        "lesson47_exercise3.ts"
    ),
    "ex4_route_code": Path(
        "src/features/lesson-v2/content/"
        "lesson47_exercise4.ts"
    ),
}


def extract_question(path: Path) -> str:
    source = path.read_text(encoding="utf-8")

    match = re.search(
        r'const\s+question\s*=\s*'
        r'\n?\s*"([^"]+)"\s*;',
        source,
        flags=re.MULTILINE,
    )

    if not match:
        raise RuntimeError(
            f"تعذر استخراج السؤال من {path}"
        )

    return match.group(1).strip()


def parse_timestamp(value: str) -> int:
    value = value.strip().replace(",", ".")
    parts = value.split(":")

    if len(parts) == 3:
        hours = int(parts[0])
        minutes = int(parts[1])
        seconds = float(parts[2])
    elif len(parts) == 2:
        hours = 0
        minutes = int(parts[0])
        seconds = float(parts[1])
    else:
        raise ValueError(
            f"توقيت VTT غير صالح: {value}"
        )

    return round(
        (
            hours * 3600
            + minutes * 60
            + seconds
        ) * 1000
    )


def clean_vtt_text(value: str) -> str:
    value = re.sub(
        r"<[^>]+>",
        "",
        value,
    )

    value = value.replace(
        "&nbsp;",
        " ",
    )

    value = re.sub(
        r"\s+",
        " ",
        value,
    )

    return value.strip()


def parse_vtt(path: Path) -> list[dict]:
    content = path.read_text(
        encoding="utf-8",
        errors="replace",
    )

    lines = content.splitlines()
    cues: list[dict] = []
    index = 0

    while index < len(lines):
        line = lines[index].strip()

        if "-->" not in line:
            index += 1
            continue

        left, right = line.split(
            "-->",
            1,
        )

        start = parse_timestamp(
            left.strip(),
        )

        end_token = right.strip().split()[0]
        end = parse_timestamp(end_token)

        index += 1
        text_lines: list[str] = []

        while (
            index < len(lines)
            and lines[index].strip()
        ):
            text_lines.append(
                lines[index].strip()
            )
            index += 1

        text = clean_vtt_text(
            " ".join(text_lines)
        )

        if text and end > start:
            cues.append(
                {
                    "start": start,
                    "end": end,
                    "text": text,
                }
            )

        index += 1

    return cues


def letter_weight(word: str) -> float:
    letters = 0

    for character in word:
        if unicodedata.combining(character):
            continue

        if character.isalpha():
            letters += 1

    weight = max(letters, 1)

    if word.endswith(("،", "؛", ":")):
        weight += 1.6

    if word.endswith((".", "!", "؟")):
        weight += 2.8

    return float(weight)


def distribute_words(
    words: list[str],
    start: int,
    end: int,
) -> list[dict]:
    if not words:
        return []

    total_duration = max(
        end - start,
        len(words) * 180,
    )

    weights = [
        letter_weight(word)
        for word in words
    ]

    weight_sum = sum(weights)
    result: list[dict] = []
    current = start

    for index, word in enumerate(words):
        if index == len(words) - 1:
            word_end = end
        else:
            share = (
                total_duration
                * weights[index]
                / weight_sum
            )

            word_end = min(
                end,
                current + max(
                    180,
                    round(share),
                ),
            )

        duration = max(
            1,
            word_end - current,
        )

        result.append(
            {
                "text": word,
                "offset": int(current),
                "duration": int(duration),
            }
        )

        current = word_end

    return result


def normalize_word(value: str) -> str:
    result = []

    for character in value:
        if unicodedata.combining(character):
            continue

        if character.isalnum():
            result.append(character)

    return "".join(result)


def build_timings(
    question: str,
    cues: list[dict],
) -> list[dict]:
    canonical_words = question.split()

    if not cues:
        raise RuntimeError(
            "لم يحتوِ VTT على أي توقيت."
        )

    # عندما يعيد Edge TTS إشارة لكل كلمة.
    cue_words = [
        cue["text"].split()
        for cue in cues
    ]

    flat_cue_words = [
        word
        for group in cue_words
        for word in group
    ]

    if (
        len(cues) == len(canonical_words)
        and all(
            len(group) == 1
            for group in cue_words
        )
    ):
        return [
            {
                "text": canonical_words[index],
                "offset": int(cue["start"]),
                "duration": max(
                    1,
                    int(cue["end"])
                    - int(cue["start"]),
                ),
            }
            for index, cue in enumerate(cues)
        ]

    # مطابقة كلمات النص مع إشارات VTT بالتتابع.
    result: list[dict] = []
    canonical_index = 0

    for cue in cues:
        cue_text_words = cue["text"].split()

        if not cue_text_words:
            continue

        remaining = (
            len(canonical_words)
            - canonical_index
        )

        if remaining <= 0:
            break

        take_count = min(
            len(cue_text_words),
            remaining,
        )

        # قد تكون الإشارة جملة كاملة.
        if len(cues) == 1:
            take_count = remaining

        selected = canonical_words[
            canonical_index:
            canonical_index + take_count
        ]

        result.extend(
            distribute_words(
                selected,
                int(cue["start"]),
                int(cue["end"]),
            )
        )

        canonical_index += take_count

    # إن بقيت كلمات، توزع في آخر إشارة فعلية.
    if canonical_index < len(canonical_words):
        remaining_words = canonical_words[
            canonical_index:
        ]

        last_cue = cues[-1]

        extra_start = (
            result[-1]["offset"]
            + result[-1]["duration"]
            if result
            else int(last_cue["start"])
        )

        extra_end = max(
            int(last_cue["end"]),
            extra_start
            + len(remaining_words) * 320,
        )

        result.extend(
            distribute_words(
                remaining_words,
                extra_start,
                extra_end,
            )
        )

    if len(result) != len(canonical_words):
        # احتياط نهائي: توزيع النص الكامل داخل
        # المدى الحقيقي لأول وآخر إشارة VTT.
        result = distribute_words(
            canonical_words,
            int(cues[0]["start"]),
            int(cues[-1]["end"]),
        )

    return result


def verify_timings(
    question: str,
    timings: list[dict],
) -> None:
    expected_words = question.split()

    if len(timings) != len(expected_words):
        raise RuntimeError(
            "عدد كلمات JSON لا يساوي "
            "عدد كلمات السؤال."
        )

    previous_offset = -1

    for index, item in enumerate(timings):
        text = str(
            item.get("text", "")
        ).strip()

        offset = int(
            item.get("offset", -1)
        )

        duration = int(
            item.get("duration", 0)
        )

        if not text:
            raise RuntimeError(
                f"كلمة فارغة عند {index}"
            )

        if offset < previous_offset:
            raise RuntimeError(
                f"offset غير مرتب عند {index}"
            )

        if duration <= 0:
            raise RuntimeError(
                f"duration غير صالح عند {index}"
            )

        previous_offset = offset


def generate_one(
    output_dir: Path,
    key: str,
    question: str,
) -> None:
    output_dir.mkdir(
        parents=True,
        exist_ok=True,
    )

    temp_mp3 = (
        output_dir / f".{key}.new.mp3"
    )

    temp_vtt = (
        output_dir / f".{key}.new.vtt"
    )

    temp_json = (
        output_dir / f".{key}.new.json"
    )

    final_mp3 = (
        output_dir / f"{key}.mp3"
    )

    final_json = (
        output_dir / f"{key}.json"
    )

    for temporary in (
        temp_mp3,
        temp_vtt,
        temp_json,
    ):
        temporary.unlink(
            missing_ok=True,
        )

    command = [
        "edge-tts",
        "--voice",
        VOICE,
        "--rate",
        RATE,
        "--pitch",
        PITCH,
        "--text",
        question,
        "--write-media",
        str(temp_mp3),
        "--write-subtitles",
        str(temp_vtt),
    ]

    print(f"\n🔊 {key}")
    print(f"   {question}")

    completed = subprocess.run(
        command,
        text=True,
        capture_output=True,
    )

    if completed.returncode != 0:
        raise RuntimeError(
            "فشل edge-tts:\n"
            + completed.stderr
        )

    if (
        not temp_mp3.exists()
        or temp_mp3.stat().st_size < 500
    ):
        raise RuntimeError(
            f"{key}: ملف MP3 غير صالح."
        )

    if (
        not temp_vtt.exists()
        or temp_vtt.stat().st_size == 0
    ):
        raise RuntimeError(
            f"{key}: ملف VTT غير صالح."
        )

    cues = parse_vtt(temp_vtt)

    timings = build_timings(
        question,
        cues,
    )

    verify_timings(
        question,
        timings,
    )

    temp_json.write_text(
        json.dumps(
            timings,
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    temp_mp3.replace(final_mp3)
    temp_json.replace(final_json)
    temp_vtt.unlink(missing_ok=True)

    print(
        f"✅ {len(timings)} كلمة متزامنة "
        f"من {len(cues)} إشارة VTT"
    )


def main() -> None:
    if shutil.which("edge-tts") is None:
        raise RuntimeError(
            "أمر edge-tts غير موجود. "
            "نفّذ: pip install edge-tts"
        )

    root = Path.cwd()

    output_dir = (
        root
        / "public"
        / "audio"
        / "teachers"
        / "taline"
        / "lesson_47_grid_navigation"
        / "exercises"
    )

    for key, question_file in QUESTION_FILES.items():
        question = extract_question(
            question_file
        )

        generate_one(
            output_dir,
            key,
            question,
        )

    print(
        "\n✅ اكتمل توليد صوت وكاريوكي "
        "تمارين الدرس 47."
    )


if __name__ == "__main__":
    main()
PY

chmod +x "$GENERATOR"

# ============================================================
# تعديل مشغل الكاريوكي:
# يعتمد بداية الكلمة الحالية وبداية الكلمة التالية
# ============================================================

python - "$COMPONENT" <<'PY'
from pathlib import Path
import sys

path = Path(sys.argv[1])
text = path.read_text(encoding="utf-8")

# لا نريد تقديمًا ثابتًا يفسد التوقيت.
text = text.replace(
    "const KARAOKE_LEAD_MS = 70;",
    "const KARAOKE_LEAD_MS = 0;",
)

text = text.replace(
    "const KARAOKE_LEAD_MS = 60;",
    "const KARAOKE_LEAD_MS = 0;",
)

text = text.replace(
    "const KARAOKE_LEAD_MS = 90;",
    "const KARAOKE_LEAD_MS = 0;",
)

# نسخة كاش جديدة نهائية.
text = re_text = text

import re

text = re.sub(
    r'const AUDIO_CACHE_VERSION\s*=\s*"[^"]+";',
    'const AUDIO_CACHE_VERSION = '
    '"lesson47-exercises-karaoke-final-v5";',
    text,
)

# تعديل نهاية الكلمة بحيث تستمر حتى بداية التالية.
old = """        const end = Math.min(
          start + duration + 100,
          nextStart + 20,
        );"""

new = """        const end =
          Number.isFinite(nextStart)
            ? Math.max(
                start + duration,
                nextStart,
              )
            : start + duration + 120;"""

if old in text:
    text = text.replace(
        old,
        new,
        1,
    )

old2 = """        const end = Math.min(
          start + duration + 130,
          nextStart + 40,
        );"""

if old2 in text:
    text = text.replace(
        old2,
        new,
        1,
    )

path.write_text(
    text,
    encoding="utf-8",
)

print("✅ تم تحديث مشغل الكاريوكي.")
PY

echo
echo "🔊 توليد MP3 وJSON جديدين..."

python "$GENERATOR"

# ============================================================
# تحقق صارم
# ============================================================

echo
echo "🔎 التحقق النهائي..."

python - <<'PY'
import json
import re
from pathlib import Path

questions = {
    "ex1_direction": Path(
        "src/features/lesson-v2/content/"
        "lesson47_exercise1.ts"
    ),
    "ex2_destination": Path(
        "src/features/lesson-v2/content/"
        "lesson47_exercise2.ts"
    ),
    "ex3_missing_arrow": Path(
        "src/features/lesson-v2/content/"
        "lesson47_exercise3.ts"
    ),
    "ex4_route_code": Path(
        "src/features/lesson-v2/content/"
        "lesson47_exercise4.ts"
    ),
}

base = Path(
    "public/audio/teachers/taline/"
    "lesson_47_grid_navigation/exercises"
)

for key, source_path in questions.items():
    source = source_path.read_text(
        encoding="utf-8"
    )

    match = re.search(
        r'const\s+question\s*=\s*'
        r'\n?\s*"([^"]+)"\s*;',
        source,
        flags=re.MULTILINE,
    )

    assert match, source_path

    question = match.group(1).strip()
    expected_words = question.split()

    mp3 = base / f"{key}.mp3"
    timing_file = base / f"{key}.json"

    assert mp3.exists(), mp3
    assert mp3.stat().st_size > 500, mp3
    assert timing_file.exists(), timing_file

    timings = json.loads(
        timing_file.read_text(
            encoding="utf-8"
        )
    )

    assert len(timings) == len(
        expected_words
    ), (
        key,
        len(expected_words),
        len(timings),
    )

    previous_offset = -1

    for index, item in enumerate(timings):
        assert (
            item["text"]
            == expected_words[index]
        ), (
            key,
            index,
            item["text"],
            expected_words[index],
        )

        offset = int(item["offset"])
        duration = int(item["duration"])

        assert offset >= previous_offset
        assert duration > 0

        previous_offset = offset

    first_offset = int(
        timings[0]["offset"]
    )

    last_end = (
        int(timings[-1]["offset"])
        + int(timings[-1]["duration"])
    )

    print(
        f"✅ {key}: "
        f"{len(timings)} كلمة، "
        f"{first_offset}ms → {last_end}ms"
    )

print(
    "✅ جميع أسئلة الدرس 47 تملك "
    "MP3 وJSON جديدين ومتطابقين."
)
PY

echo
echo "🏗️ تشغيل البناء..."

npm run build

# ============================================================
# حفظ الإصلاح الدائم
# ============================================================

cp -p "$GENERATOR" \
  scripts/lesson47/gen_audio_lesson47_exercises.py

cp -p "$0" \
  scripts/lesson47/fix_lesson47_exercises_karaoke_final.sh

printf '%s\n' \
  '' \
  '## إصلاح كاريوكي تمارين الدرس 47 — النسخة النهائية' \
  '' \
  '- تم تجاوز مشكلة WordBoundary = 0 في Edge TTS على Termux.' \
  '- أصبح الصوت يُولد بواسطة edge-tts مع ملف VTT فعلي.' \
  '- تُحوّل إشارات VTT إلى توقيت كلمات السؤال.' \
  '- لا يتم استعمال ملفات MP3 أو JSON القديمة عند فشل التوليد.' \
  '- لا يوجد KARAOKE_LEAD_MS تقديري.' \
  '- تم تغيير رمز الكاش لمنع Chrome من تشغيل نسخة قديمة.' \
  >> handoff/lesson47_handoff.md

printf '%s\n' \
  '' \
  '### الإصلاح النهائي لكاريوكي تمارين الدرس 47' \
  '' \
  'تم توليد MP3 وVTT معًا، ثم تحويل توقيت VTT إلى ملف كلمات متزامن مطابق لنص السؤال.' \
  >> resume.md

echo
echo "📤 حفظ الإصلاح في Git..."

git add -- \
  "$GENERATOR" \
  "$COMPONENT" \
  "$AUDIO_DIR" \
  scripts/lesson47 \
  handoff/lesson47_handoff.md \
  resume.md

git diff --cached --check

if git diff --cached --quiet; then
  echo "ℹ️ لا توجد تغييرات جديدة للـ commit."
else
  git commit \
    -m "fix(lesson47): finalize exercise audio karaoke sync"
fi

BRANCH="$(git branch --show-current)"

if git remote get-url origin >/dev/null 2>&1; then
  if git rev-parse \
    --abbrev-ref \
    --symbolic-full-name \
    '@{upstream}' >/dev/null 2>&1
  then
    git push
  else
    git push -u origin "$BRANCH"
  fi
else
  echo "⚠️ لا يوجد remote باسم origin."
fi

echo
echo "✅ انتهى الإصلاح النهائي بنجاح."
echo "✅ تم توليد صوت جديد."
echo "✅ تم توليد توقيت كلمات جديد من VTT."
echo "✅ نجح التحقق والبناء."
echo "✅ تم حفظ الإصلاح في Git."
echo "📁 النسخة الاحتياطية: $BACKUP_DIR"
