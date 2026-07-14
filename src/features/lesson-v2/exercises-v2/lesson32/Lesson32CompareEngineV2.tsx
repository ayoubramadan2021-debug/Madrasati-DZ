import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  CSSProperties,
} from "react";

import {
  Lesson32ExerciseFrame,
  playLesson32Feedback,
} from "./Lesson32ExerciseUI";

export type Lesson32CompareChoice =
  | "more"
  | "less"
  | "equal";

export type Lesson32CompareItem = {
  leftLabel: string;
  leftCount: number;
  leftColor: string;

  rightLabel: string;
  rightCount: number;
  rightColor: string;

  question: string;
  question_audio_key: string;
  correct: Lesson32CompareChoice;
};

type Props = {
  items: Lesson32CompareItem[];
  audio_base: string;
  title?: string;
  icon?: string;
  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

const OPTIONS: Array<{
  id: Lesson32CompareChoice;
  symbol: string;
  label: string;
}> = [
  {
    id: "more",
    symbol: ">",
    label: "أَكْثَرُ",
  },
  {
    id: "less",
    symbol: "<",
    label: "أَقَلُّ",
  },
  {
    id: "equal",
    symbol: "=",
    label: "يُسَاوِي",
  },
];

function DotGroup({
  count,
  color,
}: {
  count: number;
  color: string;
}) {
  return (
    <div
      style={styles.dots}
      aria-label={`${count}`}
    >
      {Array.from(
        { length: count },
        (_, dotIndex) => (
          <span
            key={dotIndex}
            style={{
              ...styles.dot,
              background: color,
              boxShadow:
                `0 4px 10px ${color}55`,
            }}
          />
        ),
      )}
    </div>
  );
}

export default function Lesson32CompareEngineV2({
  items,
  audio_base,
  title = "أُقَارِنُ بَيْنَ المَجْمُوعَاتِ",
  icon = "⚖️",
  onComplete,
}: Props) {
  const [index, setIndex] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [selected, setSelected] =
    useState<Lesson32CompareChoice | null>(
      null,
    );

  const [feedback, setFeedback] =
    useState<"correct" | "wrong" | null>(
      null,
    );

  const timerRef =
    useRef<number | null>(null);

  const item = items[index];

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(
          timerRef.current,
        );
      }
    };
  }, []);

  if (!item) {
    return null;
  }

  function clearTimer() {
    if (timerRef.current !== null) {
      window.clearTimeout(
        timerRef.current,
      );

      timerRef.current = null;
    }
  }

  function choose(
    option: Lesson32CompareChoice,
  ) {
    if (feedback === "correct") {
      return;
    }

    clearTimer();
    setSelected(option);

    const isCorrect =
      option === item.correct;

    if (!isCorrect) {
      setFeedback("wrong");
      playLesson32Feedback(false);

      timerRef.current =
        window.setTimeout(() => {
          setSelected(null);
          setFeedback(null);
        }, 1250);

      return;
    }

    const nextScore = score + 1;

    setScore(nextScore);
    setFeedback("correct");
    playLesson32Feedback(true);

    timerRef.current =
      window.setTimeout(() => {
        if (index < items.length - 1) {
          setIndex(
            current => current + 1,
          );

          setSelected(null);
          setFeedback(null);
          return;
        }

        onComplete?.(
          nextScore,
          items.length,
        );
      }, 1250);
  }

  return (
    <Lesson32ExerciseFrame
      title={title}
      icon={icon}
      index={index}
      total={items.length}
      question={item.question}
      audioBase={audio_base}
      audioKey={
        item.question_audio_key
      }
      feedback={feedback}
    >
      <section style={styles.activity}>
        <div style={styles.comparison}>
          <article style={styles.groupCard}>
            <strong style={styles.groupLabel}>
              {item.leftLabel}
            </strong>

            <DotGroup
              count={item.leftCount}
              color={item.leftColor}
            />

            <span
              style={{
                ...styles.number,
                color: item.leftColor,
              }}
            >
              {item.leftCount}
            </span>
          </article>

          <div style={styles.symbolBox}>
            ؟
          </div>

          <article style={styles.groupCard}>
            <strong style={styles.groupLabel}>
              {item.rightLabel}
            </strong>

            <DotGroup
              count={item.rightCount}
              color={item.rightColor}
            />

            <span
              style={{
                ...styles.number,
                color: item.rightColor,
              }}
            >
              {item.rightCount}
            </span>
          </article>
        </div>

        <div style={styles.options}>
          {OPTIONS.map(option => {
            const chosen =
              selected === option.id;

            const correctOption =
              feedback === "correct" &&
              option.id === item.correct;

            const wrongOption =
              feedback === "wrong" &&
              chosen;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  choose(option.id)
                }
                style={{
                  ...styles.optionButton,

                  ...(chosen
                    ? styles.selectedOption
                    : {}),

                  ...(correctOption
                    ? styles.correctOption
                    : {}),

                  ...(wrongOption
                    ? styles.wrongOption
                    : {}),
                }}
              >
                <span style={styles.optionSymbol}>
                  {option.symbol}
                </span>

                <span style={styles.optionLabel}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </Lesson32ExerciseFrame>
  );
}

const styles:
  Record<string, CSSProperties> = {
  activity: {
    width: "100%",
    maxWidth: 820,
    margin: "0 auto",
    display: "grid",
    gap: 18,
  },

  comparison: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) auto minmax(0, 1fr)",
    alignItems: "stretch",
    gap: 12,
  },

  groupCard: {
    minWidth: 0,
    minHeight: 205,
    padding: "15px 10px",
    border: "3px solid #ead8a4",
    borderRadius: 25,
    background:
      "linear-gradient(180deg,#ffffff 0%,#fffaf0 100%)",
    boxShadow:
      "0 10px 24px rgba(85,65,20,.10)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    overflow: "hidden",
  },

  groupLabel: {
    width: "100%",
    minHeight: 38,
    textAlign: "center",
    fontSize: "clamp(15px,3.5vw,22px)",
    fontWeight: 900,
    color: "#473818",
    lineHeight: 1.35,
    overflowWrap: "anywhere",
  },

  dots: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(14px, 27px))",
    justifyContent: "center",
    alignContent: "center",
    gap: 8,
    minHeight: 75,
  },

  dot: {
    width: "100%",
    aspectRatio: "1",
    borderRadius: "50%",
    border:
      "3px solid rgba(255,255,255,.9)",
  },

  number: {
    fontSize: "clamp(32px,8vw,50px)",
    fontWeight: 1000,
    lineHeight: 1,
  },

  symbolBox: {
    alignSelf: "center",
    width: 55,
    height: 55,
    flexShrink: 0,
    borderRadius: "50%",
    border: "4px solid #f0b82f",
    background: "#fff",
    color: "#7a5a08",
    fontSize: 34,
    fontWeight: 1000,
    display: "grid",
    placeItems: "center",
    boxShadow:
      "0 7px 18px rgba(178,124,0,.18)",
  },

  options: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 10,
  },

  optionButton: {
    width: "100%",
    minWidth: 0,
    minHeight: 92,
    padding: "8px 5px",
    border: "3px solid #e7d29a",
    borderRadius: 22,
    background: "#fff",
    color: "#493713",
    cursor: "pointer",
    boxShadow:
      "0 8px 18px rgba(74,54,10,.10)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    transition:
      "transform .18s ease, border-color .18s ease",
    overflow: "hidden",
  },

  selectedOption: {
    transform: "translateY(-3px)",
    borderColor: "#e9ad17",
  },

  correctOption: {
    borderColor: "#20A567",
    background: "#eafff4",
    color: "#13764a",
  },

  wrongOption: {
    borderColor: "#EF4444",
    background: "#fff0f0",
    color: "#c42b2b",
  },

  optionSymbol: {
    fontSize: "clamp(28px,8vw,44px)",
    fontWeight: 1000,
    lineHeight: 1,
  },

  optionLabel: {
    maxWidth: "100%",
    fontSize: "clamp(13px,3.4vw,20px)",
    fontWeight: 950,
    whiteSpace: "nowrap",
  },
};
