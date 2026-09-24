#!/data/data/com.termux/files/usr/bin/bash

echo "=== Fix WorldPage + LessonV2 ==="

python3 - <<'PY'
from pathlib import Path

WORLD = "83975f07-bdaf-4991-9f96-27d954519f06"

# WorldPage
p = Path("src/pages/WorldPage.tsx")
s = p.read_text()

if "isArabicMadrasatiWorld" not in s:
    s = s.replace(
        "const isSchoolWorld = currentWorldId === SCHOOL_WORLD_ID;",
        f'''const isSchoolWorld = currentWorldId === SCHOOL_WORLD_ID;
              const isArabicMadrasatiWorld =
                currentWorldId === "{WORLD}";'''
    )

s = s.replace(
    "ENABLE_PROGRESS_GATING &&",
    "!isArabicMadrasatiWorld && ENABLE_PROGRESS_GATING &&"
)

p.write_text(s)


# LessonV2Page imports
p = Path("src/pages/LessonV2Page.tsx")
s = p.read_text()

imports = """
import ARABIC_LESSON12 from "../features/lesson-v2/content/arabic/lesson12";
import ARABIC_LESSON13 from "../features/lesson-v2/content/arabic/lesson13";
import ARABIC_LESSON14 from "../features/lesson-v2/content/arabic/lesson14";
import ARABIC_LESSON16 from "../features/lesson-v2/content/arabic/lesson16";
import ARABIC_LESSON18 from "../features/lesson-v2/content/arabic/lesson18";
import ARABIC_LESSON19 from "../features/lesson-v2/content/arabic/lesson19";
import ARABIC_LESSON20 from "../features/lesson-v2/content/arabic/lesson20";
"""

if "ARABIC_LESSON12" not in s:
    s = imports + "\n" + s

p.write_text(s)

print("DONE")
PY
