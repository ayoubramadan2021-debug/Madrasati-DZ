type ProgressTestRecord = {
  bestScore?: number;
  passed?: boolean;
  attempts?: number;
} | null;

interface ProgressTestNodeProps {
  unlocked: boolean;
  record: ProgressTestRecord;
  onOpen: () => void;
}

export default function ProgressTestNode({
  unlocked,
  record,
  onOpen,
}: ProgressTestNodeProps) {
  const bestScore = Number(record?.bestScore ?? 0);
  const passed = Boolean(record?.passed || bestScore >= 70);
  const stars = passed ? (bestScore >= 90 ? 3 : 2) : 0;

  const statusLabel = !unlocked
    ? "أكمل الدرس 10 لفتح الاختبار"
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
      aria-label={`اختبار التقدم 1 — ${statusLabel}`}
      style={{
        width: "100%",
        border: unlocked
          ? "2px solid rgba(196,181,253,.88)"
          : "1px solid rgba(148,163,184,.28)",
        borderRadius: 22,
        padding: "17px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        textAlign: "right",
        direction: "rtl",
        cursor: unlocked ? "pointer" : "not-allowed",
        background: unlocked
          ? "linear-gradient(135deg,rgba(91,33,182,.96),rgba(124,58,237,.93) 48%,rgba(76,29,149,.98))"
          : "linear-gradient(135deg,rgba(51,65,85,.72),rgba(30,41,59,.82))",
        boxShadow: unlocked
          ? "0 10px 28px rgba(124,58,237,.30), inset 0 1px 0 rgba(255,255,255,.18)"
          : "0 6px 16px rgba(0,0,0,.18)",
        opacity: unlocked ? 1 : .82,
        color: "#fff",
        fontFamily: "Tajawal,sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {unlocked && (
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
      )}

      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: 18,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          fontSize: 29,
          background: unlocked
            ? "linear-gradient(145deg,#a78bfa,#6d28d9)"
            : "rgba(15,23,42,.55)",
          border: "1px solid rgba(255,255,255,.22)",
          boxShadow: unlocked ? "0 5px 16px rgba(30,10,80,.34)" : "none",
        }}
      >
        {!unlocked ? "🔒" : "🟣"}
      </div>

      <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: ".3px",
            color: unlocked ? "#ddd6fe" : "#cbd5e1",
            marginBottom: 3,
          }}
        >
          محطة تقييم • PT-01
        </div>

        <div
          style={{
            fontSize: 17,
            lineHeight: 1.35,
            fontWeight: 950,
            marginBottom: 5,
          }}
        >
          اختبار التقدم 1 — مغامرة الأعداد والحواس
        </div>

        <div
          style={{
            fontSize: 12,
            lineHeight: 1.45,
            fontWeight: 700,
            color: unlocked ? "#ede9fe" : "#f1f5f9",
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
