#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="/data/data/com.termux/files/home/madrasati-dz"
REPORT="$HOME/lesson36_build_points_report.txt"

ENGINE="$PROJECT/src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
SHELL="$PROJECT/src/features/lesson-v2/components/ExerciseFullscreenShellV2.tsx"
HEADER="$PROJECT/src/features/lesson-v2/components/UnifiedExerciseHeaderV2.tsx"
FEEDBACK="$PROJECT/src/features/lesson-v2/components/UnifiedExerciseFeedbackV2.tsx"
KARAOKE="$PROJECT/src/features/lesson-v2/components/UnifiedExerciseKaraokeV2.tsx"

WORLD_PAGE="$PROJECT/src/pages/World2LessonPage.tsx"
APP_FILE="$PROJECT/src/App.tsx"
MAIN_FILE="$PROJECT/src/main.tsx"

LESSON35_PAGE="$PROJECT/src/features/lesson-v2/exercises-v2/Lesson35FullscreenPremiumV3.tsx"
LESSON35_ACTIVITY="$PROJECT/src/features/lesson-v2/exercises-v2/Lesson35PremiumBreathingExercises.tsx"

if [ ! -d "$PROJECT" ]; then
  echo "خطأ: المشروع غير موجود:"
  echo "$PROJECT"
  exit 1
fi

cd "$PROJECT"

print_file_state() {
  local file="$1"

  if [ -f "$file" ]; then
    local relative="${file#$PROJECT/}"
    local lines
    lines="$(wc -l < "$file" | tr -d ' ')"

    echo "[موجود] $relative — $lines سطرًا"

    if git ls-files --error-unmatch "$relative" >/dev/null 2>&1; then
      if git diff --quiet -- "$relative"; then
        echo "الحالة: متعقب وغير معدل"
      else
        echo "الحالة: متعقب ومعدل محليًا"
      fi
    else
      echo "الحالة: غير متعقب في Git"
    fi
  else
    echo "[غير موجود] ${file#$PROJECT/}"
  fi
}

print_context() {
  local file="$1"
  local pattern="$2"
  local before="${3:-20}"
  local after="${4:-40}"

  [ -f "$file" ] || return 0

  grep -n -B "$before" -A "$after" \
    -E "$pattern" \
    "$file" 2>/dev/null || true
}

{
  echo "============================================================"
  echo "فحص نقاط بناء وربط نشاط lesson36"
  echo "============================================================"
  echo
  echo "المشروع: $PROJECT"
  echo "الفرع: $(git branch --show-current)"
  echo "Commit: $(git rev-parse --short HEAD)"
  echo "التاريخ: $(date '+%Y-%m-%d %H:%M:%S')"
  echo

  echo "============================================================"
  echo "1) سلامة الملفات التي قد نحتاج إليها"
  echo "============================================================"

  for file in \
    "$ENGINE" \
    "$SHELL" \
    "$HEADER" \
    "$FEEDBACK" \
    "$KARAOKE" \
    "$WORLD_PAGE" \
    "$APP_FILE" \
    "$MAIN_FILE" \
    "$LESSON35_PAGE" \
    "$LESSON35_ACTIVITY"
  do
    print_file_state "$file"
    echo
  done

  echo "============================================================"
  echo "2) تغييرات Git داخل ملفات src فقط"
  echo "============================================================"

  echo "--- ملفات src المعدلة المتعقبة ---"
  git diff --name-only -- src || true

  echo
  echo "--- ملفات src غير المتعقبة ---"
  git ls-files --others --exclude-standard -- src || true

  echo
  echo "--- ملخص الفروق داخل ملفات الربط المحتملة ---"

  for relative in \
    "src/App.tsx" \
    "src/main.tsx" \
    "src/pages/World2LessonPage.tsx" \
    "src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
  do
    if [ -f "$PROJECT/$relative" ]; then
      echo
      echo "### $relative"
      git diff --stat -- "$relative" || true
    fi
  done

  echo
  echo "============================================================"
  echo "3) العقد البرمجي الكامل لـ PremiumExerciseEngineV2"
  echo "============================================================"

  if [ -f "$ENGINE" ]; then
    sed -n '1,105p' "$ENGINE"

    echo
    echo "--- توقيع المكوّن ---"
    sed -n '180,235p' "$ENGINE"

    echo
    echo "--- الانتقال بين الأسئلة والمهام ---"
    sed -n '390,490p' "$ENGINE"

    echo
    echo "--- استدعاء المكونات الموحدة ---"
    print_context \
      "$ENGINE" \
      'ExerciseFullscreenShellV2|UnifiedExerciseHeaderV2|UnifiedExerciseKaraokeV2|UnifiedExerciseFeedbackV2' \
      10 \
      30

    echo
    echo "--- شاشة الإكمال والأزرار ---"
    print_context \
      "$ENGINE" \
      'completed|isComplete|restart|onBack|onClose|إعادة النشاط|العودة إلى الدرس|أكملت|أنهيت' \
      15 \
      50
  else
    echo "المحرك غير موجود."
  fi

  echo
  echo "============================================================"
  echo "4) هل يدعم المحرك تفاعلًا مخصصًا أم بطاقات اختيار فقط؟"
  echo "============================================================"

  if [ -f "$ENGINE" ]; then
    grep -nE \
      'render|children|interaction|custom|variant|type:|questionType|choice|choices|correctChoiceId|onAnswer|answer\(' \
      "$ENGINE" |
      head -n 220 || true

    echo
    echo "--- جزء رسم بطاقات الإجابات ---"

    choice_line="$(
      grep -n 'question\.choices' "$ENGINE" |
      head -n 1 |
      cut -d: -f1 || true
    )"

    if [ -n "${choice_line:-}" ]; then
      start=$((choice_line > 45 ? choice_line - 45 : 1))
      end=$((choice_line + 150))
      sed -n "${start},${end}p" "$ENGINE"
    else
      echo "لم يُعثر على question.choices نصيًا."
    fi
  fi

  echo
  echo "============================================================"
  echo "5) واجهات المكونات الموحدة"
  echo "============================================================"

  for file in "$SHELL" "$HEADER" "$FEEDBACK" "$KARAOKE"; do
    echo
    echo "------------------------------"
    echo "${file#$PROJECT/}"
    echo "------------------------------"

    if [ -f "$file" ]; then
      sed -n '1,180p' "$file"
    else
      echo "غير موجود."
    fi
  done

  echo
  echo "============================================================"
  echo "6) بنية صفحة lesson35 الكاملة المرجعية"
  echo "============================================================"

  if [ -f "$LESSON35_PAGE" ]; then
    echo "--- الملف كاملًا إذا كان قصيرًا، وإلا المقاطع المهمة ---"

    lesson35_lines="$(wc -l < "$LESSON35_PAGE" | tr -d ' ')"

    if [ "$lesson35_lines" -le 420 ]; then
      cat "$LESSON35_PAGE"
    else
      sed -n '1,180p' "$LESSON35_PAGE"

      print_context \
        "$LESSON35_PAGE" \
        'export default|onComplete|onBack|navigate|fullscreen|Lesson35Premium|ExerciseFullscreen|return' \
        20 \
        80
    fi
  else
    echo "Lesson35FullscreenPremiumV3.tsx غير موجود."
  fi

  echo
  echo "============================================================"
  echo "7) المسارات المسجلة للتمارين 33–35"
  echo "============================================================"

  for file in "$APP_FILE" "$MAIN_FILE"; do
    [ -f "$file" ] || continue

    echo
    echo "------------------------------"
    echo "${file#$PROJECT/}"
    echo "------------------------------"

    print_context \
      "$file" \
      'lesson-v2/(33|34|35)/exercises|Lesson35FullscreenPremiumV3|Routes|Route' \
      35 \
      70
  done

  echo
  echo "============================================================"
  echo "8) جميع ملفات Route المحتملة ضمن src فقط"
  echo "============================================================"

  grep -RIl \
    --include='*.tsx' \
    --include='*.ts' \
    -E 'lesson-v2/35/exercises|Lesson35FullscreenPremiumV3' \
    "$PROJECT/src" 2>/dev/null |
    sort |
    sed "s|$PROJECT/||"

  echo
  echo "============================================================"
  echo "9) آلية تمرير زر النشاط من World2LessonPage"
  echo "============================================================"

  if [ -f "$WORLD_PAGE" ]; then
    echo "--- تعريف LESSON_ALIASES ---"
    sed -n '1,70p' "$WORLD_PAGE"

    echo
    echo "--- إنشاء preparedLesson ---"
    sed -n '240,315p' "$WORLD_PAGE"

    echo
    echo "--- onTraining وexercisePath ---"
    sed -n '330,363p' "$WORLD_PAGE"
  else
    echo "World2LessonPage.tsx غير موجود."
  fi

  echo
  echo "============================================================"
  echo "10) مسارات الصوت المقترحة ومدى تعارضها"
  echo "============================================================"

  EXERCISE_AUDIO_DIR="$PROJECT/public/audio/teachers/khalil/lesson_36_numbers_to_19/exercises"
  OLD_TOKEN_EXERCISE_DIR="$PROJECT/public/audio/teachers/khalil/lesson_36_amusement_sorting/exercises"

  for dir in \
    "$EXERCISE_AUDIO_DIR" \
    "$OLD_TOKEN_EXERCISE_DIR"
  do
    if [ -d "$dir" ]; then
      echo "[موجود] ${dir#$PROJECT/}"
      find "$dir" -maxdepth 1 -type f | sort | sed "s|$PROJECT/||"
    else
      echo "[غير موجود] ${dir#$PROJECT/}"
    fi
  done

  echo
  echo "============================================================"
  echo "11) نتيجة فنية مبدئية آلية"
  echo "============================================================"

  if grep -qE 'renderInteraction|renderContent|children|customRenderer' "$ENGINE" 2>/dev/null; then
    echo "المحرك يحتوي مؤشرًا على دعم محتوى أو تفاعل مخصص."
  else
    echo "لم يظهر دعم صريح لتفاعل مخصص."
    echo "يرجح أن المهمتين 1 و3 تحتاجان مكوّنين داخليين مستقلين"
    echo "داخل صفحة lesson36، مع إعادة استعمال الغلاف والمكونات الموحدة."
  fi

  if grep -Rqs 'lesson-v2/35/exercises' "$PROJECT/src"; then
    echo "مسار lesson35 مسجل ويمكن محاكاة طريقة ربطه."
  else
    echo "لم يظهر مسار lesson35 داخل src رغم وجود exercisePath."
  fi

  echo
  echo "============================================================"
  echo "12) حالة Git النهائية — قراءة فقط"
  echo "============================================================"

  git status --short

  echo
  echo "تنبيه:"
  echo "هناك تعديلات وملفات غير متعقبة سابقة في المشروع."
  echo "لن يغيّر هذا السكربت أي ملف، ولن ننظفها أو نحذفها."
  echo
  echo "============================================================"
  echo "انتهى الفحص دون تعديل المشروع"
  echo "============================================================"

} | tee "$REPORT"

echo
echo "تم حفظ التقرير في:"
echo "$REPORT"
echo
echo "لم يتم تعديل أي ملف."
