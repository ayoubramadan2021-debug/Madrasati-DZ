#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
LESSON="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
BACKUP="backups/lesson36_tap_polish_v2_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$BACKUP"
cp -p "$ENGINE" "$LESSON" "$BACKUP/"

python - <<'PY'
from pathlib import Path
import re

engine = Path(
    "src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
)
text = engine.read_text(encoding="utf-8")

# إضافة خيار إخفاء الرسم داخل بطاقة الإجابة.
if "hideVisual?: boolean;" not in text:
    text = text.replace(
        "  description?: string;",
        "  description?: string;\n  hideVisual?: boolean;",
        1,
    )

# تغليف كتلة الصورة/الإيموجي بشرط hideVisual.
if "!choice.hideVisual &&" not in text:
    pattern = re.compile(
        r'''(\s*)\{choice\.image\s*\?\s*\(
(?P<body>.*?)
\1\)\}''',
        re.DOTALL,
    )

    match = pattern.search(text)

    if not match:
        start = text.find("{choice.image")
        if start >= 0:
            print("المقطع الموجود قرب choice.image:")
            print(text[start:start + 900])
        raise SystemExit("تعذر تحديد كتلة صورة بطاقة الإجابة")

    indent = match.group(1)
    original = match.group(0)

    replacement = (
        f"{indent}{{!choice.hideVisual && (\n"
        f"{original}\n"
        f"{indent})}}"
    )

    text = text[:match.start()] + replacement + text[match.end():]

# تحويل رقم العد من غطاء كامل إلى شارة صغيرة.
text = re.sub(
    r'''  tapNumber:\s*\{
.*?
  \},''',
    '''  tapNumber: {
    position: "absolute",
    top: 3,
    right: 3,
    zIndex: 3,
    width: 27,
    height: 27,
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    background: COLORS.navyDeep,
    color: "#fff",
    fontSize: 15,
    fontWeight: 950,
    boxShadow: "0 3px 7px rgba(0,0,0,.22)",
  },''',
    text,
    count=1,
    flags=re.DOTALL,
)

# إبقاء العنصر ظاهرًا بعد لمسه.
text = re.sub(
    r'''opacity:\s*
\s*tappedVisualItems\.includes\(index\)
\s*\?\s*0\.72
\s*:\s*1,''',
    '''opacity: 1,''',
    text,
    count=1,
)

engine.write_text(text, encoding="utf-8")

lesson = Path(
    "src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
)
text = lesson.read_text(encoding="utf-8")

# جعل خيارات مهمة العد أرقامًا فقط.
for number, arabic in (
    ("11", "١١"),
    ("12", "١٢"),
    ("13", "١٣"),
    ("14", "١٤"),
    ("15", "١٥"),
    ("16", "١٦"),
):
    pattern = re.compile(
        rf'\{{\s*id:\s*"{number}",\s*label:\s*"{arabic}"[^}}]*\}}'
    )

    text, count = pattern.subn(
        f'{{ id: "{number}", label: "{arabic}", hideVisual: true }}',
        text,
        count=1,
    )

lesson.write_text(text, encoding="utf-8")
PY

grep -q 'hideVisual?: boolean' "$ENGINE"
grep -q '!choice.hideVisual' "$ENGINE"
grep -q 'hideVisual: true' "$LESSON"

npm run build

echo
echo "✅ تم تصغير شارات العد وإبقاء العناصر ظاهرة."
echo "✅ أصبحت خيارات مهمة العد أرقامًا فقط."
echo "النسخة الاحتياطية: $BACKUP"
