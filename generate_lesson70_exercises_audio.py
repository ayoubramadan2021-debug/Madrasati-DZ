import asyncio
import json
import math
import re
import subprocess
import sys
import tempfile
import unicodedata
from array import array
from pathlib import Path

import edge_tts

SRC = Path(
    "src/features/lesson-v2/exercises-v2/"
    "Lesson70StraightLinesExercises.tsx"
)

OUT = Path(
    "public/audio/teachers/khalil/"
    "lesson_70_straight_lines/exercises"
)

VOICE = "ar-DZ-IsmaelNeural"
RATE = "-6%"

SAMPLE_RATE = 16000
FRAME_MS = 20
FRAME_SAMPLES = SAMPLE_RATE * FRAME_MS // 1000

PUNCTUATION_END = re.compile(r"[،؛:؟.!]+$")
ARABIC_MARKS = re.compile(
    r"[\u0610-\u061A"
    r"\u064B-\u065F"
    r"\u0670"
    r"\u06D6-\u06ED]"
)


def extract_questions():
    source = SRC.read_text(encoding="utf-8")

    matches = re.findall(
        r'prompt:\s*"([^"]+)"\s*,\s*'
        r'audioKey:\s*"([^"]+)"',
        source,
        flags=re.S,
    )

    items = {
        key: text
        for text, key in matches
        if key.startswith("l70_ex")
    }

    expected = {
        f"l70_ex{mission}_q{q}"
        for mission in range(1, 5)
        for q in range(1, 5)
    }

    if set(items) != expected:
        missing = sorted(expected - set(items))
        extra = sorted(set(items) - expected)

        raise SystemExit(
            "❌ استخراج الأسئلة غير مطابق.\n"
            f"Found={len(items)}\n"
            f"Missing={missing}\n"
            f"Extra={extra}"
        )

    return sorted(items.items())


def normalize_word(word):
    word = unicodedata.normalize("NFKC", word)
    word = ARABIC_MARKS.sub("", word)
    word = re.sub(r"[^\u0621-\u064A0-9]", "", word)
    return word


def word_weight(word):
    return max(2.0, float(len(normalize_word(word))))


def percentile(values, ratio):
    if not values:
        return 0.0

    ordered = sorted(values)
    index = round((len(ordered) - 1) * ratio)
    return ordered[index]


async def synthesize(text, destination):
    last_error = None

    for attempt in range(1, 6):
        try:
            communicator = edge_tts.Communicate(
                text=text,
                voice=VOICE,
                rate=RATE,
            )

            chunks = []

            async for chunk in communicator.stream():
                if chunk.get("type") == "audio":
                    data = chunk.get("data")
                    if data:
                        chunks.append(data)

            audio = b"".join(chunks)

            if len(audio) < 2000:
                raise RuntimeError("ملف الصوت الناتج فارغ.")

            destination.write_bytes(audio)
            return

        except Exception as error:
            last_error = error

            if attempt < 5:
                await asyncio.sleep(attempt * 1.5)

    raise RuntimeError(
        f"❌ فشل توليد الصوت:\n{text}\n{last_error}"
    )


def decode_to_pcm(mp3_path, pcm_path):
    subprocess.run(
        [
            "ffmpeg",
            "-hide_banner",
            "-loglevel", "error",
            "-y",
            "-i", str(mp3_path),
            "-f", "s16le",
            "-acodec", "pcm_s16le",
            "-ar", str(SAMPLE_RATE),
            "-ac", "1",
            str(pcm_path),
        ],
        check=True,
    )

    raw = pcm_path.read_bytes()

    if len(raw) < 2000:
        raise RuntimeError(f"❌ PCM فارغ: {mp3_path}")

    samples = array("h")
    samples.frombytes(raw)

    if sys.byteorder != "little":
        samples.byteswap()

    return samples


def frame_rms(samples):
    values = []

    for start in range(0, len(samples), FRAME_SAMPLES):
        frame = samples[start:start + FRAME_SAMPLES]

        if not frame:
            continue

        total = sum(
            float(sample) * float(sample)
            for sample in frame
        )

        values.append(
            math.sqrt(total / len(frame))
        )

    return values


def fill_short_silence(states, maximum_frames):
    result = states[:]
    index = 0

    while index < len(result):
        if result[index]:
            index += 1
            continue

        start = index

        while index < len(result) and not result[index]:
            index += 1

        end = index

        if (
            start > 0
            and end < len(result)
            and result[start - 1]
            and result[end]
            and end - start <= maximum_frames
        ):
            for position in range(start, end):
                result[position] = True

    return result


def remove_short_speech(states, minimum_frames):
    result = states[:]
    index = 0

    while index < len(result):
        if not result[index]:
            index += 1
            continue

        start = index

        while index < len(result) and result[index]:
            index += 1

        if index - start < minimum_frames:
            for position in range(start, index):
                result[position] = False

    return result


def speech_runs(states):
    runs = []
    index = 0

    while index < len(states):
        if not states[index]:
            index += 1
            continue

        start = index

        while index < len(states) and states[index]:
            index += 1

        runs.append((start, index))

    return runs


def detect_speech(samples):
    rms_values = frame_rms(samples)

    if not rms_values:
        raise RuntimeError("❌ تعذر تحليل الصوت.")

    low = percentile(rms_values, 0.20)
    high = percentile(rms_values, 0.90)

    threshold = max(
        100.0,
        low + (high - low) * 0.13,
    )

    active = [
        value >= threshold
        for value in rms_values
    ]

    active = fill_short_silence(
        active,
        maximum_frames=4,
    )

    active = remove_short_speech(
        active,
        minimum_frames=3,
    )

    runs = speech_runs(active)

    if not runs:
        duration_ms = round(
            len(samples) * 1000 / SAMPLE_RATE
        )

        return (
            100,
            max(200, duration_ms - 100),
            [],
            {
                "threshold": threshold,
                "fallback": True,
            },
        )

    start_ms = runs[0][0] * FRAME_MS
    end_ms = runs[-1][1] * FRAME_MS

    gaps = []

    for left, right in zip(runs, runs[1:]):
        gap_start = left[1] * FRAME_MS
        gap_end = right[0] * FRAME_MS

        if gap_end - gap_start >= 80:
            gaps.append((gap_start, gap_end))

    return (
        start_ms,
        end_ms,
        gaps,
        {
            "threshold": threshold,
            "fallback": False,
            "speech_runs": len(runs),
        },
    )


def split_into_clauses(text):
    words = [
        word
        for word in text.split()
        if word.strip()
    ]

    clauses = []
    current = []

    for word in words:
        current.append(word)

        if PUNCTUATION_END.search(word):
            clauses.append(current)
            current = []

    if current:
        clauses.append(current)

    return clauses


def select_boundaries(
    clauses,
    speech_start,
    speech_end,
    gaps,
):
    boundary_count = max(0, len(clauses) - 1)

    if boundary_count == 0:
        return []

    clause_weights = [
        sum(word_weight(word) for word in clause)
        for clause in clauses
    ]

    total_weight = sum(clause_weights)

    cumulative = 0.0
    targets = []

    for weight in clause_weights[:-1]:
        cumulative += weight

        target = speech_start + round(
            (speech_end - speech_start)
            * cumulative
            / total_weight
        )

        targets.append(target)

    available = [
        {
            "start": start,
            "end": end,
            "center": (start + end) // 2,
        }
        for start, end in gaps
        if end - start >= 80
    ]

    selected = []
    used_indices = set()
    previous_right = speech_start

    for boundary_index, target in enumerate(targets):
        remaining = (
            boundary_count
            - boundary_index
            - 1
        )

        candidates = []

        for index, gap in enumerate(available):
            if index in used_indices:
                continue

            if gap["start"] <= previous_right:
                continue

            remaining_after = sum(
                1
                for later_index, later_gap
                in enumerate(available)
                if (
                    later_index not in used_indices
                    and later_index != index
                    and later_gap["start"] > gap["end"]
                )
            )

            if remaining_after < remaining:
                continue

            candidates.append(
                (
                    abs(gap["center"] - target),
                    index,
                    gap,
                )
            )

        if candidates:
            candidates.sort(key=lambda item: item[0])

            distance, index, gap = candidates[0]

            maximum_distance = max(
                900,
                round(
                    (speech_end - speech_start)
                    * 0.17
                ),
            )

            if distance <= maximum_distance:
                used_indices.add(index)

                selected.append(
                    (
                        gap["start"],
                        gap["end"],
                    )
                )

                previous_right = gap["end"]
                continue

        boundary_point = max(
            previous_right + 40,
            min(
                speech_end - 40,
                target,
            ),
        )

        selected.append(
            (
                boundary_point,
                boundary_point,
            )
        )

        previous_right = boundary_point

    return selected


def make_word_timings(
    text,
    speech_start,
    speech_end,
    gaps,
):
    clauses = split_into_clauses(text)

    boundaries = select_boundaries(
        clauses,
        speech_start,
        speech_end,
        gaps,
    )

    clause_starts = [speech_start]
    clause_ends = []

    for left, right in boundaries:
        clause_ends.append(left)
        clause_starts.append(right)

    clause_ends.append(speech_end)

    timings = []
    reports = []

    for clause_index, clause in enumerate(clauses):
        start = clause_starts[clause_index]
        end = clause_ends[clause_index]

        if end <= start:
            end = start + max(
                180,
                len(clause) * 100,
            )

        weights = [
            word_weight(word)
            for word in clause
        ]

        total_weight = sum(weights)

        cursor = start
        remaining_duration = end - start
        remaining_weight = total_weight

        for word_index, (word, weight) in enumerate(
            zip(clause, weights)
        ):
            is_last = (
                word_index == len(clause) - 1
            )

            if is_last:
                duration = max(
                    1,
                    remaining_duration,
                )
            else:
                duration = max(
                    1,
                    round(
                        remaining_duration
                        * weight
                        / remaining_weight
                    ),
                )

            timings.append(
                {
                    "text": word,
                    "offset": int(cursor),
                    "duration": int(duration),
                }
            )

            cursor += duration
            remaining_duration -= duration
            remaining_weight -= weight

        reports.append(
            {
                "words": clause,
                "start_ms": start,
                "end_ms": end,
                "duration_ms": end - start,
            }
        )

    return timings, reports


def media_duration_ms(path):
    result = subprocess.run(
        [
            "ffprobe",
            "-v", "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        capture_output=True,
        text=True,
        check=True,
    )

    return round(
        float(result.stdout.strip()) * 1000
    )


async def main():
    items = extract_questions()
    OUT.mkdir(parents=True, exist_ok=True)

    print("========================================")
    print(" LESSON70 EXERCISES AUDIO")
    print("========================================")
    print("Voice :", VOICE)
    print("Rate  :", RATE)
    print("Items :", len(items))

    reports = []

    with tempfile.TemporaryDirectory(
        prefix="lesson70_ex_audio_"
    ) as temp:
        temp = Path(temp)

        for index, (key, text) in enumerate(
            items,
            start=1,
        ):
            print(
                f"\n⏳ {index}/16 {key}"
            )

            mp3 = OUT / f"{key}.mp3"
            pcm = temp / f"{key}.pcm"

            await synthesize(text, mp3)

            samples = decode_to_pcm(
                mp3,
                pcm,
            )

            (
                speech_start,
                speech_end,
                gaps,
                analysis,
            ) = detect_speech(samples)

            timings, clauses = make_word_timings(
                text,
                speech_start,
                speech_end,
                gaps,
            )

            expected_words = text.split()
            actual_words = [
                item["text"]
                for item in timings
            ]

            if actual_words != expected_words:
                raise RuntimeError(
                    f"❌ words mismatch: {key}"
                )

            previous_end = -1

            for item in timings:
                offset = item["offset"]
                duration = item["duration"]

                if offset < previous_end:
                    raise RuntimeError(
                        f"❌ timing overlap: {key}"
                    )

                if duration <= 0:
                    raise RuntimeError(
                        f"❌ invalid duration: {key}"
                    )

                previous_end = offset + duration

            audio_duration = media_duration_ms(mp3)

            last_end = (
                timings[-1]["offset"]
                + timings[-1]["duration"]
            )

            if last_end > audio_duration + 300:
                raise RuntimeError(
                    f"❌ karaoke exceeds audio: {key}"
                )

            payload = (
                json.dumps(
                    timings,
                    ensure_ascii=False,
                    indent=2,
                )
                + "\n"
            )

            normal = OUT / f"{key}.json"
            karaoke = OUT / f"{key}.karaoke.json"

            normal.write_text(
                payload,
                encoding="utf-8",
            )

            karaoke.write_text(
                payload,
                encoding="utf-8",
            )

            if normal.read_bytes() != karaoke.read_bytes():
                raise RuntimeError(
                    f"❌ JSON != Karaoke: {key}"
                )

            reports.append(
                {
                    "key": key,
                    "text": text,
                    "audio_duration_ms": audio_duration,
                    "speech_start_ms": speech_start,
                    "speech_end_ms": speech_end,
                    "words": len(timings),
                    "detected_gaps": [
                        {
                            "start_ms": a,
                            "end_ms": b,
                            "duration_ms": b - a,
                        }
                        for a, b in gaps
                    ],
                    "clauses": clauses,
                    "analysis": analysis,
                }
            )

            print(
                f"✅ {key}: "
                f"{len(timings)} words | "
                f"{audio_duration}ms"
            )

            await asyncio.sleep(0.25)

    report = OUT / "lesson70-exercises-sync-report.json"

    report.write_text(
        json.dumps(
            {
                "voice": VOICE,
                "rate": RATE,
                "questions": len(reports),
                "reports": reports,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )

    mp3_count = len(list(OUT.glob("l70_ex*_q*.mp3")))
    json_count = len([
        p for p in OUT.glob("l70_ex*_q*.json")
        if not p.name.endswith(".karaoke.json")
    ])
    karaoke_count = len(
        list(OUT.glob("l70_ex*_q*.karaoke.json"))
    )

    if (
        mp3_count != 16
        or json_count != 16
        or karaoke_count != 16
    ):
        raise RuntimeError(
            "❌ Final count failed: "
            f"MP3={mp3_count} "
            f"JSON={json_count} "
            f"KARAOKE={karaoke_count}"
        )

    print()
    print("========================================")
    print("✅ LESSON70 EXERCISES AUDIO COMPLETE")
    print("========================================")
    print("MP3     =", mp3_count)
    print("JSON    =", json_count)
    print("KARAOKE =", karaoke_count)
    print("JSON == Karaoke ✅")


asyncio.run(main())
