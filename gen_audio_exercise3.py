#!/usr/bin/env python3
import asyncio
import json
from pathlib import Path
import edge_tts

OUTPUT_DIR = Path("public/audio/lesson_1_exercises")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 5 أنماط مختلفة من الربط
TEXTS = {
    "ex3_q1": "اِسْحَبْ كُلَّ رَقَمٍ إِلَى الْكَمِّيَّةِ الْمُنَاسِبَةِ",
    "ex3_q2": "اِسْحَبْ كُلَّ مَجْمُوعَةِ تُفَّاحَاتٍ إِلَى رَقَمِهَا",
    "ex3_q3": "اِسْحَبْ كُلَّ كَلِمَةٍ إِلَى الْكَمِّيَّةِ الْمُوَافِقَةِ لَهَا",
    "ex3_q4": "اِسْحَبْ كُلَّ رَقَمٍ إِلَى الْكَلِمَةِ الَّتِي تَدُلُّ عَلَيْه",
    "ex3_q5": "تَحَدَّى نَفْسَك. اِرْبِطْ كُلَّ شَيْءٍ بِمَكَانِهِ الصَّحِيح",
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
    print(f"    OK {mp3_path.stat().st_size // 1024}KB, {len(timings)} words")

async def main():
    for key, text in TEXTS.items():
        try:
            await generate_one(key, text)
        except Exception as e:
            print(f"    ERROR {key}: {e}")
    print("Done!")

asyncio.run(main())
