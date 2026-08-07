import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { useNavigate } from "react-router-dom";

import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";
import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import LessonCompleteV2 from "../components/LessonCompleteV2";

type Feedback =
  | "idle"
  | "correct"
  | "wrong";

type Mission = 1 | 2 | 3 | 4;

type QuestionKind =
  | "tens"
  | "balls"
  | "clock"
  | "missing"
  | "baseTen";

type Choice = {
  id: string;
  label: string;
};

type Question = {
  id: string;
  mission: Mission;
  kind: QuestionKind;

  prompt: string;
  audioKey: string;

  choices: Choice[];
  answer: string;

  left?: number;
  operator?: "+" | "-";
  right?: number;
  result?: number;

  story?: string;

  hour?: number;
  minute?: number;

  tens?: number;
  units?: number;
};

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

const AUDIO_BASE =
  "/audio/teachers/khalil/"
  + "lesson_68_assessment_3_math/exercises";


const FEEDBACK_DELAY = 1500;

const choice = (
  id: string,
  label: string,
): Choice => ({
  id,
  label,
});

const QUESTIONS: Question[] = [
  {
    id: "l68_ex1_q1",
    mission: 1,
    kind: "tens",
    prompt:
      "اِحْسِبِ النَّاتِجَ.",
    audioKey: "l68_ex1_q1",
    left: 34,
    operator: "+",
    right: 10,
    result: 44,
    choices: [
      choice("a", "44"),
      choice("b", "54"),
      choice("c", "24"),
      choice("d", "43"),
    ],
    answer: "a",
  },
  {
    id: "l68_ex1_q2",
    mission: 1,
    kind: "tens",
    prompt:
      "اِحْسِبِ النَّاتِجَ.",
    audioKey: "l68_ex1_q2",
    left: 57,
    operator: "-",
    right: 20,
    result: 37,
    choices: [
      choice("a", "47"),
      choice("b", "37"),
      choice("c", "27"),
      choice("d", "39"),
    ],
    answer: "b",
  },
  {
    id: "l68_ex1_q3",
    mission: 1,
    kind: "tens",
    prompt:
      "اِحْسِبِ النَّاتِجَ.",
    audioKey: "l68_ex1_q3",
    left: 26,
    operator: "+",
    right: 20,
    result: 46,
    choices: [
      choice("a", "36"),
      choice("b", "56"),
      choice("c", "46"),
      choice("d", "48"),
    ],
    answer: "c",
  },
  {
    id: "l68_ex1_q4",
    mission: 1,
    kind: "tens",
    prompt:
      "اِحْسِبِ النَّاتِجَ.",
    audioKey: "l68_ex1_q4",
    left: 48,
    operator: "-",
    right: 10,
    result: 38,
    choices: [
      choice("a", "58"),
      choice("b", "28"),
      choice("c", "40"),
      choice("d", "38"),
    ],
    answer: "d",
  },

  {
    id: "l68_ex2_q1",
    mission: 2,
    kind: "balls",
    prompt:
      "اِقْرَأِ الْوَضْعِيَّةَ "
      + "ثُمَّ اِحْسِبِ النَّاتِجَ.",
    audioKey: "l68_ex2_q1",
    story:
      "كَانَ فِي الْوِعَاءِ 28 كُرَةً، "
      + "أَخَذْنَا مِنْهَا 7 كُرَاتٍ. "
      + "كَمْ كُرَةً بَقِيَتْ؟",
    left: 28,
    operator: "-",
    right: 7,
    result: 21,
    choices: [
      choice("a", "21"),
      choice("b", "20"),
      choice("c", "22"),
      choice("d", "19"),
    ],
    answer: "a",
  },
  {
    id: "l68_ex2_q2",
    mission: 2,
    kind: "balls",
    prompt:
      "اِقْرَأِ الْوَضْعِيَّةَ "
      + "ثُمَّ اِحْسِبِ النَّاتِجَ.",
    audioKey: "l68_ex2_q2",
    story:
      "كَانَ فِي الْوِعَاءِ 16 كُرَةً، "
      + "أَضَفْنَا إِلَيْهَا 5 كُرَاتٍ. "
      + "كَمْ أَصْبَحَ عَدَدُ الْكُرَاتِ؟",
    left: 16,
    operator: "+",
    right: 5,
    result: 21,
    choices: [
      choice("a", "20"),
      choice("b", "21"),
      choice("c", "22"),
      choice("d", "19"),
    ],
    answer: "b",
  },
  {
    id: "l68_ex2_q3",
    mission: 2,
    kind: "balls",
    prompt:
      "اِقْرَأِ الْوَضْعِيَّةَ "
      + "ثُمَّ اِحْسِبِ النَّاتِجَ.",
    audioKey: "l68_ex2_q3",
    story:
      "كَانَ فِي السَّلَّةِ 35 كُرَةً، "
      + "أَخَذْنَا مِنْهَا 10 كُرَاتٍ. "
      + "كَمْ كُرَةً بَقِيَتْ؟",
    left: 35,
    operator: "-",
    right: 10,
    result: 25,
    choices: [
      choice("a", "15"),
      choice("b", "35"),
      choice("c", "25"),
      choice("d", "20"),
    ],
    answer: "c",
  },
  {
    id: "l68_ex2_q4",
    mission: 2,
    kind: "balls",
    prompt:
      "اِقْرَأِ الْوَضْعِيَّةَ "
      + "ثُمَّ اِحْسِبِ النَّاتِجَ.",
    audioKey: "l68_ex2_q4",
    story:
      "كَانَ فِي الْوِعَاءِ 22 كُرَةً، "
      + "أَضَفْنَا إِلَيْهَا 7 كُرَاتٍ. "
      + "كَمْ أَصْبَحَ عَدَدُ الْكُرَاتِ؟",
    left: 22,
    operator: "+",
    right: 7,
    result: 29,
    choices: [
      choice("a", "27"),
      choice("b", "28"),
      choice("c", "30"),
      choice("d", "29"),
    ],
    answer: "d",
  },

  {
    id: "l68_ex3_q1",
    mission: 3,
    kind: "clock",
    prompt:
      "اِقْرَأِ السَّاعَةَ.",
    audioKey: "l68_ex3_q1",
    hour: 7,
    minute: 0,
    choices: [
      choice("a", "07:00"),
      choice("b", "08:00"),
      choice("c", "06:00"),
      choice("d", "09:00"),
    ],
    answer: "a",
  },
  {
    id: "l68_ex3_q2",
    mission: 3,
    kind: "clock",
    prompt:
      "اِقْرَأِ السَّاعَةَ.",
    audioKey: "l68_ex3_q2",
    hour: 8,
    minute: 0,
    choices: [
      choice("a", "07:00"),
      choice("b", "08:00"),
      choice("c", "09:00"),
      choice("d", "06:00"),
    ],
    answer: "b",
  },
  {
    id: "l68_ex3_q3",
    mission: 3,
    kind: "clock",
    prompt:
      "اِقْرَأِ السَّاعَةَ.",
    audioKey: "l68_ex3_q3",
    hour: 3,
    minute: 0,
    choices: [
      choice("a", "05:00"),
      choice("b", "04:00"),
      choice("c", "03:00"),
      choice("d", "02:00"),
    ],
    answer: "c",
  },
  {
    id: "l68_ex3_q4",
    mission: 3,
    kind: "clock",
    prompt:
      "اِقْرَأِ السَّاعَةَ.",
    audioKey: "l68_ex3_q4",
    hour: 9,
    minute: 0,
    choices: [
      choice("a", "08:00"),
      choice("b", "10:00"),
      choice("c", "07:00"),
      choice("d", "09:00"),
    ],
    answer: "d",
  },

  {
    id: "l68_ex4_q1",
    mission: 4,
    kind: "missing",
    prompt:
      "أَكْمِلِ الْعَمَلِيَّةَ.",
    audioKey: "l68_ex4_q1",
    left: 12,
    operator: "+",
    right: 6,
    result: 18,
    choices: [
      choice("a", "18"),
      choice("b", "16"),
      choice("c", "20"),
      choice("d", "17"),
    ],
    answer: "a",
  },
  {
    id: "l68_ex4_q2",
    mission: 4,
    kind: "baseTen",
    prompt:
      "جِدِ الْعَدَدَ الْمُمَثَّلَ "
      + "بِالْعَشَرَاتِ وَالْوَحَدَاتِ.",
    audioKey: "l68_ex4_q2",
    tens: 3,
    units: 4,
    result: 34,
    choices: [
      choice("a", "43"),
      choice("b", "34"),
      choice("c", "30"),
      choice("d", "37"),
    ],
    answer: "b",
  },
  {
    id: "l68_ex4_q3",
    mission: 4,
    kind: "missing",
    prompt:
      "أَكْمِلِ الْعَمَلِيَّةَ.",
    audioKey: "l68_ex4_q3",
    left: 25,
    operator: "-",
    right: 5,
    result: 20,
    choices: [
      choice("a", "30"),
      choice("b", "15"),
      choice("c", "20"),
      choice("d", "25"),
    ],
    answer: "c",
  },
  {
    id: "l68_ex4_q4",
    mission: 4,
    kind: "baseTen",
    prompt:
      "جِدِ الْعَدَدَ الْمُمَثَّلَ "
      + "بِالْعَشَرَاتِ وَالْوَحَدَاتِ.",
    audioKey: "l68_ex4_q4",
    tens: 5,
    units: 6,
    result: 56,
    choices: [
      choice("a", "65"),
      choice("b", "50"),
      choice("c", "46"),
      choice("d", "56"),
    ],
    answer: "d",
  },
];

function TenRod({
  size = 13,
}: {
  size?: number;
}) {
  return (
    <div
      aria-label="قضيب عشرة"
      style={{
        display: "grid",
        gridTemplateRows:
          "repeat(10, 1fr)",
        gap: 1,
        padding: 2,
        borderRadius: 7,
        background: "#144c99",
      }}
    >
      {Array.from({
        length: 10,
      }).map((_, index) => (
        <span
          key={index}
          style={{
            width: size,
            height: size,
            display: "block",
            borderRadius: 2,
            background: "#2f80ed",
            boxShadow:
              "inset 0 0 0 1px "
              + "rgba(255,255,255,.3)",
          }}
        />
      ))}
    </div>
  );
}

function UnitCube({
  size = 18,
}: {
  size?: number;
}) {
  return (
    <span
      style={{
        width: size,
        height: size,
        display: "block",
        borderRadius: 5,
        background: "#28a95b",
        boxShadow:
          "inset 0 0 0 2px "
          + "rgba(255,255,255,.28)",
      }}
    />
  );
}

function BaseTenModel({
  tens,
  units,
}: {
  tens: number;
  units: number;
}) {
  return (
    <div
      dir="rtl"
      style={styles.baseTenModel}
    >
      <div style={styles.tensArea}>
        {Array.from({
          length: tens,
        }).map((_, index) => (
          <TenRod key={index} />
        ))}
      </div>

      <div style={styles.unitsArea}>
        {Array.from({
          length: units,
        }).map((_, index) => (
          <UnitCube key={index} />
        ))}
      </div>
    </div>
  );
}


function TensOperationModel({
  left,
  operator,
  right,
  result,
  showResult,
}: {
  left: number;
  operator: "+" | "-";
  right: number;
  result: number;
  showResult: boolean;
}) {
  const changedTens =
    Math.max(0, Math.floor(right / 10));

  if (showResult) {
    return (
      <div style={styles.tensOperation}>
        <div style={styles.resultIndicator}>
          ✅
        </div>

        <BaseTenModel
          tens={Math.floor(result / 10)}
          units={result % 10}
        />
      </div>
    );
  }

  return (
    <div style={styles.tensOperation}>
      <BaseTenModel
        tens={Math.floor(left / 10)}
        units={left % 10}
      />

      <div style={styles.changeRow}>
        <span style={styles.changeSign}>
          {operator}
        </span>

        <div style={styles.changeRods}>
          {Array.from({
            length: changedTens,
          }).map((_, index) => (
            <TenRod
              key={index}
              size={11}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Equation({
  left,
  operator,
  right,
  result,
  showResult,
}: {
  left: number;
  operator: "+" | "-";
  right: number;
  result: number;
  showResult: boolean;
}) {
  return (
    <div
      dir="rtl"
      style={styles.equation}
    >
      <span style={styles.numberBox}>
        {left}
      </span>

      <span style={styles.operatorBox}>
        {operator}
      </span>

      <span style={styles.numberBox}>
        {right}
      </span>

      <span style={styles.equalsBox}>
        =
      </span>

      <span style={styles.resultBox}>
        {showResult
          ? result
          : "؟"}
      </span>
    </div>
  );
}

function Clock({
  hour,
  minute,
}: {
  hour: number;
  minute: number;
}) {
  const hourAngle =
    (hour % 12) * 30
    + minute * 0.5;

  const minuteAngle =
    minute * 6;

  return (
    <svg
      viewBox="0 0 220 220"
      style={styles.clock}
      aria-label="ساعة تعليمية"
    >
      <circle
        cx="110"
        cy="110"
        r="102"
        fill="#fffdf6"
        stroke="#246bb2"
        strokeWidth="8"
      />

      {Array.from({
        length: 12,
      }).map((_, index) => {
        const angle =
          index * 30;

        return (
          <line
            key={index}
            x1="110"
            y1="18"
            x2="110"
            y2={
              index % 3 === 0
                ? 35
                : 29
            }
            stroke="#17365f"
            strokeWidth={
              index % 3 === 0
                ? 5
                : 3
            }
            strokeLinecap="round"
            transform={
              `rotate(${angle} 110 110)`
            }
          />
        );
      })}

      <g
        transform={
          `rotate(${hourAngle} 110 110)`
        }
      >
        <line
          x1="110"
          y1="110"
          x2="110"
          y2="63"
          stroke="#17365f"
          strokeWidth="9"
          strokeLinecap="round"
        />
      </g>

      <g
        transform={
          `rotate(${minuteAngle} 110 110)`
        }
      >
        <line
          x1="110"
          y1="110"
          x2="110"
          y2="38"
          stroke="#2f80ed"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      <circle
        cx="110"
        cy="110"
        r="9"
        fill="#edb21f"
        stroke="#17365f"
        strokeWidth="4"
      />
    </svg>
  );
}


function ExerciseIllustration({
  kind,
  operator,
}: {
  kind: QuestionKind;
  operator?: "+" | "-";
}) {
  const symbol =
    kind === "tens"
      ? operator === "-"
        ? "🔟  ➖  🔟"
        : "🔟  ➕  🔟"
      : kind === "balls"
        ? "🔵  🟡  🔴"
        : kind === "clock"
          ? "⏰"
          : kind === "missing"
            ? "➕  ❓  ➖"
            : "🔟  🟦  🟩";

  return (
    <div
      style={styles.illustrationWrap}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 640 150"
        style={styles.illustrationSvg}
      >
        <rect
          x="5"
          y="5"
          width="630"
          height="140"
          rx="30"
          fill="#f7fbff"
          stroke="#9ac5e8"
          strokeWidth="5"
        />

        <circle
          cx="72"
          cy="75"
          r="34"
          fill="#fff4be"
          stroke="#edb21f"
          strokeWidth="5"
        />

        <path
          d="M125 75 H515"
          stroke="#d5e9f8"
          strokeWidth="12"
          strokeLinecap="round"
        />

        <circle
          cx="568"
          cy="75"
          r="34"
          fill="#edfff3"
          stroke="#28a95b"
          strokeWidth="5"
        />
      </svg>

      <div style={styles.emojiRow}>
        {symbol}
      </div>
    </div>
  );
}

function ActivityCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div style={styles.activityCard}>
      {children}
    </div>
  );
}

function renderActivity(
  question: Question,
  showResult: boolean,
) {
  if (
    question.kind === "tens"
    || question.kind === "missing"
  ) {
    const left =
      question.left ?? 0;

    return (
      <ActivityCard>
        <ExerciseIllustration
          kind={question.kind}
          operator={question.operator}
        />

        {question.kind === "tens" && (
          <TensOperationModel
            left={left}
            operator={
              question.operator ?? "+"
            }
            right={
              question.right ?? 0
            }
            result={
              question.result ?? 0
            }
            showResult={showResult}
          />
        )}

        <Equation
          left={left}
          operator={
            question.operator ?? "+"
          }
          right={
            question.right ?? 0
          }
          result={
            question.result ?? 0
          }
          showResult={showResult}
        />
      </ActivityCard>
    );
  }

  if (question.kind === "balls") {
    return (
      <ActivityCard>
        <ExerciseIllustration
          kind={question.kind}
          operator={question.operator}
        />

        <div style={styles.storyBox}>
          {question.story}
        </div>

        <Equation
          left={question.left ?? 0}
          operator={
            question.operator ?? "+"
          }
          right={question.right ?? 0}
          result={question.result ?? 0}
          showResult={showResult}
        />
      </ActivityCard>
    );
  }

  if (question.kind === "clock") {
    return (
      <ActivityCard>
        <ExerciseIllustration
          kind={question.kind}
          operator={question.operator}
        />

        <Clock
          hour={question.hour ?? 0}
          minute={question.minute ?? 0}
        />

        {showResult && (
          <div style={styles.revealBox}>
            السَّاعَةُ{" "}
            <span dir="ltr">
              {String(
                question.hour ?? 0,
              ).padStart(2, "0")}
              :
              {String(
                question.minute ?? 0,
              ).padStart(2, "0")}
            </span>
          </div>
        )}
      </ActivityCard>
    );
  }

  return (
    <ActivityCard>
        <ExerciseIllustration
          kind={question.kind}
          operator={question.operator}
        />

      <BaseTenModel
        tens={question.tens ?? 0}
        units={question.units ?? 0}
      />

      <div style={styles.revealBox}>
        {showResult
          ? `الْعَدَدُ = ${question.result}`
          : "الْعَدَدُ = ؟"}
      </div>
    </ActivityCard>
  );
}

function fallbackTimings(
  text: string,
): WordTiming[] {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => ({
      text: word,
      offset: index * 500,
      duration: 450,
    }));
}

export default function
Lesson68Assessment3MathExercises() {
  const navigate = useNavigate();

  const [
    questionIndex,
    setQuestionIndex,
  ] = useState(0);

  const [
    selectedId,
    setSelectedId,
  ] = useState<string | null>(null);

  const [
    feedback,
    setFeedback,
  ] = useState<Feedback>("idle");

  const [
    locked,
    setLocked,
  ] = useState(false);

  const [
    complete,
    setComplete,
  ] = useState(false);

  const [
    timings,
    setTimings,
  ] = useState<WordTiming[]>([]);

  const [
    activeWordIndex,
    setActiveWordIndex,
  ] = useState(-1);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(
      null,
    );

  const animationRef =
    useRef<number | null>(null);

  const question =
    QUESTIONS[questionIndex];

  const missionQuestionIndex =
    questionIndex % 4;

  const stopAudio =
    useCallback(() => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current,
        );

        animationRef.current = null;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      setIsPlaying(false);
    }, []);

  const updateKaraoke =
    useCallback(() => {
      const audio =
        audioRef.current;

      if (!audio) return;

      const current =
        audio.currentTime * 1000;

      let index = -1;

      for (
        let timingIndex = 0;
        timingIndex < timings.length;
        timingIndex += 1
      ) {
        if (
          current
          >= timings[timingIndex].offset
        ) {
          index = timingIndex;
        }
      }

      setActiveWordIndex(index);

      if (
        !audio.paused
        && !audio.ended
      ) {
        animationRef.current =
          requestAnimationFrame(
            updateKaraoke,
          );
      }
    }, [timings]);

  const replay =
    useCallback(async () => {
      stopAudio();

      const audio =
        new Audio(
          `${AUDIO_BASE}/`
          + `${question.audioKey}.mp3`,
        );

      audioRef.current = audio;
      setActiveWordIndex(-1);
      setIsPlaying(true);

      audio.onended = () => {
        setIsPlaying(false);

        setActiveWordIndex(
          Math.max(
            0,
            timings.length - 1,
          ),
        );
      };

      try {
        await audio.play();

        animationRef.current =
          requestAnimationFrame(
            updateKaraoke,
          );
      } catch {
        setIsPlaying(false);
      }
    }, [
      question.audioKey,
      stopAudio,
      timings.length,
      updateKaraoke,
    ]);

  useEffect(() => {
    let active = true;

    stopAudio();
    setSelectedId(null);
    setFeedback("idle");
    setLocked(false);
    setActiveWordIndex(-1);

    fetch(
      `${AUDIO_BASE}/`
      + `${question.audioKey}.json`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(
            "timings unavailable",
          );
        }

        return response.json();
      })
      .then(payload => {
        if (!active) return;

        const loaded =
          Array.isArray(payload)
            ? payload
            : [];

        setTimings(
          loaded.length > 0
            ? loaded
            : fallbackTimings(
                question.prompt,
              ),
        );
      })
      .catch(() => {
        if (!active) return;

        setTimings(
          fallbackTimings(
            question.prompt,
          ),
        );
      });

    return () => {
      active = false;
      stopAudio();
    };
  }, [
    question.audioKey,
    question.prompt,
    stopAudio,
  ]);

  useEffect(() => {
    if (timings.length === 0) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          void replay();
        },
        500,
      );

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    question.id,
    replay,
    timings.length,
  ]);

  const selectAnswer =
    useCallback(
      (answerId: string) => {
        if (locked) return;

        stopAudio();
        setSelectedId(answerId);

        const correct =
          answerId === question.answer;

        if (!correct) {
          setFeedback("wrong");
          setLocked(true);

          window.setTimeout(() => {
            setFeedback("idle");
            setSelectedId(null);
            setLocked(false);
          }, 900);

          return;
        }

        setFeedback("correct");
        setLocked(true);

        window.setTimeout(() => {
          if (
            questionIndex
            < QUESTIONS.length - 1
          ) {
            setQuestionIndex(
              current => current + 1,
            );

            return;
          }

          setComplete(true);
        }, FEEDBACK_DELAY);
      },
      [
        locked,
        question.answer,
        questionIndex,
        stopAudio,
      ],
    );

  const restart =
    useCallback(() => {
      stopAudio();
      setQuestionIndex(0);
      setSelectedId(null);
      setFeedback("idle");
      setLocked(false);
      setComplete(false);
      setTimings([]);
      setActiveWordIndex(-1);
    }, [stopAudio]);

  const questionWords =
    useMemo(
      () =>
        timings.length > 0
          ? timings.map(
              timing => timing.text,
            )
          : question.prompt
              .trim()
              .split(/\s+/),
      [question.prompt, timings],
    );

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

  const answerOptions =
    question.choices.map(
      option => ({
        id: option.id,
        ariaLabel: option.label,
        content: (
          <div style={styles.answerContent}>
            {option.label}
          </div>
        ),
      }),
    );

  if (complete) {
    return (
      <LessonCompleteV2
        lessonKey="lesson68"
        title="أَحْسَنْتَ يَا بَطَلُ!"
        subtitle={
          "أَتْقَنْتَ تَمَارِينَ "
          + "حَصِيلَةِ الرِّيَاضِيَّاتِ."
        }
        nextPath="/lesson-v2/lesson69"
        nextLabel="الدَّرْسُ التَّالِي"
        onNext={() =>
          navigate(
            "/lesson-v2/lesson69",
          )
        }
        onRetry={restart}
        onRestart={restart}
      />
    );
  }

  return (
    <UnifiedExerciseScreenV2
      index={missionQuestionIndex}
      total={4}
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
      activity={renderActivity(
        question,
        feedback === "correct",
      )}
      answers={
        <UnifiedExerciseAnswersV2
          options={answerOptions}
          selectedId={selectedId}
          feedback={feedback}
          correctId={question.answer}
          showCorrect={false}
          onSelect={selectAnswer}
          variant="text"
          columns={2}
        />
      }
      feedback={feedback}
    />
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  activityCard: {
    width: "100%",
    maxWidth: 680,
    margin: "0 auto",
    padding: 13,
    boxSizing: "border-box",
    display: "grid",
    gap: 13,
    border: "4px solid #edb21f",
    borderRadius: 28,
    background: "#ffffff",
    boxShadow:
      "0 9px 22px rgba(23,54,95,.12)",
  },

  illustrationWrap: {
    width: "100%",
    minHeight: 105,
    position: "relative",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    borderRadius: 22,
  },

  illustrationSvg: {
    width: "100%",
    height: 105,
    display: "block",
  },

  emojiRow: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    direction: "ltr",
    fontSize: "clamp(34px,9vw,58px)",
    fontWeight: 1000,
    letterSpacing: 8,
  },

  tensOperation: {
    display: "grid",
    gap: 10,
  },

  changeRow: {
    minHeight: 115,
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    border: "3px dashed #edb21f",
    borderRadius: 18,
    background: "#fffaf0",
  },

  changeSign: {
    minWidth: 55,
    color: "#17365f",
    fontSize: "clamp(32px,8vw,48px)",
    fontWeight: 1000,
    textAlign: "center",
  },

  changeRods: {
    minHeight: 105,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 8,
  },

  resultIndicator: {
    textAlign: "center",
    fontSize: 34,
  },

  equation: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    direction: "rtl",
  },

  numberBox: {
    minWidth: 72,
    padding: "9px 15px",
    border: "3px solid #9ac5e8",
    borderRadius: 17,
    background: "#edf7ff",
    color: "#17365f",
    fontSize: "clamp(27px,7vw,42px)",
    fontWeight: 1000,
    textAlign: "center",
  },

  operatorBox: {
    minWidth: 56,
    padding: "8px 11px",
    border: "3px solid #9ac5e8",
    borderRadius: 17,
    background: "#ffffff",
    color: "#17365f",
    fontSize: "clamp(28px,7vw,42px)",
    fontWeight: 1000,
    textAlign: "center",
  },

  equalsBox: {
    minWidth: 55,
    padding: "8px 10px",
    border: "3px solid #edb21f",
    borderRadius: 17,
    background: "#fff5c8",
    color: "#8d5314",
    fontSize: "clamp(28px,7vw,42px)",
    fontWeight: 1000,
    textAlign: "center",
  },

  resultBox: {
    minWidth: 105,
    padding: "9px 17px",
    border: "4px solid #edb21f",
    borderRadius: 18,
    background: "#ffffff",
    color: "#17365f",
    fontSize: "clamp(30px,8vw,46px)",
    fontWeight: 1000,
    textAlign: "center",
  },

  baseTenModel: {
    minHeight: 150,
    padding: "12px",
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1.4fr) minmax(0,1fr)",
    gap: 12,
    border: "3px solid #9ac5e8",
    borderRadius: 21,
    background: "#f5fbff",
  },

  tensArea: {
    minHeight: 130,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 7,
    padding: 8,
    border: "2px solid #2f80ed",
    borderRadius: 16,
    background: "#edf7ff",
  },

  unitsArea: {
    minHeight: 130,
    display: "grid",
    gridTemplateColumns:
      "repeat(3, min-content)",
    alignContent: "center",
    justifyContent: "center",
    gap: 7,
    padding: 8,
    border: "2px solid #28a95b",
    borderRadius: 16,
    background: "#effff3",
  },

  storyBox: {
    padding: "12px 15px",
    border: "3px solid #9ac5e8",
    borderRadius: 19,
    background: "#edf7ff",
    color: "#17365f",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(17px,4.5vw,24px)",
    fontWeight: 900,
    lineHeight: 1.8,
  },

  clock: {
    width: "min(72vw,280px)",
    height: "min(72vw,280px)",
    margin: "0 auto",
    display: "block",
  },

  revealBox: {
    padding: "10px 14px",
    border: "3px solid #28a95b",
    borderRadius: 18,
    background: "#edfff3",
    color: "#16713e",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(20px,5vw,28px)",
    fontWeight: 1000,
  },

  answerContent: {
    width: "100%",
    minHeight: 54,
    display: "grid",
    placeItems: "center",
    padding: "3px 5px",
    boxSizing: "border-box",
    color: "#17365f",
    direction: "rtl",
    textAlign: "center",
    fontSize: "clamp(21px,5.6vw,32px)",
    fontWeight: 1000,
  },
};
