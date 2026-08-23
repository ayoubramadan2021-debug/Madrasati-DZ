type AssessmentKind = "PT" | "MT";

type AssessmentPlaceholderNodeProps = {
  code: string;
  kind: AssessmentKind;
};

export default function AssessmentPlaceholderNode({
  code,
  kind,
}: AssessmentPlaceholderNodeProps) {
  const isMastery = kind === "MT";

  return (
    <div
      aria-label={code}
      style={{
        width: "100%",
        minHeight: 92,
        borderRadius: 22,
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        direction: "rtl",
        background: isMastery
          ? "linear-gradient(135deg,rgba(72,49,16,.92),rgba(35,30,24,.96))"
          : "linear-gradient(135deg,rgba(91,33,182,.96),rgba(124,58,237,.93) 48%,rgba(76,29,149,.98))",
        border: isMastery
          ? "2px solid rgba(245,158,11,.78)"
          : "2px solid rgba(196,181,253,.88)",
        boxShadow: isMastery
          ? "0 10px 26px rgba(245,158,11,.20), inset 0 1px 0 rgba(255,255,255,.12)"
          : "0 10px 28px rgba(124,58,237,.30), inset 0 1px 0 rgba(255,255,255,.18)",
        color: "#fff",
        fontFamily: "Tajawal,sans-serif",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: isMastery
            ? "rgba(251,191,36,.10)"
            : "rgba(255,255,255,.08)",
          top: -52,
          left: -28,
        }}
      />

      <div
        style={{
          width: 62,
          height: 62,
          borderRadius: 18,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          fontSize: 30,
          background: isMastery
            ? "linear-gradient(145deg,#fde68a,#f59e0b 55%,#b45309)"
            : "linear-gradient(145deg,#a78bfa,#6d28d9)",
          border: isMastery
            ? "2px solid rgba(253,230,138,.95)"
            : "1px solid rgba(255,255,255,.22)",
          boxShadow: isMastery
            ? "0 6px 20px rgba(245,158,11,.42), inset 0 1px 0 rgba(255,255,255,.35)"
            : "0 5px 16px rgba(30,10,80,.34)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {isMastery ? "🏆" : "🟣"}
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 0,
          position: "relative",
          zIndex: 1,
          fontSize: 20,
          fontWeight: 950,
          letterSpacing: ".5px",
          color: isMastery ? "#fde68a" : "#f5f3ff",
        }}
      >
        {code}
      </div>
    </div>
  );
}
