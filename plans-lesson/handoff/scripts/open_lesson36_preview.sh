#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

URL="http://127.0.0.1:5173/lesson-v2/36/exercises"

if ! curl -fsS "$URL" >/dev/null; then
  echo "❌ خادم المعاينة غير متاح."
  echo "شغّل أولًا: ~/preview_lesson36.sh"
  exit 1
fi

termux-open-url "$URL"

echo "✅ تم فتح نشاط الدرس 36 في المتصفح."
echo
echo "تحقق يدويًا من:"
echo "- الشاشة الكاملة وعدم ظهور واجهة الدرس خلفها."
echo "- تشغيل السؤال تلقائيًا وزر إعادة الصوت."
echo "- ظهور الكاريوكي والتوهج الذهبي."
echo "- الإجابة الصحيحة والخاطئة."
echo "- عدم الانتقال عند الخطأ."
echo "- الانتقال التلقائي بعد الإجابة الصحيحة."
echo "- المهام الأربع وشاشة النهاية."
