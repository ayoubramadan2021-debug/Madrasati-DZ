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

export type Lesson32SubtractionItem = {
  minuend: number;
  subtrahend: number;

  choices: number[];
  correct: number;

  question: string;
  question_audio_key: string;
};

type Props = {
  items: Lesson32SubtractionItem[];
  audio_base: string;

  title?: string;
  icon?: string;

  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

export default function Lesson32SubtractionEngineV2({
  items,
  audio_base,
  title = "أَحْسِبُ نَتِيجَةَ الطَّرْحِ",
  icon = "➖",
  onComplete,
}: Props) {
  const [index, setIndex] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [selected, setSelected] =
    useState<number | null>(null);

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

  function choose(option: number) {
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
        <div
          style={styles.operationCard}
          aria-label={
            `${item.minuend} ناقص ` +
            `${item.subtrahend}`
          }
        >
          <span style={styles.number}>
            {item.minuend}
          </span>

          <span style={styles.operator}>
            −
          </span>

          <span style={styles.number}>
            {item.subtrahend}
          </span>

          <span style={styles.equals}>
            =
          </span>

          <span style={styles.unknown}>
            ؟
          </span>
        </div>

        <div style={styles.options}>
          {item.choices.map(option => {
            const chosen =
              selected === option;

            const correctOption =
              feedback === "correct" &&
              option === item.correct;

            const wrongOption =
              feedback === "wrong" &&
              chosen;

            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  choose(option)
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
                {option}
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
    maxWidth: 780,
    margin: "0 auto",
    display: "grid",
    gap: 20,
  },

  operationCard: {
    width: "100%",
    minHeight: 170,
    padding: "18px 10px",
    boxSizing: "border-box",
    border: "4px solid #ead39a",
    borderRadius: 28,
    background:
      "linear-gradient(180deg,#ffffff,#fff9e9)",
    boxShadow:
      "0 12px 26px rgba(83,61,13,.13)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(8px,3vw,20px)",
    overflow: "hidden",
    direction: "ltr",
  },

  number: {
    minWidth: 45,
    fontSize: "clamp(44px,13vw,76px)",
    fontWeight: 1000,
    color: "#244f91",
    lineHeight: 1,
    textAlign: "center",
  },

  operator: {
    fontSize: "clamp(44px,12vw,72px)",
    fontWeight: 1000,
    color: "#e34d4d",
    lineHeight: 1,
  },

  equals: {
    fontSize: "clamp(38px,11vw,66px)",
    fontWeight: 1000,
    color: "#78601b",
    lineHeight: 1,
  },

  unknown: {
    width: "clamp(58px,17vw,88px)",
    height: "clamp(58px,17vw,88px)",
    flexShrink: 0,
    borderRadius: "50%",
    border: "4px solid #e9ad17",
    background: "#fff",
    color: "#9a6d00",
    fontSize: "clamp(35px,10vw,58px)",
    fontWeight: 1000,
    display: "grid",
    placeItems: "center",
    lineHeight: 1,
  },

  options: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 12,
  },

  optionButton: {
    width: "100%",
    minWidth: 0,
    minHeight: 100,
    border: "4px solid #e5cf92",
    borderRadius: 24,
    background: "#ffffff",
    color: "#473818",
    fontSize: "clamp(37px,11vw,60px)",
    fontWeight: 1000,
    cursor: "pointer",
    boxShadow:
      "0 9px 20px rgba(73,53,10,.11)",
    transition:
      "transform .18s ease, border-color .18s ease",
    overflow: "hidden",
  },

  selectedOption: {
    transform: "translateY(-4px)",
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
};
