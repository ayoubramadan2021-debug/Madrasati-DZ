#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

mkdir -p public/audio/lesson_18_positions

python - <<'PY'
import asyncio, json, pathlib, re, subprocess, sys

OUT = pathlib.Path("public/audio/lesson_18_positions")
VOICE = "ar-DZ-AminaNeural"
RATE = "+10%"

texts = {
    "s1_intro": "مَرْحَبًا أَطْفَالِي. اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نُحَدِّدُ مَكَانَ الشَّيْءِ فِي الفَضَاءِ.",
    "s2_right_left": "أُنْظُرُوا إِلَى الطِّفْلِ. القِطُّ عَنْ يَمِينِهِ، وَالكَلْبُ عَنْ يَسَارِهِ.",
    "s3_above_below": "أُنْظُرُوا إِلَى الطَّاوِلَةِ. الكِتَابُ فَوْقَ الطَّاوِلَةِ، وَالكُرَةُ تَحْتَ الطَّاوِلَةِ.",
    "s4_front_behind": "أُنْظُرُوا إِلَى الكُرْسِيِّ. الطِّفْلُ أَمَامَ الكُرْسِيِّ، وَالحَقِيبَةُ خَلْفَ الكُرْسِيِّ.",
    "s5_inside_outside": "أُنْظُرُوا إِلَى الصُّنْدُوقِ. الكُرَةُ دَاخِلَ الصُّنْدُوقِ، وَالدُّمْيَةُ خَارِجَ الصُّنْدُوقِ.",
    "s6_closing": "أَحْسَنْتُمْ. تَعَلَّمْنَا كَلِمَاتِ المَوْقِعِ: يَمِين، يَسَار، فَوْق، تَحْت، أَمَام، خَلْف، دَاخِل، خَارِج.",
}

try:
    import edge_tts
except Exception:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "edge-tts"])
    import edge_tts

def fallback_words(text):
    words = re.findall(r"[\u0600-\u06FF\u064B-\u0652ٰ]+", text)
    out, offset = [], 0
    for w in words:
        dur = max(280, min(820, len(w) * 95))
        out.append({"text": w, "offset": offset, "duration": dur})
        offset += dur + 25
    return out

async def make_one(key, text):
    mp3 = OUT / f"{key}.mp3"
    js = OUT / f"{key}.json"

    if mp3.exists(): mp3.unlink()
    if js.exists(): js.unlink()

    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    words = []

    with open(mp3, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "text": chunk.get("text", ""),
                    "offset": int(chunk["offset"] / 10000),
                    "duration": int(chunk["duration"] / 10000),
                })

    if not words:
        words = fallback_words(text)

    js.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    print("✅", key, "words=", len(words))

async def main():
    for key, text in texts.items():
        await make_one(key, text)

asyncio.run(main())
PY

echo "✅ تم توليد صوت الدرس 18 بسرعة +10%"
ls -lh public/audio/lesson_18_positions
