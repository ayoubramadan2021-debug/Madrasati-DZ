#!/data/data/com.termux/files/usr/bin/bash

python3 - <<'PY'
from pathlib import Path

p = Path("src/features/lesson-v2/v2Registry.ts")
s = p.read_text()

marker = '''export function getV2KeyByLesson(
  lesson: any
): string | null {
'''

insert = '''export function getV2KeyByLesson(
  lesson: any
): string | null {

  // MADRASATI WORLD: Arabic + Islamic + Civic
  // This world uses local ordering:
  // 1->lesson12 ... 9->lesson20
  if (
    lesson?.world_id === "83975f07-bdaf-4991-9f96-27d954519f06"
  ) {
    const madrasatiLessons: Record<number, string> = {
      1: "lesson12",
      2: "lesson13",
      3: "lesson14",
      4: "lesson15",
      5: "lesson16",
      6: "lesson17",
      7: "lesson18",
      8: "lesson19",
      9: "lesson20",
    };

    return madrasatiLessons[Number(lesson?.sort_order)] ?? null;
  }
'''

if marker not in s:
    print("FUNCTION MARKER NOT FOUND")
    exit()

if "MADRASATI WORLD: Arabic + Islamic + Civic" in s:
    print("ALREADY PATCHED")
    exit()

s = s.replace(marker, insert, 1)

p.write_text(s)
print("DONE:", p)
PY
