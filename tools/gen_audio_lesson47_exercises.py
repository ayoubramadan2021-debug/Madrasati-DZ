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
