import type { CSSProperties } from "react";

type FeedbackState =
  | "idle"
  | "correct"
  | "wrong";

type Props = {
  left: number;
  operator: "+" | "-";
  result: number;

  selected?: number | null;
  feedback?: FeedbackState;
};

export default function UnifiedArithmeticDisplayV2({
  left,
  operator,
  result,
  selected = null,
  feedback = "idle",
}: Props) {
  const answerStyle: CSSProperties = {
    ...styles.answer,

    ...(feedback === "correct"
      ? styles.correct
      : feedback === "wrong"
        ? styles.wrong
        : {}),
  };

  return (
    <div
      style={styles.wrapper}
      dir="ltr"
      aria-label={`${left} ${operator} عدد مجهول يساوي ${result}`}
    >
      <style>{`
        @keyframes arithmeticBlankPulse {
          0%, 100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.06);
          }
        }
      `}</style>

      <span style={styles.number}>
        {left}
      </span>

      <span style={styles.operator}>
        {operator}
      </span>

      <span style={answerStyle}>
        {selected ?? "؟"}
      </span>

      <span style={styles.equals}>
        =
      </span>

      <span style={styles.result}>
        {result}
      </span>
    </div>
  );
}

const styles:
  Record<string, CSSProperties> = {
  wrapper: {
    width: "min(100%, 560px)",
    minHeight: 220,

    boxSizing: "border-box",
    padding: "24px 14px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    gap: "clamp(8px, 3vw, 18px)",

    color: "#17365F",

    fontFamily:
      '"Tajawal", Arial, sans-serif',

    fontSize:
      "clamp(2.5rem, 11vw, 5rem)",

    lineHeight: 1,
    fontWeight: 1000,
  },

  number: {
    color: "#1787AE",
  },

  operator: {
    color: "#1FA463",
  },

  equals: {
    color: "#17365F",
  },

  result: {
    color: "#D7960A",
  },

  answer: {
    minWidth: "clamp(66px, 18vw, 104px)",
    minHeight: "clamp(66px, 18vw, 104px)",

    boxSizing: "border-box",

    display: "grid",
    placeItems: "center",

    border: "5px dashed #E8A020",
    borderRadius: 22,

    background: "#FFF9E8",
    color: "#B56F00",

    boxShadow:
      "0 8px 18px rgba(232,160,32,.18)",

    animation:
      "arithmeticBlankPulse 1.7s ease-in-out infinite",

    transition:
      "color .2s ease, border-color .2s ease, background .2s ease",
  },

  correct: {
    borderStyle: "solid",
    borderColor: "#1FA463",
    background: "#E7F8EF",
    color: "#137A4C",
    animation: "none",
  },

  wrong: {
    borderStyle: "solid",
    borderColor: "#D45447",
    background: "#FFF0EE",
    color: "#B42335",
    animation: "none",
  },
};
