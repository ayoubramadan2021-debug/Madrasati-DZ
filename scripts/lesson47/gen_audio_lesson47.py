#!/usr/bin/env python3

import asyncio
import json
import shutil
import unicodedata
from datetime import datetime
from pathlib import Path

import edge_tts


VOICE = "ar-DZ-AminaNeural"
RATE = "-5%"
PITCH = "+6Hz"

ROOT = Path.cwd()
OUTPUT_DIR = (
    ROOT
    / "public"
    / "audio"
    / "teachers"
    / "taline"
    / "lesson_47_grid_navigation"
)

SCENES = {
    "s1_intro":
        "مَرْحَبًا أَحِبَّائِي! اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نَتَنَقَّلُ عَلَى مَرْصُوفَةٍ، خَانَةً بَعْدَ خَانَةٍ، حَتَّى نَصِلَ إِلَى الهَدَفِ.",

    "s2_right_left":
        "عِنْدَمَا نَتَحَرَّكُ فِي السَّطْرِ، نَذْهَبُ يَمِينًا أَوْ يَسَارًا. كُلُّ سَهْمٍ يَنْقُلُنَا خَانَةً وَاحِدَةً.",

    "s3_up_down":
        "عِنْدَمَا نَتَحَرَّكُ فِي العَمُودِ، نَصْعَدُ إِلَى الأَعْلَى أَوْ نَنْزِلُ إِلَى الأَسْفَلِ، خَانَةً وَاحِدَةً فِي كُلِّ مَرَّةٍ.",

    "s4_follow_arrows":
        "نَبْدَأُ مِنَ النُّقْطَةِ الحَمْرَاءِ، وَنَتَّبِعُ الأَسْهُمَ بِالتَّرْتِيبِ. لَا نَقْفِزُ خَانَةً، وَلَا نَتَحَرَّكُ بِشَكْلٍ مَائِلٍ.",

    "s5_encode_route":
        "لِنُمَثِّلَ المَسْلَكَ، نَنْظُرُ إِلَى كُلِّ خُطْوَةٍ، ثُمَّ نَضَعُ سَهْمًا يُبَيِّنُ اتِّجَاهَهَا: يَمِينًا، يَسَارًا، إِلَى الأَعْلَى، أَوْ إِلَى الأَسْفَلِ.",

    "s6_closing":
        "أَحْسَنْتُمْ! نَسْتَطِيعُ الآنَ قِرَاءَ مَسْلَكٍ بِالأَسْهُمِ، وَتَمْثِيلَ مَسْلَكٍ آخَرَ، وَالوُصُولَ إِلَى الهَدَفِ بِدِقَّةٍ.",
}


def visible_letter_count(word: str) -> int:
    count = 0

    for char in word:
        if unicodedata.combining(char):
            continue

        if char.isalpha():
            count += 1

    return max(count, 1)


def fallback_timings(text: str):
    words = text.split()
    output = []
    offset = 120

    for word in words:
        letters = visible_letter_count(word)
        duration = max(420, min(1050, letters * 125))

        if word.endswith(("،", "؛", ":")):
            duration += 120
        elif word.endswith((".", "!", "؟")):
            duration += 260

        output.append({
            "text": word,
            "offset": offset,
            "duration": duration,
        })

        offset += duration + 75

    return output


def normalize_timings(raw_timings, text: str):
    """
    يضمن أن عدد عناصر JSON يساوي عدد كلمات النص الأصلي،
    حتى يتطابق مؤشر الكاريوكي مع الكلمات المعروضة.
    """

    canonical_words = text.split()

    if len(raw_timings) == len(canonical_words):
        return [
            {
                "text": canonical_word,
                "offset": int(timing["offset"]),
                "duration": max(1, int(timing["duration"])),
            }
            for canonical_word, timing in zip(
                canonical_words,
                raw_timings,
            )
        ]

    if not raw_timings:
        return fallback_timings(text)

    # في الحالة النادرة التي يختلف فيها تقسيم Edge TTS للكلمات،
    # نوزع المدة الحقيقية للصوت على الكلمات الأصلية.
    first_offset = int(raw_timings[0]["offset"])
    last_end = max(
        int(item["offset"]) + int(item["duration"])
        for item in raw_timings
    )

    total_duration = max(1000, last_end - first_offset)

    weights = []

    for word in canonical_words:
        weight = float(visible_letter_count(word))

        if word.endswith(("،", "؛", ":")):
            weight += 1.2
        elif word.endswith((".", "!", "؟")):
            weight += 2.2

        weights.append(weight)

    total_weight = sum(weights)
    current_offset = first_offset
    result = []

    for index, (word, weight) in enumerate(
        zip(canonical_words, weights)
    ):
        if index == len(canonical_words) - 1:
            duration = max(1, last_end - current_offset)
        else:
            duration = max(
                180,
                round(total_duration * weight / total_weight),
            )

        result.append({
            "text": word,
            "offset": int(current_offset),
            "duration": int(duration),
        })

        current_offset += duration

    return result


def create_backup():
    files_to_backup = []

    for key in SCENES:
        for extension in ("mp3", "json"):
            path = OUTPUT_DIR / f"{key}.{extension}"

            if path.exists():
                files_to_backup.append(path)

    narration_path = OUTPUT_DIR / "narration.json"

    if narration_path.exists():
        files_to_backup.append(narration_path)

    if not files_to_backup:
        return None

    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir = ROOT / "backups" / f"lesson47_audio_{stamp}"
    backup_dir.mkdir(parents=True, exist_ok=True)

    for source in files_to_backup:
        shutil.copy2(source, backup_dir / source.name)

    return backup_dir


async def generate_scene(key: str, text: str):
    final_mp3 = OUTPUT_DIR / f"{key}.mp3"
    final_json = OUTPUT_DIR / f"{key}.json"

    temp_mp3 = OUTPUT_DIR / f".{key}.mp3.tmp"
    temp_json = OUTPUT_DIR / f".{key}.json.tmp"

    for temp_file in (temp_mp3, temp_json):
        if temp_file.exists():
            temp_file.unlink()

    raw_timings = []

    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate=RATE,
        pitch=PITCH,
    )

    try:
        with temp_mp3.open("wb") as audio_file:
            async for chunk in communicate.stream():
                chunk_type = chunk.get("type")

                if chunk_type == "audio":
                    audio_file.write(chunk["data"])

                elif chunk_type == "WordBoundary":
                    raw_timings.append({
                        "text": chunk.get("text", ""),
                        "offset": int(chunk["offset"] / 10000),
                        "duration": int(chunk["duration"] / 10000),
                    })

        if not temp_mp3.exists() or temp_mp3.stat().st_size < 1000:
            raise RuntimeError(
                f"الملف الصوتي الناتج فارغ أو صغير جدًا: {key}"
            )

        timings = normalize_timings(raw_timings, text)

        temp_json.write_text(
            json.dumps(
                timings,
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )

        # استبدال ذري بعد اكتمال الملفين.
        temp_mp3.replace(final_mp3)
        temp_json.replace(final_json)

        print(
            f"✅ {key}: "
            f"{final_mp3.stat().st_size / 1024:.1f} KB، "
            f"{len(timings)} كلمة"
        )

    except Exception:
        for temp_file in (temp_mp3, temp_json):
            if temp_file.exists():
                temp_file.unlink()

        raise


def validate_outputs():
    errors = []

    for key, canonical_text in SCENES.items():
        mp3_path = OUTPUT_DIR / f"{key}.mp3"
        json_path = OUTPUT_DIR / f"{key}.json"

        if not mp3_path.exists():
            errors.append(f"{key}.mp3 مفقود")
            continue

        if mp3_path.stat().st_size < 1000:
            errors.append(f"{key}.mp3 صغير أو تالف")

        if not json_path.exists():
            errors.append(f"{key}.json مفقود")
            continue

        try:
            timings = json.loads(
                json_path.read_text(encoding="utf-8")
            )
        except Exception as error:
            errors.append(f"{key}.json غير صالح: {error}")
            continue

        canonical_words = canonical_text.split()

        if len(timings) != len(canonical_words):
            errors.append(
                f"{key}: عدد التوقيتات {len(timings)} "
                f"لا يساوي عدد الكلمات {len(canonical_words)}"
            )

        previous_offset = -1

        for index, item in enumerate(timings):
            if not isinstance(item, dict):
                errors.append(
                    f"{key}: العنصر {index} ليس كائنًا"
                )
                continue

            for field in ("text", "offset", "duration"):
                if field not in item:
                    errors.append(
                        f"{key}: الحقل {field} مفقود "
                        f"في العنصر {index}"
                    )

            offset = item.get("offset", -1)
            duration = item.get("duration", 0)

            if not isinstance(offset, int):
                errors.append(
                    f"{key}: offset غير صحيح في {index}"
                )

            if not isinstance(duration, int) or duration <= 0:
                errors.append(
                    f"{key}: duration غير صحيح في {index}"
                )

            if isinstance(offset, int) and offset < previous_offset:
                errors.append(
                    f"{key}: التوقيت غير مرتب في {index}"
                )

            if isinstance(offset, int):
                previous_offset = offset

    if errors:
        print("\n❌ أخطاء التحقق:")

        for error in errors:
            print(f"  - {error}")

        raise SystemExit(1)

    print("\n✅ جميع ملفات الصوت والكاريوكي سليمة.")


async def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    backup_dir = create_backup()

    if backup_dir:
        print(f"📦 النسخة الاحتياطية: {backup_dir}")

    print(f"🎙️ الصوت: {VOICE}")
    print(f"⚙️ السرعة: {RATE} | الحدة: {PITCH}")
    print()

    for key, text in SCENES.items():
        success = False

        for attempt in range(1, 4):
            try:
                print(
                    f"🔊 توليد {key} "
                    f"(المحاولة {attempt}/3)..."
                )

                await generate_scene(key, text)
                success = True
                break

            except Exception as error:
                print(f"⚠️ فشلت المحاولة: {error}")

                if attempt < 3:
                    await asyncio.sleep(2)

        if not success:
            raise RuntimeError(
                f"تعذر توليد الملف {key} بعد 3 محاولات"
            )

    validate_outputs()


if __name__ == "__main__":
    asyncio.run(main())
