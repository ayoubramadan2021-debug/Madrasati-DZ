#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
LESSON="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
BACKUP="backups/lesson36_count_visual_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$BACKUP"
cp -p "$ENGINE" "$LESSON" "$BACKUP/"

python - <<'PY'
from pathlib import Path

engine = Path(
    "src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
)
text = engine.read_text(encoding="utf-8")

old_type = '''  explanation?: string;
};'''

new_type = '''  explanation?: string;
  visualEmoji?: string;
  visualCount?: number;
  showPromptBox?: boolean;
};'''

if old_type not in text:
    raise SystemExit("تعذر إيجاد نهاية PremiumQuestion")

text = text.replace(old_type, new_type, 1)

old_render = '''          <section style={styles.questionBox}>
            {question.prompt}
          </section>

          {question.helper && ('''

new_render = '''          {question.visualEmoji &&
            Number(question.visualCount) > 0 && (
              <section
                aria-label={question.prompt}
                style={styles.quantityVisual}
              >
                {Array.from({
                  length: Number(question.visualCount),
                }).map((_, index) => (
                  <button
                    type="button"
                    key={`${question.key}-visual-${index}`}
                    aria-label={`العنصر ${index + 1}`}
                    style={styles.quantityItem}
                  >
                    {question.visualEmoji}
                  </button>
                ))}
              </section>
            )}

          {question.showPromptBox && (
            <section style={styles.questionBox}>
              {question.prompt}
            </section>
          )}

          {question.helper && ('''

if old_render not in text:
    raise SystemExit("تعذر إيجاد صندوق السؤال داخل المحرك")

text = text.replace(old_render, new_render, 1)

style_marker = '''  questionBox: {
    margin: "8px 0",'''

new_styles = '''  quantityVisual: {
    width: "min(620px,100%)",
    margin: "8px auto 10px",
    padding: 14,
    display: "grid",
    gridTemplateColumns:
      "repeat(5,minmax(44px,1fr))",
    gap: 9,
    border: `4px solid ${COLORS.gold}`,
    borderRadius: 26,
    background: "rgba(255,255,255,.96)",
    boxShadow:
      "0 12px 28px rgba(18,58,102,.13)",
  },

  quantityItem: {
    minWidth: 0,
    minHeight: 54,
    padding: 3,
    border: "0",
    borderRadius: 15,
    background:
      "linear-gradient(180deg,#effaff,#fff7da)",
    fontSize: "clamp(30px,8vw,45px)",
    lineHeight: 1,
    cursor: "default",
  },

  questionBox: {
    margin: "8px 0",'''

if style_marker not in text:
    raise SystemExit("تعذر إيجاد أنماط questionBox")

text = text.replace(style_marker, new_styles, 1)
engine.write_text(text, encoding="utf-8")


lesson = Path(
    "src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
)
text = lesson.read_text(encoding="utf-8")

text = text.replace(
'''          helper: "أعد البالونات بهدوء.",
          audioUrl: audio("m1_q1_count_12"),''',
'''          helper: "أَلْمِسُ كُلَّ بَالُونٍ وَأَعُدُّهُ بِهُدُوءٍ.",
          visualEmoji: "🎈",
          visualCount: 12,
          audioUrl: audio("m1_q1_count_12"),''',
1,
)

text = text.replace(
'''          choices: [
            { id: "11", label: "١١", emoji: "🎈", badge: "١١" },
            { id: "12", label: "١٢", emoji: "🎈", badge: "١٢" },
            { id: "13", label: "١٣", emoji: "🎈", badge: "١٣" },
          ],''',
'''          choices: [
            { id: "11", label: "١١", badge: "١١" },
            { id: "12", label: "١٢", badge: "١٢" },
            { id: "13", label: "١٣", badge: "١٣" },
          ],''',
1,
)

text = text.replace(
'''          helper: "أعد النجوم ثم اختر العدد.",
          audioUrl: audio("m1_q2_count_15"),''',
'''          helper: "أَلْمِسُ كُلَّ نَجْمَةٍ وَأَعُدُّهَا بِهُدُوءٍ.",
          visualEmoji: "⭐",
          visualCount: 15,
          audioUrl: audio("m1_q2_count_15"),''',
1,
)

text = text.replace(
'''          choices: [
            { id: "14", label: "١٤", emoji: "⭐", badge: "١٤" },
            { id: "15", label: "١٥", emoji: "⭐", badge: "١٥" },
            { id: "16", label: "١٦", emoji: "⭐", badge: "١٦" },
          ],''',
'''          choices: [
            { id: "14", label: "١٤", badge: "١٤" },
            { id: "15", label: "١٥", badge: "١٥" },
            { id: "16", label: "١٦", badge: "١٦" },
          ],''',
1,
)

lesson.write_text(text, encoding="utf-8")
PY

npm run build

echo
echo "✅ تم إصلاح عرض مهمة العد."
echo "النسخة الاحتياطية: $BACKUP"
echo
git status --short -- "$ENGINE" "$LESSON"
