#!/usr/bin/env python3

import html
import json
import re
import shutil
import subprocess
import unicodedata
from pathlib import Path


VOICE = "ar-DZ-IsmaelNeural"
RATE = "-5%"
PITCH = "+4Hz"

SCENES = {
    "s1_intro":
        "مَرْحَبًا أَحِبَّائِي! سَنَكْتَشِفُ اليَوْمَ الأَعْدَادَ مِنْ عِشْرِينَ إِلَى تِسْعَةٍ وَثَلَاثِينَ، وَسَنَتَعَلَّمُ كَيْفَ نَقْرَؤُهَا وَنَكْتُبُهَا.",

    "s2_tens_ones":
        "يَتَكَوَّنُ العَدَدُ مِنْ عَشَرَاتٍ وَوَحَدَاتٍ. فَاثْنَانِ وَعِشْرُونَ فِيهِ عَشَرَتَانِ وَوَحْدَتَانِ، وَثَمَانِيَةٌ وَعِشْرُونَ فِيهِ عَشَرَتَانِ وَثَمَانِي وَحَدَاتٍ.",

    "s3_read_numbers":
        "نَقْرَأُ الأَعْدَادَ بِالنَّظَرِ إِلَى العَشَرَاتِ وَالوَحَدَاتِ: اثْنَانِ وَعِشْرُونَ، ثَمَانِيَةٌ وَعِشْرُونَ، ثَلَاثَةٌ وَثَلَاثُونَ، وَسَبْعَةٌ وَثَلَاثُونَ.",

    "s4_match_number_name":
        "نُطَابِقُ كُلَّ عَدَدٍ مَعَ كِتَابَتِهِ بِالحُرُوفِ. فَبِطَاقَةُ أَرْبَعَةٍ وَثَلَاثِينَ تُطَابِقُ العَدَدَ أَرْبَعَةً وَثَلَاثِينَ، وَبِطَاقَةُ ثَمَانِيَةٍ وَعِشْرِينَ تُطَابِقُ العَدَدَ ثَمَانِيَةً وَعِشْرِينَ.",

    "s5_number_sequence":
        "نُكْمِلُ الأَعْدَادَ بِالتَّرْتِيبِ. بَعْدَ سَبْعَةٍ وَعِشْرِينَ يَأْتِي ثَمَانِيَةٌ وَعِشْرُونَ، ثُمَّ تِسْعَةٌ وَعِشْرُونَ، ثُمَّ ثَلَاثُونَ، ثُمَّ وَاحِدٌ وَثَلَاثُونَ.",

    "s6_closing":
        "أَحْسَنْتُمْ! نَسْتَطِيعُ الآنَ قِرَاءَةَ الأَعْدَادِ إِلَى تِسْعَةٍ وَثَلَاثِينَ، وَكِتَابَتَهَا، وَتَفْكِيكَهَا إِلَى عَشَرَاتٍ وَوَحَدَاتٍ، وَإِكْمَالَ تَرْتِيبِهَا.",
}


def timestamp_to_ms(value: str) -> int:
    value = value.strip().replace(",", ".")
    parts = value.split(":")

    if len(parts) == 3:
        hours = int(parts[0])
        minutes = int(parts[1])
        seconds = float(parts[2])
    elif len(parts) == 2:
        hours = 0
        minutes = int(parts[0])
        seconds = float(parts[1])
    else:
        raise ValueError(
            f"توقيت VTT غير صالح: {value}"
        )

    return round(
        (
            hours * 3600
            + minutes * 60
            + seconds
        ) * 1000
    )


def clean_vtt_text(value: str) -> str:
    value = html.unescape(value)
    value = re.sub(r"<[^>]+>", " ", value)
    value = value.replace("\u00a0", " ")
    value = re.sub(r"\s+", " ", value)

    return value.strip()


def parse_vtt(path: Path) -> list[dict]:
    lines = path.read_text(
        encoding="utf-8",
        errors="replace",
    ).splitlines()

    cues: list[dict] = []
    index = 0

    while index < len(lines):
        line = lines[index].strip()

        if "-->" not in line:
            index += 1
            continue

        left, right = line.split("-->", 1)

        start = timestamp_to_ms(left)
        end = timestamp_to_ms(
            right.strip().split()[0]
        )

        index += 1
        text_lines: list[str] = []

        while (
            index < len(lines)
            and lines[index].strip()
        ):
            text_lines.append(
                lines[index].strip()
            )
            index += 1

        text = clean_vtt_text(
            " ".join(text_lines)
        )

        if text and end > start:
            cues.append(
                {
                    "start": start,
                    "end": end,
                    "text": text,
                }
            )

        index += 1

    return cues


def word_weight(word: str) -> float:
    letters = 0

    for character in word:
        if unicodedata.combining(character):
            continue

        if character.isalpha() or character.isdigit():
            letters += 1

    weight = max(letters, 1)

    if word.endswith(("،", "؛", ":")):
        weight += 1.2

    if word.endswith((".", "!", "؟")):
        weight += 2.0

    return float(weight)


def distribute_words(
    words: list[str],
    start: int,
    end: int,
) -> list[dict]:
    if not words:
        return []

    duration = max(end - start, len(words))
    weights = [word_weight(word) for word in words]
    total_weight = sum(weights)

    current = start
    result: list[dict] = []

    for index, word in enumerate(words):
        if index == len(words) - 1:
            word_end = end
        else:
            share = max(
                1,
                round(
                    duration
                    * weights[index]
                    / total_weight
                ),
            )

            word_end = min(
                end,
                current + share,
            )

        result.append(
            {
                "text": word,
                "offset": int(current),
                "duration": max(
                    1,
                    int(word_end - current),
                ),
            }
        )

        current = word_end

    return result


def build_timings(
    canonical_text: str,
    cues: list[dict],
) -> list[dict]:
    canonical_words = canonical_text.split()

    if not cues:
        raise RuntimeError(
            "لم يُنشئ Edge TTS أي إشارات VTT."
        )

    timed_words: list[dict] = []

    for cue in cues:
        cue_words = cue["text"].split()

        timed_words.extend(
            distribute_words(
                cue_words,
                int(cue["start"]),
                int(cue["end"]),
            )
        )

    if len(timed_words) == len(canonical_words):
        for index, canonical_word in enumerate(
            canonical_words
        ):
            timed_words[index]["text"] = (
                canonical_word
            )

        return timed_words

    # احتياط عند اختلاف تقسيم Edge TTS للكلمات العربية.
    return distribute_words(
        canonical_words,
        int(cues[0]["start"]),
        int(cues[-1]["end"]),
    )


def verify_timings(
    text: str,
    timings: list[dict],
) -> None:
    expected_words = text.split()

    if len(timings) != len(expected_words):
        raise RuntimeError(
            "عدد كلمات الكاريوكي لا يساوي "
            "عدد كلمات النص."
        )

    previous_offset = -1

    for index, item in enumerate(timings):
        if item["text"] != expected_words[index]:
            raise RuntimeError(
                f"اختلاف النص عند الكلمة {index}."
            )

        offset = int(item["offset"])
        duration = int(item["duration"])

        if offset < previous_offset:
            raise RuntimeError(
                f"توقيت غير مرتب عند الكلمة {index}."
            )

        if duration <= 0:
            raise RuntimeError(
                f"مدة غير صالحة عند الكلمة {index}."
            )

        previous_offset = offset


def generate_scene(
    output_dir: Path,
    key: str,
    text: str,
) -> None:
    output_dir.mkdir(
        parents=True,
        exist_ok=True,
    )

    temporary_mp3 = (
        output_dir / f".{key}.new.mp3"
    )
    temporary_vtt = (
        output_dir / f".{key}.new.vtt"
    )
    temporary_json = (
        output_dir / f".{key}.new.json"
    )

    final_mp3 = output_dir / f"{key}.mp3"
    final_json = output_dir / f"{key}.json"

    for temporary in (
        temporary_mp3,
        temporary_vtt,
        temporary_json,
    ):
        temporary.unlink(
            missing_ok=True,
        )

    command = [
        "edge-tts",
        "--voice",
        VOICE,
        "--rate",
        RATE,
        "--pitch",
        PITCH,
        "--text",
        text,
        "--write-media",
        str(temporary_mp3),
        "--write-subtitles",
        str(temporary_vtt),
    ]

    completed = subprocess.run(
        command,
        text=True,
        capture_output=True,
    )

    if completed.returncode != 0:
        raise RuntimeError(
            f"{key}: فشل edge-tts:\n"
            f"{completed.stderr}"
        )

    if (
        not temporary_mp3.exists()
        or temporary_mp3.stat().st_size < 500
    ):
        raise RuntimeError(
            f"{key}: ملف MP3 غير صالح."
        )

    if (
        not temporary_vtt.exists()
        or temporary_vtt.stat().st_size == 0
    ):
        raise RuntimeError(
            f"{key}: ملف VTT غير صالح."
        )

    cues = parse_vtt(temporary_vtt)
    timings = build_timings(text, cues)

    verify_timings(text, timings)

    temporary_json.write_text(
        json.dumps(
            timings,
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    # الاستبدال لا يتم إلا بعد نجاح الصوت والتوقيت.
    temporary_mp3.replace(final_mp3)
    temporary_json.replace(final_json)
    temporary_vtt.unlink(missing_ok=True)

    first_offset = timings[0]["offset"]
    last_end = (
        timings[-1]["offset"]
        + timings[-1]["duration"]
    )

    print(
        f"✅ {key}: "
        f"{len(timings)} كلمة، "
        f"{first_offset}ms → {last_end}ms"
    )


def main() -> None:
    if shutil.which("edge-tts") is None:
        raise RuntimeError(
            "أمر edge-tts غير موجود. "
            "نفّذ: pip install edge-tts"
        )

    output_dir = Path(
        "public/audio/teachers/khalil/"
        "lesson_48_numbers_to_39"
    )

    for key, text in SCENES.items():
        print(f"\n🔊 إنشاء {key}...")
        generate_scene(
            output_dir,
            key,
            text,
        )

    print(
        "\n✅ اكتمل صوت الأستاذ خليل "
        "وكاريوكي المشاهد الستة."
    )


if __name__ == "__main__":
    main()
