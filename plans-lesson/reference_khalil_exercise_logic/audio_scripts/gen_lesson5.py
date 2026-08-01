#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import asyncio, json, os, edge_tts

OUT_SCENES = "public/audio/lesson_5_counting"
OUT_EX = "public/audio/lesson_5_exercises"
os.makedirs(OUT_SCENES, exist_ok=True)
os.makedirs(OUT_EX, exist_ok=True)

VOICES = {
    "khalil": {"voice": "ar-DZ-IsmaelNeural", "pitch": "+8Hz", "rate": "-3%"},
    "taline": {"voice": "ar-DZ-AminaNeural", "pitch": "+10Hz", "rate": "-3%"},
}

SCENES = [
    ("s1_intro",   "taline", "أَهْلاً بِكُمْ! أَنَا تَالِين، سَأُجَهِّزُ المَائِدَةَ لِضُيُوفِي، تَعَالَوْا نَعُدُّ مَعاً مِنْ سِتَّةٍ إِلَى تِسْعَةٍ"),
    ("s2_six",     "taline", "هَذِهِ سِتُّ مَلَاعِقَ، عُدِّي مَعِي: وَاحِد، اِثْنَان، ثَلَاثَة، أَرْبَعَة، خَمْسَة، سِتَّة"),
    ("s3_seven",   "taline", "وَهَذِهِ سَبْعَةُ فَنَاجِينَ لِلْقَهْوَة، سِتَّة ثُمَّ سَبْعَة"),
    ("s4_eight",   "taline", "وَضَعْتُ ثَمَانِيَةَ أَطْبَاقٍ عَلَى المَائِدَة، عَدَدٌ أَكْبَر"),
    ("s5_nine",    "taline", "وَأَخِيراً تِسْعَةُ أَكْوَابٍ لِلْمَاء، تِسْعَةٌ هُوَ أَكْبَرُ عَدَدٍ اليَوْم"),
    ("s6_closing", "taline", "أَحْسَنْتُمْ! تَعَلَّمْنَا الأَعْدَادَ مِنْ سِتَّةٍ إِلَى تِسْعَةٍ، هَيَّا نَتَدَرَّبُ مَعاً"),
]

EXERCISES = [
    ("l5_ex1_q1", "taline", "تَالِينُ تُرَتِّبُ المَائِدَةَ، أَيُّهُمَا أَكْثَر؟"),
    ("l5_ex1_q2", "taline", "وَضَعَتْ تَالِينُ الأَطْبَاقَ وَالأَكْوَابَ، أَيُّهُمَا أَكْثَر؟"),
    ("l5_ex1_q3", "taline", "لِكُلِّ طَبَقٍ مِلْعَقَة، هَلْ هُمَا مُتَسَاوِيَان؟"),
    ("l5_ex1_q4", "taline", "جَهَّزَتْ فَنَاجِينَ وَأَكْوَاباً، أَيُّهُمَا أَكْثَر؟"),
    ("l5_ex1_q5", "taline", "قَبْلَ وُصُولِ الضُّيُوفِ، أَيُّهُمَا أَكْثَر؟"),
    ("l5_ex2_q1", "taline", "فِي سَلَطَةِ تَالِين، أَيُّهُمَا أَكْثَر؟"),
    ("l5_ex2_q2", "taline", "عَلَى طَاوِلَةِ الفُطُور، أَيُّهُمَا أَكْثَر؟"),
    ("l5_ex2_q3", "taline", "فِي سَلَّةِ الفَوَاكِه، هَلْ هُمَا مُتَسَاوِيَان؟"),
    ("l5_ex2_q4", "taline", "لِتُحَضِّرَ الكَعْكَة، أَيُّهُمَا أَكْثَر؟"),
    ("l5_ex2_q5", "taline", "لِتُزَيِّنَ الحَلْوَى، أَيُّهُمَا أَكْثَر؟"),
    ("l5_ex3_q1", "taline", "عَلَى صَحْنِ الحَلْوَى، أَيُّهُمَا أَكْثَر؟"),
    ("l5_ex3_q2", "taline", "زَيَّنَتْ تَالِينُ الغُرْفَة، أَيُّهُمَا أَكْثَر؟"),
    ("l5_ex3_q3", "taline", "لِكُلِّ شَمْعَةٍ هَدِيَّة، هَلْ هُمَا مُتَسَاوِيَان؟"),
    ("l5_ex3_q4", "taline", "فِي كِيسِ المُفَاجَآت، أَيُّهُمَا أَكْثَر؟"),
    ("l5_ex3_q5", "taline", "وَصَلَ ضُيُوفُ تَالِين، أَيُّهُمَا أَكْثَر؟"),
]

async def gen(out_dir, key, spk, text):
    v = VOICES[spk]
    comm = edge_tts.Communicate(text, v["voice"], rate=v["rate"], pitch=v["pitch"], boundary="WordBoundary")
    timings = []
    with open(f"{out_dir}/{key}.mp3", "wb") as f:
        async for c in comm.stream():
            if c["type"] == "audio":
                f.write(c["data"])
            elif c["type"] == "WordBoundary":
                timings.append({"text": c["text"], "offset": c["offset"]//10000, "duration": c["duration"]//10000})
    with open(f"{out_dir}/{key}.json", "w", encoding="utf-8") as f:
        json.dump(timings, f, ensure_ascii=False, indent=2)
    print(f"✅ {key} ({spk}) — {len(timings)} كلمة")

async def main():
    print("=== المشاهد ===")
    for k, s, t in SCENES:
        await gen(OUT_SCENES, k, s, t)
    print("=== التمارين ===")
    for k, s, t in EXERCISES:
        await gen(OUT_EX, k, s, t)
    print(f"تم: {len(SCENES)} مشهد + {len(EXERCISES)} سؤال")

asyncio.run(main())
