#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
BACKUP="backups/lesson36_visible_feedback_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$BACKUP"
cp -p "$ENGINE" "$BACKUP/"

python - <<'PY'
from pathlib import Path

path = Path(
    "src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
)
text = path.read_text(encoding="utf-8")

feedback_marker = """          <UnifiedExerciseFeedbackV2"""

feedback_block = """          {config.minimalLayout && feedback !== "idle" && (
            <div
              role="status"
              aria-live="assertive"
              style={styles.clearFeedbackOverlay}
            >
              <div
                style={{
                  ...styles.clearFeedbackCard,
                  background:
                    feedback === "correct"
                      ? COLORS.green
                      : COLORS.red,
                }}
              >
                <div style={styles.clearFeedbackIcon}>
                  {feedback === "correct" ? "✓" : "×"}
                </div>

                <div style={styles.clearFeedbackText}>
                  {feedback === "correct"
                    ? "أَحْسَنْتَ!"
                    : "حَاوِلْ مَرَّةً أُخْرَى ✨"}
                </div>
              </div>
            </div>
          )}

"""

if "clearFeedbackOverlay" not in text:
    if feedback_marker not in text:
        raise SystemExit(
            "تعذر إيجاد UnifiedExerciseFeedbackV2 داخل المحرك"
        )

    text = text.replace(
        feedback_marker,
        feedback_block + feedback_marker,
        1,
    )

styles_marker = """  completePage: {"""

feedback_styles = """  clearFeedbackOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "grid",
    placeItems: "center",
    padding: 20,
    background: "rgba(12,41,74,.24)",
    pointerEvents: "none",
  },

  clearFeedbackCard: {
    minWidth: "min(330px,88vw)",
    padding: "24px 22px",
    display: "grid",
    placeItems: "center",
    gap: 10,
    border: "7px solid #fff",
    borderRadius: 34,
    color: "#fff",
    boxShadow: "0 22px 55px rgba(12,41,74,.34)",
    animation:
      "premiumClearFeedback .35s cubic-bezier(.34,1.56,.64,1)",
  },

  clearFeedbackIcon: {
    width: 88,
    height: 88,
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    background: "#fff",
    color: COLORS.navyDeep,
    fontSize: 62,
    fontWeight: 950,
    lineHeight: 1,
  },

  clearFeedbackText: {
    fontSize: "clamp(27px,7vw,40px)",
    fontWeight: 950,
    lineHeight: 1.5,
    textAlign: "center",
  },

"""

if "clearFeedbackCard:" not in text:
    if styles_marker not in text:
        raise SystemExit("تعذر إيجاد موضع أنماط شاشة النهاية")

    text = text.replace(
        styles_marker,
        feedback_styles + styles_marker,
        1,
    )

# إضافة حركة الظهور إلى كتلة style الموجودة في الصفحة.
animation_marker = """        @keyframes"""

if "premiumClearFeedback" not in text:
    first_style = text.find("<style>")
    if first_style >= 0:
        end_style = text.find("</style>", first_style)
        text = (
            text[:end_style]
            + """
          @keyframes premiumClearFeedback {
            from {
              opacity: 0;
              transform: scale(.72);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        """
            + text[end_style:]
        )

path.write_text(text, encoding="utf-8")
PY

grep -q "clearFeedbackOverlay" "$ENGINE"
grep -q "أَحْسَنْتَ!" "$ENGINE"
grep -q "حَاوِلْ مَرَّةً أُخْرَى" "$ENGINE"

npm run build

echo
echo "✅ أصبحت الإجابة الصحيحة والخاطئة ظاهرة بوضوح."
echo "النسخة الاحتياطية: $BACKUP"
