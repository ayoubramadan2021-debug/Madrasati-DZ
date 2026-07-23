#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
LESSON_DIR="$PROJECT/public/lessons/v2/lesson44"
AUDIO_DIR="$PROJECT/public/audio/teachers/khalil/lesson_44_half_number_under_20"
NARRATION="$AUDIO_DIR/narration.json"
PAGE="$PROJECT/src/pages/World2LessonPage.tsx"
REPORT="/sdcard/Download/lesson44_final_links_report.txt"

ERRORS=0

echo "============================================================" | tee "$REPORT"
echo "LESSON 44 — FINAL LINK VERIFICATION" | tee -a "$REPORT"
echo "============================================================" | tee -a "$REPORT"

for i in 1 2 3 4 5 6; do
  if [ -s "$LESSON_DIR/s${i}.webp" ]; then
    echo "✅ s${i}.webp موجودة" | tee -a "$REPORT"
  else
    echo "❌ s${i}.webp مفقودة" | tee -a "$REPORT"
    ERRORS=$((ERRORS + 1))
  fi
done

if [ -d "$AUDIO_DIR" ]; then
  echo "✅ مجلد الصوت الصحيح موجود" | tee -a "$REPORT"
  echo "$AUDIO_DIR" | tee -a "$REPORT"
else
  echo "❌ مجلد الصوت الصحيح غير موجود" | tee -a "$REPORT"
  ERRORS=$((ERRORS + 1))
fi

for i in 1 2 3 4 5 6; do
  MP3="$AUDIO_DIR/lesson44_s${i}.mp3"
  JSON="$AUDIO_DIR/lesson44_s${i}.json"

  if [ -s "$MP3" ]; then
    echo "✅ lesson44_s${i}.mp3 موجود" | tee -a "$REPORT"
  else
    echo "❌ lesson44_s${i}.mp3 مفقود" | tee -a "$REPORT"
    ERRORS=$((ERRORS + 1))
  fi

  if [ -s "$JSON" ]; then
    echo "✅ lesson44_s${i}.json موجود" | tee -a "$REPORT"
  else
    echo "❌ lesson44_s${i}.json مفقود" | tee -a "$REPORT"
    ERRORS=$((ERRORS + 1))
  fi
done

if [ -s "$NARRATION" ]; then
  echo "✅ narration.json موجود" | tee -a "$REPORT"
else
  echo "❌ narration.json مفقود" | tee -a "$REPORT"
  ERRORS=$((ERRORS + 1))
fi

python - "$NARRATION" "$LESSON_DIR" <<'PY'
import json
import sys
from pathlib import Path

narration_path = Path(sys.argv[1])
lesson_dir = Path(sys.argv[2])

if not narration_path.is_file():
    raise SystemExit("narration.json غير موجود")

scenes = json.loads(
    narration_path.read_text(encoding="utf-8")
)

if len(scenes) != 6:
    raise SystemExit(
        f"عدد المشاهد في narration.json غير صحيح: {len(scenes)}"
    )

expected_texts = {
    1: "أَمَامَنَا اثْنَتَا عَشْرَةَ بَالُونَةً، وَنُرِيدُ تَوْزِيعَهَا عَلَى مَجْمُوعَتَيْنِ مُتَسَاوِيَتَيْنِ.",
    2: "نُوَزِّعُ اثْنَتَيْ عَشْرَةَ بَالُونَةً بِالتَّسَاوِي، فَنَضَعُ سِتَّ بَالُونَاتٍ فِي كُلِّ مَجْمُوعَةٍ. إِذَنْ نِصْفُ اثْنَيْ عَشَرَ هُوَ سِتَّةٌ.",
    3: "نُوَزِّعُ ثَمَانِيَةَ مُكَعَّبَاتٍ عَلَى مَجْمُوعَتَيْنِ مُتَسَاوِيَتَيْنِ. فِي كُلِّ مَجْمُوعَةٍ أَرْبَعَةُ مُكَعَّبَاتٍ. إِذَنْ نِصْفُ ثَمَانِيَةٍ هُوَ أَرْبَعَةٌ.",
    4: "نُوَزِّعُ أَرْبَعَ عَشْرَةَ بَالُونَةً عَلَى مَجْمُوعَتَيْنِ مُتَسَاوِيَتَيْنِ. فِي كُلِّ مَجْمُوعَةٍ سَبْعُ بَالُونَاتٍ. إِذَنْ نِصْفُ أَرْبَعَةَ عَشَرَ هُوَ سَبْعَةٌ.",
    5: "نُطَابِقُ كُلَّ عَدَدٍ مَعَ نِصْفِهِ. نِصْفُ أَرْبَعَةٍ هُوَ اثْنَانِ، وَنِصْفُ سِتَّةٍ هُوَ ثَلَاثَةٌ، وَنِصْفُ ثَمَانِيَةٍ هُوَ أَرْبَعَةٌ، وَنِصْفُ عَشَرَةٍ هُوَ خَمْسَةٌ، وَنِصْفُ اثْنَيْ عَشَرَ هُوَ سِتَّةٌ.",
    6: "أَحْسَنْتُمْ! نَجِدُ نِصْفَ الْعَدَدِ عِنْدَمَا نُوَزِّعُ عَنَاصِرَهُ عَلَى مَجْمُوعَتَيْنِ مُتَسَاوِيَتَيْنِ.",
}

for index, scene in enumerate(scenes, start=1):
    scene["scene"] = index
    scene["key"] = f"lesson44_s{index}"
    scene["speaker"] = "khalil"
    scene["image"] = f"/lessons/v2/lesson44/s{index}.webp?v=44-final"
    scene["text"] = expected_texts[index]

narration_path.write_text(
    json.dumps(
        scenes,
        ensure_ascii=False,
        indent=2,
    ) + "\n",
    encoding="utf-8",
)

print("✅ تم توحيد ترتيب الصور والنصوص من S1 إلى S6.")
PY

python - "$PAGE" <<'PY'
from pathlib import Path
import re
import sys

page_path = Path(sys.argv[1])
text = page_path.read_text(encoding="utf-8")

text = re.sub(
    r'/lessons/v2/lesson44/s([1-6])\.webp(?:\?v=[^"\']+)?',
    r'/lessons/v2/lesson44/s\1.webp?v=44-final',
    text,
)

text = text.replace(
    "lesson_44_discover_half_number_less_than_twenty",
    "lesson_44_half_number_under_20",
)

text = text.replace(
    "lesson_44_amusement_number_order",
    "lesson_44_half_number_under_20",
)

page_path.write_text(text, encoding="utf-8")

print("✅ تم تصحيح مسار الصوت ومسارات الصور داخل صفحة العرض.")
PY

cd "$PROJECT"

rm -rf dist
rm -rf node_modules/.vite

if npm run build >/sdcard/Download/lesson44_final_build.log 2>&1; then
  echo "✅ npm build ناجح" | tee -a "$REPORT"
else
  echo "❌ npm build فشل" | tee -a "$REPORT"
  tail -n 60 /sdcard/Download/lesson44_final_build.log
  exit 1
fi

echo "------------------------------------------------------------" | tee -a "$REPORT"
echo "أخطاء الملفات قبل التصحيح: $ERRORS" | tee -a "$REPORT"

if [ "$ERRORS" -eq 0 ]; then
  echo "✅ الصور الست مرتبطة بالترتيب الصحيح." | tee -a "$REPORT"
  echo "✅ الصوت والكاريـوكي موجودان في المجلد الصحيح." | tee -a "$REPORT"
  echo "✅ مسارات العرض محدثة لمنع الكاش القديم." | tee -a "$REPORT"
  echo "النتيجة: درس 44 جاهز للمعاينة النهائية." | tee -a "$REPORT"
else
  echo "❌ توجد ملفات صوت أو كاريوكي مفقودة." | tee -a "$REPORT"
  exit 1
fi

echo "============================================================" | tee -a "$REPORT"
