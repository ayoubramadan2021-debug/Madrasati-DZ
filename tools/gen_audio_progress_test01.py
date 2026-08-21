#!/usr/bin/env python3
import asyncio
import json
from pathlib import Path
import edge_tts

VOICE = "ar-DZ-AminaNeural"
RATE = "-5%"
PITCH = "+6Hz"

PROMPTS = {
    "q01_count_strawberries": "عُدَّ الفَرَاوِلَاتِ، ثُمَّ اخْتَرِ العَدَدَ الْمُنَاسِبَ.",
    "q02_make_six": "ضَعْ سِتَّ كُرَاتٍ دَاخِلَ الصُّنْدُوقِ.",
    "q03_count_fish": "عُدَّ الأَسْمَاكَ، ثُمَّ اخْتَرِ العَدَدَ الْمُنَاسِبَ.",
    "q04_order_numbers": "رَتِّبِ الأَعْدَادَ مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ.",
    "q05_compare_groups": "قَارِنِ الْمَجْمُوعَةَ الأُولَى بِالْمَجْمُوعَةِ الثَّانِيَةِ.",
    "q06_cat_position": "أَيْنَ الْقِطَّةُ بِالنِّسْبَةِ إِلَى الْكُرْسِيِّ؟",
    "q07_in_front_of_tree": "اخْتَرِ الطِّفْلَ الْمَوْجُودَ أَمَامَ الشَّجَرَةِ.",
    "q08_hearing": "أَيُّ حَاسَّةٍ نَسْتَعْمِلُ لِسَمَاعِ صَوْتِ الْجَرَسِ؟",
    "q09_smell_organ": "أَيُّ عُضْوٍ نَسْتَعْمِلُهُ لِحَاسَّةِ الشَّمِّ؟",
    "q10_toy_boxes": "اخْتَرِ الْبِطَاقَةَ الَّتِي تَصِفُ الصُّنْدُوقَ الَّذِي فِيهِ أَلْعَابٌ أَكْثَرُ وَعَدَدَهَا الصَّحِيحَ.",
}

OUT = Path("public/audio/progress-tests/pt-01")

async def generate_one(key: str, text: str) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    words = text.split()
    boundaries = []
    temp_mp3 = OUT / f".{key}.tmp.mp3"
    final_mp3 = OUT / f"{key}.mp3"
    final_json = OUT / f"{key}.json"

    communicate = edge_tts.Communicate(text=text, voice=VOICE, rate=RATE, pitch=PITCH, boundary="WordBoundary")
    with temp_mp3.open("wb") as audio_file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                boundaries.append({
                    "raw_text": str(chunk.get("text", "")),
                    "offset": int(chunk["offset"] / 10000),
                    "duration": max(1, int(chunk["duration"] / 10000)),
                })

    if len(boundaries) != len(words):
        temp_mp3.unlink(missing_ok=True)
        raise RuntimeError(f"{key}: words={len(words)} boundaries={len(boundaries)}")

    exact = [
        {"text": words[i], "offset": boundaries[i]["offset"], "duration": boundaries[i]["duration"]}
        for i in range(len(words))
    ]
    final_json.write_text(json.dumps(exact, ensure_ascii=False, indent=2), encoding="utf-8")
    temp_mp3.replace(final_mp3)
    print("✅", key, len(exact))

async def main() -> None:
    for key, prompt in PROMPTS.items():
        await generate_one(key, prompt)

if __name__ == "__main__":
    asyncio.run(main())
