#!/data/data/com.termux/files/usr/bin/bash

python3 - <<'PY'
from pathlib import Path
import re

p = Path("src/pages/WorldPage.tsx")
s = p.read_text()

pattern = r'''navigate\(\s*k\s*\?\s*`/lesson-v2/\$\{k\}`\s*:\s*`/lesson/\$\{l\.id\}`\s*\);'''

replacement = '''const currentWorld = String(l.world_id ?? world?.id ?? worldId);

                  if (currentWorld === "83975f07-bdaf-4991-9f96-27d954519f06") {
                    navigate(`/lesson-v2/arabic/lesson${l.sort_order}`);
                    return;
                  }

                  navigate(
                    k
                      ? `/lesson-v2/${k}`
                      : `/lesson/${l.id}`
                  );'''

s2, n = re.subn(pattern, replacement, s)

if n:
    p.write_text(s2)
    print("FIXED:", n)
else:
    print("NOT FOUND")

PY
