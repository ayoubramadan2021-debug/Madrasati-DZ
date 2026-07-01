import asyncio
import json
import subprocess
from pathlib import Path
import edge_tts

VOICE = "ar-DZ-IsmaelNeural"

GROUPS = {
    "public/audio/lesson_15_exercise1": {
        "q1": "أَيُّ عَرَبَةٍ فِي الرُّتْبَةِ الرَّابِعَةِ؟",
        "q2": "أَيُّ عَرَبَةٍ فِي الرُّتْبَةِ الثَّانِيَةِ؟",
        "q3": "أَيُّ عَرَبَةٍ فِي الرُّتْبَةِ الأُولَى؟",
        "q4": "أَيُّ عَرَبَةٍ فِي الرُّتْبَةِ الخَامِسَةِ؟",
        "q5": "أَيُّ عَرَبَةٍ فِي الرُّتْبَةِ السَّادِسَةِ؟",
    },
    "public/audio/lesson_15_exercise2": {
        "q1": "مَا رُتْبَةُ السَّيَّارَةِ الحَمْرَاءِ؟",
        "q2": "مَا رُتْبَةُ السَّيَّارَةِ الزَّرْقَاءِ؟",
        "q3": "مَا رُتْبَةُ السَّيَّارَةِ الخَضْرَاءِ؟",
        "q4": "مَا رُتْبَةُ السَّيَّارَةِ الصَّفْرَاءِ؟",
        "q5": "مَا رُتْبَةُ السَّيَّارَةِ الأَخِيرَةِ؟",
    },
    "public/audio/lesson_15_exercise3": {
        "q1": "مَا الرُّتْبَةُ الَّتِي تَأْتِي بَعْدَ الأَوَّلِ؟",
        "q2": "مَا الرُّتْبَةُ الَّتِي تَأْتِي بَعْدَ الثَّانِي؟",
        "q3": "مَا الرُّتْبَةُ الَّتِي تَأْتِي بَعْدَ الثَّالِثِ؟",
        "q4": "مَا الرُّتْبَةُ الَّتِي تَسْبِقُ الثَّالِثَ؟",
        "q5": "مَا الرُّتْبَةُ الأَخِيرَةُ فِي هَذَا التَّرْتِيبِ؟",
    },
    "public/audio/lesson_15_exercise4": {
        "q1": "الأَوَّلُ، الثَّانِي، مَا الرُّتْبَةُ النَّاقِصَةُ؟",
        "q2": "الأَوَّلُ، الثَّانِي، الثَّالِثُ، مَا الرُّتْبَةُ النَّاقِصَةُ؟",
        "q3": "مَا الرُّتْبَةُ الَّتِي تَأْتِي بَعْدَ الثَّالِثِ؟",
        "q4": "الثَّانِي، الثَّالِثُ، الرَّابِعُ. مَا الرُّتْبَةُ النَّاقِصَةُ فِي البِدَايَةِ؟",
        "q5": "الأَوَّلُ، الثَّالِثُ، الرَّابِعُ. مَا الرُّتْبَةُ النَّاقِصَةُ؟",
    },
}

def clean_words(text: str):
    for ch in ["،", ".", ":", "!", "؟", "؛"]:
        text = text.replace(ch, "")
    return text.split()

def duration_ms(path: Path) -> int:
    try:
        out = subprocess.check_output([
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(path)
        ], text=True).strip()
        return int(float(out) * 1000)
    except Exception:
        return 5000

def fallback_json(text: str, mp3: Path):
    words = clean_words(text)
    total = max(1200, int(duration_ms(mp3) * 0.95))
    weights = [max(1.0, len(w) ** 0.65) for w in words]
    s = sum(weights) or 1
    out = []
    offset = 0
    for w, wt in zip(words, weights):
        dur = max(260, min(900, int(total * wt / s) - 25))
        out.append({"text": w, "offset": offset, "duration": dur})
        offset += dur + 25
    return out

async def gen_one(folder: Path, key: str, text: str):
    folder.mkdir(parents=True, exist_ok=True)
    mp3 = folder / f"{key}.mp3"
    js = folder / f"{key}.json"

    communicate = edge_tts.Communicate(text=text, voice=VOICE, rate="+4%", pitch="+4Hz")
    words = []

    with open(mp3, "wb") as f:
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
        words = fallback_json(text, mp3)

    js.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✅ {folder.name}/{key}: {len(words)} words")

async def main():
    for folder_name, texts in GROUPS.items():
        folder = Path(folder_name)
        if folder.exists():
            for f in folder.glob("*"):
                f.unlink()
        folder.mkdir(parents=True, exist_ok=True)
        for key, text in texts.items():
            await gen_one(folder, key, text)

asyncio.run(main())
