#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import asyncio, json, os, edge_tts

OUT_SCENES = "public/audio/lesson_7_senses"
OUT_EX = "public/audio/lesson_7_exercises"
os.makedirs(OUT_SCENES, exist_ok=True)
os.makedirs(OUT_EX, exist_ok=True)

VOICES = {
    "khalil": {"voice": "ar-DZ-IsmaelNeural", "pitch": "+8Hz", "rate": "-3%"},
    "taline": {"voice": "ar-DZ-AminaNeural", "pitch": "+10Hz", "rate": "-3%"},
}

SCENES = [
    ("s1_intro",   "khalil", "أَهْلاً بِكُمْ! أَنَا خَلِيل، حَوَاسُّنَا الخَمْسُ كُنُوزٌ ثَمِينَةٌ، تَعَالَوْا نَتَعَلَّمُ كَيْفَ نُحَافِظُ عَلَيْهَا"),
    ("s2_sight",   "khalil", "بِعَيْنَيَّ أَرَى الأَلْوَانَ وَالطَّرِيق، أَحْمِي عَيْنَيَّ مِنَ الضَّوْءِ القَوِيِّ وَلَا أَفْرُكُهُمَا"),
    ("s3_hearing", "khalil", "بِأُذُنَيَّ أَسْمَعُ الأَصْوَاتَ الجَمِيلَة، الصَّوْتُ العَالِي جِدّاً يُؤْذِي سَمْعِي"),
    ("s4_protect", "khalil", "هَذَا النَّجَّارُ يَضَعُ نَظَّارَةً عَلَى عَيْنَيْهِ وَوَاقِياً عَلَى أُذُنَيْهِ، إِنَّهُ يَحْمِي حَوَاسَّهُ"),
    ("s5_clean",   "khalil", "أَغْسِلُ يَدَيَّ وَأُنَظِّفُ جِسْمِي كُلَّ يَوْم، النَّظَافَةُ تَحْمِي حَوَاسِّي"),
    ("s6_closing", "khalil", "أَحْسَنْتُمْ! أَنَا أَعْتَنِي بِأَعْضَاءِ الحِسِّ لِأُحَافِظَ عَلَى حَوَاسِّي لِأَنَّهَا تُسَهِّلُ لِي العَيْش"),
]

EXERCISES = [
    ("l7_ex1_q1", "khalil", "غَسْلُ اليَدَيْنِ بِالمَاءِ وَالصَّابُونِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex1_q2", "khalil", "تَنْظِيفُ الأَسْنَانِ بِالفُرْشَاةِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex1_q3", "khalil", "وَضْعُ نَظَّارَةِ الوِقَايَةِ أَثْنَاءَ العَمَلِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex1_q4", "khalil", "فَرْكُ العَيْنَيْنِ بِقُوَّةٍ بِاليَدَيْنِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex1_q5", "khalil", "الاِسْتِمَاعُ لِصَوْتٍ عَالٍ جِدّاً قُرْبَ الأُذُنِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex2_q1", "khalil", "القِرَاءَةُ فِي إِضَاءَةٍ جَيِّدَةٍ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex2_q2", "khalil", "تَقْرِيبُ الوَجْهِ كَثِيراً مِنَ الشَّاشَةِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex2_q3", "khalil", "تَنْظِيفُ الأُذُنِ بِلُطْفٍ بَعْدَ الاِسْتِحْمَامِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex2_q4", "khalil", "أَكْلُ طَعَامٍ فَاسِدٍ مُتَعَفِّنٍ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex2_q5", "khalil", "أَكْلُ الفَوَاكِهِ وَالخُضَرِ الطَّازَجَةِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex3_q1", "khalil", "غَسْلُ الفَاكِهَةِ قَبْلَ أَكْلِهَا، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex3_q2", "khalil", "الصُّرَاخُ بِصَوْتٍ عَالٍ قُرْبَ أُذُنِ الآخَرِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex3_q3", "khalil", "وَضْعُ النَّظَّارَةِ الشَّمْسِيَّةِ فِي الشَّمْسِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex3_q4", "khalil", "حَمْلُ قِدْرٍ سَاخِنٍ بِيَدَيْنِ عَارِيَتَيْنِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
    ("l7_ex3_q5", "khalil", "تَغْطِيَةُ الفَمِ بِالمِرْفَقِ عِنْدَ السُّعَالِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟"),
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
                timings.append({
                    "text": c["text"],
                    "offset": c["offset"] / 10000,
                    "duration": c["duration"] / 10000,
                })
    with open(f"{out_dir}/{key}.json", "w", encoding="utf-8") as f:
        json.dump(timings, f, ensure_ascii=False)
    print(f"  ✅ {key}")

async def main():
    print("المشاهد:")
    for key, spk, text in SCENES:
        await gen(OUT_SCENES, key, spk, text)
    print("التمارين:")
    for key, spk, text in EXERCISES:
        await gen(OUT_EX, key, spk, text)
    print("تم.")

asyncio.run(main())
