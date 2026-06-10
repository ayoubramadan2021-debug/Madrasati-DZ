#!/usr/bin/env python3
import asyncio
import json
from pathlib import Path
import edge_tts

OUTPUT_DIR = Path("public/audio/lesson_1_numbers_1_5")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

TEXTS = {
    "l1_intro": "مَرْحَبًا بِكُمْ يَا أَصْدِقَائِي. أَنَا الْأُسْتَاذَةُ تَالِينْ، وَهَذَا الْأُسْتَاذُ خَلِيلْ. الْيَوْمَ سَنَتَعَلَّمُ مَعًا الْأَعْدَادَ مِنْ وَاحِدٍ إِلَى خَمْسَة",
    "l1_num_1": "اُنْظُرُوا! خَلِيلْ يَحْمِلُ تُفَّاحَةً وَاحِدَةً. هَذَا هُوَ الْعَدَدُ وَاحِد",
    "l1_num_2": "وَالْآنَ تَالِينْ تَحْمِلُ تُفَّاحَتَانِ. تُفَّاحَةٌ وَتُفَّاحَةٌ، صَارَ عِنْدَنَا اِثْنَان",
    "l1_num_3": "هَا هِيَ ثَلَاثُ تُفَّاحَاتٍ عَلَى الصِّينِيَّةِ. عُدُّوا مَعِي: وَاحِد، اِثْنَان، ثَلَاثَة",
    "l1_num_4": "تَالِينْ رَتَّبَتْ أَرْبَعَ تُفَّاحَاتٍ عَلَى الطَّاوِلَة. وَاحِد، اِثْنَان، ثَلَاثَة، أَرْبَعَة",
    "l1_num_5": "وَالْآنَ خَمْسُ تُفَّاحَات! تَعَلَّمْنَا الْأَعْدَاد: وَاحِد، اِثْنَان، ثَلَاثَة، أَرْبَعَة، خَمْسَة. أَحْسَنْتُمْ يَا أَبْطَال",
}

VOICES = {
    "l1_intro": "ar-DZ-AminaNeural",
    "l1_num_1": "ar-DZ-IsmaelNeural",
    "l1_num_2": "ar-DZ-AminaNeural",
    "l1_num_3": "ar-DZ-IsmaelNeural",
    "l1_num_4": "ar-DZ-AminaNeural",
    "l1_num_5": "ar-DZ-AminaNeural",
}

TUNING = {
    "ar-DZ-IsmaelNeural": {"pitch": "+8Hz", "rate": "-3%"},
    "ar-DZ-AminaNeural": {"pitch": "+10Hz", "rate": "-3%"},
}

async def generate_one(key, text, voice):
    mp3_path = OUTPUT_DIR / f"{key}.mp3"
    json_path = OUTPUT_DIR / f"{key}.json"
    tuning = TUNING.get(voice, {"pitch": "+0Hz", "rate": "+0%"})
    print(f"  ▶ {key} ({voice})")
    communicate = edge_tts.Communicate(
        text=text, voice=voice,
        pitch=tuning["pitch"], rate=tuning["rate"],
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
    print(f"Output: {OUTPUT_DIR.absolute()}\n")
    for key, text in TEXTS.items():
        try:
            await generate_one(key, text, VOICES[key])
        except Exception as e:
            print(f"    ERROR {key}: {e}")
    print(f"\nDone!")

asyncio.run(main())
