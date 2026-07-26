import {
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
  "/audio/teachers/khalil/lesson_44_half_number_under_20/exercises";

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
  | "share"
  | "half"
  | "equation"
  | "reverse";

type HalfQuestion = {
  id: string;
  mission: 1 | 2 | 3 | 4;
  kind: QuestionKind;

  prompt: string;
  audioKey: string;

  total: number;
  half: number;
  object: string;

  choices: string[];
  answer: string;
};

const MISSION_TITLES = {
  1: "أُقَسِّمُ بِالتَّسَاوِي",
  2: "أَكْتَشِفُ النِّصْفَ",
  3: "أُكْمِلُ الْعَمَلِيَّةَ",
  4: "أُكَوِّنُ الْعَدَدَ الْكَامِلَ",
} as const;

const QUESTIONS: HalfQuestion[] = [
  {
    id: "l44_ex1_q1",
    mission: 1,
    kind: "share",
    prompt:
      "نُوَزِّعُ بَالُونَيْنِ عَلَى مَجْمُوعَتَيْنِ مُتَسَاوِيَتَيْنِ. كَمْ بَالُونًا فِي كُلِّ مَجْمُوعَةٍ؟",
    audioKey: "l44_ex1_q1",
    total: 2,
    half: 1,
    object: "🎈",
    choices: ["1", "2", "3"],
    answer: "1",
  },
  {
    id: "l44_ex1_q2",
    mission: 1,
    kind: "share",
    prompt:
      "نُوَزِّعُ سِتَّ نَجَمَاتٍ عَلَى مَجْمُوعَتَيْنِ مُتَسَاوِيَتَيْنِ. كَمْ نَجْمَةً فِي كُلِّ مَجْمُوعَةٍ؟",
    audioKey: "l44_ex1_q2",
    total: 6,
    half: 3,
    object: "⭐",
    choices: ["2", "3", "4"],
    answer: "3",
  },
  {
    id: "l44_ex1_q3",
    mission: 1,
    kind: "share",
    prompt:
      "نُوَزِّعُ عَشْرَ تُفَّاحَاتٍ عَلَى مَجْمُوعَتَيْنِ مُتَسَاوِيَتَيْنِ. كَمْ تُفَّاحَةً فِي كُلِّ مَجْمُوعَةٍ؟",
    audioKey: "l44_ex1_q3",
    total: 10,
    half: 5,
    object: "🍎",
    choices: ["4", "5", "6"],
    answer: "5",
  },
  {
    id: "l44_ex1_q4",
    mission: 1,
    kind: "share",
    prompt:
      "نُوَزِّعُ أَرْبَعَ عَشْرَةَ كُرَةً عَلَى مَجْمُوعَتَيْنِ مُتَسَاوِيَتَيْنِ. كَمْ كُرَةً فِي كُلِّ مَجْمُوعَةٍ؟",
    audioKey: "l44_ex1_q4",
    total: 14,
    half: 7,
    object: "⚽",
    choices: ["6", "7", "8"],
    answer: "7",
  },

  {
    id: "l44_ex2_q1",
    mission: 2,
    kind: "half",
    prompt: "مَا نِصْفُ الْعَدَدِ أَرْبَعَةٍ؟",
    audioKey: "l44_ex2_q1",
    total: 4,
    half: 2,
    object: "🔵",
    choices: ["2", "3", "1"],
    answer: "2",
  },
  {
    id: "l44_ex2_q2",
    mission: 2,
    kind: "half",
    prompt: "مَا نِصْفُ الْعَدَدِ ثَمَانِيَةٍ؟",
    audioKey: "l44_ex2_q2",
    total: 8,
    half: 4,
    object: "🟣",
    choices: ["3", "4", "5"],
    answer: "4",
  },
  {
    id: "l44_ex2_q3",
    mission: 2,
    kind: "half",
    prompt: "مَا نِصْفُ الْعَدَدِ اثْنَيْ عَشَرَ؟",
    audioKey: "l44_ex2_q3",
    total: 12,
    half: 6,
    object: "🟢",
    choices: ["5", "6", "7"],
    answer: "6",
  },
  {
    id: "l44_ex2_q4",
    mission: 2,
    kind: "half",
    prompt: "مَا نِصْفُ الْعَدَدِ ثَمَانِيَةَ عَشَرَ؟",
    audioKey: "l44_ex2_q4",
    total: 18,
    half: 9,
    object: "🟠",
    choices: ["8", "9", "10"],
    answer: "9",
  },

  {
    id: "l44_ex3_q1",
    mission: 3,
    kind: "equation",
    prompt: "سِتَّةٌ تُسَاوِي ثَلَاثَةً زَائِدَ كَمْ؟",
    audioKey: "l44_ex3_q1_v2",
    total: 6,
    half: 3,
    object: "🎈",
    choices: ["2", "3", "4"],
    answer: "3",
  },
  {
    id: "l44_ex3_q2",
    mission: 3,
    kind: "equation",
    prompt: "عَشَرَةٌ تُسَاوِي خَمْسَةً زَائِدَ كَمْ؟",
    audioKey: "l44_ex3_q2_v2",
    total: 10,
    half: 5,
    object: "⭐",
    choices: ["4", "5", "6"],
    answer: "5",
  },
  {
    id: "l44_ex3_q3",
    mission: 3,
    kind: "equation",
    prompt: "أَرْبَعَةَ عَشَرَ تُسَاوِي سَبْعَةً زَائِدَ كَمْ؟",
    audioKey: "l44_ex3_q3_v2",
    total: 14,
    half: 7,
    object: "🍎",
    choices: ["6", "7", "8"],
    answer: "7",
  },
  {
    id: "l44_ex3_q4",
    mission: 3,
    kind: "equation",
    prompt: "سِتَّةَ عَشَرَ تُسَاوِي ثَمَانِيَةً زَائِدَ كَمْ؟",
    audioKey: "l44_ex3_q4_v2",
    total: 16,
    half: 8,
    object: "⚽",
    choices: ["7", "8", "9"],
    answer: "8",
  },

  {
    id: "l44_ex4_q1",
    mission: 4,
    kind: "reverse",
    prompt: "نِصْفُ الْعَدَدِ وَاحِدٌ. مَا الْعَدَدُ كَامِلًا؟",
    audioKey: "l44_ex4_q1_v2",
    total: 2,
    half: 1,
    object: "🔵",
    choices: ["2", "4", "1"],
    answer: "2",
  },
  {
    id: "l44_ex4_q2",
    mission: 4,
    kind: "reverse",
    prompt: "نِصْفُ الْعَدَدِ ثَلَاثَةٌ. مَا الْعَدَدُ كَامِلًا؟",
    audioKey: "l44_ex4_q2_v2",
    total: 6,
    half: 3,
    object: "🟣",
    choices: ["4", "6", "8"],
    answer: "6",
  },
  {
    id: "l44_ex4_q3",
    mission: 4,
    kind: "reverse",
    prompt: "نِصْفُ الْعَدَدِ خَمْسَةٌ. مَا الْعَدَدُ كَامِلًا؟",
    audioKey: "l44_ex4_q3_v2",
    total: 10,
    half: 5,
    object: "🟢",
    choices: ["8", "10", "12"],
    answer: "10",
  },
  {
    id: "l44_ex4_q4",
    mission: 4,
    kind: "reverse",
    prompt: "نِصْفُ الْعَدَدِ تِسْعَةٌ. مَا الْعَدَدُ كَامِلًا؟",
    audioKey: "l44_ex4_q4_v2",
    total: 18,
    half: 9,
    object: "🟠",
    choices: ["16", "18", "14"],
    answer: "18",
  },
];

function playSound(source: string) {
  const audio = new Audio(source);
  audio.volume = 0.9;
  audio.play().catch(() => undefined);
}

function ObjectGroup({
  count,
  object,
}: {
  count: number;
  object: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          count > 6
            ? "repeat(3, 1fr)"
            : "repeat(2, 1fr)",
        gap: 7,
        placeItems: "center",
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{
            fontSize: "clamp(26px,8vw,42px)",
            lineHeight: 1,
            filter: "drop-shadow(0 4px 4px rgba(0,0,0,.12))",
          }}
        >
          {object}
        </span>
      ))}
    </div>
  );
}

function EqualGroupsBoard({
  half,
  object,
}: {
  half: number;
  object: string;
}) {
  return (
    <div style={styles.activityCard}>
      <div style={styles.equalGroups}>
        <div style={styles.groupBox}>
          <ObjectGroup count={half} object={object} />
        </div>

        <div style={styles.divider}>＝</div>

        <div style={styles.groupBox}>
          <ObjectGroup count={half} object={object} />
        </div>
      </div>

      <strong style={styles.activityHint}>
        مَجْمُوعَتَانِ مُتَسَاوِيَتَانِ
      </strong>
    </div>
  );
}

function HalfBoard({
  total,
  half,
  object,
}: {
  total: number;
  half: number;
  object: string;
}) {
  return (
    <div style={styles.activityCard}>
      <div style={styles.totalBadge}>{total}</div>

      <div style={styles.halfArrow}>↓ النِّصْفُ ↓</div>

      <div style={styles.groupBox}>
        <ObjectGroup count={half} object={object} />
      </div>

      <div style={styles.questionBadge}>؟</div>
    </div>
  );
}

function EquationBoard({
  total,
  half,
}: {
  total: number;
  half: number;
}) {
  return (
    <div style={styles.activityCard}>
      <div style={styles.equation}>
        <span>{total}</span>

        <span style={styles.goldSymbol}>
          =
        </span>

        <span style={styles.fixedNumber}>
          {half}
        </span>

        <span style={styles.goldSymbol}>
          +
        </span>

        <span style={styles.emptyNumber}>
          ؟
        </span>
      </div>

      <strong style={styles.activityHint}>
        النِّصْفُ الْأَوَّلُ مَعْلُومٌ،
        فَمَا النِّصْفُ الثَّانِي؟
      </strong>
    </div>
  );
}

function ReverseBoard({
  half,
}: {
  half: number;
}) {
  return (
    <div style={styles.activityCard}>
      <strong style={styles.activityHint}>
        الْعَدَدُ الْكَامِلُ يَتَكَوَّنُ
        مِنْ نِصْفَيْنِ مُتَسَاوِيَيْنِ
      </strong>

      <div style={styles.halfNumbersRow}>
        <div style={styles.halfNumberCircle}>
          {half}
        </div>

        <span style={styles.goldSymbolLarge}>
          +
        </span>

        <div style={styles.halfNumberCircle}>
          {half}
        </div>
      </div>

      <div style={styles.fullNumberRow}>
        <span>الْعَدَدُ كَامِلًا</span>
        <span style={styles.goldSymbolLarge}>
          =
        </span>
        <span style={styles.emptyNumber}>
          ؟
        </span>
      </div>
    </div>
  );
}

const LessonCompleteAny = LessonCompleteV2 as any;

export default function Lesson44HalfExercises() {
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
      (question) => question.mission === mission,
    );

  const question =
    missionQuestions[questionIndex];

  const audioSource =
    `${AUDIO_BASE}/${question.audioKey}.mp3`;

  const boundarySource =
    `${AUDIO_BASE}/${question.audioKey}.json`;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetQuestion = useCallback(() => {
    clearTimer();
    setSelectedId(null);
    setFeedback("idle");
    answerLockRef.current = false;
  }, [clearTimer]);

  useEffect(() => {
    resetQuestion();
  }, [mission, questionIndex, resetQuestion]);

  useEffect(() => {
    let cancelled = false;

    boundariesRef.current = [];
    setBoundaries([]);
    setActiveWordIndex(-1);
    setIsPlaying(false);

    fetch(boundarySource)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        if (cancelled) return;

        const words =
          Array.isArray(data) ? data : [];

        boundariesRef.current = words;
        setBoundaries(words);
      })
      .catch(() => {
        if (cancelled) return;

        boundariesRef.current = [];
        setBoundaries([]);
      });

    const audio = new Audio(audioSource);
    audio.preload = "auto";

    const onPlay = () => {
      if (!cancelled) setIsPlaying(true);
    };

    const onPause = () => {
      if (!cancelled) setIsPlaying(false);
    };

    const onEnded = () => {
      if (!cancelled) {
        setIsPlaying(false);
        setActiveWordIndex(-1);
      }
    };

    const onTimeUpdate = () => {
      if (cancelled) return;

      const currentMs = audio.currentTime * 1000;
      const words = boundariesRef.current;

      let nextIndex = -1;

      for (let index = 0; index < words.length; index += 1) {
        const word = words[index];
        const start = Number(word.offset) || 0;

        const duration = Math.max(
          Number(word.duration) || 0,
          180,
        );

        const nextStart =
          index < words.length - 1
            ? Number(words[index + 1].offset)
            : Number.POSITIVE_INFINITY;

        const end = Math.min(
          start + duration + 130,
          nextStart + 40,
        );

        if (currentMs >= start && currentMs < end) {
          nextIndex = index;
          break;
        }
      }

      setActiveWordIndex(nextIndex);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);

    audioRef.current = audio;

    const autoTimer = window.setTimeout(() => {
      if (cancelled) return;

      audio.currentTime = 0;
      audio.play().catch(() => setIsPlaying(false));
    }, AUTO_PLAY_DELAY);

    return () => {
      cancelled = true;

      window.clearTimeout(autoTimer);
      audio.pause();

      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);

      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [audioSource, boundarySource]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const replayQuestion = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) return;

    setActiveWordIndex(-1);
    audio.currentTime = 0;

    audio.play().catch(() => setIsPlaying(false));
  }, []);

  const moveForward = useCallback(() => {
    if (questionIndex < missionQuestions.length - 1) {
      setQuestionIndex((current) => current + 1);
      return;
    }

    if (mission < 4) {
      setMission(
        (mission + 1) as 1 | 2 | 3 | 4,
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

  const selectAnswer = useCallback(
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

        timerRef.current = window.setTimeout(
          moveForward,
          FEEDBACK_DELAY,
        );

        return;
      }

      setFeedback("wrong");
      playSound(RETRY_SOUND);

      timerRef.current = window.setTimeout(() => {
        setSelectedId(null);
        setFeedback("idle");
        answerLockRef.current = false;
        timerRef.current = null;
      }, FEEDBACK_DELAY);
    },
    [feedback, moveForward, question.answer],
  );

  const questionWords =
    boundaries.length > 0
      ? boundaries.map((word) => word.text)
      : question.prompt.trim().split(/\s+/);

  let activity: ReactNode;

  if (question.kind === "share") {
    activity = (
      <EqualGroupsBoard
        half={question.half}
        object={question.object}
      />
    );
  } else if (question.kind === "half") {
    activity = (
      <HalfBoard
        total={question.total}
        half={question.half}
        object={question.object}
      />
    );
  } else if (question.kind === "equation") {
    activity = (
      <EquationBoard
        total={question.total}
        half={question.half}
      />
    );
  } else {
    activity = (
      <ReverseBoard
        half={question.half}
      />
    );
  }

  const answerOptions =
    question.choices.map((choice) => ({
      id: choice,
      ariaLabel: choice,
      content: (
        <span style={styles.answerNumber}>
          {choice}
        </span>
      ),
    }));

  if (complete) {
    return (
      <LessonCompleteAny
        lessonKey="lesson44"
        title="أَحْسَنْتَ!"
        subtitle="أَتْقَنْتَ نِصْفَ الْأَعْدَادِ الْأَصْغَرِ مِنْ عِشْرِينَ."
        nextPath="/world2-lesson/45"
        onNext={() =>
          navigate("/world2-lesson/45")
        }
        onContinue={() =>
          navigate("/world2-lesson/45")
        }
      />
    );
  }

  return (
    <UnifiedExerciseScreenV2
      index={questionIndex}
      total={missionQuestions.length}
      missionTitle={MISSION_TITLES[mission]}
      questionWords={questionWords}
      activeWordIndex={activeWordIndex}
      activeWord={
        activeWordIndex >= 0
          ? questionWords[activeWordIndex] ?? ""
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
          columns={3}
          disabled={feedback !== "idle"}
        />
      }
      feedback={feedback}
      activityLabel="تمثيل النصف"
      answersLabel="اختر الإجابة الصحيحة"
    />
  );
}

const styles: Record<string, React.CSSProperties> = {
  activityCard: {
    width: "100%",
    maxWidth: 580,
    boxSizing: "border-box",
    margin: "0 auto",
    padding: "20px 13px",
    border: "4px solid #edb21f",
    borderRadius: 28,
    background:
      "linear-gradient(145deg,#ffffff,#fff7dd)",
    boxShadow:
      "0 12px 25px rgba(23,54,95,.14)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
  },

  equalGroups: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(7px,3vw,18px)",
  },

  groupBox: {
    minWidth: "clamp(105px,31vw,175px)",
    minHeight: 110,
    padding: 12,
    boxSizing: "border-box",
    border: "3px solid #17365f",
    borderRadius: 22,
    background: "#ffffff",
    display: "grid",
    placeItems: "center",
  },

  divider: {
    color: "#edb21f",
    fontSize: "clamp(30px,9vw,52px)",
    fontWeight: 1000,
  },

  activityHint: {
    color: "#17365f",
    fontSize: "clamp(17px,4.8vw,25px)",
    textAlign: "center",
    lineHeight: 1.5,
  },

  totalBadge: {
    width: "clamp(90px,27vw,145px)",
    height: "clamp(90px,27vw,145px)",
    borderRadius: "50%",
    border: "6px solid #edb21f",
    background: "#17365f",
    color: "#ffffff",
    display: "grid",
    placeItems: "center",
    fontSize: "clamp(48px,15vw,78px)",
    fontWeight: 1000,
    direction: "ltr",
  },

  halfArrow: {
    color: "#7b3f18",
    fontSize: "clamp(19px,5.5vw,29px)",
    fontWeight: 1000,
  },

  questionBadge: {
    minWidth: 76,
    minHeight: 60,
    padding: "4px 15px",
    borderRadius: 18,
    border: "4px dashed #edb21f",
    background: "#fff8df",
    color: "#17365f",
    display: "grid",
    placeItems: "center",
    fontSize: 43,
    fontWeight: 1000,
  },

  equation: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "clamp(7px,3vw,16px)",
    color: "#17365f",
    fontSize: "clamp(37px,11vw,65px)",
    fontWeight: 1000,
    direction: "ltr",
  },

  goldSymbol: {
    color: "#edb21f",
  },

  fixedNumber: {
    minWidth: "clamp(60px,18vw,95px)",
    minHeight: "clamp(60px,18vw,95px)",
    borderRadius: 18,
    border: "4px solid #17365f",
    background: "#ffffff",
    color: "#17365f",
    display: "inline-grid",
    placeItems: "center",
  },

  halfNumbersRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(14px,5vw,28px)",
    direction: "ltr",
  },

  halfNumberCircle: {
    width: "clamp(90px,27vw,140px)",
    height: "clamp(90px,27vw,140px)",
    borderRadius: "50%",
    border: "6px solid #edb21f",
    background: "#17365f",
    color: "#ffffff",
    display: "grid",
    placeItems: "center",
    fontSize: "clamp(43px,13vw,70px)",
    fontWeight: 1000,
  },

  goldSymbolLarge: {
    color: "#edb21f",
    fontSize: "clamp(34px,10vw,56px)",
    fontWeight: 1000,
  },

  fullNumberRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "clamp(9px,3vw,18px)",
    color: "#17365f",
    fontSize: "clamp(20px,6vw,31px)",
    fontWeight: 1000,
  },

  emptyNumber: {
    minWidth: "clamp(60px,18vw,95px)",
    minHeight: "clamp(60px,18vw,95px)",
    borderRadius: 18,
    border: "4px dashed #edb21f",
    background: "#fff8df",
    display: "inline-grid",
    placeItems: "center",
  },

  reverseEquation: {
    padding: "9px 18px",
    borderRadius: 18,
    background: "#17365f",
    color: "#ffffff",
    fontSize: "clamp(22px,6vw,34px)",
    fontWeight: 1000,
    direction: "ltr",
  },

  answerNumber: {
    fontSize: "clamp(30px,9vw,48px)",
    fontWeight: 1000,
    direction: "ltr",
    unicodeBidi: "isolate",
  },
};
