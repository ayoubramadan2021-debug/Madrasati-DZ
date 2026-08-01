#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) إصلاح Feedback في تمرين ترتيب الأعداد ====="

python - <<'PY'
from pathlib import Path

p = Path("src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx")
txt = p.read_text(encoding="utf-8")

# نتأكد أن feedbackOverlay موجود في JSX بعد pathBox مباشرة، لأن بعض النسخ السابقة لم تُدرجه
if "styles.feedbackOverlay" not in txt:
    txt = txt.replace(
'''        <div style={styles.questionBox}>''',
'''        {feedback !== "idle" && (
          <div style={styles.feedbackOverlay}>
            <div
              style={{
                ...styles.feedbackCard,
                background: feedback === "correct" ? "#22A866" : "#EF4444",
              }}
            >
              <div style={styles.feedbackIcon}>
                {feedback === "correct" ? "🎉" : "🔁"}
              </div>
              <div style={styles.feedbackText}>
                {feedback === "correct" ? "أَحْسَنْتَ" : "حَاوِلْ مَرَّةً أُخْرَى"}
              </div>
            </div>
          </div>
        )}

        <div style={styles.questionBox}>''',
        1
    )

# نتأكد أن styles موجودة
if "feedbackOverlay:" not in txt:
    txt = txt.replace(
'''};''',
'''  feedbackOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    background: "rgba(255,248,236,.58)",
    backdropFilter: "blur(3px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  feedbackCard: {
    minWidth: 230,
    borderRadius: 28,
    padding: "20px 28px",
    color: "#fff",
    fontSize: 30,
    fontWeight: 900,
    textAlign: "center",
    boxShadow: "0 16px 35px rgba(0,0,0,.22)",
    border: "6px solid rgba(255,255,255,.85)",
    transform: "scale(1.02)",
  },
  feedbackIcon: {
    fontSize: 38,
    lineHeight: 1,
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 30,
    fontWeight: 900,
  },
};''',
        1
    )

p.write_text(txt, encoding="utf-8")
print("✅ NumberSortExerciseV2 feedback fixed")
PY

echo ""
echo "===== 2) ربط الدرس 19 بالدرس 20 ====="

python - <<'PY'
from pathlib import Path

p = Path("src/pages/Lesson19ExercisesPage.tsx")
txt = p.read_text(encoding="utf-8")

if 'nextLessonKey="lesson20"' not in txt:
    txt = txt.replace(
'''      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ كَيْفَ تُصَنِّفُ أَغْذِيَتَكَ إِلَى مَجْمُوعَاتٍ. 🎉"''',
'''      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ كَيْفَ تُصَنِّفُ أَغْذِيَتَكَ إِلَى مَجْمُوعَاتٍ. 🎉"
      nextLessonKey="lesson20"'''
    )

p.write_text(txt, encoding="utf-8")
print("✅ Lesson19ExercisesPage linked to lesson20")
PY

echo ""
echo "===== 3) تحقق ====="
grep -n "feedbackOverlay\|feedbackCard\|أَحْسَنْتَ\|حَاوِل" src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx
grep -n "LessonCompleteV2\|nextLessonKey\|lesson20" src/pages/Lesson19ExercisesPage.tsx

echo ""
echo "===== 4) Build ====="
npm run build

echo ""
echo "===== 5) Git status ====="
git status --short
