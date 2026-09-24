#!/data/data/com.termux/files/usr/bin/bash

python3 - <<'PY'
from pathlib import Path

p = Path("src/pages/LessonV2Page.tsx")
s = p.read_text()

for i in range(12,21):
    old = f'navigate("/lesson{i}-exercises")'
    new = f'navigate("/lesson-v2/lesson{i}/exercises")'
    if old in s:
        s = s.replace(old,new)
        print("fixed", i)
    else:
        print("not found", i)

p.write_text(s)
PY
