#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
LESSON="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
BACKUP="backups/lesson36_tap_count_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$BACKUP"
cp -p "$ENGINE" "$LESSON" "$BACKUP/"

python - <<'PY'
from pathlib import Path

engine = Path(
    "src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
)
text = engine.read_text(encoding="utf-8")

if "requireVisualTap?: boolean;" not in text:
    text = text.replace(
        "  visualCount?: number;\n",
        "  visualCount?: number;\n  requireVisualTap?: boolean;\n",
        1,
    )

state_marker = """  const [selectedChoiceId, setSelectedChoiceId] ="""
state_pos = text.find(state_marker)

if state_pos < 0:
    raise SystemExit("تعذر إيجاد selectedChoiceId")

line_end = text.find(";", state_pos) + 1

if "tappedVisualItems" not in text:
    text = (
        text[:line_end]
        + """
  const [tappedVisualItems, setTappedVisualItems] =
    useState<number[]>([]);
"""
        + text[line_end:]
    )

effect_marker = """  const totalQuestions ="""
if "setTappedVisualItems([]);" not in text:
    pos = text.find(effect_marker)
    if pos < 0:
        raise SystemExit("تعذر إيجاد totalQuestions")

    reset_effect = """
  useEffect(() => {
    setTappedVisualItems([]);
  }, [missionIndex, questionIndex]);

"""
    text = text[:pos] + reset_effect + text[pos:]

old_visual = """                <span key={`${question.key}-${index}`} style={styles.quantityItem}>
                  {question.visualEmoji}
                </span>"""

new_visual = """                <button
                  type="button"
                  key={`${question.key}-${index}`}
                  disabled={tappedVisualItems.includes(index)}
                  onClick={() => {
                    if (!question.requireVisualTap) return;
                    setTappedVisualItems((current) =>
                      current.includes(index)
                        ? current
                        : [...current, index],
                    );
                  }}
                  style={{
                    ...styles.quantityItem,
                    opacity:
                      tappedVisualItems.includes(index)
                        ? 0.72
                        : 1,
                    transform:
                      tappedVisualItems.includes(index)
                        ? "scale(.93)"
                        : "scale(1)",
                  }}
                >
                  {question.visualEmoji}
                  {tappedVisualItems.includes(index) && (
                    <strong style={styles.tapNumber}>
                      {tappedVisualItems.indexOf(index) + 1}
                    </strong>
                  )}
                </button>"""

if old_visual not in text:
    raise SystemExit("تعذر إيجاد عناصر الكمية")

text = text.replace(old_visual, new_visual, 1)

old_disabled = """                    disabled={locked}"""

new_disabled = """                    disabled={
                      locked ||
                      Boolean(
                        question.requireVisualTap &&
                        tappedVisualItems.length <
                          Number(question.visualCount || 0),
                      )
                    }"""

text = text.replace(old_disabled, new_disabled, 1)

if "tapNumber:" not in text:
    marker = """  questionBox: {
"""
    styles = """  tapNumber: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: 14,
    background: "rgba(12,41,74,.72)",
    color: "#fff",
    fontSize: 23,
    fontWeight: 950,
  },

"""
    text = text.replace(marker, styles + marker, 1)

text = text.replace(
    """  quantityItem: {
    minHeight: 50,""",
    """  quantityItem: {
    position: "relative",
    minHeight: 50,
    border: "0",""",
    1,
)

engine.write_text(text, encoding="utf-8")

lesson = Path(
    "src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
)
text = lesson.read_text(encoding="utf-8")

text = text.replace(
    "          visualCount: 12,\n",
    "          visualCount: 12,\n          requireVisualTap: true,\n",
    1,
)

text = text.replace(
    "          visualCount: 15,\n",
    "          visualCount: 15,\n          requireVisualTap: true,\n",
    1,
)

# إزالة البالون الافتراضي من بطاقات الأعداد.
text = text.replace(
    '            { id: "11", label: "١١", badge: "١١" },',
    '            { id: "11", label: "١١", emoji: "🔢" },',
)
text = text.replace(
    '            { id: "12", label: "١٢", badge: "١٢" },',
    '            { id: "12", label: "١٢", emoji: "🔢" },',
)
text = text.replace(
    '            { id: "13", label: "١٣", badge: "١٣" },',
    '            { id: "13", label: "١٣", emoji: "🔢" },',
)

lesson.write_text(text, encoding="utf-8")
PY

npm run build

echo
echo "✅ تم تفعيل العد باللمس ونجح البناء."
echo "النسخة الاحتياطية: $BACKUP"
