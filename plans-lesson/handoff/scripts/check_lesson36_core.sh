#!/data/data/com.termux/files/usr/bin/bash
set -e

cd /data/data/com.termux/files/home/madrasati-dz

REPORT="$HOME/lesson36_core_report.txt"

{
  echo "=== PremiumExerciseEngineV2: الأنواع والخصائص ==="
  sed -n '1,110p' \
    src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx

  echo
  echo "=== طريقة استدعاء المحرك وأزرار النهاية ==="
  grep -nE \
    'export default|config:|onBack|onComplete|restart|completed|question\.choices|correctChoiceId' \
    src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx |
    head -n 80

  echo
  echo "=== صفحة lesson35 المرجعية ==="
  sed -n '1,180p' \
    src/features/lesson-v2/exercises-v2/Lesson35FullscreenPremiumV3.tsx

  echo
  echo "=== مسار تمارين lesson35 ==="
  grep -RIn \
    --include='*.tsx' \
    --include='*.ts' \
    'lesson-v2/35/exercises\|Lesson35FullscreenPremiumV3' \
    src |
    head -n 40

  echo
  echo "=== ربط زر النشاط في World2LessonPage ==="
  sed -n '1,65p' src/pages/World2LessonPage.tsx
  sed -n '340,363p' src/pages/World2LessonPage.tsx

  echo
  echo "=== حالة ملفات src فقط ==="
  git status --short -- src

} | tee "$REPORT"

echo
echo "التقرير: $REPORT"
echo "لم يتم تعديل أي ملف."
