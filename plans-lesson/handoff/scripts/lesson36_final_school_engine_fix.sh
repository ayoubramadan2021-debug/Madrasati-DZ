#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
PAGE="$PROJECT/src/pages/LessonExercisesPage.tsx"
CONTENT="$PROJECT/src/features/lesson-v2/content"
AUDIO="$PROJECT/public/audio/teachers/khalil/lesson_36_amusement_sorting/exercises"
BACKUP="$PROJECT/backups/lesson36_school_engine_$(date +%Y%m%d_%H%M%S)"
LOG="${TMPDIR:-$PREFIX/tmp}/lesson36_school_engine_build.log"

cd "$PROJECT"

for file in \
  "$PAGE" \
  "$PROJECT/src/features/lesson-v2/exercises-v2/TapSelectExerciseV2.tsx" \
  "$PROJECT/src/features/lesson-v2/exercises-v2/CountTapExerciseV2.tsx" \
  "$PROJECT/src/features/lesson-v2/exercises-v2/SortSequenceExerciseV2.tsx" \
  "$PROJECT/src/features/lesson-v2/exercises-v2/DragMatchExerciseV2.tsx"; do
  [ -s "$file" ] || { echo "❌ ملف مرجعي ناقص: $file"; exit 1; }
done

for image in s1.webp s2.webp s3.webp s4.webp; do
  [ -s "$PROJECT/public/lessons/v2/lesson36/$image" ] || {
    echo "❌ صورة الدرس ناقصة: public/lessons/v2/lesson36/$image"
    exit 1
  }
done

AUDIO_KEYS=(
  m1_q1_count_12 m1_q2_count_15 m1_q3_count_17 m1_q4_count_19
  m2_q1_choose_11 m2_q2_choose_14 m2_q3_choose_17 m2_q4_choose_19
  m3_q1_build_12 m3_q2_build_14 m3_q3_build_16 m3_q4_build_18
  m4_q1_match_13 m4_q2_match_15 m4_q3_match_17 m4_q4_match_19
)

for key in "${AUDIO_KEYS[@]}"; do
  [ -s "$AUDIO/$key.mp3" ] || { echo "❌ الصوت ناقص: $key.mp3"; exit 1; }
  [ -s "$AUDIO/$key.json" ] || { echo "❌ الكاريوكي ناقص: $key.json"; exit 1; }
  python -m json.tool "$AUDIO/$key.json" >/dev/null 2>&1 || {
    echo "❌ JSON غير صالح: $key.json"
    exit 1
  }
done

mkdir -p "$BACKUP/content"
cp -p "$PAGE" "$BACKUP/LessonExercisesPage.tsx"
[ ! -e "$CONTENT/lesson36_exercise1.ts" ] || cp -p "$CONTENT/lesson36_exercise1.ts" "$BACKUP/content/"
[ ! -e "$CONTENT/lesson36_exercise2.ts" ] || cp -p "$CONTENT/lesson36_exercise2.ts" "$BACKUP/content/"
[ ! -e "$CONTENT/lesson36_exercise3.ts" ] || cp -p "$CONTENT/lesson36_exercise3.ts" "$BACKUP/content/"
[ ! -e "$CONTENT/lesson36_exercise4.ts" ] || cp -p "$CONTENT/lesson36_exercise4.ts" "$BACKUP/content/"
[ ! -e "$PROJECT/src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx" ] || \
  cp -p "$PROJECT/src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx" "$BACKUP/"

cat > "$CONTENT/lesson36_exercise1.ts" <<'TS'
import type { TapSelectItem } from "../exercises-v2/TapSelectExerciseV2";

export const LESSON_36_EXERCISE_1_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_36_amusement_sorting/exercises";

export const LESSON_36_EXERCISE_1: TapSelectItem[] = [
  {
    items_count: 12,
    items_emoji: "🎈",
    question: "كَمْ بَالُونًا فِي الْمَجْمُوعَةِ؟",
    question_audio_key: "m1_q1_count_12",
    options: [11, 12, 13],
    correct: 12,
  },
  {
    items_count: 15,
    items_emoji: "⭐",
    question: "كَمْ نَجْمَةً فِي الْمَجْمُوعَةِ؟",
    question_audio_key: "m1_q2_count_15",
    options: [14, 15, 16],
    correct: 15,
  },
  {
    items_count: 17,
    items_emoji: "⚽",
    question: "كَمْ كُرَةً فِي الْمَجْمُوعَةِ؟",
    question_audio_key: "m1_q3_count_17",
    options: [16, 17, 18],
    correct: 17,
  },
  {
    items_count: 19,
    items_emoji: "🎁",
    question: "كَمْ هَدِيَّةً فِي الْمَجْمُوعَةِ؟",
    question_audio_key: "m1_q4_count_19",
    options: [17, 18, 19],
    correct: 19,
  },
];
TS

cat > "$CONTENT/lesson36_exercise2.ts" <<'TS'
import type { CountTapItem } from "../exercises-v2/CountTapExerciseV2";

export const LESSON_36_EXERCISE_2_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_36_amusement_sorting/exercises";

export const LESSON_36_EXERCISE_2: CountTapItem[] = [
  {
    target_number: 11,
    question: "أَيْنَ الْعَدَدُ أَحَدَ عَشَرَ؟",
    question_audio_key: "m2_q1_choose_11",
    count_word_index: 2,
    options: [10, 11, 12],
    correct_index: 1,
    items_emoji: "🔵",
  },
  {
    target_number: 14,
    question: "أَيْنَ الْعَدَدُ أَرْبَعَةَ عَشَرَ؟",
    question_audio_key: "m2_q2_choose_14",
    count_word_index: 2,
    options: [13, 14, 15],
    correct_index: 1,
    items_emoji: "🔵",
  },
  {
    target_number: 17,
    question: "أَيْنَ الْعَدَدُ سَبْعَةَ عَشَرَ؟",
    question_audio_key: "m2_q3_choose_17",
    count_word_index: 2,
    options: [16, 17, 18],
    correct_index: 1,
    items_emoji: "🔵",
  },
  {
    target_number: 19,
    question: "أَيْنَ الْعَدَدُ تِسْعَةَ عَشَرَ؟",
    question_audio_key: "m2_q4_choose_19",
    count_word_index: 2,
    options: [17, 18, 19],
    correct_index: 2,
    items_emoji: "🔵",
  },
];
TS

cat > "$CONTENT/lesson36_exercise3.ts" <<'TS'
import type { SortQuestion } from "../exercises-v2/SortSequenceExerciseV2";

export const LESSON_36_EXERCISE_3_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_36_amusement_sorting/exercises";

export const LESSON_36_EXERCISE_3: SortQuestion[] = [
  {
    question: "كَوِّنِ الْعَدَدَ اثْنَيْ عَشَرَ.",
    question_audio_key: "m3_q1_build_12",
    direction: "asc",
    items: [
      { kind: "word", value: "2", sort_value: 3 },
      { kind: "word", value: "=", sort_value: 4 },
      { kind: "word", value: "10", sort_value: 1 },
      { kind: "word", value: "12", sort_value: 5 },
      { kind: "word", value: "+", sort_value: 2 },
    ],
  },
  {
    question: "كَوِّنِ الْعَدَدَ أَرْبَعَةَ عَشَرَ.",
    question_audio_key: "m3_q2_build_14",
    direction: "asc",
    items: [
      { kind: "word", value: "14", sort_value: 5 },
      { kind: "word", value: "+", sort_value: 2 },
      { kind: "word", value: "4", sort_value: 3 },
      { kind: "word", value: "10", sort_value: 1 },
      { kind: "word", value: "=", sort_value: 4 },
    ],
  },
  {
    question: "كَوِّنِ الْعَدَدَ سِتَّةَ عَشَرَ.",
    question_audio_key: "m3_q3_build_16",
    direction: "asc",
    items: [
      { kind: "word", value: "=", sort_value: 4 },
      { kind: "word", value: "16", sort_value: 5 },
      { kind: "word", value: "6", sort_value: 3 },
      { kind: "word", value: "+", sort_value: 2 },
      { kind: "word", value: "10", sort_value: 1 },
    ],
  },
  {
    question: "كَوِّنِ الْعَدَدَ ثَمَانِيَةَ عَشَرَ.",
    question_audio_key: "m3_q4_build_18",
    direction: "asc",
    items: [
      { kind: "word", value: "+", sort_value: 2 },
      { kind: "word", value: "18", sort_value: 5 },
      { kind: "word", value: "10", sort_value: 1 },
      { kind: "word", value: "=", sort_value: 4 },
      { kind: "word", value: "8", sort_value: 3 },
    ],
  },
];
TS

cat > "$CONTENT/lesson36_exercise4.ts" <<'TS'
import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

export const LESSON_36_EXERCISE_4_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_36_amusement_sorting/exercises";

export const LESSON_36_EXERCISE_4: DragMatchItem[] = [
  {
    question: "أَيُّ تَمْثِيلٍ يُسَاوِي ثَلَاثَةَ عَشَرَ؟",
    question_audio_key: "m4_q1_match_13",
    pairs: [
      {
        match_id: "q1",
        draggable: { kind: "word", value: "10 + 3" },
        target: { kind: "number", value: 13 },
      },
    ],
  },
  {
    question: "أَيُّ تَمْثِيلٍ يُسَاوِي خَمْسَةَ عَشَرَ؟",
    question_audio_key: "m4_q2_match_15",
    pairs: [
      {
        match_id: "q2",
        draggable: { kind: "word", value: "10 + 5" },
        target: { kind: "number", value: 15 },
      },
    ],
  },
  {
    question: "أَيُّ تَمْثِيلٍ يُسَاوِي سَبْعَةَ عَشَرَ؟",
    question_audio_key: "m4_q3_match_17",
    pairs: [
      {
        match_id: "q3",
        draggable: { kind: "word", value: "10 + 7" },
        target: { kind: "number", value: 17 },
      },
    ],
  },
  {
    question: "أَيُّ تَمْثِيلٍ يُسَاوِي تِسْعَةَ عَشَرَ؟",
    question_audio_key: "m4_q4_match_19",
    pairs: [
      {
        match_id: "q4",
        draggable: { kind: "word", value: "10 + 9" },
        target: { kind: "number", value: 19 },
      },
    ],
  },
];
TS

python - <<'PY'
from pathlib import Path
import re

path = Path("src/pages/LessonExercisesPage.tsx")
text = path.read_text(encoding="utf-8")

text = text.replace(
    'import Lesson36PremiumNumbersExercises from "../features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises";\n',
    "",
)

if "LESSON_36_EXERCISE_1" not in text:
    anchor = '''import {
  LESSON_35_EXERCISE_4,
  LESSON_35_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson35_exercise4";
'''
    imports = '''
import {
  LESSON_36_EXERCISE_1,
  LESSON_36_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson36_exercise1";
import {
  LESSON_36_EXERCISE_2,
  LESSON_36_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson36_exercise2";
import {
  LESSON_36_EXERCISE_3,
  LESSON_36_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson36_exercise3";
import {
  LESSON_36_EXERCISE_4,
  LESSON_36_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson36_exercise4";
'''
    if anchor not in text:
        raise SystemExit("❌ تعذر إيجاد موضع استيرادات الدرس 35")
    text = text.replace(anchor, anchor + imports, 1)

if "type Lesson36Stage" not in text:
    anchor = '''type WorldStage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";
'''
    stage_type = '''
type Lesson36Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";
'''
    if anchor not in text:
        raise SystemExit("❌ تعذر إيجاد نوع WorldStage")
    text = text.replace(anchor, anchor + stage_type, 1)

lesson36_function = '''
function Lesson36Exercises() {
  const [stage, setStage] =
    useState<Lesson36Stage>("ex1");

  if (stage === "ex1") {
    return (
      <TapSelectExerciseV2
        key="lesson36-ex1-count"
        items={LESSON_36_EXERCISE_1}
        audio_base={LESSON_36_EXERCISE_1_AUDIO_BASE}
        background_image="/lessons/v2/lesson36/s1.webp"
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <CountTapExerciseV2
        key="lesson36-ex2-identify"
        items={LESSON_36_EXERCISE_2}
        audio_base={LESSON_36_EXERCISE_2_AUDIO_BASE}
        background_image="/lessons/v2/lesson36/s2.webp"
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <SortSequenceExerciseV2
        key="lesson36-ex3-build"
        items={LESSON_36_EXERCISE_3}
        audio_base={LESSON_36_EXERCISE_3_AUDIO_BASE}
        background_image="/lessons/v2/lesson36/s3.webp"
        onComplete={() => setStage("ex4")}
      />
    );
  }

  if (stage === "ex4") {
    return (
      <DragMatchExerciseV2
        key="lesson36-ex4-match"
        items={LESSON_36_EXERCISE_4}
        audio_base={LESSON_36_EXERCISE_4_AUDIO_BASE}
        background_image="/lessons/v2/lesson36/s4.webp"
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson36"
      message="أَكْمَلْتَ تَمَارِينَ الْأَعْدَادِ إِلَى 19."
      onReplay={() => setStage("ex1")}
      nextPath={WORLD2_HOME}
      nextLabel="العودة إلى عالم الألعاب"
      quizPath={WORLD2_QUIZ}
    />
  );
}
'''

if "function Lesson36Exercises()" not in text:
    marker = "\nexport default function LessonExercisesPage() {"
    if marker not in text:
        raise SystemExit("❌ تعذر إيجاد نهاية صفحة التمارين")
    text = text.replace(marker, lesson36_function + marker, 1)

text = text.replace(
    "return <Lesson36PremiumNumbersExercises />;",
    "return <Lesson36Exercises />;",
)

if 'if (lessonId === "36")' not in text or "return <Lesson36Exercises />;" not in text:
    raise SystemExit("❌ لم ينجح ربط مسار الدرس 36")

path.write_text(text, encoding="utf-8")
PY

python - <<'PY'
from pathlib import Path
import re

content = Path("src/features/lesson-v2/content")
expected = {
    "lesson36_exercise1.ts": 4,
    "lesson36_exercise2.ts": 4,
    "lesson36_exercise3.ts": 4,
    "lesson36_exercise4.ts": 4,
}

for name, count in expected.items():
    text = (content / name).read_text(encoding="utf-8")
    found = len(re.findall(r'question_audio_key:\s*"', text))
    if found != count:
        raise SystemExit(f"❌ {name}: عدد الأسئلة {found} بدل {count}")

page = Path("src/pages/LessonExercisesPage.tsx").read_text(encoding="utf-8")
for engine in (
    "TapSelectExerciseV2",
    "CountTapExerciseV2",
    "SortSequenceExerciseV2",
    "DragMatchExerciseV2",
):
    if engine not in page:
        raise SystemExit(f"❌ المحرك غير مربوط: {engine}")

if "Lesson36PremiumNumbersExercises" in page:
    raise SystemExit("❌ ما زال المحرك التجريبي القديم مربوطًا بالصفحة")

print("✅ الربط البنيوي مطابق لطريقة الدرس 1.")
print("✅ 4 محركات أصلية × 4 أسئلة.")
PY

rm -f "$LOG"
if ! npm run build >"$LOG" 2>&1; then
  tail -n 80 "$LOG"
  echo "❌ فشل البناء. لم تُحذف النسخة الاحتياطية: $BACKUP"
  exit 1
fi
tail -n 5 "$LOG"
rm -f "$LOG"

PORT=5173
PID_FILE="$HOME/.lesson36_preview.pid"
PREVIEW_LOG="$HOME/lesson36_preview.log"

if [ -f "$PID_FILE" ]; then
  OLD_PID="$(cat "$PID_FILE" 2>/dev/null || true)"
  [ -z "$OLD_PID" ] || kill "$OLD_PID" 2>/dev/null || true
fi

pkill -f "vite.*--port $PORT" 2>/dev/null || true
rm -rf node_modules/.vite
sleep 2

npm run dev -- --host 0.0.0.0 --port "$PORT" >"$PREVIEW_LOG" 2>&1 &
PID=$!
echo "$PID" > "$PID_FILE"
sleep 5

if ! kill -0 "$PID" 2>/dev/null; then
  cat "$PREVIEW_LOG"
  echo "❌ فشلت المعاينة"
  exit 1
fi

URL="http://127.0.0.1:$PORT/lesson-v2/36/exercises?schoolEngine=$(date +%s)"

echo
echo "✅ تم إلغاء ربط المحرك التجريبي الفاشل."
echo "✅ الدرس 36 أصبح مبنيًا مثل الدرس 1: stage + onComplete."
echo "✅ التمرين 1: TapSelect — 4 أسئلة."
echo "✅ التمرين 2: CountTap — 4 أسئلة."
echo "✅ التمرين 3: SortSequence — 4 أسئلة."
echo "✅ التمرين 4: DragMatch — 4 أسئلة."
echo "✅ البناء والمعاينة يعملان."
echo "النسخة الاحتياطية: $BACKUP"
echo "$URL"

termux-open-url "$URL" 2>/dev/null || true
