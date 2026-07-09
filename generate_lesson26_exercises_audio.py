import asyncio, json, re
from pathlib import Path
import edge_tts

OUT = Path("public/audio/teachers/khalil/lesson_26_exercises")
OUT.mkdir(parents=True, exist_ok=True)

VOICE = "ar-DZ-IsmaelNeural"
RATE = "-3%"
PITCH = "+4Hz"

SRC_FILES = [
  Path("src/features/lesson-v2/content/lesson26_exercise1.ts"),
  Path("src/features/lesson-v2/content/lesson26_exercise2.ts"),
  Path("src/features/lesson-v2/content/lesson26_exercise3.ts"),
]

def extract():
    out = {}
    for p in SRC_FILES:
        s = p.read_text(encoding="utf-8")
        for m in re.finditer(r'question:\s*"([^"]+)"[\s\S]*?question_audio_key:\s*"([^"]+)"', s):
            question, key = m.group(1), m.group(2)
            out[key] = question
    return out

ITEMS = extract()

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
                    "duration": max(320, to_ms(chunk.get("duration", chunk.get("Duration", 0)))),
                })

    if not words:
        words = [{"text": w, "offset": i * 480, "duration": 400} for i, w in enumerate(text.split())]

    (OUT / f"{key}.mp3").write_bytes(audio)
    (OUT / f"{key}.json").write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    print("✓", key, len(audio), "bytes", len(words), "words")

async def main():
    if len(ITEMS) != 15:
        raise SystemExit(f"❌ استخرجت {len(ITEMS)} سؤالًا فقط، المطلوب 15")
    for key, text in ITEMS.items():
        await make(key, text)

asyncio.run(main())
