import asyncio, edge_tts, json, os

VOICE = "ar-DZ-AminaNeural"  # صوت تالين المستقر
PITCH = "+10Hz"
RATE = "-3%"
OUT = "public/audio/lesson_12_zero"  # نفس المجلد لتوحيد المسارات
os.makedirs(OUT, exist_ok=True)

exercises_scenarios = {
    "l12_ex1_q": "اِخْتَرِ الصُّنْدُوقَ الفَارِغَ.",
    "l12_ex2_q": "كَمْ عَصَافِيرَ بَقِيَتْ عَلَى الغُصْنِ؟",
    "l12_ex3_q": "اِخْتَرِ الإِجَابَةَ الصَّحِيحَةَ."  # صياغة موحدة ومكررة
}

async def gen_audio(key, text):
    words = []
    comm = edge_tts.Communicate(text, VOICE, pitch=PITCH, rate=RATE, boundary="WordBoundary")
    
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
                
    # حفظ الكاريوكي المقترن بالسؤال
    json.dump(words, open(f"{OUT}/{key}.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"✅ تم توليد صوت التمرين: {key} ({len(words)} كلمة)")

async def main():
    for key, text in exercises_scenarios.items():
        await gen_audio(key, text)

asyncio.run(main())
