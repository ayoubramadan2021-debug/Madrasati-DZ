import asyncio
import json
import subprocess
from pathlib import Path
import edge_tts

# صوت تالين
VOICE = "ar-DZ-AminaNeural"

OUT = Path("public/audio/lesson_14_memory_quantity")
OUT.mkdir(parents=True, exist_ok=True)

TEXTS = {
    "s1_intro": "مَرْحَبًا أَطْفَالِي. اليَوْمَ سَنَتَعَلَّمُ كَيْفَ يُسَاعِدُنَا العَدَدُ عَلَى تَذَكُّرِ الكَمِّيَّةِ.",
    "s2_six_objects": "اُنْظُرُوا إِلَى هَذِهِ المُكَعَّبَاتِ. نَعُدُّهَا مَعًا: وَاحِدٌ، اِثْنَانِ، ثَلَاثَةٌ، أَرْبَعَةٌ، خَمْسَةٌ، سِتَّةٌ. لَدَيْنَا سِتَّةُ مُكَعَّبَاتٍ.",
    "s3_seven_objects": "هُنَا سَبْعُ كُرَاتٍ مُلَوَّنَةٍ. نَعُدُّهَا: وَاحِدٌ، اِثْنَانِ، ثَلَاثَةٌ، أَرْبَعَةٌ، خَمْسَةٌ، سِتَّةٌ، سَبْعَةٌ. العَدَدُ سَبْعَةٌ يُذَكِّرُنَا بِالكَمِّيَّةِ.",
    "s4_groups": "فِي السَّاحَةِ نَرَى مَجْمُوعَاتٍ مُخْتَلِفَةً. لِكُلِّ مَجْمُوعَةٍ عَدَدٌ يُسَاعِدُنَا عَلَى تَذَكُّرِهَا.",
    "s5_use_number": "عِنْدَمَا نَعُدُّ الأَشْيَاءَ، نَحْفَظُ عَدَدَهَا. هَكَذَا نَتَذَكَّرُ الكَمِّيَّةَ بِسُهُولَةٍ.",
    "s6_closing": "أَحْسَنْتُمْ. تَعَلَّمْنَا أَنَّ العَدَدَ يُسَاعِدُنَا عَلَى عَدِّ الأَشْيَاءِ وَتَذَكُّرِ كَمِّيَّتِهَا.",
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
        # fallback قريب إن لم يوجد ffprobe
        return 7500

def make_aligned_karaoke(text: str, mp3_path: Path):
    parts = clean_words(text)
    total = mp3_duration_ms(mp3_path)

    # نجعل الكاريوكي يبدأ مبكرًا قليلًا وينتهي قبل نهاية الصوت قليلًا
    usable = max(1200, int(total * 0.98))
    start = 0

    weights = [max(1.0, len(w) ** 0.65) for w in parts]
    s = sum(weights) or 1

    data = []
    offset = start
    gap = 30

    for w, weight in zip(parts, weights):
        duration = int((usable * weight / s) - gap)
        duration = max(260, min(duration, 900))
        data.append({
            "text": w,
            "offset": offset,
            "duration": duration,
        })
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

    # إذا رجع edge_tts بدون توقيت، نستعمل توقيت مضبوط حسب مدة mp3
    if not words:
        words = make_aligned_karaoke(text, mp3_path)

    json_path.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    dur = mp3_duration_ms(mp3_path)
    last = words[-1]["offset"] + words[-1]["duration"] if words else 0
    print(f"✅ {key}: {len(words)} words | mp3={dur}ms | karaoke_end={last}ms")

async def main():
    for key, text in TEXTS.items():
        await gen_one(key, text)

asyncio.run(main())
