#!/usr/bin/env python3
import asyncio
import json
import os
from pathlib import Path
import edge_tts

VOICE = "ar-DZ-IsmaelNeural"  # صوت خليل
PITCH = "+8Hz"
RATE = "-3%"
OUT = "public/audio/lesson_13_counting"

Path(OUT).mkdir(parents=True, exist_ok=True)

LESSON_TEXTS = {
    "s1_intro": "اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نَعُدُّ الأَشْيَاءَ مِنْ وَاحِدٍ إِلَى عَشَرَةٍ. هَيَّا بِنَا نَبْدَأُ!",
    "s2_three": "اُنْظُرُوا إِلَى هَذِهِ المُكَعَّبَاتِ المُلَوَّنَةِ. دَعُونَا نَعُدُّ مَعًا: وَاحِدٌ، اِثْنَانِ، ثَلَاثَةٌ. ثَلَاثُ مُكَعَّبَاتٍ!",
    "s3_five": "اُنْظُرُوا إِلَى الكُرَاتِ المُلَوَّنَةِ. لِنَعُدَّ جَمِيعَهَا: وَاحِدٌ، اِثْنَانِ، ثَلَاثَةٌ، أَرْبَعَةٌ، خَمْسَةٌ. خَمْسُ كُرَاتٍ!",
    "s4_eight": "اُنْظُرُوا إِلَى هَذِهِ الدُّمَى الصَّغِيرَةِ. دَعُونَا نَعُدُّهَا بِاهْتِمَامٍ: وَاحِدٌ، اِثْنَانِ، ثَلَاثَةٌ، أَرْبَعَةٌ، خَمْسَةٌ، سِتَّةٌ، سَبْعَةٌ، ثَمَانِيَةٌ. ثَمَانِي لُعَبٍَ!",
    "s5_ten": "وَ الآنَ... عَشَرَةُ بَالُونَاتٍ جَمِيلَةٍ! وَاحِدٌ، اِثْنَانِ، ثَلَاثَةٌ، أَرْبَعَةٌ، خَمْسَةٌ، سِتَّةٌ، سَبْعَةٌ، ثَمَانِيَةٌ، تِسْعَةٌ، عَشَرَةٌ! أَحْسَنْتُم!",
    "s6_closing": "لَقَدْ تَعَلَّمْنَا الْيَوْمَ أَنْ نَعُدَّ مِنْ وَاحِدٍ إِلَى عَشَرَةٍ! أَنْتُمْ أَبْطَالٌ. الآنَ إِلَى التَّمَارِينِ!",
}

async def gen_audio(key, text):
    words = []
    comm = edge_tts.Communicate(
        text, VOICE, pitch=PITCH, rate=RATE, boundary="WordBoundary"
    )
    
    with open(f"{OUT}/{key}.mp3", "wb") as f:
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "text": chunk["text"],
                    "offset": round(chunk["offset"] / 10000),
                    "duration": round(chunk["duration"] / 10000)
                })
    
    with open(f"{OUT}/{key}.json", "w", encoding="utf-8") as f:
        json.dump(words, f, ensure_ascii=False, indent=2)
    
    file_size = os.path.getsize(f"{OUT}/{key}.mp3") // 1024
    print(f"✅ {key}: {file_size}KB, {len(words)} كلمة")

async def main():
    print(f"📢 توليد صوت الدرس 13 → {OUT}\n")
    for key, text in LESSON_TEXTS.items():
        try:
            await gen_audio(key, text)
        except Exception as e:
            print(f"❌ خطأ في {key}: {e}")
    print(f"\n✨ اكتمل!")

if __name__ == "__main__":
    asyncio.run(main())
