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

const IMAGE_BASE =
  "/lessons/v2/lesson42/exercises";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_42_my_heart_beats_1/exercises";

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

type HeartQuestion = {
  id: string;
  mission: 1 | 2 | 3 | 4;

  prompt: string;
  audioKey: string;

  image?: string;

  answerMode:
    | "image"
    | "text";

  choices: Choice[];
  answer: string;
};

const MISSION_TITLES = {
  1: "أَخْتَارُ الصُّورَةَ",
  2: "أَفْهَمُ نَبْضَ الْقَلْبِ",
  3: "أُقَارِنُ بَعْدَ الْجَرْيِ",
  4: "أُرَاجِعُ مَا تَعَلَّمْتُ",
} as const;

const QUESTIONS: HeartQuestion[] = [
  {
    id: "l42_ex1_q1",
    mission: 1,
    prompt:
      "اِخْتَرِ الصُّورَةَ الَّتِي يَضَعُ فِيهَا الطِّفْلُ يَدَهُ عَلَى صَدْرِهِ لِيَتَحَسَّسَ نَبْضَ قَلْبِهِ.",
    audioKey: "l42_ex1_q1",
    answerMode: "image",
    choices: [
      {
        id: "chest",
        label: "الْيَدُ عَلَى الصَّدْرِ",
        image: `${IMAGE_BASE}/s2.webp`,
      },
      {
        id: "belly",
        label: "الْيَدُ عَلَى الْبَطْنِ",
        image: `${IMAGE_BASE}/s8.webp`,
      },
    ],
    answer: "chest",
  },

  {
    id: "l42_ex1_q2",
    mission: 1,
    prompt:
      "أَيُّ صُورَةٍ تُبَيِّنُ الطِّفْلَ بَعْدَ الْجَرْيِ؟",
    audioKey: "l42_ex1_q2_after_running_v2",
    answerMode: "image",
    choices: [
      {
        id: "after-running",
        label: "بَعْدَ الْجَرْيِ",
        image: `${IMAGE_BASE}/s1.webp`,
      },
      {
        id: "calm",
        label: "الطِّفْلُ يَقِفُ بِهُدُوءٍ",
        image: `${IMAGE_BASE}/s2.webp`,
      },
    ],
    answer: "after-running",
  },

  {
    id: "l42_ex1_q3",
    mission: 1,
    prompt:
      "اِخْتَرِ الصُّورَةَ الَّتِي تَتَحَسَّسُ فِيهَا الْأُمُّ وَالطِّفْلُ نَبْضَ الْقَلْبِ.",
    audioKey: "l42_ex1_q3",
    answerMode: "image",
    choices: [
      {
        id: "mother-child",
        label: "الْأُمُّ وَالطِّفْلُ",
        image: `${IMAGE_BASE}/s5.webp`,
      },
      {
        id: "belly-only",
        label: "الْيَدُ عَلَى الْبَطْنِ",
        image: `${IMAGE_BASE}/s8.webp`,
      },
    ],
    answer: "mother-child",
  },

  {
    id: "l42_ex1_q4",
    mission: 1,
    prompt:
      "اِخْتَرِ الصُّورَةَ الَّتِي تُبَيِّنُ أَنَّ الطِّفْلَ الصَّغِيرَ لَهُ قَلْبٌ يَنْبِضُ.",
    audioKey: "l42_ex1_q4",
    answerMode: "image",
    choices: [
      {
        id: "two-children",
        label: "طِفْلَانِ يَتَحَسَّسَانِ النَّبْضَ",
        image: `${IMAGE_BASE}/s6.webp`,
      },
      {
        id: "belly-position",
        label: "الْيَدُ عَلَى الْبَطْنِ",
        image: `${IMAGE_BASE}/s8.webp`,
      },
    ],
    answer: "two-children",
  },

  {
    id: "l42_ex2_q1",
    mission: 2,
    prompt:
      "بَعْدَ الْجَرْيِ، مَاذَا شَعَرَ الطِّفْلُ فِي صَدْرِهِ؟",
    audioKey: "l42_ex2_q1",
    image: `${IMAGE_BASE}/s1.webp`,
    answerMode: "text",
    choices: [
      {
        id: "heartbeat",
        label: "دَقَّاتِ قَلْبِهِ",
      },
      {
        id: "cold",
        label: "بِالْبَرْدِ",
      },
      {
        id: "stomach",
        label: "بِأَلَمٍ فِي بَطْنِهِ",
      },
    ],
    answer: "heartbeat",
  },

  {
    id: "l42_ex2_q2",
    mission: 2,
    prompt:
      "أَيْنَ وَضَعَ الطِّفْلُ يَدَهُ لِيَتَحَسَّسَ نَبْضَ قَلْبِهِ؟",
    audioKey: "l42_ex2_q2",
    image: `${IMAGE_BASE}/s2.webp`,
    answerMode: "text",
    choices: [
      {
        id: "chest",
        label: "عَلَى صَدْرِهِ",
      },
      {
        id: "belly",
        label: "عَلَى بَطْنِهِ",
      },
      {
        id: "head",
        label: "عَلَى رَأْسِهِ",
      },
    ],
    answer: "chest",
  },

  {
    id: "l42_ex2_q3",
    mission: 2,
    prompt:
      "مَاذَا تَفْعَلُ الْأُمُّ وَالطِّفْلُ فِي الصُّورَةِ؟",
    audioKey: "l42_ex2_q3",
    image: `${IMAGE_BASE}/s5.webp`,
    answerMode: "text",
    choices: [
      {
        id: "feel-heartbeat",
        label: "يَتَحَسَّسَانِ نَبْضَ الْقَلْبِ",
      },
      {
        id: "clap",
        label: "يُصَفِّقَانِ",
      },
      {
        id: "sleep",
        label: "يَنَامَانِ",
      },
    ],
    answer: "feel-heartbeat",
  },

  {
    id: "l42_ex2_q4",
    mission: 2,
    prompt:
      "مَا الْعِبَارَةُ الصَّحِيحَةُ عَنِ الطِّفْلِ الصَّغِيرِ؟",
    audioKey: "l42_ex2_q4",
    image: `${IMAGE_BASE}/s6.webp`,
    answerMode: "text",
    choices: [
      {
        id: "has-heart",
        label: "لَهُ قَلْبٌ يَنْبِضُ",
      },
      {
        id: "no-heart",
        label: "لَا قَلْبَ لَهُ",
      },
      {
        id: "heart-belly",
        label: "قَلْبُهُ فِي بَطْنِهِ",
      },
    ],
    answer: "has-heart",
  },

  {
    id: "l42_ex3_q1",
    mission: 3,
    prompt:
      "أَيُّ طِفْلٍ أَنْهَى الْجَرْيَ قَبْلَ قَلِيلٍ؟",
    audioKey: "l42_ex3_q1",
    answerMode: "image",
    choices: [
      {
        id: "after-running",
        label: "الطِّفْلُ بَعْدَ الْجَرْيِ",
        image: `${IMAGE_BASE}/s1.webp`,
      },
      {
        id: "calm",
        label: "الطِّفْلُ الْهَادِئُ",
        image: `${IMAGE_BASE}/s2.webp`,
      },
    ],
    answer: "after-running",
  },

  {
    id: "l42_ex3_q2",
    mission: 3,
    prompt:
      "مَتَى نَشْعُرُ بِدَقَّاتِ الْقَلْبِ بِوُضُوحٍ أَكْبَرَ؟",
    audioKey: "l42_ex3_q2",
    image: `${IMAGE_BASE}/s1.webp`,
    answerMode: "text",
    choices: [
      {
        id: "after-running",
        label: "بَعْدَ الْجَرْيِ",
      },
      {
        id: "sleeping",
        label: "أَثْنَاءَ النَّوْمِ",
      },
    ],
    answer: "after-running",
  },

  {
    id: "l42_ex3_q3",
    mission: 3,
    prompt:
      "مَاذَا يَفْعَلُ الطِّفْلُ فِي الصُّورَتَيْنِ؟",
    audioKey: "l42_ex3_q3",
    image: `${IMAGE_BASE}/s7.webp`,
    answerMode: "text",
    choices: [
      {
        id: "hand-chest",
        label: "يَضَعُ يَدَهُ عَلَى صَدْرِهِ",
      },
      {
        id: "hand-head",
        label: "يَضَعُ يَدَهُ عَلَى رَأْسِهِ",
      },
      {
        id: "hands-up",
        label: "يَرْفَعُ يَدَيْهِ",
      },
    ],
    answer: "hand-chest",
  },

  {
    id: "l42_ex3_q4",
    mission: 3,
    prompt:
      "هَلْ يَنْبِضُ الْقَلْبُ قَبْلَ الْجَرْيِ وَبَعْدَهُ؟",
    audioKey: "l42_ex3_q4",
    image: `${IMAGE_BASE}/s7.webp`,
    answerMode: "text",
    choices: [
      {
        id: "yes",
        label: "نَعَمْ",
      },
      {
        id: "no",
        label: "لَا",
      },
    ],
    answer: "yes",
  },

  {
    id: "l42_ex4_q1",
    mission: 4,
    prompt:
      "أَيُّ وَضْعِيَّةٍ صَحِيحَةٌ لِتَحَسُّسِ نَبْضِ الْقَلْبِ؟",
    audioKey: "l42_ex4_q1",
    image: `${IMAGE_BASE}/s4.webp`,
    answerMode: "text",
    choices: [
      {
        id: "chest",
        label: "الْيَدُ عَلَى الصَّدْرِ",
      },
      {
        id: "belly",
        label: "الْيَدُ عَلَى الْبَطْنِ",
      },
    ],
    answer: "chest",
  },

  {
    id: "l42_ex4_q2",
    mission: 4,
    prompt:
      "هَلْ وَضْعُ الْيَدِ عَلَى الْبَطْنِ هُوَ الطَّرِيقَةُ الصَّحِيحَةُ لِتَحَسُّسِ نَبْضِ الْقَلْبِ؟",
    audioKey: "l42_ex4_q2",
    image: `${IMAGE_BASE}/s8.webp`,
    answerMode: "text",
    choices: [
      {
        id: "no",
        label: "لَا",
      },
      {
        id: "yes",
        label: "نَعَمْ",
      },
    ],
    answer: "no",
  },

  {
    id: "l42_ex4_q3",
    mission: 4,
    prompt:
      "الْقَلْبُ لَا نَرَاهُ بِالْعَيْنَيْنِ. هَلْ هَذِهِ الْعِبَارَةُ صَحِيحَةٌ؟",
    audioKey: "l42_ex4_q3",
    image: `${IMAGE_BASE}/s2.webp`,
    answerMode: "text",
    choices: [
      {
        id: "yes",
        label: "نَعَمْ",
      },
      {
        id: "no",
        label: "لَا",
      },
    ],
    answer: "yes",
  },

  {
    id: "l42_ex4_q4",
    mission: 4,
    prompt:
      "الطِّفْلُ الصَّغِيرُ لَهُ قَلْبٌ يَنْبِضُ. هَلْ هَذِهِ الْعِبَارَةُ صَحِيحَةٌ؟",
    audioKey: "l42_ex4_q4",
    image: `${IMAGE_BASE}/s6.webp`,
    answerMode: "text",
    choices: [
      {
        id: "yes",
        label: "نَعَمْ",
      },
      {
        id: "no",
        label: "لَا",
      },
    ],
    answer: "yes",
  },
];

function playSound(
  source: string,
) {
  const audio = new Audio(source);

  audio.volume = 0.9;

  audio
    .play()
    .catch(() => undefined);
}

function ImageCard({
  source,
  label,
}: {
  source: string;
  label: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
      }}
    >
      <img
        src={source}
        alt={label}
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          aspectRatio: "4 / 5",
          objectFit: "cover",
          borderRadius: 18,
          userSelect: "none",
        }}
      />

      <span
        style={{
          fontSize:
            "clamp(15px,4vw,20px)",
          fontWeight: 1000,
          lineHeight: 1.45,
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
}

const LessonCompleteAny =
  LessonCompleteV2 as any;

export default function Lesson42HeartExercises() {
  const navigate = useNavigate();

  const [
    mission,
    setMission,
  ] =
    useState<1 | 2 | 3 | 4>(
      1,
    );

  const [
    questionIndex,
    setQuestionIndex,
  ] = useState(0);

  const [
    selectedId,
    setSelectedId,
  ] =
    useState<string | null>(
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
    boundaries,
    setBoundaries,
  ] =
    useState<KaraokeWord[]>(
      [],
    );

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
    useRef<KaraokeWord[]>([]);

  const timerRef =
    useRef<number | null>(
      null,
    );

  const answerLockRef =
    useRef(false);

  const missionQuestions =
    QUESTIONS.filter(
      (question) =>
        question.mission ===
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

        const next =
          Array.isArray(data)
            ? data
            : [];

        boundariesRef.current =
          next;

        setBoundaries(next);
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

        const currentTime =
          audio.currentTime * 1000;

        const words =
          boundariesRef.current;

        let nextIndex = -1;

        for (
          let index = 0;
          index < words.length;
          index += 1
        ) {
          const word =
            words[index];

          const start =
            Number(word.offset) ||
            0;

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
            currentTime >= start &&
            currentTime < end
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

    const autoTimer =
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
          feedback !== "idle" ||
          answerLockRef.current
        ) {
          return;
        }

        answerLockRef.current =
          true;

        setSelectedId(choiceId);

        if (
          choiceId ===
          question.answer
        ) {
          setFeedback("correct");

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

        setFeedback("wrong");

        playSound(
          RETRY_SOUND,
        );

        timerRef.current =
          window.setTimeout(
            () => {
              setSelectedId(null);
              setFeedback("idle");

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

  const activity: ReactNode =
    question.image ? (
      <div
        style={{
          width: "100%",
          maxWidth: 470,
          margin: "0 auto",
          padding: 7,
          borderRadius: 26,
          background:
            "linear-gradient(145deg,#edb21f,#fff0b5)",
          boxShadow:
            "0 12px 25px rgba(23,54,95,.16)",
        }}
      >
        <img
          src={question.image}
          alt=""
          draggable={false}
          style={{
            display: "block",
            width: "100%",
            maxHeight:
              "min(48dvh,520px)",
            aspectRatio: "4 / 5",
            objectFit: "cover",
            borderRadius: 20,
            userSelect: "none",
          }}
        />
      </div>
    ) : (
      <div
        style={{
          minHeight: 150,
          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
          flexDirection: "column",
          gap: 9,
          color: "#17365f",
          textAlign: "center",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontSize:
              "clamp(70px,20vw,110px)",
            filter:
              "drop-shadow(0 8px 10px rgba(173,40,60,.20))",
          }}
        >
          ❤️
        </span>

        <strong
          style={{
            fontSize:
              "clamp(18px,5vw,25px)",
          }}
        >
          اُنْظُرْ جَيِّدًا
          إِلَى الصُّوَرِ
        </strong>
      </div>
    );

  const answerOptions =
    question.choices.map(
      (choice) => ({
        id: choice.id,

        ariaLabel:
          choice.label,

        content:
          question.answerMode ===
            "image" &&
          choice.image ? (
            <ImageCard
              source={
                choice.image
              }
              label={
                choice.label
              }
            />
          ) : (
            choice.label
          ),
      }),
    );

  if (complete) {
    return (
      <LessonCompleteAny
        lessonKey="lesson42"
        title="أَحْسَنْتَ!"
        subtitle="تَعَلَّمْتَ كَيْفَ تَتَحَسَّسُ نَبْضَ قَلْبِكَ."
        nextPath="/world2-lesson/43"
        onNext={() =>
          navigate(
            "/world2-lesson/43",
          )
        }
        onContinue={() =>
          navigate(
            "/world2-lesson/43",
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
          missionQuestions.length,
        )
      }
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
          showCorrect={false}
          onSelect={
            selectAnswer
          }
          variant={
            question.answerMode ===
            "image"
              ? "image"
              : "text"
          }
          columns={
            question.answerMode ===
              "image"
              ? 2
              : question.choices
                    .length === 2
                ? 2
                : 1
          }
          disabled={
            feedback !== "idle"
          }
        />
      }
      feedback={
        feedback
      }
      activityLabel="صورة التمرين"
      answersLabel={
        question.answerMode ===
          "image"
          ? "اختر الصورة الصحيحة"
          : "اختر الإجابة الصحيحة"
      }
    />
  );
}
