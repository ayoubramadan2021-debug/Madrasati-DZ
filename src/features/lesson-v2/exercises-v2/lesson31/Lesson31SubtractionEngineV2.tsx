import {
  useEffect,
  useRef,
  useState,
} from "react";

import type { CSSProperties } from "react";

import {
  Lesson31ExerciseFrame,
  lesson31Styles,
  playExerciseFeedback,
} from "./Lesson31ExerciseUI";

export type Lesson31SubtractionItem = {
  question: string;
  question_audio_key: string;

  minuend: number;
  subtrahend: number;
  options: number[];
  correct: number;

  emoji?: string;
};

type Props = {
  items: Lesson31SubtractionItem[];
  audio_base: string;
  title?: string;
  icon?: string;
  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

export default function Lesson31SubtractionEngineV2({
  items,
  audio_base,
  title = "أَحْسِبُ نَتِيجَةَ الطَّرْحِ",
  icon = "➖",
  onComplete,
}: Props) {
  const [index, setIndex] = useState(0);

  const [selected, setSelected] =
    useState<number | null>(null);

  const [feedback, setFeedback] =
    useState<"correct" | "wrong" | null>(
      null,
    );

  const scoreRef = useRef(0);
  const timerRef = useRef<number | null>(
    null,
  );

  const item = items[index];
  const emoji = item.emoji ?? "🔵";

  function choose(option: number) {
    if (feedback === "correct") {
      return;
    }

    setSelected(option);

    const correct =
      option === item.correct;

    if (!correct) {
      setFeedback("wrong");
      playExerciseFeedback(false);

    const lesson31WrongResetTimer =
      window.setTimeout(() => {
        setSelected(null);
        setFeedback(null);
      }, 1250);

    timerRef.current =
      lesson31WrongResetTimer;
      return;
    }

    setFeedback("correct");
    scoreRef.current += 1;
    playExerciseFeedback(true);

    timerRef.current = window.setTimeout(
      () => {
        if (index < items.length - 1) {
          setIndex((value) => value + 1);
          setSelected(null);
          setFeedback(null);
        } else {
          onComplete?.(
            scoreRef.current,
            items.length,
          );
        }
      },
      1250,
    );
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(
          timerRef.current,
        );
      }
    };
  }, []);

  return (
    <Lesson31ExerciseFrame
      title={title}
      icon={icon}
      index={index}
      total={items.length}
      question={item.question}
      audioBase={audio_base}
      audioKey={item.question_audio_key}
      feedback={feedback}
    >
      <section style={styles.visualArea}>
        <div style={styles.objects}>
          {Array.from(
            { length: item.minuend },
            (_, objectIndex) => {
              const removed =
                objectIndex >=
                item.minuend -
                  item.subtrahend;

              return (
                <span
                  key={objectIndex}
                  style={{
                    ...styles.object,
                    ...(removed
                      ? styles.removed
                      : null),
                  }}
                >
                  {emoji}
                </span>
              );
            },
          )}
        </div>

        <div style={styles.explanation}>
          العناصر المشطوبة هي التي نطرحها.
        </div>

        <div style={styles.equation}>
          {item.minuend} − {item.subtrahend} = ؟
        </div>
      </section>

      <section style={styles.options}>
        {item.options.map((option) => {
          const chosen =
            selected === option;

          const correctOption =
            feedback !== null &&
            option === item.correct;

          const wrongOption =
            chosen &&
            option !== item.correct;

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              style={{
                ...lesson31Styles.optionButton,
                ...(correctOption
                  ? lesson31Styles.correctOption
                  : null),
                ...(wrongOption
                  ? lesson31Styles.wrongOption
                  : null),
              }}
            >
              {option}
            </button>
          );
        })}
      </section>
    </Lesson31ExerciseFrame>
  );
}

const styles:
  Record<string, CSSProperties> = {
  visualArea: {
    padding: 16,
    border: "4px solid #e8ad18",
    borderRadius: 28,
    background: "#fff",
  },

  objects: {
    minHeight: 120,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    direction: "ltr",
  },

  object: {
    position: "relative",
    display: "inline-block",
    fontSize: "clamp(36px,9vw,55px)",
    lineHeight: 1.15,
  },

  removed: {
    opacity: 0.28,
    filter: "grayscale(1)",
    textDecoration:
      "line-through 6px #e34848",
  },

  explanation: {
    marginTop: 8,
    color: "#6a4a2d",
    textAlign: "center",
    fontSize: 17,
    fontWeight: 800,
  },

  equation: {
    marginTop: 13,
    padding: 11,
    borderRadius: 20,
    background: "#edf7ff",
    color: "#183d6b",
    direction: "ltr",
    textAlign: "center",
    fontSize: "clamp(38px,10vw,61px)",
    fontWeight: 900,
  },

  options: {
    marginTop: 12,
    display: "grid",
    gridTemplateColumns:
      "repeat(3,minmax(0,1fr))",
    gap: 10,
  },
};
