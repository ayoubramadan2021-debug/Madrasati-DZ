#!/usr/bin/env python3

import asyncio
import json
import re
from pathlib import Path

import edge_tts


VOICE = "ar-DZ-IsmaelNeural"
RATE = "-5%"
PITCH = "+4Hz"

QUESTION_FILES = {
    "ex1_build_number": Path(
        "src/features/lesson-v2/content/"
        "lesson48_exercise1.ts"
    ),
    "ex2_read_number": Path(
        "src/features/lesson-v2/content/"
        "lesson48_exercise2.ts"
    ),
    "ex3_missing_number": Path(
        "src/features/lesson-v2/content/"
        "lesson48_exercise3.ts"
    ),
    "ex4_decompose_number": Path(
        "src/features/lesson-v2/content/"
        "lesson48_exercise4.ts"
    ),
}


def extract_question(
    path: Path,
) -> str:
    source = path.read_text(
        encoding="utf-8"
    )

    match = re.search(
        r'const\s+question\s*=\s*'
        r'\n?\s*"([^"]+)"\s*;',
        source,
        flags=re.MULTILINE,
    )

    if not match:
        raise RuntimeError(
            f"تعذر استخراج السؤال من: {path}"
        )

    return match.group(1)


async def generate_one(
    output_dir: Path,
    key: str,
    text: str,
) -> None:
    canonical_words = text.split()
    raw_boundaries: list[dict] = []

    temp_mp3 = (
        output_dir /
        f".{key}.tmp.mp3"
    )

    temp_json = (
        output_dir /
        f".{key}.tmp.json"
    )

    final_mp3 = (
        output_dir /
        f"{key}.mp3"
    )

    final_json = (
        output_dir /
        f"{key}.json"
    )

    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate=RATE,
        pitch=PITCH,
    boundary="WordBoundary",
    )

    with temp_mp3.open("wb") as audio:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio.write(chunk["data"])

            elif (
                chunk["type"] ==
                "WordBoundary"
            ):
                raw_boundaries.append(
                    {
                        "raw_text": str(
                            chunk.get(
                                "text",
                                "",
                            )
                        ),
                        "offset": int(
                            chunk["offset"] /
                            10000
                        ),
                        "duration": max(
                            1,
                            int(
                                chunk[
                                    "duration"
                                ] /
                                10000
                            ),
                        ),
                    }
                )

    if (
        len(raw_boundaries) !=
        len(canonical_words)
    ):
        temp_mp3.unlink(
            missing_ok=True
        )

        temp_json.unlink(
            missing_ok=True
        )

        raise RuntimeError(
            f"{key}: عدد كلمات النص "
            f"{len(canonical_words)} "
            f"لا يساوي WordBoundary "
            f"{len(raw_boundaries)}.\n"
            f"النص: {canonical_words}\n"
            f"الحدود: "
            f"{[x['raw_text'] for x in raw_boundaries]}"
        )

    exact = [
        {
            "text":
                canonical_words[index],

            "offset":
                raw_boundaries[
                    index
                ]["offset"],

            "duration":
                raw_boundaries[
                    index
                ]["duration"],
        }
        for index in range(
            len(canonical_words)
        )
    ]

    temp_json.write_text(
        json.dumps(
            exact,
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    temp_mp3.replace(
        final_mp3
    )

    temp_json.replace(
        final_json
    )

    print(
        f"✅ {key}: "
        f"{len(exact)} WordBoundary حقيقية"
    )


async def main() -> None:
    root = Path.cwd()

    output_dir = (
        root /
        "public" /
        "audio" /
        "teachers" /
        "khalil" /
        "lesson_48_numbers_to_39" /
        "exercises"
    )

    output_dir.mkdir(
        parents=True,
        exist_ok=True,
    )

    for (
        key,
        relative_path,
    ) in QUESTION_FILES.items():
        question = extract_question(
            root / relative_path
        )

        await generate_one(
            output_dir,
            key,
            question,
        )

    print(
        "✅ اكتمل إنشاء صوت التمارين "
        "والكاريوكي من العملية نفسها"
    )


if __name__ == "__main__":
    asyncio.run(main())
