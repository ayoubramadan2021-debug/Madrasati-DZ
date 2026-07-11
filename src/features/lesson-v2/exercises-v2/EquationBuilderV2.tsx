import UnifiedExerciseKaraokeV2 from "../components/UnifiedExerciseKaraokeV2";
import UnifiedExerciseHeaderV2 from "../components/UnifiedExerciseHeaderV2";
import { Lesson26ExerciseFeedbackV2 } from "./HealthyFoodExerciseV2";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export type EquationChoice = {
  id: string;
  label: string;
};

export type EquationBuilderItem = {
  id: string;
  title: string;
  question: string;
  question_audio_key: string;
  scene_image?: string;
  mode: "missing-symbol" | "build-equation";
  emoji: string;
  before: number;
  change: number;
  result: number;
  action: "add" | "sub";
  equation: string[];
  options?: EquationChoice[];
  correct?: string;
  bank?: string[];
  success: string;
};

type Props = {
  items: EquationBuilderItem[];
  audio_base: string;
  missionTitle: string;
  missionIcon?: string;
  onComplete: () => void;
};

type Timing = {
  text: string;
  offset: number;
  duration: number;
};

type BankToken = {
  id: string;
  label: string;
};

const FEEDBACK_CORRECT = "/audio/teachers/taline/feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/teachers/taline/feedback/wrong.mp3";

const C = {
  cream: "#fff8dc",
  cream2: "#fff1b8",
  white: "#ffffff",
  navy: "#17365f",
  navy2: "#244e7a",
  gold: "#f2bd27",
  gold2: "#ffe379",
  green: "#20a567",
  red: "#ef4444",
  orange: "#f58a24",
  brown: "#7b4a22",
  border: "#e8bd3c",
  shadow: "rgba(78, 58, 25, 0.18)",
};

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function cleanText(t: string) {
  return (t || "")
    .replace(/[،,.!?؟؛:]/g, "")
    .trim();
}

function normalizeToken(value: string) {
  return value
    .replace(/−/g, "-")
    .replace(/\s+/g, "")
    .trim();
}

async function loadTimings(
  audioBase: string,
  key: string,
): Promise<Timing[]> {
  try {
    const response = await fetch(`${audioBase}/${key}.json`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data
      .map((entry) => ({
        text: String(entry.text ?? ""),
        offset: Number(entry.offset ?? 0),
        duration: Number(entry.duration ?? 0),
      }))
      .filter((entry) => entry.text.trim().length > 0);
  } catch {
    return [];
  }
}

function SymbolCard({
  value,
  active = false,
  compact = false,
}: {
  value: string;
  active?: boolean;
  compact?: boolean;
}) {
  const isSymbol = value === "+" || value === "−" || value === "-" || value === "=";

  return (
    <span
      style={{
        minWidth: compact ? 45 : 57,
        height: compact ? 45 : 57,
        padding: compact ? "0 9px" : "0 13px",
        borderRadius: compact ? 14 : 17,
        border: isSymbol
          ? `4px solid ${C.white}`
          : `3px solid ${C.border}`,
        background: isSymbol ? C.gold2 : C.white,
        color: C.navy,
        boxShadow: active
          ? `0 0 0 5px rgba(32,165,103,.24), 0 10px 22px ${C.shadow}`
          : `0 8px 18px ${C.shadow}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: compact ? 26 : 34,
        lineHeight: 1,
        fontWeight: 950,
        transform: active ? "scale(1.08)" : "scale(1)",
        transition: "transform .18s ease, box-shadow .18s ease",
        boxSizing: "border-box",
        direction: "ltr",
      }}
    >
      {value === "-" ? "−" : value}
    </span>
  );
}

function ObjectsGroup({
  count,
  emoji,
  crossed = false,
}: {
  count: number;
  emoji: string;
  crossed?: boolean;
}) {
  return (
    <div
      style={{
        minWidth: 102,
        minHeight: 72,
        padding: 9,
        borderRadius: 18,
        border: `3px solid ${C.border}`,
        background: crossed ? "#fff0f0" : C.white,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        boxSizing: "border-box",
      }}
    >
      {Array.from({ length: Math.max(0, count) }).map((_, index) => (
        <span
          key={index}
          style={{
            position: "relative",
            fontSize: 24,
            lineHeight: 1,
            filter: crossed ? "grayscale(.15)" : "none",
            opacity: crossed ? 0.68 : 1,
          }}
        >
          {emoji}

          {crossed && (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: -2,
                right: -2,
                top: "50%",
                height: 3,
                borderRadius: 3,
                background: C.red,
                transform: "rotate(-28deg)",
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

function VisualOperation({
  item,
}: {
  item: EquationBuilderItem;
}) {
  const operatorMissing =
    item.equation[1] === "__";

  const equalsMissing =
    item.equation[3] === "__";

  const MissingCard = () => (
    <span
      aria-hidden="true"
      style={{
        minWidth: 50,
        height: 47,
        borderRadius: 15,
        border: `3px dashed ${C.gold}`,
        background: C.cream,
        color: C.navy,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 27,
        fontWeight: 950,
        boxSizing: "border-box",
      }}
    >
      ؟
    </span>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 9,
        direction: "ltr",
      }}
    >
      <ObjectsGroup
        count={item.before}
        emoji={item.emoji}
      />

      {operatorMissing ? (
        <MissingCard />
      ) : (
        <SymbolCard
          value={
            item.action === "add" ? "+" : "−"
          }
          compact
        />
      )}

      <ObjectsGroup
        count={item.change}
        emoji={item.emoji}
        crossed={item.action === "sub"}
      />

      {equalsMissing ? (
        <MissingCard />
      ) : (
        <SymbolCard
          value="="
          compact
        />
      )}

      <ObjectsGroup
        count={item.result}
        emoji={item.emoji}
      />
    </div>
  );
}

export default function EquationBuilderV2({
  items,
  audio_base,
  missionTitle,
  missionIcon = "🧩",
  onComplete,
}: Props) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<
    "idle" | "correct" | "wrong"
  >("idle");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [placed, setPlaced] = useState<BankToken[]>([]);
  const [bank, setBank] = useState<BankToken[]>([]);
  const [timings, setTimings] = useState<Timing[]>([]);
  const [activeWord, setActiveWord] = useState("");
  const [audioPlaying, setAudioPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const feedbackRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const nextRef = useRef<number | null>(null);

  const item = items[index];

  const questionWords = useMemo(
    () =>
      item.question
        .split(/\s+/)
        .map((word) => word.trim())
        .filter(Boolean),
    [item.question],
  );

  const stopQuestionAudio = () => {
    timersRef.current.forEach((timer) => {
      window.clearTimeout(timer);
    });

    timersRef.current = [];

    setAudioPlaying(false);
    setActiveWord("");

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.onended = null;
      }
    } catch {
      // ignore
    }

    audioRef.current = null;
  };

  const stopFeedback = () => {
    try {
      if (feedbackRef.current) {
        feedbackRef.current.pause();
        feedbackRef.current.currentTime = 0;
      }
    } catch {
      // لا شيء
    }

    feedbackRef.current = null;
  };

  const clearNext = () => {
    if (nextRef.current !== null) {
      window.clearTimeout(nextRef.current);
      nextRef.current = null;
    }
  };

  const resetRound = () => {
    stopQuestionAudio();
    stopFeedback();
    clearNext();

    setFeedback("idle");
    setSelectedChoice("");
    setPlaced([]);

    const rawBank =
      item.mode === "build-equation"
        ? item.bank?.length
          ? item.bank
          : item.equation
        : [];

    setBank(
      shuffle(rawBank ?? []).map((label, tokenIndex) => ({
        id: `${item.id}_token_${tokenIndex}`,
        label,
      })),
    );
  };

  useEffect(() => {
    let cancelled = false;

    resetRound();
    setTimings([]);
    setActiveWord("");

    loadTimings(
      audio_base,
      item.question_audio_key,
    ).then((loaded) => {
      if (cancelled) return;

      setTimings(loaded);

      const autoPlayTimer = window.setTimeout(() => {
        if (!cancelled) {
          playQuestion(loaded);
        }
      }, 260);

      timersRef.current.push(autoPlayTimer);
    });

    return () => {
      cancelled = true;
      stopQuestionAudio();
      stopFeedback();
      clearNext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    index,
    audio_base,
    item.question_audio_key,
  ]);

  const playQuestion = (
    customTimings?: Timing[],
  ) => {
    stopQuestionAudio();

    const list = customTimings ?? timings;

    try {
      const audio = new Audio(
        `${audio_base}/${item.question_audio_key}.mp3`,
      );

      audioRef.current = audio;

      setAudioPlaying(true);
      setActiveWord("");

      list.forEach((word) => {
        const offset = Math.max(
          0,
          Number(word.offset || 0),
        );

        const duration = Math.max(
          80,
          Number(word.duration || 600),
        );

        const startTimer = window.setTimeout(() => {
          setActiveWord(cleanText(word.text));
        }, offset);

        const endTimer = window.setTimeout(() => {
          setActiveWord("");
        }, offset + duration);

        timersRef.current.push(
          startTimer,
          endTimer,
        );
      });

      audio.onended = () => {
        setAudioPlaying(false);
        setActiveWord("");
      };

      audio.play().catch(() => {
        setAudioPlaying(false);
        setActiveWord("");
      });
    } catch {
      setAudioPlaying(false);
      setActiveWord("");
    }
  };

  const playFeedback = (correct: boolean) => {
    stopQuestionAudio();
    stopFeedback();

    try {
      const audio = new Audio(
        correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY,
      );

      feedbackRef.current = audio;
      audio.play().catch(() => {});
    } catch {
      // لا شيء
    }
  };

  const finishAnswer = (correct: boolean) => {
    if (feedback !== "idle") {
      return;
    }

    setFeedback(correct ? "correct" : "wrong");
    playFeedback(correct);

    clearNext();

    if (correct) {
      nextRef.current = window.setTimeout(() => {
        if (index >= items.length - 1) {
          onComplete();
          return;
        }

        setIndex((current) => current + 1);
      }, 1450);

      return;
    }

    nextRef.current = window.setTimeout(() => {
      setFeedback("idle");
      setSelectedChoice("");
      setPlaced([]);
    }, 1050);
  };

  const chooseMissingSymbol = (choice: EquationChoice) => {
    if (feedback !== "idle") {
      return;
    }

    setSelectedChoice(choice.id);
    finishAnswer(choice.id === item.correct);
  };

  const chooseBankToken = (token: BankToken) => {
    if (feedback !== "idle") {
      return;
    }

    if (placed.some((placedToken) => placedToken.id === token.id)) {
      return;
    }

    if (placed.length >= item.equation.length) {
      return;
    }

    const nextPlaced = [...placed, token];
    setPlaced(nextPlaced);

    if (nextPlaced.length === item.equation.length) {
      const answer = nextPlaced.map((entry) =>
        normalizeToken(entry.label),
      );

      const expected = item.equation.map(normalizeToken);

      const correct =
        answer.length === expected.length &&
        answer.every((value, tokenIndex) => value === expected[tokenIndex]);

      window.setTimeout(() => finishAnswer(correct), 120);
    }
  };

  const removePlacedToken = (tokenIndex: number) => {
    if (feedback !== "idle") {
      return;
    }

    setPlaced((current) =>
      current.filter((_, indexValue) => indexValue !== tokenIndex),
    );
  };

  const feedbackStyle: CSSProperties =
    feedback === "correct"
      ? {
          borderColor: C.green,
          background: "#eafff4",
          color: "#137a4c",
        }
      : feedback === "wrong"
        ? {
            borderColor: C.red,
            background: "#fff0f0",
            color: "#b4232f",
          }
        : {
            borderColor: C.border,
            background: C.cream,
            color: C.navy,
          };

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(180deg, #fff9df 0%, #fff3be 52%, #ffedaa 100%)",
        padding: "8px 10px 84px",
        boxSizing: "border-box",
        fontFamily:
          '"Tajawal", "Noto Kufi Arabic", Arial, sans-serif',
        color: C.navy,
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 520,
          margin: "0 auto",
        }}
      >
        <UnifiedExerciseHeaderV2
          index={index}
          total={items.length}
          missionTitle={missionTitle}
          missionIcon={missionIcon}
          onReplay={() => playQuestion()}
          isPlaying={audioPlaying}
        />

        <article
          style={{
            borderRadius: 28,
            border: `3px solid ${C.border}`,
            background: C.white,
            boxShadow: `0 14px 34px ${C.shadow}`,
            overflow: "hidden",
          }}
        >
          {item.scene_image && (
            <div
              style={{
                height: 165,
                overflow: "hidden",
                background: C.cream2,
              }}
            >
              <img
                src={item.scene_image}
                alt=""
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center 23%",
                }}
              />
            </div>
          )}

          <div style={{ padding: "15px 13px 19px" }}>

            <UnifiedExerciseKaraokeV2
              words={questionWords}
              activeWord={activeWord}
            />

            <div
              style={{
                padding: 11,
                marginBottom: 13,
                borderRadius: 22,
                background:
                  "linear-gradient(180deg, #fff9e4, #fff0b4)",
                border: `3px solid ${C.border}`,
              }}
            >
              <VisualOperation item={item} />
            </div>

            {item.mode === "missing-symbol" && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8,
                    direction: "ltr",
                    margin: "6px 0 15px",
                  }}
                >
                  {item.equation.map((token, tokenIndex) => {
                    const isBlank = token === "__";

                    if (!isBlank) {
                      return (
                        <SymbolCard
                          key={`${token}_${tokenIndex}`}
                          value={token}
                        />
                      );
                    }

                    const selectedLabel =
                      item.options?.find(
                        (option) => option.id === selectedChoice,
                      )?.label ?? "؟";

                    return (
                      <span
                        key={`blank_${tokenIndex}`}
                        style={{
                          minWidth: 68,
                          height: 62,
                          borderRadius: 18,
                          border:
                            feedback === "correct"
                              ? `4px solid ${C.green}`
                              : feedback === "wrong"
                                ? `4px solid ${C.red}`
                                : `4px dashed ${C.gold}`,
                          background:
                            selectedChoice.length > 0
                              ? C.gold2
                              : C.cream,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 36,
                          fontWeight: 950,
                          color: C.navy,
                          boxSizing: "border-box",
                        }}
                      >
                        {selectedLabel === "-"
                          ? "−"
                          : selectedLabel}
                      </span>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(115px, 1fr))",
                    gap: 10,
                  }}
                >
                  {(item.options ?? []).map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      disabled={feedback !== "idle"}
                      onClick={() =>
                        chooseMissingSymbol(option)
                      }
                      style={{
                        minHeight: 68,
                        borderRadius: 20,
                        border:
                          selectedChoice === option.id
                            ? `4px solid ${
                                feedback === "wrong"
                                  ? C.red
                                  : C.green
                              }`
                            : `3px solid ${C.border}`,
                        background: C.gold2,
                        color: C.navy,
                        boxShadow: `0 8px 18px ${C.shadow}`,
                        cursor:
                          feedback === "idle"
                            ? "pointer"
                            : "default",
                        fontSize: 35,
                        fontWeight: 950,
                      }}
                    >
                      {option.label === "-"
                        ? "−"
                        : option.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {item.mode === "build-equation" && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 7,
                    direction: "ltr",
                    marginBottom: 14,
                  }}
                >
                  {item.equation.map((_, slotIndex) => {
                    const token = placed[slotIndex];

                    return (
                      <button
                        key={`slot_${slotIndex}`}
                        type="button"
                        onClick={() =>
                          token && removePlacedToken(slotIndex)
                        }
                        style={{
                          minWidth: 57,
                          height: 59,
                          padding: "0 8px",
                          borderRadius: 17,
                          border:
                            feedback === "correct"
                              ? `4px solid ${C.green}`
                              : feedback === "wrong"
                                ? `4px solid ${C.red}`
                                : `3px dashed ${C.gold}`,
                          background: token
                            ? token.label === "+" ||
                              token.label === "−" ||
                              token.label === "-" ||
                              token.label === "="
                              ? C.gold2
                              : C.white
                            : C.cream,
                          color: C.navy,
                          fontSize: 31,
                          fontWeight: 950,
                          cursor:
                            token && feedback === "idle"
                              ? "pointer"
                              : "default",
                          boxSizing: "border-box",
                          direction: "ltr",
                        }}
                      >
                        {token
                          ? token.label === "-"
                            ? "−"
                            : token.label
                          : ""}
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 9,
                  }}
                >
                  {bank.map((token) => {
                    const used = placed.some(
                      (placedToken) =>
                        placedToken.id === token.id,
                    );

                    return (
                      <button
                        key={token.id}
                        type="button"
                        disabled={
                          used || feedback !== "idle"
                        }
                        onClick={() =>
                          chooseBankToken(token)
                        }
                        style={{
                          minWidth: 61,
                          height: 61,
                          padding: "0 10px",
                          borderRadius: 18,
                          border: `3px solid ${C.border}`,
                          background:
                            token.label === "+" ||
                            token.label === "−" ||
                            token.label === "-" ||
                            token.label === "="
                              ? C.gold2
                              : C.white,
                          color: C.navy,
                          boxShadow: used
                            ? "none"
                            : `0 7px 16px ${C.shadow}`,
                          opacity: used ? 0.25 : 1,
                          transform: used
                            ? "scale(.92)"
                            : "scale(1)",
                          fontSize: 31,
                          fontWeight: 950,
                          cursor:
                            used || feedback !== "idle"
                              ? "default"
                              : "pointer",
                          direction: "ltr",
                        }}
                      >
                        {token.label === "-"
                          ? "−"
                          : token.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>


            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 2147483646,
                pointerEvents: "none",
              }}
            >
              <Lesson26ExerciseFeedbackV2
                feedback={feedback}
              />
            </div>
</article>
      </section>
    </main>
  );
}
