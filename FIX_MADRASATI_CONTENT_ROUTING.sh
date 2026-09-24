#!/data/data/com.termux/files/usr/bin/bash

python3 - <<'PY'
from pathlib import Path
import re

# -------------------------
# 1) WorldPage
# -------------------------
p = Path("src/pages/WorldPage.tsx")
s = p.read_text()

old = 'navigate(`/lesson-v2/lesson${l.sort_order}`);'
new = 'navigate(`/lesson-v2/lesson${l.sort_order}?world=madrasati`);'

if old in s:
    s = s.replace(old, new)
    print("WorldPage fixed")
else:
    print("WorldPage target not found")

p.write_text(s)


# -------------------------
# 2) LessonV2Page
# -------------------------
p = Path("src/pages/LessonV2Page.tsx")
s = p.read_text()

# إضافة map بعد imports إذا غير موجود
if "MADRASATI_MAP" not in s:
    marker = "export default function LessonV2Page()"

    inject = '''
const MADRASATI_MAP: Record<string, any> = {
  lesson12: ARABIC_LESSON12,
  lesson13: ARABIC_LESSON13,
  lesson14: ARABIC_LESSON14,
  lesson16: ARABIC_LESSON16,
  lesson18: ARABIC_LESSON18,
  lesson19: ARABIC_LESSON19,
  lesson20: ARABIC_LESSON20,
};

'''

    s = s.replace(marker, inject + marker)


old = '''const lesson =
                                                    ((normalizedLessonKey &&
                                                      LESSONS_MAP[normalizedLessonKey]) ||
                                                    LESSON_1_CONTENT);'''

new = '''const isMadrasati =
    new URLSearchParams(window.location.search).get("world") === "madrasati";

  const lesson =
    isMadrasati &&
    normalizedLessonKey &&
    MADRASATI_MAP[normalizedLessonKey]
      ? MADRASATI_MAP[normalizedLessonKey]
      : ((normalizedLessonKey &&
          LESSONS_MAP[normalizedLessonKey]) ||
        LESSON_1_CONTENT);'''

if old in s:
    s = s.replace(old, new)
    print("LessonV2Page fixed")
else:
    print("Lesson resolver target not found")

p.write_text(s)

print("DONE")
PY
