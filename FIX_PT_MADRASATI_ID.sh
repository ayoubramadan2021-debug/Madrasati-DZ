#!/data/data/com.termux/files/usr/bin/bash

python3 - <<'PY'
from pathlib import Path

p = Path("src/pages/WorldPage.tsx")
s = p.read_text()

s = s.replace(
'worldId === "SCHOOL-PT-DISABLED"',
'worldId === "SCHOOL-PT-DISABLED" || worldId === "83975f07-bdaf-4991-9f96-27d954519f06"'
)

p.write_text(s)

print("DONE")
PY
