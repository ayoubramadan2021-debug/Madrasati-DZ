#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
LESSON="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
BACKUP="backups/lesson36_visual_fix_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$BACKUP"
cp -p "$ENGINE" "$LESSON" "$BACKUP/"

python - <<'PY'
from pathlib import Path

engine = Path("src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx")
text = engine.read_text(encoding="utf-8")

if "visualCount?: number;" not in text:
    text = text.replace(
        "  explanation?: string;\n};",
        """  explanation?: string;
  visualEmoji?: string;
  visualCount?: number;
};""",
        1,
    )

old = """          <section style={styles.questionBox}>
            {question.prompt}
          </section>

          {question.helper && ("""

new = """          {question.visualEmoji && question.visualCount && (
            <section style={styles.quantityVisual}>
              {Array.from({ length: question.visualCount }).map((_, index) => (
                <span key={`${question.key}-${index}`} style={styles.quantityItem}>
                  {question.visualEmoji}
                </span>
              ))}
            </section>
          )}

          {question.helper && ("""

if old in text:
    text = text.replace(old, new, 1)

if "quantityVisual:" not in text:
    marker = "  questionBox: {\n"
    styles = """  quantityVisual: {
    width: "min(620px,100%)",
    margin: "8px auto 10px",
    padding: 13,
    display: "grid",
    gridTemplateColumns: "repeat(5,minmax(42px,1fr))",
    gap: 8,
    border: `4px solid ${COLORS.gold}`,
    borderRadius: 25,
    background: "rgba(255,255,255,.96)",
    boxShadow: "0 12px 26px rgba(18,58,102,.13)",
  },

  quantityItem: {
    minHeight: 50,
    display: "grid",
    placeItems: "center",
    borderRadius: 14,
    background: "linear-gradient(180deg,#effaff,#fff7da)",
    fontSize: "clamp(29px,8vw,43px)",
  },

"""
    if marker not in text:
        raise SystemExit("تعذر إيجاد questionBox في المحرك")
    text = text.replace(marker, styles + marker, 1)

engine.write_text(text, encoding="utf-8")

lesson = Path(
    "src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
)
text = lesson.read_text(encoding="utf-8")

if 'visualCount: 12' not in text:
    text = text.replace(
        '          helper: "أعد البالونات بهدوء.",',
        '''          helper: "أَلْمِسُ كُلَّ بَالُونٍ وَأَعُدُّهُ بِهُدُوءٍ.",
          visualEmoji: "🎈",
          visualCount: 12,''',
        1,
    )

if 'visualCount: 15' not in text:
    text = text.replace(
        '          helper: "أعد النجوم ثم اختر العدد.",',
        '''          helper: "أَلْمِسُ كُلَّ نَجْمَةٍ وَأَعُدُّهَا بِهُدُوءٍ.",
          visualEmoji: "⭐",
          visualCount: 15,''',
        1,
    )

lesson.write_text(text, encoding="utf-8")
PY

grep -q 'visualCount: 12' "$LESSON"
grep -q 'quantityVisual:' "$ENGINE"

npm run build

echo
echo "✅ تم تطبيق الإصلاح ونجح البناء."
echo "النسخة الاحتياطية: $BACKUP"
