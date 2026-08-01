import { useEffect, type CSSProperties } from "react";
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

const SCHOOL_WORLD_ID =
  "b0a43712-8b45-428d-bea2-55ff3de52d3a";

interface LessonCompleteV2Props {
  message: string;
  onReplay: () => void;
  lessonKey?: string;
  stars?: number;
  nextLessonKey?: string;
  nextPath?: string;
  nextLabel?: string;
  quizPath?: string | null;
  returnPath?: string;
  returnLabel?: string;
}

export default function LessonCompleteV2({
  message,
  onReplay,
  lessonKey,
  stars = 3,
  nextLessonKey,
  nextPath,
  nextLabel = "الدرس التالي",
  quizPath = `/world/${SCHOOL_WORLD_ID}/quiz`,
  returnPath,
  returnLabel = "العودة إلى العالم",
}: LessonCompleteV2Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (lessonKey) {
      markLessonCompleted(lessonKey, stars);
    }
  }, [lessonKey, stars]);

  const resolvedNextPath =
    nextPath ??
    (nextLessonKey
      ? `/lesson-v2/${nextLessonKey}`
      : undefined);

  const buttonStyle = (
    background: string,
    shadow: string,
    fontSize = 18,
  ): CSSProperties => ({
    width: "100%",
    minHeight: 58,
    border: 0,
    borderRadius: 19,
    padding: "14px 18px",
    background,
    color: "#FFFFFF",
    fontFamily: "Tajawal, sans-serif",
    fontSize,
    fontWeight: 950,
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

        @keyframes trophyPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.08) rotate(4deg); }
        }

        @keyframes floatStar {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes shineMove {
          0% { transform: translateX(130%) rotate(18deg); opacity: 0; }
          35% { opacity: .55; }
          100% { transform: translateX(-150%) rotate(18deg); opacity: 0; }
        }
      `}</style>

      <section style={styles.card}>
        <div style={styles.shine} />

        <div style={styles.trophyWrap}>
          <div style={styles.glow} />
          <div style={styles.trophy}>🏆</div>
          <div style={styles.starLeft}>✨</div>
          <div style={styles.starRight}>🌟</div>
        </div>

        <h1 style={styles.title}>أَحْسَنْتَ يَا بَطَل!</h1>
        <p style={styles.message}>{message}</p>

        <div style={styles.actions}>
          {resolvedNextPath && (
            <button
              type="button"
              onClick={() => navigate(resolvedNextPath)}
              style={buttonStyle(
                C.green,
                "0 11px 22px rgba(31,164,99,.28)",
                19,
              )}
            >
              {nextLabel}
            </button>
          )}

          <button
            type="button"
            onClick={onReplay}
            style={buttonStyle(
              C.gold,
              "0 11px 22px rgba(232,160,32,.28)",
            )}
          >
            إعادة التمارين
          </button>

          {!resolvedNextPath && returnPath && (
            <button
              type="button"
              onClick={() => navigate(returnPath)}
              style={buttonStyle(
                C.navy,
                "0 11px 22px rgba(27,58,107,.25)",
                17,
              )}
            >
              {returnLabel}
            </button>
          )}

          {quizPath && (
            <button
              type="button"
              onClick={() => navigate(quizPath)}
              style={buttonStyle(
                C.purple,
                "0 11px 22px rgba(124,58,237,.27)",
                17,
              )}
            >
              اختبار العالم
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
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
    position: "relative",
    padding: "22px 18px 112px",
    background: C.cream,
    textAlign: "center",
    overflow: "hidden",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    animation:
      "completePop .55s cubic-bezier(.22,1,.36,1) both",
  },
  shine: {
    position: "absolute",
    top: -90,
    right: -20,
    width: 86,
    height: 430,
    background:
      "linear-gradient(90deg,transparent,rgba(255,255,255,.88),transparent)",
    animation: "shineMove 2.8s ease-in-out infinite",
    pointerEvents: "none",
  },
  trophyWrap: {
    position: "relative",
    width: 160,
    height: 145,
    marginBottom: 3,
    display: "grid",
    placeItems: "center",
  },
  glow: {
    position: "absolute",
    width: 132,
    height: 132,
    borderRadius: "50%",
    background:
      "radial-gradient(circle,rgba(232,160,32,.34),rgba(232,160,32,.08),transparent 70%)",
  },
  trophy: {
    position: "relative",
    zIndex: 2,
    fontSize: 88,
    lineHeight: 1,
    animation: "trophyPulse 1.8s ease-in-out infinite",
    filter:
      "drop-shadow(0 10px 13px rgba(232,160,32,.28))",
  },
  starLeft: {
    position: "absolute",
    left: 8,
    top: 25,
    fontSize: 27,
    animation: "floatStar 1.6s ease-in-out infinite",
  },
  starRight: {
    position: "absolute",
    right: 7,
    bottom: 18,
    fontSize: 29,
    animation: "floatStar 1.9s ease-in-out infinite",
  },
  title: {
    margin: "2px 0 8px",
    color: C.navyDeep,
    fontSize: "clamp(30px,8vw,42px)",
    lineHeight: 1.25,
    fontWeight: 950,
  },
  message: {
    maxWidth: 390,
    margin: "0 auto 14px",
    color: C.navy,
    fontSize: "clamp(17px,4.7vw,23px)",
    lineHeight: 1.7,
    fontWeight: 850,
  },
  actions: {
    width: "100%",
    maxWidth: 360,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 11,
    position: "relative",
    zIndex: 2,
  },
};
