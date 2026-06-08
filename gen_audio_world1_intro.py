#!/usr/bin/env python3
"""gen_audio_world1_intro.py — World 1 intro scene audio + word timings"""

import asyncio
import json
import os
import sys

try:
    import edge_tts
except ImportError:
    print("❌ edge-tts not installed. Run: pip install edge-tts")
    sys.exit(1)


OUT_DIR = "public/audio/world_1_intro"

VOICES = {
    "khalil": {"voice": "ar-DZ-IsmaelNeural", "rate": "-5%", "pitch": "+20Hz"},
    "taline": {"voice": "ar-DZ-AminaNeural",  "rate": "-5%", "pitch": "+10Hz"},
}

ITEMS = [
    ("w1_intro_1",
     "فِي صَبَاحٍ جَمِيلْ... يَذْهَبُ فَاضِلْ وَسِيرِينْ وَرَحْمَة إِلَى الْمَدْرَسَةْ لِأَوَّلِ مَرَّة",
     "taline"),

    ("w1_intro_2",
     "يَكْتَشِفُونَ سَاحَةَ الْمَدْرَسَةْ الْكَبِيرَة... وَيَلْتَقُونَ زُمَلَاءَهُمْ الْجُدُد",
     "khalil"),

    ("w1_intro_3a",
     "مَرْحَبًا بِكُمْ يَا أَصْدِقَائِي! أَنَا الْأُسْتَاذَةُ تَالِين",
     "taline"),

    ("w1_intro_3b",
     "وَأَنَا الْأُسْتَاذُ خَلِيلْ. سَنَتَعَلَّمُ مَعًا أَشْيَاءَ رَائِعَة",
     "khalil"),

    ("w1_intro_4",
     "يَجْلِسُونَ فِي أَمَاكِنِهِمْ لِأَوَّلِ مَرَّة... وَيَتَعَرَّفُونَ عَلَى أَدَوَاتِهِمْ الْمَدْرَسِيَّة",
     "taline"),

    ("w1_intro_5_q",
     "يَا صَدِيقِي... مَاذَا يَفْعَلُ التِّلْمِيذُ الْجَدِيدْ عِنْدَ دُخُولِهْ الْقِسْم؟",
     "taline"),

    ("w1_intro_6",
     "رَائِع! هَيَّا نَبْدَأ الْمُغَامَرَة مَعًا",
     "khalil"),

    ("w1_intro_correct",
     "أَحْسَنْت! هَذَا تِلْمِيذٌ مُؤَدَّبْ",
     "khalil"),

    ("w1_intro_retry",
     "حَاوِلْ مَرَّةً أُخْرَى يَا صَدِيقِي",
     "taline"),
]


async def gen_one(filename, text, voice_key):
    cfg = VOICES[voice_key]
    audio_path = os.path.join(OUT_DIR, f"{filename}.mp3")
    json_path  = os.path.join(OUT_DIR, f"{filename}.json")

    communicate = edge_tts.Communicate(
        text, cfg["voice"], rate=cfg["rate"], pitch=cfg["pitch"],
        boundary="WordBoundary"
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
    print(f"🔊 Generating {total} audio files + timings for World 1 intro...\n")
    for i, (filename, text, voice_key) in enumerate(ITEMS, 1):
        print(f"[{i}/{total}] {filename} ({voice_key})")
        try:
            await gen_one(filename, text, voice_key)
        except Exception as e:
            print(f"   ❌ error: {e}")
    print(f"\n✅ Done — files in: {OUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
