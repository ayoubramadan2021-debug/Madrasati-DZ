#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""مولّد أصوات + توقيتات كاريوكي للدرس 3 (الحواس — حظيرة القالة)."""
import asyncio, json, os, edge_tts

OUT = "public/audio/lesson_3_senses"
os.makedirs(OUT, exist_ok=True)

# الأصوات: خليل = Ismael (+8Hz, -3%)، تالين = Amina (+10Hz, -3%)
VOICES = {
    "khalil": {"voice": "ar-DZ-IsmaelNeural", "pitch": "+8Hz", "rate": "-3%"},
    "taline": {"voice": "ar-DZ-AminaNeural",  "pitch": "+10Hz", "rate": "-3%"},
}

# (audio_key, المتحدث, النص المشكّل بالكامل)
LINES = [
    ("l3_intro",   "khalil", "اليَوْمَ نَكْتَشِفُ حَوَاسَّنَا الخَمْسَ فِي حَظِيرَةِ القَالَة"),
    ("l3_sight",   "khalil", "نَرَى البُحَيْرَةَ بِأَعْيُنِنَا، هَذِهِ حَاسَّةُ الرُّؤْيَة"),
    ("l3_hearing", "taline", "نَسْمَعُ تَغْرِيدَ الطُّيُورِ بِآذَانِنَا، هَذِهِ حَاسَّةُ السَّمْع"),
    ("l3_smell",   "taline", "نَشُمُّ رَائِحَةَ الأَزْهَارِ بِأُنُوفِنَا، هَذِهِ حَاسَّةُ الشَّمّ"),
    ("l3_taste",   "khalil", "نَتَذَوَّقُ الثِّمَارَ بِأَلْسِنَتِنَا، هَذِهِ حَاسَّةُ الذَّوْق"),
    ("l3_touch",   "khalil", "نَلْمَسُ لِحَاءَ الأَشْجَارِ بِأَيْدِينَا، هَذِهِ حَاسَّةُ اللَّمْس"),
]

async def gen(key, speaker, text):
    v = VOICES[speaker]
    comm = edge_tts.Communicate(text, v["voice"], rate=v["rate"], pitch=v["pitch"], boundary="WordBoundary")
    mp3_path = f"{OUT}/{key}.mp3"
    timings = []
    with open(mp3_path, "wb") as f:
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                timings.append({
                    "text": chunk["text"],
                    "offset": chunk["offset"] // 10000,        # 100ns → ms
                    "duration": chunk["duration"] // 10000,
                })
    with open(f"{OUT}/{key}.json", "w", encoding="utf-8") as f:
        json.dump(timings, f, ensure_ascii=False, indent=2)
    print(f"✅ {key} ({speaker}) — {len(timings)} كلمة")

async def main():
    for key, spk, txt in LINES:
        await gen(key, spk, txt)

asyncio.run(main())
