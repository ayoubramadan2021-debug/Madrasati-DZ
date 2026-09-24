#!/data/data/com.termux/files/usr/bin/bash

python3 - <<'PY'
from pathlib import Path

p = Path("src/pages/WorldPage.tsx")
s = p.read_text()

old = '''const isSchoolWorld = currentWorldId === SCHOOL_WORLD_ID;'''

new = '''const isSchoolWorld = currentWorldId === SCHOOL_WORLD_ID;
              const isMadrasatiArabicWorld =
                currentWorldId === "83975f07-bdaf-4991-9f96-27d954519f06";'''

s = s.replace(old,new)

# منع إدخال بطاقات PT لعالم مدرستي
s = s.replace(
'''const worldTests = PROGRESSION_TESTS.filter''',
'''const worldTests = isMadrasatiArabicWorld ? [] : PROGRESSION_TESTS.filter'''
)

p.write_text(s)

print("DONE")
PY
