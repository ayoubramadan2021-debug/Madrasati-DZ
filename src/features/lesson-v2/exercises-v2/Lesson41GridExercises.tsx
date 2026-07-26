import {
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

type Coord = {
  row: number;
  col: number;
};

type Animal = Coord & {
  id: string;
  label: string;
  emoji: string;
};

type Boundary = {
  text: string;
  offset: number;
  duration: number;
};

type LocateQuestion = {
  kind: "locate";
  id: string;
  audioKey: string;
  prompt: string;
  board: Animal[];
  targetId: string;
  options: Coord[];
};

type IdentifyQuestion = {
  kind: "identify";
  id: string;
  audioKey: string;
  prompt: string;
  board: Animal[];
  target: Coord;
  options: string[];
};

type TouchQuestion = {
  kind: "touch";
  id: string;
  audioKey: string;
  prompt: string;
  target: Coord;
};

type SequenceTarget = Coord & {
  name: string;
  color: string;
};

type SequenceQuestion = {
  kind: "sequence";
  id: string;
  audioKey: string;
  prompt: string;
  targets: [
    SequenceTarget,
    SequenceTarget,
  ];
};

type Question =
  | LocateQuestion
  | IdentifyQuestion
  | TouchQuestion
  | SequenceQuestion;

type Stage = {
  icon: string;
  mission: string;
  questions: Question[];
};

type FeedbackState =
  | "idle"
  | "correct"
  | "wrong";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_41_amusement_rows_columns/exercises";

const COLORS = {
  navy: "#17365F",
  gold: "#EDA91B",
  cream: "#FFF7E6",
  creamStrong: "#FDE7AE",
  white: "#FFFFFF",
  green: "#1FA463",
  greenSoft: "#E8F8EF",
  red: "#D45447",
  redSoft: "#FFF0EE",
  blueSoft: "#EEF6FF",
  wood: "#A8652A",
};

function arabicNumber(
  value: number,
): string {
  return String(value);
}

function coordKey(
  coord: Coord,
): string {
  return `${coord.row}-${coord.col}`;
}

function coordLabel(
  coord: Coord,
): string {
  return (
    `الصَّف ${arabicNumber(coord.row)}، ` +
    `الْعَمُود ${arabicNumber(coord.col)}`
  );
}

const ANIMALS: Record<
  string,
  Pick<
    Animal,
    "id" | "label" | "emoji"
  >
> = {
  bear: {
    id: "bear",
    label: "الدُّبُّ",
    emoji: "🐻",
  },

  bird: {
    id: "bird",
    label: "الْعُصْفُورُ",
    emoji: "🐦",
  },

  horse: {
    id: "horse",
    label: "الْحِصَانُ",
    emoji: "🐴",
  },

  lion: {
    id: "lion",
    label: "الْأَسَدُ",
    emoji: "🦁",
  },

  dog: {
    id: "dog",
    label: "الْكَلْبُ",
    emoji: "🐕",
  },

  boar: {
    id: "boar",
    label: "الْخِنْزِيرُ الْبَرِّيُّ",
    emoji: "🐗",
  },
};

function animal(
  id: string,
  row: number,
  col: number,
): Animal {
  return {
    ...ANIMALS[id],
    row,
    col,
  };
}

const STAGES: Stage[] = [
  {
    icon: "🧭",
    mission: "أُحَدِّدُ الْمَوْقِعَ",
    questions: [
      {
        kind: "locate",
        id: "l41_ex1_q1",
        audioKey: "l41_ex1_q1_v2",
        prompt:
          "فِي أَيِّ صَفٍّ وَعَمُودٍ يُوجَدُ دُبُّ اللُّعْبَةِ؟",
        board: [
          animal("bird", 1, 2),
          animal("bear", 2, 4),
          animal("dog", 3, 1),
          animal("horse", 4, 6),
          animal("lion", 5, 3),
        ],
        targetId: "bear",
        options: [
          { row: 2, col: 4 },
          { row: 4, col: 2 },
          { row: 2, col: 5 },
        ],
      },

      {
        kind: "locate",
        id: "l41_ex1_q2",
        audioKey: "l41_ex1_q2",
        prompt:
          "فِي أَيِّ صَفٍّ وَعَمُودٍ يُوجَدُ الْعُصْفُورُ؟",
        board: [
          animal("lion", 1, 1),
          animal("horse", 2, 3),
          animal("dog", 3, 6),
          animal("bird", 4, 5),
          animal("bear", 6, 2),
        ],
        targetId: "bird",
        options: [
          { row: 4, col: 5 },
          { row: 5, col: 4 },
          { row: 4, col: 4 },
        ],
      },

      {
        kind: "locate",
        id: "l41_ex1_q3",
        audioKey: "l41_ex1_q3",
        prompt:
          "فِي أَيِّ صَفٍّ وَعَمُودٍ يُوجَدُ الْحِصَانُ؟",
        board: [
          animal("bird", 1, 6),
          animal("dog", 2, 2),
          animal("lion", 3, 4),
          animal("bear", 5, 5),
          animal("horse", 6, 2),
        ],
        targetId: "horse",
        options: [
          { row: 6, col: 2 },
          { row: 2, col: 6 },
          { row: 5, col: 2 },
        ],
      },

      {
        kind: "locate",
        id: "l41_ex1_q4",
        audioKey: "l41_ex1_q4",
        prompt:
          "فِي أَيِّ صَفٍّ وَعَمُودٍ يُوجَدُ الْأَسَدُ؟",
        board: [
          animal("bear", 1, 4),
          animal("dog", 2, 2),
          animal("lion", 3, 6),
          animal("bird", 5, 1),
          animal("horse", 6, 5),
        ],
        targetId: "lion",
        options: [
          { row: 3, col: 6 },
          { row: 6, col: 3 },
          { row: 3, col: 5 },
        ],
      },
    ],
  },

  {
    icon: "🔎",
    mission: "أَكْتَشِفُ الْحَيَوَانَ",
    questions: [
      {
        kind: "identify",
        id: "l41_ex2_q1",
        audioKey: "l41_ex2_q1",
        prompt:
          "مَا الْحَيَوَانُ الْمَوْجُودُ فِي الصَّفِّ الثَّالِثِ وَالْعَمُودِ الْخَامِسِ؟",
        board: [
          animal("bear", 1, 2),
          animal("bird", 2, 6),
          animal("dog", 3, 5),
          animal("horse", 4, 1),
          animal("lion", 6, 4),
        ],
        target: {
          row: 3,
          col: 5,
        },
        options: [
          "dog",
          "bear",
          "lion",
        ],
      },

      {
        kind: "identify",
        id: "l41_ex2_q2",
        audioKey: "l41_ex2_q2",
        prompt:
          "مَا الْحَيَوَانُ الْمَوْجُودُ فِي الصَّفِّ الْخَامِسِ وَالْعَمُودِ الثَّانِي؟",
        board: [
          animal("dog", 1, 1),
          animal("horse", 2, 5),
          animal("bird", 3, 3),
          animal("bear", 5, 2),
          animal("lion", 6, 6),
        ],
        target: {
          row: 5,
          col: 2,
        },
        options: [
          "horse",
          "bear",
          "bird",
        ],
      },

      {
        kind: "identify",
        id: "l41_ex2_q3",
        audioKey: "l41_ex2_q3",
        prompt:
          "مَا الْحَيَوَانُ الْمَوْجُودُ فِي الصَّفِّ الثَّانِي وَالْعَمُودِ السَّادِسِ؟",
        board: [
          animal("lion", 1, 3),
          animal("bird", 2, 6),
          animal("bear", 3, 2),
          animal("dog", 4, 4),
          animal("horse", 6, 1),
        ],
        target: {
          row: 2,
          col: 6,
        },
        options: [
          "bird",
          "dog",
          "horse",
        ],
      },

      {
        kind: "identify",
        id: "l41_ex2_q4",
        audioKey: "l41_ex2_q4",
        prompt:
          "مَا الْحَيَوَانُ الْمَوْجُودُ فِي الصَّفِّ السَّادِسِ وَالْعَمُودِ الرَّابِعِ؟",
        board: [
          animal("bird", 1, 5),
          animal("lion", 2, 2),
          animal("dog", 4, 6),
          animal("horse", 5, 1),
          animal("boar", 6, 4),
        ],
        target: {
          row: 6,
          col: 4,
        },
        options: [
          "boar",
          "lion",
          "dog",
        ],
      },
    ],
  },

  {
    icon: "🎯",
    mission: "أَلْمِسُ الْخَانَةَ",
    questions: [
      {
        kind: "touch",
        id: "l41_ex3_q1",
        audioKey: "l41_ex3_q1",
        prompt:
          "اِلْمِسِ الْخَانَةَ فِي الصَّفِّ الرَّابِعِ وَالْعَمُودِ الثَّانِي.",
        target: {
          row: 4,
          col: 2,
        },
      },

      {
        kind: "touch",
        id: "l41_ex3_q2",
        audioKey: "l41_ex3_q2",
        prompt:
          "اِلْمِسِ الْخَانَةَ فِي الصَّفِّ الثَّانِي وَالْعَمُودِ السَّادِسِ.",
        target: {
          row: 2,
          col: 6,
        },
      },

      {
        kind: "touch",
        id: "l41_ex3_q3",
        audioKey: "l41_ex3_q3",
        prompt:
          "اِلْمِسِ الْخَانَةَ فِي الصَّفِّ الْخَامِسِ وَالْعَمُودِ الثَّالِثِ.",
        target: {
          row: 5,
          col: 3,
        },
      },

      {
        kind: "touch",
        id: "l41_ex3_q4",
        audioKey: "l41_ex3_q4",
        prompt:
          "اِلْمِسِ الْخَانَةَ فِي الصَّفِّ الْأَوَّلِ وَالْعَمُودِ الرَّابِعِ.",
        target: {
          row: 1,
          col: 4,
        },
      },
    ],
  },

  {
    icon: "🟦",
    mission: "أُنَفِّذُ مُهِمَّتَيْنِ",
    questions: [
      {
        kind: "sequence",
        id: "l41_ex4_q1",
        audioKey: "l41_ex4_q1_drag_v2",
        prompt:
          "ضَعِ الْقُرْصَ الْأَزْرَقَ فِي الصَّفِّ الثَّانِي وَالْعَمُودِ الرَّابِعِ، ثُمَّ ضَعِ الْقُرْصَ الْوَرْدِيَّ فِي الصَّفِّ الْخَامِسِ وَالْعَمُودِ الْأَوَّلِ.",
        targets: [
          {
            row: 2,
            col: 4,
            name: "الْقُرْصُ الْأَزْرَقُ",
            color: "#2F80ED",
          },
          {
            row: 5,
            col: 1,
            name: "الْقُرْصُ الْوَرْدِيُّ",
            color: "#E96A9E",
          },
        ],
      },

      {
        kind: "sequence",
        id: "l41_ex4_q2",
        audioKey: "l41_ex4_q2_drag_v2",
        prompt:
          "ضَعِ الْقُرْصَ الْأَزْرَقَ فِي الصَّفِّ السَّادِسِ وَالْعَمُودِ الثَّالِثِ، ثُمَّ ضَعِ الْقُرْصَ الْوَرْدِيَّ فِي الصَّفِّ الثَّالِثِ وَالْعَمُودِ الْخَامِسِ.",
        targets: [
          {
            row: 6,
            col: 3,
            name: "الْقُرْصُ الْأَزْرَقُ",
            color: "#2F80ED",
          },
          {
            row: 3,
            col: 5,
            name: "الْقُرْصُ الْوَرْدِيُّ",
            color: "#E96A9E",
          },
        ],
      },

      {
        kind: "sequence",
        id: "l41_ex4_q3",
        audioKey: "l41_ex4_q3_drag_v2",
        prompt:
          "ضَعِ الْقُرْصَ الْأَزْرَقَ فِي الصَّفِّ الْأَوَّلِ وَالْعَمُودِ السَّادِسِ، ثُمَّ ضَعِ الْقُرْصَ الْوَرْدِيَّ فِي الصَّفِّ الرَّابِعِ وَالْعَمُودِ الثَّانِي.",
        targets: [
          {
            row: 1,
            col: 6,
            name: "الْقُرْصُ الْأَزْرَقُ",
            color: "#2F80ED",
          },
          {
            row: 4,
            col: 2,
            name: "الْقُرْصُ الْوَرْدِيُّ",
            color: "#E96A9E",
          },
        ],
      },

      {
        kind: "sequence",
        id: "l41_ex4_q4",
        audioKey: "l41_ex4_q4_drag_v2",
        prompt:
          "ضَعِ الْقُرْصَ الْأَزْرَقَ فِي الصَّفِّ الثَّالِثِ وَالْعَمُودِ الثَّالِثِ، ثُمَّ ضَعِ الْقُرْصَ الْوَرْدِيَّ فِي الصَّفِّ السَّادِسِ وَالْعَمُودِ السَّادِسِ.",
        targets: [
          {
            row: 3,
            col: 3,
            name: "الْقُرْصُ الْأَزْرَقُ",
            color: "#2F80ED",
          },
          {
            row: 6,
            col: 6,
            name: "الْقُرْصُ الْوَرْدِيُّ",
            color: "#E96A9E",
          },
        ],
      },
    ],
  },
];

type PlacedToken = Coord & {
  color: string;
};

type GridBoardProps = {
  items?: Animal[];
  placed?: PlacedToken[];
  activeCell?: Coord | null;
  activeState?: FeedbackState;
  onCellClick?: (
    coord: Coord,
  ) => void;
};

function GridBoard({
  items = [],
  placed = [],
  activeCell = null,
  activeState = "idle",
  onCellClick,
}: GridBoardProps) {
  const columns = [
    6,
    5,
    4,
    3,
    2,
    1,
  ];

  const rows = [
    1,
    2,
    3,
    4,
    5,
    6,
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 560,
        margin: "0 auto",
        padding: 12,
        borderRadius: 26,
        background:
          "linear-gradient(145deg,#B97837,#7B421D)",
        boxShadow:
          "0 15px 32px rgba(74,42,20,.22)",
      }}
    >
      <div
        style={{
          borderRadius: 19,
          padding: 10,
          background:
            "linear-gradient(180deg,#FFFDF7,#FFF3D4)",
          border:
            "3px solid rgba(255,255,255,.72)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 7,
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(6,minmax(0,1fr))",
                gap: 4,
                marginBottom: 5,
              }}
            >
              {columns.map(
                (column) => (
                  <div
                    key={column}
                    style={{
                      minHeight: 27,
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      borderRadius: 10,
                      background:
                        COLORS.navy,
                      color:
                        COLORS.white,
                      fontWeight: 1000,
                      fontSize: 15,
                    }}
                  >
                    {arabicNumber(
                      column,
                    )}
                  </div>
                ),
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(6,minmax(0,1fr))",
                gap: 4,
              }}
            >
              {rows.flatMap(
                (row) =>
                  columns.map(
                    (col) => {
                      const coord = {
                        row,
                        col,
                      };

                      const item =
                        items.find(
                          (candidate) =>
                            candidate.row ===
                              row &&
                            candidate.col ===
                              col,
                        );

                      const token =
                        placed.find(
                          (candidate) =>
                            candidate.row ===
                              row &&
                            candidate.col ===
                              col,
                        );

                      const active =
                        activeCell?.row ===
                          row &&
                        activeCell?.col ===
                          col;

                      let background =
                        (row + col) % 2 ===
                        0
                          ? "#FFFDF7"
                          : "#FFF6DE";

                      let borderColor =
                        "#E1C78E";

                      if (
                        active &&
                        activeState ===
                          "idle"
                      ) {
                        background =
                          "#EEF6FF";
                        borderColor =
                          COLORS.gold;
                      }

                      if (
                        active &&
                        activeState ===
                          "correct"
                      ) {
                        background =
                          COLORS.greenSoft;
                        borderColor =
                          COLORS.green;
                      }

                      if (
                        active &&
                        activeState ===
                          "wrong"
                      ) {
                        background =
                          COLORS.redSoft;
                        borderColor =
                          COLORS.red;
                      }

                      return (
                        <button
                          key={`${row}-${col}`}
                          type="button"
                          data-grid-cell="true"
                          data-grid-row={row}
                          data-grid-col={col}
                          aria-label={
                            coordLabel(
                              coord,
                            )
                          }
                          onClick={() =>
                            onCellClick?.(
                              coord,
                            )
                          }
                          style={{
                            aspectRatio:
                              "1 / 1",
                            minWidth: 0,
                            padding: 2,
                            borderRadius: 11,
                            border:
                              `2px solid ${borderColor}`,
                            background,
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            cursor:
                              onCellClick
                                ? "pointer"
                                : "default",
                            boxShadow:
                              active
                                ? "0 0 0 3px rgba(237,169,27,.2)"
                                : "none",
                            transition:
                              "transform .12s ease, background .15s ease",
                          }}
                        >
                          {item ? (
                            <span
                              role="img"
                              aria-label={
                                item.label
                              }
                              style={{
                                fontSize:
                                  "clamp(23px,7vw,40px)",
                                lineHeight: 1,
                                filter:
                                  "drop-shadow(0 3px 2px rgba(0,0,0,.15))",
                              }}
                            >
                              {
                                item.emoji
                              }
                            </span>
                          ) : token ? (
                            <span
                              style={{
                                width:
                                  "58%",
                                aspectRatio:
                                  "1 / 1",
                                borderRadius:
                                  "50%",
                                background:
                                  token.color,
                                border:
                                  "3px solid white",
                                boxShadow:
                                  "0 4px 9px rgba(23,54,95,.3)",
                              }}
                            />
                          ) : null}
                        </button>
                      );
                    },
                  ),
              )}
            </div>
          </div>

          <div
            style={{
              width: 28,
              display: "grid",
              gridTemplateRows:
                "27px repeat(6,1fr)",
              gap: 4,
            }}
          >
            <div />

            {rows.map(
              (row) => (
                <div
                  key={row}
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    borderRadius: 9,
                    background:
                      COLORS.gold,
                    color:
                      COLORS.navy,
                    fontWeight: 1000,
                    fontSize: 15,
                  }}
                >
                  {arabicNumber(
                    row,
                  )}
                </div>
              ),
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            gap: 8,
            marginTop: 9,
            color: COLORS.navy,
            fontWeight: 900,
            fontSize: 13,
          }}
        >
          <span>
            الْأَعْمِدَةُ ←
          </span>

          <span>
            الصُّفُوفُ ↓
          </span>
        </div>
      </div>
    </div>
  );
}

const CORRECT_SOUND =
  "/audio/v2_feedback/correct.mp3";

const RETRY_SOUND =
  "/audio/v2_feedback/retry.mp3";

const AUTO_PLAY_DELAY = 250;
const FEEDBACK_DELAY = 760;

const LessonCompleteAny =
  LessonCompleteV2 as any;

function playFeedbackSound(
  source: string,
) {
  const audio = new Audio(source);

  audio.volume = 0.9;

  audio
    .play()
    .catch(() => undefined);
}

export default function Lesson41GridExercises() {
  const navigate = useNavigate();

  const [
    stageIndex,
    setStageIndex,
  ] = useState(0);

  const [
    questionIndex,
    setQuestionIndex,
  ] = useState(0);

  const [
    selectedId,
    setSelectedId,
  ] = useState<string | null>(
    null,
  );

  const [
    feedback,
    setFeedback,
  ] =
    useState<FeedbackState>(
      "idle",
    );

  const [
    activeCell,
    setActiveCell,
  ] =
    useState<Coord | null>(
      null,
    );

  const [
    sequenceStep,
    setSequenceStep,
  ] = useState(0);

  const [
    placed,
    setPlaced,
  ] =
    useState<PlacedToken[]>(
      [],
    );

  const [
    draggingTokenIndex,
    setDraggingTokenIndex,
  ] =
    useState<number | null>(
      null,
    );

  const [
    dragPoint,
    setDragPoint,
  ] =
    useState<{
      x: number;
      y: number;
    } | null>(
      null,
    );

  const [
    boundaries,
    setBoundaries,
  ] =
    useState<Boundary[]>([]);

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
    useRef<HTMLAudioElement | null>(
      null,
    );

  const boundariesRef =
    useRef<Boundary[]>([]);

  const autoPlayTimerRef =
    useRef<number | null>(
      null,
    );

  const feedbackTimerRef =
    useRef<number | null>(
      null,
    );

  const answerLockRef =
    useRef(false);

  const stage =
    STAGES[stageIndex];

  const question =
    stage.questions[
      questionIndex
    ];

  const audioSource =
    `${AUDIO_BASE}/${question.audioKey}.mp3`;

  const boundarySource =
    `${AUDIO_BASE}/${question.audioKey}.json`;

  const clearFeedbackTimer =
    useCallback(() => {
      if (
        feedbackTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          feedbackTimerRef.current,
        );

        feedbackTimerRef.current =
          null;
      }
    }, []);

  const resetInteraction =
    useCallback(() => {
      clearFeedbackTimer();

      setSelectedId(null);
      setFeedback("idle");
      setActiveCell(null);
      setSequenceStep(0);
      setPlaced([]);
      setDraggingTokenIndex(null);
      setDragPoint(null);
      answerLockRef.current = false;
    }, [clearFeedbackTimer]);

  useEffect(() => {
    resetInteraction();
  }, [
    stageIndex,
    questionIndex,
    resetInteraction,
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
            `Boundary HTTP ${response.status}`,
          );
        }

        return response.json();
      })
      .then((data) => {
        if (cancelled) {
          return;
        }

        const nextBoundaries =
          Array.isArray(data)
            ? data.filter(
                (item) =>
                  typeof item?.text ===
                    "string" &&
                  Number.isFinite(
                    Number(
                      item?.offset,
                    ),
                  ),
              )
            : [];

        boundariesRef.current =
          nextBoundaries;

        setBoundaries(
          nextBoundaries,
        );
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

    const handlePlay = () => {
      if (!cancelled) {
        setIsPlaying(true);
      }
    };

    const handlePause = () => {
      if (!cancelled) {
        setIsPlaying(false);
      }
    };

    const handleEnded = () => {
      if (!cancelled) {
        setIsPlaying(false);
        setActiveWordIndex(-1);
      }
    };

    const handleTimeUpdate =
      () => {
        if (cancelled) {
          return;
        }

        const currentMilliseconds =
          audio.currentTime * 1000;

        const words =
          boundariesRef.current;

        let nextIndex = -1;

        for (
          let index = 0;
          index < words.length;
          index += 1
        ) {
          const current =
            words[index];

          const start =
            Number(
              current.offset,
            ) || 0;

          const duration =
            Math.max(
              Number(
                current.duration,
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
            currentMilliseconds >=
              start &&
            currentMilliseconds <
              end
          ) {
            nextIndex = index;
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

    audioRef.current = audio;

    autoPlayTimerRef.current =
      window.setTimeout(
        () => {
          if (cancelled) {
            return;
          }

          audio.currentTime = 0;

          audio
            .play()
            .catch(() => {
              setIsPlaying(false);
            });
        },
        AUTO_PLAY_DELAY,
      );

    return () => {
      cancelled = true;

      if (
        autoPlayTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          autoPlayTimerRef.current,
        );

        autoPlayTimerRef.current =
          null;
      }

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
        audioRef.current = null;
      }
    };
  }, [
    audioSource,
    boundarySource,
  ]);

  useEffect(() => {
    return () => {
      clearFeedbackTimer();
    };
  }, [clearFeedbackTimer]);

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
        stage.questions.length -
          1
      ) {
        setQuestionIndex(
          (current) =>
            current + 1,
        );

        return;
      }

      if (
        stageIndex <
        STAGES.length - 1
      ) {
        setStageIndex(
          (current) =>
            current + 1,
        );

        setQuestionIndex(0);

        return;
      }

      setComplete(true);
    }, [
      questionIndex,
      stage.questions.length,
      stageIndex,
    ]);

  const markCorrect =
    useCallback(() => {
      clearFeedbackTimer();

      setFeedback("correct");

      playFeedbackSound(
        CORRECT_SOUND,
      );

      feedbackTimerRef.current =
        window.setTimeout(
          moveForward,
          FEEDBACK_DELAY,
        );
    }, [
      clearFeedbackTimer,
      moveForward,
    ]);

  const markWrong =
    useCallback(() => {
      clearFeedbackTimer();

      setFeedback("wrong");

      playFeedbackSound(
        RETRY_SOUND,
      );

      feedbackTimerRef.current =
        window.setTimeout(
          () => {
            setFeedback("idle");
            setSelectedId(null);
            setActiveCell(null);
            answerLockRef.current = false;
            feedbackTimerRef.current = null;
          },
          FEEDBACK_DELAY,
        );
    }, [clearFeedbackTimer]);

  const answerLocate =
    useCallback(
      (
        option: Coord,
      ) => {
        if (
          question.kind !==
            "locate" ||
          feedback !== "idle" ||
          answerLockRef.current
        ) {
          return;
        }

        answerLockRef.current = true;

        const optionId =
          coordKey(option);

        setSelectedId(
          optionId,
        );

        const target =
          question.board.find(
            (item) =>
              item.id ===
              question.targetId,
          );

        const correct =
          target?.row ===
            option.row &&
          target?.col ===
            option.col;

        if (correct) {
          markCorrect();
          return;
        }

        markWrong();
      },
      [
        feedback,
        markCorrect,
        markWrong,
        question,
      ],
    );

  const answerIdentify =
    useCallback(
      (
        animalId: string,
      ) => {
        if (
          question.kind !==
            "identify" ||
          feedback !== "idle" ||
          answerLockRef.current
        ) {
          return;
        }

        answerLockRef.current = true;

        setSelectedId(
          animalId,
        );

        const target =
          question.board.find(
            (item) =>
              item.row ===
                question.target
                  .row &&
              item.col ===
                question.target
                  .col,
          );

        if (
          target?.id ===
          animalId
        ) {
          markCorrect();
          return;
        }

        markWrong();
      },
      [
        feedback,
        markCorrect,
        markWrong,
        question,
      ],
    );

  const answerTouch =
    useCallback(
      (
        coord: Coord,
      ) => {
        if (
          question.kind !==
            "touch" ||
          feedback !== "idle" ||
          answerLockRef.current
        ) {
          return;
        }

        answerLockRef.current = true;

        setActiveCell(
          coord,
        );

        const correct =
          coord.row ===
            question.target.row &&
          coord.col ===
            question.target.col;

        if (correct) {
          markCorrect();
          return;
        }

        markWrong();
      },
      [
        feedback,
        markCorrect,
        markWrong,
        question,
      ],
    );

  const gridCoordAtPoint =
    useCallback(
      (
        x: number,
        y: number,
      ): Coord | null => {
        const element =
          document.elementFromPoint(
            x,
            y,
          );

        const cell =
          element?.closest<HTMLElement>(
            '[data-grid-cell="true"]',
          );

        if (!cell) {
          return null;
        }

        const row = Number(
          cell.dataset.gridRow,
        );

        const col = Number(
          cell.dataset.gridCol,
        );

        if (
          !Number.isInteger(row) ||
          !Number.isInteger(col) ||
          row < 1 ||
          row > 6 ||
          col < 1 ||
          col > 6
        ) {
          return null;
        }

        return {
          row,
          col,
        };
      },
      [],
    );

  const dropSequenceToken =
    useCallback(
      (
        tokenIndex: number,
        coord: Coord,
      ) => {
        if (
          question.kind !==
            "sequence" ||
          feedback !== "idle" ||
          answerLockRef.current
        ) {
          return;
        }

        answerLockRef.current =
          true;

        if (
          tokenIndex !==
          sequenceStep
        ) {
          markWrong();
          return;
        }

        const target =
          question.targets[
            tokenIndex
          ];

        const correct =
          coord.row ===
            target.row &&
          coord.col ===
            target.col;

        setActiveCell(
          coord,
        );

        if (!correct) {
          markWrong();
          return;
        }

        setPlaced(
          (current) => [
            ...current,
            {
              row: target.row,
              col: target.col,
              color:
                target.color,
            },
          ],
        );

        setActiveCell(null);

        if (
          tokenIndex === 0
        ) {
          setSequenceStep(1);

          feedbackTimerRef.current =
            window.setTimeout(
              () => {
                answerLockRef.current =
                  false;

                feedbackTimerRef.current =
                  null;
              },
              180,
            );

          return;
        }

        setSequenceStep(2);
        markCorrect();
      },
      [
        feedback,
        markCorrect,
        markWrong,
        question,
        sequenceStep,
      ],
    );

  const beginTokenDrag =
    useCallback(
      (
        tokenIndex: number,
        event: React.PointerEvent<
          HTMLButtonElement
        >,
      ) => {
        if (
          question.kind !==
            "sequence" ||
          feedback !== "idle" ||
          tokenIndex <
            placed.length
        ) {
          return;
        }

        event.preventDefault();

        if (
          tokenIndex !==
          sequenceStep
        ) {
          answerLockRef.current =
            true;

          markWrong();
          return;
        }

        event.currentTarget
          .setPointerCapture(
            event.pointerId,
          );

        setDraggingTokenIndex(
          tokenIndex,
        );

        setDragPoint({
          x: event.clientX,
          y: event.clientY,
        });

        setActiveCell(
          gridCoordAtPoint(
            event.clientX,
            event.clientY,
          ),
        );
      },
      [
        feedback,
        gridCoordAtPoint,
        markWrong,
        placed.length,
        question,
        sequenceStep,
      ],
    );

  const moveTokenDrag =
    useCallback(
      (
        tokenIndex: number,
        event: React.PointerEvent<
          HTMLButtonElement
        >,
      ) => {
        if (
          draggingTokenIndex !==
          tokenIndex
        ) {
          return;
        }

        event.preventDefault();

        setDragPoint({
          x: event.clientX,
          y: event.clientY,
        });

        setActiveCell(
          gridCoordAtPoint(
            event.clientX,
            event.clientY,
          ),
        );
      },
      [
        draggingTokenIndex,
        gridCoordAtPoint,
      ],
    );

  const finishTokenDrag =
    useCallback(
      (
        tokenIndex: number,
        event: React.PointerEvent<
          HTMLButtonElement
        >,
      ) => {
        if (
          draggingTokenIndex !==
          tokenIndex
        ) {
          return;
        }

        event.preventDefault();

        if (
          event.currentTarget
            .hasPointerCapture(
              event.pointerId,
            )
        ) {
          event.currentTarget
            .releasePointerCapture(
              event.pointerId,
            );
        }

        const coord =
          gridCoordAtPoint(
            event.clientX,
            event.clientY,
          );

        setDraggingTokenIndex(
          null,
        );

        setDragPoint(null);

        if (!coord) {
          setActiveCell(null);
          return;
        }

        dropSequenceToken(
          tokenIndex,
          coord,
        );
      },
      [
        draggingTokenIndex,
        dropSequenceToken,
        gridCoordAtPoint,
      ],
    );

  const cancelTokenDrag =
    useCallback(() => {
      setDraggingTokenIndex(
        null,
      );

      setDragPoint(null);
      setActiveCell(null);
    }, []);

  const questionWords =
    boundaries.length > 0
      ? boundaries.map(
          (boundary) =>
            boundary.text,
        )
      : question.prompt
          .trim()
          .split(/\s+/);

  const renderActivity =
    () => {
      if (
        question.kind ===
          "locate" ||
        question.kind ===
          "identify"
      ) {
        return (
          <GridBoard
            items={
              question.board
            }
          />
        );
      }

      if (
        question.kind ===
          "touch"
      ) {
        return (
          <GridBoard
            activeCell={
              activeCell
            }
            activeState={
              feedback
            }
            onCellClick={
              answerTouch
            }
          />
        );
      }

      return (
        <GridBoard
          placed={placed}
          activeCell={
            activeCell
          }
          activeState={
            feedback
          }
        />
      );
    };

  const renderAnswers =
    () => {
      if (
        question.kind ===
        "locate"
      ) {
        const target =
          question.board.find(
            (item) =>
              item.id ===
              question.targetId,
          );

        const correctId =
          target
            ? coordKey(target)
            : null;

        return (
          <UnifiedExerciseAnswersV2
            options={question.options.map(
              (option) => ({
                id: coordKey(
                  option,
                ),
                content:
                  coordLabel(
                    option,
                  ),
                ariaLabel:
                  coordLabel(
                    option,
                  ),
              }),
            )}
            selectedId={
              selectedId
            }
            feedback={
              feedback
            }
            correctId={
              correctId
            }
            showCorrect={false}
            onSelect={(id) => {
              const option =
                question.options.find(
                  (candidate) =>
                    coordKey(
                      candidate,
                    ) === id,
                );

              if (option) {
                answerLocate(
                  option,
                );
              }
            }}
            variant="text"
            columns={1}
            disabled={
              feedback ===
              "correct"
            }
          />
        );
      }

      if (
        question.kind ===
        "identify"
      ) {
        const target =
          question.board.find(
            (item) =>
              item.row ===
                question.target.row &&
              item.col ===
                question.target.col,
          );

        return (
          <UnifiedExerciseAnswersV2
            options={question.options.map(
              (animalId) => {
                const option =
                  ANIMALS[
                    animalId
                  ];

                return {
                  id: animalId,
                  ariaLabel:
                    option.label,
                  content: (
                    <div
                      style={{
                        display:
                          "flex",
                        flexDirection:
                          "column",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        gap: 6,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          fontSize:
                            "clamp(35px,10vw,54px)",
                          lineHeight: 1,
                        }}
                      >
                        {
                          option.emoji
                        }
                      </span>

                      <span>
                        {
                          option.label
                        }
                      </span>
                    </div>
                  ),
                };
              },
            )}
            selectedId={
              selectedId
            }
            feedback={
              feedback
            }
            correctId={
              target?.id ??
              null
            }
            showCorrect={false}
            onSelect={
              answerIdentify
            }
            variant="image"
            columns={3}
            disabled={
              feedback ===
              "correct"
            }
          />
        );
      }

      if (
        question.kind ===
        "touch"
      ) {
        return (
          <div
            style={{
              width: "100%",
              maxWidth: 620,
              margin: "0 auto",
              padding:
                "11px 16px",
              boxSizing:
                "border-box",
              border:
                "3px solid #edb21f",
              borderRadius: 20,
              background:
                "#ffffff",
              color:
                "#17365f",
              fontWeight: 1000,
              textAlign:
                "center",
              fontSize:
                "clamp(17px,4.6vw,22px)",
            }}
          >
            اِلْمِسِ الْخَانَةَ
            الْمُنَاسِبَةَ فِي
            اللَّوْحَةِ.
          </div>
        );
      }

      const activeDragTarget =
        draggingTokenIndex !==
        null
          ? question.targets[
              draggingTokenIndex
            ]
          : null;

      return (
        <div
          style={{
            position:
              "relative",
            width: "100%",
            maxWidth: 620,
            margin: "0 auto",
            padding:
              "14px 12px",
            boxSizing:
              "border-box",
            border:
              "3px solid #edb21f",
            borderRadius: 24,
            background:
              "#ffffff",
            boxShadow:
              "0 8px 18px rgba(23,54,95,.10)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              gap:
                "clamp(22px,10vw,60px)",
            }}
          >
            {question.targets.map(
              (
                target,
                tokenIndex,
              ) => {
                const placedAlready =
                  tokenIndex <
                  placed.length;

                const waiting =
                  tokenIndex >
                  sequenceStep;

                const dragging =
                  draggingTokenIndex ===
                  tokenIndex;

                return (
                  <button
                    key={
                      target.name
                    }
                    type="button"
                    aria-label={
                      `اسحب ${target.name}`
                    }
                    disabled={
                      placedAlready ||
                      feedback !==
                        "idle"
                    }
                    onPointerDown={(
                      event,
                    ) =>
                      beginTokenDrag(
                        tokenIndex,
                        event,
                      )
                    }
                    onPointerMove={(
                      event,
                    ) =>
                      moveTokenDrag(
                        tokenIndex,
                        event,
                      )
                    }
                    onPointerUp={(
                      event,
                    ) =>
                      finishTokenDrag(
                        tokenIndex,
                        event,
                      )
                    }
                    onPointerCancel={
                      cancelTokenDrag
                    }
                    style={{
                      width:
                        "clamp(92px,26vw,132px)",
                      minHeight:
                        "clamp(100px,28vw,140px)",
                      padding:
                        "10px 8px",
                      border:
                        dragging
                          ? "4px solid #17365f"
                          : "4px solid #edb21f",
                      borderRadius:
                        24,
                      background:
                        placedAlready
                          ? "#eef7f1"
                          : "#fffaf0",
                      display:
                        "flex",
                      flexDirection:
                        "column",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      gap: 8,
                      opacity:
                        placedAlready
                          ? 0.45
                          : waiting
                            ? 0.65
                            : 1,
                      transform:
                        dragging
                          ? "scale(.94)"
                          : "scale(1)",
                      cursor:
                        placedAlready
                          ? "default"
                          : "grab",
                      touchAction:
                        "none",
                      userSelect:
                        "none",
                      WebkitUserSelect:
                        "none",
                      boxShadow:
                        dragging
                          ? "0 4px 12px rgba(23,54,95,.12)"
                          : "0 8px 18px rgba(23,54,95,.15)",
                      transition:
                        "transform .12s ease, opacity .15s ease",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width:
                          "clamp(50px,15vw,72px)",
                        height:
                          "clamp(50px,15vw,72px)",
                        borderRadius:
                          "50%",
                        background:
                          target.color,
                        border:
                          "5px solid #ffffff",
                        boxShadow:
                          "0 5px 13px rgba(23,54,95,.30)",
                      }}
                    />

                    <span
                      style={{
                        color:
                          "#17365f",
                        fontSize:
                          "clamp(15px,4vw,19px)",
                        fontWeight:
                          1000,
                        lineHeight:
                          1.45,
                        textAlign:
                          "center",
                      }}
                    >
                      {
                        target.name
                      }
                    </span>

                    {placedAlready && (
                      <span
                        aria-hidden="true"
                        style={{
                          color:
                            "#168657",
                          fontSize:
                            21,
                          fontWeight:
                            1000,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              },
            )}
          </div>

          <div
            style={{
              marginTop: 11,
              color:
                "#17365f",
              fontSize:
                "clamp(16px,4.3vw,20px)",
              fontWeight: 900,
              textAlign:
                "center",
            }}
          >
            اِسْحَبِ الْقُرْصَ
            إِلَى الْخَانَةِ
            الْمَطْلُوبَةِ.
          </div>

          {activeDragTarget &&
            dragPoint && (
              <div
                aria-hidden="true"
                style={{
                  position:
                    "fixed",
                  zIndex: 99999,
                  left:
                    dragPoint.x,
                  top:
                    dragPoint.y,
                  width:
                    "clamp(58px,16vw,76px)",
                  height:
                    "clamp(58px,16vw,76px)",
                  borderRadius:
                    "50%",
                  background:
                    activeDragTarget.color,
                  border:
                    "5px solid #ffffff",
                  boxShadow:
                    "0 12px 28px rgba(23,54,95,.40)",
                  transform:
                    "translate(-50%,-50%) scale(1.08)",
                  pointerEvents:
                    "none",
                }}
              />
            )}
        </div>
      );
    };

  if (complete) {
    return (
      <LessonCompleteAny
        lessonKey="lesson41"
        title="أَحْسَنْتَ!"
        subtitle="أَتْقَنْتَ الصُّفُوفَ وَالْأَعْمِدَةَ."
        nextPath="/world2-lesson/42"
        onNext={() =>
          navigate(
            "/world2-lesson/42",
          )
        }
        onContinue={() =>
          navigate(
            "/world2-lesson/42",
          )
        }
      />
    );
  }

  return (
    <UnifiedExerciseScreenV2
      index={
        Math.min(
          questionIndex + 1,
          stage.questions.length,
        )
      }
      total={
        stage.questions.length
      }
      missionTitle={`${stage.icon} ${stage.mission}`}
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
        renderActivity()
      }
      answers={
        renderAnswers()
      }
      feedback={
        feedback
      }
      activityLabel="لوحة الصفوف والأعمدة"
      answersLabel={
        question.kind ===
          "sequence"
          ? "الأقراص القابلة للسحب"
          : question.kind ===
              "touch"
            ? "تعليمة التنفيذ"
            : "خيارات الإجابة"
      }
    />
  );
}
