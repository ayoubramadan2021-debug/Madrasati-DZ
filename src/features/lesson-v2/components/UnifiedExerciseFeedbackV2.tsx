type FeedbackState = "idle" | "correct" | "wrong";

type Props = {
  feedback: FeedbackState;
  successText?: string;
  retryText?: string;
};

export default function UnifiedExerciseFeedbackV2({
  feedback,
  successText = "أَحْسَنْتَ!",
  retryText = "حَاوِلْ مَرَّةً أُخْرَى.",
}: Props) {
  if (feedback === "idle") {
    return null;
  }

  const correct = feedback === "correct";

  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        pointerEvents: "none",
        background: correct
          ? "rgba(11, 83, 55, 0.14)"
          : "rgba(127, 29, 29, 0.13)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      <style>
        {`
          @keyframes unifiedFeedbackAppear {
            0% {
              opacity: 0;
              transform: scale(.66) translateY(18px);
            }

            65% {
              opacity: 1;
              transform: scale(1.08) translateY(0);
            }

            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          @keyframes unifiedFeedbackIcon {
            0% {
              transform: scale(.45) rotate(-18deg);
            }

            65% {
              transform: scale(1.18) rotate(5deg);
            }

            100% {
              transform: scale(1) rotate(0deg);
            }
          }
        `}
      </style>

      <div
        style={{
          width: "min(390px, 91vw)",
          minHeight: 218,
          borderRadius: 34,
          border: "5px solid #ffffff",
          background: "#ffffff",
          boxShadow:
            "0 22px 55px rgba(23, 54, 95, 0.28)",
          padding: "24px 20px 22px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          animation:
            "unifiedFeedbackAppear 360ms cubic-bezier(.2,.85,.3,1.25) both",
          direction: "rtl",
        }}
      >
        <div
          style={{
            width: 102,
            height: 102,
            borderRadius: "50%",
            border: "7px solid #ffffff",
            background: correct
              ? "linear-gradient(145deg, #36cc87, #169c61)"
              : "linear-gradient(145deg, #ff626f, #dc3344)",
            boxShadow: correct
              ? "0 13px 28px rgba(22, 156, 97, .34)"
              : "0 13px 28px rgba(220, 51, 68, .34)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: correct ? 62 : 68,
            lineHeight: 1,
            fontWeight: 1000,
            animation:
              "unifiedFeedbackIcon 420ms cubic-bezier(.2,.85,.3,1.3) both",
          }}
        >
          {correct ? "✓" : "×"}
        </div>

        <div
          style={{
            marginTop: 15,
            color: correct ? "#137a4c" : "#b42335",
            fontSize: 27,
            lineHeight: 1.5,
            fontWeight: 1000,
            fontFamily:
              '"Tajawal", "Noto Kufi Arabic", Arial, sans-serif',
          }}
        >
          {correct ? successText : retryText}
        </div>
      </div>
    </div>
  );
}
