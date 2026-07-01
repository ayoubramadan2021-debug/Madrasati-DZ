#!/data/data/com.termux/files/usr/bin/bash
set -e

PROJECT="$HOME/madrasati-dz"

echo "=== 1) التحقق من المشروع ==="
if [ ! -f "$PROJECT/package.json" ]; then
  echo "❌ لم أجد المشروع: $PROJECT"
  exit 1
fi

cd "$PROJECT"
echo "✅ Project: $PROJECT"

echo ""
echo "=== 2) التحقق من صور الدرس 16 ==="
IMG_DIR="public/lessons/v2/lesson16-health"

for i in 1 2 3 4 5 6; do
  if [ ! -f "$IMG_DIR/s$i.webp" ]; then
    echo "❌ الصورة ناقصة: $IMG_DIR/s$i.webp"
    exit 1
  fi
done

echo "✅ كل الصور موجودة"
ls -lh "$IMG_DIR"

echo ""
echo "=== 3) إنشاء lesson16.ts ==="
cat > src/features/lesson-v2/content/lesson16.ts <<'TS'
export const LESSON_16_CONTENT = {
  metadata: {
    title_ar: "أَتَحَرَّكُ وَأُحَافِظُ عَلَى صِحَّتِي",
    title_fr: "Je bouge et je protège ma santé",
    subject: "science",
    grade: 1,
    sort_order: 16,
    template_version: 2,
  },

  audio_base: "/audio/lesson_16_health_movement",

  scenes: [
    {
      scene_image: "/lessons/v2/lesson16-health/s1.webp",
      audio_key: "s1_intro",
      text: "مَرْحَبًا أَطْفَالِي. اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نَتَحَرَّكُ، وَكَيْفَ نُحَافِظُ عَلَى صِحَّتِنَا.",
    },
    {
      scene_image: "/lessons/v2/lesson16-health/s2.webp",
      audio_key: "s2_running",
      text: "نَتَحَرَّكُ عِنْدَمَا نَمْشِي، أَوْ نَجْرِي، أَوْ نَلْعَبُ فِي سَاحَةِ المَدْرَسَةِ.",
    },
    {
      scene_image: "/lessons/v2/lesson16-health/s3.webp",
      audio_key: "s3_body_movement",
      text: "عِنْدَمَا نَقْفِزُ أَوْ نَجْرِي، نَسْتَعِينُ بِرِجْلَيْنَا وَيَدَيْنَا وَأَعْضَاءِ جِسْمِنَا.",
    },
    {
      scene_image: "/lessons/v2/lesson16-health/s4.webp",
      audio_key: "s4_safe_place",
      text: "نَلْعَبُ فِي مَكَانٍ آمِنٍ، مِثْلَ سَاحَةِ المَدْرَسَةِ، وَلَا نَلْعَبُ فِي الطَّرِيقِ.",
    },
    {
      scene_image: "/lessons/v2/lesson16-health/s5.webp",
      audio_key: "s5_unsafe_behavior",
      text: "بَعْضُ التَّصَرُّفَاتِ خَطِيرَةٌ. لَا نَتَسَلَّقُ الأَمَاكِنَ العَالِيَةَ، وَلَا نَلْعَبُ بِطَرِيقَةٍ خَطِيرَةٍ.",
    },
    {
      scene_image: "/lessons/v2/lesson16-health/s6.webp",
      audio_key: "s6_closing",
      text: "أَحْسَنْتُمْ. أَتَحَرَّكُ بِأَعْضَاءِ جِسْمِي، وَأَخْتَارُ مَكَانًا آمِنًا، وَأُحَافِظُ عَلَى صِحَّتِي.",
      is_closing: true,
      cta_text: "هَيَّا إِلَى التَّمَارِين ←",
    },
  ],
};
TS

echo "✅ lesson16.ts created"

echo ""
echo "=== 4) إنشاء مولد صوت الدرس 16 ==="
cat > gen_audio_lesson16.py <<'PY'
import asyncio
import json
import subprocess
from pathlib import Path
import edge_tts

VOICE = "ar-DZ-IsmaelNeural"

OUT = Path("public/audio/lesson_16_health_movement")
OUT.mkdir(parents=True, exist_ok=True)

TEXTS = {
    "s1_intro": "مَرْحَبًا أَطْفَالِي. اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نَتَحَرَّكُ، وَكَيْفَ نُحَافِظُ عَلَى صِحَّتِنَا.",
    "s2_running": "نَتَحَرَّكُ عِنْدَمَا نَمْشِي، أَوْ نَجْرِي، أَوْ نَلْعَبُ فِي سَاحَةِ المَدْرَسَةِ.",
    "s3_body_movement": "عِنْدَمَا نَقْفِزُ أَوْ نَجْرِي، نَسْتَعِينُ بِرِجْلَيْنَا وَيَدَيْنَا وَأَعْضَاءِ جِسْمِنَا.",
    "s4_safe_place": "نَلْعَبُ فِي مَكَانٍ آمِنٍ، مِثْلَ سَاحَةِ المَدْرَسَةِ، وَلَا نَلْعَبُ فِي الطَّرِيقِ.",
    "s5_unsafe_behavior": "بَعْضُ التَّصَرُّفَاتِ خَطِيرَةٌ. لَا نَتَسَلَّقُ الأَمَاكِنَ العَالِيَةَ، وَلَا نَلْعَبُ بِطَرِيقَةٍ خَطِيرَةٍ.",
    "s6_closing": "أَحْسَنْتُمْ. أَتَحَرَّكُ بِأَعْضَاءِ جِسْمِي، وَأَخْتَارُ مَكَانًا آمِنًا، وَأُحَافِظُ عَلَى صِحَّتِي.",
}

def clean_words(text: str):
    for ch in ["،", ".", ":", "!", "؟", "؛"]:
        text = text.replace(ch, "")
    return text.split()

def mp3_duration_ms(path: Path) -> int:
    try:
        out = subprocess.check_output([
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(path)
        ], text=True).strip()
        return int(float(out) * 1000)
    except Exception:
        return 6500

def make_karaoke(text: str, mp3_path: Path):
    words = clean_words(text)
    total = mp3_duration_ms(mp3_path)
    usable = max(1200, int(total * 0.98))
    gap = 30
    weights = [max(1.0, len(w) ** 0.65) for w in words]
    s = sum(weights) or 1

    data = []
    offset = 0
    for w, weight in zip(words, weights):
        duration = int((usable * weight / s) - gap)
        duration = max(260, min(duration, 900))
        data.append({"text": w, "offset": offset, "duration": duration})
        offset += duration + gap
    return data

async def gen_one(key, text):
    mp3_path = OUT / f"{key}.mp3"
    json_path = OUT / f"{key}.json"

    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate="+4%",
        pitch="+4Hz",
    )

    words = []
    with open(mp3_path, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "text": chunk["text"],
                    "offset": int(chunk["offset"] / 10000),
                    "duration": int(chunk["duration"] / 10000),
                })

    if not words:
        words = make_karaoke(text, mp3_path)

    json_path.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")

    dur = mp3_duration_ms(mp3_path)
    end = words[-1]["offset"] + words[-1]["duration"] if words else 0
    ratio = round(end / dur, 3) if dur else 0
    print(f"✅ {key}: words={len(words)} mp3={dur}ms end={end}ms ratio={ratio}")

async def main():
    for key, text in TEXTS.items():
        await gen_one(key, text)

asyncio.run(main())
PY

echo ""
echo "=== 5) توليد الصوت والكاريـوكي ==="
command -v ffprobe >/dev/null 2>&1 || pkg install ffmpeg -y
python3 gen_audio_lesson16.py

echo ""
echo "=== 6) ربط الدرس 16 محليًا في LessonV2Page و v2Registry ==="
python3 - <<'PY'
from pathlib import Path

# LessonV2Page
p = Path("src/pages/LessonV2Page.tsx")
txt = p.read_text(encoding="utf-8")
old = txt

if 'LESSON_16_CONTENT' not in txt:
    txt = txt.replace(
        'import { LESSON_15_CONTENT } from "../features/lesson-v2/content/lesson15";',
        'import { LESSON_15_CONTENT } from "../features/lesson-v2/content/lesson15";\nimport { LESSON_16_CONTENT } from "../features/lesson-v2/content/lesson16";'
    )

if 'lesson16: LESSON_16_CONTENT' not in txt:
    txt = txt.replace(
        '  lesson15: LESSON_15_CONTENT,',
        '  lesson15: LESSON_15_CONTENT,\n  lesson16: LESSON_16_CONTENT,'
    )

if 'lessonId === "lesson16"' not in txt:
    txt = txt.replace(
        'lessonId === "lesson15" ? navigate("/lesson15-exercises")',
        'lessonId === "lesson16" ? navigate("/lesson16-exercises") : lessonId === "lesson15" ? navigate("/lesson15-exercises")'
    )

p.write_text(txt, encoding="utf-8")
print("LessonV2Page changed:", txt != old)

# v2Registry
p = Path("src/features/lesson-v2/v2Registry.ts")
txt = p.read_text(encoding="utf-8")
old = txt

if '"11111111-1111-1111-1111-000000000016": "lesson16"' not in txt:
    txt = txt.replace(
        '  "11111111-1111-1111-1111-000000000015": "lesson15",',
        '  "11111111-1111-1111-1111-000000000015": "lesson15",\n  "11111111-1111-1111-1111-000000000016": "lesson16",'
    )

p.write_text(txt, encoding="utf-8")
print("v2Registry changed:", txt != old)
PY

echo ""
echo "=== 7) فحص الملفات والربط ==="
grep -n "LESSON_16\|lesson16" src/pages/LessonV2Page.tsx || true
grep -n "000000000016\|lesson16" src/features/lesson-v2/v2Registry.ts || true
ls -lh public/audio/lesson_16_health_movement
ls -lh public/lessons/v2/lesson16-health

echo ""
echo "=== 8) Build ==="
rm -rf node_modules/.vite dist
npm run build

echo ""
echo "✅ الدرس 16 جاهز للاختبار محليًا:"
echo "http://localhost:5173/lesson-v2/lesson16?test=1"
