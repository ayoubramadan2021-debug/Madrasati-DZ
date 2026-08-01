#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== تعديل Feedback Overlay مثل الدروس السابقة ====="

python - <<'PY'
from pathlib import Path

for p in [
    Path("src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx"),
    Path("src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx"),
]:
    txt = p.read_text(encoding="utf-8")

    txt = txt.replace(
'''        {feedback !== "idle" && (
          <div style={{
            ...styles.feedback,
            background: feedback === "correct" ? "#DDFBEA" : "#FFE1E1",
            color: feedback === "correct" ? "#16854F" : "#D62828",
            borderColor: feedback === "correct" ? "#20A567" : "#EF4444"
          }}>
            {feedback === "correct" ? "✅ أَحْسَنْتَ!" : "❌ حَاوِلْ مَرَّةً أُخْرَى"}
          </div>
        )}''',
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
        )}'''
    )

    txt = txt.replace(
'  feedback: { border: "4px solid", borderRadius: 22, padding: "10px", marginTop: 10, textAlign: "center", fontSize: 24, fontWeight: 900 },',
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
  },'''
    )

    p.write_text(txt, encoding="utf-8")
    print("✅", p)
PY

echo ""
echo "===== تحقق ====="
grep -n "feedbackOverlay\|feedbackCard\|أَحْسَنْتَ\|حَاوِل" \
src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx \
src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx

echo ""
echo "===== Build ====="
npm run build

echo ""
echo "===== Git status ====="
git status --short
