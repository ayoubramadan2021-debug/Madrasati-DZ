#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

python - <<'PY'
import asyncio, json, pathlib, re, subprocess, sys

VOICE = "ar-DZ-AminaNeural"
RATE = "+10%"
BASE = pathlib.Path("public/audio")

texts = {
"lesson_18_exercise1": {
"q1": "أَيْنَ يُوجَدُ القِطُّ؟",
"q2": "أَيْنَ يُوجَدُ الكَلْبُ؟",
"q3": "مَنْ يُوجَدُ عَنْ يَمِينِ الطِّفْلِ؟",
"q4": "مَنْ يُوجَدُ عَنْ يَسَارِ الطِّفْلِ؟",
"q5": "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
},
"lesson_18_exercise2": {
"q1": "أَيْنَ يُوجَدُ الكِتَابُ؟",
"q2": "أَيْنَ تُوجَدُ الكُرَةُ؟",
"q3": "مَا الشَّيْءُ المَوْجُودُ فَوْقَ الطَّاوِلَةِ؟",
"q4": "مَا الشَّيْءُ المَوْجُودُ تَحْتَ الطَّاوِلَةِ؟",
"q5": "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
},
"lesson_18_exercise3": {
"q1": "أَيْنَ يَقِفُ الطِّفْلُ؟",
"q2": "أَيْنَ تُوجَدُ الحَقِيبَةُ؟",
"q3": "مَنْ أَمَامَ الكُرْسِيِّ؟",
"q4": "مَا الشَّيْءُ المَوْجُودُ خَلْفَ الكُرْسِيِّ؟",
"q5": "أَيُّ كَلِمَةٍ نَسْتَعْمِلُ لِلشَّيْءِ المَوْجُودِ وَرَاءَ الكُرْسِيِّ؟",
},
"lesson_18_exercise4": {
"q1": "أَيْنَ تُوجَدُ الكُرَةُ؟",
"q2": "أَيْنَ تُوجَدُ الدُّمْيَةُ؟",
"q3": "مَا الشَّيْءُ المَوْجُودُ دَاخِلَ الصُّنْدُوقِ؟",
"q4": "مَا الشَّيْءُ المَوْجُودُ خَارِجَ الصُّنْدُوقِ؟",
"q5": "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
},
}

try:
    import edge_tts
except Exception:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "edge-tts"])
    import edge_tts

def fallback_words(text):
    words = re.findall(r"[\u0600-\u06FF\u064B-\u0652ٰ]+", text)
    out, offset = [], 60
    for w in words:
        dur = max(260, min(760, len(w) * 90))
        out.append({"text": w, "offset": offset, "duration": dur})
        offset += dur + 25
    return out

async def make_one(folder, key, text):
    outdir = BASE / folder
    outdir.mkdir(parents=True, exist_ok=True)
    mp3 = outdir / f"{key}.mp3"
    js = outdir / f"{key}.json"

    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    words = []
    with open(mp3, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "text": chunk.get("text", ""),
                    "offset": int(chunk["offset"] / 10000) + 60,
                    "duration": int(chunk["duration"] / 10000),
                })

    if not words:
        words = fallback_words(text)

    js.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    print("✅", folder, key)

async def main():
    for folder, qs in texts.items():
        for key, text in qs.items():
            await make_one(folder, key, text)

asyncio.run(main())
PY

echo "✅ تم توليد صوت وكاريوكي تمارين الدرس 18"
