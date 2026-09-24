#!/data/data/com.termux/files/usr/bin/bash

python3 - <<'PY'
from pathlib import Path

p = Path("src/pages/WorldPage.tsx")
s = p.read_text()

old = '''const assessmentPlaceholder =
                getAssessmentPlaceholderPlan(lessons.length, currentWorldId).find(
                  (node) => node.afterLocalLesson === i + 1
                );'''

new = '''const assessmentPlaceholder =
                currentWorldId === "83975f07-bdaf-4991-9f96-27d954519f06"
                  ? null
                  : getAssessmentPlaceholderPlan(lessons.length, currentWorldId).find(
                      (node) => node.afterLocalLesson === i + 1
                    );'''

if old in s:
    s = s.replace(old,new)
    p.write_text(s)
    print("FIXED")
else:
    print("NOT FOUND")
PY
