import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import LessonCompleteV2 from "../components/LessonCompleteV2";
import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";

import "./lesson66-exercises.css";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_66_mobilize_knowledge_3/exercises";

const CORRECT_SOUND =
  "/audio/v2_feedback/correct.mp3";

const RETRY_SOUND =
  "/audio/v2_feedback/retry.mp3";

const AUTO_PLAY_DELAY = 320;
const FEEDBACK_DELAY = 760;

type Mission = 1 | 2 | 3 | 4;

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
  | "animal"
  | "operation"
  | "table"
  | "behavior";

type Choice = {
  id: string;
  label: string;
  emoji?: string;
};

type Lesson66Question = {
  id: string;
  mission: Mission;
  kind: QuestionKind;

  prompt: string;
  audioKey: string;

  choices: Choice[];
  answer: string;

  left?: number;
  right?: number;
  operator?: "+" | "-";
  result?: number;

  counts?: number[];

  sceneEmoji?: string;
  sceneText?: string;
  image?: string;
};

const QUESTIONS: Lesson66Question[] = [
  // =========================================================
  // التمرين 1: الحيوانات الأليفة
  // =========================================================
  {
    id: "l66_ex1_q1",
    mission: 1,
    kind: "animal",
    prompt:
      "جِدِ الْحَيَوَانَ الْأَلِيفَ",
    audioKey: "l66_ex1_q1",
    sceneEmoji: "🏡🌳",
    sceneText:
      "حَيَوَانَاتٌ فِي الْمَزْرَعَةِ",
    image: "/lessons/v2/lesson66-exercises/s1.webp",
    choices: [
      {
        id: "a",
        label: "بَقَرَةٌ",
      },
      {
        id: "b",
        label: "أَسَدٌ",
      },
      {
        id: "c",
        label: "حُوتٌ",
      },
      {
        id: "d",
        label: "نَسْرٌ",
      },
    ],
    answer: "a",
  },
  {
    id: "l66_ex1_q2",
    mission: 1,
    kind: "animal",
    prompt:
      "جِدِ الْحَيَوَانَ الْأَلِيفَ",
    audioKey: "l66_ex1_q2",
    sceneEmoji: "🌾🚜",
    sceneText:
      "حَيَوَانَاتٌ حَوْلَ الْحَقْلِ",
    image: "/lessons/v2/lesson66-exercises/s2.webp",
    choices: [
      {
        id: "a",
        label: "نَمِرٌ",
      },
      {
        id: "b",
        label: "خَرُوفٌ",
      },
      {
        id: "c",
        label: "قِرْشٌ",
      },
      {
        id: "d",
        label: "تِمْسَاحٌ",
      },
    ],
    answer: "b",
  },
  {
    id: "l66_ex1_q3",
    mission: 1,
    kind: "animal",
    prompt:
      "جِدِ الْحَيَوَانَ الْأَلِيفَ",
    audioKey: "l66_ex1_q3",
    sceneEmoji: "🌳🪺",
    sceneText:
      "حَيَوَانَاتٌ بِالْمَزْرَعَةِ",
    image: "/lessons/v2/lesson66-exercises/s3.webp",
    choices: [
      {
        id: "a",
        label: "ذِئْبٌ",
      },
      {
        id: "b",
        label: "دُلْفِينٌ",
      },
      {
        id: "c",
        label: "حِصَانٌ",
      },
      {
        id: "d",
        label: "ثُعْبَانٌ",
      },
    ],
    answer: "c",
  },
  {
    id: "l66_ex1_q4",
    mission: 1,
    kind: "animal",
    prompt:
      "جِدِ الْحَيَوَانَ الْأَلِيفَ",
    audioKey: "l66_ex1_q4",
    sceneEmoji: "🏠🌿",
    sceneText:
      "حَيَوَانَاتٌ قُرْبَ الْبَيْتِ",
    image: "/lessons/v2/lesson66-exercises/s4.webp",
    choices: [
      {
        id: "a",
        label: "دُبٌّ",
      },
      {
        id: "b",
        label: "أُخْطُبُوطٌ",
      },
      {
        id: "c",
        label: "صَقْرٌ",
      },
      {
        id: "d",
        label: "دَجَاجَةٌ",
      },
    ],
    answer: "d",
  },

  // =========================================================
  // التمرين 2: الجمع والطرح
  // =========================================================
  {
    id: "l66_ex2_q1",
    mission: 2,
    kind: "operation",
    prompt:
      "اِحْسِبِ النَّاتِجَ",
    audioKey: "l66_ex2_q1",
    left: 18,
    right: 4,
    operator: "+",
    result: 22,
    choices: [
      { id: "a", label: "22" },
      { id: "b", label: "20" },
      { id: "c", label: "23" },
      { id: "d", label: "21" },
    ],
    answer: "a",
  },
  {
    id: "l66_ex2_q2",
    mission: 2,
    kind: "operation",
    prompt:
      "اِحْسِبِ النَّاتِجَ",
    audioKey: "l66_ex2_q2",
    left: 40,
    right: 5,
    operator: "-",
    result: 35,
    choices: [
      { id: "a", label: "34" },
      { id: "b", label: "35" },
      { id: "c", label: "36" },
      { id: "d", label: "45" },
    ],
    answer: "b",
  },
  {
    id: "l66_ex2_q3",
    mission: 2,
    kind: "operation",
    prompt:
      "اِحْسِبِ النَّاتِجَ",
    audioKey: "l66_ex2_q3",
    left: 16,
    right: 7,
    operator: "+",
    result: 23,
    choices: [
      { id: "a", label: "22" },
      { id: "b", label: "24" },
      { id: "c", label: "23" },
      { id: "d", label: "21" },
    ],
    answer: "c",
  },
  {
    id: "l66_ex2_q4",
    mission: 2,
    kind: "operation",
    prompt:
      "اِحْسِبِ النَّاتِجَ",
    audioKey: "l66_ex2_q4",
    left: 32,
    right: 8,
    operator: "-",
    result: 24,
    choices: [
      { id: "a", label: "25" },
      { id: "b", label: "23" },
      { id: "c", label: "26" },
      { id: "d", label: "24" },
    ],
    answer: "d",
  },

  // =========================================================
  // التمرين 3: قراءة جدول وحساب المجموع
  // =========================================================
  {
    id: "l66_ex3_q1",
    mission: 3,
    kind: "table",
    prompt:
      "اِحْسِبِ الْمَجْمُوعَ",
    audioKey: "l66_ex3_q1",
    counts: [6, 5, 8, 6, 2],
    choices: [
      { id: "a", label: "27" },
      { id: "b", label: "26" },
      { id: "c", label: "28" },
      { id: "d", label: "25" },
    ],
    answer: "a",
  },
  {
    id: "l66_ex3_q2",
    mission: 3,
    kind: "table",
    prompt:
      "اِحْسِبِ الْمَجْمُوعَ",
    audioKey: "l66_ex3_q2",
    counts: [4, 7, 5, 3, 6],
    choices: [
      { id: "a", label: "24" },
      { id: "b", label: "25" },
      { id: "c", label: "26" },
      { id: "d", label: "23" },
    ],
    answer: "b",
  },
  {
    id: "l66_ex3_q3",
    mission: 3,
    kind: "table",
    prompt:
      "اِحْسِبِ الْمَجْمُوعَ",
    audioKey: "l66_ex3_q3",
    counts: [8, 4, 6, 5, 7],
    choices: [
      { id: "a", label: "29" },
      { id: "b", label: "31" },
      { id: "c", label: "30" },
      { id: "d", label: "28" },
    ],
    answer: "c",
  },
  {
    id: "l66_ex3_q4",
    mission: 3,
    kind: "table",
    prompt:
      "اِحْسِبِ الْمَجْمُوعَ",
    audioKey: "l66_ex3_q4",
    counts: [3, 6, 4, 8, 5],
    choices: [
      { id: "a", label: "25" },
      { id: "b", label: "27" },
      { id: "c", label: "24" },
      { id: "d", label: "26" },
    ],
    answer: "d",
  },

  // =========================================================
  // التمرين 4: السلوك الصحيح
  // =========================================================
  {
    id: "l66_ex4_q1",
    mission: 4,
    kind: "behavior",
    prompt:
      "جِدِ السُّلُوكَ الصَّحِيحَ",
    audioKey: "l66_ex4_q1",
    sceneEmoji: "🐄🌿",
    sceneText:
      "أُقَدِّمُ الْمَاءَ لِلْبَقَرَةِ",
    image: "/lessons/v2/lesson66-exercises/s5.webp",
    choices: [
      {
        id: "a",
        label: "أُقَدِّمُ لَهَا الْمَاءَ",
      },
      {
        id: "b",
        label: "أَرْمِي عَلَيْهَا الْحِجَارَةَ",
      },
      {
        id: "c",
        label: "أُخِيفُهَا",
      },
      {
        id: "d",
        label: "أُؤْذِيهَا",
      },
    ],
    answer: "a",
  },
  {
    id: "l66_ex4_q2",
    mission: 4,
    kind: "behavior",
    prompt:
      "جِدِ السُّلُوكَ الصَّحِيحَ",
    audioKey: "l66_ex4_q2",
    sceneEmoji: "🐈🏠",
    sceneText:
      "أُقَدِّمُ الْعَلَفَ لِلْخَرُوفِ",
    image: "/lessons/v2/lesson66-exercises/s6.webp",
    choices: [
      {
        id: "a",
        label: "أَتْرُكُهُ جَائِعًا",
      },
      {
        id: "b",
        label: "أُقَدِّمُ لَهُ الْعَلَفَ",
      },
      {
        id: "c",
        label: "أُطَارِدُهُ",
      },
      {
        id: "d",
        label: "أُخِيفُهُ",
      },
    ],
    answer: "b",
  },
  {
    id: "l66_ex4_q3",
    mission: 4,
    kind: "behavior",
    prompt:
      "جِدِ السُّلُوكَ الصَّحِيحَ",
    audioKey: "l66_ex4_q3",
    sceneEmoji: "🌳🐦",
    sceneText:
      "أُقَدِّمُ الْحُبُوبَ لِلدَّجَاجِ",
    image: "/lessons/v2/lesson66-exercises/s7.webp",
    choices: [
      {
        id: "a",
        label: "أُطَارِدُ الدَّجَاجَ",
      },
      {
        id: "b",
        label: "أُخِيفُ الدَّجَاجَ",
      },
      {
        id: "c",
        label: "أُقَدِّمُ لَهَا الْحُبُوبَ",
      },
      {
        id: "d",
        label: "أَرْمِي النُّفَايَاتِ",
      },
    ],
    answer: "c",
  },
  {
    id: "l66_ex4_q4",
    mission: 4,
    kind: "behavior",
    prompt:
      "جِدِ السُّلُوكَ الصَّحِيحَ",
    audioKey: "l66_ex4_q4",
    sceneEmoji: "🌊🐟",
    sceneText:
      "أُنَظِّفُ مَكَانَ حَيَوَانَاتِ الْمَزْرَعَةِ",
    image: "/lessons/v2/lesson66-exercises/s8.webp",
    choices: [
      {
        id: "a",
        label: "أَرْمِي النُّفَايَاتِ فِي الْمَزْرَعَةِ",
      },
      {
        id: "b",
        label: "أَتْرُكُ الْمَكَانَ مُتَّسِخًا",
      },
      {
        id: "c",
        label: "أُوَسِّخُ مَكَانَ الْحَيَوَانَاتِ",
      },
      {
        id: "d",
        label: "أَجْمَعُ النُّفَايَاتِ",
      },
    ],
    answer: "d",
  },
];

const TABLE_NAMES = [
  "أَمِين",
  "يَاسَمِين",
  "سَامِي",
  "مُصْطَفَى",
  "أَنِيس",
];

const LessonCompleteAny =
  LessonCompleteV2 as any;

function playFeedback(
  source: string,
) {
  try {
    const audio = new Audio(source);
    audio.volume = 0.9;

    audio
      .play()
      .catch(() => undefined);
  } catch {
    // لا شيء.
  }
}


function FarmBoard({
  image,
  text,
}: {
  image: string;
  text: string;
}) {
  return (
    <div style={styles.farmBoard}>
      <img
        src={image}
        alt={text}
        style={{
          width: "100%",
          height: "clamp(210px,50vw,320px)",
          objectFit: "cover",
          display: "block",
          borderRadius: 24,
          border: "3px solid rgba(237,178,31,.55)",
        }}
      />

      <strong style={styles.boardCaption}>
        {text}
      </strong>
    </div>
  );
}

function OperationBoard({
  left,
  right,
  operator,
  result,
  showResult,
}: {
  left: number;
  right: number;
  operator: "+" | "-";
  result: number;
  showResult: boolean;
}) {
  return (
    <div style={styles.operationBoard}>
      <div
        style={styles.equationRow}
        dir="rtl"
      >
        <div style={styles.numberCard}>
          <span style={styles.numberEmoji}>
            {operator === "+" ? "🧺" : "📦"}
          </span>

          <strong>{left}</strong>
        </div>

        <div style={styles.operatorCard}>
          {operator}
        </div>

        <div style={styles.numberCard}>
          <span style={styles.numberEmoji}>
            {operator === "+" ? "🍎" : "🧱"}
          </span>

          <strong>{right}</strong>
        </div>
      </div>

      <div
        style={styles.resultRow}
        dir="rtl"
      >
        <div style={styles.resultBox}>
          {showResult ? result : "؟"}
        </div>

        <div style={styles.equalsCard}>
          =
        </div>
      </div>
    </div>
  );
}


function TableBoard({
  counts,
  showResult,
}: {
  counts: number[];
  showResult: boolean;
}) {
  const total = counts.reduce(
    (sum, count) => sum + count,
    0,
  );

  return (
    <div style={styles.tableBoard}>
      <div style={styles.tableTitle}>
        عَدَدُ السَّلَّاتِ
      </div>

      <div style={styles.tableGrid}>
        <strong style={styles.tableHeader}>
          الِاسْمُ
        </strong>

        <strong style={styles.tableHeader}>
          الْعَدَدُ
        </strong>

        {counts.map((count, index) => (
          <div
            key={`${TABLE_NAMES[index]}-${count}`}
            style={{ display: "contents" }}
          >
            <div style={styles.tableCell}>
              {TABLE_NAMES[index]}
            </div>

            <div
              style={{
                ...styles.tableCell,
                ...styles.tableNumber,
              }}
              dir="ltr"
            >
              {count}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.totalQuestion}>
        {showResult
          ? `الْمَجْمُوعُ = ${total}`
          : "الْمَجْمُوعُ = ؟"}
      </div>
    </div>
  );
}


function BehaviorBoard({
  image,
  text,
}: {
  image: string;
  text: string;
}) {
  return (
    <div style={styles.behaviorBoard}>
      <img
        src={image}
        alt={text}
        style={{
          width: "100%",
          height: "clamp(210px,50vw,320px)",
          objectFit: "cover",
          display: "block",
          borderRadius: 24,
        }}
      />

    </div>
  );
}

function renderActivity(
  question: Lesson66Question,
  showResult: boolean,
): ReactNode {
  if (question.kind === "animal") {
    return (
      <FarmBoard
        image={question.image ?? ""}
        text={
          question.sceneText ??
          "حَيَوَانَاتُ الْمَزْرَعَةِ"
        }
      />
    );
  }

  if (question.kind === "operation") {
    return (
      <OperationBoard
        left={question.left ?? 0}
        right={question.right ?? 0}
        operator={question.operator ?? "+"}
        result={question.result ?? 0}
        showResult={showResult}
      />
    );
  }

  if (question.kind === "table") {
    return (
      <TableBoard
        counts={
          question.counts ??
          [0, 0, 0, 0, 0]
        }
        showResult={showResult}
      />
    );
  }

  return (
    <BehaviorBoard
      image={question.image ?? ""}
      text={
        question.sceneText ??
        "أَعْتَنِي بِحَيَوَانَاتِ الْمَزْرَعَةِ"
      }
    />
  );
}

export default function Lesson66MobilizeKnowledge3Exercises() {
  const navigate = useNavigate();

  const [mission, setMission] =
    useState<Mission>(1);

  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [feedback, setFeedback] =
    useState<FeedbackState>("idle");

  const [complete, setComplete] =
    useState(false);

  const [boundaries, setBoundaries] =
    useState<KaraokeWord[]>([]);

  const [activeWordIndex, setActiveWordIndex] =
    useState(-1);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const boundariesRef =
    useRef<KaraokeWord[]>([]);

  const answerLockedRef =
    useRef(false);

  const timerRef =
    useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-lesson66-exercises",
      "true",
    );

    return () => {
      document.documentElement.removeAttribute(
        "data-lesson66-exercises",
      );
    };
  }, []);

  const clearTimer =
    useCallback(() => {
      if (timerRef.current !== null) {
        window.clearTimeout(
          timerRef.current,
        );

        timerRef.current = null;
      }
    }, []);

  const missionQuestions =
    useMemo(
      () =>
        QUESTIONS.filter(
          (item) =>
            item.mission === mission,
        ),
      [mission],
    );

  const question =
    missionQuestions[questionIndex];
  const displayedChoices =
    question?.choices ?? [];


  const audioSource =
    `${AUDIO_BASE}/${question.audioKey}.mp3`;

  const timingSource =
    `${AUDIO_BASE}/${question.audioKey}.json`;

  useEffect(() => {
    clearTimer();

    answerLockedRef.current = false;

    setSelectedId(null);
    setFeedback("idle");
  }, [
    clearTimer,
    question.id,
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
            ? data.filter(
                (item) =>
                  item &&
                  typeof item.text === "string",
              )
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
      if (cancelled) return;

      setIsPlaying(false);

      setActiveWordIndex(
        boundariesRef.current.length > 0
          ? boundariesRef.current.length - 1
          : -1,
      );
    };

    const onTimeUpdate = () => {
      if (cancelled) return;

      const currentMs =
        audio.currentTime * 1000;

      const words =
        boundariesRef.current;

      let active = -1;

      for (
        let index = 0;
        index < words.length;
        index += 1
      ) {
        const start =
          Number(
            words[index].offset,
          ) || 0;

        const nextStart =
          index < words.length - 1
            ? Number(
                words[index + 1].offset,
              ) || start
            : Number.POSITIVE_INFINITY;

        if (
          currentMs >= start &&
          currentMs < nextStart
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

        setActiveWordIndex(-1);
        audio.currentTime = 0;

        audio
          .play()
          .catch(() => {
            setIsPlaying(false);
          });
      }, AUTO_PLAY_DELAY);

    return () => {
      cancelled = true;

      window.clearTimeout(
        autoTimer,
      );

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

      if (
        audioRef.current === audio
      ) {
        audioRef.current = null;
      }
    };
  }, [
    audioSource,
    timingSource,
  ]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
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
          (mission + 1) as Mission,
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
          choiceId === question.answer
        ) {
          setFeedback("correct");

          playFeedback(
            CORRECT_SOUND,
          );

          timerRef.current =
            window.setTimeout(
              moveForward,
              FEEDBACK_DELAY,
            );

          return;
        }

        setFeedback("wrong");

        playFeedback(
          RETRY_SOUND,
        );

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

  const restart =
    useCallback(() => {
      clearTimer();

      answerLockedRef.current = false;

      setMission(1);
      setQuestionIndex(0);
      setSelectedId(null);
      setFeedback("idle");
      setComplete(false);
    }, [clearTimer]);

  const questionWords =
    boundaries.length > 0
      ? boundaries.map(
          (word) =>
            word.text,
        )
      : question.prompt
          .trim()
          .split(/\s+/);

  const safeActiveIndex =
    activeWordIndex >= 0
      ? Math.min(
          activeWordIndex,
          questionWords.length - 1,
        )
      : -1;

  const displayedQuestionWords =
    safeActiveIndex >= 0
      ? questionWords.slice(
          0,
          safeActiveIndex + 1,
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

  const activity =
    renderActivity(
      question,
      feedback === "correct",
    );

  const answerOptions =
    displayedChoices.map(
      (choice) => ({
        id: choice.id,
        ariaLabel: choice.label,

        content:
          question.kind === "operation" ||
          question.kind === "table" ? (
            <strong
              style={styles.numericAnswer}
              dir="ltr"
            >
              {choice.label}
            </strong>
          ) : (
            <div style={styles.textAnswer}>
              {choice.emoji && (
                <span
                  style={styles.answerEmoji}
                  aria-hidden="true"
                >
                  {choice.emoji}
                </span>
              )}

              <strong>
                {choice.label}
              </strong>
            </div>
          ),
      }),
    );

  if (complete) {
    return (
      <LessonCompleteAny
        lessonKey="lesson66"
        title="أَحْسَنْتَ يَا بَطَلُ!"
        subtitle="أَتْقَنْتَ تَمَارِينَ أُجَنِّدُ مَعَارِفِي (3)."
        nextPath="/lesson-v2/lesson67"
        nextLabel="الدَّرْسُ التَّالِي"
        onNext={() =>
          navigate(
            "/lesson-v2/lesson67",
          )
        }
        onContinue={() =>
          navigate(
            "/lesson-v2/lesson67",
          )
        }
        onRetry={restart}
        onRestart={restart}
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
      activity={activity}
      answers={
        <UnifiedExerciseAnswersV2
          options={answerOptions}
          selectedId={selectedId}
          feedback={feedback}
          correctId={question.answer}
          showCorrect={false}
          onSelect={selectAnswer}
          variant={
            question.kind === "operation" ||
            question.kind === "table"
              ? "number"
              : "text"
          }
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
      activityLabel="محتوى تمرين الدرس 66"
      answersLabel="خيارات الإجابة"
    />
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  farmBoard: {
    width: "100%",
    maxWidth: 620,
    minHeight: 280,
    margin: "0 auto",
    padding: 18,
    boxSizing: "border-box",
    border: "5px solid #edb21f",
    borderRadius: 30,
    background:
      "linear-gradient(180deg,#dff5ff 0%,#efffe9 58%,#f8df9c 100%)",
    color: "#17365f",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    boxShadow:
      "0 12px 25px rgba(23,54,95,.15)",
  },

  farmLandscape: {
    width: "100%",
    minHeight: 170,
    borderRadius: 24,
    background:
      "rgba(255,255,255,.62)",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 12,
    padding: 16,
    boxSizing: "border-box",
    fontSize:
      "clamp(48px,13vw,78px)",
  },

  boardCaption: {
    fontSize:
      "clamp(20px,5.5vw,29px)",
    textAlign: "center",
    lineHeight: 1.5,
  },

  operationBoard: {
    width: "100%",
    maxWidth: 620,
    minHeight: 300,
    margin: "0 auto",
    padding: 18,
    boxSizing: "border-box",
    border: "5px solid #edb21f",
    borderRadius: 30,
    background: "#fff",
    color: "#17365f",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 18,
    boxShadow:
      "0 12px 25px rgba(23,54,95,.15)",
  },

  equationRow: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1fr) 78px minmax(0,1fr)",
    alignItems: "center",
    gap: 10,
    direction: "rtl",
  },

  numberCard: {
    minWidth: 0,
    minHeight: 155,
    border: "4px solid #a9ccec",
    borderRadius: 25,
    background:
      "linear-gradient(145deg,#f4fbff,#e8f4ff)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    direction: "ltr",
    fontSize:
      "clamp(39px,11vw,62px)",
    fontWeight: 1000,
  },

  numberEmoji: {
    fontSize:
      "clamp(42px,11vw,66px)",
    lineHeight: 1,
  },

  operatorCard: {
    width: 70,
    height: 82,
    border: "4px solid #a9ccec",
    borderRadius: 22,
    background: "#edf7ff",
    display: "grid",
    placeItems: "center",
    direction: "ltr",
    fontSize: 46,
    fontWeight: 1000,
  },

  resultRow: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1fr) 78px",
    alignItems: "center",
    gap: 10,
    direction: "rtl",
  },

  equalsCard: {
    width: 70,
    height: 78,
    border: "4px solid #f0c75d",
    borderRadius: 22,
    background: "#fff4d2",
    display: "grid",
    placeItems: "center",
    direction: "ltr",
    fontSize: 42,
    fontWeight: 1000,
    color: "#7b3f18",
  },

  resultBox: {
    minHeight: 98,
    border: "4px solid #edb21f",
    borderRadius: 24,
    background: "#fff",
    display: "grid",
    placeItems: "center",
    direction: "ltr",
    fontSize:
      "clamp(42px,12vw,66px)",
    fontWeight: 1000,
  },

  tableBoard: {
    width: "100%",
    maxWidth: 520,
    minHeight: 310,
    margin: "0 auto",
    padding: 16,
    boxSizing: "border-box",
    border: "5px solid #edb21f",
    borderRadius: 30,
    background:
      "linear-gradient(145deg,#ffffff,#fff9e7)",
    color: "#17365f",
    boxShadow:
      "0 12px 25px rgba(23,54,95,.15)",
  },

  tableTitle: {
    marginBottom: 10,
    textAlign: "center",
    fontSize:
      "clamp(21px,5.5vw,29px)",
    fontWeight: 1000,
  },

  tableGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1fr) 110px",
    borderTop: "3px solid #17365f",
    borderRight: "3px solid #17365f",
    direction: "rtl",
  },

  tableHeader: {
    padding: "7px 8px",
    borderLeft: "3px solid #17365f",
    borderBottom: "3px solid #17365f",
    background: "#fff1b6",
    textAlign: "center",
    fontSize:
      "clamp(16px,4.3vw,21px)",
  },

  tableCell: {
    padding: "5px 8px",
    borderLeft: "3px solid #17365f",
    borderBottom: "3px solid #17365f",
    background: "#fff",
    textAlign: "center",
    fontSize:
      "clamp(15px,4vw,20px)",
    fontWeight: 800,
  },

  tableNumber: {
    direction: "ltr",
    fontSize:
      "clamp(20px,5.2vw,27px)",
    fontWeight: 1000,
  },

  totalQuestion: {
    width: "fit-content",
    margin: "12px auto 0",
    padding: "7px 20px",
    border: "3px solid #edb21f",
    borderRadius: 999,
    background: "#fff",
    direction: "rtl",
    fontSize:
      "clamp(19px,5vw,26px)",
    fontWeight: 1000,
  },

  behaviorBoard: {
    width: "100%",
    maxWidth: 580,
    minHeight: 280,
    margin: "0 auto",
    padding: 20,
    boxSizing: "border-box",
    border: "5px solid #edb21f",
    borderRadius: 30,
    background:
      "linear-gradient(145deg,#efffe9,#dff5ff)",
    color: "#17365f",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    textAlign: "center",
    fontSize:
      "clamp(20px,5.4vw,29px)",
    boxShadow:
      "0 12px 25px rgba(23,54,95,.15)",
  },

  behaviorScene: {
    fontSize:
      "clamp(72px,20vw,120px)",
    lineHeight: 1.1,
  },

  behaviorHint: {
    padding: "7px 15px",
    borderRadius: 18,
    background: "rgba(255,255,255,.85)",
    color: "#137a4c",
    fontSize:
      "clamp(15px,4vw,20px)",
    fontWeight: 900,
  },

  textAnswer: {
    width: "100%",
    minHeight: 66,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    direction: "rtl",
    textAlign: "center",
    fontSize:
      "clamp(15px,4vw,21px)",
    lineHeight: 1.45,
  },

  answerEmoji: {
    fontSize:
      "clamp(30px,8vw,46px)",
    lineHeight: 1,
  },

  numericAnswer: {
    display: "block",
    direction: "ltr",
    unicodeBidi: "isolate",
    fontSize:
      "clamp(31px,9vw,48px)",
    lineHeight: 1,
    fontWeight: 1000,
  },
};
