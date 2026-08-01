#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
REPORT="/sdcard/Download/premium_activity_reference_audit.txt"

cd "$PROJECT"

{
  echo "============================================================"
  echo "PREMIUM ACTIVITY REFERENCE AUDIT"
  echo "============================================================"
  echo "المشروع: $PROJECT"
  echo "التاريخ: $(date '+%Y-%m-%d %H:%M:%S')"
  echo

  echo "============================================================"
  echo "1 — المسارات المتعلقة بالدرس الثالث والأنشطة"
  echo "============================================================"

  rg -n -i \
    "lesson-v2|lesson35|lesson_35|activity|exercise|quiz|أتَنَفَّس|أتنفس|التنفس|عالم المرح" \
    src public \
    --glob '!dist/**' \
    --glob '!node_modules/**' \
    2>/dev/null || true

  echo
  echo "============================================================"
  echo "2 — ملفات الصفحات والمكونات المحتملة"
  echo "============================================================"

  find src -type f \( \
    -iname '*activity*' -o \
    -iname '*exercise*' -o \
    -iname '*quiz*' -o \
    -iname '*lesson*v2*' -o \
    -iname '*world2*' -o \
    -iname '*feedback*' -o \
    -iname '*karaoke*' \
  \) | sort

  echo
  echo "============================================================"
  echo "3 — ملفات الدرس الثالث المرجعي"
  echo "============================================================"

  for DIR in \
    "$PROJECT/public/lessons/v2/lesson35" \
    "$PROJECT/public/lessons/v2/lesson3" \
    "$PROJECT/public/activities/world2/activity35" \
    "$PROJECT/public/activities/world2/activity3"
  do
    if [ -d "$DIR" ]; then
      echo
      echo "المجلد: $DIR"
      find "$DIR" -maxdepth 3 -type f -printf '%p | %s bytes\n' | sort
    fi
  done

  echo
  echo "============================================================"
  echo "4 — بنية Routes"
  echo "============================================================"

  rg -n \
    "Route|Routes|lesson-v2|world2-lesson|activity|exercise|quiz" \
    src \
    --glob '*.tsx' \
    --glob '*.ts' \
    2>/dev/null || true

  echo
  echo "============================================================"
  echo "5 — مكونات Full Screen والتجاوب"
  echo "============================================================"

  rg -n -i \
    "100vh|100dvh|min-h-screen|h-screen|fullscreen|overflow-hidden|safe-area|position: fixed|fixed inset|viewport" \
    src \
    --glob '*.tsx' \
    --glob '*.ts' \
    --glob '*.css' \
    2>/dev/null || true

  echo
  echo "============================================================"
  echo "6 — نظام الإجابة والتغذية الراجعة"
  echo "============================================================"

  rg -n \
    "أَحْسَنْتَ|أحسنت|حَاوِلْ مَرَّةً أُخْرَى|حاول مرة أخرى|correct|incorrect|wrong|feedback|success|retry|attempt" \
    src public \
    --glob '!dist/**' \
    --glob '!node_modules/**' \
    2>/dev/null || true

  echo
  echo "============================================================"
  echo "7 — الصوت والكاريـوكي"
  echo "============================================================"

  rg -n -i \
    "WordBoundary|karaoke|audioKey|audio_key|audioBase|audio_base|currentWord|wordIndex|playAudio|speech|speaker" \
    src \
    --glob '*.tsx' \
    --glob '*.ts' \
    2>/dev/null || true

  echo
  echo "============================================================"
  echo "8 — عداد التقدم والبطاقات والأسئلة"
  echo "============================================================"

  rg -n -i \
    "currentQuestion|questionIndex|currentStep|totalSteps|progress|rounds|cards|options|answers|correctAnswer|selectedAnswer" \
    src \
    --glob '*.tsx' \
    --glob '*.ts' \
    2>/dev/null || true

  echo
  echo "============================================================"
  echo "9 — ملفات CSS العامة"
  echo "============================================================"

  find src -type f -iname '*.css' -print | sort

  echo
  echo "============================================================"
  echo "10 — معلومات البناء"
  echo "============================================================"

  echo "package.json:"
  sed -n '1,240p' package.json 2>/dev/null || true

  echo
  echo "============================================================"
  echo "11 — Git"
  echo "============================================================"

  echo "الفرع: $(git branch --show-current)"
  echo "آخر commit: $(git rev-parse --short HEAD)"
  git status --short

  echo
  echo "============================================================"
  echo "انتهى الفحص"
  echo "============================================================"
} > "$REPORT"

echo "✅ تم فحص الدرس الثالث ومحركات التمارين."
echo "✅ التقرير محفوظ في:"
echo "$REPORT"
echo
echo "أرسل محتوى التقرير بهذا الأمر:"
echo "cat '$REPORT'"
