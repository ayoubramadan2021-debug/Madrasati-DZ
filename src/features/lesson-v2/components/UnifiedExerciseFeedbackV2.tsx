import type { CSSProperties } from "react";

type FeedbackState =
  | "idle"
  | "correct"
  | "wrong";

type Props = {
  feedback: FeedbackState;
  successText?: string;
  retryText?: string;
};

export default function UnifiedExerciseFeedbackV2({
  feedback,
  successText = "🌟 أَحْسَنْتَ!",
  retryText = "حَاوِلْ مَرَّةً أُخْرَى ✨",
}: Props) {
  if (feedback === "idle") {
    return null;
  }

  const correct =
    feedback === "correct";

  const coachText = correct
    ? "رائع يا بطل! اخترت الإجابة الصحيحة 🎉"
    : "محاولة جميلة! جرّب مرة أخرى ✨";

  const feedbackText = correct
    ? successText
    : retryText;

  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      style={styles.feedbackLayer}
    >
      <style>{`
        @keyframes unifiedFeedbackPop {
          0% {
            transform: scale(.75);
            opacity: 0;
          }

          65% {
            transform: scale(1.08);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      <div style={styles.coachBanner}>
        {coachText}
      </div>

      {correct && (
        <div style={styles.celebration}>
          ✨ 🎉 ⭐
        </div>
      )}

      <div
        style={{
          ...styles.feedbackPill,
          background: correct
            ? "#20A567"
            : "#EF4444",
        }}
      >
        {feedbackText}
      </div>
    </div>
  );
}

const styles:
  Record<string, CSSProperties> = {
  feedbackLayer: {
    position: "fixed",
    inset: 0,
    zIndex: 2147483600,
    pointerEvents: "none",
    direction: "rtl",
    fontFamily:
      '"Tajawal", "Noto Kufi Arabic", Arial, sans-serif',
  },

  coachBanner: {
    position: "fixed",

    left: 18,
    right: 18,
    bottom: 98,

    zIndex: 999,

    padding: "12px 16px",

    border: "3px solid #20A567",
    borderRadius: 22,

    background:
      "rgba(255,255,255,.96)",

    color: "#17365f",

    textAlign: "center",
    fontSize: 18,
    fontWeight: 900,

    boxShadow:
      "0 10px 26px rgba(0,0,0,.18)",

    animation:
      "unifiedFeedbackPop .35s cubic-bezier(.34,1.56,.64,1)",
  },

  celebration: {
    position: "fixed",
    inset: 0,

    zIndex: 998,
    pointerEvents: "none",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontSize: 44,

    animation:
      "unifiedFeedbackPop .45s cubic-bezier(.34,1.56,.64,1)",
  },

  feedbackPill: {
    position: "fixed",

    top: "50%",
    left: "50%",

    zIndex: 1000,

    transform:
      "translate(-50%,-50%)",

    padding: "20px 34px",

    border:
      "6px solid rgba(255,255,255,.9)",
    borderRadius: 999,

    color: "#fff",

    fontSize: 28,
    fontWeight: 900,

    whiteSpace: "nowrap",

    boxShadow:
      "0 18px 38px rgba(0,0,0,.28)",

    animation:
      "unifiedFeedbackPop .35s cubic-bezier(.34,1.56,.64,1)",
  },
};
