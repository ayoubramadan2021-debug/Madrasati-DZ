#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) التحقق ====="

[ -f package.json ] || { echo "❌ package.json غير موجود"; exit 1; }

for n in 1 2 3 4 5 6; do
  [ -f "/sdcard/Pictures/S$n.png" ] || { echo "❌ ناقصة: /sdcard/Pictures/S$n.png"; exit 1; }
  echo "✅ موجودة: S$n.png"
done

command -v cwebp >/dev/null || { echo "❌ cwebp غير مثبت"; exit 1; }
command -v edge-tts >/dev/null || { echo "❌ edge-tts غير مثبت"; exit 1; }
command -v ffprobe >/dev/null || { echo "❌ ffprobe غير مثبت"; exit 1; }

echo ""
echo "===== 2) ضغط الصور ====="
mkdir -p public/lessons/v2/lesson19-food

for n in 1 2 3 4 5 6; do
  cwebp -q 82 "/sdcard/Pictures/S$n.png" -o "public/lessons/v2/lesson19-food/s$n.webp"
  echo "✅ s$n.webp"
done

echo ""
echo "===== 3) إنشاء lesson19.ts ====="
mkdir -p src/features/lesson-v2/content

cat > src/features/lesson-v2/content/lesson19.ts <<'TS'
export const LESSON_19_CONTENT = {
  metadata: {
    title_ar: "أُصَنِّفُ أَغْذِيَتِي",
    title_fr: "Je classe mes aliments",
    subject: "science",
    grade: 1,
    sort_order: 19,
    template_version: 2,
  },

  audio_base: "/audio/lesson_19_food_groups",

  scenes: [
    {
      scene_image: "/lessons/v2/lesson19-food/s1.webp",
      audio_key: "s1_intro",
      text: "مَرْحَبًا أَطْفَالِي. اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نُصَنِّفُ أَغْذِيَتَنَا إِلَى مَجْمُوعَاتٍ.",
    },
    {
      scene_image: "/lessons/v2/lesson19-food/s2.webp",
      audio_key: "s2_fruits_vegetables",
      text: "أُنْظُرُوا إِلَى هَذِهِ الأَغْذِيَةِ. التُّفَّاحُ وَالبُرْتُقَالُ وَالجَزَرُ وَالطَّمَاطِمُ مِنْ مَجْمُوعَةِ الخُضَرِ وَالفَوَاكِهِ.",
    },
    {
      scene_image: "/lessons/v2/lesson19-food/s3.webp",
      audio_key: "s3_meat_fish",
      text: "أُنْظُرُوا إِلَى الدَّجَاجِ وَاللَّحْمِ وَالسَّمَكِ. هَذِهِ مِنْ مَجْمُوعَةِ اللُّحُومِ وَالأَسْمَاكِ.",
    },
    {
      scene_image: "/lessons/v2/lesson19-food/s4.webp",
      audio_key: "s4_dairy",
      text: "الحَلِيبُ وَالجُبْنُ وَاليَاغُورْتُ مِنْ مَجْمُوعَةِ الحَلِيبِ وَمُشْتَقَّاتِهِ.",
    },
    {
      scene_image: "/lessons/v2/lesson19-food/s5.webp",
      audio_key: "s5_grains",
      text: "الخُبْزُ وَالأَرُزُّ وَالمَعْكَرُونَةُ مِنْ مَجْمُوعَةِ الحُبُوبِ وَمُشْتَقَّاتِهَا.",
    },
    {
      scene_image: "/lessons/v2/lesson19-food/s6.webp",
      audio_key: "s6_closing",
      text: "أَحْسَنْتُمْ. تَعَلَّمْنَا أَنْ نُصَنِّفَ أَغْذِيَتَنَا إِلَى مَجْمُوعَاتٍ مُفِيدَةٍ.",
      is_closing: true,
      cta_text: "هَيَّا إِلَى التَّمَارِين ←",
    },
  ],
};
TS

echo "✅ lesson19.ts"

echo ""
echo "===== 4) توليد صوت تالين + الكاريوكي ====="
mkdir -p public/audio/lesson_19_food_groups

python - <<'PY'
import json, subprocess, re
from pathlib import Path

AUDIO = Path("public/audio/lesson_19_food_groups")
VOICE = "ar-DZ-AminaNeural"

items = {
"s1_intro": "مَرْحَبًا أَطْفَالِي. اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نُصَنِّفُ أَغْذِيَتَنَا إِلَى مَجْمُوعَاتٍ.",
"s2_fruits_vegetables": "أُنْظُرُوا إِلَى هَذِهِ الأَغْذِيَةِ. التُّفَّاحُ وَالبُرْتُقَالُ وَالجَزَرُ وَالطَّمَاطِمُ مِنْ مَجْمُوعَةِ الخُضَرِ وَالفَوَاكِهِ.",
"s3_meat_fish": "أُنْظُرُوا إِلَى الدَّجَاجِ وَاللَّحْمِ وَالسَّمَكِ. هَذِهِ مِنْ مَجْمُوعَةِ اللُّحُومِ وَالأَسْمَاكِ.",
"s4_dairy": "الحَلِيبُ وَالجُبْنُ وَاليَاغُورْتُ مِنْ مَجْمُوعَةِ الحَلِيبِ وَمُشْتَقَّاتِهِ.",
"s5_grains": "الخُبْزُ وَالأَرُزُّ وَالمَعْكَرُونَةُ مِنْ مَجْمُوعَةِ الحُبُوبِ وَمُشْتَقَّاتِهَا.",
"s6_closing": "أَحْسَنْتُمْ. تَعَلَّمْنَا أَنْ نُصَنِّفَ أَغْذِيَتَنَا إِلَى مَجْمُوعَاتٍ مُفِيدَةٍ.",
}

def words(text):
    return [w for w in re.split(r"\s+", text.strip()) if w]

def duration_ms(mp3):
    out = subprocess.check_output([
        "ffprobe","-v","error","-show_entries","format=duration",
        "-of","default=noprint_wrappers=1:nokey=1",str(mp3)
    ], text=True).strip()
    return int(float(out) * 1000)

def karaoke(text, total):
    ws = words(text)
    usable = max(1000, total - 180)
    gap = 25
    start = 120
    weights = [max(1, len(w.replace("،","").replace(".",""))) for w in ws]
    s = sum(weights)
    out = []
    offset = start
    for w, weight in zip(ws, weights):
        dur = int((usable * weight / s) - gap)
        dur = max(320, min(dur, 820))
        out.append({"text": w, "offset": offset, "duration": dur})
        offset += dur + gap
    return out

for key, text in items.items():
    mp3 = AUDIO / f"{key}.mp3"
    js = AUDIO / f"{key}.json"

    subprocess.run([
        "edge-tts",
        "--voice", VOICE,
        "--rate", "+10%",
        "--text", text,
        "--write-media", str(mp3)
    ], check=True)

    total = duration_ms(mp3)
    data = karaoke(text, total)
    js.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print("✅", key, "words=", len(data), "duration=", total)
PY

echo ""
echo "===== 5) ربط lesson19 داخل LessonV2Page و Registry ====="

python - <<'PY'
from pathlib import Path

p = Path("src/pages/LessonV2Page.tsx")
txt = p.read_text(encoding="utf-8")

if 'LESSON_19_CONTENT' not in txt:
    txt = txt.replace(
        'import { LESSON_17_CONTENT } from "../features/lesson-v2/content/lesson17";',
        'import { LESSON_17_CONTENT } from "../features/lesson-v2/content/lesson17";\nimport { LESSON_19_CONTENT } from "../features/lesson-v2/content/lesson19";'
    )

if 'lesson19: LESSON_19_CONTENT' not in txt:
    txt = txt.replace(
        '  lesson18: LESSON_18_CONTENT,',
        '  lesson18: LESSON_18_CONTENT,\n  lesson19: LESSON_19_CONTENT,'
    )

if 'lessonId === "lesson19" ? navigate("/lesson19-exercises")' not in txt:
    txt = txt.replace(
        'lessonId === "lesson18" ? navigate("/lesson18-exercises") :',
        'lessonId === "lesson18" ? navigate("/lesson18-exercises") : lessonId === "lesson19" ? navigate("/lesson19-exercises") :'
    )

p.write_text(txt, encoding="utf-8")

r = Path("src/features/lesson-v2/v2Registry.ts")
rt = r.read_text(encoding="utf-8")

if '"11111111-1111-1111-1111-000000000019": "lesson19"' not in rt:
    rt = rt.replace(
        '"11111111-1111-1111-1111-000000000018": "lesson18",',
        '"11111111-1111-1111-1111-000000000018": "lesson18",\n  "11111111-1111-1111-1111-000000000019": "lesson19",'
    )

r.write_text(rt, encoding="utf-8")
PY

echo ""
echo "===== 6) التحقق بعد التنفيذ ====="
ls -lh public/lessons/v2/lesson19-food
ls -lh public/audio/lesson_19_food_groups
grep -n "LESSON_19_CONTENT\|lesson19" src/pages/LessonV2Page.tsx src/features/lesson-v2/v2Registry.ts
head -40 public/audio/lesson_19_food_groups/s1_intro.json

echo ""
echo "===== 7) Build ====="
npm run build

echo ""
echo "===== Git status ====="
git status --short
