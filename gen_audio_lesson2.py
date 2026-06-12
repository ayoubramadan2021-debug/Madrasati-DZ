#!/usr/bin/env python3
import asyncio, json
from pathlib import Path
import edge_tts

OUTPUT_DIR = Path("public/audio/lesson_2_house")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# نصوص مُصحَّحة:
# - Scene 2: أَمَامَ الْأَرِيكَةِ (كسرة)
# - Scene 3: وَرَاءَ الْأَرِيكَةِ (كسرة)
# - Scene 4: بِجَانِبْ (سكون) — والْفُرْنِ (كسرة بعد الجار)
# - Scene 5: مُقَابِلَ النَّافِذَةِ (كسرة)
TEXTS = {
    "l2_intro":    "أَهْلًا بِكْ فِي بَيْتِي! أَنَا تَالِينْ. تَعَالَ مَعِي لِنَتَعَرَّفَ عَلَى الْمَوَاقِع",
    "l2_amam":     "اُنْظُرْ، التِّلْفَازُ أَمَامَ الْأَرِيكَةِ. كَلِمَةُ أَمَامَ تَعْنِي قُدَّام",
    "l2_waraa":    "وَالْآنَ، النَّافِذَةُ وَرَاءَ الْأَرِيكَةِ. كَلِمَةُ وَرَاءَ تَعْنِي خَلْف",
    "l2_bijanib":  "هَذَا هُوَ الْمَطْبَخ. الثَّلَّاجَةُ بِجَانِبْ الْفُرْنِ. كَلِمَةُ بِجَانِبْ تَعْنِي قُرْب",
    "l2_muqabil":  "وَهَذِهِ غُرْفَةُ النَّوْم. السَّرِيرُ مُقَابِلَ النَّافِذَةِ. كَلِمَةُ مُقَابِلَ تَعْنِي وَجْهًا لِوَجْه",
    "l2_outro":    "شُكْرًا لِزِيَارَتِكْ يَا صَدِيقِي! تَعَلَّمْنَا: أَمَامَ، وَرَاءَ، بِجَانِبْ، مُقَابِلَ. هَيَّا إِلَى التَّمَارِين",
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
        await generate_one(key, text)
    print("Done!")

asyncio.run(main())
