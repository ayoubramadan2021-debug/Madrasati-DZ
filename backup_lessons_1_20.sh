#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

STAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="$HOME/madrasati_backups"
BACKUP_FILE="$BACKUP_DIR/backup_lessons_1_20_$STAMP.tar.gz"

mkdir -p "$BACKUP_DIR"

echo "===== إنشاء نسخة احتياطية للدروس 1 إلى 20 ====="

tar -czf "$BACKUP_FILE" \
  src/features/lesson-v2/content/lesson*.ts \
  src/pages/Lesson*ExercisesPage.tsx \
  src/features/lesson-v2/exercises-v2 \
  src/features/lesson-v2/components/LessonCompleteV2.tsx \
  src/pages/LessonV2Page.tsx \
  src/features/lesson-v2/v2Registry.ts \
  src/App.tsx \
  public/lessons/v2 \
  public/audio \
  lesson-plans \
  resume.md \
  package.json

echo ""
echo "✅ تم إنشاء النسخة الاحتياطية:"
ls -lh "$BACKUP_FILE"

echo ""
echo "===== آخر النسخ الاحتياطية ====="
ls -lh "$BACKUP_DIR" | tail -10
