import asyncio
import json
from pathlib import Path
import edge_tts

VOICE = "ar-DZ-IsmaelNeural"
OUT = Path("public/audio/lesson_13_exercises")
OUT.mkdir(parents=True, exist_ok=True)

TEXTS = {
    "l13_ex4_q1": "اُكْتُبِ الرَّقْمَ وَاحِدًا.",
    "l13_ex4_q2": "اُكْتُبِ الرَّقْمَ اِثْنَيْنِ.",
    "l13_ex4_q3": "اُكْتُبِ الرَّقْمَ ثَلَاثَةً.",
    "l13_ex4_q4": "اُكْتُبِ الرَّقْمَ أَرْبَعَةً.",
    "l13_ex4_q5": "اُكْتُبِ الرَّقْمَ خَمْسَةً.",
    "l13_ex4_q6": "اُكْتُبِ الرَّقْمَ سِتَّةً.",
    "l13_ex4_q7": "اُكْتُبِ الرَّقْمَ سَبْعَةً.",
    "l13_ex4_q8": "اُكْتُبِ الرَّقْمَ ثَمَانِيَةً.",
    "l13_ex4_q9": "اُكْتُبِ الرَّقْمَ تِسْعَةً.",
    "l13_ex4_q10": "اُكْتُبِ الرَّقْمَ عَشَرَةً.",
}

async def gen_one(key, text):
    mp3 = OUT / f"{key}.mp3"
    js = OUT / f"{key}.json"

    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate="-3%",
        pitch="+8Hz",
    )

    words = []
    with open(mp3, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "text": chunk["text"],
                    "offset": int(chunk["offset"] / 10000),
                    "duration": int(chunk["duration"] / 10000),
                })

    js.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✅ {key}: {len(words)} كلمة")

async def main():
    for key, text in TEXTS.items():
        await gen_one(key, text)

asyncio.run(main())
