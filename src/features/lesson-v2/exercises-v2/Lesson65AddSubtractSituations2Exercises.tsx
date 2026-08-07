import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import LessonCompleteV2 from "../components/LessonCompleteV2";
import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_65_add_subtract_situations_2/exercises";

const CORRECT_SOUND =
  "/audio/v2_feedback/correct.mp3";

const RETRY_SOUND =
  "/audio/v2_feedback/retry.mp3";

const AUTO_PLAY_DELAY = 320;
const FEEDBACK_DELAY = 760;

const BACKGROUND_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1400" viewBox="0 0 900 1400">
  <defs>
    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#F8FBFF"/>
      <stop offset="100%" stop-color="#FFF3D8"/>
    </linearGradient>
  </defs>
  <rect width="900" height="1400" fill="url(#g)"/>
  <circle cx="140" cy="160" r="90" fill="#EAF4FF"/>
  <circle cx="760" cy="260" r="110" fill="#FFF7E0"/>
  <circle cx="180" cy="1220" r="120" fill="#EDFBE8"/>
  <circle cx="760" cy="1160" r="100" fill="#F5EEFF"/>
  <g fill="#D7E7F7" font-size="72" font-family="Arial">
    <text x="96" y="205">+</text>
    <text x="742" y="300">−</text>
    <text x="160" y="1245">=</text>
    <text x="730" y="1180">?</text>
  </g>
</svg>
`)}`;

type FeedbackState =
  | "idle"
  | "correct"
  | "wrong";

type MissionNumber =
  | 1
  | 2
  | 3
  | 4;

type AnswerVariant =
  | "text"
  | "number";

type KaraokeWord = {
  text: string;
  offset: number;
  duration: number;
};

type Choice = {
  id: string;
  label: string;
};

type TokenTone =
  | "blue"
  | "orange"
  | "green"
  | "purple";

type VisualToken = {
  icon: string;
  value: string;
  tone: TokenTone;
};

type ExerciseQuestion = {
  id: string;
  mission: MissionNumber;
  prompt: string;
  audioKey: string;

  variant: AnswerVariant;
  direction?: "rtl" | "ltr";

  choices: Choice[];
  answer: string;

  operatorSymbol: "+"
    | "-";

  leftToken: VisualToken;
  rightToken: VisualToken;
  resultValue: string;
};

const MISSION_TITLES = {
  1: "أَخْتَارُ الْعَمَلِيَّةَ الْمُنَاسِبَةَ",
  2: "أَحْسِبُ النَّتِيجَةَ",
  3: "أَجِدُ الْعَدَدَ النَّاقِصَ",
  4: "أَحُلُّ الْوَضْعِيَّةَ",
} as const;

const QUESTIONS: ExerciseQuestion[] = [
  {
    id: "l65_ex1_q1",
    mission: 1,
    prompt: "جِدِ الْعَمَلِيَّةَ الْمُنَاسِبَةَ",
    audioKey: "l65_ex1_q1",
    variant: "text",
    direction: "ltr",
    choices: [
      { id: "25-plus-10", label: "25 + 10" },
      { id: "25-minus-10", label: "25 - 10" },
      { id: "10-minus-25", label: "10 - 25" },
      { id: "25-plus-20", label: "25 + 20" },
    ],
    answer: "25-plus-10",
    operatorSymbol: "+",
    leftToken: {
      icon: "🧺",
      value: "25",
      tone: "orange",
    },
    rightToken: {
      icon: "🧺",
      value: "10",
      tone: "blue",
    },
    resultValue: "؟",
  },
  {
    id: "l65_ex1_q2",
    mission: 1,
    prompt: "جِدِ الْعَمَلِيَّةَ الْمُنَاسِبَةَ",
    audioKey: "l65_ex1_q2",
    variant: "text",
    direction: "ltr",
    choices: [
      { id: "32-plus-20", label: "32 + 20" },
      { id: "32-minus-20", label: "32 - 20" },
      { id: "20-minus-12", label: "20 - 12" },
      { id: "32-plus-12", label: "32 + 12" },
    ],
    answer: "32-minus-20",
    operatorSymbol: "-",
    leftToken: {
      icon: "🍊",
      value: "32",
      tone: "orange",
    },
    rightToken: {
      icon: "🍊",
      value: "20",
      tone: "purple",
    },
    resultValue: "؟",
  },
  {
    id: "l65_ex1_q3",
    mission: 1,
    prompt: "جِدِ الْعَمَلِيَّةَ الْمُنَاسِبَةَ",
    audioKey: "l65_ex1_q3",
    variant: "text",
    direction: "ltr",
    choices: [
      { id: "24-plus-1", label: "24 + 1" },
      { id: "24-minus-2", label: "24 - 2" },
      { id: "24-minus-1", label: "24 - 1" },
      { id: "24-plus-24", label: "24 + 24" },
    ],
    answer: "24-minus-1",
    operatorSymbol: "-",
    leftToken: {
      icon: "🍫",
      value: "24",
      tone: "green",
    },
    rightToken: {
      icon: "🍫",
      value: "1",
      tone: "purple",
    },
    resultValue: "؟",
  },
  {
    id: "l65_ex1_q4",
    mission: 1,
    prompt: "جِدِ الْعَمَلِيَّةَ الْمُنَاسِبَةَ",
    audioKey: "l65_ex1_q4",
    variant: "text",
    direction: "ltr",
    choices: [
      { id: "21-minus-3", label: "21 - 3" },
      { id: "21-plus-1", label: "21 + 1" },
      { id: "24-minus-3", label: "24 - 3" },
      { id: "21-plus-3", label: "21 + 3" },
    ],
    answer: "21-plus-3",
    operatorSymbol: "+",
    leftToken: {
      icon: "🚗",
      value: "21",
      tone: "blue",
    },
    rightToken: {
      icon: "🚙",
      value: "3",
      tone: "green",
    },
    resultValue: "؟",
  },

  {
    id: "l65_ex2_q1",
    mission: 2,
    prompt: "جِدِ الْعَدَدَ النَّاقِصَ",
    audioKey: "l65_ex2_q1",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "35", label: "35" },
      { id: "15", label: "15" },
      { id: "25", label: "25" },
      { id: "45", label: "45" },
    ],
    answer: "35",
    operatorSymbol: "+",
    leftToken: {
      icon: "🧺",
      value: "25",
      tone: "orange",
    },
    rightToken: {
      icon: "🧺",
      value: "10",
      tone: "blue",
    },
    resultValue: "؟",
  },
  {
    id: "l65_ex2_q2",
    mission: 2,
    prompt: "جِدِ الْعَدَدَ النَّاقِصَ",
    audioKey: "l65_ex2_q2",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "22", label: "22" },
      { id: "12", label: "12" },
      { id: "10", label: "10" },
      { id: "52", label: "52" },
    ],
    answer: "12",
    operatorSymbol: "-",
    leftToken: {
      icon: "🍊",
      value: "32",
      tone: "orange",
    },
    rightToken: {
      icon: "🍊",
      value: "20",
      tone: "purple",
    },
    resultValue: "؟",
  },
  {
    id: "l65_ex2_q3",
    mission: 2,
    prompt: "جِدِ الْعَدَدَ النَّاقِصَ",
    audioKey: "l65_ex2_q3",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "24", label: "24" },
      { id: "22", label: "22" },
      { id: "23", label: "23" },
      { id: "25", label: "25" },
    ],
    answer: "23",
    operatorSymbol: "-",
    leftToken: {
      icon: "🍫",
      value: "24",
      tone: "green",
    },
    rightToken: {
      icon: "🍫",
      value: "1",
      tone: "purple",
    },
    resultValue: "؟",
  },
  {
    id: "l65_ex2_q4",
    mission: 2,
    prompt: "جِدِ الْعَدَدَ النَّاقِصَ",
    audioKey: "l65_ex2_q4",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "20", label: "20" },
      { id: "25", label: "25" },
      { id: "35", label: "35" },
      { id: "30", label: "30" },
    ],
    answer: "30",
    operatorSymbol: "-",
    leftToken: {
      icon: "💰",
      value: "65",
      tone: "blue",
    },
    rightToken: {
      icon: "🪙",
      value: "35",
      tone: "orange",
    },
    resultValue: "؟",
  },

  {
    id: "l65_ex3_q1",
    mission: 3,
    prompt: "أَكْمِلِ الْعَمَلِيَّةَ",
    audioKey: "l65_ex3_q1",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "25", label: "25" },
      { id: "15", label: "15" },
      { id: "35", label: "35" },
      { id: "45", label: "45" },
    ],
    answer: "25",
    operatorSymbol: "+",
    leftToken: {
      icon: "❓",
      value: "؟",
      tone: "purple",
    },
    rightToken: {
      icon: "🟡",
      value: "10",
      tone: "green",
    },
    resultValue: "35",
  },
  {
    id: "l65_ex3_q2",
    mission: 3,
    prompt: "أَكْمِلِ الْعَمَلِيَّةَ",
    audioKey: "l65_ex3_q2",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "12", label: "12" },
      { id: "20", label: "20" },
      { id: "32", label: "32" },
      { id: "22", label: "22" },
    ],
    answer: "20",
    operatorSymbol: "-",
    leftToken: {
      icon: "🍊",
      value: "32",
      tone: "orange",
    },
    rightToken: {
      icon: "❓",
      value: "؟",
      tone: "purple",
    },
    resultValue: "12",
  },
  {
    id: "l65_ex3_q3",
    mission: 3,
    prompt: "أَكْمِلِ الْعَمَلِيَّةَ",
    audioKey: "l65_ex3_q3",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "25", label: "25" },
      { id: "24", label: "24" },
      { id: "23", label: "23" },
      { id: "22", label: "22" },
    ],
    answer: "23",
    operatorSymbol: "-",
    leftToken: {
      icon: "🍫",
      value: "24",
      tone: "green",
    },
    rightToken: {
      icon: "🍫",
      value: "1",
      tone: "purple",
    },
    resultValue: "؟",
  },
  {
    id: "l65_ex3_q4",
    mission: 3,
    prompt: "أَكْمِلِ الْعَمَلِيَّةَ",
    audioKey: "l65_ex3_q4",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "27", label: "27" },
      { id: "24", label: "24" },
      { id: "20", label: "20" },
      { id: "21", label: "21" },
    ],
    answer: "21",
    operatorSymbol: "+",
    leftToken: {
      icon: "❓",
      value: "؟",
      tone: "purple",
    },
    rightToken: {
      icon: "🟢",
      value: "3",
      tone: "green",
    },
    resultValue: "24",
  },

  {
    id: "l65_ex4_q1",
    mission: 4,
    prompt: "اِحْسِبِ النَّاتِجَ",
    audioKey: "l65_ex4_q1",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "19", label: "19" },
      { id: "9", label: "9" },
      { id: "14", label: "14" },
      { id: "20", label: "20" },
    ],
    answer: "19",
    operatorSymbol: "+",
    leftToken: {
      icon: "🐦",
      value: "14",
      tone: "blue",
    },
    rightToken: {
      icon: "🕊️",
      value: "5",
      tone: "green",
    },
    resultValue: "؟",
  },
  {
    id: "l65_ex4_q2",
    mission: 4,
    prompt: "اِحْسِبِ النَّاتِجَ",
    audioKey: "l65_ex4_q2",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "34", label: "34" },
      { id: "22", label: "22" },
      { id: "24", label: "24" },
      { id: "20", label: "20" },
    ],
    answer: "22",
    operatorSymbol: "-",
    leftToken: {
      icon: "🍎",
      value: "28",
      tone: "orange",
    },
    rightToken: {
      icon: "🍎",
      value: "6",
      tone: "purple",
    },
    resultValue: "؟",
  },
  {
    id: "l65_ex4_q3",
    mission: 4,
    prompt: "اِحْسِبِ النَّاتِجَ",
    audioKey: "l65_ex4_q3",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "20", label: "20" },
      { id: "30", label: "30" },
      { id: "40", label: "40" },
      { id: "50", label: "50" },
    ],
    answer: "40",
    operatorSymbol: "+",
    leftToken: {
      icon: "⚽",
      value: "30",
      tone: "blue",
    },
    rightToken: {
      icon: "⚽",
      value: "10",
      tone: "green",
    },
    resultValue: "؟",
  },
  {
    id: "l65_ex4_q4",
    mission: 4,
    prompt: "اِحْسِبِ النَّاتِجَ",
    audioKey: "l65_ex4_q4",
    variant: "number",
    direction: "ltr",
    choices: [
      { id: "20", label: "20" },
      { id: "40", label: "40" },
      { id: "50", label: "50" },
      { id: "30", label: "30" },
    ],
    answer: "30",
    operatorSymbol: "-",
    leftToken: {
      icon: "🌸",
      value: "40",
      tone: "orange",
    },
    rightToken: {
      icon: "🌸",
      value: "10",
      tone: "purple",
    },
    resultValue: "؟",
  },
];

function playFeedback(source: string) {
  const audio = new Audio(source);

  audio.volume = 0.9;
  audio.play().catch(() => undefined);
}

function toneStyle(tone: TokenTone): CSSProperties {
  const palette = {
    blue: {
      background:
        "linear-gradient(180deg,#EDF6FF 0%,#DDECFF 100%)",
      borderColor: "#A7C9EF",
      color: "#17365F",
    },
    orange: {
      background:
        "linear-gradient(180deg,#FFF4DF 0%,#FFE7B9 100%)",
      borderColor: "#EFC36B",
      color: "#7A4612",
    },
    green: {
      background:
        "linear-gradient(180deg,#ECFBE9 0%,#D8F2D1 100%)",
      borderColor: "#A8D78F",
      color: "#1F5B33",
    },
    purple: {
      background:
        "linear-gradient(180deg,#F6EDFF 0%,#E8D9FF 100%)",
      borderColor: "#C6A8F4",
      color: "#5D2B93",
    },
  } as const;

  return palette[tone];
}

function TokenCard({
  token,
}: {
  token: VisualToken;
}) {
  const tone = toneStyle(token.tone);

  return (
    <div
      style={{
        ...styles.tokenCard,
        background: tone.background,
        borderColor: tone.borderColor,
        color: tone.color,
      }}
    >
      <div style={styles.tokenIcon}>
        {token.icon}
      </div>

      <div style={styles.tokenValue}>
        {token.value}
      </div>
    </div>
  );
}

function isUnknownVisualValue(
  value: string,
) {
  const normalized =
    value.trim();

  return (
    normalized === "؟" ||
    normalized === "?"
  );
}

function solveVisualValues(
  question: ExerciseQuestion,
  showSolution: boolean,
) {
  let left =
    question.leftToken.value;

  let right =
    question.rightToken.value;

  let result =
    question.resultValue;

  if (!showSolution) {
    return {
      left,
      right,
      result,
    };
  }

  const leftUnknown =
    isUnknownVisualValue(left);

  const rightUnknown =
    isUnknownVisualValue(right);

  const resultUnknown =
    isUnknownVisualValue(result);

  const leftNumber =
    Number(left);

  const rightNumber =
    Number(right);

  const resultNumber =
    Number(result);

  if (
    resultUnknown &&
    Number.isFinite(leftNumber) &&
    Number.isFinite(rightNumber)
  ) {
    result = String(
      question.operatorSymbol === "+"
        ? leftNumber + rightNumber
        : leftNumber - rightNumber,
    );
  }

  if (
    leftUnknown &&
    Number.isFinite(rightNumber) &&
    Number.isFinite(resultNumber)
  ) {
    left = String(
      question.operatorSymbol === "+"
        ? resultNumber - rightNumber
        : resultNumber + rightNumber,
    );
  }

  if (
    rightUnknown &&
    Number.isFinite(leftNumber) &&
    Number.isFinite(resultNumber)
  ) {
    right = String(
      question.operatorSymbol === "+"
        ? resultNumber - leftNumber
        : leftNumber - resultNumber,
    );
  }

  return {
    left,
    right,
    result,
  };
}

function VisualEquation({
  question,
  showSolution,
  revealedAnswer,
}: {
  question: ExerciseQuestion;
  showSolution: boolean;
  revealedAnswer: string;
}) {
  const values =
    solveVisualValues(
      question,
      showSolution,
    );

  const showOperator =
    question.mission !== 1;

  const displayedResult =
    showSolution &&
    question.mission === 1
      ? revealedAnswer
      : values.result;

  return (
    <div style={styles.visualStage}>
      <div
        style={
          showOperator
            ? styles.equationRow
            : styles.equationRowSimple
        }
      >
        <TokenCard
          token={{
            ...question.leftToken,
            value: values.left,
          }}
        />

        {showOperator && (
          <div style={styles.operatorBox}>
            {question.operatorSymbol}
          </div>
        )}

        <TokenCard
          token={{
            ...question.rightToken,
            value: values.right,
          }}
        />
      </div>

      <div
        style={
          showOperator
            ? styles.resultRow
            : styles.resultRowSingle
        }
      >
        {showOperator && (
          <div style={styles.equalsBox}>
            =
          </div>
        )}

        <div
          style={styles.resultBox}
          aria-live="polite"
        >
          {displayedResult}
        </div>
      </div>
    </div>
  );
}

export default function Lesson65AddSubtractSituations2Exercises() {
  const [mission, setMission] =
    useState<MissionNumber>(1);

  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [feedback, setFeedback] =
    useState<FeedbackState>("idle");

  const [boundaries, setBoundaries] =
    useState<KaraokeWord[]>([]);

  const [activeWordIndex, setActiveWordIndex] =
    useState(-1);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [complete, setComplete] =
    useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const boundariesRef =
    useRef<KaraokeWord[]>([]);

  const timerRef =
    useRef<number | null>(null);

  const answerLockedRef =
    useRef(false);

  const missionQuestions =
    QUESTIONS.filter(
      (question) =>
        question.mission === mission,
    );

  const question =
    missionQuestions[questionIndex];

  const audioSource =
    `${AUDIO_BASE}/${question.audioKey}.mp3`;

  const timingSource =
    `${AUDIO_BASE}/${question.audioKey}.json`;

  const clearTimer =
    useCallback(() => {
      if (timerRef.current !== null) {
        window.clearTimeout(
          timerRef.current,
        );

        timerRef.current = null;
      }
    }, []);

  useEffect(() => {
    clearTimer();
    setSelectedId(null);
    setFeedback("idle");
    answerLockedRef.current = false;
  }, [
    mission,
    questionIndex,
    clearTimer,
  ]);

  useEffect(() => {
    let cancelled = false;

    setBoundaries([]);
    boundariesRef.current = [];
    setActiveWordIndex(-1);
    setIsPlaying(false);

    fetch(timingSource)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`,
          );
        }

        return response.json();
      })
      .then((data) => {
        if (cancelled) return;

        const items =
          Array.isArray(data)
            ? data
            : [];

        boundariesRef.current = items;
        setBoundaries(items);
      })
      .catch(() => {
        if (cancelled) return;

        boundariesRef.current = [];
        setBoundaries([]);
      });

    const audio =
      new Audio(audioSource);

    audio.preload = "auto";

    const onPlay = () => {
      if (!cancelled) {
        setIsPlaying(true);
      }
    };

    const onPause = () => {
      if (!cancelled) {
        setIsPlaying(false);
      }
    };

    const onEnded = () => {
      if (!cancelled) {
        setIsPlaying(false);
        setActiveWordIndex(
          boundariesRef.current.length > 0
            ? boundariesRef.current.length - 1
            : -1,
        );
      }
    };

    const onTimeUpdate = () => {
      if (cancelled) return;

      const currentMs =
        audio.currentTime * 1000;

      let active = -1;

      for (
        let index = 0;
        index < boundariesRef.current.length;
        index += 1
      ) {
        const word =
          boundariesRef.current[index];

        const start =
          Number(word.offset) || 0;

        const duration =
          Math.max(
            Number(word.duration) || 0,
            160,
          );

        const nextStart =
          index <
          boundariesRef.current.length - 1
            ? Number(
                boundariesRef.current[
                  index + 1
                ].offset,
              )
            : Number.POSITIVE_INFINITY;

        const end =
          Math.min(
            start + duration + 100,
            nextStart + 30,
          );

        if (
          currentMs >= start &&
          currentMs < end
        ) {
          active = index;
          break;
        }
      }

      setActiveWordIndex(active);
    };

    audio.addEventListener(
      "play",
      onPlay,
    );

    audio.addEventListener(
      "pause",
      onPause,
    );

    audio.addEventListener(
      "ended",
      onEnded,
    );

    audio.addEventListener(
      "timeupdate",
      onTimeUpdate,
    );

    audioRef.current = audio;

    const autoTimer =
      window.setTimeout(() => {
        if (cancelled) return;

        audio.currentTime = 0;

        audio
          .play()
          .catch(() => {
            setIsPlaying(false);
          });
      }, AUTO_PLAY_DELAY);

    return () => {
      cancelled = true;
      window.clearTimeout(autoTimer);

      audio.pause();

      audio.removeEventListener(
        "play",
        onPlay,
      );

      audio.removeEventListener(
        "pause",
        onPause,
      );

      audio.removeEventListener(
        "ended",
        onEnded,
      );

      audio.removeEventListener(
        "timeupdate",
        onTimeUpdate,
      );

      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [
    audioSource,
    timingSource,
  ]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const replay =
    useCallback(() => {
      const audio =
        audioRef.current;

      if (!audio) return;

      setActiveWordIndex(-1);
      audio.currentTime = 0;

      audio
        .play()
        .catch(() => {
          setIsPlaying(false);
        });
    }, []);

  const moveForward =
    useCallback(() => {
      if (
        questionIndex <
        missionQuestions.length - 1
      ) {
        setQuestionIndex(
          (current) =>
            current + 1,
        );

        return;
      }

      if (mission < 4) {
        setMission(
          (mission + 1) as MissionNumber,
        );

        setQuestionIndex(0);
        return;
      }

      setComplete(true);
    }, [
      mission,
      missionQuestions.length,
      questionIndex,
    ]);

  const selectAnswer =
    useCallback(
      (choiceId: string) => {
        if (
          feedback !== "idle" ||
          answerLockedRef.current
        ) {
          return;
        }

        answerLockedRef.current = true;
        setSelectedId(choiceId);

        if (
          choiceId ===
          question.answer
        ) {
          setFeedback("correct");
          playFeedback(CORRECT_SOUND);

          timerRef.current =
            window.setTimeout(
              moveForward,
              FEEDBACK_DELAY,
            );

          return;
        }

        setFeedback("wrong");
        playFeedback(RETRY_SOUND);

        timerRef.current =
          window.setTimeout(() => {
            setSelectedId(null);
            setFeedback("idle");
            answerLockedRef.current =
              false;
            timerRef.current = null;
          }, FEEDBACK_DELAY);
      },
      [
        feedback,
        moveForward,
        question.answer,
      ],
    );

  const questionWords =
    boundaries.length > 0
      ? boundaries.map(
          (word) => word.text,
        )
      : question.prompt
          .trim()
          .split(/\s+/);

  // LESSON65_PROGRESSIVE_KARAOKE_START
  const displayedQuestionWords =
    activeWordIndex >= 0
      ? questionWords.slice(
          0,
          activeWordIndex + 1,
        )
      : [];

  const displayedActiveWordIndex =
    displayedQuestionWords.length > 0
      ? displayedQuestionWords.length - 1
      : -1;

  const displayedActiveWord =
    displayedActiveWordIndex >= 0
      ? displayedQuestionWords[
          displayedActiveWordIndex
        ] ?? ""
      : "";
  // LESSON65_PROGRESSIVE_KARAOKE_END


  const answerOptions =
    question.choices.map(
      (choice) => ({
        id: choice.id,
        ariaLabel: choice.label,

        content: (
          <div
            style={
              question.variant ===
              "number"
                ? styles.numberChoice
                : styles.textChoice
            }
            dir="rtl"
          >
            <strong>
              {choice.label}
            </strong>
          </div>
        ),
      }),
    );


  const revealedAnswer =
    question.choices.find(
      (choice) =>
        choice.id === question.answer,
    )?.label ?? question.resultValue;

  if (complete) {
    return (
      <LessonCompleteV2
        lessonKey="lesson65"
        message="أَتْمَمْتَ تَمَارِينَ وَضْعِيَّاتِ الْجَمْعِ وَالطَّرْحِ بِنَجَاحٍ."
        stars={3}
        nextLessonKey="lesson66"
        nextPath="/lesson-v2/lesson66"
        nextLabel="الدَّرْسُ التَّالِي"
        onReplay={() => {
          setMission(1);
          setQuestionIndex(0);
          setSelectedId(null);
          setFeedback("idle");
          setComplete(false);
        }}
      />
    );
  }

  return (
    <UnifiedExerciseScreenV2
      index={questionIndex}
      total={missionQuestions.length}
      missionTitle=""
      questionWords={
        displayedQuestionWords
      }
      activeWordIndex={
        displayedActiveWordIndex
      }
      activeWord={
        displayedActiveWord
      }
      onReplay={replay}
      isPlaying={isPlaying}
      backgroundImage={BACKGROUND_IMAGE}
      activity={
        <VisualEquation
          question={question}
          showSolution={
            feedback === "correct"
          }
          revealedAnswer={
            revealedAnswer
          }
        />
      }
      answers={
        <UnifiedExerciseAnswersV2
          options={answerOptions}
          selectedId={selectedId}
          feedback={feedback}
          correctId={question.answer}
          showCorrect={false}
          onSelect={selectAnswer}
          variant={question.variant}
          columns={2}
          direction="rtl"
          disabled={
            feedback !== "idle"
          }
        />
      }
      feedback={feedback}
      successText="أَحْسَنْتَ ✅"
      retryText="حَاوِلْ مَرَّةً أُخْرَى ✨"
      activityLabel="محتوى التمرين"
      answersLabel="خيارات الإجابة"
    />
  );
}

const styles:
  Record<string, CSSProperties> = {
  visualStage: {
    width: "100%",
    borderRadius: 24,
    background:
      "linear-gradient(180deg,rgba(255,255,255,.98) 0%,rgba(249,252,255,.96) 100%)",
    border: "4px solid #E4A61B",
    padding: 14,
    boxSizing: "border-box",
    boxShadow:
      "0 10px 28px rgba(23,54,95,.10)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  equationRow: {
    direction: "rtl",
    display: "grid",
    gridTemplateColumns:
      "1fr auto 1fr",
    gap: 10,
    alignItems: "center",
  },

  equationRowSimple: {
    direction: "rtl",
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
    gap: 14,
    alignItems: "center",
  },

  resultRow: {
    direction: "rtl",
    display: "grid",
    gridTemplateColumns:
      "auto 1fr",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  resultRowSingle: {
    direction: "rtl",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  tokenCard: {
    direction: "ltr",
    minHeight: 136,
    borderRadius: 24,
    border: "3px solid transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 8,
    padding: "12px 8px",
    boxSizing: "border-box",
  },

  tokenIcon: {
    fontSize: "clamp(48px,12vw,68px)",
    lineHeight: 1,
  },

  tokenValue: {
    fontSize: "clamp(34px,9vw,48px)",
    lineHeight: 1,
    fontWeight: 1000,
    fontVariantNumeric:
      "tabular-nums",
  },

  operatorBox: {
    direction: "ltr",
    width: 58,
    height: 58,
    borderRadius: 18,
    background:
      "linear-gradient(180deg,#F3F8FF 0%,#DCEEFF 100%)",
    border: "3px solid #BCD8F4",
    color: "#17365F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    lineHeight: 1,
    fontWeight: 1000,
  },

  equalsBox: {
    direction: "ltr",
    width: 58,
    height: 58,
    borderRadius: 18,
    background:
      "linear-gradient(180deg,#FFF5E3 0%,#FFE4B4 100%)",
    border: "3px solid #EFC05B",
    color: "#7A4612",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "38px",
    lineHeight: 1,
    fontWeight: 1000,
  },

  resultBox: {
    direction: "ltr",
    minHeight: 74,
    borderRadius: 22,
    background: "#FFFFFF",
    border: "3px solid #E4A61B",
    color: "#17365F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(34px,9vw,48px)",
    lineHeight: 1,
    fontWeight: 1000,
    fontVariantNumeric:
      "tabular-nums",
  },

  textChoice: {
    direction: "ltr",
    width: "100%",
    minHeight: 58,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize:
      "clamp(18px,4.8vw,25px)",
    lineHeight: 1.45,
    color: "#17365F",
    unicodeBidi: "isolate",
  },

  numberChoice: {
    direction: "ltr",
    width: "100%",
    minHeight: 54,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize:
      "clamp(27px,8vw,42px)",
    lineHeight: 1,
    color: "#17365F",
    fontVariantNumeric:
      "tabular-nums",
    unicodeBidi: "isolate",
  },
};
