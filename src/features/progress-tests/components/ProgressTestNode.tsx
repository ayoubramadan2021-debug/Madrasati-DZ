type ProgressTestRecord = {
  bestScore?: number;
  passed?: boolean;
  attempts?: number;
} | null;

interface ProgressTestNodeProps {
  code: string;
  title: string;
  lockedLabel: string;
  unlocked: boolean;
  record: ProgressTestRecord;
  onOpen: () => void;
}

export default function ProgressTestNode({
  code,
  title,
  lockedLabel,
  unlocked,
  record,
  onOpen,
}: ProgressTestNodeProps) {
  const bestScore = Number(record?.bestScore ?? 0);
  const passed = Boolean(record?.passed || bestScore >= 70);
  const isMasteryTest = code.startsWith("MT");
  const stars = passed ? (bestScore >= 90 ? 3 : 2) : 0;

  const statusLabel = !unlocked
    ? lockedLabel
    : passed
      ? bestScore >= 90
        ? "إتقان ممتاز"
        : "جاهز للتقدم"
      : Number(record?.attempts ?? 0) > 0
        ? "أعد المحاولة لتحسين الإتقان"
        : "جاهز للاختبار";

  return (
    <button
      type="button"
      disabled={!unlocked}
      onClick={onOpen}
      aria-label={`${title} — ${statusLabel}`}
      style={{
        width: "100%",
        border: "2px solid rgba(196,181,253,.88)",
        borderRadius: 22,
        padding: "17px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        textAlign: "right",
        direction: "rtl",
        cursor: unlocked ? "pointer" : "not-allowed",
        background: "linear-gradient(135deg,rgba(91,33,182,.96),rgba(124,58,237,.93) 48%,rgba(76,29,149,.98))",
        boxShadow: "0 10px 28px rgba(124,58,237,.30), inset 0 1px 0 rgba(255,255,255,.18)",
        opacity: 1,
        color: "#fff",
        fontFamily: "Tajawal,sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255,255,255,.08)",
          top: -55,
          left: -30,
        }}
      />

      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: 18,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          fontSize: 29,
          background: isMasteryTest
            ? "linear-gradient(145deg,#fde68a,#f59e0b 55%,#b45309)"
            : "linear-gradient(145deg,#a78bfa,#6d28d9)",
          border: isMasteryTest
            ? "1px solid rgba(253,230,138,.88)"
            : "1px solid rgba(255,255,255,.22)",
          boxShadow: isMasteryTest
            ? "0 5px 18px rgba(245,158,11,.38)"
            : (unlocked ? "0 5px 16px rgba(30,10,80,.34)" : "none"),
        }}
      >
        {!unlocked ? "🔒" : (isMasteryTest ? "🏆" : "🟣")}
      </div>

      <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: ".3px",
            color: "#ddd6fe",
            marginBottom: 3,
          }}
        >
          محطة تقييم • {code}
        </div>

        <div
          style={{
            fontSize: 17,
            lineHeight: 1.35,
            fontWeight: 950,
            marginBottom: 5,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 12,
            lineHeight: 1.45,
            fontWeight: 700,
            color: "#ede9fe",
          }}
        >
          {statusLabel}
        </div>

        {passed && (
          <div
            style={{
              marginTop: 7,
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 17,
                letterSpacing: 2,
                color: "#fde68a",
                textShadow: "0 1px 5px rgba(0,0,0,.3)",
              }}
            >
              {"★".repeat(stars)}
            </span>

            <span
              style={{
                fontSize: 11,
                fontWeight: 900,
                padding: "4px 8px",
                borderRadius: 999,
                background: "rgba(255,255,255,.14)",
              }}
            >
              أفضل نتيجة {bestScore}%
            </span>
          </div>
        )}
      </div>

      <div
        aria-hidden="true"
        style={{
          flexShrink: 0,
          fontSize: 22,
          opacity: unlocked ? .95 : .6,
          position: "relative",
          zIndex: 1,
        }}
      >
        {unlocked ? "←" : ""}
      </div>
    </button>
  );
}
