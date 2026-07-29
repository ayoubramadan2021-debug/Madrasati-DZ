#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="${1:-$PWD}"
cd "$PROJECT_ROOT"

APP="src/App.tsx"
GRID="src/features/lesson-v2/exercises-v2/GridNavigationExerciseV2.tsx"
END_PAGE="src/pages/Lesson47ExercisesPage.tsx"
LESSON46="src/features/lesson-v2/exercises-v2/Lesson46HeartBeats2Exercises.tsx"
AUDIO_TOOL="tools/gen_audio_lesson47_exercises.py"

AUDIO_DIR="public/audio/teachers/taline/lesson_47_grid_navigation/exercises"

for file in \
  "$APP" \
  "$GRID" \
  "$END_PAGE" \
  "$LESSON46" \
  "$AUDIO_TOOL"
do
  if [[ ! -f "$file" ]]; then
    echo "❌ الملف غير موجود: $file"
    exit 1
  fi
done

if ! grep -q 'path="/lesson-v2/lesson47"' "$APP"; then
  echo "❌ المسار /lesson-v2/lesson47 غير مسجل في App.tsx"
  exit 1
fi

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_DIR=".lesson47_final_polish_backup_$STAMP"

mkdir -p "$BACKUP_DIR"

FILES=(
  "$GRID"
  "$END_PAGE"
  "$LESSON46"
  "$AUDIO_TOOL"
)

AUDIO_FILES=(
  "$AUDIO_DIR/ex1_direction.mp3"
  "$AUDIO_DIR/ex1_direction.json"
  "$AUDIO_DIR/ex2_destination.mp3"
  "$AUDIO_DIR/ex2_destination.json"
  "$AUDIO_DIR/ex3_missing_arrow.mp3"
  "$AUDIO_DIR/ex3_missing_arrow.json"
  "$AUDIO_DIR/ex4_route_code.mp3"
  "$AUDIO_DIR/ex4_route_code.json"
)

echo "📦 إنشاء نسخة احتياطية: $BACKUP_DIR"

for file in "${FILES[@]}" "${AUDIO_FILES[@]}"; do
  if [[ -f "$file" ]]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$file")"
    cp -p "$file" "$BACKUP_DIR/$file"
  fi
done

PATCHER="$PROJECT_ROOT/.fix_l47_sync_end_link.py"
VERIFY="$PROJECT_ROOT/.verify_l47_karaoke.py"

trap 'rm -f "$PATCHER" "$VERIFY"' EXIT

cat > "$PATCHER" <<'PY'
from pathlib import Path


def read(path: str) -> str:
    return Path(path).read_text(encoding="utf-8")


def write(path: str, text: str) -> None:
    Path(path).write_text(text, encoding="utf-8")


def replace_required(
    text: str,
    old: str,
    new: str,
    label: str,
) -> str:
    if new in text:
        print(f"ℹ️ مطبق مسبقًا: {label}")
        return text

    if old not in text:
        raise SystemExit(
            f"❌ لم أجد المقطع المطلوب: {label}"
        )

    print(f"✅ {label}")
    return text.replace(old, new, 1)


# ==================================================
# 1. إصلاح مزامنة الكاريوكي
# ==================================================

grid_path = (
    "src/features/lesson-v2/exercises-v2/"
    "GridNavigationExerciseV2.tsx"
)

grid = read(grid_path)

if "LESSON47_KARAOKE_RAF_SYNC" not in grid:
    grid = replace_required(
        grid,
        "const FEEDBACK_DELAY = 760;",
        '''const FEEDBACK_DELAY = 760;

// LESSON47_KARAOKE_RAF_SYNC
// تقديم خفيف يعوض زمن رسم الواجهة، مع كسر كاش الصوت القديم.
const KARAOKE_LEAD_MS = 70;
const AUDIO_CACHE_VERSION = "lesson47-sync-v3";''',
        "إضافة إعدادات مزامنة الكاريوكي",
    )

    grid = replace_required(
        grid,
        '''    let cancelled = false;

    const audioSource =
      `${audio_base}/${item.question_audio_key}.mp3`;

    const boundarySource =
      `${audio_base}/${item.question_audio_key}.json`;''',
        '''    let cancelled = false;
    let karaokeFrame = 0;

    const cacheToken = encodeURIComponent(
      `${AUDIO_CACHE_VERSION}-${item.question_audio_key}`,
    );

    const audioSource =
      `${audio_base}/${item.question_audio_key}.mp3?v=${cacheToken}`;

    const boundarySource =
      `${audio_base}/${item.question_audio_key}.json?v=${cacheToken}`;''',
        "كسر كاش MP3 وWordBoundary",
    )

    grid = replace_required(
        grid,
        "    fetch(boundarySource)",
        '''    fetch(boundarySource, {
      cache: "no-store",
    })''',
        "منع كاش ملف WordBoundary",
    )

    old_callbacks = '''    const onPlay = () => {
      if (!cancelled) {
        setIsPlaying(true);
      }
    };

    const onPause = () => {
      if (!cancelled) {
        setIsPlaying(false);
      }
    };

    const onEnded = () => {
      if (!cancelled) {
        setIsPlaying(false);
        setActiveWordIndex(-1);
      }
    };

    const onTimeUpdate = () => {
      if (cancelled) {
        return;
      }

      const currentMs = audio.currentTime * 1000;
      const words = boundariesRef.current;
      let nextIndex = -1;

      for (
        let index = 0;
        index < words.length;
        index += 1
      ) {
        const word = words[index];
        const start = Number(word.offset) || 0;
        const duration = Math.max(
          Number(word.duration) || 0,
          180,
        );
        const nextStart =
          index < words.length - 1
            ? Number(words[index + 1].offset)
            : Number.POSITIVE_INFINITY;
        const end = Math.min(
          start + duration + 130,
          nextStart + 40,
        );

        if (
          currentMs >= start &&
          currentMs < end
        ) {
          nextIndex = index;
          break;
        }
      }

      setActiveWordIndex(nextIndex);
    };'''

    new_callbacks = '''    const updateKaraoke = () => {
      if (cancelled) {
        return;
      }

      const currentMs = Math.max(
        0,
        audio.currentTime * 1000 + KARAOKE_LEAD_MS,
      );

      const words = boundariesRef.current;
      let nextIndex = -1;

      for (
        let index = 0;
        index < words.length;
        index += 1
      ) {
        const word = words[index];
        const start = Number(word.offset) || 0;
        const duration = Math.max(
          Number(word.duration) || 0,
          180,
        );

        const nextStart =
          index < words.length - 1
            ? Number(words[index + 1].offset)
            : Number.POSITIVE_INFINITY;

        const end = Math.min(
          start + duration + 100,
          nextStart + 20,
        );

        if (
          currentMs >= start &&
          currentMs < end
        ) {
          nextIndex = index;
          break;
        }
      }

      setActiveWordIndex(nextIndex);

      if (!audio.paused && !audio.ended) {
        karaokeFrame =
          window.requestAnimationFrame(
            updateKaraoke,
          );
      }
    };

    const onPlay = () => {
      if (!cancelled) {
        setIsPlaying(true);

        window.cancelAnimationFrame(
          karaokeFrame,
        );

        karaokeFrame =
          window.requestAnimationFrame(
            updateKaraoke,
          );
      }
    };

    const onPause = () => {
      window.cancelAnimationFrame(
        karaokeFrame,
      );

      if (!cancelled) {
        setIsPlaying(false);
      }
    };

    const onEnded = () => {
      window.cancelAnimationFrame(
        karaokeFrame,
      );

      if (!cancelled) {
        setIsPlaying(false);
        setActiveWordIndex(-1);
      }
    };'''

    grid = replace_required(
        grid,
        old_callbacks,
        new_callbacks,
        "استبدال timeupdate بمزامنة requestAnimationFrame",
    )

    old_time_listener = '''    audio.addEventListener("ended", onEnded);
    audio.addEventListener(
      "timeupdate",
      onTimeUpdate,
    );'''

    if old_time_listener in grid:
        grid = grid.replace(
            old_time_listener,
            '''    audio.addEventListener("ended", onEnded);''',
            1,
        )
        print("✅ إزالة مستمع timeupdate البطيء")
    elif "onTimeUpdate" not in grid:
        print("ℹ️ مستمع timeupdate محذوف مسبقًا")
    else:
        raise SystemExit(
            "❌ تعذر حذف مستمع timeupdate"
        )

    grid = replace_required(
        grid,
        '''      window.clearTimeout(autoTimer);
      audio.pause();''',
        '''      window.clearTimeout(autoTimer);
      window.cancelAnimationFrame(karaokeFrame);
      audio.pause();''',
        "تنظيف إطار الكاريوكي",
    )

    old_time_cleanup = '''      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener(
        "timeupdate",
        onTimeUpdate,
      );'''

    if old_time_cleanup in grid:
        grid = grid.replace(
            old_time_cleanup,
            '''      audio.removeEventListener("ended", onEnded);''',
            1,
        )
        print("✅ تنظيف مستمعات الصوت")
    elif "onTimeUpdate" not in grid:
        print(
            "ℹ️ تنظيف مستمع timeupdate مطبق مسبقًا"
        )
    else:
        raise SystemExit(
            "❌ تعذر تنظيف مستمع timeupdate"
        )
else:
    print("ℹ️ إصلاح الكاريوكي مطبق مسبقًا")

write(grid_path, grid)


# ==================================================
# 2. تصغير صفحة أحسنت
# ==================================================

end_path = "src/pages/Lesson47ExercisesPage.tsx"
end = read(end_path)

end_replacements = [
    (
        'fontSize: "clamp(94px,27vw,150px)"',
        'fontSize: "clamp(62px,17vw,88px)"',
        "تصغير الكأس",
    ),
    (
        "marginBottom: 10,",
        "marginBottom: 2,",
        "تقليل فراغ الكأس",
    ),
    (
        'fontSize: "clamp(35px,8vw,52px)"',
        'fontSize: "clamp(28px,6.8vw,40px)"',
        "تصغير عنوان النهاية",
    ),
    (
        "minHeight: 84,",
        "minHeight: 68,",
        "تصغير أزرار النهاية",
    ),
    (
        'fontSize: "clamp(23px,5.8vw,32px)"',
        'fontSize: "clamp(20px,4.9vw,27px)"',
        "تصغير نص الأزرار",
    ),
]

for old, new, label in end_replacements:
    if new in end:
        print(f"ℹ️ مطبق مسبقًا: {label}")
    elif old in end:
        end = end.replace(old, new, 1)
        print(f"✅ {label}")
    else:
        print(
            f"⚠️ لم أجد قيمة {label}؛ "
            "لم ألمس بقية التصميم"
        )

write(end_path, end)


# ==================================================
# 3. ربط تمارين الدرس 46 بالدرس 47
# ==================================================

lesson46_path = (
    "src/features/lesson-v2/exercises-v2/"
    "Lesson46HeartBeats2Exercises.tsx"
)

lesson46 = read(lesson46_path)

old_route = "/world2-lesson/47"
new_route = "/lesson-v2/lesson47"

if old_route in lesson46:
    count = lesson46.count(old_route)

    lesson46 = lesson46.replace(
        old_route,
        new_route,
    )

    print(
        "✅ ربط الدرس 46 بالدرس 47 مباشرة "
        f"({count} مواضع)"
    )
elif new_route in lesson46:
    print(
        "ℹ️ ربط الدرس 46 بالدرس 47 "
        "مطبق مسبقًا"
    )
else:
    raise SystemExit(
        "❌ لم أجد مسار الدرس التالي "
        "داخل تمارين الدرس 46"
    )

write(lesson46_path, lesson46)
PY

python "$PATCHER"

echo
echo "🔊 إعادة توليد صوت أسئلة الدرس 47 وWordBoundary..."

if python -c "import edge_tts" >/dev/null 2>&1; then
  python "$AUDIO_TOOL"
else
  echo "❌ مكتبة edge_tts غير مثبتة."
  echo "نفّذ: pip install edge-tts"
  exit 1
fi

cat > "$VERIFY" <<'PY'
import json
from pathlib import Path

base = Path(
    "public/audio/teachers/taline/"
    "lesson_47_grid_navigation/exercises"
)

keys = [
    "ex1_direction",
    "ex2_destination",
    "ex3_missing_arrow",
    "ex4_route_code",
]

for key in keys:
    mp3 = base / f"{key}.mp3"
    timing_file = base / f"{key}.json"

    if not mp3.exists() or mp3.stat().st_size == 0:
        raise SystemExit(
            f"❌ ملف الصوت غير صالح: {mp3}"
        )

    if not timing_file.exists():
        raise SystemExit(
            f"❌ ملف الكاريوكي مفقود: {timing_file}"
        )

    words = json.loads(
        timing_file.read_text(encoding="utf-8")
    )

    if not isinstance(words, list) or not words:
        raise SystemExit(
            f"❌ ملف الكاريوكي فارغ: {key}"
        )

    previous_offset = -1

    for index, word in enumerate(words):
        text = str(word.get("text", "")).strip()
        offset = int(word.get("offset", -1))
        duration = int(word.get("duration", 0))

        if not text:
            raise SystemExit(
                f"❌ كلمة فارغة في {key}: {index}"
            )

        if offset < 0 or offset < previous_offset:
            raise SystemExit(
                f"❌ ترتيب زمني خاطئ في {key}: {index}"
            )

        if duration <= 0:
            raise SystemExit(
                f"❌ مدة غير صالحة في {key}: {index}"
            )

        previous_offset = offset

    last = words[-1]
    last_end = (
        int(last["offset"]) +
        int(last["duration"])
    )

    print(
        f"✅ {key}: "
        f"{len(words)} كلمة، "
        f"النهاية {last_end}ms"
    )

print("✅ جميع ملفات WordBoundary سليمة ومتسلسلة.")
PY

echo
echo "🔎 التحقق البرمجي من ملفات الكاريوكي..."
python "$VERIFY"

echo
echo "🔎 التحقق من مسار الدرس 46..."

grep -n \
  '/lesson-v2/lesson47' \
  "$LESSON46"

if grep -q '/world2-lesson/47' "$LESSON46"; then
  echo "❌ بقي المسار القديم داخل الدرس 46"
  exit 1
fi

echo
echo "🏗️ تشغيل البناء..."
npm run build

echo
echo "✅ اكتملت الإصلاحات:"
echo "✅ مزامنة أكثر دقة عبر requestAnimationFrame."
echo "✅ منع خلط الصوت القديم مع WordBoundary الجديد."
echo "✅ تصغير كأس وأزرار صفحة أحسنت."
echo "✅ ربط الدرس 46 مباشرة بالدرس 47."
echo "📁 النسخة الاحتياطية: $BACKUP_DIR"
