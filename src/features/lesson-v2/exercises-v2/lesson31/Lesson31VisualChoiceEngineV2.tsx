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

export type Lesson31VisualChoice = {
  title: string;
  items: string[];
  borderColor?: string;
  background?: string;
};

export type Lesson31VisualChoiceItem = {
  question: string;
  question_audio_key: string;

  sceneEmoji?: string;
  sceneText?: string;

  left: Lesson31VisualChoice;
  right: Lesson31VisualChoice;

  correct: "left" | "right";
};

type Props = {
  items: Lesson31VisualChoiceItem[];
  audio_base: string;
  title?: string;
  icon?: string;
  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

export default function Lesson31VisualChoiceEngineV2({
  items,
  audio_base,
  title = "أَخْتَارُ الصُّورَةَ الصَّحِيحَةَ",
  icon = "🖼️",
  onComplete,
}: Props) {
  const [index, setIndex] = useState(0);

  const [selected, setSelected] =
    useState<"left" | "right" | null>(
      null,
    );

  const [feedback, setFeedback] =
    useState<"correct" | "wrong" | null>(
      null,
    );

  const scoreRef = useRef(0);
  const timerRef = useRef<number | null>(
    null,
  );

  const item = items[index];

  function choose(
    option: "left" | "right",
  ) {
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

  const choices = [
    {
      key: "left" as const,
      value: item.left,
    },
    {
      key: "right" as const,
      value: item.right,
    },
  ];

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
      {item.sceneText && (
        <section style={styles.scene}>
          {item.sceneEmoji && (
            <div style={styles.sceneEmoji}>
              {item.sceneEmoji}
            </div>
          )}

          <div style={styles.sceneText}>
            {item.sceneText}
          </div>
        </section>
      )}

      <section style={styles.choices}>
        {choices.map((choice) => {
          const chosen =
            selected === choice.key;

          const correctChoice =
            feedback !== null &&
            choice.key === item.correct;

          const wrongChoice =
            chosen &&
            choice.key !== item.correct;

          return (
            <button
              key={choice.key}
              type="button"
              onClick={() =>
                choose(choice.key)
              }
              style={{
                ...styles.choice,
                borderColor:
                  choice.value.borderColor ??
                  "#e8ad18",
                background:
                  choice.value.background ??
                  "#fff",
                ...(correctChoice
                  ? lesson31Styles.correctOption
                  : null),
                ...(wrongChoice
                  ? lesson31Styles.wrongOption
                  : null),
              }}
            >
              <div style={styles.choiceItems}>
                {choice.value.items.map(
                  (visual, visualIndex) => (
                    <span
                      key={visualIndex}
                      style={styles.visual}
                    >
                      {visual}
                    </span>
                  ),
                )}
              </div>

              <div style={styles.choiceTitle}>
                {choice.value.title}
              </div>
            </button>
          );
        })}
      </section>
    </Lesson31ExerciseFrame>
  );
}

const styles:
  Record<string, CSSProperties> = {
  scene: {
    minHeight: 135,
    marginBottom: 12,
    padding: 14,
    border: "4px solid #e8ad18",
    borderRadius: 27,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  sceneEmoji: {
    fontSize: 67,
    lineHeight: 1,
  },

  sceneText: {
    color: "#183d6b",
    textAlign: "center",
    fontSize: 22,
    fontWeight: 900,
    lineHeight: 1.6,
  },

  choices: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
    gap: 12,
  },

  choice: {
    minHeight: 240,
    padding: 12,
    border: "5px solid",
    borderBottomWidth: 9,
    borderRadius: 27,
    fontFamily: "inherit",
    cursor: "pointer",
    boxShadow:
      "0 6px 12px rgba(100,70,0,.11)",
  },

  choiceItems: {
    minHeight: 135,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  visual: {
    fontSize: "clamp(40px,10vw,63px)",
    lineHeight: 1.15,
  },

  choiceTitle: {
    marginTop: 10,
    color: "#57301c",
    textAlign: "center",
    fontSize: "clamp(17px,4.5vw,23px)",
    fontWeight: 900,
    lineHeight: 1.5,
  },
};
