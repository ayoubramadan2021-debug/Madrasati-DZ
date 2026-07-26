import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import LessonCompleteV2 from "../components/LessonCompleteV2";
import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_45_complete_table/exercises";

const CORRECT_SOUND =
  "/audio/v2_feedback/correct.mp3";

const RETRY_SOUND =
  "/audio/v2_feedback/retry.mp3";

const AUTO_PLAY_DELAY = 320;
const FEEDBACK_DELAY = 760;

type FeedbackState =
  | "idle"
  | "correct"
  | "wrong";

type KaraokeWord = {
  text: string;
  offset: number;
  duration: number;
};

type QuestionKind =
  | "market"
  | "complete"
  | "locate"
  | "repair";

type AnswerChoice = {
  id: string;
  label: string;
};

type MarketItem = {
  id: string;
  label: string;
  emoji: string;
  price: number;
};

type TableQuestion = {
  id: string;
  mission: 1 | 2 | 3 | 4;
  kind: QuestionKind;

  prompt: string;
  audioKey: string;

  choices: AnswerChoice[];
  answer: string;

  marketTarget?: string;

  matrix?: number[][];
  targetRow?: number;
  targetColumn?: number;
  wrongValue?: number;
};

const COLORS = {
  navy: "#17365f",
  gold: "#edb21f",
  cream: "#fff8ec",
  green: "#20a567",
  red: "#d94a45",
  white: "#ffffff",
  brown: "#7b3f18",
};

const MARKET_ITEMS: MarketItem[] = [
  {
    id: "carrot",
    label: "الْجَزَرُ",
    emoji: "🥕",
    price: 42,
  },
  {
    id: "tomato",
    label: "الطَّمَاطِمُ",
    emoji: "🍅",
    price: 55,
  },
  {
    id: "potato",
    label: "الْبَطَاطَا",
    emoji: "🥔",
    price: 65,
  },
  {
    id: "lemon",
    label: "اللَّيْمُونُ",
    emoji: "🍋",
    price: 80,
  },
];

const ROWS = [
  {
    label: "أَصْفَرُ",
    color: "#f4c52b",
  },
  {
    label: "أَخْضَرُ",
    color: "#32aa62",
  },
  {
    label: "أَزْرَقُ",
    color: "#356edb",
  },
];

const COLUMNS = [
  {
    label: "مُرَبَّعٌ",
    shape: "square",
  },
  {
    label: "دَائِرَةٌ",
    shape: "circle",
  },
  {
    label: "مُثَلَّثٌ",
    shape: "triangle",
  },
] as const;

const QUESTIONS: TableQuestion[] = [
  // =============================================
  // التمرين الأول: جدول السوق
  // =============================================
  {
    id: "l45_ex1_q1",
    mission: 1,
    kind: "market",
    prompt:
      "لَاحِظْ أَسْعَارَ السُّوقِ. مَا ثَمَنُ الْجَزَرِ؟",
    audioKey: "l45_ex1_q1",
    marketTarget: "carrot",
    choices: [
      { id: "42", label: "42" },
      { id: "55", label: "55" },
      { id: "65", label: "65" },
    ],
    answer: "42",
  },
  {
    id: "l45_ex1_q2",
    mission: 1,
    kind: "market",
    prompt:
      "لَاحِظْ أَسْعَارَ السُّوقِ. مَا ثَمَنُ الطَّمَاطِمِ؟",
    audioKey: "l45_ex1_q2",
    marketTarget: "tomato",
    choices: [
      { id: "42", label: "42" },
      { id: "55", label: "55" },
      { id: "80", label: "80" },
    ],
    answer: "55",
  },
  {
    id: "l45_ex1_q3",
    mission: 1,
    kind: "market",
    prompt:
      "لَاحِظْ أَسْعَارَ السُّوقِ. مَا ثَمَنُ الْبَطَاطَا؟",
    audioKey: "l45_ex1_q3",
    marketTarget: "potato",
    choices: [
      { id: "55", label: "55" },
      { id: "65", label: "65" },
      { id: "80", label: "80" },
    ],
    answer: "65",
  },
  {
    id: "l45_ex1_q4",
    mission: 1,
    kind: "market",
    prompt:
      "لَاحِظْ أَسْعَارَ السُّوقِ. مَا ثَمَنُ اللَّيْمُونِ؟",
    audioKey: "l45_ex1_q4",
    marketTarget: "lemon",
    choices: [
      { id: "42", label: "42" },
      { id: "65", label: "65" },
      { id: "80", label: "80" },
    ],
    answer: "80",
  },

  // =============================================
  // التمرين الثاني: إكمال جدول الأشكال
  // =============================================
  {
    id: "l45_ex2_q1",
    mission: 2,
    kind: "complete",
    prompt:
      "عُدَّ الْمُرَبَّعَاتِ الصَّفْرَاءَ، ثُمَّ أَكْمِلِ الْخَانَةَ.",
    audioKey: "l45_ex2_q1",
    matrix: [
      [3, 2, 1],
      [1, 3, 2],
      [4, 2, 3],
    ],
    targetRow: 0,
    targetColumn: 0,
    choices: [
      { id: "2", label: "2" },
      { id: "3", label: "3" },
      { id: "4", label: "4" },
    ],
    answer: "3",
  },
  {
    id: "l45_ex2_q2",
    mission: 2,
    kind: "complete",
    prompt:
      "عُدَّ الْمُثَلَّثَاتِ الْخَضْرَاءَ، ثُمَّ أَكْمِلِ الْخَانَةَ.",
    audioKey: "l45_ex2_q2",
    matrix: [
      [2, 4, 1],
      [3, 1, 2],
      [1, 3, 4],
    ],
    targetRow: 1,
    targetColumn: 2,
    choices: [
      { id: "1", label: "1" },
      { id: "2", label: "2" },
      { id: "3", label: "3" },
    ],
    answer: "2",
  },
  {
    id: "l45_ex2_q3",
    mission: 2,
    kind: "complete",
    prompt:
      "عُدَّ الدَّوَائِرَ الزَّرْقَاءَ، ثُمَّ أَكْمِلِ الْخَانَةَ.",
    audioKey: "l45_ex2_q3",
    matrix: [
      [1, 2, 3],
      [4, 2, 1],
      [2, 4, 3],
    ],
    targetRow: 2,
    targetColumn: 1,
    choices: [
      { id: "3", label: "3" },
      { id: "4", label: "4" },
      { id: "5", label: "5" },
    ],
    answer: "4",
  },
  {
    id: "l45_ex2_q4",
    mission: 2,
    kind: "complete",
    prompt:
      "عُدَّ الدَّوَائِرَ الْخَضْرَاءَ، ثُمَّ أَكْمِلِ الْخَانَةَ.",
    audioKey: "l45_ex2_q4",
    matrix: [
      [3, 1, 2],
      [2, 4, 3],
      [1, 2, 4],
    ],
    targetRow: 1,
    targetColumn: 1,
    choices: [
      { id: "2", label: "2" },
      { id: "3", label: "3" },
      { id: "4", label: "4" },
    ],
    answer: "4",
  },

  // =============================================
  // التمرين الثالث: تحديد الصف والعمود
  // =============================================
  {
    id: "l45_ex3_q1",
    mission: 3,
    kind: "locate",
    prompt:
      "فِي أَيِّ خَانَةٍ نَكْتُبُ عَدَدَ الدَّوَائِرِ الْخَضْرَاءِ؟",
    audioKey: "l45_ex3_q1",
    targetRow: 1,
    targetColumn: 1,
    choices: [
      {
        id: "1-1",
        label: "أَخْضَرُ × دَائِرَةٌ",
      },
      {
        id: "2-1",
        label: "أَزْرَقُ × دَائِرَةٌ",
      },
      {
        id: "1-0",
        label: "أَخْضَرُ × مُرَبَّعٌ",
      },
    ],
    answer: "1-1",
  },
  {
    id: "l45_ex3_q2",
    mission: 3,
    kind: "locate",
    prompt:
      "فِي أَيِّ خَانَةٍ نَكْتُبُ عَدَدَ الْمُثَلَّثَاتِ الصَّفْرَاءِ؟",
    audioKey: "l45_ex3_q2",
    targetRow: 0,
    targetColumn: 2,
    choices: [
      {
        id: "0-2",
        label: "أَصْفَرُ × مُثَلَّثٌ",
      },
      {
        id: "0-1",
        label: "أَصْفَرُ × دَائِرَةٌ",
      },
      {
        id: "1-2",
        label: "أَخْضَرُ × مُثَلَّثٌ",
      },
    ],
    answer: "0-2",
  },
  {
    id: "l45_ex3_q3",
    mission: 3,
    kind: "locate",
    prompt:
      "فِي أَيِّ خَانَةٍ نَكْتُبُ عَدَدَ الْمُرَبَّعَاتِ الزَّرْقَاءِ؟",
    audioKey: "l45_ex3_q3",
    targetRow: 2,
    targetColumn: 0,
    choices: [
      {
        id: "2-0",
        label: "أَزْرَقُ × مُرَبَّعٌ",
      },
      {
        id: "2-2",
        label: "أَزْرَقُ × مُثَلَّثٌ",
      },
      {
        id: "1-0",
        label: "أَخْضَرُ × مُرَبَّعٌ",
      },
    ],
    answer: "2-0",
  },
  {
    id: "l45_ex3_q4",
    mission: 3,
    kind: "locate",
    prompt:
      "فِي أَيِّ خَانَةٍ نَكْتُبُ عَدَدَ الْمُرَبَّعَاتِ الْخَضْرَاءِ؟",
    audioKey: "l45_ex3_q4",
    targetRow: 1,
    targetColumn: 0,
    choices: [
      {
        id: "1-0",
        label: "أَخْضَرُ × مُرَبَّعٌ",
      },
      {
        id: "0-0",
        label: "أَصْفَرُ × مُرَبَّعٌ",
      },
      {
        id: "1-1",
        label: "أَخْضَرُ × دَائِرَةٌ",
      },
    ],
    answer: "1-0",
  },

  // =============================================
  // التمرين الرابع: إصلاح الجدول
  // =============================================
  {
    id: "l45_ex4_q1",
    mission: 4,
    kind: "repair",
    prompt:
      "الْعَدَدُ فِي خَانَةِ الْمُرَبَّعَاتِ الصَّفْرَاءِ خَاطِئٌ. مَا الْعَدَدُ الصَّحِيحُ؟",
    audioKey: "l45_ex4_q1",
    matrix: [
      [3, 2, 1],
      [1, 3, 2],
      [4, 2, 3],
    ],
    targetRow: 0,
    targetColumn: 0,
    wrongValue: 5,
    choices: [
      { id: "2", label: "2" },
      { id: "3", label: "3" },
      { id: "5", label: "5" },
    ],
    answer: "3",
  },
  {
    id: "l45_ex4_q2",
    mission: 4,
    kind: "repair",
    prompt:
      "الْعَدَدُ فِي خَانَةِ الْمُثَلَّثَاتِ الْخَضْرَاءِ خَاطِئٌ. مَا الْعَدَدُ الصَّحِيحُ؟",
    audioKey: "l45_ex4_q2",
    matrix: [
      [2, 4, 1],
      [3, 1, 2],
      [1, 3, 4],
    ],
    targetRow: 1,
    targetColumn: 2,
    wrongValue: 4,
    choices: [
      { id: "2", label: "2" },
      { id: "3", label: "3" },
      { id: "4", label: "4" },
    ],
    answer: "2",
  },
  {
    id: "l45_ex4_q3",
    mission: 4,
    kind: "repair",
    prompt:
      "الْعَدَدُ فِي خَانَةِ الدَّوَائِرِ الزَّرْقَاءِ خَاطِئٌ. مَا الْعَدَدُ الصَّحِيحُ؟",
    audioKey: "l45_ex4_q3",
    matrix: [
      [1, 2, 3],
      [4, 2, 1],
      [2, 4, 3],
    ],
    targetRow: 2,
    targetColumn: 1,
    wrongValue: 2,
    choices: [
      { id: "2", label: "2" },
      { id: "3", label: "3" },
      { id: "4", label: "4" },
    ],
    answer: "4",
  },
  {
    id: "l45_ex4_q4",
    mission: 4,
    kind: "repair",
    prompt:
      "الْعَدَدُ فِي خَانَةِ الدَّوَائِرِ الْخَضْرَاءِ خَاطِئٌ. مَا الْعَدَدُ الصَّحِيحُ؟",
    audioKey: "l45_ex4_q4",
    matrix: [
      [3, 1, 2],
      [2, 4, 3],
      [1, 2, 4],
    ],
    targetRow: 1,
    targetColumn: 1,
    wrongValue: 1,
    choices: [
      { id: "1", label: "1" },
      { id: "3", label: "3" },
      { id: "4", label: "4" },
    ],
    answer: "4",
  },
];

const MISSION_TITLES = {
  1: "أُكْمِلُ جَدْوَلَ السُّوقِ",
  2: "أُكْمِلُ جَدْوَلَ الْأَشْكَالِ",
  3: "أُحَدِّدُ الصَّفَّ وَالْعَمُودَ",
  4: "أُصْلِحُ الْجَدْوَلَ",
} as const;

function playSound(source: string) {
  const audio = new Audio(source);

  audio.volume = 0.9;

  audio
    .play()
    .catch(() => undefined);
}

function ShapeIcon({
  kind,
  color,
  size = 24,
}: {
  kind: "square" | "circle" | "triangle";
  color: string;
  size?: number;
}) {
  if (kind === "triangle") {
    return (
      <span
        aria-hidden="true"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
          filter:
            "drop-shadow(0 3px 3px rgba(0,0,0,.15))",
          display: "inline-block",
        }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius:
          kind === "circle"
            ? "50%"
            : 5,
        background: color,
        display: "inline-block",
        boxShadow:
          "0 3px 5px rgba(0,0,0,.15)",
      }}
    />
  );
}

function MarketBoard({
  targetId,
}: {
  targetId: string;
}) {
  return (
    <div style={styles.activityCard}>
      <div style={styles.marketCards}>
        {MARKET_ITEMS.map((item) => (
          <div
            key={item.id}
            style={styles.marketCard}
          >
            <span style={styles.marketEmoji}>
              {item.emoji}
            </span>

            <strong style={styles.marketPrice}>
              {item.price}
            </strong>

            <small style={styles.currency}>
              دِينَارًا
            </small>
          </div>
        ))}
      </div>

      <div style={styles.marketTable}>
        <div style={styles.marketHeader}>
          الْخُضَرُ وَالْفَوَاكِهُ
        </div>

        <div style={styles.marketHeader}>
          الثَّمَنُ
        </div>

        {MARKET_ITEMS.map((item) => (
          <div
            key={`${item.id}-row`}
            style={{
              display: "contents",
            }}
          >
            <div style={styles.marketCell}>
              <span>{item.emoji}</span>
              <strong>{item.label}</strong>
            </div>

            <div
              style={{
                ...styles.marketCell,
                ...(item.id === targetId
                  ? styles.targetCell
                  : {}),
              }}
            >
              {item.id === targetId
                ? "؟"
                : item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShapeSource({
  matrix,
}: {
  matrix: number[][];
}) {
  return (
    <div style={styles.shapeSource}>
      {ROWS.flatMap((row, rowIndex) =>
        COLUMNS.map((column, columnIndex) => (
          <div
            key={`${rowIndex}-${columnIndex}`}
            style={styles.shapeGroup}
          >
            {Array.from({
              length: matrix[rowIndex][columnIndex],
            }).map((_, index) => (
              <ShapeIcon
                key={index}
                kind={column.shape}
                color={row.color}
                size={20}
              />
            ))}
          </div>
        )),
      )}
    </div>
  );
}

function MatrixTable({
  matrix,
  targetRow,
  targetColumn,
  mode,
  wrongValue,
}: {
  matrix?: number[][];
  targetRow?: number;
  targetColumn?: number;
  mode: "complete" | "locate" | "repair";
  wrongValue?: number;
}) {
  return (
    <div style={styles.tableWrapper}>
      <div style={styles.matrixTable}>
        <div style={styles.cornerCell}>
          ×
        </div>

        {COLUMNS.map((column) => (
          <div
            key={column.label}
            style={styles.columnHeader}
          >
            <ShapeIcon
              kind={column.shape}
              color={COLORS.navy}
              size={22}
            />
          </div>
        ))}

        {ROWS.map((row, rowIndex) => (
          <div
            key={row.label}
            style={{
              display: "contents",
            }}
          >
            <div style={styles.rowHeader}>
              <span
                style={{
                  width: 19,
                  height: 19,
                  borderRadius: "50%",
                  background: row.color,
                }}
              />

              <small>{row.label}</small>
            </div>

            {COLUMNS.map((_, columnIndex) => {
              const isTarget =
                rowIndex === targetRow &&
                columnIndex === targetColumn;

              let value: ReactNode =
                matrix?.[rowIndex]?.[columnIndex] ?? "";

              if (mode === "complete" && isTarget) {
                value = "؟";
              }

              if (mode === "locate") {
                value = "";
              }

              if (mode === "repair" && isTarget) {
                value = wrongValue;
              }

              return (
                <div
                  key={`${rowIndex}-${columnIndex}`}
                  style={{
                    ...styles.matrixCell,
                    ...(isTarget && mode === "repair"
                      ? styles.wrongCell
                      : {}),
                    ...(isTarget && mode === "complete"
                      ? styles.highlightCell
                      : {}),
                  }}
                >
                  {value}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function ShapeTableBoard({
  question,
}: {
  question: TableQuestion;
}) {
  const matrix =
    question.matrix ?? [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

  if (question.kind === "locate") {
    const row =
      ROWS[question.targetRow ?? 0];

    const column =
      COLUMNS[question.targetColumn ?? 0];

    return (
      <div style={styles.activityCard}>
        <div style={styles.targetShapeCard}>
          <ShapeIcon
            kind={column.shape}
            color={COLORS.gold}
            size={58}
          />

          <strong>
            {row.label} × {column.label}
          </strong>
        </div>

        <MatrixTable
          targetRow={question.targetRow}
          targetColumn={question.targetColumn}
          mode="locate"
        />

        <strong style={styles.activityHint}>
          نُحَدِّدُ الصَّفَّ، ثُمَّ نُحَدِّدُ
          الْعَمُودَ.
        </strong>
      </div>
    );
  }

  return (
    <div style={styles.activityCard}>
      <ShapeSource matrix={matrix} />

      <MatrixTable
        matrix={matrix}
        targetRow={question.targetRow}
        targetColumn={question.targetColumn}
        mode={
          question.kind === "repair"
            ? "repair"
            : "complete"
        }
        wrongValue={question.wrongValue}
      />

      <strong style={styles.activityHint}>
        {question.kind === "repair"
          ? "قَارِنِ الْأَشْكَالَ بِالْجَدْوَلِ، ثُمَّ أَصْلِحِ الْخَطَأَ."
          : "عُدَّ الْأَشْكَالَ، ثُمَّ أَكْمِلِ الْخَانَةَ."}
      </strong>
    </div>
  );
}

const LessonCompleteAny =
  LessonCompleteV2 as any;

export default function Lesson45CompleteTableExercises() {
  const navigate = useNavigate();

  const [mission, setMission] =
    useState<1 | 2 | 3 | 4>(1);

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

  const answerLockRef =
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

  const boundarySource =
    `${AUDIO_BASE}/${question.audioKey}.json`;

  const clearTimer =
    useCallback(() => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }, []);

  const resetQuestion =
    useCallback(() => {
      clearTimer();
      setSelectedId(null);
      setFeedback("idle");
      answerLockRef.current = false;
    }, [clearTimer]);

  useEffect(() => {
    resetQuestion();
  }, [
    mission,
    questionIndex,
    resetQuestion,
  ]);

  useEffect(() => {
    let cancelled = false;

    boundariesRef.current = [];
    setBoundaries([]);
    setActiveWordIndex(-1);
    setIsPlaying(false);

    fetch(boundarySource)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`,
          );
        }

        return response.json();
      })
      .then((data) => {
        if (cancelled) {
          return;
        }

        const words =
          Array.isArray(data)
            ? data
            : [];

        boundariesRef.current = words;
        setBoundaries(words);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

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
        setActiveWordIndex(-1);
      }
    };

    const onTimeUpdate = () => {
      if (cancelled) {
        return;
      }

      const currentMs =
        audio.currentTime * 1000;

      const words =
        boundariesRef.current;

      let nextIndex = -1;

      for (
        let index = 0;
        index < words.length;
        index += 1
      ) {
        const word = words[index];

        const start =
          Number(word.offset) || 0;

        const duration =
          Math.max(
            Number(word.duration) || 0,
            180,
          );

        const nextStart =
          index < words.length - 1
            ? Number(
                words[index + 1].offset,
              )
            : Number.POSITIVE_INFINITY;

        const end =
          Math.min(
            start + duration + 130,
            nextStart + 40,
          );

        if (
          currentMs >= start &&
          currentMs < end
        ) {
          nextIndex = index;
          break;
        }
      }

      setActiveWordIndex(nextIndex);
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
        if (cancelled) {
          return;
        }

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
    boundarySource,
  ]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const replayQuestion =
    useCallback(() => {
      const audio =
        audioRef.current;

      if (!audio) {
        return;
      }

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
          (current) => current + 1,
        );

        return;
      }

      if (mission < 4) {
        setMission(
          (mission + 1) as
            | 1
            | 2
            | 3
            | 4,
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
          answerLockRef.current
        ) {
          return;
        }

        answerLockRef.current = true;
        setSelectedId(choiceId);

        if (choiceId === question.answer) {
          setFeedback("correct");
          playSound(CORRECT_SOUND);

          timerRef.current =
            window.setTimeout(
              moveForward,
              FEEDBACK_DELAY,
            );

          return;
        }

        setFeedback("wrong");
        playSound(RETRY_SOUND);

        timerRef.current =
          window.setTimeout(() => {
            setSelectedId(null);
            setFeedback("idle");
            answerLockRef.current = false;
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

  let activity: ReactNode;

  if (question.kind === "market") {
    activity = (
      <MarketBoard
        targetId={
          question.marketTarget ?? ""
        }
      />
    );
  } else {
    activity = (
      <ShapeTableBoard
        question={question}
      />
    );
  }

  const answerOptions =
    question.choices.map((choice) => {
      const locationParts =
        choice.id.split("-");

      const locationColumnIndex =
        Number(locationParts[1]);

      const locationColumn =
        COLUMNS[locationColumnIndex];

      return {
        id: choice.id,
        ariaLabel: choice.label,

        content:
          question.kind === "locate" &&
          locationColumn ? (
            <span style={styles.locationAnswer}>
              <ShapeIcon
                kind={locationColumn.shape}
                color={COLORS.gold}
                size={25}
              />

              <span>{choice.label}</span>
            </span>
          ) : (
            <span style={styles.numberAnswer}>
              {choice.label}
            </span>
          ),
      };
    });

  if (complete) {
    return (
      <LessonCompleteAny
        lessonKey="lesson45"
        title="أَحْسَنْتَ!"
        subtitle="أَتْقَنْتَ قِرَاءَةَ الْجَدْوَلِ وَإِتْمَامَهُ."
        nextPath="/world2-lesson/46"
        onNext={() =>
          navigate("/world2-lesson/46")
        }
        onContinue={() =>
          navigate("/world2-lesson/46")
        }
      />
    );
  }

  return (
    <UnifiedExerciseScreenV2
      index={questionIndex}
      total={missionQuestions.length}
      missionTitle={
        MISSION_TITLES[mission]
      }
      questionWords={questionWords}
      activeWordIndex={
        activeWordIndex
      }
      activeWord={
        activeWordIndex >= 0
          ? questionWords[
              activeWordIndex
            ] ?? ""
          : ""
      }
      onReplay={replayQuestion}
      isPlaying={isPlaying}
      activity={activity}
      answers={
        <UnifiedExerciseAnswersV2
          options={answerOptions}
          selectedId={selectedId}
          feedback={feedback}
          correctId={question.answer}
          showCorrect={false}
          onSelect={selectAnswer}
          variant="text"
          columns={
            question.kind === "locate"
              ? 1
              : 3
          }
          disabled={
            feedback !== "idle"
          }
        />
      }
      feedback={feedback}
      activityLabel="الجدول"
      answersLabel="اختر الإجابة الصحيحة"
    />
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  activityCard: {
    width: "100%",
    maxWidth: 620,
    boxSizing: "border-box",
    margin: "0 auto",
    padding: "16px 10px",
    border: `4px solid ${COLORS.gold}`,
    borderRadius: 29,
    background:
      "linear-gradient(145deg,#ffffff,#fff7dd)",
    boxShadow:
      "0 12px 25px rgba(23,54,95,.14)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 13,
  },

  marketCards: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "repeat(4,minmax(0,1fr))",
    gap: 7,
  },

  marketCard: {
    minWidth: 0,
    padding: "8px 3px",
    borderRadius: 17,
    border: `3px solid ${COLORS.gold}`,
    background: COLORS.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    boxShadow:
      "0 5px 11px rgba(0,0,0,.08)",
  },

  marketEmoji: {
    fontSize:
      "clamp(27px,8vw,43px)",
    lineHeight: 1.1,
  },

  marketPrice: {
    color: COLORS.navy,
    fontSize:
      "clamp(19px,5.5vw,29px)",
    direction: "ltr",
  },

  currency: {
    color: COLORS.brown,
    fontWeight: 900,
    fontSize:
      "clamp(9px,2.6vw,13px)",
  },

  marketTable: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    border: `3px solid ${COLORS.navy}`,
    borderRadius: 19,
    overflow: "hidden",
    background: COLORS.white,
  },

  marketHeader: {
    padding: "9px 5px",
    background: COLORS.navy,
    color: COLORS.white,
    fontSize:
      "clamp(14px,4vw,20px)",
    fontWeight: 1000,
    textAlign: "center",
    borderLeft:
      "1px solid rgba(255,255,255,.35)",
  },

  marketCell: {
    minHeight: 42,
    padding: "5px",
    borderTop: "2px solid #d9c991",
    borderLeft: "2px solid #d9c991",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    color: COLORS.navy,
    fontSize:
      "clamp(16px,4.7vw,24px)",
    fontWeight: 1000,
  },

  targetCell: {
    background: "#fff0ae",
    color: COLORS.brown,
    fontSize:
      "clamp(27px,8vw,42px)",
    boxShadow:
      `inset 0 0 0 3px ${COLORS.gold}`,
  },

  shapeSource: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "repeat(3,minmax(0,1fr))",
    gap: 6,
    padding: 7,
    boxSizing: "border-box",
    borderRadius: 18,
    background: "#fffdf6",
    border: `3px solid ${COLORS.gold}`,
  },

  shapeGroup: {
    minHeight: 46,
    borderRadius: 13,
    background: COLORS.white,
    border: "2px solid #e3d39d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
    padding: 4,
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },

  matrixTable: {
    width: "100%",
    minWidth: 310,
    display: "grid",
    gridTemplateColumns:
      "1.15fr repeat(3,1fr)",
    border: `3px solid ${COLORS.navy}`,
    borderRadius: 19,
    overflow: "hidden",
    background: COLORS.white,
  },

  cornerCell: {
    minHeight: 46,
    display: "grid",
    placeItems: "center",
    background: COLORS.navy,
    color: COLORS.white,
    fontWeight: 1000,
    fontSize: 24,
  },

  columnHeader: {
    minHeight: 46,
    display: "grid",
    placeItems: "center",
    background: "#edf3fb",
    borderRight: "2px solid #cad6e8",
  },

  rowHeader: {
    minHeight: 52,
    padding: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 2,
    background: "#fff6d8",
    borderTop: "2px solid #dbc991",
    color: COLORS.navy,
    fontWeight: 1000,
  },

  matrixCell: {
    minHeight: 52,
    display: "grid",
    placeItems: "center",
    borderTop: "2px solid #dbc991",
    borderRight: "2px solid #dbc991",
    color: COLORS.navy,
    fontSize:
      "clamp(23px,7vw,38px)",
    fontWeight: 1000,
  },

  highlightCell: {
    background: "#fff0a8",
    boxShadow:
      `inset 0 0 0 4px ${COLORS.gold}`,
    color: COLORS.brown,
  },

  wrongCell: {
    background: "#ffe1df",
    boxShadow:
      `inset 0 0 0 4px ${COLORS.red}`,
    color: COLORS.red,
    textDecoration: "line-through",
  },

  targetShapeCard: {
    minWidth:
      "clamp(190px,60vw,330px)",
    padding: "14px 18px",
    borderRadius: 23,
    border: `4px solid ${COLORS.gold}`,
    background: COLORS.white,
    color: COLORS.navy,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    fontSize:
      "clamp(18px,5vw,27px)",
    boxShadow:
      "0 7px 15px rgba(0,0,0,.1)",
  },

  activityHint: {
    color: COLORS.navy,
    fontSize:
      "clamp(15px,4.4vw,22px)",
    fontWeight: 1000,
    lineHeight: 1.5,
    textAlign: "center",
  },

  numberAnswer: {
    color: COLORS.navy,
    fontSize:
      "clamp(29px,9vw,48px)",
    fontWeight: 1000,
    direction: "ltr",
    unicodeBidi: "isolate",
  },

  locationAnswer: {
    width: "100%",
    color: COLORS.navy,
    fontSize:
      "clamp(17px,4.7vw,24px)",
    fontWeight: 1000,
    lineHeight: 1.5,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
  },
};
