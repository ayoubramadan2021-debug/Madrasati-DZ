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

const IMAGE_BASE =
  "/lessons/v2/lesson46";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_46_my_heart_beats_2/exercises";

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

type Choice = {
  id: string;
  label: string;
  image?: string;

};

type QuestionKind =
  | "image"
  | "text"
  | "compare"
  | "summary";

type HeartQuestion = {
  id: string;
  mission: 1 | 2 | 3 | 4;
  kind: QuestionKind;

  prompt: string;
  audioKey: string;

  scene?: string;
  choices: Choice[];
  answer: string;
};

const MISSION_TITLES = {
  1: "أُمَيِّزُ الْحَالَةَ",
  2: "أَفْهَمُ نَبْضَ الْقَلْبِ",
  3: "أُقَارِنُ بَيْنَ الْحَرَكَةِ وَالرَّاحَةِ",
  4: "أُرَاجِعُ مَا تَعَلَّمْتُ",
} as const;

const QUESTIONS: HeartQuestion[] = [
  // =============================================
  // التمرين 1: تمييز الصور والحالات
  // =============================================
  {
    id: "l46_ex1_q1",
    mission: 1,
    kind: "image",
    prompt:
      "اِخْتَرِ الصُّورَةَ الَّتِي تُبَيِّنُ التَّلَامِيذَ أَثْنَاءَ الْحَرَكَةِ.",
    audioKey: "l46_ex1_q1",
    choices: [
      {
        id: "movement",
        label: "التَّلَامِيذُ يَقْفِزُونَ",
        image: `${IMAGE_BASE}/s3.webp`,
      },
      {
        id: "rest",
        label: "أَثْنَاءَ الرَّاحَةِ",
        image: `${IMAGE_BASE}/s4.webp`,
      },
    ],
    answer: "movement",
  },
  {
    id: "l46_ex1_q2",
    mission: 1,
    kind: "image",
    prompt:
      "اِخْتَرِ الصُّورَةَ الَّتِي تُبَيِّنُ التَّلَامِيذَ وَهُمْ يَسْتَرِيحُونَ.",
    audioKey: "l46_ex1_q2",
    choices: [
      {
        id: "rest",
        label: "التَّلَامِيذُ يَسْتَرِيحُونَ",
        image: `${IMAGE_BASE}/s4.webp`,
      },
      {
        id: "movement",
        label: "التَّلَامِيذُ يَقْفِزُونَ",
        image: `${IMAGE_BASE}/s3.webp`,
      },
    ],
    answer: "rest",
  },
  {
    id: "l46_ex1_q3",
    mission: 1,
    kind: "image",
    prompt:
      "اِخْتَرِ الصُّورَةَ الَّتِي تُبَيِّنُ أَنَّ الْقَلْبَ يَسْتَمِرُّ فِي النَّبْضِ أَثْنَاءَ النَّوْمِ.",
    audioKey: "l46_ex1_q3",
    choices: [
      {
        id: "sleep",
        label: "طِفْلٌ نَائِمٌ",
        image: `${IMAGE_BASE}/s5.webp`,
      },
      {
        id: "lab",
        label: "فِي مَخْبَرِ الْقَلْبِ",
        image: `${IMAGE_BASE}/s1.webp`,
      },
    ],
    answer: "sleep",
  },
  {
    id: "l46_ex1_q4",
    mission: 1,
    kind: "image",
    prompt:
      "اِخْتَرِ الصُّورَةَ الَّتِي تُلَخِّصُ حَالَاتِ نَبْضِ الْقَلْبِ.",
    audioKey: "l46_ex1_q4",
    choices: [
      {
        id: "summary",
        label: "مَشْهَدٌ خِتَامِيٌّ",
        image: `${IMAGE_BASE}/s6.webp`,
      },
      {
        id: "intro",
        label: "مَشْهَدٌ أَوَّلٌ",
        image: `${IMAGE_BASE}/s1.webp`,
      },
    ],
    answer: "summary",
  },

  // =============================================
  // التمرين 2: فهم نبض القلب
  // =============================================
  {
    id: "l46_ex2_q1",
    mission: 2,
    kind: "text",
    prompt:
      "هَلْ يَتَوَقَّفُ الْقَلْبُ عِنْدَمَا نَجْلِسُ بِهُدُوءٍ؟",
    audioKey: "l46_ex2_q1",
    scene: `${IMAGE_BASE}/s2.webp`,
    choices: [
      {
        id: "continues",
        label: "لَا، يَسْتَمِرُّ فِي النَّبْضِ",

      },
      {
        id: "stops",
        label: "نَعَمْ، يَتَوَقَّفُ",

      },
      {
        id: "disappears",
        label: "يَخْتَفِي",

      },
    ],
    answer: "continues",
  },
  {
    id: "l46_ex2_q2",
    mission: 2,
    kind: "text",
    prompt:
      "مَاذَا يَحْدُثُ لِدَقَّاتِ الْقَلْبِ بَعْدَ الْقَفْزِ وَاللَّعِبِ؟",
    audioKey: "l46_ex2_q2",
    scene: `${IMAGE_BASE}/s3.webp`,
    choices: [
      {
        id: "faster",
        label: "تُصْبِحُ أَسْرَعَ",

      },
      {
        id: "slower",
        label: "تُصْبِحُ أَبْطَأَ",

      },
      {
        id: "stops",
        label: "تَتَوَقَّفُ",

      },
    ],
    answer: "faster",
  },
  {
    id: "l46_ex2_q3",
    mission: 2,
    kind: "text",
    prompt:
      "مَاذَا يَحْدُثُ لِدَقَّاتِ الْقَلْبِ بَعْدَ الرَّاحَةِ؟",
    audioKey: "l46_ex2_q3",
    scene: `${IMAGE_BASE}/s4.webp`,
    choices: [
      {
        id: "calmer",
        label: "تُصْبِحُ أَهْدَأَ",

      },
      {
        id: "faster",
        label: "تُصْبِحُ أَسْرَعَ",

      },
      {
        id: "stops",
        label: "تَتَوَقَّفُ",

      },
    ],
    answer: "calmer",
  },
  {
    id: "l46_ex2_q4",
    mission: 2,
    kind: "text",
    prompt:
      "هَلْ يَسْتَمِرُّ الْقَلْبُ فِي النَّبْضِ أَثْنَاءَ النَّوْمِ؟",
    audioKey: "l46_ex2_q4",
    scene: `${IMAGE_BASE}/s5.webp`,
    choices: [
      {
        id: "yes",
        label: "نَعَمْ، يَسْتَمِرُّ فِي النَّبْضِ",

      },
      {
        id: "no",
        label: "لَا، يَتَوَقَّفُ",

      },
    ],
    answer: "yes",
  },

  // =============================================
  // التمرين 3: مقارنة الحركة والراحة
  // =============================================
  {
    id: "l46_ex3_q1",
    mission: 3,
    kind: "compare",
    prompt:
      "مَتَى تَكُونُ دَقَّاتُ الْقَلْبِ أَسْرَعَ؟",
    audioKey: "l46_ex3_q1",
    choices: [
      {
        id: "movement",
        label: "بَعْدَ الْحَرَكَةِ",

      },
      {
        id: "rest",
        label: "قَبْلَ الْحَرَكَةِ",

      },
    ],
    answer: "movement",
  },
  {
    id: "l46_ex3_q2",
    mission: 3,
    kind: "compare",
    prompt:
      "مَتَى تَكُونُ دَقَّاتُ الْقَلْبِ أَهْدَأَ؟",
    audioKey: "l46_ex3_q2",
    choices: [
      {
        id: "rest",
        label: "أَثْنَاءَ الرَّاحَةِ",

      },
      {
        id: "jumping",
        label: "أَثْنَاءَ الْقَفْزِ",

      },
    ],
    answer: "rest",
  },
  {
    id: "l46_ex3_q3",
    mission: 3,
    kind: "compare",
    prompt:
      "اِخْتَرِ التَّرْتِيبَ الصَّحِيحَ بَعْدَ اللَّعِبِ.",
    audioKey: "l46_ex3_q3",
    choices: [
      {
        id: "correct-order",
        label:
          "حَرَكَةٌ ←  ← رَاحَةٌ ← ",

      },
      {
        id: "wrong-order",
        label:
          "رَاحَةٌ ← تَوَقُّفُ الْقَلْبِ ← حَرَكَةٌ",

      },
    ],
    answer: "correct-order",
  },
  {
    id: "l46_ex3_q4",
    mission: 3,
    kind: "compare",
    prompt:
      "مَاذَا نَفْعَلُ بَعْدَ النَّشَاطِ لِتَهْدَأَ دَقَّاتُ الْقَلْبِ؟",
    audioKey: "l46_ex3_q4",
    choices: [
      {
        id: "rest-water",
        label: "نَسْتَرِيحُ وَنَشْرَبُ الْمَاءَ",

      },
      {
        id: "more-jumping",
        label: "نَسْتَمِرُّ فِي الْقَفْزِ",

      },
      {
        id: "hold-breath",
        label: "نَحْبِسُ أَنْفَاسَنَا",

      },
    ],
    answer: "rest-water",
  },

  // =============================================
  // التمرين 4: مراجعة شاملة
  // =============================================
  {
    id: "l46_ex4_q1",
    mission: 4,
    kind: "summary",
    prompt:
      "اِخْتَرِ الْعِبَارَةَ الصَّحِيحَةَ عَنِ الْقَلْبِ.",
    audioKey: "l46_ex4_q1",
    scene: `${IMAGE_BASE}/s6.webp`,
    choices: [
      {
        id: "important",
        label: "الْقَلْبُ عُضْوٌ مُهِمٌّ يَنْبِضُ بِاسْتِمْرَارٍ",

      },
      {
        id: "sometimes",
        label: "الْقَلْبُ يَعْمَلُ أَحْيَانًا فَقَطْ",

      },
    ],
    answer: "important",
  },
  {
    id: "l46_ex4_q2",
    mission: 4,
    kind: "summary",
    prompt:
      "مَاذَا يَحْدُثُ لِسُرْعَةِ النَّبْضِ بَيْنَ الْحَرَكَةِ وَالرَّاحَةِ؟",
    audioKey: "l46_ex4_q2",
    choices: [
      {
        id: "changes",
        label: "تَتَغَيَّرُ سُرْعَتُهُ",

      },
      {
        id: "never-changes",
        label: "لَا تَتَغَيَّرُ أَبَدًا",

      },
    ],
    answer: "changes",
  },
  {
    id: "l46_ex4_q3",
    mission: 4,
    kind: "summary",
    prompt:
      "أَيُّ جُمْلَةٍ تَصِفُ نَبْضَ الْقَلْبِ أَثْنَاءَ النَّوْمِ؟",
    audioKey: "l46_ex4_q3",
    scene: `${IMAGE_BASE}/s5.webp`,
    choices: [
      {
        id: "continues",
        label: "يَسْتَمِرُّ فِي النَّبْضِ",

      },
      {
        id: "stops",
        label: "يَتَوَقَّفُ",

      },
      {
        id: "vanishes",
        label: "يَخْتَفِي",

      },
    ],
    answer: "continues",
  },
  {
    id: "l46_ex4_q4",
    mission: 4,
    kind: "summary",
    prompt:
      "مَا الْخُلَاصَةُ الصَّحِيحَةُ؟",
    audioKey: "l46_ex4_q4",
    choices: [
      {
        id: "final",
        label:
          "الْقَلْبُ يَنْبِضُ دَائِمًا، وَتَتَغَيَّرُ سُرْعَتُهُ حَسَبَ النَّشَاطِ",

      },
      {
        id: "wrong",
        label:
          "الْقَلْبُ يَنْبِضُ عِنْدَ الْجَرْيِ فَقَطْ",

      },
    ],
    answer: "final",
  },
];

function playFeedback(source: string) {
  const audio = new Audio(source);
  audio.volume = 0.9;
  audio.play().catch(() => undefined);
}

function SceneImage({
  source,
}: {
  source: string;
}) {
  return (
    <div style={styles.sceneFrame}>
      <img
        src={source}
        alt=""
        style={styles.sceneImage}
      />
    </div>
  );
}

function PulseComparison() {
  return (
    <div style={styles.comparisonBoard}>
      <div style={styles.stateCard}>
        <span style={styles.stateIcon}>
          🏃
        </span>

        <strong>
          الْحَرَكَةُ
        </strong>
      </div>

      <div style={styles.arrow}>
        ↔
      </div>

      <div style={styles.stateCard}>
        <span style={styles.stateIcon}>
          🪑
        </span>

        <strong>
          الرَّاحَةُ
        </strong>
      </div>
    </div>
  );
}

const LessonCompleteAny =
  LessonCompleteV2 as any;

export default function Lesson46HeartBeats2Exercises() {
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

  const answerLockedRef =
    useRef(false);

  const missionQuestions =
    QUESTIONS.filter(
      (question) =>
        question.mission === mission,
    );

  const question =
    missionQuestions[questionIndex];

  /*
   * ترتيب ثابت ومتغير بحسب رقم السؤال.
   * يمنع ظهور الإجابة الصحيحة دائمًا
   * في الجهة نفسها دون تغييرها أثناء العرض.
   */
  const displayedChoices = useMemo(() => {
    const choices = [...question.choices];

    if (choices.length <= 1) {
      return choices;
    }

    const match =
      question.id.match(/q(\d+)$/);

    const questionNumber =
      Number(match?.[1] ?? 1);

    const shift =
      (questionNumber + mission - 1) %
      choices.length;

    return [
      ...choices.slice(shift),
      ...choices.slice(0, shift),
    ];
  }, [mission, question]);

  const audioSource =
    `${AUDIO_BASE}/${question.audioKey}.mp3`;

  const timingSource =
    `${AUDIO_BASE}/${question.audioKey}.json`;

  const clearTimer =
    useCallback(() => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
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
        setActiveWordIndex(-1);
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
          answerLockedRef.current
        ) {
          return;
        }

        answerLockedRef.current = true;
        setSelectedId(choiceId);

        if (choiceId === question.answer) {
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
            answerLockedRef.current = false;
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

  if (question.kind === "image") {
    activity = (
      <div style={styles.lessonBadge}>
        <span aria-hidden="true">
          👀
        </span>

        <strong>
          أُلَاحِظُ الصُّوَرَ بِانْتِبَاهٍ
        </strong>
      </div>
    );
  } else if (question.kind === "compare") {
    activity = <PulseComparison />;
  } else if (question.scene) {
    activity = (
      <SceneImage
        source={question.scene}
      />
    );
  } else {
    activity = (
      <div style={styles.heartBoard}>
        <span style={styles.largeHeart}>
          💛
        </span>

        <strong>
          الْقَلْبُ يَنْبِضُ بِاسْتِمْرَارٍ
        </strong>
      </div>
    );
  }

  const answerOptions =
    displayedChoices.map((choice) => ({
      id: choice.id,
      ariaLabel: choice.label,

      content:
        choice.image ? (
          <div style={styles.imageChoice}>
            <img
              src={choice.image}
              alt=""
              style={styles.choiceImage}
            />

            <strong>
              {choice.label}
            </strong>
          </div>
        ) : (
          <div style={styles.textChoice}>
            <strong>
              {choice.label}
            </strong>
          </div>
        ),
    }));

  if (complete) {
    return (
      <LessonCompleteAny
        lessonKey="lesson46"
        title="🌟 أَحْسَنْتَ!"
        subtitle="أَتْقَنْتَ دَرْسَ قَلْبِي يَنْبِضُ."
        nextPath="/world2-lesson/47"
        onNext={() =>
          navigate("/world2-lesson/47")
        }
        onContinue={() =>
          navigate("/world2-lesson/47")
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
            question.kind === "image"
              ? "image"
              : "text"
          }
          columns={
            question.kind === "image"
              ? 2
              : question.choices.length === 2
                ? 2
                : 1
          }
          disabled={
            feedback !== "idle"
          }
        />
      }
      feedback={feedback}
      activityLabel="محتوى التمرين"
      answersLabel="خيارات الإجابة"
    />
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  lessonBadge: {
    width: "fit-content",
    maxWidth: "92%",
    margin: "0 auto",
    padding: "14px 24px",
    borderRadius: 26,
    border: "4px solid #edb21f",
    background:
      "linear-gradient(145deg,#fff,#fff4c9)",
    color: "#17365f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    fontSize:
      "clamp(21px,6vw,32px)",
    fontWeight: 1000,
    boxShadow:
      "0 10px 22px rgba(23,54,95,.14)",
  },

  sceneFrame: {
    width: "100%",
    maxWidth: 420,
    height: 245,
    margin: "0 auto",
    borderRadius: 25,
    border: "4px solid #edb21f",
    overflow: "hidden",
    background: "#fff",
    boxShadow:
      "0 10px 22px rgba(23,54,95,.15)",
  },

  sceneImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 24%",
  },

  imageChoice: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    color: "#17365f",
    fontSize:
      "clamp(14px,4vw,19px)",
    lineHeight: 1.4,
  },

  choiceImage: {
    width: "100%",
    height: 150,
    borderRadius: 17,
    objectFit: "cover",
    objectPosition: "center 25%",
  },

  textChoice: {
    width: "100%",
    minHeight: 58,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
    color: "#17365f",
    fontSize:
      "clamp(17px,4.6vw,23px)",
    lineHeight: 1.55,
    textAlign: "center",
  },


  comparisonBoard: {
    width: "100%",
    maxWidth: 610,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1fr) auto minmax(0,1fr)",
    alignItems: "stretch",
    gap: 8,
  },

  stateCard: {
    minWidth: 0,
    minHeight: 150,
    padding: "13px 6px",
    borderRadius: 24,
    border: "4px solid #edb21f",
    background:
      "linear-gradient(145deg,#fff,#fff5d8)",
    color: "#17365f",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    fontSize:
      "clamp(15px,4.3vw,22px)",
    textAlign: "center",
    boxShadow:
      "0 9px 18px rgba(23,54,95,.13)",
  },

  stateIcon: {
    fontSize:
      "clamp(34px,10vw,53px)",
  },

  arrow: {
    display: "grid",
    placeItems: "center",
    color: "#edb21f",
    fontSize:
      "clamp(25px,8vw,42px)",
    fontWeight: 1000,
  },

  fastPulse: {
    color: "#edb21f",
    fontSize:
      "clamp(15px,4vw,22px)",
    letterSpacing: -5,
  },

  calmPulse: {
    color: "#edb21f",
    fontSize:
      "clamp(17px,5vw,25px)",
  },

  heartBoard: {
    width: "100%",
    maxWidth: 500,
    minHeight: 150,
    margin: "0 auto",
    padding: 16,
    borderRadius: 27,
    border: "4px solid #edb21f",
    background:
      "linear-gradient(145deg,#fff,#fff4cb)",
    color: "#17365f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 8,
    fontSize:
      "clamp(19px,5.5vw,29px)",
    lineHeight: 1.5,
    textAlign: "center",
    boxShadow:
      "0 10px 22px rgba(23,54,95,.14)",
  },

  largeHeart: {
    fontSize:
      "clamp(48px,14vw,76px)",
  },
};
