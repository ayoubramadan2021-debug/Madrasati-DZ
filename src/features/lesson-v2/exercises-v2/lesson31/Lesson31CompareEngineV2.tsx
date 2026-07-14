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

export type Lesson31CompareItem = {
  leftLabel: string;
  leftCount: number;
  leftColor: string;

  rightLabel: string;
  rightCount: number;
  rightColor: string;

  question: string;
  question_audio_key: string;

  correct:
    | "more"
    | "less"
    | "equal";
};

type Props = {
  items: Lesson31CompareItem[];
  audio_base: string;
  title?: string;
  icon?: string;
  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

const OPTIONS = [
  {
    id: "more",
    label: "أَكْثَرُ",
  },
  {
    id: "less",
    label: "أَقَلُّ",
  },
  {
    id: "equal",
    label: "يُسَاوِي",
  },
] as const;

function DotGroup({
  count,
  color,
}: {
  count: number;
  color: string;
}) {
  return (
    <div style={styles.dots}>
      {Array.from(
        { length: count },
        (_, index) => (
          <span
            key={index}
            style={{
              ...styles.dot,
              background: color,
            }}
          />
        ),
      )}
    </div>
  );
}

export default function Lesson31CompareEngineV2({
  items,
  audio_base,
  title = "مُقَارَنَةُ المَجْمُوعَاتِ",
  icon = "⚖️",
  onComplete,
}: Props) {
  const [index, setIndex] = useState(0);

  const [selected, setSelected] =
    useState<string | null>(null);

  const [feedback, setFeedback] =
    useState<"correct" | "wrong" | null>(
      null,
    );

  const scoreRef = useRef(0);
  const timerRef = useRef<number | null>(
    null,
  );

  const item = items[index];

  const arrow =
    item.leftCount > item.rightCount
      ? "←"
      : item.leftCount < item.rightCount
        ? "→"
        : "↔";

  function choose(option: string) {
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
      <section style={styles.compareArea}>
        <div style={styles.groupsRow}>
          <div style={styles.groupCard}>
            <div style={styles.groupLabel}>
              {item.leftLabel}
            </div>

            <DotGroup
              count={item.leftCount}
              color={item.leftColor}
            />

            <div style={styles.number}>
              {item.leftCount}
            </div>
          </div>

          <div style={styles.arrow}>
            {arrow}
          </div>

          <div style={styles.groupCard}>
            <div style={styles.groupLabel}>
              {item.rightLabel}
            </div>

            <DotGroup
              count={item.rightCount}
              color={item.rightColor}
            />

            <div style={styles.number}>
              {item.rightCount}
            </div>
          </div>
        </div>
      </section>

      <section style={styles.options}>
        {OPTIONS.map((option) => {
          const chosen =
            selected === option.id;

          const correctOption =
            feedback !== null &&
            option.id === item.correct;

          const wrongOption =
            chosen &&
            option.id !== item.correct;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                choose(option.id)
              }
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
              {option.label}
            </button>
          );
        })}
      </section>
    </Lesson31ExerciseFrame>
  );
}

const styles:
  Record<string, CSSProperties> = {
  compareArea: {
    padding: 11,
    border: "4px solid #e8ad18",
    borderRadius: 28,
    background: "#fff",
  },

  groupsRow: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1fr) 55px minmax(0,1fr)",
    alignItems: "center",
    gap: 7,
    direction: "ltr",
  },

  groupCard: {
    minHeight: 285,
    padding: "12px 8px",
    borderRadius: 23,
    border: "3px solid #ecd887",
    background: "#fffdf5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  groupLabel: {
    minHeight: 45,
    direction: "rtl",
    color: "#183d6b",
    textAlign: "center",
    fontSize: 17,
    fontWeight: 900,
  },

  dots: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "repeat(3,minmax(25px,1fr))",
    justifyItems: "center",
    alignItems: "center",
    gap: 8,
  },

  dot: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "2px solid rgba(0,0,0,.11)",
    boxShadow:
      "inset 0 -4px 0 rgba(0,0,0,.13)",
  },

  number: {
    minWidth: 54,
    padding: "5px 12px",
    borderRadius: 999,
    background: "#183d6b",
    color: "#fff",
    textAlign: "center",
    fontSize: 23,
    fontWeight: 900,
  },

  arrow: {
    color: "#183d6b",
    textAlign: "center",
    fontSize: 48,
    fontWeight: 900,
  },

  options: {
    marginTop: 12,
    display: "grid",
    gridTemplateColumns:
      "repeat(3,minmax(0,1fr))",
    gap: 9,
  },
};
