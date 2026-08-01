import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import LessonCompleteV2 from "../components/LessonCompleteV2";
import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_43_double_number_under_10/exercises";

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
  | "visual"
  | "equation"
  | "reverse"
  | "domino";

type AnswerChoice = {
  id: string;
  label: string;

  left?: number;
  right?: number;
};

type DoubleQuestion = {
  id: string;

  mission:
    | 1
    | 2
    | 3
    | 4;

  kind: QuestionKind;

  prompt: string;
  audioKey: string;

  number: number;
  total: number;

  choices: AnswerChoice[];
  answer: string;
};

const MISSION_TITLES = {
  1: "أُكَوِّنُ الضِّعْفَ",
  2: "أُكْمِلُ الْعَمَلِيَّةَ",
  3: "أَكْتَشِفُ الْعَدَدَ",
  4: "أَخْتَارُ بَطَاقَةَ الضِّعْفِ",
} as const;

const QUESTIONS: DoubleQuestion[] = [
  // ==============================================
  // التمرين 1: مجموعتان متساويتان
  // ==============================================
  {
    id: "l43_ex1_q1",
    mission: 1,
    kind: "visual",
    prompt:
      "فِي كُلِّ مَجْمُوعَةٍ نُقْطَتَانِ. مَا ضِعْفُ الْعَدَدِ اثْنَيْنِ؟",
    audioKey: "l43_ex1_q1",
    number: 2,
    total: 4,
    choices: [
      {
        id: "4",
        label: "4",
      },
      {
        id: "5",
        label: "5",
      },
      {
        id: "3",
        label: "3",
      },
    ],
    answer: "4",
  },

  {
    id: "l43_ex1_q2",
    mission: 1,
    kind: "visual",
    prompt:
      "فِي كُلِّ مَجْمُوعَةٍ ثَلَاثُ نِقَاطٍ. مَا ضِعْفُ الْعَدَدِ ثَلَاثَةٍ؟",
    audioKey: "l43_ex1_q2",
    number: 3,
    total: 6,
    choices: [
      {
        id: "5",
        label: "5",
      },
      {
        id: "6",
        label: "6",
      },
      {
        id: "7",
        label: "7",
      },
    ],
    answer: "6",
  },

  {
    id: "l43_ex1_q3",
    mission: 1,
    kind: "visual",
    prompt:
      "فِي كُلِّ مَجْمُوعَةٍ أَرْبَعُ نِقَاطٍ. مَا ضِعْفُ الْعَدَدِ أَرْبَعَةٍ؟",
    audioKey: "l43_ex1_q3",
    number: 4,
    total: 8,
    choices: [
      {
        id: "8",
        label: "8",
      },
      {
        id: "7",
        label: "7",
      },
      {
        id: "9",
        label: "9",
      },
    ],
    answer: "8",
  },

  {
    id: "l43_ex1_q4",
    mission: 1,
    kind: "visual",
    prompt:
      "فِي كُلِّ مَجْمُوعَةٍ خَمْسُ نِقَاطٍ. مَا ضِعْفُ الْعَدَدِ خَمْسَةٍ؟",
    audioKey: "l43_ex1_q4",
    number: 5,
    total: 10,
    choices: [
      {
        id: "9",
        label: "9",
      },
      {
        id: "11",
        label: "11",
      },
      {
        id: "10",
        label: "10",
      },
    ],
    answer: "10",
  },

  // ==============================================
  // التمرين 2: إكمال عملية العدد + نفسه
  // ==============================================
  {
    id: "l43_ex2_q1",
    mission: 2,
    kind: "equation",
    prompt:
      "أَكْمِلِ الْعَمَلِيَّةَ. سِتَّةٌ زَائِدُ سِتَّةٍ يُسَاوِي كَمْ؟",
    audioKey: "l43_ex2_q1",
    number: 6,
    total: 12,
    choices: [
      {
        id: "11",
        label: "11",
      },
      {
        id: "12",
        label: "12",
      },
      {
        id: "13",
        label: "13",
      },
    ],
    answer: "12",
  },

  {
    id: "l43_ex2_q2",
    mission: 2,
    kind: "equation",
    prompt:
      "أَكْمِلِ الْعَمَلِيَّةَ. سَبْعَةٌ زَائِدُ سَبْعَةٍ يُسَاوِي كَمْ؟",
    audioKey: "l43_ex2_q2",
    number: 7,
    total: 14,
    choices: [
      {
        id: "14",
        label: "14",
      },
      {
        id: "13",
        label: "13",
      },
      {
        id: "15",
        label: "15",
      },
    ],
    answer: "14",
  },

  {
    id: "l43_ex2_q3",
    mission: 2,
    kind: "equation",
    prompt:
      "أَكْمِلِ الْعَمَلِيَّةَ. ثَمَانِيَةٌ زَائِدُ ثَمَانِيَةٍ يُسَاوِي كَمْ؟",
    audioKey: "l43_ex2_q3",
    number: 8,
    total: 16,
    choices: [
      {
        id: "15",
        label: "15",
      },
      {
        id: "17",
        label: "17",
      },
      {
        id: "16",
        label: "16",
      },
    ],
    answer: "16",
  },

  {
    id: "l43_ex2_q4",
    mission: 2,
    kind: "equation",
    prompt:
      "أَكْمِلِ الْعَمَلِيَّةَ. تِسْعَةٌ زَائِدُ تِسْعَةٍ يُسَاوِي كَمْ؟",
    audioKey: "l43_ex2_q4",
    number: 9,
    total: 18,
    choices: [
      {
        id: "18",
        label: "18",
      },
      {
        id: "17",
        label: "17",
      },
      {
        id: "16",
        label: "16",
      },
    ],
    answer: "18",
  },

  // ==============================================
  // التمرين 3: اكتشاف العدد انطلاقًا من ضعفه
  // ==============================================
  {
    id: "l43_ex3_q1",
    mission: 3,
    kind: "reverse",
    prompt:
      "الْعَدَدُ أَرْبَعَةٌ هُوَ ضِعْفُ أَيِّ عَدَدٍ؟",
    audioKey: "l43_ex3_q1",
    number: 2,
    total: 4,
    choices: [
      {
        id: "1",
        label: "1",
      },
      {
        id: "2",
        label: "2",
      },
      {
        id: "3",
        label: "3",
      },
    ],
    answer: "2",
  },

  {
    id: "l43_ex3_q2",
    mission: 3,
    kind: "reverse",
    prompt:
      "الْعَدَدُ سِتَّةٌ هُوَ ضِعْفُ أَيِّ عَدَدٍ؟",
    audioKey: "l43_ex3_q2",
    number: 3,
    total: 6,
    choices: [
      {
        id: "2",
        label: "2",
      },
      {
        id: "4",
        label: "4",
      },
      {
        id: "3",
        label: "3",
      },
    ],
    answer: "3",
  },

  {
    id: "l43_ex3_q3",
    mission: 3,
    kind: "reverse",
    prompt:
      "الْعَدَدُ عَشَرَةٌ هُوَ ضِعْفُ أَيِّ عَدَدٍ؟",
    audioKey: "l43_ex3_q3",
    number: 5,
    total: 10,
    choices: [
      {
        id: "4",
        label: "4",
      },
      {
        id: "5",
        label: "5",
      },
      {
        id: "6",
        label: "6",
      },
    ],
    answer: "5",
  },

  {
    id: "l43_ex3_q4",
    mission: 3,
    kind: "reverse",
    prompt:
      "الْعَدَدُ أَرْبَعَةَ عَشَرَ هُوَ ضِعْفُ أَيِّ عَدَدٍ؟",
    audioKey: "l43_ex3_q4",
    number: 7,
    total: 14,
    choices: [
      {
        id: "6",
        label: "6",
      },
      {
        id: "8",
        label: "8",
      },
      {
        id: "7",
        label: "7",
      },
    ],
    answer: "7",
  },

  // ==============================================
  // التمرين 4: اختيار بطاقة الدومينو الصحيحة
  // ==============================================
  {
    id: "l43_ex4_q1",
    mission: 4,
    kind: "domino",
    prompt:
      "اِخْتَرْ بَطَاقَةَ الدُّومِينُو الَّتِي تُمَثِّلُ ضِعْفَ الْعَدَدِ وَاحِدٍ.",
    audioKey: "l43_ex4_q1",
    number: 1,
    total: 2,
    choices: [
      {
        id: "1-1",
        label: "1 + 1",
        left: 1,
        right: 1,
      },
      {
        id: "1-2",
        label: "1 + 2",
        left: 1,
        right: 2,
      },
      {
        id: "2-2",
        label: "2 + 2",
        left: 2,
        right: 2,
      },
    ],
    answer: "1-1",
  },

  {
    id: "l43_ex4_q2",
    mission: 4,
    kind: "domino",
    prompt:
      "اِخْتَرْ بَطَاقَةَ الدُّومِينُو الَّتِي تُمَثِّلُ ضِعْفَ الْعَدَدِ أَرْبَعَةٍ.",
    audioKey: "l43_ex4_q2",
    number: 4,
    total: 8,
    choices: [
      {
        id: "4-4",
        label: "4 + 4",
        left: 4,
        right: 4,
      },
      {
        id: "4-5",
        label: "4 + 5",
        left: 4,
        right: 5,
      },
      {
        id: "3-4",
        label: "3 + 4",
        left: 3,
        right: 4,
      },
    ],
    answer: "4-4",
  },

  {
    id: "l43_ex4_q3",
    mission: 4,
    kind: "domino",
    prompt:
      "اِخْتَرْ بَطَاقَةَ الدُّومِينُو الَّتِي تُمَثِّلُ ضِعْفَ الْعَدَدِ سِتَّةٍ.",
    audioKey: "l43_ex4_q3",
    number: 6,
    total: 12,
    choices: [
      {
        id: "5-6",
        label: "5 + 6",
        left: 5,
        right: 6,
      },
      {
        id: "6-6",
        label: "6 + 6",
        left: 6,
        right: 6,
      },
      {
        id: "6-7",
        label: "6 + 7",
        left: 6,
        right: 7,
      },
    ],
    answer: "6-6",
  },

  {
    id: "l43_ex4_q4",
    mission: 4,
    kind: "domino",
    prompt:
      "اِخْتَرْ بَطَاقَةَ الدُّومِينُو الَّتِي تُمَثِّلُ ضِعْفَ الْعَدَدِ تِسْعَةٍ.",
    audioKey: "l43_ex4_q4",
    number: 9,
    total: 18,
    choices: [
      {
        id: "8-9",
        label: "8 + 9",
        left: 8,
        right: 9,
      },
      {
        id: "9-9",
        label: "9 + 9",
        left: 9,
        right: 9,
      },
      {
        id: "8-8",
        label: "8 + 8",
        left: 8,
        right: 8,
      },
    ],
    answer: "9-9",
  },
];

function playSound(
  source: string,
) {
  const audio =
    new Audio(source);

  audio.volume = 0.9;

  audio
    .play()
    .catch(() => undefined);
}

function DotGrid({
  count,
  compact = false,
}: {
  count: number;
  compact?: boolean;
}) {
  return (
    <div
      aria-label={`${count} نقاط`}
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(3, 1fr)",
        gridTemplateRows:
          "repeat(3, 1fr)",
        gap: compact
          ? 4
          : 7,
        width: compact
          ? 50
          : "clamp(76px,23vw,112px)",
        height: compact
          ? 50
          : "clamp(76px,23vw,112px)",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {Array.from({
        length: 9,
      }).map((_, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{
            width: compact
              ? 9
              : "clamp(11px,3.6vw,17px)",
            height: compact
              ? 9
              : "clamp(11px,3.6vw,17px)",
            borderRadius:
              "50%",
            background:
              index < count
                ? "#17365f"
                : "transparent",
            boxShadow:
              index < count
                ? "0 2px 5px rgba(23,54,95,.23)"
                : "none",
          }}
        />
      ))}
    </div>
  );
}

function VisualDoubleBoard({
  number,
}: {
  number: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 580,
        margin: "0 auto",
        padding:
          "18px 12px",
        boxSizing:
          "border-box",
        border:
          "4px solid #edb21f",
        borderRadius: 28,
        background:
          "linear-gradient(145deg,#fff,#fff7dd)",
        boxShadow:
          "0 12px 25px rgba(23,54,95,.14)",
        display: "flex",
        alignItems:
          "center",
        justifyContent:
          "center",
        gap:
          "clamp(10px,4vw,24px)",
      }}
    >
      {[0, 1].map(
        (groupIndex) => (
          <div
            key={groupIndex}
            style={{
              padding:
                "13px 9px",
              border:
                "3px solid #17365f",
              borderRadius:
                22,
              background:
                "#ffffff",
              display:
                "flex",
              flexDirection:
                "column",
              alignItems:
                "center",
              gap: 8,
            }}
          >
            <DotGrid
              count={number}
            />

            <strong
              style={{
                color:
                  "#17365f",
                fontSize:
                  "clamp(25px,8vw,42px)",
              }}
            >
              {number}
            </strong>
          </div>
        ),
      )}

      <span
        aria-hidden="true"
        style={{
          color: "#edb21f",
          fontWeight: 1000,
          fontSize:
            "clamp(34px,10vw,58px)",
        }}
      >
        +
      </span>
    </div>
  );
}

function EquationBoard({
  number,
}: {
  number: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 580,
        margin: "0 auto",
        padding:
          "24px 12px",
        boxSizing:
          "border-box",
        border:
          "4px solid #edb21f",
        borderRadius: 28,
        background:
          "#ffffff",
        boxShadow:
          "0 12px 25px rgba(23,54,95,.14)",
        display: "flex",
        alignItems:
          "center",
        justifyContent:
          "center",
        flexWrap: "wrap",
        gap:
          "clamp(8px,3vw,17px)",
        color: "#17365f",
        fontWeight: 1000,
        fontSize:
          "clamp(38px,12vw,68px)",
      }}
    >
      <span>{number}</span>
      <span
        style={{
          color: "#edb21f",
        }}
      >
        +
      </span>
      <span>{number}</span>
      <span
        style={{
          color: "#edb21f",
        }}
      >
        =
      </span>

      <span
        style={{
          minWidth:
            "clamp(65px,19vw,100px)",
          minHeight:
            "clamp(65px,19vw,100px)",
          display:
            "inline-flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          border:
            "4px dashed #edb21f",
          borderRadius: 20,
          background:
            "#fff8df",
        }}
      >
        ?
      </span>
    </div>
  );
}

function ReverseBoard({
  total,
}: {
  total: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 580,
        margin: "0 auto",
        padding:
          "24px 12px",
        boxSizing:
          "border-box",
        border:
          "4px solid #edb21f",
        borderRadius: 28,
        background:
          "linear-gradient(145deg,#fff,#fff7dd)",
        boxShadow:
          "0 12px 25px rgba(23,54,95,.14)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color:
            "#17365f",
          fontWeight: 1000,
          fontSize:
            "clamp(18px,5vw,27px)",
          marginBottom: 9,
        }}
      >
        هَذَا هُوَ الضِّعْفُ
      </div>

      <div
        style={{
          width:
            "clamp(116px,35vw,180px)",
          height:
            "clamp(116px,35vw,180px)",
          margin:
            "0 auto",
          borderRadius:
            "50%",
          background:
            "#17365f",
          border:
            "7px solid #edb21f",
          color: "#ffffff",
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          fontWeight: 1000,
          fontSize:
            "clamp(54px,17vw,90px)",
          boxShadow:
            "0 10px 22px rgba(23,54,95,.25)",
        }}
      >
        {total}
      </div>

      <div
        style={{
          marginTop: 12,
          color:
            "#17365f",
          fontWeight: 1000,
          fontSize:
            "clamp(19px,5.5vw,29px)",
        }}
      >
        ضِعْفُ أَيِّ عَدَدٍ؟
      </div>
    </div>
  );
}

function MiniDomino({
  left,
  right,
}: {
  left: number;
  right: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection:
          "column",
        alignItems:
          "center",
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          border:
            "3px solid #17365f",
          borderRadius: 15,
          overflow:
            "hidden",
          background:
            "#ffffff",
          boxShadow:
            "0 5px 11px rgba(23,54,95,.13)",
        }}
      >
        <div
          style={{
            padding: 7,
            borderLeft:
              "2px solid #17365f",
          }}
        >
          <DotGrid
            count={left}
            compact
          />
        </div>

        <div
          style={{
            padding: 7,
          }}
        >
          <DotGrid
            count={right}
            compact
          />
        </div>
      </div>

      <strong
        style={{
          color: "#17365f",
          fontSize:
            "clamp(17px,4.7vw,24px)",
          direction: "ltr",
        }}
      >
        {left} + {right}
      </strong>
    </div>
  );
}

function DominoActivity({
  number,
}: {
  number: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 580,
        margin: "0 auto",
        padding:
          "20px 12px",
        boxSizing:
          "border-box",
        border:
          "4px solid #edb21f",
        borderRadius: 28,
        background:
          "#ffffff",
        boxShadow:
          "0 12px 25px rgba(23,54,95,.14)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color:
            "#17365f",
          fontWeight: 1000,
          fontSize:
            "clamp(20px,5.5vw,30px)",
        }}
      >
        ضِعْفُ الْعَدَدِ
      </div>

      <div
        style={{
          margin:
            "10px auto",
          width:
            "clamp(92px,28vw,145px)",
          height:
            "clamp(92px,28vw,145px)",
          borderRadius:
            "50%",
          border:
            "6px solid #edb21f",
          background:
            "#17365f",
          color: "#ffffff",
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          fontSize:
            "clamp(48px,15vw,78px)",
          fontWeight: 1000,
        }}
      >
        {number}
      </div>

      <div
        style={{
          color:
            "#17365f",
          fontWeight: 900,
          fontSize:
            "clamp(17px,4.6vw,23px)",
        }}
      >
        هُوَ الْعَدَدُ مَجْمُوعًا مَعَ نَفْسِهِ
      </div>
    </div>
  );
}

const LessonCompleteAny =
  LessonCompleteV2 as any;

export default function Lesson43DoubleExercises() {
  const navigate =
    useNavigate();

  const [
    mission,
    setMission,
  ] =
    useState<
      1 | 2 | 3 | 4
    >(1);

  const [
    questionIndex,
    setQuestionIndex,
  ] = useState(0);

  const [
    selectedId,
    setSelectedId,
  ] =
    useState<
      string | null
    >(null);

  const [
    feedback,
    setFeedback,
  ] =
    useState<FeedbackState>(
      "idle",
    );

  const [
    boundaries,
    setBoundaries,
  ] =
    useState<
      KaraokeWord[]
    >([]);

  const [
    activeWordIndex,
    setActiveWordIndex,
  ] = useState(-1);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const [
    complete,
    setComplete,
  ] = useState(false);

  const audioRef =
    useRef<
      HTMLAudioElement | null
    >(null);

  const boundariesRef =
    useRef<KaraokeWord[]>(
      [],
    );

  const timerRef =
    useRef<number | null>(
      null,
    );

  const answerLockRef =
    useRef(false);

  const missionQuestions =
    QUESTIONS.filter(
      (item) =>
        item.mission ===
        mission,
    );

  const question =
    missionQuestions[
      questionIndex
    ];

  const audioSource =
    `${AUDIO_BASE}/${question.audioKey}.mp3`;

  const boundarySource =
    `${AUDIO_BASE}/${question.audioKey}.json`;

  const clearTimer =
    useCallback(() => {
      if (
        timerRef.current !==
        null
      ) {
        window.clearTimeout(
          timerRef.current,
        );

        timerRef.current =
          null;
      }
    }, []);

  const resetQuestion =
    useCallback(() => {
      clearTimer();

      setSelectedId(null);
      setFeedback("idle");

      answerLockRef.current =
        false;
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

    boundariesRef.current =
      [];

    setBoundaries([]);
    setActiveWordIndex(-1);
    setIsPlaying(false);

    fetch(boundarySource)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Boundary HTTP ${response.status}`,
          );
        }

        return response.json();
      })
      .then((data) => {
        if (cancelled) {
          return;
        }

        const next =
          Array.isArray(data)
            ? data.filter(
                (item) =>
                  typeof item?.text ===
                    "string",
              )
            : [];

        boundariesRef.current =
          next;

        setBoundaries(next);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        boundariesRef.current =
          [];

        setBoundaries([]);
      });

    const audio =
      new Audio(
        audioSource,
      );

    audio.preload =
      "auto";

    const handlePlay =
      () => {
        if (!cancelled) {
          setIsPlaying(true);
        }
      };

    const handlePause =
      () => {
        if (!cancelled) {
          setIsPlaying(false);
        }
      };

    const handleEnded =
      () => {
        if (!cancelled) {
          setIsPlaying(false);
          setActiveWordIndex(
            -1,
          );
        }
      };

    const handleTimeUpdate =
      () => {
        if (cancelled) {
          return;
        }

        const currentMs =
          audio.currentTime *
          1000;

        const words =
          boundariesRef.current;

        let nextIndex =
          -1;

        for (
          let index = 0;
          index <
          words.length;
          index += 1
        ) {
          const word =
            words[index];

          const start =
            Number(
              word.offset,
            ) || 0;

          const duration =
            Math.max(
              Number(
                word.duration,
              ) || 0,
              180,
            );

          const nextStart =
            index <
            words.length - 1
              ? Number(
                  words[
                    index + 1
                  ].offset,
                )
              : Number.POSITIVE_INFINITY;

          const end =
            Math.min(
              start +
                duration +
                130,
              nextStart + 40,
            );

          if (
            currentMs >=
              start &&
            currentMs < end
          ) {
            nextIndex =
              index;

            break;
          }
        }

        setActiveWordIndex(
          nextIndex,
        );
      };

    audio.addEventListener(
      "play",
      handlePlay,
    );

    audio.addEventListener(
      "pause",
      handlePause,
    );

    audio.addEventListener(
      "ended",
      handleEnded,
    );

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate,
    );

    audioRef.current =
      audio;

    const autoTimer =
      window.setTimeout(
        () => {
          if (cancelled) {
            return;
          }

          audio.currentTime =
            0;

          audio
            .play()
            .catch(() => {
              setIsPlaying(
                false,
              );
            });
        },
        AUTO_PLAY_DELAY,
      );

    return () => {
      cancelled = true;

      window.clearTimeout(
        autoTimer,
      );

      audio.pause();

      audio.removeEventListener(
        "play",
        handlePlay,
      );

      audio.removeEventListener(
        "pause",
        handlePause,
      );

      audio.removeEventListener(
        "ended",
        handleEnded,
      );

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate,
      );

      if (
        audioRef.current ===
        audio
      ) {
        audioRef.current =
          null;
      }
    };
  }, [
    audioSource,
    boundarySource,
  ]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const replayQuestion =
    useCallback(() => {
      const audio =
        audioRef.current;

      if (!audio) {
        return;
      }

      setActiveWordIndex(
        -1,
      );

      audio.currentTime =
        0;

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
        missionQuestions.length -
          1
      ) {
        setQuestionIndex(
          (current) =>
            current + 1,
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
          feedback !==
            "idle" ||
          answerLockRef.current
        ) {
          return;
        }

        answerLockRef.current =
          true;

        setSelectedId(
          choiceId,
        );

        if (
          choiceId ===
          question.answer
        ) {
          setFeedback(
            "correct",
          );

          playSound(
            CORRECT_SOUND,
          );

          timerRef.current =
            window.setTimeout(
              moveForward,
              FEEDBACK_DELAY,
            );

          return;
        }

        setFeedback(
          "wrong",
        );

        playSound(
          RETRY_SOUND,
        );

        timerRef.current =
          window.setTimeout(
            () => {
              setSelectedId(
                null,
              );

              setFeedback(
                "idle",
              );

              answerLockRef.current =
                false;

              timerRef.current =
                null;
            },
            FEEDBACK_DELAY,
          );
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
          (word) =>
            word.text,
        )
      : question.prompt
          .trim()
          .split(/\s+/);

  let activity:
    ReactNode;

  if (
    question.kind ===
    "visual"
  ) {
    activity = (
      <VisualDoubleBoard
        number={
          question.number
        }
      />
    );
  } else if (
    question.kind ===
    "equation"
  ) {
    activity = (
      <EquationBoard
        number={
          question.number
        }
      />
    );
  } else if (
    question.kind ===
    "reverse"
  ) {
    activity = (
      <ReverseBoard
        total={
          question.total
        }
      />
    );
  } else {
    activity = (
      <DominoActivity
        number={
          question.number
        }
      />
    );
  }

  const answerOptions =
    question.choices.map(
      (choice) => ({
        id: choice.id,

        ariaLabel:
          choice.label,

        content:
          question.kind ===
            "domino" &&
          typeof choice.left ===
            "number" &&
          typeof choice.right ===
            "number" ? (
            <MiniDomino
              left={
                choice.left
              }
              right={
                choice.right
              }
            />
          ) : (
            <span
              style={{
                fontSize:
                  "clamp(29px,9vw,48px)",
                fontWeight:
                  1000,
                direction:
                  "ltr",
              }}
            >
              {choice.label}
            </span>
          ),
      }),
    );

  if (complete) {
    return (
      <LessonCompleteAny
        lessonKey="lesson43"
        title="أَحْسَنْتَ!"
        subtitle="أَتْقَنْتَ ضِعْفَ الْأَعْدَادِ الْأَصْغَرِ مِنْ عَشَرَةٍ."
        nextPath="/world2-lesson/44"
        onNext={() =>
          navigate(
            "/world2-lesson/44",
          )
        }
        onContinue={() =>
          navigate(
            "/world2-lesson/44",
          )
        }
      />
    );
  }

  return (
    <UnifiedExerciseScreenV2
      index={questionIndex}
      total={
        missionQuestions.length
      }
      missionTitle={
        MISSION_TITLES[
          mission
        ]
      }
      questionWords={
        questionWords
      }
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
      onReplay={
        replayQuestion
      }
      isPlaying={
        isPlaying
      }
      activity={
        activity
      }
      answers={
        <UnifiedExerciseAnswersV2
          options={
            answerOptions
          }
          selectedId={
            selectedId
          }
          feedback={
            feedback
          }
          correctId={
            question.answer
          }
          showCorrect={
            false
          }
          onSelect={
            selectAnswer
          }
          variant={
            question.kind ===
            "domino"
              ? "image"
              : "text"
          }
          columns={
            question.kind ===
            "domino"
              ? 3
              : 3
          }
          disabled={
            feedback !==
            "idle"
          }
        />
      }
      feedback={
        feedback
      }
      activityLabel="تمثيل الضعف"
      answersLabel="اختر الإجابة الصحيحة"
    />
  );
}
