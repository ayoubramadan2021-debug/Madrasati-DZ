#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import asyncio, json, os, edge_tts
OUT = "public/audio/lesson_4_compare"
os.makedirs(OUT, exist_ok=True)
VOICES = {
    "khalil": {"voice": "ar-DZ-IsmaelNeural", "pitch": "+8Hz", "rate": "-3%"},
    "taline": {"voice": "ar-DZ-AminaNeural", "pitch": "+10Hz", "rate": "-3%"},
}
LINES = [
    ("l4_intro", "khalil", "مَرْحَباً يَا أَعِزَّائِي، اليَوْمَ سَنَتَعَلَّمُ الفَرْقَ بَيْنَ أَكْثَر وَأَقَلّ وَيُسَاوِي"),
    ("l4_more",  "khalil", "التُّفَّاحُ أَكْثَرُ مِنَ المَوْز"),
    ("l4_less",  "taline", "الفَرَاوِلَةُ أَقَلُّ مِنَ البُرْتُقَال"),
    ("l4_equal", "khalil", "العِنَبُ يُسَاوِي الكَرَز، هُمَا مُتَسَاوِيَانِ"),
    ("l4_apply", "taline", "التُّفَّاحُ أَكْثَرُ مِنَ البُرْتُقَال، نُقَارِنُ بِأَكْثَر وَأَقَلّ"),
    ("l4_outro", "khalil", "أَحْسَنْتَ! هَيَّا نَتَدَرَّبُ عَلَى المُقَارَنَة"),
]
async def gen(key, spk, text):
    v = VOICES[spk]
    comm = edge_tts.Communicate(text, v["voice"], rate=v["rate"], pitch=v["pitch"], boundary="WordBoundary")
    timings = []
    with open(f"{OUT}/{key}.mp3", "wb") as f:
        async for c in comm.stream():
            if c["type"] == "audio": f.write(c["data"])
            elif c["type"] == "WordBoundary":
                timings.append({"text": c["text"], "offset": c["offset"]//10000, "duration": c["duration"]//10000})
    with open(f"{OUT}/{key}.json", "w", encoding="utf-8") as f:
        json.dump(timings, f, ensure_ascii=False, indent=2)
    print(f"✅ {key} ({spk}) — {len(timings)} كلمة")
async def main():
    for k, s, t in LINES:
        await gen(k, s, t)
asyncio.run(main())
