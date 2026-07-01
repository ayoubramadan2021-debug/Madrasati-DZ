import asyncio
import json
import subprocess
from pathlib import Path
import edge_tts

# خليل
VOICE = "ar-DZ-IsmaelNeural"

OUT = Path("public/audio/lesson_15_order_rank")
OUT.mkdir(parents=True, exist_ok=True)

TEXTS = {
    "s1_intro": "مَرْحَبًا أَطْفَالِي. اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نَسْتَعْمِلُ العَدَّ لِمَعْرِفَةِ رُتْبَةِ الشَّيْءِ.",
    "s2_train_fourth": "نَعُدُّ عَرَبَاتِ القِطَارِ مِنَ الأَوَّلِ إِلَى الأَخِيرِ. العَرَبَةُ الخَضْرَاءُ فِي الرُّتْبَةِ الرَّابِعَةِ.",
    "s3_cards_order": "نُرَتِّبُ البِطَاقَاتِ مِنَ الأُولَى إِلَى الأَخِيرَةِ. نَسْتَعْمِلُ العَدَّ لِمَعْرِفَةِ رُتْبَةِ كُلِّ بِطَاقَةٍ.",
    "s4_race_positions": "فِي السِّبَاقِ نُرَتِّبُ السَّيَّارَاتِ. هَذِهِ السَّيَّارَةُ الحَمْرَاءُ فِي الرُّتْبَةِ الأُولَى.",
    "s5_sequence": "عِنْدَمَا نَعْرِفُ التَّرْتِيبَ، نَسْتَطِيعُ إِكْمَالَ الأَمَاكِنِ النَّاقِصَةِ فِي السِّلْسِلَةِ.",
    "s6_closing": "أَحْسَنْتُمْ. تَعَلَّمْنَا أَنَّنَا نَسْتَعْمِلُ العَدَّ لِمَعْرِفَةِ الرُّتْبَةِ فِي القِطَارِ وَالسِّبَاقِ وَالسِّلْسِلَةِ.",
}

def clean_words(text: str):
    for ch in ["،", ".", ":", "!", "؟", "؛"]:
        text = text.replace(ch, "")
    return text.split()

def mp3_duration_ms(path: Path) -> int:
    try:
        out = subprocess.check_output([
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(path)
        ], text=True).strip()
        return int(float(out) * 1000)
    except Exception:
        return 6500

def make_aligned_karaoke(text: str, mp3_path: Path):
    parts = clean_words(text)
    total = mp3_duration_ms(mp3_path)
    usable = max(1200, int(total * 0.98))
    gap = 30
    weights = [max(1.0, len(w) ** 0.65) for w in parts]
    s = sum(weights) or 1

    data = []
    offset = 0
    for w, weight in zip(parts, weights):
        duration = int((usable * weight / s) - gap)
        duration = max(260, min(duration, 900))
        data.append({"text": w, "offset": offset, "duration": duration})
        offset += duration + gap
    return data

async def gen_one(key, text):
    mp3_path = OUT / f"{key}.mp3"
    json_path = OUT / f"{key}.json"

    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate="+4%",
        pitch="+4Hz",
    )

    words = []
    with open(mp3_path, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "text": chunk["text"],
                    "offset": int(chunk["offset"] / 10000),
                    "duration": int(chunk["duration"] / 10000),
                })

    if not words:
        words = make_aligned_karaoke(text, mp3_path)

    json_path.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    dur = mp3_duration_ms(mp3_path)
    end = words[-1]["offset"] + words[-1]["duration"] if words else 0
    ratio = round(end / dur, 3) if dur else 0
    print(f"✅ {key}: {len(words)} words | mp3={dur}ms | end={end}ms | ratio={ratio}")

async def main():
    for key, text in TEXTS.items():
        await gen_one(key, text)

asyncio.run(main())
