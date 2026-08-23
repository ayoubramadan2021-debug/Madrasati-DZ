import {
  useEffect,
  type CSSProperties,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  markLessonCompleted,
} from "../progress/lessonProgress";

const C = {
  navy: "#17365F",
  navyDeep: "#102E55",
  gold: "#E8A020",
  goldLight: "#F6B927",
  green: "#20AA66",
  greenLight: "#20C16A",
  purple: "#7C3AED",
  purpleLight: "#9146E8",
  cream: "#FFF9ED",
  white: "#FFFFFF",
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
  nextLabel,
  returnPath,
  returnLabel = "العودة إلى العالم",
}: LessonCompleteV2Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (lessonKey) {
      markLessonCompleted(
        lessonKey,
        stars,
      );
    }
  }, [lessonKey, stars]);

  const resolvedNextPath =
    nextPath ??
    (
      nextLessonKey
        ? `/lesson-v2/${nextLessonKey}`
        : undefined
    );

  const resolvedNextLabel =
    nextLabel ??
    (
      resolvedNextPath?.startsWith("/world/")
        ? "العودة إلى العالم"
        : "الدرس التالي"
    );

  const buttonStyle = (
    background: string,
    shadow: string,
  ): CSSProperties => ({
    width: "100%",
    minHeight: 62,
    border: 0,
    borderRadius: 22,
    padding: "14px 18px",
    background,
    color: C.white,
    fontFamily:
      '"Tajawal", "Noto Kufi Arabic", Arial, sans-serif',
    fontSize: "clamp(18px,5vw,25px)",
    lineHeight: 1.35,
    fontWeight: 950,
    cursor: "pointer",
    boxShadow: shadow,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    WebkitTapHighlightColor:
      "transparent",
  });

  return (
    <main
      dir="rtl"
      style={styles.page}
    >
      <style>{`
        @keyframes completeCardPop {
          0% {
            opacity: 0;
            transform:
              translateY(22px)
              scale(.95);
          }

          70% {
            opacity: 1;
            transform:
              translateY(-3px)
              scale(1.012);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes trophyFloat {
          0%, 100% {
            transform:
              translateY(0)
              rotate(0deg);
          }

          50% {
            transform:
              translateY(-7px)
              rotate(2deg);
          }
        }

        @keyframes starFloat {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        @media (max-width: 520px) {
          .lesson-complete-card {
            width:
              calc(100% - 34px) !important;
            padding:
              32px 20px 27px !important;
            border-radius:
              29px !important;
          }

          .lesson-complete-actions {
            gap: 12px !important;
          }
        }

        @media (max-height: 720px) {
          .lesson-complete-card {
            padding:
              21px 18px 20px !important;
          }

          .lesson-complete-trophy {
            font-size:
              68px !important;
          }
        }
      `}</style>

      <section
        className="lesson-complete-card"
        style={styles.card}
      >
        <div style={styles.trophyWrap}>
          <div style={styles.trophyGlow} />

          <div
            className="lesson-complete-trophy"
            style={styles.trophy}
          >
            🏆
          </div>

          <div style={styles.starLeft}>
            ✨
          </div>

          <div style={styles.starRight}>
            🌟
          </div>
        </div>

        <h1 style={styles.title}>
          أَحْسَنْتَ يَا بَطَل!
        </h1>

        <p style={styles.message}>
          {message}
        </p>

        <div
          className="lesson-complete-actions"
          style={styles.actions}
        >
          {resolvedNextPath && (
            <button
              type="button"
              onClick={() =>
                navigate(resolvedNextPath)
              }
              style={buttonStyle(
                `linear-gradient(135deg,${C.green},${C.greenLight})`,
                "0 12px 25px rgba(32,170,102,.27)",
              )}
            >
              {resolvedNextLabel}
            </button>
          )}

          <button
            type="button"
            onClick={onReplay}
            style={buttonStyle(
              `linear-gradient(135deg,${C.gold},${C.goldLight})`,
              "0 12px 25px rgba(232,160,32,.27)",
            )}
          >
            إِعَادَةُ التَّمَارِينِ
          </button>

          {!resolvedNextPath &&
            returnPath && (
              <button
                type="button"
                onClick={() =>
                  navigate(returnPath)
                }
                style={buttonStyle(
                  `linear-gradient(135deg,${C.navy},${C.navyDeep})`,
                  "0 12px 25px rgba(23,54,95,.25)",
                )}
              >
                {returnLabel}
              </button>
            )}


        </div>
      </section>
    </main>
  );
}

const styles:
  Record<string, CSSProperties> = {
  page: {
    minHeight: "100dvh",
    width: "100%",
    padding:
      "24px 0 112px",
    boxSizing: "border-box",
    background:
      "linear-gradient(180deg,#FFF9ED 0%,#FFFDF7 72%,#EEF8FF 100%)",
    fontFamily:
      '"Tajawal", "Noto Kufi Arabic", Arial, sans-serif',
    direction: "rtl",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowX: "hidden",
  },

  card: {
    width:
      "min(620px,calc(100% - 44px))",
    padding:
      "38px 34px 31px",
    border: "none",
    borderRadius: 38,
    background:
      "rgba(255,255,255,.96)",
    boxSizing: "border-box",
    textAlign: "center",
    boxShadow:
      "0 18px 40px rgba(23,54,95,.10)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation:
      "completeCardPop .5s cubic-bezier(.22,1,.36,1) both",
  },

  trophyWrap: {
    width: 158,
    height: 145,
    position: "relative",
    display: "grid",
    placeItems: "center",
    marginBottom: 2,
  },

  trophyGlow: {
    position: "absolute",
    width: 132,
    height: 132,
    borderRadius: "50%",
    background:
      "radial-gradient(circle,rgba(246,185,39,.35),rgba(246,185,39,.09),transparent 72%)",
  },

  trophy: {
    position: "relative",
    zIndex: 2,
    fontSize: 88,
    lineHeight: 1,
    animation:
      "trophyFloat 1.9s ease-in-out infinite",
    filter:
      "drop-shadow(0 10px 12px rgba(232,160,32,.25))",
  },

  starLeft: {
    position: "absolute",
    left: 9,
    top: 27,
    zIndex: 3,
    fontSize: 27,
    animation:
      "starFloat 1.5s ease-in-out infinite",
  },

  starRight: {
    position: "absolute",
    right: 8,
    bottom: 20,
    zIndex: 3,
    fontSize: 29,
    animation:
      "starFloat 1.8s ease-in-out infinite",
  },

  title: {
    margin:
      "3px 0 13px",
    color: C.navyDeep,
    fontSize:
      "clamp(30px,7.5vw,43px)",
    lineHeight: 1.3,
    fontWeight: 950,
  },

  message: {
    width: "100%",
    maxWidth: 480,
    margin:
      "0 auto 23px",
    color: C.navy,
    fontSize:
      "clamp(17px,4.7vw,23px)",
    lineHeight: 1.75,
    fontWeight: 850,
  },

  actions: {
    width: "100%",
    maxWidth: 510,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
};
