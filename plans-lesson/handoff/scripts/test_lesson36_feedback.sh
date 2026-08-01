#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

URL="http://127.0.0.1:5173/lesson-v2/36/exercises?test=$(date +%s)"

curl -fsS "$URL" >/dev/null || {
  echo "❌ خادم المعاينة غير متاح."
  exit 1
}

termux-open-url "$URL"

echo "اختبار واحد فقط:"
echo "1. المس البالونات الاثني عشر."
echo "2. اختر 11 أولًا: يجب ظهور «حَاوِلْ مَرَّةً أُخْرَى ✨» دون انتقال."
echo "3. اختر 12: يجب ظهور «أَحْسَنْتَ!» ثم الانتقال إلى السؤال 2 / 2."
