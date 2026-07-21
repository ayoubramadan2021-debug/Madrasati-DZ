import {
  useEffect,
  useMemo,
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

export type Lesson30CompositionBuilderItem = {
  question: string;
  question_audio_key: string;

  leftCount: number;
  rightCount: number;

  leftEmoji: string;
  rightEmoji: string;

  equation: string[];
  bank: string[];
};

type Props = {
  items: Lesson30CompositionBuilderItem[];
  audio_base: string;

  title?: string;
  icon?: string;

  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

type BankToken = {
  id: number;
  value: string;
};

export default function Lesson30CompositionBuilderEngineV2({
  items,
  audio_base,
  title = "أَبْنِي تَرْكِيبَ العَدَدِ",
  icon = "🧱",
  onComplete,
}: Props) {
  const [index, setIndex] = useState(0);

  const [selectedIds, setSelectedIds] =
    useState<number[]>([]);

  const [feedback, setFeedback] =
    useState<"correct" | "wrong" | null>(
      null,
    );

  const scoreRef = useRef(0);

  const timerRef =
    useRef<number | null>(null);

  const item = items[index];

  const tokens = useMemo<BankToken[]>(
    () =>
      item.bank.map(
        (value, tokenIndex) => ({
          id: tokenIndex,
          value,
        }),
      ),
    [
      item.bank,
    ],
  );

  const selectedTokens =
    selectedIds.map(
      (id) => tokens[id],
    );

  const full =
    selectedIds.length ===
    item.equation.length;

  function addToken(id: number) {
    if (feedback === "correct") {
      return;
    }

    if (selectedIds.includes(id)) {
      return;
    }

    if (
      selectedIds.length >=
      item.equation.length
    ) {
      return;
    }

    setSelectedIds(
      (current) => [
        ...current,
        id,
      ],
    );

    setFeedback(null);
  }

  function removeToken(
    selectedPosition: number,
  ) {
    if (feedback === "correct") {
      return;
    }

    setSelectedIds(
      (current) =>
        current.filter(
          (_, position) =>
            position !==
            selectedPosition,
        ),
    );

    setFeedback(null);
  }

  function reset() {
    if (feedback === "correct") {
      return;
    }

    setSelectedIds([]);
    setFeedback(null);
  }

  function check() {
    if (!full) {
      setFeedback("wrong");
      playLesson30Feedback(false);

      timerRef.current =
        window.setTimeout(() => {
          setSelectedIds([]);
          setFeedback(null);
        }, 1250);

      return;
    }

    const answer =
      selectedTokens.map(
        (token) => token.value,
      );

    const isCorrect =
      answer.length ===
        item.equation.length &&
      answer.every(
        (value, answerIndex) =>
          value ===
          item.equation[answerIndex],
      );

    if (!isCorrect) {
      setFeedback("wrong");
      playLesson30Feedback(false);

      timerRef.current =
        window.setTimeout(() => {
          setSelectedIds([]);
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

          setSelectedIds([]);
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
    setSelectedIds([]);
    setFeedback(null);
  }, [
    index,
  ]);

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
      <section style={styles.visualPanel}>
        <div style={styles.visualGroups}>
          <div style={styles.visualGroup}>
            {Array.from(
              {
                length:
                  item.leftCount,
              },
              (_, objectIndex) => (
                <span
                  key={objectIndex}
                  style={styles.object}
                >
                  {item.leftEmoji}
                </span>
              ),
            )}
          </div>

          <div style={styles.visualPlus}>
            +
          </div>

          <div style={styles.visualGroup}>
            {Array.from(
              {
                length:
                  item.rightCount,
              },
              (_, objectIndex) => (
                <span
                  key={objectIndex}
                  style={styles.object}
                >
                  {item.rightEmoji}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <section style={styles.builderPanel}>
        <div style={styles.slots}>
          {Array.from(
            {
              length:
                item.equation.length,
            },
            (_, slotIndex) => {
              const token =
                selectedTokens[
                  slotIndex
                ];

              return (
                <button
                  key={slotIndex}
                  type="button"
                  onClick={() =>
                    token &&
                    removeToken(
                      slotIndex,
                    )
                  }
                  style={{
                    ...styles.slot,

                    ...(token
                      ? styles.filledSlot
                      : null),
                  }}
                >
                  {token
                    ? token.value
                    : "؟"}
                </button>
              );
            },
          )}
        </div>

        <div style={styles.bankTitle}>
          اِضْغَطْ عَلَى البِطَاقَاتِ
          بِالتَّرْتِيبِ
        </div>

        <div style={styles.bank}>
          {tokens.map((token) => {
            const used =
              selectedIds.includes(
                token.id,
              );

            return (
              <button
                key={token.id}
                type="button"
                disabled={used}
                onClick={() =>
                  addToken(token.id)
                }
                style={{
                  ...styles.bankToken,

                  ...(used
                    ? styles.usedToken
                    : null),
                }}
              >
                {token.value}
              </button>
            );
          })}
        </div>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={reset}
            style={styles.resetButton}
          >
            إِعَادَةُ التَّرْتِيبِ
          </button>

          <button
            type="button"
            onClick={check}
            style={{
              ...styles.checkButton,

              opacity: full ? 1 : 0.55,
            }}
          >
            أَتَحَقَّقُ
          </button>
        </div>
      </section>
    </Lesson30ExerciseFrame>
  );
}

const styles:
  Record<string, CSSProperties> = {
  visualPanel: {
    padding: 11,

    border: "4px solid #e8ad18",
    borderRadius: 27,

    background: "#fff",
  },

  visualGroups: {
    minHeight: 120,

    display: "grid",

    gridTemplateColumns:
      "minmax(0,1fr) 43px minmax(0,1fr)",

    alignItems: "center",

    gap: 7,
    direction: "ltr",
  },

  visualGroup: {
    minHeight: 105,
    padding: 8,

    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",

    gap: 4,

    border: "3px solid #ecd783",
    borderRadius: 20,

    background: "#fffaf0",
  },

  object: {
    fontSize:
      "clamp(28px,7vw,40px)",

    lineHeight: 1.05,
  },

  visualPlus: {
    color: "#20a767",

    textAlign: "center",
    fontSize: 40,
    fontWeight: 900,
  },

  builderPanel: {
    marginTop: 12,
    padding: 13,

    border: "4px solid #e8ad18",
    borderRadius: 27,

    background:
      "linear-gradient(180deg,#fff,#fffaf0)",
  },

  slots: {
    width: "100%",

    display: "grid",

    gridTemplateColumns:
      "repeat(5,minmax(0,1fr))",

    gap: 5,
    direction: "ltr",
  },

  slot: {
    width: "100%",
    minWidth: 0,
    minHeight: 64,

    boxSizing: "border-box",

    padding: "4px 2px",

    border: "3px dashed #c8b36b",
    borderRadius: 16,

    background: "#fffdf6",
    color: "#b39a4d",

    fontFamily: "inherit",
    fontSize:
      "clamp(21px,6vw,34px)",
    fontWeight: 900,

    cursor: "pointer",

    overflow: "hidden",
  },

  filledSlot: {
    borderStyle: "solid",
    borderColor: "#338fc7",

    background: "#ebf8ff",
    color: "#183d6b",
  },

  bankTitle: {
    margin: "14px 0 8px",

    color: "#6b4528",

    textAlign: "center",
    fontSize: 16,
    fontWeight: 900,
  },

  bank: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",

    gap: 9,
    direction: "ltr",
  },

  bankToken: {
    minWidth: 61,
    minHeight: 59,

    padding: "6px 13px",

    border: "3px solid #e8ad18",
    borderBottomWidth: 7,
    borderRadius: 16,

    background: "#fff",
    color: "#183d6b",

    fontFamily: "inherit",
    fontSize: 29,
    fontWeight: 900,

    cursor: "pointer",

    boxShadow:
      "0 4px 8px rgba(100,70,0,.09)",
  },

  usedToken: {
    opacity: 0.24,
    cursor: "default",
  },

  actions: {
    marginTop: 14,

    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",

    gap: 10,
  },

  resetButton: {
    minHeight: 52,
    padding: "8px",

    border: "3px solid #e1a51a",
    borderRadius: 18,

    background: "#fff7d6",
    color: "#82530e",

    fontFamily: "inherit",
    fontSize: 17,
    fontWeight: 900,

    cursor: "pointer",
  },

  checkButton: {
    minHeight: 52,
    padding: "8px",

    border: 0,
    borderRadius: 18,

    background: "#20a767",
    color: "#fff",

    fontFamily: "inherit",
    fontSize: 18,
    fontWeight: 900,

    cursor: "pointer",

    boxShadow:
      "0 5px 0 #137747",
  },
};
