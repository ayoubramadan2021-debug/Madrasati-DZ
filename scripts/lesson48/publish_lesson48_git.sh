#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

ROOT="${1:-$HOME/madrasati-dz}"
cd "$ROOT"

[[ -d .git ]] || {
  echo "❌ ليس مستودع Git"
  exit 1
}

[[ -f package.json ]] || {
  echo "❌ package.json غير موجود"
  exit 1
}

BRANCH="$(git branch --show-current)"

[[ -n "$BRANCH" ]] || {
  echo "❌ تعذر تحديد الفرع"
  exit 1
}

git remote get-url origin >/dev/null 2>&1 || {
  echo "❌ remote origin غير موجود"
  exit 1
}

mkdir -p docs scripts/lesson48

python - <<'PY'
from datetime import date
from pathlib import Path

today = date.today().isoformat()

documentation = f"""# الدرس 48 — الأعداد إلى 39 (1)

آخر تحديث: {today}

## الحالة

- الدرس 48 مكتمل.
- التمارين مكتملة.
- عدد المهمات: 4.
- عدد المتغيرات في كل مهمة: 4.
- مجموع الأسئلة: 16.
- المحرك المستخدم: UnifiedExerciseScreenV2.
- محرك الإجابات: UnifiedExerciseAnswersV2.

## مرجع التحقق

الدرس 36 هو المرجع الرسمي لربط دروس عالم الألعاب.

الملفات المرجعية:

- src/pages/World2LessonPage.tsx
- src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx

يجب التحقق من:

- العنصر 36 داخل LESSON_ALIASES.
- المسار /lesson-v2/36/exercises.
- منطق onDone.
- شاشة الإتمام.
- حركة الكأس والنجوم.

## ربط الدرس 48

مدخل الدرس:

/world2-lesson/48

مسار التمارين:

/lesson-v2/48/exercises

يمر الدرس عبر:

World2LessonPage

داخل LESSON_ALIASES يجب أن توجد بيانات الدرس 48 مع:

- title: الأعداد إلى 39 (1)
- exercisePath: /lesson-v2/48/exercises
- audioToken: lesson_48_numbers_to_39

داخل onDone يتم اكتشاف الدرس بواسطة lessonId 48 أو audioToken ثم الانتقال إلى:

/lesson-v2/48/exercises

المسار الصريح للدرس 48 يجب أن يسبق المسار العام:

/lesson-v2/:lessonId/exercises

## إصلاحات التمارين

- حذف الرقم ١٢٣ من قاطرة القطار.
- إظهار العدد الصحيح في العربة الناقصة.
- إظهار العشرات والوحدات بعد الإجابة الصحيحة.
- اعتماد شاشة الإتمام المرجعية.
- تصحيح النص إلى الأعداد حتى 39.
- تحريك الكأس والنجمتين.
- ربط زر هيا نتدرب بتمارين الدرس.
- اعتماد الصوت والكاريوكي الحقيقي.

## قاعدة الدروس المقبلة

لا يتم إنشاء ربط أو شاشة إتمام جديدة قبل فحص الدرس 36.
"""

resume = f"""## الدرس 48 — الأعداد إلى 39 (1)

آخر تحديث: {today}

- الحالة: مكتمل ومربوط.
- المدخل: /world2-lesson/48
- التمارين: /lesson-v2/48/exercises
- المرجع المعتمد: الدرس 36
- 4 مهمات × 4 متغيرات = 16 سؤالًا
- المحرك الموحد مستخدم
- القطار يعرض العدد الناقص بعد الإجابة الصحيحة
- آلة التفكيك تعرض العشرات والوحدات بعد النجاح
- شاشة الإتمام موحدة
- الكأس والنجمتان متحركة
- التوثيق: docs/LESSON48_PREMIUM_HANDOFF.md
- التحقق: scripts/lesson48/verify_lesson48_release.sh
"""

handoff = f"""## تسليم الدرس 48

آخر تحديث: {today}

التسلسل النهائي:

/world2-lesson/48
→ World2LessonPage
→ /lesson-v2/48/exercises
→ Lesson48ExercisesPage
→ NumbersTo39ExerciseV2

الدرس 36 هو المرجع الرسمي في:

- LESSON_ALIASES
- World2LessonPage.onDone
- مسارات التمارين الرقمية
- شاشة الإتمام
- حركة الكأس والنجوم

ملفات الدرس 48:

- src/pages/World2LessonPage.tsx
- src/pages/Lesson48Page.tsx
- src/pages/Lesson48ExercisesPage.tsx
- src/features/lesson-v2/content/lesson48.ts
- src/features/lesson-v2/content/lesson48_types.ts
- src/features/lesson-v2/content/lesson48_exercise1.ts
- src/features/lesson-v2/content/lesson48_exercise2.ts
- src/features/lesson-v2/content/lesson48_exercise3.ts
- src/features/lesson-v2/content/lesson48_exercise4.ts
- src/features/lesson-v2/exercises-v2/NumbersTo39ExerciseV2.tsx

أداة التحقق:

bash scripts/lesson48/verify_lesson48_release.sh
"""

verify_script = """#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd "${1:-$HOME/madrasati-dz}"

WORLD="src/pages/World2LessonPage.tsx"
APP="src/App.tsx"
PAGE="src/pages/Lesson48ExercisesPage.tsx"
ENGINE="src/features/lesson-v2/exercises-v2/NumbersTo39ExerciseV2.tsx"
REFERENCE="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"

for file in "$WORLD" "$APP" "$PAGE" "$ENGINE" "$REFERENCE"
do
  [[ -f "$file" ]] || {
    echo "❌ ملف مفقود: $file"
    exit 1
  }
done

grep -Fq '"48": {' "$WORLD"
grep -Fq 'exercisePath: "/lesson-v2/48/exercises"' "$WORLD"
grep -Fq 'lesson_48_numbers_to_39' "$WORLD"
grep -Fq 'lessonId === "48"' "$WORLD"
grep -Fq '"/lesson-v2/48/exercises"' "$WORLD"

grep -Fq 'path="/lesson-v2/48/exercises"' "$APP"
grep -Fq 'path="/lesson-v2/:lessonId/exercises"' "$APP"

if grep -Fq 'path="/world2-lesson/48"' "$APP"
then
  echo "❌ يوجد مسار يتجاوز World2LessonPage"
  exit 1
fi

grep -Fq 'UnifiedExerciseScreenV2' "$ENGINE"
grep -Fq 'UnifiedExerciseAnswersV2' "$ENGINE"
grep -Fq 'revealedValue' "$ENGINE"
grep -Fq 'revealCorrect' "$ENGINE"

if grep -Fq '<strong>١٢٣</strong>' "$ENGINE"
then
  echo "❌ الرقم ١٢٣ ما زال داخل القاطرة"
  exit 1
fi

TOTAL=0

for mission in 1 2 3 4
do
  FILE="src/features/lesson-v2/content/lesson48_exercise${mission}.ts"

  [[ -f "$FILE" ]] || {
    echo "❌ ملف مفقود: $FILE"
    exit 1
  }

  COUNT="$(
    grep -o "l48_e${mission}_q[0-9]*" "$FILE" |
    sort -u |
    wc -l
  )"

  [[ "$COUNT" -eq 4 ]] || {
    echo "❌ المهمة $mission تحتوي $COUNT بدل 4"
    exit 1
  }

  TOTAL=$((TOTAL + COUNT))
done

[[ "$TOTAL" -eq 16 ]] || {
  echo "❌ مجموع الأسئلة $TOTAL بدل 16"
  exit 1
}

echo "✅ تحقق الدرس 48 نجح"

npm run build
"""


def upsert(path_name, start_marker, end_marker, body):
    path = Path(path_name)

    old = (
        path.read_text(encoding="utf-8")
        if path.exists()
        else ""
    )

    block = (
        f"{start_marker}\n"
        f"{body.strip()}\n"
        f"{end_marker}"
    )

    start = old.find(start_marker)
    end = old.find(end_marker)

    if start >= 0 and end >= start:
        end += len(end_marker)

        new = (
            old[:start].rstrip()
            + "\n\n"
            + block
            + "\n\n"
            + old[end:].lstrip()
        )
    else:
        new = (
            old.rstrip()
            + ("\n\n" if old.strip() else "")
            + block
            + "\n"
        )

    path.write_text(new, encoding="utf-8")


Path("docs/LESSON48_PREMIUM_HANDOFF.md").write_text(
    documentation,
    encoding="utf-8",
)

Path("scripts/lesson48/verify_lesson48_release.sh").write_text(
    verify_script,
    encoding="utf-8",
)

upsert(
    "resume.md",
    "<!-- LESSON48_RESUME_START -->",
    "<!-- LESSON48_RESUME_END -->",
    resume,
)

handoff_files = [
    Path("PROJECT_HANDOFF.md"),
    Path("handoff.md"),
    Path("HANDOFF.md"),
]

existing_handoffs = [
    path for path in handoff_files
    if path.exists()
]

if not existing_handoffs:
    existing_handoffs = [
        Path("PROJECT_HANDOFF.md")
    ]

for handoff_path in existing_handoffs:
    upsert(
        str(handoff_path),
        "<!-- LESSON48_HANDOFF_START -->",
        "<!-- LESSON48_HANDOFF_END -->",
        handoff,
    )

print("✅ تم تحديث resume وhandoff والتوثيق")
PY

chmod +x scripts/lesson48/verify_lesson48_release.sh
bash -n scripts/lesson48/verify_lesson48_release.sh
bash scripts/lesson48/verify_lesson48_release.sh "$ROOT"

cp -p "$0" scripts/lesson48/publish_lesson48_git.sh
chmod +x scripts/lesson48/publish_lesson48_git.sh

git diff --check

PATHS=(
  src/App.tsx
  src/index.css
  src/pages/World2LessonPage.tsx
  src/pages/Lesson48Page.tsx
  src/pages/Lesson48ExercisesPage.tsx
  src/features/lesson-v2/content/lesson48.ts
  src/features/lesson-v2/content/lesson48_types.ts
  src/features/lesson-v2/content/lesson48_exercise1.ts
  src/features/lesson-v2/content/lesson48_exercise2.ts
  src/features/lesson-v2/content/lesson48_exercise3.ts
  src/features/lesson-v2/content/lesson48_exercise4.ts
  src/features/lesson-v2/content/v2Registry.ts
  src/features/lesson-v2/exercises-v2/NumbersTo39ExerciseV2.tsx
  public/lessons/v2/lesson48-numbers-to-39
  public/audio/teachers/khalil/lesson_48_numbers_to_39
  tools/gen_audio_lesson48_exercises.py
  docs/LESSON48_PREMIUM_HANDOFF.md
  scripts/lesson48
  resume.md
  PROJECT_HANDOFF.md
  handoff.md
  HANDOFF.md
)

ADD=()

for path in "${PATHS[@]}"
do
  if [[ -e "$path" ]]
  then
    ADD+=("$path")
  fi
done

[[ "${#ADD[@]}" -gt 0 ]] || {
  echo "❌ لا توجد ملفات للرفع"
  exit 1
}

git add -A -- "${ADD[@]}"

if ! git diff --cached --quiet
then
  git commit \
    -m "feat(lesson48): finalize lesson exercises linking and handoff"
fi

git push -u origin "$BRANCH"

echo
echo "✅ تم الرفع بنجاح"
git log -1 --oneline
