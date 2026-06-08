#!/usr/bin/env python3
"""gen_audio_lesson1.py — Lesson 1 audio + word timings via edge-tts"""

import asyncio
import json
import os
import sys

try:
    import edge_tts
except ImportError:
    print("❌ edge-tts not installed. Run: pip install edge-tts")
    sys.exit(1)


OUT_DIR = "public/audio/lesson_1"

VOICES = {
    "khalil":  {"voice": "ar-DZ-IsmaelNeural", "rate": "-5%", "pitch": "+20Hz"},
    "taline":  {"voice": "ar-DZ-AminaNeural",  "rate": "-5%", "pitch": "+10Hz"},
    "fr_male": {"voice": "fr-FR-HenriNeural",  "rate": "-5%", "pitch": "+0Hz"},
}

ITEMS = [
    ("intro_ar",
     "مَرْحَبًا يَا صَدِيقِي! أَنَا الْأُسْتَاذَةُ تَالِين. الْيَوْمَ سَنَتَعَلَّمُ مَعًا الْأَعْدَادَ مِنْ وَاحِد إِلَى خَمْسَةْ",
     "taline"),
    ("step_1_ar", "خَلِيلْ يَحْمِلُ تُفَّاحَةً وَاحِدَةً",                        "khalil"),
    ("step_2_ar", "تَأْتِي تَالِين بِتُفَّاحَةٍ أُخْرَى. الْآنَ عِنْدَنَا تُفَّاحَتَانِ",   "taline"),
    ("step_3_ar", "نُضِيفُ تُفَّاحَةً ثَالِثَةً. ثَلَاثُ تُفَّاحَاتٍ!",                "khalil"),
    ("step_4_ar", "هَا هِيَ تُفَّاحَةٌ رَابِعَةٌ. أَرْبَعُ تُفَّاحَاتٍ",                "taline"),
    ("step_5_ar", "وَأَخِيرًا الْخَامِسَةُ! خَمْسُ تُفَّاحَاتٍ كَامِلَةٌ",              "khalil"),
    ("num_1_ar", "وَاحِد",   "khalil"),
    ("num_2_ar", "اِثْنَان",  "khalil"),
    ("num_3_ar", "ثَلَاثَةٌ",  "khalil"),
    ("num_4_ar", "أَرْبَعَةٌ",  "khalil"),
    ("num_5_ar", "خَمْسَةٌ",   "khalil"),
    ("num_1_fr", "un",      "fr_male"),
    ("num_2_fr", "deux",    "fr_male"),
    ("num_3_fr", "trois",   "fr_male"),
    ("num_4_fr", "quatre",  "fr_male"),
    ("num_5_fr", "cinq",    "fr_male"),
    ("recap_ar",
     "أَحْسَنْت! الْيَوْمَ تَعَلَّمْنَا الْأَعْدَادَ... وَاحِد، اِثْنَان، ثَلَاثَة، أَرْبَعَة، خَمْسَة. رَبِحْتَ خَمْسِينَ نُقْطَةً!",
     "khalil"),
]


async def gen_one(filename, text, voice_key):
    cfg = VOICES[voice_key]
    audio_path = os.path.join(OUT_DIR, f"{filename}.mp3")
    json_path  = os.path.join(OUT_DIR, f"{filename}.json")

    communicate = edge_tts.Communicate(
        text, cfg["voice"], rate=cfg["rate"], pitch=cfg["pitch"], boundary="WordBoundary"
    )

    boundaries = []
    with open(audio_path, "wb") as audio_f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                boundaries.append({
                    "text":     chunk["text"],
                    "offset":   chunk["offset"]   // 10000,
                    "duration": chunk["duration"] // 10000,
                })

    with open(json_path, "w", encoding="utf-8") as json_f:
        json.dump(boundaries, json_f, ensure_ascii=False, indent=2)

    print(f"   ✅ {filename}.mp3 + {filename}.json ({len(boundaries)} words)")


async def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    total = len(ITEMS)
    print(f"🔊 Generating {total} audio files + timings...\n")
    for i, (filename, text, voice_key) in enumerate(ITEMS, 1):
        print(f"[{i}/{total}] {filename} ({voice_key})")
        try:
            await gen_one(filename, text, voice_key)
        except Exception as e:
            print(f"   ❌ error: {e}")
    print(f"\n✅ Done — files in: {OUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
