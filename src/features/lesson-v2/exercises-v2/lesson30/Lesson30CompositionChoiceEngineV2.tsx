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

export type Lesson30CompositionOption = {
  id: string;

  left: number;
  right: number;
  total: number;
};

export type Lesson30CompositionReference = {
  leftCount: number;
  rightCount: number;

  leftEmoji: string;
  rightEmoji: string;

  leftLabel: string;
  rightLabel: string;
};

export type Lesson30CompositionChoiceItem = {
  question: string;
  question_audio_key: string;

  reference?: Lesson30CompositionReference;

  target?: number;
  condition?: string;

  options: Lesson30CompositionOption[];

  correct: string;
};

type Props = {
  items: Lesson30CompositionChoiceItem[];
  audio_base: string;

  title?: string;
  icon?: string;

  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

function ReferenceGroup({
  count,
  emoji,
  label,
}: {
  count: number;
  emoji: string;
  label: string;
}) {
  return (
    <div style={styles.referenceGroup}>
      <div style={styles.referenceLabel}>
        {label}
      </div>

      <div style={styles.referenceItems}>
        {Array.from(
          { length: count },
          (_, index) => (
            <span
              key={index}
              style={styles.referenceEmoji}
            >
              {emoji}
            </span>
          ),
        )}
      </div>

      <div style={styles.referenceCount}>
        {count}
      </div>
    </div>
  );
}

export default function Lesson30CompositionChoiceEngineV2({
  items,
  audio_base,
  title = "أَخْتَارُ التَّرْكِيبَ الصَّحِيحَ",
  icon = "🧩",
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

  const timerRef =
    useRef<number | null>(null);

  const item = items[index];

  function choose(optionId: string) {
    if (feedback === "correct") {
      return;
    }

    setSelected(optionId);

    const isCorrect =
      optionId === item.correct;

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
      {item.reference && (
        <section style={styles.referencePanel}>
          <ReferenceGroup
            count={
              item.reference.leftCount
            }
            emoji={
              item.reference.leftEmoji
            }
            label={
              item.reference.leftLabel
            }
          />

          <div style={styles.referencePlus}>
            +
          </div>

          <ReferenceGroup
            count={
              item.reference.rightCount
            }
            emoji={
              item.reference.rightEmoji
            }
            label={
              item.reference.rightLabel
            }
          />
        </section>
      )}

      {typeof item.target === "number" && (
        <section style={styles.targetPanel}>
          <div style={styles.targetLabel}>
            العَدَدُ المَطْلُوبُ
          </div>

          <div style={styles.targetNumber}>
            {item.target}
          </div>

          {item.condition && (
            <div style={styles.condition}>
              {item.condition}
            </div>
          )}
        </section>
      )}

      <section style={styles.options}>
        {item.options.map((option) => {
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
                ...lesson30Styles.optionButton,
                ...styles.optionCard,

                ...(correctOption
                  ? lesson30Styles.correctOption
                  : null),

                ...(wrongOption
                  ? lesson30Styles.wrongOption
                  : null),
              }}
            >
              <div style={styles.optionEquation}>
                <span style={styles.leftNumber}>
                  {option.left}
                </span>

                <span style={styles.plus}>
                  +
                </span>

                <span style={styles.rightNumber}>
                  {option.right}
                </span>

                <span style={styles.equal}>
                  =
                </span>

                <span style={styles.total}>
                  {option.total}
                </span>
              </div>
            </button>
          );
        })}
      </section>
    </Lesson30ExerciseFrame>
  );
}

const styles:
  Record<string, CSSProperties> = {
  referencePanel: {
    padding: 11,

    display: "grid",

    gridTemplateColumns:
      "minmax(0,1fr) 45px minmax(0,1fr)",

    alignItems: "center",

    gap: 7,
    direction: "ltr",

    border: "4px solid #e8ad18",
    borderRadius: 27,

    background: "#fff",
  },

  referenceGroup: {
    minHeight: 165,
    padding: 9,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",

    gap: 7,

    border: "3px solid #ecd783",
    borderRadius: 21,

    background: "#fffaf0",
  },

  referenceLabel: {
    minHeight: 40,

    direction: "rtl",

    color: "#183d6b",

    textAlign: "center",
    fontSize: 15,
    fontWeight: 900,
  },

  referenceItems: {
    width: "100%",

    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",

    gap: 4,
  },

  referenceEmoji: {
    fontSize:
      "clamp(27px,7vw,39px)",

    lineHeight: 1.05,
  },

  referenceCount: {
    minWidth: 46,
    padding: "4px 10px",

    borderRadius: 999,

    background: "#183d6b",
    color: "#fff",

    textAlign: "center",
    fontSize: 19,
    fontWeight: 900,
  },

  referencePlus: {
    color: "#20a767",

    textAlign: "center",
    fontSize: 42,
    fontWeight: 900,
  },

  targetPanel: {
    padding: 13,

    border: "4px solid #e8ad18",
    borderRadius: 27,

    background:
      "linear-gradient(135deg,#eef9ff,#fff8d8)",

    textAlign: "center",
  },

  targetLabel: {
    color: "#183d6b",

    fontSize: 18,
    fontWeight: 900,
  },

  targetNumber: {
    width: 93,
    height: 93,

    margin: "8px auto",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    border: "7px solid #fff",
    borderRadius: "50%",

    background: "#efb21b",
    color: "#fff",

    fontSize: 52,
    fontWeight: 900,

    boxShadow:
      "0 5px 13px rgba(100,70,0,.15)",
  },

  condition: {
    color: "#6b4324",

    fontSize: 18,
    fontWeight: 900,
    lineHeight: 1.55,
  },

  options: {
    width: "100%",
    marginTop: 12,

    display: "grid",

    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",

    gap: 10,
  },

  optionCard: {
    width: "100%",
    minWidth: 0,
    minHeight: 112,

    boxSizing: "border-box",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: "9px 6px",

    overflow: "hidden",
  },

  optionEquation: {
    width: "100%",
    minWidth: 0,

    boxSizing: "border-box",

    display: "grid",

    gridTemplateColumns:
      "minmax(32px,1fr) auto minmax(32px,1fr) auto minmax(38px,1fr)",

    alignItems: "center",
    justifyContent: "center",

    gap: 3,
    direction: "ltr",

    whiteSpace: "nowrap",

    fontSize:
      "clamp(18px,4.8vw,29px)",

    overflow: "hidden",
  },

  leftNumber: {
    minWidth: 0,
    padding: "4px 4px",

    borderRadius: 11,

    background: "#e6f7ff",
    color: "#207bae",

    textAlign: "center",
  },

  rightNumber: {
    minWidth: 0,
    padding: "4px 4px",

    borderRadius: 11,

    background: "#fff0de",
    color: "#c76d16",

    textAlign: "center",
  },

  plus: {
    color: "#20a767",
  },

  equal: {
    color: "#183d6b",
  },

  total: {
    minWidth: 0,
    padding: "4px 4px",

    borderRadius: 11,

    background: "#fff0b8",
    color: "#bd7c00",

    textAlign: "center",
  },
};
