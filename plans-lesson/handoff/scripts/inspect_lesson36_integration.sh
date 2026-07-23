#!/data/data/com.termux/files/usr/bin/bash
set -u

PROJECT="/data/data/com.termux/files/home/madrasati-dz"
SRC="$PROJECT/src"
REPORT="$HOME/lesson36_integration_report.txt"

if [ ! -d "$PROJECT" ]; then
  echo "خطأ: مجلد المشروع غير موجود:"
  echo "$PROJECT"
  exit 1
fi

cd "$PROJECT" || exit 1

{
  echo "============================================================"
  echo "تقرير فحص ربط نشاط Premium للدرس 36"
  echo "============================================================"
  echo
  echo "المشروع: $PROJECT"
  echo "الفرع: $(git branch --show-current 2>/dev/null || echo غير معروف)"
  echo "Commit: $(git rev-parse --short HEAD 2>/dev/null || echo غير معروف)"
  echo "التاريخ: $(date '+%Y-%m-%d %H:%M:%S')"
  echo

  echo "============================================================"
  echo "1) تحديد ملفات lesson35 وlesson36"
  echo "============================================================"

  find "$SRC" -type f \( -iname '*lesson35*' -o -iname '*lesson36*' \) \
    2>/dev/null |
    sort |
    sed "s|$PROJECT/||"

  echo
  echo "============================================================"
  echo "2) تحديد الملف المرجعي لنشاط lesson35"
  echo "============================================================"

  LESSON35_EXERCISE="$SRC/features/lesson-v2/exercises-v2/Lesson35PremiumBreathingExercises.tsx"

  if [ -f "$LESSON35_EXERCISE" ]; then
    echo "[موجود] ${LESSON35_EXERCISE#$PROJECT/}"
    echo
    echo "--- الاستيرادات والـ Props والتصدير ---"
    grep -nE \
      '^import |^export |type Props|interface Props|onComplete|onBack|onClose|ExerciseFullscreenShellV2|UnifiedExercise|PremiumExerciseEngineV2' \
      "$LESSON35_EXERCISE" 2>/dev/null |
      head -n 180 || true

    echo
    echo "--- بداية الملف ---"
    sed -n '1,180p' "$LESSON35_EXERCISE"
  else
    echo "[غير موجود] ${LESSON35_EXERCISE#$PROJECT/}"
  fi

  echo
  echo "============================================================"
  echo "3) أماكن استدعاء نشاط lesson35 داخل التطبيق"
  echo "============================================================"

  grep -RIn \
    --include='*.tsx' \
    --include='*.ts' \
    'Lesson35PremiumBreathingExercises' \
    "$SRC" 2>/dev/null |
    sed "s|$PROJECT/||" |
    head -n 80 || true

  echo
  echo "============================================================"
  echo "4) سياق استدعاء lesson35"
  echo "============================================================"

  mapfile -t CALL_FILES < <(
    grep -RIl \
      --include='*.tsx' \
      --include='*.ts' \
      'Lesson35PremiumBreathingExercises' \
      "$SRC" 2>/dev/null |
      grep -v 'Lesson35PremiumBreathingExercises.tsx' |
      head -n 10
  )

  if [ "${#CALL_FILES[@]}" -eq 0 ]; then
    echo "لم يتم العثور على ملف يستدعي Lesson35PremiumBreathingExercises."
  else
    for file in "${CALL_FILES[@]}"; do
      echo
      echo "------------------------------"
      echo "الملف: ${file#$PROJECT/}"
      echo "------------------------------"

      line=$(
        grep -n 'Lesson35PremiumBreathingExercises' "$file" |
        head -n 1 |
        cut -d: -f1
      )

      if [ -n "${line:-}" ]; then
        start=$((line > 80 ? line - 80 : 1))
        end=$((line + 140))
        sed -n "${start},${end}p" "$file"
      fi
    done
  fi

  echo
  echo "============================================================"
  echo "5) البحث عن تعريف بيانات lesson36"
  echo "============================================================"

  grep -RInE \
    --include='*.tsx' \
    --include='*.ts' \
    --include='*.json' \
    'lesson36|lesson_36|Lesson36|الأعداد إلى 19|الأعداد.*19' \
    "$SRC" 2>/dev/null |
    sed "s|$PROJECT/||" |
    head -n 180 || true

  echo
  echo "============================================================"
  echo "6) عرض الملفات الأقرب إلى تعريف lesson36"
  echo "============================================================"

  mapfile -t LESSON36_FILES < <(
    grep -RIlE \
      --include='*.tsx' \
      --include='*.ts' \
      --include='*.json' \
      'lesson36|lesson_36|Lesson36|الأعداد إلى 19|الأعداد.*19' \
      "$SRC" 2>/dev/null |
      head -n 12
  )

  if [ "${#LESSON36_FILES[@]}" -eq 0 ]; then
    echo "لم يتم العثور على تعريف lesson36 داخل src."
  else
    for file in "${LESSON36_FILES[@]}"; do
      echo
      echo "------------------------------"
      echo "الملف: ${file#$PROJECT/}"
      echo "------------------------------"

      lines=$(wc -l < "$file" | tr -d ' ')
      echo "عدد الأسطر: $lines"

      if [ "$lines" -le 320 ]; then
        sed -n '1,320p' "$file"
      else
        grep -nE \
          'lesson36|lesson_36|Lesson36|exercise|activity|ابدأ النشاط|onComplete|onBack|fullscreen|audio_base|audioBase|sort_order|world_id' \
          "$file" 2>/dev/null |
          head -n 160 || true
      fi
    done
  fi

  echo
  echo "============================================================"
  echo "7) فحص زر بدء النشاط وآلية فتح التمارين"
  echo "============================================================"

  grep -RInE \
    --include='*.tsx' \
    --include='*.ts' \
    'ابدأ النشاط|بدء النشاط|startExercise|openExercise|showExercise|exerciseOpen|isExerciseOpen|set.*Exercise|exerciseComponent|premiumExercise' \
    "$SRC/features/lesson-v2" 2>/dev/null |
    sed "s|$PROJECT/||" |
    head -n 220 || true

  echo
  echo "============================================================"
  echo "8) فحص Props المحرك Premium اللازمة للنشاط الجديد"
  echo "============================================================"

  PREMIUM="$SRC/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"

  if [ -f "$PREMIUM" ]; then
    echo "--- الأنواع من بداية الملف ---"
    sed -n '1,120p' "$PREMIUM"

    echo
    echo "--- توقيع المكون وبداية التنفيذ ---"
    sed -n '180,250p' "$PREMIUM"

    echo
    echo "--- شاشة النهاية وأزرار العودة والإعادة ---"
    grep -nE \
      'restart|إعادة|العودة|onBack|onClose|onComplete|completed|finish|endScreen|completion' \
      "$PREMIUM" 2>/dev/null |
      head -n 120 || true
  else
    echo "PremiumExerciseEngineV2.tsx غير موجود."
  fi

  echo
  echo "============================================================"
  echo "9) فحص مسارات صوت وصور lesson36 الحالية"
  echo "============================================================"

  find "$PROJECT/public" -type f \( \
      -iname '*lesson36*' -o \
      -iname '*lesson_36*' -o \
      -path '*/lesson36-*/*' -o \
      -path '*/lesson_36_*/*' \
    \) 2>/dev/null |
    sort |
    sed "s|$PROJECT/||" |
    head -n 200 || true

  echo
  echo "============================================================"
  echo "10) فحص حالة Git للتأكد من عدم التعديل"
  echo "============================================================"

  git status --short
  echo
  echo "ملاحظة: السكربت للقراءة فقط ولم يكتب داخل المشروع."

  echo
  echo "============================================================"
  echo "انتهى الفحص"
  echo "============================================================"

} | tee "$REPORT"

echo
echo "تم حفظ التقرير في:"
echo "$REPORT"
echo
echo "لم يتم تعديل أي ملف في المشروع."
