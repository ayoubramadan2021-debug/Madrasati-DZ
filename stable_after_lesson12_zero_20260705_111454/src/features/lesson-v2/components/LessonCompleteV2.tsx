import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { markLessonCompleted } from "../progress/lessonProgress";

const C = {
  navy: "#1B3A6B",
  navyDeep: "#0F2447",
  gold: "#E8A020",
  green: "#1FA463",
  purple: "#7C3AED",
  cream: "#FFF8EC",
};

const WORLD_ID = "b0a43712-8b45-428d-bea2-55ff3de52d3a";

interface LessonCompleteV2Props {
  message: string;
  onReplay: () => void;
  lessonKey?: string;
  stars?: number;
  nextLessonKey?: string;
}

export default function LessonCompleteV2({
  message,
  onReplay,
  lessonKey,
  stars = 3,
  nextLessonKey,
}: LessonCompleteV2Props) {
  const navigate = useNavigate();
  void message;

  useEffect(() => {
    if (lessonKey) {
      markLessonCompleted(lessonKey, stars);
    }
  }, [lessonKey, stars]);

  const primaryBtn = (
    bg: string,
    shadow: string,
    fontSize = 18,
  ): React.CSSProperties => ({
    width: "100%",
    minHeight: 54,
    background: bg,
    color: "#fff",
    border: "none",
    borderRadius: 18,
    padding: "14px 18px",
    fontSize,
    fontWeight: 900,
    fontFamily: "Tajawal, sans-serif",
    cursor: "pointer",
    boxShadow: shadow,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  });

  return (
    <main dir="rtl" style={styles.page}>
      <style>{`
        @keyframes completePop {
          0% { opacity: 0; transform: translateY(18px) scale(.94); }
          70% { opacity: 1; transform: translateY(-3px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes starPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.08) rotate(4deg); }
        }

        @keyframes shineMove {
          0% { transform: translateX(120%) rotate(18deg); opacity: 0; }
          30% { opacity: .55; }
          100% { transform: translateX(-140%) rotate(18deg); opacity: 0; }
        }

        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      <section style={styles.card}>
        <div style={styles.shine} />
<div style={styles.trophyWrap}>
          <div style={styles.glowCircle} />
          <div style={styles.trophy}>🏆</div>
          <div style={styles.starLeft}>✨</div>
          <div style={styles.starRight}>🌟</div>
        </div>

        <h1 style={styles.title}>أحسنت يا بطل!</h1>

        <p style={styles.message}>أتممت التمارين</p>

        <div style={styles.actions}>
          {nextLessonKey && (
            <button
              onClick={() => navigate(`/lesson-v2/${nextLessonKey}`)}
              style={primaryBtn(
                C.green,
                "0 10px 20px rgba(31,164,99,.28)",
                19,
              )}
            >
              الدرس التالي
            </button>
          )}

          <button
            onClick={onReplay}
            style={primaryBtn(
              C.gold,
              "0 10px 20px rgba(232,160,32,.28)",
              18,
            )}
          >
              إعادة التمارين
            </button>

          <button
            onClick={() => navigate(`/world/${WORLD_ID}/quiz`)}
            style={primaryBtn(
              C.purple,
              "0 10px 20px rgba(124,58,237,.26)",
              17,
            )}
          >
              اختبار العالم
            </button>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    width: "100%",
    background: C.cream,
    fontFamily: "Tajawal, sans-serif",
    direction: "rtl",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    padding: 0,
    boxSizing: "border-box",
    overflow: "hidden",
  },

  card: {
    width: "100%",
    minHeight: "100dvh",
    maxWidth: "none",
    position: "relative",
    background: C.cream,
    border: "none",
    borderRadius: 0,
    padding: "22px 18px 110px",
    textAlign: "center",
    boxShadow: "none",
    overflow: "hidden",
    animation: "completePop .55s cubic-bezier(.22,1,.36,1) both",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  shine: {
    position: "absolute",
    top: -80,
    right: -20,
    width: 80,
    height: 420,
    background:
      "linear-gradient(90deg,transparent,rgba(255,255,255,.85),transparent)",
    animation: "shineMove 2.8s ease-in-out infinite",
    pointerEvents: "none",
  },

  badgesRow: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 10,
    position: "relative",
    zIndex: 2,
  },

  smallBadge: {
    background: "#FFF3C4",
    color: C.navyDeep,
    border: `2px solid ${C.gold}`,
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 13,
    fontWeight: 900,
    boxShadow: "0 4px 10px rgba(232,160,32,.16)",
  },

  trophyWrap: {
    position: "relative",
    width: 150,
    height: 130,
    margin: "0 auto 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  glowCircle: {
    position: "absolute",
    width: 118,
    height: 118,
    borderRadius: "50%",
    background:
      "radial-gradient(circle,rgba(232,160,32,.32),rgba(232,160,32,.08),transparent 70%)",
  },

  trophy: {
    position: "relative",
    zIndex: 2,
    fontSize: 86,
    lineHeight: 1,
    animation: "starPulse 1.8s ease-in-out infinite",
    filter: "drop-shadow(0 10px 12px rgba(232,160,32,.25))",
  },

  starLeft: {
    position: "absolute",
    left: 10,
    top: 20,
    fontSize: 26,
    animation: "floatBadge 1.6s ease-in-out infinite",
  },

  starRight: {
    position: "absolute",
    right: 8,
    bottom: 16,
    fontSize: 28,
    animation: "floatBadge 1.9s ease-in-out infinite",
  },

  title: {
    color: C.navyDeep,
    fontSize: 31,
    fontWeight: 900,
    margin: "2px 0 8px",
    lineHeight: 1.25,
  },

  message: {
    color: C.navy,
    fontSize: 17,
    fontWeight: 800,
    lineHeight: 1.75,
    margin: "0 auto",
    maxWidth: 340,
  },

  progressBox: {
    margin: "14px auto 16px",
    background: "#FFF3C4",
    borderRadius: 20,
    padding: "10px 12px",
    border: "2px solid rgba(232,160,32,.35)",
    maxWidth: 340,
  },

  progressText: {
    fontSize: 14,
    color: C.navyDeep,
    fontWeight: 900,
    marginBottom: 7,
  },

  progressTrack: {
    height: 12,
    background: "rgba(255,255,255,.9)",
    borderRadius: 999,
    overflow: "hidden",
    border: "1px solid rgba(232,160,32,.35)",
  },

  progressFill: {
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg,${C.green},${C.gold})`,
    borderRadius: 999,
  },

  actions: {
    width: "100%",
    maxWidth: 340,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    position: "relative",
    zIndex: 2,
  },

  homeBtn: {
    width: "100%",
    minHeight: 50,
    background: "#fff",
    color: C.navy,
    border: `3px solid ${C.navy}`,
    borderRadius: 18,
    padding: "12px 18px",
    fontSize: 16,
    fontWeight: 900,
    fontFamily: "Tajawal, sans-serif",
    cursor: "pointer",
    boxShadow: "0 7px 15px rgba(27,58,107,.12)",
  },
};
