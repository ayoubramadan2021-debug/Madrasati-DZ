#!/data/data/com.termux/files/usr/bin/bash
set -e

cd "$HOME/madrasati-dz"

mkdir -p public/audio/lesson_17_info

python - <<'PY'
import json
import pathlib
import re
import shutil
import subprocess
import sys

OUT = pathlib.Path("public/audio/lesson_17_info")
VOICE = "ar-DZ-AminaNeural"

slides = {
    "s1_intro": "مَرْحَبًا أَطْفَالِي. اليَوْمَ نَتَعَلَّمُ قَاعِدَةً مُهِمَّةً: أَنْظُرُ جَيِّدًا، أَبْحَثُ عَنِ المَعْلُومَةِ، ثُمَّ أُجِيبُ.",
    "s2_picture": "هَذِهِ صُورَةٌ. أَرَى عُلَبًا فَوْقَ الطَّاوِلَةِ، وَفِيهَا كُرَاتٌ مُلَوَّنَةٌ. أَسْتَخْرِجُ المَعْلُومَةَ مِمَّا أَرَاهُ.",
    "s3_board": "هَذِهِ لَوْحَةُ مَعْلُومَاتٍ. أَنْظُرُ إِلَى الصُّورَةِ، وَأَبْحَثُ عَنِ الرَّمْزِ أَوِ اللَّوْنِ، ثُمَّ أَقْرَأُ المَعْلُومَةَ.",
    "s4_colors": "فِي الصُّورَةِ كُرَاتٌ حَمْرَاءُ وَكُرَاتٌ زَرْقَاءُ. عِنْدَمَا أُسْأَلُ عَنِ اللَّوْنِ أَوِ العَدَدِ، أَنْظُرُ ثُمَّ أُجِيبُ.",
    "s5_no_guess": "لَا أُخَمِّنُ. إِذَا لَمْ أَجِدِ المَعْلُومَةَ فِي الصُّورَةِ أَوِ اللَّوْحَةِ، أَقُولُ: المَعْلُومَةُ غَيْرُ مَوْجُودَةٍ.",
    "s6_closing": "أَحْسَنْتُمْ. تَعَلَّمْنَا أَنْ نَنْظُرَ جَيِّدًا، وَنَبْحَثَ عَنِ المَعْلُومَةِ، ثُمَّ نُجِيبَ دُونَ تَخْمِينٍ.",
}

def need(cmd):
    path = shutil.which(cmd)
    if not path:
        raise SystemExit(f"❌ الأمر غير موجود: {cmd}")
    return path

edge = shutil.which("edge-tts")
if not edge:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "edge-tts"])
    edge = need("edge-tts")

ffprobe = need("ffprobe")

def mp3_duration_ms(path):
    out = subprocess.check_output([
        ffprobe,
        "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        str(path)
    ], text=True).strip()
    return int(float(out) * 1000)

def split_words(text):
    return re.findall(r"[\u0600-\u06FF\u064B-\u0652ٰ]+", text)

def make_karaoke(text, mp3_path):
    words = split_words(text)
    total_ms = mp3_duration_ms(mp3_path)

    if not words:
        return []

    gap = 30
    usable = max(1000, int(total_ms * 0.94))
    weights = [max(3, len(w)) for w in words]
    weight_sum = sum(weights)

    offset = 0
    data = []

    for word, weight in zip(words, weights):
        duration = int((usable * weight / weight_sum) - gap)
        duration = max(260, min(duration, 900))

        data.append({
            "text": word,
            "offset": offset,
            "duration": duration
        })

        offset += duration + gap

    end = data[-1]["offset"] + data[-1]["duration"]
    if end > total_ms:
        scale = total_ms / end
        for item in data:
            item["offset"] = int(item["offset"] * scale)
            item["duration"] = max(220, int(item["duration"] * scale))

    return data

for key, text in slides.items():
    mp3 = OUT / f"{key}.mp3"
    jsn = OUT / f"{key}.json"

    if mp3.exists():
        mp3.unlink()
    if jsn.exists():
        jsn.unlink()

    subprocess.check_call([
        edge,
        "--voice", VOICE,
        "--text", text,
        "--write-media", str(mp3)
    ])

    karaoke = make_karaoke(text, mp3)
    jsn.write_text(
        json.dumps(karaoke, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    total = mp3_duration_ms(mp3)
    end = karaoke[-1]["offset"] + karaoke[-1]["duration"] if karaoke else 0
    print(f"✅ {key}: mp3={total}ms karaoke_end={end}ms words={len(karaoke)}")
PY

echo ""
echo "✅ تم توليد صوت تالين وكاريوكي الدرس 17"
ls -lh public/audio/lesson_17_info | grep -E "s1_intro|s2_picture|s3_board|s4_colors|s5_no_guess|s6_closing"
