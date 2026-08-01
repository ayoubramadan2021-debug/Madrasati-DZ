#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

FILE="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
BACKUP="backups/lesson36_final_engine_$(date +%Y%m%d_%H%M%S)"

mkdir -p "$BACKUP"
cp -p "$FILE" "$BACKUP/"

cat > "$FILE" <<'TSX'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_36_amusement_sorting/exercises";

const CORRECT_SOUND = "/audio/v2_feedback/correct.mp3";
const RETRY_SOUND = "/audio/v2_feedback/retry.mp3";

type KaraokeWord = {
  text: string;
  offset: number;
  duration: number;
};

type BaseQuestion = {
  id: string;
  mission: 1 | 2 | 3 | 4;
  prompt: string;
  audioKey: string;
};

type CountQuestion = BaseQuestion & {
  kind: "count";
  object: "balloon" | "star" | "ball" | "gift";
  count: number;
  choices: number[];
  answer: number;
  helper: string;
};

type ChoiceQuestion = BaseQuestion & {
  kind: "choice";
  choices: number[];
  answer: number;
};

type BuildQuestion = BaseQuestion & {
  kind: "build";
  target: number;
};

type MatchQuestion = BaseQuestion & {
  kind: "match";
  choices: number[];
  answer: number;
};

type Question =
  | CountQuestion
  | ChoiceQuestion
  | BuildQuestion
  | MatchQuestion;

const QUESTIONS: Question[] = [
  {
    id: "m1_q1",
    mission: 1,
    kind: "count",
    prompt: "كَمْ بَالُونًا فِي الْمَجْمُوعَةِ؟",
    audioKey: "m1_q1_count_12",
    object: "balloon",
    count: 12,
    choices: [11, 12, 13],
    answer: 12,
    helper: "ألمس كل بالون وأعده بهدوء.",
  },
  {
    id: "m1_q2",
    mission: 1,
    kind: "count",
    prompt: "كَمْ نَجْمَةً فِي الْمَجْمُوعَةِ؟",
    audioKey: "m1_q2_count_15",
    object: "star",
    count: 15,
    choices: [14, 15, 16],
    answer: 15,
    helper: "ألمس كل نجمة وأعدها بهدوء.",
  },
  {
    id: "m1_q3",
    mission: 1,
    kind: "count",
    prompt: "كَمْ كُرَةً فِي الْمَجْمُوعَةِ؟",
    audioKey: "m1_q3_count_17",
    object: "ball",
    count: 17,
    choices: [16, 17, 18],
    answer: 17,
    helper: "ألمس كل كرة وأعدها بهدوء.",
  },
  {
    id: "m1_q4",
    mission: 1,
    kind: "count",
    prompt: "كَمْ هَدِيَّةً فِي الْمَجْمُوعَةِ؟",
    audioKey: "m1_q4_count_19",
    object: "gift",
    count: 19,
    choices: [17, 18, 19],
    answer: 19,
    helper: "ألمس كل هدية وأعدها بهدوء.",
  },

  {
    id: "m2_q1",
    mission: 2,
    kind: "choice",
    prompt: "أَيْنَ الْعَدَدُ أَحَدَ عَشَرَ؟",
    audioKey: "m2_q1_choose_11",
    choices: [10, 11, 12],
    answer: 11,
  },
  {
    id: "m2_q2",
    mission: 2,
    kind: "choice",
    prompt: "أَيْنَ الْعَدَدُ أَرْبَعَةَ عَشَرَ؟",
    audioKey: "m2_q2_choose_14",
    choices: [13, 14, 15],
    answer: 14,
  },
  {
    id: "m2_q3",
    mission: 2,
    kind: "choice",
    prompt: "أَيْنَ الْعَدَدُ سَبْعَةَ عَشَرَ؟",
    audioKey: "m2_q3_choose_17",
    choices: [16, 17, 18],
    answer: 17,
  },
  {
    id: "m2_q4",
    mission: 2,
    kind: "choice",
    prompt: "أَيْنَ الْعَدَدُ تِسْعَةَ عَشَرَ؟",
    audioKey: "m2_q4_choose_19",
    choices: [17, 18, 19],
    answer: 19,
  },

  {
    id: "m3_q1",
    mission: 3,
    kind: "build",
    prompt: "كَوِّنِ الْعَدَدَ اثْنَيْ عَشَرَ.",
    audioKey: "m3_q1_build_12",
    target: 12,
  },
  {
    id: "m3_q2",
    mission: 3,
    kind: "build",
    prompt: "كَوِّنِ الْعَدَدَ أَرْبَعَةَ عَشَرَ.",
    audioKey: "m3_q2_build_14",
    target: 14,
  },
  {
    id: "m3_q3",
    mission: 3,
    kind: "build",
    prompt: "كَوِّنِ الْعَدَدَ سِتَّةَ عَشَرَ.",
    audioKey: "m3_q3_build_16",
    target: 16,
  },
  {
    id: "m3_q4",
    mission: 3,
    kind: "build",
    prompt: "كَوِّنِ الْعَدَدَ ثَمَانِيَةَ عَشَرَ.",
    audioKey: "m3_q4_build_18",
    target: 18,
  },

  {
    id: "m4_q1",
    mission: 4,
    kind: "match",
    prompt: "أَيُّ تَمْثِيلٍ يُسَاوِي ثَلَاثَةَ عَشَرَ؟",
    audioKey: "m4_q1_match_13",
    choices: [12, 13, 14],
    answer: 13,
  },
  {
    id: "m4_q2",
    mission: 4,
    kind: "match",
    prompt: "أَيُّ تَمْثِيلٍ يُسَاوِي خَمْسَةَ عَشَرَ؟",
    audioKey: "m4_q2_match_15",
    choices: [14, 15, 16],
    answer: 15,
  },
  {
    id: "m4_q3",
    mission: 4,
    kind: "match",
    prompt: "أَيُّ تَمْثِيلٍ يُسَاوِي سَبْعَةَ عَشَرَ؟",
    audioKey: "m4_q3_match_17",
    choices: [16, 17, 18],
    answer: 17,
  },
  {
    id: "m4_q4",
    mission: 4,
    kind: "match",
    prompt: "أَيُّ تَمْثِيلٍ يُسَاوِي تِسْعَةَ عَشَرَ؟",
    audioKey: "m4_q4_match_19",
    choices: [17, 18, 19],
    answer: 19,
  },
];

function playEffect(url: string) {
  const sound = new Audio(url);
  sound.play().catch(() => {});
}

function BaseTen({
  value,
  compact = false,
}: {
  value: number;
  compact?: boolean;
}) {
  const units = Math.max(0, value - 10);

  return (
    <div style={styles.baseTen}>
      <div
        style={{
          ...styles.tenRod,
          gridTemplateColumns: compact
            ? "repeat(5, 12px)"
            : "repeat(5, 18px)",
        }}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} style={styles.tenCell} />
        ))}
      </div>

      <div style={styles.unitsRow}>
        {Array.from({ length: units }, (_, index) => (
          <span
            key={index}
            style={{
              ...styles.unitCell,
              width: compact ? 15 : 22,
              height: compact ? 15 : 22,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ObjectShape({
  type,
  tapped,
  number,
}: {
  type: CountQuestion["object"];
  tapped: boolean;
  number: number;
}) {
  return (
    <g>
      {type === "balloon" && (
        <>
          <ellipse
            cx="0"
            cy="-5"
            rx="23"
            ry="29"
            fill={tapped ? "#50b883" : "#6e99cb"}
            stroke="#ffffff"
            strokeWidth="4"
          />
          <path
            d="M0 25 L-3 34 L4 34 Z"
            fill="#315a86"
          />
          <path
            d="M1 34 C-8 45 10 52 0 65"
            fill="none"
            stroke="#315a86"
            strokeWidth="3"
          />
        </>
      )}

      {type === "star" && (
        <polygon
          points="0,-31 8,-10 31,-10 13,4 20,28 0,14 -20,28 -13,4 -31,-10 -8,-10"
          fill={tapped ? "#50b883" : "#f2bd45"}
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )}

      {type === "ball" && (
        <>
          <circle
            cx="0"
            cy="0"
            r="29"
            fill={tapped ? "#dff6e9" : "#ffffff"}
            stroke="#315a86"
            strokeWidth="4"
          />
          <polygon
            points="0,-11 11,-3 7,10 -7,10 -11,-3"
            fill="#315a86"
          />
          <path
            d="M0 -11 L0 -27 M11 -3 L25 -10 M7 10 L16 23 M-7 10 L-16 23 M-11 -3 L-25 -10"
            stroke="#315a86"
            strokeWidth="3"
          />
        </>
      )}

      {type === "gift" && (
        <>
          <rect
            x="-27"
            y="-18"
            width="54"
            height="45"
            rx="7"
            fill={tapped ? "#50b883" : "#db7180"}
            stroke="#ffffff"
            strokeWidth="4"
          />
          <rect
            x="-32"
            y="-25"
            width="64"
            height="14"
            rx="5"
            fill="#f2bd45"
          />
          <rect
            x="-5"
            y="-25"
            width="10"
            height="52"
            fill="#f2bd45"
          />
          <path
            d="M0 -25 C-25 -43 -27 -17 0 -16 C27 -17 25 -43 0 -25"
            fill="none"
            stroke="#f2bd45"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </>
      )}

      {tapped && (
        <>
          <circle
            cx="27"
            cy="-27"
            r="15"
            fill="#153f6c"
            stroke="#ffffff"
            strokeWidth="3"
          />
          <text
            x="27"
            y="-21"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="16"
            fontWeight="900"
          >
            {number}
          </text>
        </>
      )}
    </g>
  );
}

function CountScene({
  question,
  tapped,
  onTap,
}: {
  question: CountQuestion;
  tapped: number[];
  onTap: (index: number) => void;
}) {
  const columns = 5;

  return (
    <svg
      viewBox="0 0 520 350"
      style={styles.sceneSvg}
      aria-label={question.helper}
    >
      <rect
        x="6"
        y="6"
        width="508"
        height="338"
        rx="30"
        fill="#f7fbff"
        stroke="#d5e6f7"
        strokeWidth="4"
      />

      {Array.from(
        { length: question.count },
        (_, index) => {
          const column = index % columns;
          const row = Math.floor(index / columns);
          const x = 66 + column * 97;
          const y = 62 + row * 78;
          const isTapped = tapped.includes(index);
          const tapNumber =
            isTapped
              ? tapped.indexOf(index) + 1
              : 0;

          return (
            <g
              key={index}
              transform={`translate(${x} ${y})`}
              onClick={() => onTap(index)}
              style={{ cursor: "pointer" }}
            >
              <ObjectShape
                type={question.object}
                tapped={isTapped}
                number={tapNumber}
              />
            </g>
          );
        },
      )}
    </svg>
  );
}

export default function Lesson36PremiumNumbersExercises() {
  const [step, setStep] = useState(0);
  const [tapped, setTapped] = useState<number[]>([]);
  const [selected, setSelected] =
    useState<number | null>(null);
  const [unitCount, setUnitCount] = useState(0);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] =
    useState<"idle" | "correct" | "wrong">("idle");
  const [completed, setCompleted] = useState(false);

  const [words, setWords] = useState<KaraokeWord[]>([]);
  const [activeWord, setActiveWord] = useState(-1);

  const questionAudioRef =
    useRef<HTMLAudioElement | null>(null);
  const answerTimerRef =
    useRef<number | null>(null);

  const question = QUESTIONS[step];
  const mission = question.mission;

  const audioUrl =
    `${AUDIO_BASE}/${question.audioKey}.mp3`;
  const karaokeUrl =
    `${AUDIO_BASE}/${question.audioKey}.json`;

  const clearAnswerTimer = useCallback(() => {
    if (answerTimerRef.current !== null) {
      window.clearTimeout(answerTimerRef.current);
      answerTimerRef.current = null;
    }
  }, []);

  const stopQuestionAudio = useCallback(() => {
    if (!questionAudioRef.current) return;

    questionAudioRef.current.pause();
    questionAudioRef.current.currentTime = 0;
  }, []);

  const nextQuestion = useCallback(() => {
    setSelected(null);
    setTapped([]);
    setUnitCount(0);
    setFeedback("idle");
    setLocked(false);

    setStep((current) => {
      if (current >= QUESTIONS.length - 1) {
        setCompleted(true);
        return current;
      }

      return current + 1;
    });
  }, []);

  const submitAnswer = useCallback(
    (value: number) => {
      if (locked) return;

      clearAnswerTimer();
      stopQuestionAudio();
      setSelected(value);
      setLocked(true);

      const correct =
        question.kind === "build"
          ? value === question.target
          : value === question.answer;

      if (correct) {
        setFeedback("correct");
        playEffect(CORRECT_SOUND);

        answerTimerRef.current =
          window.setTimeout(() => {
            answerTimerRef.current = null;
            nextQuestion();
          }, 950);

        return;
      }

      setFeedback("wrong");
      playEffect(RETRY_SOUND);

      answerTimerRef.current =
        window.setTimeout(() => {
          answerTimerRef.current = null;
          setSelected(null);
          setFeedback("idle");
          setLocked(false);
        }, 850);
    },
    [
      clearAnswerTimer,
      locked,
      nextQuestion,
      question,
      stopQuestionAudio,
    ],
  );

  const replayQuestion = useCallback(() => {
    const audio = questionAudioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setActiveWord(-1);
    audio.play().catch(() => {});
  }, []);

  useEffect(() => {
    setTapped([]);
    setSelected(null);
    setUnitCount(0);
    setLocked(false);
    setFeedback("idle");
  }, [step]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    stopQuestionAudio();
    setWords([]);
    setActiveWord(-1);

    fetch(karaokeUrl, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("karaoke");
        }
        return response.json();
      })
      .then((data: KaraokeWord[]) => {
        if (!cancelled && Array.isArray(data)) {
          setWords(data);
        }
      })
      .catch(() => {});

    const audio = new Audio(audioUrl);
    questionAudioRef.current = audio;

    const onTimeUpdate = () => {
      const time = audio.currentTime * 1000;

      setActiveWord(() => {
        let found = -1;

        for (let index = 0; index < words.length; index += 1) {
          if (time >= words[index].offset) {
            found = index;
          } else {
            break;
          }
        }

        return found;
      });
    };

    const onEnded = () => {
      setActiveWord(-1);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    const autoplayTimer = window.setTimeout(() => {
      audio.play().catch(() => {});
    }, 350);

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(autoplayTimer);
      audio.pause();
      audio.removeEventListener(
        "timeupdate",
        onTimeUpdate,
      );
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioUrl, karaokeUrl, step, stopQuestionAudio]);

  useEffect(() => {
    return () => {
      clearAnswerTimer();
      stopQuestionAudio();
    };
  }, [clearAnswerTimer, stopQuestionAudio]);

  const displayWords = useMemo(() => {
    if (words.length > 0) {
      return words.map((word) => word.text);
    }

    return question.prompt.split(/\s+/);
  }, [question.prompt, words]);

  const answerStyle = (value: number): CSSProperties => {
    let border = "4px solid #d7e4f2";
    let background = "#ffffff";

    if (selected === value && feedback === "correct") {
      border = "5px solid #42a879";
      background = "#e8f8ef";
    }

    if (selected === value && feedback === "wrong") {
      border = "5px solid #d86169";
      background = "#fff0f1";
    }

    return {
      ...styles.answerButton,
      border,
      background,
    };
  };

  if (completed) {
    return (
      <main dir="rtl" style={styles.page}>
        <section style={styles.completeCard}>
          <h1 style={styles.completeTitle}>
            أَحْسَنْتَ!
          </h1>

          <p style={styles.completeText}>
            أَكْمَلْتَ التَّمَارِينَ السِّتَّةَ عَشَرَ.
          </p>

          <button
            type="button"
            style={styles.returnButton}
            onClick={() => window.history.back()}
          >
            العودة إلى الدرس
          </button>
        </section>
      </main>
    );
  }

  return (
    <main dir="rtl" style={styles.page}>
      <section style={styles.exerciseCard}>
        <header style={styles.topBar}>
          <button
            type="button"
            style={styles.soundButton}
            onClick={replayQuestion}
            aria-label="إعادة سماع السؤال"
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 9V15H8L13 19V5L8 9H4Z"
                fill="#173f6a"
              />
              <path
                d="M16 9C17.3 10.4 17.3 13.6 16 15"
                stroke="#173f6a"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M18.5 6.5C21.5 9.5 21.5 14.5 18.5 17.5"
                stroke="#173f6a"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div
            dir="ltr"
            style={styles.missionProgress}
          >
            4 / {mission}
          </div>
        </header>

        <div style={styles.karaoke} aria-live="polite">
          {displayWords.map((word, index) => (
            <span
              key={`${question.id}-${index}`}
              style={{
                ...styles.karaokeWord,
                ...(index === activeWord
                  ? styles.activeKaraokeWord
                  : {}),
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {question.kind === "count" && (
          <>
            <CountScene
              question={question}
              tapped={tapped}
              onTap={(index) => {
                if (
                  locked ||
                  tapped.includes(index)
                ) {
                  return;
                }

                setTapped((current) => [
                  ...current,
                  index,
                ]);
              }}
            />

            <div style={styles.helper}>
              {question.helper}
            </div>

            <div style={styles.answersGrid}>
              {question.choices.map((value) => (
                <button
                  key={value}
                  type="button"
                  disabled={
                    locked ||
                    tapped.length < question.count
                  }
                  style={{
                    ...answerStyle(value),
                    opacity:
                      tapped.length < question.count
                        ? 0.45
                        : 1,
                  }}
                  onClick={() => submitAnswer(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </>
        )}

        {question.kind === "choice" && (
          <div style={styles.choiceArea}>
            <div style={styles.answersGrid}>
              {question.choices.map((value) => (
                <button
                  key={value}
                  type="button"
                  disabled={locked}
                  style={answerStyle(value)}
                  onClick={() => submitAnswer(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}

        {question.kind === "build" && (
          <div style={styles.buildArea}>
            <BaseTen value={10 + unitCount} />

            <div style={styles.currentNumber}>
              {10 + unitCount}
            </div>

            <div style={styles.buildControls}>
              <button
                type="button"
                style={styles.controlButton}
                disabled={locked || unitCount === 0}
                onClick={() =>
                  setUnitCount((value) =>
                    Math.max(0, value - 1),
                  )
                }
              >
                −
              </button>

              <button
                type="button"
                style={styles.checkButton}
                disabled={locked}
                onClick={() =>
                  submitAnswer(10 + unitCount)
                }
              >
                تحقّق
              </button>

              <button
                type="button"
                style={styles.controlButton}
                disabled={locked || unitCount === 9}
                onClick={() =>
                  setUnitCount((value) =>
                    Math.min(9, value + 1),
                  )
                }
              >
                +
              </button>
            </div>
          </div>
        )}

        {question.kind === "match" && (
          <div style={styles.matchGrid}>
            {question.choices.map((value) => (
              <button
                key={value}
                type="button"
                disabled={locked}
                style={{
                  ...styles.matchButton,
                  ...(selected === value &&
                  feedback === "correct"
                    ? styles.correctMatch
                    : {}),
                  ...(selected === value &&
                  feedback === "wrong"
                    ? styles.wrongMatch
                    : {}),
                }}
                onClick={() => submitAnswer(value)}
              >
                <BaseTen value={value} compact />
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100dvh",
    padding: "16px",
    display: "grid",
    placeItems: "center",
    background:
      "radial-gradient(circle at top,#f8fcff 0,#eaf3fb 55%,#dceaf6 100%)",
    fontFamily:
      'system-ui,-apple-system,"Segoe UI",Tahoma,Arial,sans-serif',
    color: "#173f6a",
  },

  exerciseCard: {
    width: "min(760px,100%)",
    minHeight: "calc(100dvh - 32px)",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    border: "1px solid #d5e3f0",
    borderRadius: "32px",
    background: "rgba(255,255,255,.96)",
    boxShadow: "0 18px 50px rgba(27,67,105,.13)",
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    direction: "ltr",
  },

  soundButton: {
    width: "66px",
    height: "66px",
    display: "grid",
    placeItems: "center",
    border: "4px solid #ffffff",
    borderRadius: "50%",
    background: "#f3c54f",
    boxShadow: "0 8px 20px rgba(25,62,98,.14)",
    cursor: "pointer",
  },

  missionProgress: {
    minWidth: "112px",
    padding: "10px 18px",
    border: "4px solid #f3c54f",
    borderRadius: "22px",
    background: "#ffffff",
    fontSize: "30px",
    fontWeight: 950,
    textAlign: "center",
    color: "#173f6a",
  },

  karaoke: {
    minHeight: "76px",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "7px",
    borderRadius: "22px",
    background: "#eef5fb",
    fontSize: "clamp(25px,6vw,39px)",
    fontWeight: 950,
    lineHeight: 1.7,
    textAlign: "center",
  },

  karaokeWord: {
    padding: "0 3px",
    borderRadius: "8px",
    transition: "all .15s ease",
  },

  activeKaraokeWord: {
    color: "#ffffff",
    background: "#d8a72f",
    boxShadow: "0 0 14px rgba(216,167,47,.45)",
    transform: "scale(1.06)",
  },

  sceneSvg: {
    width: "100%",
    maxHeight: "48dvh",
    display: "block",
    touchAction: "manipulation",
  },

  helper: {
    width: "fit-content",
    maxWidth: "100%",
    margin: "0 auto",
    padding: "10px 18px",
    borderRadius: "999px",
    background: "#eef5fb",
    color: "#173f6a",
    fontSize: "clamp(17px,4vw,21px)",
    fontWeight: 900,
    textAlign: "center",
  },

  answersGrid: {
    marginTop: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(3,minmax(0,1fr))",
    gap: "12px",
    direction: "ltr",
  },

  answerButton: {
    minHeight: "82px",
    borderRadius: "22px",
    color: "#173f6a",
    fontSize: "clamp(34px,9vw,56px)",
    fontWeight: 950,
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(25,62,98,.09)",
  },

  choiceArea: {
    flex: 1,
    display: "grid",
    alignItems: "center",
  },

  buildArea: {
    flex: 1,
    display: "grid",
    alignContent: "center",
    justifyItems: "center",
    gap: "22px",
  },

  baseTen: {
    display: "grid",
    justifyItems: "center",
    gap: "14px",
  },

  tenRod: {
    padding: "8px",
    display: "grid",
    gap: "4px",
    borderRadius: "13px",
    background: "#d9a933",
  },

  tenCell: {
    width: "100%",
    aspectRatio: "1",
    borderRadius: "4px",
    background: "#ffe597",
    border: "2px solid #ffffff",
  },

  unitsRow: {
    minHeight: "26px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "5px",
  },

  unitCell: {
    display: "block",
    borderRadius: "5px",
    background: "#69a1d6",
    border: "2px solid #ffffff",
    boxShadow: "0 2px 5px rgba(28,66,102,.16)",
  },

  currentNumber: {
    fontSize: "58px",
    fontWeight: 950,
    color: "#173f6a",
  },

  buildControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    direction: "ltr",
  },

  controlButton: {
    width: "72px",
    height: "72px",
    border: "4px solid #d5e3f0",
    borderRadius: "20px",
    background: "#ffffff",
    color: "#173f6a",
    fontSize: "45px",
    fontWeight: 950,
  },

  checkButton: {
    minWidth: "145px",
    minHeight: "72px",
    padding: "10px 20px",
    border: "4px solid #f3c54f",
    borderRadius: "20px",
    background: "#fff9df",
    color: "#173f6a",
    fontSize: "25px",
    fontWeight: 950,
  },

  matchGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(3,minmax(0,1fr))",
    alignItems: "center",
    gap: "12px",
    direction: "ltr",
  },

  matchButton: {
    minHeight: "190px",
    padding: "16px 8px",
    border: "4px solid #d5e3f0",
    borderRadius: "24px",
    background: "#ffffff",
    cursor: "pointer",
  },

  correctMatch: {
    border: "5px solid #42a879",
    background: "#e8f8ef",
  },

  wrongMatch: {
    border: "5px solid #d86169",
    background: "#fff0f1",
  },

  completeCard: {
    width: "min(520px,100%)",
    padding: "42px 24px",
    display: "grid",
    justifyItems: "center",
    gap: "20px",
    borderRadius: "30px",
    background: "#ffffff",
    boxShadow: "0 20px 55px rgba(27,67,105,.15)",
    textAlign: "center",
  },

  completeTitle: {
    margin: 0,
    color: "#287c59",
    fontSize: "48px",
    fontWeight: 950,
  },

  completeText: {
    margin: 0,
    color: "#173f6a",
    fontSize: "24px",
    fontWeight: 850,
    lineHeight: 1.7,
  },

  returnButton: {
    minHeight: "62px",
    padding: "10px 24px",
    border: 0,
    borderRadius: "18px",
    background: "#173f6a",
    color: "#ffffff",
    fontSize: "21px",
    fontWeight: 900,
  },
};
TSX

npm run build

PORT=5173
PID_FILE="$HOME/.lesson36_preview.pid"
LOG_FILE="$HOME/lesson36_preview.log"

if [ -f "$PID_FILE" ]; then
  OLD_PID="$(cat "$PID_FILE" 2>/dev/null || true)"
  [ -z "$OLD_PID" ] || kill "$OLD_PID" 2>/dev/null || true
fi

pkill -f "vite.*--port $PORT" 2>/dev/null || true
rm -rf node_modules/.vite
sleep 2

npm run dev -- --host 0.0.0.0 --port "$PORT" >"$LOG_FILE" 2>&1 &
PID=$!
echo "$PID" >"$PID_FILE"

sleep 4

kill -0 "$PID" 2>/dev/null || {
  cat "$LOG_FILE"
  exit 1
}

URL="http://127.0.0.1:$PORT/lesson-v2/36/exercises?final=$(date +%s)"

echo
echo "✅ تم تركيب المحرك المستقل النهائي للدرس 36."
echo "✅ 4 محركات × 4 أسئلة، مع انتقال مباشر مضمون."
echo "✅ البناء والمعاينة يعملان."
echo "النسخة الاحتياطية: $BACKUP"
echo "$URL"

termux-open-url "$URL" 2>/dev/null || true
