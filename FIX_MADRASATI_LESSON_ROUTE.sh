#!/data/data/com.termux/files/usr/bin/bash

FILE="src/pages/WorldPage.tsx"

python3 - <<'PY'
from pathlib import Path

p = Path("src/pages/WorldPage.tsx")
s = p.read_text()

old = '''navigate(
                    k
                      ? `/lesson-v2/${k}`
                      : `/lesson/${l.id}`
                  );'''

new = '''const currentWorld = String(l.world_id ?? world?.id ?? worldId);

                  if (currentWorld === "83975f07-bdaf-4991-9f96-27d954519f06") {
                    navigate(`/lesson-v2/arabic/lesson${l.sort_order}`);
                    return;
                  }

                  navigate(
                    k
                      ? `/lesson-v2/${k}`
                      : `/lesson/${l.id}`
                  );'''

if old not in s:
    print("TARGET NOT FOUND")
else:
    s = s.replace(old, new)
    p.write_text(s)
    print("FIXED")

PY
