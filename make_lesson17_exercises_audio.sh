#!/data/data/com.termux/files/usr/bin/bash
set -e

cd "$HOME/madrasati-dz"

mkdir -p public/audio/lesson_17_exercise1
mkdir -p public/audio/lesson_17_exercise2
mkdir -p public/audio/lesson_17_exercise3
mkdir -p public/audio/lesson_17_exercise4

python - <<'PY'
import json
import pathlib
import re
import shutil
import subprocess
import sys

VOICE = "ar-DZ-AminaNeural"

DATA = {
    "lesson_17_exercise1": {
        "q1": "مَاذَا نَرَى دَاخِلَ العُلَبِ؟",
        "q2": "أَيْنَ وُضِعَتِ العُلَبُ؟",
        "q3": "مَنْ يَقِفُ مَعَ الأَطْفَالِ؟",
        "q4": "كَمْ عُلْبَةً نَرَى؟",
        "q5": "مَاذَا أَفْعَلُ قَبْلَ أَنْ أُجِيبَ؟",
    },
    "lesson_17_exercise2": {
        "q1": "كَمْ عُمْرُ رَحْمَةَ؟",
        "q2": "مَا اسْمُ الطِّفْلَةِ فِي البِطَاقَةِ؟",
        "q3": "مَا اللَّوْنُ المُفَضَّلُ؟",
        "q4": "مَا اللُّعْبَةُ المُفَضَّلَةُ؟",
        "q5": "أَيْنَ أَبْحَثُ عَنِ الجَوَابِ؟",
    },
    "lesson_17_exercise3": {
        "q1": "كَمْ كُرَةً حَمْرَاءَ أَرَى؟",
        "q2": "كَمْ كُرَةً زَرْقَاءَ أَرَى؟",
        "q3": "أَيُّ لَوْنٍ أَكْثَرُ؟",
        "q4": "أَيُّ لَوْنٍ أَقَلُّ؟",
        "q5": "مِنْ أَيْنَ عَرَفْتُ الجَوَابَ؟",
    },
    "lesson_17_exercise4": {
        "q1": "إِذَا لَمْ أَجِدِ اسْمَ المَدِينَةِ، مَاذَا أَقُولُ؟",
        "q2": "هَلْ أُخَمِّنُ الجَوَابَ؟",
        "q3": "عِنْدَ غِيَابِ المَعْلُومَةِ، مَا السُّلُوكُ الصَّحِيحُ؟",
        "q4": "فِي هَذَا الدَّرْسِ نُجِيبُ بَعْدَ ماذا؟",
        "q5": "أَيْنَ أَبْحَثُ عَنِ المَعْلُومَةِ؟",
    },
}

edge = shutil.which("edge-tts")
if not edge:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "edge-tts"])
    edge = shutil.which("edge-tts")

ffprobe = shutil.which("ffprobe")
if not ffprobe:
    raise SystemExit("❌ ffprobe غير موجود. ثبّت ffmpeg أولًا: pkg install ffmpeg")

def duration_ms(path: pathlib.Path) -> int:
    out = subprocess.check_output([
        ffprobe,
        "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        str(path),
    ], text=True).strip()
    return int(float(out) * 1000)

def split_words(text: str):
    return re.findall(r"[\u0600-\u06FF\u064B-\u0652ٰ]+", text)

def make_json(text: str, mp3_path: pathlib.Path):
    words = split_words(text)
    total = max(1200, int(duration_ms(mp3_path) * 0.94))
    gap = 25

    if not words:
        return []

    weights = [max(3, len(w)) for w in words]
    s = sum(weights)

    offset = 0
    out = []
    for w, weight in zip(words, weights):
        dur = int((total * weight / s) - gap)
        dur = max(260, min(dur, 900))
        out.append({"text": w, "offset": offset, "duration": dur})
        offset += dur + gap

    return out

base = pathlib.Path("public/audio")

for folder, questions in DATA.items():
    out_dir = base / folder
    out_dir.mkdir(parents=True, exist_ok=True)

    for key, text in questions.items():
        mp3 = out_dir / f"{key}.mp3"
        js = out_dir / f"{key}.json"

        if mp3.exists():
            mp3.unlink()
        if js.exists():
            js.unlink()

        subprocess.check_call([
            edge,
            "--voice", VOICE,
            "--text", text,
            "--write-media", str(mp3)
        ])

        data = make_json(text, mp3)
        js.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"✅ {folder}/{key}")
PY

echo ""
echo "✅ تم إنشاء صوت وكاريوكي تمارين الدرس 17"
