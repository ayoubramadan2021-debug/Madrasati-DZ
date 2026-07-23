#!/data/data/com.termux/files/usr/bin/bash
set -u

PROJECT="/data/data/com.termux/files/home/madrasati-dz"
REPORT="$HOME/lesson36_actual_content_report.txt"

CURRICULUM_PUBLIC="$PROJECT/public/generated/curriculum/lesson_36.json"
CURRICULUM_SRC="$PROJECT/src/generated/curriculum/lesson_36.json"
WORLD_PAGE="$PROJECT/src/pages/World2LessonPage.tsx"
LESSONS_JSON="$PROJECT/src/generated/world2-lessons-36-45.json"

if [ ! -d "$PROJECT" ]; then
  echo "خطأ: مجلد المشروع غير موجود:"
  echo "$PROJECT"
  exit 1
fi

cd "$PROJECT" || exit 1

{
  echo "============================================================"
  echo "التحقق من المحتوى الفعلي للدرس 36"
  echo "============================================================"
  echo
  echo "المشروع: $PROJECT"
  echo "الفرع: $(git branch --show-current 2>/dev/null || echo غير معروف)"
  echo "Commit: $(git rev-parse --short HEAD 2>/dev/null || echo غير معروف)"
  echo "التاريخ: $(date '+%Y-%m-%d %H:%M:%S')"
  echo

  echo "============================================================"
  echo "1) تحديد ملف curriculum الفعلي للدرس 36"
  echo "============================================================"

  FOUND_CURRICULUM=""

  for file in \
    "$CURRICULUM_PUBLIC" \
    "$CURRICULUM_SRC"
  do
    if [ -f "$file" ]; then
      echo "[موجود] ${file#$PROJECT/}"
      FOUND_CURRICULUM="$file"
    else
      echo "[غير موجود] ${file#$PROJECT/}"
    fi
  done

  echo
  echo "نتائج البحث المحدود:"
  find "$PROJECT" \
    -type f \
    \( -name 'lesson_36.json' -o -name '*lesson36*.json' \) \
    2>/dev/null |
    grep -v '/node_modules/' |
    grep -v '/.git/' |
    sort |
    sed "s|$PROJECT/||"

  echo
  echo "============================================================"
  echo "2) عرض محتوى curriculum للدرس 36"
  echo "============================================================"

  if [ -n "$FOUND_CURRICULUM" ] && [ -f "$FOUND_CURRICULUM" ]; then
    echo "الملف: ${FOUND_CURRICULUM#$PROJECT/}"
    echo
    cat "$FOUND_CURRICULUM"
  else
    echo "لم يُعثر على ملف lesson_36.json في المسارين المتوقعين."
  fi

  echo
  echo "============================================================"
  echo "3) استخراج العنوان والمفهوم والمشاهد والنصوص"
  echo "============================================================"

  if [ -n "$FOUND_CURRICULUM" ] && [ -f "$FOUND_CURRICULUM" ]; then
    grep -nE \
      '"title|"title_ar|"lesson_title|"objective|"concept|"subject|"prompt|"text|"narration|"description|"scene|"audio|"image|"exercise|"activity|"sort|"count|"number|"quantity|"classif|أصنف|تصنيف|عدد|أعداد|عشرة|تسعة عشر' \
      "$FOUND_CURRICULUM" 2>/dev/null |
      head -n 260 || true
  else
    echo "لا يوجد ملف curriculum متاح للاستخراج."
  fi

  echo
  echo "============================================================"
  echo "4) فحص ملفات الصوت الخاصة بالدرس 36"
  echo "============================================================"

  AUDIO_DIR="$PROJECT/public/audio/teachers/khalil/lesson_36_amusement_sorting"

  if [ -d "$AUDIO_DIR" ]; then
    echo "المجلد: ${AUDIO_DIR#$PROJECT/}"
    echo
    find "$AUDIO_DIR" \
      -maxdepth 2 \
      -type f \
      2>/dev/null |
      sort |
      sed "s|$PROJECT/||"

    echo
    echo "--- النصوص الموجودة في ملفات WordBoundary JSON ---"

    while IFS= read -r json; do
      echo
      echo "### ${json#$PROJECT/}"

      if command -v jq >/dev/null 2>&1; then
        jq -r '
          if type == "array" then
            map(
              if type == "object" then
                (.text // .word // .value // empty)
              else
                tostring
              end
            ) | join(" ")
          elif type == "object" then
            (
              .words //
              .wordBoundaries //
              .timings //
              .items //
              []
            )
            | map(.text // .word // .value // empty)
            | join(" ")
          else
            tostring
          end
        ' "$json" 2>/dev/null || cat "$json"
      else
        sed -n '1,120p' "$json"
      fi
    done < <(
      find "$AUDIO_DIR" \
        -maxdepth 2 \
        -type f \
        -name '*.json' \
        2>/dev/null |
        sort
    )
  else
    echo "مجلد الصوت غير موجود:"
    echo "${AUDIO_DIR#$PROJECT/}"
  fi

  echo
  echo "============================================================"
  echo "5) فحص صور الدرس 36 وأسمائها فقط"
  echo "============================================================"

  IMAGE_DIR="$PROJECT/public/lessons/v2/lesson36"

  if [ -d "$IMAGE_DIR" ]; then
    echo "المجلد: ${IMAGE_DIR#$PROJECT/}"
    find "$IMAGE_DIR" \
      -maxdepth 2 \
      -type f \
      2>/dev/null |
      sort |
      while IFS= read -r file; do
        size=$(wc -c < "$file" | tr -d ' ')
        echo "${file#$PROJECT/} — ${size} bytes"
      done
  else
    echo "مجلد الصور غير موجود:"
    echo "${IMAGE_DIR#$PROJECT/}"
  fi

  echo
  echo "============================================================"
  echo "6) عرض تعريف lesson36 داخل World2LessonPage"
  echo "============================================================"

  if [ -f "$WORLD_PAGE" ]; then
    sed -n '1,75p' "$WORLD_PAGE"
  else
    echo "الملف غير موجود:"
    echo "${WORLD_PAGE#$PROJECT/}"
  fi

  echo
  echo "============================================================"
  echo "7) عرض منطق زر النشاط والتنقل"
  echo "============================================================"

  if [ -f "$WORLD_PAGE" ]; then
    sed -n '320,363p' "$WORLD_PAGE"
  else
    echo "World2LessonPage.tsx غير موجود."
  fi

  echo
  echo "============================================================"
  echo "8) التحقق من مسارات تمارين الدروس 33 إلى 36"
  echo "============================================================"

  grep -RInE \
    --include='*.tsx' \
    --include='*.ts' \
    'lesson-v2/(33|34|35|36)/exercises|World2LessonPage|Lesson35FullscreenPremiumV3|Lesson35PremiumBreathingExercises' \
    "$PROJECT/src" 2>/dev/null |
    sed "s|$PROJECT/||" |
    head -n 220 || true

  echo
  echo "============================================================"
  echo "9) بيانات lesson36 من القائمة المولدة"
  echo "============================================================"

  if [ -f "$LESSONS_JSON" ]; then
    if command -v jq >/dev/null 2>&1; then
      jq '.lessons[] | select(.number == 36)' "$LESSONS_JSON"
    else
      sed -n '1,24p' "$LESSONS_JSON"
    fi
  else
    echo "الملف غير موجود:"
    echo "${LESSONS_JSON#$PROJECT/}"
  fi

  echo
  echo "============================================================"
  echo "10) البحث المحدود عن موضوع الأعداد إلى 19"
  echo "============================================================"

  grep -RInE \
    --include='*.tsx' \
    --include='*.ts' \
    --include='*.json' \
    'الأعداد إلى 19|الأعداد.*19|من 10 إلى 19|من عشرة إلى تسعة عشر|numbers.?to.?19|numbers.?10.?19' \
    "$PROJECT/src" \
    "$PROJECT/public/generated" \
    2>/dev/null |
    sed "s|$PROJECT/||" |
    head -n 160 || true

  echo
  echo "============================================================"
  echo "11) حالة Git"
  echo "============================================================"

  git status --short

  echo
  echo "============================================================"
  echo "انتهى الفحص دون تعديل أي ملف"
  echo "============================================================"

} | tee "$REPORT"

echo
echo "تم حفظ التقرير في:"
echo "$REPORT"
echo
echo "لم يتم تعديل أي ملف داخل المشروع."
