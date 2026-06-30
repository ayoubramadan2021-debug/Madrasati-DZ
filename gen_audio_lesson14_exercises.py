import asyncio
import json
import subprocess
from pathlib import Path
import edge_tts

VOICE = "ar-DZ-AminaNeural"
OUT = Path("public/audio/lesson_14_exercises")
OUT.mkdir(parents=True, exist_ok=True)

TEXTS = {
    "l14_ex1_q5": "اُنْظُرْ إِلَى النُّجُومِ، عُدَّهَا، ثُمَّ اخْتَرِ العَدَدَ الَّذِي يُذَكِّرُنَا بِكَمِّيَّتِهَا.",
    "l14_same_q1": "اِخْتَرِ مَجْمُوعَةَ المُكَعَّبَاتِ الَّتِي لَهَا نَفْسُ الكَمِّيَّةِ.",
    "l14_same_q2": "اِخْتَرِ مَجْمُوعَةَ الكُرَاتِ الَّتِي لَهَا نَفْسُ الكَمِّيَّةِ.",
    "l14_same_q3": "اِخْتَرِ مَجْمُوعَةَ البَالُونَاتِ الَّتِي لَهَا نَفْسُ الكَمِّيَّةِ.",
    "l14_same_q4": "اِخْتَرِ مَجْمُوعَةَ التُّفَّاحَاتِ الَّتِي لَهَا نَفْسُ الكَمِّيَّةِ.",
    "l14_same_q5": "اِخْتَرِ مَجْمُوعَةَ النُّجُومِ الَّتِي لَهَا نَفْسُ الكَمِّيَّةِ.",

    "l14_mem_q1": "كَمْ كَانَ عَدَدُ المُكَعَّبَاتِ؟",
    "l14_mem_q2": "كَمْ كَانَ عَدَدُ الكُرَاتِ؟",
    "l14_mem_q3": "كَمْ كَانَ عَدَدُ النُّجُومِ؟",
    "l14_mem_q4": "كَمْ كَانَ عَدَدُ التُّفَّاحَاتِ؟",
    "l14_mem_q5": "كَمْ كَانَ عَدَدُ البَالُونَاتِ؟",

    "l14_build_q1": "اِبْنِ نَفْسَ عَدَدِ المُكَعَّبَاتِ الَّذِي تَذَكَّرْتَهُ.",
    "l14_build_q2": "اِبْنِ نَفْسَ عَدَدِ الكُرَاتِ الَّذِي تَذَكَّرْتَهُ.",
    "l14_build_q3": "اِبْنِ نَفْسَ عَدَدِ النُّجُومِ الَّذِي تَذَكَّرْتَهُ.",
    "l14_build_q4": "اِبْنِ نَفْسَ عَدَدِ التُّفَّاحَاتِ الَّذِي تَذَكَّرْتَهُ.",
    "l14_build_q5": "اِبْنِ نَفْسَ عَدَدِ البَالُونَاتِ الَّذِي تَذَكَّرْتَهُ.",
    "l14_build_q1": "اِبْنِ نَفْسَ عَدَدِ المُكَعَّبَاتِ الَّذِي تَذَكَّرْتَهُ.",
    "l14_build_q2": "اِبْنِ نَفْسَ عَدَدِ الكُرَاتِ الَّذِي تَذَكَّرْتَهُ.",
    "l14_build_q3": "اِبْنِ نَفْسَ عَدَدِ النُّجُومِ الَّذِي تَذَكَّرْتَهُ.",
    "l14_mem_q1": "كَمْ كَانَ عَدَدُ المُكَعَّبَاتِ؟",
    "l14_mem_q2": "كَمْ كَانَ عَدَدُ الكُرَاتِ؟",
    "l14_mem_q3": "كَمْ كَانَ عَدَدُ الكُرَاتِ؟",
    "l14_ex1_q1": "اُنْظُرْ إِلَى البَالُونَاتِ، عُدَّهَا، ثُمَّ اخْتَرِ العَدَدَ الَّذِي يُذَكِّرُنَا بِكَمِّيَّتِهَا.",
    "l14_ex1_q2": "اُنْظُرْ إِلَى التُّفَّاحَاتِ، عُدَّهَا، ثُمَّ اخْتَرِ العَدَدَ الَّذِي يُذَكِّرُنَا بِكَمِّيَّتِهَا.",
    "l14_ex1_q3": "اُنْظُرْ إِلَى المُكَعَّبَاتِ، عُدَّهَا، ثُمَّ اخْتَرِ العَدَدَ الَّذِي يُذَكِّرُنَا بِكَمِّيَّتِهَا.",
    "l14_ex1_q4": "اُنْظُرْ إِلَى الكُرَاتِ، عُدَّهَا، ثُمَّ اخْتَرِ العَدَدَ الَّذِي يُذَكِّرُنَا بِكَمِّيَّتِهَا.",

    "l14_ex2_q1": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا سِتَّةُ مُكَعَّبَاتٍ.",
    "l14_ex2_q2": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا سَبْعُ كُرَاتٍ.",
    "l14_ex2_q3": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا العَدَدُ خَمْسَةٌ.",
    "l14_ex2_q4": "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا أَكْبَرُ كَمِّيَّةٍ.",

    "l14_ex3_q1": "اِسْحَبِ الرَّقْمَ إِلَى الكَمِّيَّةِ المُنَاسِبَةِ.",
    "l14_ex3_q2": "اِسْحَبِ الصُّورَةَ إِلَى العَدَدِ المُنَاسِبِ.",
    "l14_ex3_q3": "اِرْبِطِ العَدَدَ بِالكَمِّيَّةِ الَّتِي تُذَكِّرُنَا بِهَا.",

    "l14_ex4_q1": "اُكْتُبِ الرَّقْمَ سِتَّةً.",
    "l14_ex4_q2": "اُكْتُبِ الرَّقْمَ سَبْعَةً.",
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
        return 4500

def make_aligned_karaoke(text: str, mp3_path: Path):
    parts = clean_words(text)
    total = mp3_duration_ms(mp3_path)
    usable = max(1000, int(total * 0.98))
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
        pitch="+6Hz",
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
