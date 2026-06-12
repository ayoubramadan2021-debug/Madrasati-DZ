#!/usr/bin/env python3
import asyncio, json
from pathlib import Path
import edge_tts

OUTPUT_DIR = Path("public/audio/lesson_2_exercises")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

TEXTS = {
    "l2_ex2_q1": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا التِّلْفَازُ أَمَامَ الْأَرِيكَةِ",
    "l2_ex2_q2": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا النَّافِذَةُ وَرَاءَ الْأَرِيكَةِ",
    "l2_ex2_q3": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا الثَّلَّاجَةُ بِجَانِبْ الْفُرْنِ",
    "l2_ex2_q4": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا السَّرِيرُ مُقَابِلَ النَّافِذَةِ",
    "l2_ex2_q5": "تَحَدِّي. اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا شَيْءٌ مُقَابِلَ شَيْءٍ آخَر",
}

VOICE = "ar-DZ-AminaNeural"
TUNING = {"pitch": "+10Hz", "rate": "-3%"}

async def generate_one(key, text):
    mp3_path = OUTPUT_DIR / f"{key}.mp3"
    json_path = OUTPUT_DIR / f"{key}.json"
    print(f"  > {key}")
    communicate = edge_tts.Communicate(
        text=text, voice=VOICE,
        pitch=TUNING["pitch"], rate=TUNING["rate"],
        boundary="WordBoundary",
    )
    timings = []
    with open(mp3_path, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                timings.append({
                    "text": chunk["text"],
                    "offset": int(chunk["offset"] / 10_000),
                    "duration": int(chunk["duration"] / 10_000),
                })
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(timings, f, ensure_ascii=False, indent=2)
    print(f"    OK {mp3_path.stat().st_size // 1024}KB")

async def main():
    for key, text in TEXTS.items():
        await generate_one(key, text)
    print("Done!")

asyncio.run(main())
