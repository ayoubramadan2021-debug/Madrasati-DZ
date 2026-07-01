import asyncio
import json
import subprocess
from pathlib import Path
import edge_tts

VOICE = "ar-DZ-IsmaelNeural"

GROUPS = {
    "public/audio/lesson_16_exercise1": {
        "q1": "أَيْنَ نَلْعَبُ بِأَمَانٍ؟",
        "q2": "أَيُّ مَكَانٍ لَا نَلْعَبُ فِيهِ؟",
        "q3": "أَيُّ مَكَانٍ أَفْضَلُ لِلَّعِبِ؟",
        "q4": "أَيْنَ يَلْعَبُ الأَطْفَالُ بِسَلَامٍ؟",
        "q5": "مَا المَكَانُ الَّذِي نَتَجَنَّبُهُ؟",
    },
    "public/audio/lesson_16_exercise2": {
        "q1": "بِمَاذَا نَجْرِي؟",
        "q2": "بِمَاذَا نَقْفِزُ؟",
        "q3": "عِنْدَمَا نَلْعَبُ، مَاذَا نُحَرِّكُ؟",
        "q4": "بِمَاذَا نُمْسِكُ الكُرَةَ؟",
        "q5": "مَاذَا يُسَاعِدُنَا عَلَى الحَرَكَةِ؟",
    },
    "public/audio/lesson_16_exercise3": {
        "q1": "أَيُّ تَصَرُّفٍ خَطِيرٌ؟",
        "q2": "مَاذَا لَا نَفْعَلُ أَثْنَاءَ اللَّعِبِ؟",
        "q3": "أَيُّ سُلُوكٍ غَيْرُ آمِنٍ؟",
        "q4": "أَيُّ تَصَرُّفٍ نَتَجَنَّبُهُ؟",
        "q5": "مَاذَا يَجِبُ أَنْ لَا نَتَسَلَّقَ؟",
    },
    "public/audio/lesson_16_exercise4": {
        "q1": "مَاذَا أَفْعَلُ لِأُحَافِظَ عَلَى صِحَّتِي؟",
        "q2": "أَيُّ سُلُوكٍ صَحِيحٌ؟",
        "q3": "مَاذَا نَفْعَلُ عِنْدَ اللَّعِبِ؟",
        "q4": "أَيُّ حَرَكَةٍ مُنَاسِبَةٌ؟",
        "q5": "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
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
