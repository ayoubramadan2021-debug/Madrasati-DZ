#!/data/data/com.termux/files/usr/bin/bash
set -u

PROJECT="/data/data/com.termux/files/home/madrasati-dz"
EXERCISES="$PROJECT/src/features/lesson-v2/exercises-v2"
COMPONENTS="$PROJECT/src/features/lesson-v2/components"
REPORT="$HOME/lesson36_engines_report.txt"

FILES=(
  "$EXERCISES/PremiumExerciseEngineV2.tsx"
  "$EXERCISES/CountTapExerciseV2.tsx"
  "$EXERCISES/NumberChoiceExerciseV2.tsx"
  "$EXERCISES/MemoryBuildQuantityExerciseV2.tsx"
  "$EXERCISES/MemoryQuantityExerciseV2.tsx"
  "$EXERCISES/MemorySameQuantityExerciseV2.tsx"
  "$EXERCISES/CompareExerciseV2.tsx"
  "$COMPONENTS/ExerciseFullscreenShellV2.tsx"
  "$COMPONENTS/UnifiedExerciseHeaderV2.tsx"
  "$COMPONENTS/UnifiedExerciseFeedbackV2.tsx"
  "$COMPONENTS/UnifiedExerciseKaraokeV2.tsx"
)

if [ ! -d "$PROJECT" ]; then
  echo "خطأ: مجلد المشروع غير موجود:"
  echo "$PROJECT"
  exit 1
fi

cd "$PROJECT" || exit 1

{
  echo "============================================================"
  echo "تقرير فحص محركات نشاط lesson36 — الأعداد إلى 19"
  echo "============================================================"
  echo
  echo "المشروع: $PROJECT"
  echo "الفرع الحالي: $(git branch --show-current 2>/dev/null || echo غير معروف)"
  echo "آخر Commit: $(git rev-parse --short HEAD 2>/dev/null || echo غير معروف)"
  echo "التاريخ: $(date '+%Y-%m-%d %H:%M:%S')"
  echo

  echo "============================================================"
  echo "1) التحقق من وجود الملفات المستهدفة"
  echo "============================================================"

  for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
      lines=$(wc -l < "$file" | tr -d ' ')
      echo "[موجود] ${file#$PROJECT/} — $lines سطرًا"
    else
      echo "[غير موجود] ${file#$PROJECT/}"
    fi
  done

  echo
  echo "============================================================"
  echo "2) بنية الأنواع والخصائص والدوال المهمة"
  echo "============================================================"

  for file in "${FILES[@]}"; do
    [ -f "$file" ] || continue

    echo
    echo "------------------------------"
    echo "الملف: ${file#$PROJECT/}"
    echo "------------------------------"

    grep -nE \
      '^(export )?(type|interface|const|function|class) |Props|Question|Task|Option|Item|onComplete|onClose|onBack|audio|karaoke|wordBound|feedback|correct|retry|fullscreen|FullScreen|selected|answer|quantity|count|target|compare|memory' \
      "$file" 2>/dev/null | head -n 160 || true
  done

  echo
  echo "============================================================"
  echo "3) الاستيرادات والاعتماد على المكونات الموحدة"
  echo "============================================================"

  for file in \
    "$EXERCISES/PremiumExerciseEngineV2.tsx" \
    "$EXERCISES/CountTapExerciseV2.tsx" \
    "$EXERCISES/NumberChoiceExerciseV2.tsx" \
    "$EXERCISES/MemoryBuildQuantityExerciseV2.tsx" \
    "$EXERCISES/MemoryQuantityExerciseV2.tsx" \
    "$EXERCISES/MemorySameQuantityExerciseV2.tsx" \
    "$EXERCISES/CompareExerciseV2.tsx"
  do
    [ -f "$file" ] || continue

    echo
    echo "------------------------------"
    echo "الملف: ${file#$PROJECT/}"
    echo "------------------------------"

    sed -n '1,100p' "$file" |
      grep -nE '^import |ExerciseFullscreenShellV2|UnifiedExercise(Header|Feedback|Karaoke)V2|correct\.mp3|retry\.mp3' ||
      true
  done

  echo
  echo "============================================================"
  echo "4) طريقة عرض السؤال والإجابة والتحقق والانتقال"
  echo "============================================================"

  for file in \
    "$EXERCISES/PremiumExerciseEngineV2.tsx" \
    "$EXERCISES/CountTapExerciseV2.tsx" \
    "$EXERCISES/NumberChoiceExerciseV2.tsx" \
    "$EXERCISES/MemoryBuildQuantityExerciseV2.tsx" \
    "$EXERCISES/MemoryQuantityExerciseV2.tsx" \
    "$EXERCISES/MemorySameQuantityExerciseV2.tsx" \
    "$EXERCISES/CompareExerciseV2.tsx"
  do
    [ -f "$file" ] || continue

    echo
    echo "------------------------------"
    echo "الملف: ${file#$PROJECT/}"
    echo "------------------------------"

    grep -nE \
      'handle[A-Z]|check[A-Z]|submit|validate|isCorrect|correctAnswer|selectedAnswer|setTimeout|nextQuestion|nextTask|currentQuestion|currentTask|attempt|retry|onComplete|playAudio|Audio\(' \
      "$file" 2>/dev/null | head -n 180 || true
  done

  echo
  echo "============================================================"
  echo "5) البحث المحدود عن استعمال هذه المحركات في دروس سابقة"
  echo "============================================================"

  for engine in \
    PremiumExerciseEngineV2 \
    CountTapExerciseV2 \
    NumberChoiceExerciseV2 \
    MemoryBuildQuantityExerciseV2 \
    MemoryQuantityExerciseV2 \
    MemorySameQuantityExerciseV2 \
    CompareExerciseV2
  do
    echo
    echo "### $engine"

    grep -RIl \
      --include='*.tsx' \
      --include='*.ts' \
      "$engine" \
      "$EXERCISES" 2>/dev/null |
      grep -v "/$engine.tsx$" |
      head -n 20 |
      sed "s|$PROJECT/||" || true
  done

  echo
  echo "============================================================"
  echo "6) عينات من بيانات الأنشطة العددية الموجودة"
  echo "============================================================"

  grep -RInE \
    --include='*.tsx' \
    --include='*.ts' \
    'CountTapExerciseV2|NumberChoiceExerciseV2|MemoryBuildQuantityExerciseV2|MemoryQuantityExerciseV2|MemorySameQuantityExerciseV2' \
    "$EXERCISES" 2>/dev/null |
    head -n 160 || true

  echo
  echo "============================================================"
  echo "7) البحث عن أصول صوتية وبصرية عددية موجودة"
  echo "============================================================"

  echo
  echo "ملفات صوتية محتملة مرتبطة بالأعداد أو الكميات:"
  find "$PROJECT/public" -type f \( \
      -iname '*.mp3' -o \
      -iname '*.wav' -o \
      -iname '*.json' \
    \) 2>/dev/null |
    grep -Ei '/(number|numbers|count|quantity|lesson.?36|36_|audio).*\.(mp3|wav|json)$' |
    head -n 120 |
    sed "s|$PROJECT/||" || true

  echo
  echo "صور محتملة مرتبطة بالأعداد أو العد:"
  find "$PROJECT/public" -type f \( \
      -iname '*.webp' -o \
      -iname '*.png' -o \
      -iname '*.jpg' -o \
      -iname '*.jpeg' -o \
      -iname '*.svg' \
    \) 2>/dev/null |
    grep -Ei '/(number|numbers|count|quantity|lesson.?36|36_|objects|items)/' |
    head -n 120 |
    sed "s|$PROJECT/||" || true

  echo
  echo "============================================================"
  echo "8) خلاصة هندسية أولية للدرس 36"
  echo "============================================================"
  cat <<'SUMMARY'

أفضل تركيب مبدئي للنشاط:
- استعمال PremiumExerciseEngineV2 كغلاف موحد عندما تكون المهمة قائمة على سؤال وبطاقات.
- استعمال CountTapExerciseV2 لمهمة العد باللمس.
- استعمال NumberChoiceExerciseV2 لاختيار العدد المطابق للكمية.
- إعادة استعمال منطق MemoryBuildQuantityExerciseV2 لمهمة بناء العدد.
- استعمال CompareExerciseV2 أو بطاقات PremiumExerciseEngineV2 لمقارنة تمثيلين عدديين.

شكل أربع مهام مقترحة:
1. أَعُدُّ وَأَلْمَسُ
   يعرض عدد من العناصر، ويلمس الطفل العناصر واحدة بعد أخرى حتى يصل إلى الكمية المطلوبة.

2. أَخْتَارُ العَدَدَ
   تعرض مجموعة عناصر من 10 إلى 19، ثم يختار الطفل الرقم الصحيح من بطاقات كبيرة.

3. أَبْنِي العَدَدَ
   يكوّن الطفل عددًا مثل 14 أو 18 باستعمال عشرة كاملة ووحدات إضافية، أو بإضافة عناصر إلى مساحة البناء.

4. أُقَارِنُ التَّمْثِيلَاتِ
   يحدد الطفل أي تمثيلين يعبران عن العدد نفسه، أو يختار المجموعة الموافقة لبطاقة العدد.

الأصول المتوقعة:
- ملفات صوت MP3 لنصوص المهام والأسئلة.
- ملفات WordBoundary JSON مطابقة لكل ملف صوت.
- عناصر مرئية قابلة للتكرار للعد، ويفضل SVG أو WebP بخلفية شفافة.
- تمثيل بصري للعشرة الكاملة والوحدات.
- لا يلزم إنشاء صور مشاهد الدرس الست من جديد.
- أصوات التغذية الراجعة يعاد استعمالها من:
  public/audio/v2_feedback/correct.mp3
  public/audio/v2_feedback/retry.mp3

ملاحظة:
هذه خلاصة أولية فقط. القرار النهائي يعتمد على تفاصيل Props وطريقة دمج كل محرك الظاهرة في بقية التقرير.
SUMMARY

  echo
  echo "============================================================"
  echo "انتهى الفحص دون تعديل أي ملف."
  echo "============================================================"

} | tee "$REPORT"

echo
echo "تم حفظ التقرير في:"
echo "$REPORT"
echo
echo "لم يتم تعديل أي ملف في المشروع."
