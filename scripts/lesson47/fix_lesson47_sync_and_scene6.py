#!/usr/bin/env python3

import asyncio
import json
import unicodedata
from pathlib import Path

import edge_tts

ROOT = Path.cwd()
BASE = ROOT / "public" / "audio" / "teachers" / "taline" / "lesson_47_grid_navigation"
LESSON_TS = ROOT / "src" / "features" / "lesson-v2" / "content" / "lesson47.ts"
NARRATION_JSON = BASE / "narration.json"

VOICE = "ar-DZ-AminaNeural"
RATE = "-5%"
PITCH = "+6Hz"

# إذا كان الكاريوكي متأخرًا قليلًا:
# -90 يعني تقديم الكلمات 90ms
# إذا صار مبكرًا أكثر من اللازم اجعله -60
# وإذا بقي متأخرًا اجعله -120
SHIFT_MS = -90

SCENE6_KEY = "s6_closing"
SCENE6_TEXT = "أَحْسَنْتُمْ! نَسْتَطِيعُ الآنَ قِرَاءَةَ مَسْلَكٍ بِالأَسْهُمِ، وَتَمْثِيلَ مَسْلَكٍ آخَرَ، وَالوُصُولَ إِلَى الهَدَفِ بِدِقَّةٍ."

ALL_KEYS = [
    "s1_intro",
    "s2_right_left",
    "s3_up_down",
    "s4_follow_arrows",
    "s5_encode_route",
    "s6_closing",
]

OLD_PHRASE = "قِرَاءَ مَسْلَكٍ"
NEW_PHRASE = "قِرَاءَةَ مَسْلَكٍ"


def visible_letter_count(word: str) -> int:
    count = 0
    for ch in word:
        if unicodedata.combining(ch):
            continue
        if ch.isalpha():
            count += 1
    return max(count, 1)


def normalize_timings(raw_timings, text: str):
    canonical_words = text.split()

    if len(raw_timings) == len(canonical_words):
        return [
            {
                "text": canonical_words[i],
                "offset": int(raw_timings[i]["offset"]),
                "duration": max(1, int(raw_timings[i]["duration"])),
            }
            for i in range(len(canonical_words))
        ]

    if not raw_timings:
        # fallback بسيط
        out = []
        offset = 120
        for w in canonical_words:
            duration = max(420, min(1050, visible_letter_count(w) * 125))
            if w.endswith(("،", "؛", ":")):
                duration += 120
            elif w.endswith((".", "!", "؟")):
                duration += 260
            out.append({"text": w, "offset": offset, "duration": duration})
            offset += duration + 75
        return out

    first_offset = int(raw_timings[0]["offset"])
    last_end = max(int(x["offset"]) + int(x["duration"]) for x in raw_timings)
    total_duration = max(1000, last_end - first_offset)

    weights = []
    for w in canonical_words:
        weight = float(visible_letter_count(w))
        if w.endswith(("،", "؛", ":")):
            weight += 1.2
        elif w.endswith((".", "!", "؟")):
            weight += 2.2
        weights.append(weight)

    total_weight = sum(weights)
    cur = first_offset
    result = []

    for i, (w, wt) in enumerate(zip(canonical_words, weights)):
        if i == len(canonical_words) - 1:
            dur = max(1, last_end - cur)
        else:
            dur = max(180, round(total_duration * wt / total_weight))
        result.append({"text": w, "offset": int(cur), "duration": int(dur)})
        cur += dur

    return result


def apply_shift(items, shift_ms: int):
    shifted = []
    for item in items:
        shifted.append({
            "text": item["text"],
            "offset": max(0, int(item["offset"]) + shift_ms),
            "duration": int(item["duration"]),
        })
    return shifted


def patch_text_file(path: Path):
    if not path.exists():
        return
    text = path.read_text(encoding="utf-8")
    if OLD_PHRASE in text:
        text = text.replace(OLD_PHRASE, NEW_PHRASE)
        path.write_text(text, encoding="utf-8")
        print(f"✅ تم تحديث النص في: {path}")
    else:
        print(f"ℹ️ لم أجد العبارة القديمة في: {path}")


def shift_existing_json(path: Path):
    if not path.exists():
        print(f"⚠️ ملف مفقود: {path}")
        return
    data = json.loads(path.read_text(encoding="utf-8"))
    data = apply_shift(data, SHIFT_MS)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✅ تم تعديل التزامن: {path.name}")


async def regenerate_scene6():
    mp3_path = BASE / f"{SCENE6_KEY}.mp3"
    json_path = BASE / f"{SCENE6_KEY}.json"
    tmp_mp3 = BASE / f".{SCENE6_KEY}.mp3.tmp"
    tmp_json = BASE / f".{SCENE6_KEY}.json.tmp"

    raw = []
    communicate = edge_tts.Communicate(
        text=SCENE6_TEXT,
        voice=VOICE,
        rate=RATE,
        pitch=PITCH,
    )

    with tmp_mp3.open("wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                raw.append({
                    "offset": int(chunk["offset"] / 10000),
                    "duration": int(chunk["duration"] / 10000),
                })

    timings = normalize_timings(raw, SCENE6_TEXT)
    timings = apply_shift(timings, SHIFT_MS)

    tmp_json.write_text(
        json.dumps(timings, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    tmp_mp3.replace(mp3_path)
    tmp_json.replace(json_path)

    print(f"✅ أُعيد توليد {SCENE6_KEY}.mp3 و {SCENE6_KEY}.json")


async def main():
    if not BASE.exists():
        raise SystemExit("❌ مجلد الصوت غير موجود")

    # تحديث النص محليًا
    patch_text_file(LESSON_TS)
    patch_text_file(NARRATION_JSON)

    # تعديل التزامن لبقية الملفات
    for key in ALL_KEYS:
        json_file = BASE / f"{key}.json"
        if key != SCENE6_KEY:
            shift_existing_json(json_file)

    # إعادة توليد المشهد السادس بالنص الصحيح + التزامن الجديد
    await regenerate_scene6()

    print("\n✅ انتهى التصحيح.")
    print(f"🔧 قيمة الإزاحة الحالية: {SHIFT_MS}ms")
    print("إذا بقي الكاريوكي متأخرًا قليلًا: اجعل SHIFT_MS = -120")
    print("إذا صار مبكرًا: اجعل SHIFT_MS = -60")


if __name__ == "__main__":
    asyncio.run(main())
