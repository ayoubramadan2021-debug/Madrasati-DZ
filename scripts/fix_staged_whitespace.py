#!/usr/bin/env python3

from pathlib import Path
import re
import subprocess


def git_output(*args: str) -> bytes:
    result = subprocess.run(
        ["git", *args],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=True,
    )
    return result.stdout


raw = git_output(
    "diff",
    "--cached",
    "--name-only",
    "--diff-filter=ACMR",
    "-z",
)

paths = [
    Path(item.decode("utf-8", errors="surrogateescape"))
    for item in raw.split(b"\0")
    if item
]

fixed: list[Path] = []

for path in paths:
    if not path.is_file():
        continue

    data = path.read_bytes()

    # تجاهل الملفات الثنائية: الصور، الصوت، الخطوط...
    if b"\0" in data:
        continue

    try:
        text = data.decode("utf-8")
    except UnicodeDecodeError:
        continue

    # حذف المسافات وTabs الموجودة في نهاية الأسطر فقط
    cleaned = re.sub(
        r"[ \t]+(?=\r?$)",
        "",
        text,
        flags=re.MULTILINE,
    )

    if cleaned == text:
        continue

    path.write_text(cleaned, encoding="utf-8", newline="")
    fixed.append(path)

if fixed:
    subprocess.run(
        ["git", "add", "--", *map(str, fixed)],
        check=True,
    )

    print("✅ تم تنظيف المسافات الزائدة تلقائيًا:")
    for path in fixed:
        print(f"   - {path}")
else:
    print("✅ لا توجد مسافات زائدة في الملفات المرفوعة.")
