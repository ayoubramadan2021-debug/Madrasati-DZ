import type { CSSProperties } from "react";

type Props = {
  words: string[];
  activeIndex?: number;
  activeWord?: string;
};

const COLORS = {
  white: "#ffffff",
  navy: "#17365f",
  gold: "#edb21f",
};

function cleanText(text: string) {
  return (text || "")
    .replace(/[،,.!?؟؛:]/g, "")
    .trim();
}

export default function UnifiedExerciseKaraokeV2({
  words,
  activeIndex = -1,
  activeWord = "",
}: Props) {
  const cleanActiveWord = cleanText(activeWord);

  return (
    <div style={styles.questionBox}>
      <div style={styles.questionText}>
        {words.map((word, index) => {
          const isActive =
            index === activeIndex ||
            (
              cleanActiveWord.length > 0 &&
              cleanText(word) === cleanActiveWord
            );

          return (
            <span
              key={`${word}-${index}`}
              style={
                isActive
                  ? styles.wordActive
                  : styles.word
              }
            >
              {word}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  questionBox: {
    width: "100%",
    maxWidth: 620,
    margin: "0 auto 10px",
    background: "rgba(255,255,255,.96)",
    border: `4px solid ${COLORS.gold}`,
    borderRadius: 22,
    padding: "12px 12px",
    textAlign: "center",
    boxShadow: "0 6px 14px rgba(0,0,0,.07)",
    boxSizing: "border-box",
  },

  questionText: {
    fontSize: "clamp(20px,5.4vw,32px)",
    lineHeight: 1.55,
    fontWeight: 1000,
    color: COLORS.navy,
  },

  word: {
    display: "inline-block",
    padding: "0 2px",
    borderRadius: 8,
    color: COLORS.navy,
    background: "transparent",
  },

  wordActive: {
    display: "inline-block",
    opacity: 1,
    transform: "translateY(-3px) scale(1.1)",
    color: COLORS.gold,
    fontWeight: 900,
    transition: "all .25s ease",
    margin: "0 2px",
    background: "transparent",
    borderBottom: "none",
    textDecoration: "none",
    boxShadow: "none",
    borderRadius: 0,
    padding: 0,
  },
};
