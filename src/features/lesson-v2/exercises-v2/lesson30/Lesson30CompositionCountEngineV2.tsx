import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  CSSProperties,
} from "react";

import {
  Lesson30ExerciseFrame,
  lesson30Styles,
  playLesson30Feedback,
} from "./Lesson30ExerciseUI";

export type Lesson30CompositionCountItem = {
  question: string;
  question_audio_key: string;

  leftCount: number;
  rightCount: number;

  leftEmoji: string;
  rightEmoji: string;

  leftLabel: string;
  rightLabel: string;

  options: number[];
  correct: number;
};

type Props = {
  items: Lesson30CompositionCountItem[];
  audio_base: string;

  title?: string;
  icon?: string;

  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

function Group({
  count,
  emoji,
  label,
}: {
  count: number;
  emoji: string;
  label: string;
}) {
  return (
    <div style={styles.groupCard}>
      <div style={styles.groupLabel}>
        {label}
      </div>

      <div style={styles.itemsGrid}>
        {Array.from(
          { length: count },
          (_, index) => (
            <span
              key={index}
              style={styles.itemEmoji}
            >
              {emoji}
            </span>
          ),
        )}
      </div>

      <div style={styles.countBadge}>
        {count}
      </div>
    </div>
  );
}

export default function Lesson30CompositionCountEngineV2({
  items,
  audio_base,
  title = "أُرَكِّبُ العَدَدَ",
  icon = "🔟",
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

  const timerRef =
    useRef<number | null>(null);

  const item = items[index];

  function choose(option: number) {
    if (feedback === "correct") {
      return;
    }

    setSelected(option);

    const isCorrect =
      option === item.correct;

    if (!isCorrect) {
      setFeedback("wrong");
      playLesson30Feedback(false);

      timerRef.current =
        window.setTimeout(() => {
          setSelected(null);
          setFeedback(null);
        }, 1250);

      return;
    }

    setFeedback("correct");
    playLesson30Feedback(true);

    scoreRef.current += 1;

    timerRef.current =
      window.setTimeout(() => {
        if (index < items.length - 1) {
          setIndex(
            (current) => current + 1,
          );

          setSelected(null);
          setFeedback(null);
        } else {
          onComplete?.(
            scoreRef.current,
            items.length,
          );
        }
      }, 1250);
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
    <Lesson30ExerciseFrame
      title={title}
      icon={icon}
      index={index}
      total={items.length}
      question={item.question}
      audioBase={audio_base}
      audioKey={item.question_audio_key}
      feedback={feedback}
    >
      <section style={styles.activity}>
        <div style={styles.groupsRow}>
          <Group
            count={item.leftCount}
            emoji={item.leftEmoji}
            label={item.leftLabel}
          />

          <div style={styles.plus}>
            +
          </div>

          <Group
            count={item.rightCount}
            emoji={item.rightEmoji}
            label={item.rightLabel}
          />
        </div>

        <div style={styles.equation}>
          <span>{item.leftCount}</span>
          <span style={styles.operator}>
            +
          </span>
          <span>{item.rightCount}</span>
          <span style={styles.operator}>
            =
          </span>
          <span style={styles.unknown}>
            ؟
          </span>
        </div>
      </section>

      <section style={styles.options}>
        {item.options.map((option) => {
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
              onClick={() => choose(option)}
              style={{
                ...lesson30Styles.optionButton,

                ...(correctOption
                  ? lesson30Styles.correctOption
                  : null),

                ...(wrongOption
                  ? lesson30Styles.wrongOption
                  : null),
              }}
            >
              {option}
            </button>
          );
        })}
      </section>
    </Lesson30ExerciseFrame>
  );
}

const styles:
  Record<string, CSSProperties> = {
  activity: {
    padding: 12,

    border: "4px solid #e8ad18",
    borderRadius: 28,

    background: "#fff",

    boxShadow:
      "0 6px 13px rgba(100,70,0,.10)",
  },

  groupsRow: {
    display: "grid",

    gridTemplateColumns:
      "minmax(0,1fr) 48px minmax(0,1fr)",

    alignItems: "center",

    gap: 7,
    direction: "ltr",
  },

  groupCard: {
    minHeight: 230,
    padding: "11px 8px",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",

    gap: 8,

    border: "3px solid #ecd783",
    borderRadius: 23,

    background:
      "linear-gradient(180deg,#fffdf6,#fff8df)",
  },

  groupLabel: {
    minHeight: 42,

    direction: "rtl",

    color: "#183d6b",

    textAlign: "center",
    fontSize: 17,
    fontWeight: 900,
  },

  itemsGrid: {
    width: "100%",

    display: "grid",

    gridTemplateColumns:
      "repeat(3,minmax(28px,1fr))",

    alignItems: "center",
    justifyItems: "center",

    gap: 6,
  },

  itemEmoji: {
    fontSize:
      "clamp(31px,8vw,45px)",

    lineHeight: 1.1,
  },

  countBadge: {
    minWidth: 53,
    padding: "5px 12px",

    borderRadius: 999,

    background: "#183d6b",
    color: "#fff",

    textAlign: "center",
    fontSize: 22,
    fontWeight: 900,
  },

  plus: {
    color: "#20a767",

    textAlign: "center",
    fontSize: 47,
    fontWeight: 900,
  },

  equation: {
    marginTop: 12,
    padding: "10px 9px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    gap: 13,
    direction: "ltr",

    border: "3px solid #9ac8e2",
    borderRadius: 21,

    background: "#eef9ff",
    color: "#183d6b",

    fontSize:
      "clamp(37px,10vw,58px)",
    fontWeight: 900,
  },

  operator: {
    color: "#20a767",
  },

  unknown: {
    minWidth: 58,

    borderRadius: 16,

    background: "#fff0be",
    color: "#d48c00",

    textAlign: "center",
  },

  options: {
    marginTop: 12,

    display: "grid",

    gridTemplateColumns:
      "repeat(3,minmax(0,1fr))",

    gap: 10,
  },
};
