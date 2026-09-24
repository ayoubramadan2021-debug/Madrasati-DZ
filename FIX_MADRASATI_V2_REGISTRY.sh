#!/data/data/com.termux/files/usr/bin/bash

python3 - <<'PY'
from pathlib import Path

files = list(Path("src/features/lesson-v2").rglob("v2Registry*"))

if not files:
    print("v2Registry not found")
    exit()

p = files[0]
s = p.read_text()

old = '''  const order = Number(lesson?.sort_order);

  if (
    Number.isFinite(order) &&
    V2_SORT_ORDER_MAP[order]
  ) {
    return V2_SORT_ORDER_MAP[order];
  }'''

new = '''  // MADRASATI ARABIC WORLD ROUTING
  // world_id: 83975f07-bdaf-4991-9f96-27d954519f06
  if (
    lesson?.world_id === "83975f07-bdaf-4991-9f96-27d954519f06"
  ) {
    const madrasatiMap: Record<number, string> = {
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

    return madrasatiMap[Number(lesson.sort_order)] ?? null;
  }

  const order = Number(lesson?.sort_order);

  if (
    Number.isFinite(order) &&
    V2_SORT_ORDER_MAP[order]
  ) {
    return V2_SORT_ORDER_MAP[order];
  }'''

if old in s:
    s=s.replace(old,new)
    p.write_text(s)
    print("FIXED:", p)
else:
    print("TARGET BLOCK NOT FOUND")

PY
