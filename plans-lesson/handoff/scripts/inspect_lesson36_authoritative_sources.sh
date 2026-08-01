#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="/data/data/com.termux/files/home/madrasati-dz"
REPORT="$HOME/lesson36_authoritative_sources_report.txt"

AUDIO_DIR="$PROJECT/public/audio/teachers/khalil/lesson_36_amusement_sorting"
IMAGE_DIR="$PROJECT/public/lessons/v2/lesson36"
NUMBER_BACKUP_DIR="$PROJECT/backups/lesson4_numbers_audio_20260720_070449"
WORLD_JSON="$PROJECT/src/generated/world2-lessons-36-45.json"
WORLD_PAGE="$PROJECT/src/pages/World2LessonPage.tsx"
RESUME="$PROJECT/resume.md"

if [ ! -d "$PROJECT" ]; then
  echo "خطأ: مجلد المشروع غير موجود:"
  echo "$PROJECT"
  exit 1
fi

cd "$PROJECT"

extract_words() {
  local file="$1"

  if command -v jq >/dev/null 2>&1; then
    jq -r '
      def word:
        if type == "string" then .
        elif type == "object" then
          (.text // .word // .value // .displayText // "")
        else
          ""
        end;

      if type == "array" then
        map(word) | map(select(length > 0)) | join(" ")
      elif type == "object" then
        (
          .words //
          .wordBoundaries //
          .timings //
          .items //
          .segments //
          []
        )
        | map(word)
        | map(select(length > 0))
        | join(" ")
      else
        ""
      end
    ' "$file" 2>/dev/null || true
  else
    grep -oE '"(text|word|value|displayText)"[[:space:]]*:[[:space:]]*"[^"]+"' "$file" |
      sed -E 's/^"[^"]+"[[:space:]]*:[[:space:]]*"//; s/"$//' |
      paste -sd ' ' -
  fi
}

{
  echo "============================================================"
  echo "المصادر الفعلية للدرس 36"
  echo "============================================================"
  echo
  echo "المشروع: $PROJECT"
  echo "الفرع: $(git branch --show-current)"
  echo "Commit: $(git rev-parse --short HEAD)"
  echo "التاريخ: $(date '+%Y-%m-%d %H:%M:%S')"
  echo

  echo "============================================================"
  echo "1) بيانات lesson36 المسجلة في قائمة الدروس"
  echo "============================================================"

  if [ -f "$WORLD_JSON" ]; then
    if command -v jq >/dev/null 2>&1; then
      jq '.lessons[] | select(.number == 36)' "$WORLD_JSON"
    else
      sed -n '1,22p' "$WORLD_JSON"
    fi
  else
    echo "[غير موجود] ${WORLD_JSON#$PROJECT/}"
  fi

  echo
  echo "============================================================"
  echo "2) تعريف lesson36 في صفحة World 2"
  echo "============================================================"

  if [ -f "$WORLD_PAGE" ]; then
    grep -n -B 5 -A 10 \
      'lesson_36_amusement_sorting' \
      "$WORLD_PAGE" || true
  else
    echo "[غير موجود] ${WORLD_PAGE#$PROJECT/}"
  fi

  echo
  echo "============================================================"
  echo "3) النص الحقيقي المستخرج من صوت المشاهد الحالية"
  echo "============================================================"

  if [ -d "$AUDIO_DIR" ]; then
    for scene in 1 2 3 4 5 6; do
      json="$AUDIO_DIR/lesson36_s${scene}.json"
      mp3="$AUDIO_DIR/lesson36_s${scene}.mp3"

      echo
      echo "------------------------------"
      echo "المشهد $scene"
      echo "------------------------------"

      if [ -f "$json" ]; then
        echo "JSON: ${json#$PROJECT/}"
        text="$(extract_words "$json")"

        if [ -n "$text" ]; then
          echo "النص:"
          echo "$text"
        else
          echo "تعذر استخراج النص آليًا، أول 80 سطرًا:"
          sed -n '1,80p' "$json"
        fi
      else
        echo "[JSON غير موجود] ${json#$PROJECT/}"
      fi

      if [ -f "$mp3" ]; then
        echo "MP3: موجود — $(wc -c < "$mp3" | tr -d ' ') bytes"
      else
        echo "MP3: غير موجود"
      fi
    done
  else
    echo "[مجلد الصوت غير موجود] ${AUDIO_DIR#$PROJECT/}"
  fi

  echo
  echo "============================================================"
  echo "4) مقارنة النص الحالي مع نسخة الأعداد الاحتياطية"
  echo "============================================================"

  if [ -d "$NUMBER_BACKUP_DIR" ]; then
    for scene in 1 2 3 4 5 6; do
      json="$NUMBER_BACKUP_DIR/lesson36_s${scene}.json"

      echo
      echo "------------------------------"
      echo "نسخة الأعداد — المشهد $scene"
      echo "------------------------------"

      if [ -f "$json" ]; then
        text="$(extract_words "$json")"

        if [ -n "$text" ]; then
          echo "$text"
        else
          sed -n '1,80p' "$json"
        fi
      else
        echo "[غير موجود] ${json#$PROJECT/}"
      fi
    done
  else
    echo "[مجلد النسخة الاحتياطية غير موجود] ${NUMBER_BACKUP_DIR#$PROJECT/}"
  fi

  echo
  echo "============================================================"
  echo "5) مقارنة بصمات ملفات JSON الحالية والاحتياطية"
  echo "============================================================"

  for scene in 1 2 3 4 5 6; do
    current="$AUDIO_DIR/lesson36_s${scene}.json"
    backup="$NUMBER_BACKUP_DIR/lesson36_s${scene}.json"

    echo
    echo "المشهد $scene:"

    if [ -f "$current" ]; then
      echo "الحالي:    $(sha256sum "$current" | awk '{print $1}')"
    else
      echo "الحالي:    غير موجود"
    fi

    if [ -f "$backup" ]; then
      echo "الاحتياطي: $(sha256sum "$backup" | awk '{print $1}')"
    else
      echo "الاحتياطي: غير موجود"
    fi

    if [ -f "$current" ] && [ -f "$backup" ]; then
      if cmp -s "$current" "$backup"; then
        echo "النتيجة: الملفان متطابقان"
      else
        echo "النتيجة: الملفان مختلفان"
      fi
    fi
  done

  echo
  echo "============================================================"
  echo "6) صور lesson36 الحالية"
  echo "============================================================"

  if [ -d "$IMAGE_DIR" ]; then
    for image in "$IMAGE_DIR"/*; do
      [ -f "$image" ] || continue

      printf '%s — %s bytes' \
        "${image#$PROJECT/}" \
        "$(wc -c < "$image" | tr -d ' ')"

      if command -v file >/dev/null 2>&1; then
        printf ' — %s' "$(file -b "$image")"
      fi

      printf '\n'
    done
  else
    echo "[مجلد الصور غير موجود] ${IMAGE_DIR#$PROJECT/}"
  fi

  echo
  echo "============================================================"
  echo "7) إشارات lesson36 في resume.md"
  echo "============================================================"

  if [ -f "$RESUME" ]; then
    grep -n -i -B 5 -A 12 \
      -E 'lesson36|lesson 36|الدرس 36|الأعداد إلى 19|التصنيف|ألعاب المهرجان' \
      "$RESUME" || true
  else
    echo "[غير موجود] ${RESUME#$PROJECT/}"
  fi

  echo
  echo "============================================================"
  echo "8) أسماء ومسارات أصول lesson36 فقط"
  echo "============================================================"

  find \
    "$AUDIO_DIR" \
    "$IMAGE_DIR" \
    "$NUMBER_BACKUP_DIR" \
    -maxdepth 2 \
    -type f \
    2>/dev/null |
    sort |
    sed "s|$PROJECT/||"

  echo
  echo "============================================================"
  echo "9) حالة Git"
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
