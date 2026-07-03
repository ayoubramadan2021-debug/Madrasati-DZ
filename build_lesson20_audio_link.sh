#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) تحقق ====="
[ -f src/features/lesson-v2/content/lesson20.ts ] || { echo "❌ lesson20.ts غير موجود"; exit 1; }

for n in 1 2 3 4 5 6; do
  [ -f "public/lessons/v2/lesson20-numbers/s$n.webp" ] || { echo "❌ ناقصة: s$n.webp"; exit 1; }
  echo "✅ s$n.webp"
done

command -v edge-tts >/dev/null || { echo "❌ edge-tts غير مثبت"; exit 1; }
command -v ffprobe >/dev/null || { echo "❌ ffprobe غير مثبت"; exit 1; }

echo ""
echo "===== 2) توليد صوت خليل + الكاريوكي ====="
mkdir -p public/audio/lesson_20_numbers

python - <<'PY'
import json, subprocess, re
from pathlib import Path

AUDIO = Path("public/audio/lesson_20_numbers")
VOICE = "ar-DZ-IsmaelNeural"

items = {
"s1_intro": "مَرْحَبًا أَطْفَالِي. اليَوْمَ سَنَتَعَلَّمُ مُتَتَالِيَةَ الأَعْدَادِ مِنْ وَاحِدٍ إِلَى عَشَرَةٍ.",
"s2_sequence": "أُنْظُرُوا إِلَى الأَعْدَادِ. نَقْرَأُهَا بِالتَّرْتِيبِ: وَاحِد، اِثْنَان، ثَلَاثَة، أَرْبَعَة، خَمْسَة، سِتَّة، سَبْعَة، ثَمَانِيَة، تِسْعَة، عَشَرَة.",
"s3_next": "بَعْدَ العَدَدِ خَمْسَةٍ يَأْتِي العَدَدُ سِتَّةٌ. هَذَا هُوَ العَدَدُ التَّالِي.",
"s4_previous": "قَبْلَ العَدَدِ ثَمَانِيَةٍ يَأْتِي العَدَدُ سَبْعَةٌ. هَذَا هُوَ العَدَدُ السَّابِق.",
"s5_quantity": "العَدَدُ يَدُلُّ عَلَى الكَمِّيَّةِ. عِنْدَمَا نَعُدُّ تِسْعَ كُرَاتٍ، نَخْتَارُ العَدَدَ تِسْعَة.",
"s6_closing": "أَحْسَنْتُمْ. تَعَلَّمْنَا قِرَاءَةَ الأَعْدَادِ مِنْ وَاحِدٍ إِلَى عَشَرَةٍ، وَمَعْرِفَةَ السَّابِقِ وَالتَّالِي.",
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
    start = 120
    gap = 25
    usable = max(1000, total - 180)
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
    js.write_text(json.dumps(karaoke(text, total), ensure_ascii=False, indent=2), encoding="utf-8")
    print("✅", key, "duration=", total)
PY

echo ""
echo "===== 3) ربط lesson20 في LessonV2Page و Registry ====="

python - <<'PY'
from pathlib import Path

p = Path("src/pages/LessonV2Page.tsx")
txt = p.read_text(encoding="utf-8")

if 'LESSON_20_CONTENT' not in txt:
    txt = txt.replace(
        'import { LESSON_19_CONTENT } from "../features/lesson-v2/content/lesson19";',
        'import { LESSON_19_CONTENT } from "../features/lesson-v2/content/lesson19";\nimport { LESSON_20_CONTENT } from "../features/lesson-v2/content/lesson20";'
    )

if 'lesson20: LESSON_20_CONTENT' not in txt:
    txt = txt.replace(
        '  lesson19: LESSON_19_CONTENT,',
        '  lesson19: LESSON_19_CONTENT,\n  lesson20: LESSON_20_CONTENT,'
    )

if 'lessonId === "lesson20"' not in txt:
    txt = txt.replace(
        ': lessonId === "lesson19"\n        ? navigate("/lesson19-exercises")',
        ': lessonId === "lesson19"\n        ? navigate("/lesson19-exercises")\n        : lessonId === "lesson20"\n        ? navigate("/lesson20-exercises")'
    )

p.write_text(txt, encoding="utf-8")

r = Path("src/features/lesson-v2/v2Registry.ts")
rt = r.read_text(encoding="utf-8")

if '"11111111-1111-1111-1111-000000000020": "lesson20"' not in rt:
    rt = rt.replace(
        '"11111111-1111-1111-1111-000000000019": "lesson19",',
        '"11111111-1111-1111-1111-000000000019": "lesson19",\n  "11111111-1111-1111-1111-000000000020": "lesson20",'
    )

r.write_text(rt, encoding="utf-8")
PY

echo ""
echo "===== 4) تحقق ====="
ls -lh public/audio/lesson_20_numbers
grep -n "LESSON_20_CONTENT\|lesson20\|000000000020" src/pages/LessonV2Page.tsx src/features/lesson-v2/v2Registry.ts

echo ""
echo "===== 5) Build ====="
npm run build

echo ""
echo "===== Git status ====="
git status --short
