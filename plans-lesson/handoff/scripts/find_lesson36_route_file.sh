#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

echo "=== ملف مسار lesson35 المرجعي ==="

grep -RIn \
  --include='*.tsx' \
  --include='*.ts' \
  -E 'path=.*lesson-v2/35/exercises|lesson-v2/35/exercises.*element|Lesson35FullscreenPremiumV3' \
  src \
  | head -n 30

echo
echo "=== ملفات الراوتر المحتملة ==="

grep -RIl \
  --include='*.tsx' \
  --include='*.ts' \
  -E '<Route|createBrowserRouter|useRoutes' \
  src \
  | sort

echo
echo "لم يتم تعديل أي ملف."
