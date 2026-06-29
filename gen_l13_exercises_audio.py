import asyncio
import edge_tts
import json
import os

VOICE = "ar-DZ-IsmaelNeural"
RATE = "-3%"
PITCH = "+0Hz"

OUT = "public/audio/lesson_13_exercises"
os.makedirs(OUT, exist_ok=True)

SCENARIOS = {
    # التمرين 1
    "l13_ex1_q1": "عُدَّ المُكَعَّبَاتِ. كَمْ مُكَعَّبًا تَرَى؟",
    "l13_ex1_q2": "عُدَّ الكُرَاتِ. كَمْ كُرَةً تَرَى؟",
    "l13_ex1_q3": "عُدَّ اللُّعَبَ. كَمْ لُعْبَةً تَرَى؟",
    "l13_ex1_q4": "عُدَّ البَالُونَاتِ. كَمْ بَالُونًا تَرَى؟",
    "l13_ex1_q5": "عُدَّ المُكَعَّبَاتِ. كَمْ مُكَعَّبًا تَرَى؟",

    # التمرين 2
    "l13_ex2_q1": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا ثَلاثَةُ أَشْيَاءَ.",
    "l13_ex2_q2": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا خَمْسَةُ أَشْيَاءَ.",
    "l13_ex2_q3": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا ثَمَانِيَةُ أَشْيَاءَ.",
    "l13_ex2_q4": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا عَشَرَةُ أَشْيَاءَ.",
    "l13_ex2_q5": "أَيْنَ تَرَى أَكْبَرَ عَدَدٍ مِنَ الْأَشْيَاءِ؟",

    # التمرين 3
    "l13_ex3_q1": "اِسْحَبْ كُلَّ عَدَدٍ إِلَى الصُّورَةِ الْمُنَاسِبَةِ.",
    "l13_ex3_q2": "اِسْحَبْ كُلَّ صُورَةٍ إِلَى الْعَدَدِ الْمُنَاسِبِ.",
    "l13_ex3_q3": "اِرْبِطِ الْعَدَدَ بِالصُّورَةِ الصَّحِيحَةِ.",
}

async def generate(key, text):
    timings = []

    communicate = edge_tts.Communicate(
        text,
        VOICE,
        rate=RATE,
        pitch=PITCH,
        boundary="WordBoundary",
    )

    with open(f"{OUT}/{key}.mp3", "wb") as audio:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                timings.append({
                    "text": chunk["text"],
                    "offset": round(chunk["offset"] / 10000),
                    "duration": round(chunk["duration"] / 10000),
                })

    with open(f"{OUT}/{key}.json", "w", encoding="utf-8") as f:
        json.dump(timings, f, ensure_ascii=False, indent=2)

    print(f"✅ {key}")

async def main():
    for key, text in SCENARIOS.items():
        await generate(key, text)

asyncio.run(main())
