import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import LessonCompleteV2 from "../components/LessonCompleteV2";
import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";

const IMAGE_BASE =
  "/lessons/v2/lesson64-plants-with-us-2";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_64_plants_with_us_2/exercises";

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
  1: "أَكْتَشِفُ أَهَمِّيَّةَ النَّبَاتَاتِ",
  2: "أَفْهَمُ أَضْرَارَ حَرِيقِ الْغَابَةِ",
  3: "أَخْتَارُ السُّلُوكَ الإِيجَابِيَّ",
  4: "أَحْمِي النَّبَاتَاتِ وَأُرَاجِعُ",
} as const;

const QUESTIONS: HeartQuestion[] = [
  {
    id: "l64_ex1_q1",
    mission: 1,
    kind: "text",
    prompt:
      "مَاذَا تُعْطِينَا الأَشْجَارُ فِي يَوْمٍ مُشْمِسٍ؟",
    audioKey: "l64_ex1_q1",
    scene: `${IMAGE_BASE}/s4.webp`,
    choices: [
      {
        id: "shade",
        label: "الظِّلَّ",
      },
      {
        id: "smoke",
        label: "الدُّخَانَ",
      },
      {
        id: "waste",
        label: "النُّفَايَاتِ",
      },
      {
        id: "fire",
        label: "النَّارَ",
      },
    ],
    answer: "shade",
  },
  {
    id: "l64_ex1_q2",
    mission: 1,
    kind: "text",
    prompt:
      "مَاذَا تُعْطِينَا بَعْضُ النَّبَاتَاتِ لِنَأْكُلَهُ؟",
    audioKey: "l64_ex1_q2",
    scene: `${IMAGE_BASE}/s4.webp`,
    choices: [
      {
        id: "stones",
        label: "الْحِجَارَةَ",
      },
      {
        id: "fruits",
        label: "الثِّمَارَ",
      },
      {
        id: "toys",
        label: "الأَلْعَابَ",
      },
      {
        id: "smoke",
        label: "الدُّخَانَ",
      },
    ],
    answer: "fruits",
  },
  {
    id: "l64_ex1_q3",
    mission: 1,
    kind: "text",
    prompt:
      "مَنْ يَسْتَفِيدُ مِنَ النَّبَاتَاتِ؟",
    audioKey: "l64_ex1_q3",
    scene: `${IMAGE_BASE}/s4.webp`,
    choices: [
      {
        id: "cars",
        label: "السَّيَّارَاتُ",
      },
      {
        id: "stones",
        label: "الْحِجَارَةُ",
      },
      {
        id: "people-animals",
        label: "الإِنْسَانُ وَالْحَيَوَانُ",
      },
      {
        id: "waste",
        label: "النُّفَايَاتُ",
      },
    ],
    answer: "people-animals",
  },
  {
    id: "l64_ex1_q4",
    mission: 1,
    kind: "text",
    prompt:
      "مَاذَا تَجْعَلُ النَّبَاتَاتُ الْمَكَانَ؟",
    audioKey: "l64_ex1_q4",
    scene: `${IMAGE_BASE}/s6.webp`,
    choices: [
      {
        id: "burned",
        label: "مُحْتَرِقًا",
      },
      {
        id: "dirty",
        label: "مُتَّسِخًا",
      },
      {
        id: "dark",
        label: "مُظْلِمًا",
      },
      {
        id: "beautiful",
        label: "جَمِيلًا وَنَقِيًّا",
      },
    ],
    answer: "beautiful",
  },

  {
    id: "l64_ex2_q1",
    mission: 2,
    kind: "text",
    prompt:
      "مَاذَا يَحْدُثُ لِلأَشْجَارِ عِنْدَ احْتِرَاقِ الْغَابَةِ؟",
    audioKey: "l64_ex2_q1",
    scene: `${IMAGE_BASE}/s1.webp`,
    choices: [
      {
        id: "burn",
        label: "تَحْتَرِقُ",
      },
      {
        id: "greener",
        label: "تُصْبِحُ أَكْثَرَ اخْضِرَارًا",
      },
      {
        id: "toys",
        label: "تَتَحَوَّلُ إِلَى أَلْعَابٍ",
      },
      {
        id: "grow",
        label: "تَنْمُو فَوْرًا",
      },
    ],
    answer: "burn",
  },
  {
    id: "l64_ex2_q2",
    mission: 2,
    kind: "text",
    prompt:
      "مَاذَا يَحْدُثُ لِلْحَيَوَانَاتِ بَعْدَ حَرِيقِ الْغَابَةِ؟",
    audioKey: "l64_ex2_q2",
    scene: `${IMAGE_BASE}/s1.webp`,
    choices: [
      {
        id: "food",
        label: "تَجِدُ طَعَامًا أَكْثَرَ",
      },
      {
        id: "home",
        label: "تَفْقِدُ مَأْوَاهَا",
      },
      {
        id: "build",
        label: "تَبْنِي مَنَازِلَ جَدِيدَةً",
      },
      {
        id: "play",
        label: "تَلْعَبُ قُرْبَ النَّارِ",
      },
    ],
    answer: "home",
  },
  {
    id: "l64_ex2_q3",
    mission: 2,
    kind: "text",
    prompt:
      "كَيْفَ يَصْبِحُ الْهَوَاءُ عِنْدَ وُجُودِ الدُّخَانِ؟",
    audioKey: "l64_ex2_q3",
    scene: `${IMAGE_BASE}/s1.webp`,
    choices: [
      {
        id: "clean",
        label: "نَقِيًّا",
      },
      {
        id: "cold",
        label: "بَارِدًا",
      },
      {
        id: "polluted",
        label: "مُلَوَّثًا",
      },
      {
        id: "perfumed",
        label: "مُعَطَّرًا",
      },
    ],
    answer: "polluted",
  },
  {
    id: "l64_ex2_q4",
    mission: 2,
    kind: "text",
    prompt:
      "كَيْفَ يَصْبِحُ مَنْظَرُ الْغَابَةِ بَعْدَ الْحَرِيقِ؟",
    audioKey: "l64_ex2_q4",
    scene: `${IMAGE_BASE}/s1.webp`,
    choices: [
      {
        id: "pretty",
        label: "أَكْثَرَ جَمَالًا",
      },
      {
        id: "flowers",
        label: "مُمْتَلِئًا بِالأَزْهَارِ",
      },
      {
        id: "green",
        label: "أَكْثَرَ اخْضِرَارًا",
      },
      {
        id: "damaged",
        label: "مُحْتَرِقًا وَمُتَضَرِّرًا",
      },
    ],
    answer: "damaged",
  },

  {
    id: "l64_ex3_q1",
    mission: 3,
    kind: "text",
    prompt:
      "أَيُّ سُلُوكٍ يُحَافِظُ عَلَى الْحَدِيقَةِ؟",
    audioKey: "l64_ex3_q1",
    scene: `${IMAGE_BASE}/s5.webp`,
    choices: [
      {
        id: "plant",
        label: "غَرْسُ الأَشْجَارِ",
      },
      {
        id: "break",
        label: "كَسْرُ الأَغْصَانِ",
      },
      {
        id: "throw",
        label: "رَمْيُ النُّفَايَاتِ",
      },
      {
        id: "step",
        label: "دَوْسُ الأَزْهَارِ",
      },
    ],
    answer: "plant",
  },
  {
    id: "l64_ex3_q2",
    mission: 3,
    kind: "text",
    prompt:
      "كَيْفَ أَعْتَنِي بِأَزْهَارِ الْحَدِيقَةِ؟",
    audioKey: "l64_ex3_q2",
    scene: `${IMAGE_BASE}/s5.webp`,
    choices: [
      {
        id: "cut",
        label: "أَقْطَعُهَا",
      },
      {
        id: "care",
        label: "أَسْقِيهَا وَأَعْتَنِي بِهَا",
      },
      {
        id: "step",
        label: "أَدُوسُهَا",
      },
      {
        id: "waste",
        label: "أَرْمِي عَلَيْهَا النُّفَايَاتِ",
      },
    ],
    answer: "care",
  },
  {
    id: "l64_ex3_q3",
    mission: 3,
    kind: "text",
    prompt:
      "مَاذَا أَفْعَلُ بِأَغْصَانِ الأَشْجَارِ؟",
    audioKey: "l64_ex3_q3",
    scene: `${IMAGE_BASE}/s5.webp`,
    choices: [
      {
        id: "burn",
        label: "أَحْرِقُهَا",
      },
      {
        id: "break",
        label: "أَكْسِرُهَا",
      },
      {
        id: "protect",
        label: "أُحَافِظُ عَلَيْهَا",
      },
      {
        id: "throw",
        label: "أَرْمِيهَا فِي الطَّرِيقِ",
      },
    ],
    answer: "protect",
  },
  {
    id: "l64_ex3_q4",
    mission: 3,
    kind: "text",
    prompt:
      "كَيْفَ أُحَافِظُ عَلَى نَظَافَةِ الْغَابَةِ؟",
    audioKey: "l64_ex3_q4",
    scene: `${IMAGE_BASE}/s5.webp`,
    choices: [
      {
        id: "leave",
        label: "أَتْرُكُ النُّفَايَاتِ",
      },
      {
        id: "fire",
        label: "أُشْعِلُ النَّارَ",
      },
      {
        id: "break",
        label: "أَكْسِرُ الأَشْجَارَ",
      },
      {
        id: "clean",
        label:
          "أَجْمَعُ النُّفَايَاتِ وَأَرْمِيهَا فِي السَّلَّةِ",
      },
    ],
    answer: "clean",
  },

  {
    id: "l64_ex4_q1",
    mission: 4,
    kind: "text",
    prompt:
      "أَيُّ عَمَلٍ يَحْمِي الْغَابَةَ مِنَ الْحَرِيقِ؟",
    audioKey: "l64_ex4_q1",
    scene: `${IMAGE_BASE}/s3.webp`,
    choices: [
      {
        id: "extinguish",
        label:
          "إِطْفَاءُ النَّارِ قَبْلَ مُغَادَرَةِ الْمَكَانِ",
      },
      {
        id: "leave",
        label: "تَرْكُ النَّارِ مُشْتَعِلَةً",
      },
      {
        id: "match",
        label: "رَمْيُ عُودِ ثِقَابٍ",
      },
      {
        id: "leaves",
        label: "حَرْقُ الأَوْرَاقِ الْجَافَّةِ",
      },
    ],
    answer: "extinguish",
  },
  {
    id: "l64_ex4_q2",
    mission: 4,
    kind: "text",
    prompt:
      "أَيُّ سُلُوكٍ يَضُرُّ بِالنَّبَاتَاتِ؟",
    audioKey: "l64_ex4_q2",
    scene: `${IMAGE_BASE}/s3.webp`,
    choices: [
      {
        id: "water",
        label: "سَقْيُ الأَزْهَارِ",
      },
      {
        id: "break",
        label: "كَسْرُ أَغْصَانِ الأَشْجَارِ",
      },
      {
        id: "plant",
        label: "غَرْسُ شَجَرَةٍ",
      },
      {
        id: "clean",
        label: "تَنْظِيفُ الْحَدِيقَةِ",
      },
    ],
    answer: "break",
  },
  {
    id: "l64_ex4_q3",
    mission: 4,
    kind: "text",
    prompt:
      "أَيُّ عِبَارَةٍ صَحِيحَةٌ؟",
    audioKey: "l64_ex4_q3",
    scene: `${IMAGE_BASE}/s3.webp`,
    choices: [
      {
        id: "useless",
        label: "النَّبَاتَاتُ غَيْرُ مُفِيدَةٍ",
      },
      {
        id: "cut",
        label: "يَجِبُ أَنْ نَقْطَعَ الأَشْجَارَ",
      },
      {
        id: "protect",
        label:
          "النَّبَاتَاتُ مُفِيدَةٌ وَيَجِبُ حِمَايَتُهَا",
      },
      {
        id: "waste",
        label:
          "نَرْمِي النُّفَايَاتِ فِي الْغَابَةِ",
      },
    ],
    answer: "protect",
  },
  {
    id: "l64_ex4_q4",
    mission: 4,
    kind: "text",
    prompt:
      "مَاذَا تَعَلَّمْنَا فِي هَذَا الدَّرْسِ؟",
    audioKey: "l64_ex4_q4",
    scene: `${IMAGE_BASE}/s3.webp`,
    choices: [
      {
        id: "break",
        label: "أَنْ نَكْسِرَ الأَغْصَانَ",
      },
      {
        id: "step",
        label: "أَنْ نَدُوسَ الأَزْهَارَ",
      },
      {
        id: "fire",
        label:
          "أَنْ نُشْعِلَ النَّارَ فِي الْغَابَةِ",
      },
      {
        id: "care",
        label:
          "أَنْ نُحَافِظَ عَلَى النَّبَاتَاتِ وَنَعْتَنِيَ بِهَا",
      },
    ],
    answer: "care",
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

export default function Lesson64PlantsWithUs2Exercises() {

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

  const displayedChoices = question.choices;

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
        {question.scene ? (
          <img
            src={question.scene}
            alt={question.prompt}
            style={styles.activitySceneImage}
          />
        ) : (
          <>
            <span style={styles.largeHeart}>
              🌿
            </span>

            <strong>
              النَّبَاتَاتُ مُفِيدَةٌ، لِذَلِكَ يَجِبُ أَنْ نُحَافِظَ عَلَيْهَا.
            </strong>
          </>
        )}
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
      <LessonCompleteV2
        lessonKey="lesson64"
        message="أَتْمَمْتَ هَذِهِ التَّمَارِينَ بِنَجَاحٍ، وَيُمْكِنُكَ الآنَ الِانْتِقَالُ إِلَى الدَّرْسِ التَّالِي أَوْ إِعَادَةُ التَّمَارِينِ."

        stars={3}
        nextLessonKey="lesson65"
        nextPath="/lesson-v2/lesson65"
        nextLabel="الدرس التالي"
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
      backgroundImage={`${IMAGE_BASE}/s1.webp`}
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
          columns={2}
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
  activitySceneImage: {
    width: "100%",
    maxWidth: 360,
    height: 190,
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
    borderRadius: 18,
  },
};
