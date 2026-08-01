import asyncio, json, re
from pathlib import Path
import edge_tts

OUT = Path("public/audio/teachers/taline/lesson_25_exercises")
OUT.mkdir(parents=True, exist_ok=True)

VOICE = "ar-DZ-AminaNeural"
RATE = "-3%"
PITCH = "+8Hz"

SRC_FILES = [
  Path("src/features/lesson-v2/content/lesson25_exercise1.ts"),
  Path("src/features/lesson-v2/content/lesson25_exercise2.ts"),
  Path("src/features/lesson-v2/content/lesson25_exercise3.ts"),
]

def extract_items():
    found = {}
    for p in SRC_FILES:
        s = p.read_text(encoding="utf-8")
        blocks = re.findall(r"\{\s*id:\s*\"l25_[\s\S]*?\n\s*\},", s)
        for b in blocks:
            key = re.search(r'question_audio_key:\s*"([^"]+)"', b)
            story = re.search(r'story:\s*"([^"]+)"', b)
            question = re.search(r'question:\s*"([^"]+)"', b)
            if key and story and question:
                found[key.group(1)] = story.group(1) + " " + question.group(1)
    return found

ITEMS = extract_items()

def clean(w):
    return re.sub(r"[،,.!?؟؛:]", "", (w or "").strip())

def to_ms(v):
    v = int(v or 0)
    return int(v / 10000) if v > 100000 else v

async def make(key, text):
    audio = bytearray()
    words = []
    c = edge_tts.Communicate(text=text, voice=VOICE, rate=RATE, pitch=PITCH)

    async for chunk in c.stream():
        if chunk["type"] == "audio":
            audio.extend(chunk["data"])
        elif chunk["type"] == "WordBoundary":
            w = clean(chunk.get("text") or chunk.get("Text") or "")
            if w:
                words.append({
                    "text": w,
                    "offset": to_ms(chunk.get("offset", chunk.get("Offset", 0))),
                    "duration": max(340, to_ms(chunk.get("duration", chunk.get("Duration", 0)))),
                })

    if not words:
        words = [{"text": w, "offset": i * 500, "duration": 430} for i, w in enumerate(text.split())]

    (OUT / f"{key}.mp3").write_bytes(audio)
    (OUT / f"{key}.json").write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    print("✓", key, len(audio), "bytes", len(words), "words")

async def main():
    if len(ITEMS) != 15:
        raise SystemExit(f"❌ استخرجت {len(ITEMS)} أسئلة فقط، المطلوب 15")
    for k, t in ITEMS.items():
        await make(k, t)

asyncio.run(main())
