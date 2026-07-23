#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
LESSON="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
BACKUP="backups/lesson36_tap_polish_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$BACKUP"
cp -p "$ENGINE" "$LESSON" "$BACKUP/"

python - <<'PY'
from pathlib import Path

engine = Path(
    "src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
)
text = engine.read_text(encoding="utf-8")

if "hideVisual?: boolean;" not in text:
    text = text.replace(
        "  description?: string;\n",
        "  description?: string;\n  hideVisual?: boolean;\n",
        1,
    )

old_visual = '''                    {choice.image ? (
                      <img
                        src={choice.image}
                        alt={choice.label}
                        style={{
                          ...styles.optionImage,
                          objectFit:
                            question.imageFit ||
                            "cover",
                        }}
                      />
                    ) : (
                      <div style={styles.emojiVisual}>
                        {choice.emoji || "⭐"}
                      </div>
                    )}'''

new_visual = '''                    {!choice.hideVisual && (
                      choice.image ? (
                        <img
                          src={choice.image}
                          alt={choice.label}
                          style={{
                            ...styles.optionImage,
                            objectFit:
                              question.imageFit ||
                              "cover",
                          }}
                        />
                      ) : (
                        <div style={styles.emojiVisual}>
                          {choice.emoji || "⭐"}
                        </div>
                      )
                    )}'''

if old_visual not in text:
    raise SystemExit("تعذر إيجاد عرض صورة بطاقة الإجابة")

text = text.replace(old_visual, new_visual, 1)

old_number = '''  tapNumber: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: 14,
    background: "rgba(12,41,74,.72)",
    color: "#fff",
    fontSize: 23,
    fontWeight: 950,
  },'''

new_number = '''  tapNumber: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 27,
    height: 27,
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    background: COLORS.navyDeep,
    color: "#fff",
    fontSize: 15,
    fontWeight: 950,
    boxShadow: "0 3px 7px rgba(0,0,0,.2)",
  },'''

if old_number not in text:
    raise SystemExit("تعذر إيجاد نمط رقم العد")

text = text.replace(old_number, new_number, 1)

text = text.replace(
'''                    opacity:
                      tappedVisualItems.includes(index)
                        ? 0.72
                        : 1,
                    transform:
                      tappedVisualItems.includes(index)
                        ? "scale(.93)"
                        : "scale(1)",''',
'''                    opacity: 1,
                    transform:
                      tappedVisualItems.includes(index)
                        ? "scale(.96)"
                        : "scale(1)",
                    outline:
                      tappedVisualItems.includes(index)
                        ? `3px solid ${COLORS.green}`
                        : "none",''',
1,
)

engine.write_text(text, encoding="utf-8")

lesson = Path(
    "src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
)
text = lesson.read_text(encoding="utf-8")

for number in ("11", "12", "13", "14", "15", "16"):
    arabic = str(number).translate(
        str.maketrans("0123456789", "٠١٢٣٤٥٦٧٨٩")
    )

    import re
    text = re.sub(
        rf'\{{ id: "{number}", label: "{arabic}"[^}}]*\}}',
        f'{{ id: "{number}", label: "{arabic}", hideVisual: true }}',
        text,
    )

lesson.write_text(text, encoding="utf-8")
PY

npm run build

echo
echo "✅ بقيت البالونات ظاهرة وأصبحت أرقام العد شارات صغيرة."
echo "✅ أصبحت بطاقات الإجابة أرقامًا فقط."
echo "النسخة الاحتياطية: $BACKUP"
