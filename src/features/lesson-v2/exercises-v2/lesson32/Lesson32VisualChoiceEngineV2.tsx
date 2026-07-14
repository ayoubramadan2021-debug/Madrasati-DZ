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

export type Lesson32VisualChoiceOption = {
  id: string;
  emoji: string;
  label: string;
  background?: string;
};

export type Lesson32VisualChoiceItem = {
  question: string;
  question_audio_key: string;

  options: Lesson32VisualChoiceOption[];
  correct: string;
};

type Props = {
  items: Lesson32VisualChoiceItem[];
  audio_base: string;

  title?: string;
  icon?: string;

  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

export default function Lesson32VisualChoiceEngineV2({
  items,
  audio_base,
  title = "أَخْتَارُ الصُّورَةَ المُنَاسِبَةَ",
  icon = "🍎",
  onComplete,
}: Props) {
  const [index, setIndex] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [selected, setSelected] =
    useState<string | null>(null);

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

  function choose(optionId: string) {
    if (feedback === "correct") {
      return;
    }

    clearTimer();
    setSelected(optionId);

    const isCorrect =
      optionId === item.correct;

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
        <div style={styles.options}>
          {item.options.map(option => {
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

                  background:
                    option.background ||
                    "#ffffff",

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
                <span
                  aria-hidden="true"
                  style={styles.emoji}
                >
                  {option.emoji}
                </span>

                <span style={styles.label}>
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
  },

  options: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: 14,
  },

  optionButton: {
    width: "100%",
    minWidth: 0,
    minHeight: 165,
    padding: "14px 8px",
    border: "4px solid #ead59b",
    borderRadius: 27,
    color: "#473818",
    cursor: "pointer",
    boxShadow:
      "0 10px 24px rgba(80,59,13,.12)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    overflow: "hidden",
    transition:
      "transform .18s ease, border-color .18s ease",
  },

  selectedOption: {
    transform: "translateY(-4px)",
    borderColor: "#e7a916",
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

  emoji: {
    maxWidth: "100%",
    fontSize: "clamp(50px,14vw,82px)",
    lineHeight: 1.1,
    whiteSpace: "nowrap",
  },

  label: {
    width: "100%",
    fontSize: "clamp(16px,4vw,23px)",
    fontWeight: 950,
    lineHeight: 1.4,
    textAlign: "center",
    overflowWrap: "anywhere",
  },
};
