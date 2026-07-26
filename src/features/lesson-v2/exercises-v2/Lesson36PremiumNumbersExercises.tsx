import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import LessonCompleteV2 from "../components/LessonCompleteV2";
import UnifiedExerciseFeedbackV2 from "../components/UnifiedExerciseFeedbackV2";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_36_amusement_sorting/exercises";

const CORRECT_SOUND = "/audio/v2_feedback/correct.mp3";
const RETRY_SOUND = "/audio/v2_feedback/retry.mp3";

type FeedbackState = "idle" | "correct" | "wrong";

type KaraokeWord = {
  text: string;
  offset: number;
  duration: number;
};

type ShapeKind =
  | "square"
  | "heart"
  | "triangle"
  | "diamond";

type QuestionKind =
  | "count"
  | "identify"
  | "build"
  | "composition";

type Lesson36Question = {
  id: string;
  mission: 1 | 2 | 3 | 4;
  kind: QuestionKind;

  prompt: string;
  audioKey: string;

  choices: string[];
  answer: string;

  itemCount?: number;
  itemEmoji?: string;

  target?: number;
  shapeKind?: ShapeKind;
};

const QUESTIONS: Lesson36Question[] = [
  {
    id: "m1_q1",
    mission: 1,
    kind: "count",
    prompt: "كَمْ بَالُونًا فِي الْمَجْمُوعَةِ؟",
    audioKey: "m1_q1_count_12",
    choices: ["12", "11", "13"],
    answer: "12",
    itemCount: 12,
    itemEmoji: "🎈",
  },
  {
    id: "m1_q2",
    mission: 1,
    kind: "count",
    prompt: "كَمْ نَجْمَةً فِي الْمَجْمُوعَةِ؟",
    audioKey: "m1_q2_count_15",
    choices: ["14", "16", "15"],
    answer: "15",
    itemCount: 15,
    itemEmoji: "⭐",
  },
  {
    id: "m1_q3",
    mission: 1,
    kind: "count",
    prompt: "كَمْ كُرَةً فِي الْمَجْمُوعَةِ؟",
    audioKey: "m1_q3_count_17",
    choices: ["18", "17", "16"],
    answer: "17",
    itemCount: 17,
    itemEmoji: "⚽",
  },
  {
    id: "m1_q4",
    mission: 1,
    kind: "count",
    prompt: "كَمْ هَدِيَّةً فِي الْمَجْمُوعَةِ؟",
    audioKey: "m1_q4_count_19",
    choices: ["18", "17", "19"],
    answer: "19",
    itemCount: 19,
    itemEmoji: "🎁",
  },

  {
    id: "m2_q1",
    mission: 2,
    kind: "identify",
    prompt: "أَيْنَ الْعَدَدُ أَحَدَ عَشَرَ؟",
    audioKey: "m2_q1_choose_11",
    choices: ["12", "11", "10"],
    answer: "11",
    target: 11,
  },
  {
    id: "m2_q2",
    mission: 2,
    kind: "identify",
    prompt: "أَيْنَ الْعَدَدُ أَرْبَعَةَ عَشَرَ؟",
    audioKey: "m2_q2_choose_14",
    choices: ["14", "13", "15"],
    answer: "14",
    target: 14,
  },
  {
    id: "m2_q3",
    mission: 2,
    kind: "identify",
    prompt: "أَيْنَ الْعَدَدُ سَبْعَةَ عَشَرَ؟",
    audioKey: "m2_q3_choose_17",
    choices: ["18", "16", "17"],
    answer: "17",
    target: 17,
  },
  {
    id: "m2_q4",
    mission: 2,
    kind: "identify",
    prompt: "أَيْنَ الْعَدَدُ تِسْعَةَ عَشَرَ؟",
    audioKey: "m2_q4_choose_19",
    choices: ["17", "19", "18"],
    answer: "19",
    target: 19,
  },

  {
    id: "m3_q1",
    mission: 3,
    kind: "build",
    prompt: "كَوِّنِ الْعَدَدَ اثْنَيْ عَشَرَ.",
    audioKey: "m3_q1_build_12",
    choices: ["3", "1", "2"],
    answer: "2",
    target: 12,
    shapeKind: "square",
  },
  {
    id: "m3_q2",
    mission: 3,
    kind: "build",
    prompt: "كَوِّنِ الْعَدَدَ أَرْبَعَةَ عَشَرَ.",
    audioKey: "m3_q2_build_14",
    choices: ["5", "4", "3"],
    answer: "4",
    target: 14,
    shapeKind: "heart",
  },
  {
    id: "m3_q3",
    mission: 3,
    kind: "build",
    prompt: "كَوِّنِ الْعَدَدَ سِتَّةَ عَشَرَ.",
    audioKey: "m3_q3_build_16",
    choices: ["6", "7", "5"],
    answer: "6",
    target: 16,
    shapeKind: "triangle",
  },
  {
    id: "m3_q4",
    mission: 3,
    kind: "build",
    prompt: "كَوِّنِ الْعَدَدَ ثَمَانِيَةَ عَشَرَ.",
    audioKey: "m3_q4_build_18",
    choices: ["7", "9", "8"],
    answer: "8",
    target: 18,
    shapeKind: "diamond",
  },

  {
    id: "m4_q1",
    mission: 4,
    kind: "composition",
    prompt: "أَيُّ تَمْثِيلٍ يُسَاوِي ثَلَاثَةَ عَشَرَ؟",
    audioKey: "m4_q1_match_13",
    choices: [
      "10 + 4 = 14",
      "10 + 3 = 13",
      "10 + 2 = 12",
    ],
    answer: "10 + 3 = 13",
    target: 13,
  },
  {
    id: "m4_q2",
    mission: 4,
    kind: "composition",
    prompt: "أَيُّ تَمْثِيلٍ يُسَاوِي خَمْسَةَ عَشَرَ؟",
    audioKey: "m4_q2_match_15",
    choices: [
      "10 + 5 = 15",
      "10 + 6 = 16",
      "10 + 4 = 14",
    ],
    answer: "10 + 5 = 15",
    target: 15,
  },
  {
    id: "m4_q3",
    mission: 4,
    kind: "composition",
    prompt: "أَيُّ تَمْثِيلٍ يُسَاوِي سَبْعَةَ عَشَرَ؟",
    audioKey: "m4_q3_match_17",
    choices: [
      "10 + 8 = 18",
      "10 + 6 = 16",
      "10 + 7 = 17",
    ],
    answer: "10 + 7 = 17",
    target: 17,
  },
  {
    id: "m4_q4",
    mission: 4,
    kind: "composition",
    prompt: "أَيُّ تَمْثِيلٍ يُسَاوِي تِسْعَةَ عَشَرَ؟",
    audioKey: "m4_q4_match_19",
    choices: [
      "10 + 8 = 18",
      "10 + 9 = 19",
      "10 + 7 = 17",
    ],
    answer: "10 + 9 = 19",
    target: 19,
  },
];

const MISSION_TITLES: Record<1 | 2 | 3 | 4, string> = {
  1: "أَعُدُّ الْعَنَاصِرَ",
  2: "أَتَعَرَّفُ عَلَى الْعَدَدِ",
  3: "أُكَوِّنُ الْعَدَدَ",
  4: "أَخْتَارُ التَّمْثِيلَ الصَّحِيحَ",
};

const SHAPE_COLORS: Record<
  ShapeKind,
  {
    main: string;
    light: string;
    shadow: string;
  }
> = {
  square: {
    main: "#2878E8",
    light: "#65A7FF",
    shadow: "rgba(40,120,232,.28)",
  },
  heart: {
    main: "#E74765",
    light: "#FF7890",
    shadow: "rgba(231,71,101,.28)",
  },
  triangle: {
    main: "#7C4DE8",
    light: "#A681FF",
    shadow: "rgba(124,77,232,.28)",
  },
  diamond: {
    main: "#E99A18",
    light: "#FFC45B",
    shadow: "rgba(233,154,24,.3)",
  },
};

function ShapeIcon({
  kind,
  size = 54,
  light = false,
}: {
  kind: ShapeKind;
  size?: number;
  light?: boolean;
}) {
  const palette = SHAPE_COLORS[kind];
  const fill = light ? palette.light : palette.main;

  return (
    <svg
      className="l36-shape-svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      style={{
        filter: `drop-shadow(0 6px 5px ${palette.shadow})`,
      }}
    >
      {kind === "square" && (
        <rect
          x="11"
          y="11"
          width="78"
          height="78"
          rx="14"
          fill={fill}
        />
      )}

      {kind === "heart" && (
        <path
          d="
            M50 89
            C40 80 10 61 10 33
            C10 16 22 7 36 7
            C44 7 49 12 50 16
            C51 12 56 7 64 7
            C78 7 90 16 90 33
            C90 61 60 80 50 89
            Z
          "
          fill={fill}
        />
      )}

      {kind === "triangle" && (
        <polygon
          points="50,7 94,88 6,88"
          fill={fill}
          strokeLinejoin="round"
        />
      )}

      {kind === "diamond" && (
        <polygon
          points="50,5 95,50 50,95 5,50"
          fill={fill}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function playSound(path: string): void {
  try {
    const audio = new Audio(path);
    audio.volume = 0.92;
    void audio.play();
  } catch {
    // يبقى التمرين فعالًا إن منع المتصفح تشغيل الصوت.
  }
}

function readNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : null;
}

function convertTime(value: number): number {
  if (value >= 1_000_000) {
    return value / 10_000_000;
  }

  if (value >= 1_000) {
    return value / 1_000;
  }

  return value;
}

function parseKaraoke(raw: unknown): KaraokeWord[] {
  const record =
    raw && typeof raw === "object"
      ? (raw as Record<string, unknown>)
      : null;

  const values = Array.isArray(raw)
    ? raw
    : Array.isArray(record?.words)
      ? record.words
      : Array.isArray(record?.boundaries)
        ? record.boundaries
        : Array.isArray(record?.WordBoundary)
          ? record.WordBoundary
          : [];

  return values
    .map((value): KaraokeWord | null => {
      if (!value || typeof value !== "object") {
        return null;
      }

      const item = value as Record<string, unknown>;

      const text =
        item.text ??
        item.word ??
        item.Text;

      const rawOffset = readNumber(
        item.offset ??
        item.start ??
        item.audioOffset,
      );

      const rawDuration = readNumber(
        item.duration ??
        item.length ??
        item.audioDuration,
      );

      const rawEnd = readNumber(item.end);

      if (
        typeof text !== "string" ||
        rawOffset === null
      ) {
        return null;
      }

      const offset = convertTime(rawOffset);

      const duration =
        rawDuration !== null
          ? Math.max(
              0.07,
              convertTime(rawDuration),
            )
          : rawEnd !== null
            ? Math.max(
                0.07,
                convertTime(rawEnd) - offset,
              )
            : 0.38;

      return {
        text,
        offset,
        duration,
      };
    })
    .filter(
      (value): value is KaraokeWord =>
        value !== null,
    )
    .sort(
      (first, second) =>
        first.offset - second.offset,
    );
}

export type Lesson36PremiumNumbersExercisesProps =
  Record<string, unknown>;

export default function Lesson36PremiumNumbersExercises(
  _props: Lesson36PremiumNumbersExercisesProps,
) {
  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [selectedChoice, setSelectedChoice] =
    useState<string | null>(null);

  const [feedback, setFeedback] =
    useState<FeedbackState>("idle");

  const [completed, setCompleted] =
    useState(false);

  const [karaokeWords, setKaraokeWords] =
    useState<KaraokeWord[]>([]);

  const [activeWord, setActiveWord] =
    useState(-1);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const feedbackTimerRef =
    useRef<number | null>(null);

  const question = QUESTIONS[questionIndex];

  const audioSrc =
    `${AUDIO_BASE}/${question.audioKey}.mp3`;

  const karaokeSrc =
    `${AUDIO_BASE}/${question.audioKey}.json`;

  const backgroundImage =
    `/lessons/v2/lesson36/s${question.mission}.webp`;

  const clearFeedbackTimer = useCallback(() => {
    if (feedbackTimerRef.current !== null) {
      window.clearTimeout(
        feedbackTimerRef.current,
      );

      feedbackTimerRef.current = null;
    }
  }, []);

  const playQuestionAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    setActiveWord(-1);

    void audio.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (completed) {
      return;
    }

    clearFeedbackTimer();

    setSelectedChoice(null);
    setFeedback("idle");
    setActiveWord(-1);

    let cancelled = false;

    void fetch(karaokeSrc)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Karaoke ${response.status}`,
          );
        }

        return response.json() as Promise<unknown>;
      })
      .then((raw) => {
        if (!cancelled) {
          setKaraokeWords(
            parseKaraoke(raw),
          );
        }
      })
      .catch(() => {
        if (!cancelled) {
          setKaraokeWords([]);
        }
      });

    const autoplay =
      window.setTimeout(
        playQuestionAudio,
        350,
      );

    return () => {
      cancelled = true;

      window.clearTimeout(autoplay);
      clearFeedbackTimer();
    };
  }, [
    clearFeedbackTimer,
    completed,
    karaokeSrc,
    playQuestionAudio,
  ]);

  const updateKaraoke = useCallback(() => {
    const audio = audioRef.current;

    if (
      !audio ||
      karaokeWords.length === 0
    ) {
      setActiveWord(-1);
      return;
    }

    const currentTime = audio.currentTime;

    const currentIndex =
      karaokeWords.findIndex(
        (word) =>
          currentTime >= word.offset &&
          currentTime <
            word.offset + word.duration,
      );

    setActiveWord(currentIndex);
  }, [karaokeWords]);

  const advanceQuestion = useCallback(() => {
    if (
      questionIndex + 1 >=
      QUESTIONS.length
    ) {
      setCompleted(true);
      return;
    }

    setQuestionIndex(
      (current) => current + 1,
    );
  }, [questionIndex]);

  const chooseAnswer = useCallback(
    (choice: string) => {
      if (feedback !== "idle") {
        return;
      }

      setSelectedChoice(choice);

      if (choice === question.answer) {
        setFeedback("correct");
        playSound(CORRECT_SOUND);

        feedbackTimerRef.current =
          window.setTimeout(() => {
            setFeedback("idle");
            advanceQuestion();
          }, 1150);

        return;
      }

      setFeedback("wrong");
      playSound(RETRY_SOUND);

      feedbackTimerRef.current =
        window.setTimeout(() => {
          setFeedback("idle");
          setSelectedChoice(null);
        }, 1050);
    },
    [
      advanceQuestion,
      feedback,
      question.answer,
    ],
  );

  const replayExercises = useCallback(() => {
    clearFeedbackTimer();

    setQuestionIndex(0);
    setSelectedChoice(null);
    setFeedback("idle");
    setCompleted(false);
    setActiveWord(-1);
  }, [clearFeedbackTimer]);

  if (completed) {
    return (
      <LessonCompleteV2
        message="أَكْمَلْتَ تَمَارِينَ الْأَعْدَادِ مِنْ 11 إِلَى 19."
        onReplay={replayExercises}
        nextPath="/lesson-v2/37"
        nextLabel="الدَّرْسُ التَّالِي  ←"
        quizPath={null}
      />
    );
  }

  const renderCountVisual = () => {
    const count =
      question.itemCount ?? 0;

    const emoji =
      question.itemEmoji ?? "";

    return (
      <div
        className="l36-visual-card"
        aria-label={`${count} عناصر`}
      >
        <div className="l36-count-grid">
          {Array.from(
            { length: count },
            (_, index) => (
              <span
                key={`${question.id}-${index}`}
                className="l36-count-item"
                aria-hidden="true"
              >
                {emoji}
              </span>
            ),
          )}
        </div>
      </div>
    );
  };

  const renderIdentifyVisual = () => (
    <div className="l36-listen-card">
      <div
        className="l36-listen-symbol"
        aria-hidden="true"
      >
        ؟
      </div>

      <div className="l36-listen-text">
        اِسْتَمِعْ جَيِّدًا ثُمَّ اخْتَرِ
      </div>
    </div>
  );

  const renderBuildVisual = () => {
    const shapeKind =
      question.shapeKind ?? "square";

    return (
      <div className="l36-build-area">
        <div className="l36-equation-strip">
          <span>10</span>
          <span className="l36-equation-plus">
            +
          </span>
          <span className="l36-equation-missing">
            ؟
          </span>
          <span>=</span>
          <span>{question.target}</span>
        </div>

        <div className="l36-ten-frame-card">
          <div className="l36-frame-label">
            عَشَرَةٌ
          </div>

          <div className="l36-ten-frame">
            {Array.from(
              { length: 10 },
              (_, index) => (
                <ShapeIcon
                  key={`${question.id}-ten-${index}`}
                  kind={shapeKind}
                  size={56}
                  light={index >= 5}
                />
              ),
            )}
          </div>
        </div>

        <div className="l36-build-instruction">
          اِخْتَرْ مَجْمُوعَةَ الْآحَادِ
          الْمُنَاسِبَةَ
        </div>
      </div>
    );
  };

  const renderCompositionVisual = () => (
    <div className="l36-target-card">
      <div className="l36-target-caption">
        الْعَدَدُ الْمَطْلُوبُ
      </div>

      <div className="l36-target-number">
        {question.target}
      </div>
    </div>
  );

  const renderTextOptions = () => (
    <div
      className={
        question.kind === "composition"
          ? "l36-options l36-equation-options"
          : "l36-options"
      }
      role="group"
      aria-label="خيارات الإجابة"
    >
      {question.choices.map((choice) => {
        const selected =
          selectedChoice === choice;

        return (
          <button
            key={`${question.id}-${choice}`}
            type="button"
            className={
              `l36-option${
                selected
                  ? " is-selected"
                  : ""
              }`
            }
            onClick={() =>
              chooseAnswer(choice)
            }
            disabled={feedback !== "idle"}
          >
            {choice}
          </button>
        );
      })}
    </div>
  );

  const renderShapeOptions = () => {
    const shapeKind =
      question.shapeKind ?? "square";

    return (
      <div
        className="l36-shape-options"
        role="group"
        aria-label="مجموعات الآحاد"
      >
        {question.choices.map((choice) => {
          const count = Number(choice);

          const selected =
            selectedChoice === choice;

          return (
            <button
              key={`${question.id}-${choice}`}
              type="button"
              className={
                `l36-shape-option${
                  selected
                    ? " is-selected"
                    : ""
                }`
              }
              onClick={() =>
                chooseAnswer(choice)
              }
              disabled={
                feedback !== "idle"
              }
            >
              <span className="l36-shape-option-number">
                {choice}
              </span>

              <span className="l36-shape-option-grid">
                {Array.from(
                  { length: count },
                  (_, index) => (
                    <ShapeIcon
                      key={
                        `${question.id}-${choice}-${index}`
                      }
                      kind={shapeKind}
                      size={42}
                      light={
                        index % 2 === 1
                      }
                    />
                  ),
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <main
      className="l36-page"
      dir="rtl"
    >
      <style>{`
        .l36-page {
          --navy: #17365d;
          --navy-deep: #102846;
          --gold: #e8a020;
          --gold-light: #fff1c8;
          --cream: #fff8ec;
          --green: #1fa463;
          --border: rgba(23, 54, 93, 0.13);

          position: relative;
          isolation: isolate;

          width: 100%;
          min-height: 100dvh;
          overflow-x: hidden;

          box-sizing: border-box;

          padding:
            max(12px, env(safe-area-inset-top))
            10px
            calc(
              135px +
              env(safe-area-inset-bottom)
            );

          color: var(--navy);

          font-family:
            "Tajawal",
            "Noto Kufi Arabic",
            Arial,
            sans-serif;
        }

        .l36-background {
          position: fixed;
          inset: 0;
          z-index: -3;

          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;

          filter: blur(1.5px);
          transform: scale(1.025);
        }

        .l36-background-overlay {
          position: fixed;
          inset: 0;
          z-index: -2;

          background:
            linear-gradient(
              180deg,
              rgba(255, 253, 244, 0.45),
              rgba(255, 245, 211, 0.92)
            );
        }

        .l36-shell {
          width: min(100%, 760px);
          margin: 0 auto;

          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .l36-header-row {
          width: 100%;
          min-height: 62px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .l36-missions {
          display: flex;
          direction: ltr;
          align-items: center;
          gap: 8px;

          padding: 6px 12px;

          border: 3px solid
            rgba(232, 160, 32, 0.45);

          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.91);

          box-shadow:
            0 6px 16px
            rgba(65, 45, 0, 0.12);
        }

        .l36-mission {
          width: 42px;
          height: 42px;

          display: grid;
          place-items: center;

          border: 3px solid #d9e0e8;
          border-radius: 50%;

          background: #f1f4f7;
          color: #8c99a8;

          font-size: 20px;
          font-weight: 1000;

          transition:
            transform 160ms ease,
            color 160ms ease,
            border-color 160ms ease,
            background 160ms ease;
        }

        .l36-mission.is-active {
          border-color: #ffffff;
          background:
            linear-gradient(
              145deg,
              #f6bd42,
              #e4960e
            );

          color: #ffffff;

          box-shadow:
            0 7px 16px
            rgba(232, 160, 32, 0.3);

          transform: scale(1.12);
        }

        .l36-audio-button {
          width: 58px;
          height: 58px;
          flex: 0 0 58px;

          display: grid;
          place-items: center;

          border: 4px solid #ffffff;
          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #f3b52f,
              #df8f0d
            );

          color: #ffffff;

          box-shadow:
            0 7px 17px
            rgba(106, 67, 0, 0.23);

          font-size: 25px;
          cursor: pointer;
        }

        .l36-audio-button:active {
          transform: scale(0.95);
        }

        .l36-title {
          align-self: center;

          margin: 0;
          padding: 11px 26px;

          border: 3px solid var(--gold);
          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.97);

          box-shadow:
            0 5px 14px
            rgba(75, 49, 0, 0.1);

          text-align: center;
          color: var(--navy);

          font-size:
            clamp(1.12rem, 4.8vw, 1.55rem);

          line-height: 1.45;
          font-weight: 1000;
        }

        .l36-question-card {
          width: 100%;
          min-height: 80px;

          display: flex;
          align-items: center;
          justify-content: center;

          box-sizing: border-box;
          padding: 13px 18px;

          border: 3px solid var(--gold);
          border-radius: 27px;

          background:
            rgba(255, 255, 255, 0.98);

          box-shadow:
            0 6px 17px
            rgba(75, 49, 0, 0.11);

          text-align: center;
        }

        .l36-question {
          margin: 0;

          color: var(--navy);

          font-size:
            clamp(1.25rem, 5.4vw, 2rem);

          line-height: 1.75;
          font-weight: 1000;
        }

        .l36-karaoke {
          min-height: 32px;

          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;

          gap: 5px;

          padding: 0 6px;
        }

        .l36-karaoke-word {
          padding: 2px 6px;
          border-radius: 8px;

          color: #607188;

          font-size:
            clamp(0.93rem, 3.7vw, 1.18rem);

          line-height: 1.5;
          font-weight: 900;

          transition:
            color 100ms ease,
            background 100ms ease,
            transform 100ms ease;
        }

        .l36-karaoke-word.is-active {
          color: #724b00;
          background: #ffe49a;
          transform: translateY(-2px);
        }

        .l36-visual-card,
        .l36-listen-card,
        .l36-build-area,
        .l36-target-card {
          width: 100%;
          box-sizing: border-box;

          border: 4px solid var(--gold);
          border-radius: 32px;

          background:
            rgba(255, 255, 255, 0.97);

          box-shadow:
            0 10px 24px
            rgba(75, 49, 0, 0.14);
        }

        .l36-visual-card {
          min-height: 270px;
          padding: 17px;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;
        }

        .l36-count-grid {
          width: min(100%, 570px);

          display: grid;
          grid-template-columns:
            repeat(5, minmax(0, 1fr));

          align-items: center;
          justify-items: center;

          gap:
            clamp(5px, 1.3vh, 11px)
            clamp(7px, 2vw, 16px);
        }

        .l36-count-item {
          display: grid;
          place-items: center;

          width: min(100%, 73px);
          aspect-ratio: 1;

          font-size:
            clamp(
              2.25rem,
              min(9vw, 7vh),
              4.2rem
            );

          line-height: 1;

          filter:
            drop-shadow(
              0 5px 4px
              rgba(0, 0, 0, 0.16)
            );
        }

        .l36-listen-card {
          min-height: 245px;
          padding: 24px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 14px;
        }

        .l36-listen-symbol {
          width: 132px;
          height: 132px;

          display: grid;
          place-items: center;

          border: 7px solid #ffffff;
          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #447dc2,
              #245794
            );

          color: #ffffff;

          box-shadow:
            0 13px 27px
            rgba(36, 87, 148, 0.3);

          font-size: 78px;
          line-height: 1;
          font-weight: 1000;
        }

        .l36-listen-text {
          text-align: center;
          font-size:
            clamp(1.12rem, 4.5vw, 1.55rem);
          font-weight: 950;
        }

        .l36-build-area {
          padding: 15px;

          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .l36-equation-strip {
          direction: ltr;

          width: 100%;
          min-height: 82px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 13px;

          box-sizing: border-box;
          padding: 10px 14px;

          border: 3px solid #d8e1eb;
          border-radius: 23px;

          background:
            linear-gradient(
              180deg,
              #ffffff,
              #f6f9fc
            );

          color: var(--navy);

          font-size:
            clamp(2rem, 9.5vw, 3.8rem);

          line-height: 1;
          font-weight: 1000;
        }

        .l36-equation-plus {
          color: var(--green);
        }

        .l36-equation-missing {
          min-width: 58px;
          min-height: 58px;

          display: grid;
          place-items: center;

          border: 4px dashed var(--gold);
          border-radius: 16px;

          background: #fff9e9;
          color: #b46f00;
        }

        .l36-ten-frame-card {
          width: 100%;
          box-sizing: border-box;
          padding: 13px;

          border: 3px solid #dce4ed;
          border-radius: 25px;

          background: #ffffff;
        }

        .l36-frame-label {
          margin-bottom: 10px;

          text-align: center;
          color: var(--navy);

          font-size:
            clamp(1.08rem, 4vw, 1.4rem);

          font-weight: 1000;
        }

        .l36-ten-frame {
          width: min(100%, 430px);
          margin: 0 auto;

          display: grid;
          grid-template-columns:
            repeat(5, minmax(0, 1fr));

          justify-items: center;
          align-items: center;

          gap: 9px 11px;
        }

        .l36-build-instruction {
          text-align: center;
          color: #52667e;

          font-size:
            clamp(1rem, 4vw, 1.3rem);

          line-height: 1.55;
          font-weight: 950;
        }

        .l36-target-card {
          min-height: 240px;
          padding: 22px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 13px;
        }

        .l36-target-caption {
          text-align: center;
          color: #52667e;

          font-size:
            clamp(1.08rem, 4.3vw, 1.45rem);

          font-weight: 950;
        }

        .l36-target-number {
          width: 142px;
          height: 142px;

          display: grid;
          place-items: center;

          border: 7px solid #ffffff;
          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #f2b734,
              #dd8b0b
            );

          color: #ffffff;

          box-shadow:
            0 14px 29px
            rgba(126, 78, 0, 0.27);

          font-size:
            clamp(4.2rem, 19vw, 6.5rem);

          line-height: 1;
          font-weight: 1000;
        }

        .l36-options {
          width: 100%;

          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 9px;
        }

        .l36-option {
          min-width: 0;
          min-height: 84px;

          box-sizing: border-box;
          padding: 9px 6px;

          border: 4px solid var(--gold);
          border-radius: 23px;

          background:
            linear-gradient(
              180deg,
              #ffffff,
              #fffdf7
            );

          color: var(--navy);

          box-shadow:
            0 7px 16px
            rgba(75, 49, 0, 0.12);

          font-size:
            clamp(1.65rem, 7vw, 2.9rem);

          line-height: 1.2;
          font-weight: 1000;

          cursor: pointer;

          transition:
            transform 110ms ease,
            border-color 110ms ease,
            background 110ms ease;
        }

        .l36-option:active {
          transform: scale(0.97);
        }

        .l36-option.is-selected {
          border-color: #275e9c;
          background: #eef6ff;
        }

        .l36-option:disabled,
        .l36-shape-option:disabled {
          cursor: default;
        }

        .l36-equation-options {
          grid-template-columns: 1fr;
        }

        .l36-equation-options
        .l36-option {
          min-height: 78px;
          direction: ltr;

          font-size:
            clamp(1.38rem, 6vw, 2.05rem);
        }

        .l36-shape-options {
          width: 100%;

          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .l36-shape-option {
          position: relative;

          width: 100%;
          min-height: 106px;

          box-sizing: border-box;
          padding: 11px 16px;

          display: grid;
          grid-template-columns: 58px 1fr;
          align-items: center;
          gap: 14px;

          border: 4px solid var(--gold);
          border-radius: 25px;

          background:
            linear-gradient(
              180deg,
              #ffffff,
              #fffdf7
            );

          box-shadow:
            0 8px 18px
            rgba(75, 49, 0, 0.12);

          cursor: pointer;

          transition:
            transform 110ms ease,
            border-color 110ms ease,
            background 110ms ease;
        }

        .l36-shape-option:active {
          transform: scale(0.985);
        }

        .l36-shape-option.is-selected {
          border-color: #275e9c;
          background: #eef6ff;
        }

        .l36-shape-option-number {
          width: 56px;
          height: 56px;

          display: grid;
          place-items: center;

          border-radius: 17px;

          background: var(--navy);
          color: #ffffff;

          font-size: 29px;
          line-height: 1;
          font-weight: 1000;
        }

        .l36-shape-option-grid {
          display: grid;
          grid-template-columns:
            repeat(5, 44px);

          justify-content: center;
          align-items: center;

          gap: 5px 7px;
        }

        @media (max-width: 520px) {
          .l36-page {
            padding:
              max(
                8px,
                env(safe-area-inset-top)
              )
              8px
              calc(
                130px +
                env(safe-area-inset-bottom)
              );
          }

          .l36-shell {
            gap: 10px;
          }

          .l36-missions {
            gap: 5px;
            padding: 5px 8px;
          }

          .l36-mission {
            width: 37px;
            height: 37px;
            font-size: 18px;
          }

          .l36-audio-button {
            width: 52px;
            height: 52px;
            flex-basis: 52px;
          }

          .l36-title {
            padding: 9px 19px;
          }

          .l36-question-card {
            min-height: 72px;
            padding: 10px 12px;
          }

          .l36-visual-card {
            min-height: 245px;
            padding: 12px 9px;
          }

          .l36-count-grid {
            gap: 4px 7px;
          }

          .l36-count-item {
            width: min(100%, 61px);
          }

          .l36-ten-frame {
            gap: 7px 8px;
          }

          .l36-shape-svg {
            max-width: 52px;
            max-height: 52px;
          }

          .l36-shape-option {
            min-height: 100px;
            padding: 9px 10px;
            gap: 8px;
          }

          .l36-shape-option-grid {
            grid-template-columns:
              repeat(5, 38px);

            gap: 4px 5px;
          }

          .l36-shape-option-grid
          .l36-shape-svg {
            max-width: 38px;
            max-height: 38px;
          }

          .l36-options {
            gap: 6px;
          }

          .l36-option {
            min-height: 72px;
            border-width: 3px;
            border-radius: 20px;
          }
        }

        @media (max-height: 720px) {
          .l36-page {
            padding-bottom:
              calc(
                124px +
                env(safe-area-inset-bottom)
              );
          }

          .l36-shell {
            gap: 8px;
          }

          .l36-header-row {
            min-height: 54px;
          }

          .l36-title {
            padding-top: 7px;
            padding-bottom: 7px;
          }

          .l36-question-card {
            min-height: 66px;
          }

          .l36-visual-card {
            min-height: 225px;
          }

          .l36-listen-card,
          .l36-target-card {
            min-height: 210px;
          }
        }
      `}</style>

      <div
        className="l36-background"
        style={{
          backgroundImage:
            `url(${backgroundImage})`,
        }}
        aria-hidden="true"
      />

      <div
        className="l36-background-overlay"
        aria-hidden="true"
      />

      <section className="l36-shell">
        <header className="l36-header-row">
          <div
            className="l36-missions"
            aria-label={
              `المهمة ${question.mission} من أربع`
            }
          >
            {[1, 2, 3, 4].map(
              (mission) => (
                <span
                  key={mission}
                  className={
                    `l36-mission${
                      mission ===
                      question.mission
                        ? " is-active"
                        : ""
                    }`
                  }
                >
                  {mission}
                </span>
              ),
            )}
          </div>

          <button
            type="button"
            className="l36-audio-button"
            onClick={playQuestionAudio}
            aria-label="إعادة سماع السؤال"
          >
            🔊
          </button>
        </header>

        <h1 className="l36-title">
          {MISSION_TITLES[question.mission]}
        </h1>

        <audio
          key={audioSrc}
          ref={audioRef}
          src={audioSrc}
          preload="auto"
          onTimeUpdate={updateKaraoke}
          onEnded={() =>
            setActiveWord(-1)
          }
        />

        <div className="l36-question-card">
          <p className="l36-question">
            {question.prompt}
          </p>
        </div>

        <div
          className="l36-karaoke"
          aria-live="polite"
        >
          {karaokeWords.map(
            (word, index) => (
              <span
                key={
                  `${question.id}-${index}-${word.text}`
                }
                className={
                  `l36-karaoke-word${
                    index === activeWord
                      ? " is-active"
                      : ""
                  }`
                }
              >
                {word.text}
              </span>
            ),
          )}
        </div>

        {question.kind === "count" &&
          renderCountVisual()}

        {question.kind === "identify" &&
          renderIdentifyVisual()}

        {question.kind === "build" &&
          renderBuildVisual()}

        {question.kind === "composition" &&
          renderCompositionVisual()}

        {question.kind === "build"
          ? renderShapeOptions()
          : renderTextOptions()}
      </section>

      <UnifiedExerciseFeedbackV2
        feedback={feedback}
        successText="أَحْسَنْتَ!"
        retryText="حَاوِلْ مَرَّةً أُخْرَى."
      />
    </main>
  );
}
