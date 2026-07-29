import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import UnifiedExerciseAnswersV2 from
  "../components/UnifiedExerciseAnswersV2";

import UnifiedExerciseScreenV2 from
  "../components/UnifiedExerciseScreenV2";

import type {
  Lesson49Question,
} from "../content/lesson49_types";

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

type FeedbackState =
  | "idle"
  | "correct"
  | "wrong";

export type FoodSourcesExerciseV2Props = {
  items: readonly Lesson49Question[];
  audio_base: string;
  missionTitle: string;
  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

const CORRECT_AUDIO =
  "/audio/v2_feedback/correct.mp3";

const RETRY_AUDIO =
  "/audio/v2_feedback/retry.mp3";

const ExerciseScreen =
  UnifiedExerciseScreenV2 as any;

const ExerciseAnswers =
  UnifiedExerciseAnswersV2 as any;

export default function FoodSourcesExerciseV2({
  items,
  audio_base,
  missionTitle,
  onComplete,
}: FoodSourcesExerciseV2Props) {
  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [feedback, setFeedback] =
    useState<FeedbackState>("idle");

  const [locked, setLocked] =
    useState(false);

  const [score, setScore] =
    useState(0);

  const [timings, setTimings] =
    useState<Record<string, WordTiming[]>>(
      {},
    );

  const [activeWordIndex, setActiveWordIndex] =
    useState(-1);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const advanceTimerRef =
    useRef<number | null>(null);

  const question =
    items[questionIndex];

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
    }

    audioRef.current = null;
    setIsPlaying(false);
    setActiveWordIndex(-1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadAllTimings() {
      const loaded:
        Record<string, WordTiming[]> = {};

      for (const item of items) {
        try {
          const response = await fetch(
            `${audio_base}/${item.question_audio_key}.json`,
          );

          if (response.ok) {
            loaded[item.question_audio_key] =
              await response.json();
          }
        } catch {
          // يظهر النص كاملًا عند تعذر تحميل JSON.
        }
      }

      if (!cancelled) {
        setTimings(loaded);
      }
    }

    void loadAllTimings();

    return () => {
      cancelled = true;
    };
  }, [audio_base, items]);

  const playQuestion = useCallback(() => {
    if (!question) return;

    stopAudio();

    const words =
      timings[question.question_audio_key] ?? [];

    const audio = new Audio(
      `${audio_base}/${question.question_audio_key}.mp3`,
    );

    audioRef.current = audio;

    const updateWord = () => {
      const timeMs =
        audio.currentTime * 1000;

      const currentIndex =
        words.findIndex((word) => {
          const start = word.offset;
          const end =
            word.offset + word.duration;

          return (
            timeMs >= start &&
            timeMs < end
          );
        });

      setActiveWordIndex(currentIndex);
    };

    audio.addEventListener(
      "timeupdate",
      updateWord,
    );

    audio.addEventListener(
      "ended",
      () => {
        setIsPlaying(false);
        setActiveWordIndex(-1);
      },
      { once: true },
    );

    setIsPlaying(true);

    audio.play().catch(() => {
      setIsPlaying(false);
      setActiveWordIndex(-1);
    });
  }, [
    audio_base,
    question,
    stopAudio,
    timings,
  ]);

  useEffect(() => {
    stopAudio();

    setSelectedId(null);
    setFeedback("idle");
    setLocked(false);

    if (!question) return;

    const timer = window.setTimeout(
      playQuestion,
      500,
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    playQuestion,
    question,
    questionIndex,
    stopAudio,
  ]);

  useEffect(() => {
    return () => {
      stopAudio();

      if (advanceTimerRef.current !== null) {
        window.clearTimeout(
          advanceTimerRef.current,
        );
      }
    };
  }, [stopAudio]);

  if (!question) {
    return null;
  }

  const questionWords =
    timings[
      question.question_audio_key
    ]?.map((word) => word.text) ??
    question.question
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const playFeedback = (
    isCorrect: boolean,
  ) => {
    const audio = new Audio(
      isCorrect
        ? CORRECT_AUDIO
        : RETRY_AUDIO,
    );

    audio.play().catch(() => {});
  };

  const selectAnswer = (
    answerId: string,
  ) => {
    if (locked || feedback === "correct") {
      return;
    }

    // LESSON49_STOP_QUESTION_AUDIO_ON_ANSWER
    // نوقف صوت السؤال والكاريوكي فور لمس الإجابة،
    // ثم نشغّل صوت التغذية الراجعة وحده.
    stopAudio();

    setSelectedId(answerId);

    if (answerId === question.correctId) {
      const nextScore = score + 1;

      setScore(nextScore);
      setFeedback("correct");
      setLocked(true);

      playFeedback(true);

      advanceTimerRef.current =
        window.setTimeout(() => {
          if (
            questionIndex + 1 <
            items.length
          ) {
            setQuestionIndex(
              (current) => current + 1,
            );

            return;
          }

          onComplete?.(
            nextScore,
            items.length,
          );
        }, 1700);

      return;
    }

    setFeedback("wrong");
    playFeedback(false);

    window.setTimeout(() => {
      setSelectedId(null);
      setFeedback("idle");
    }, 1300);
  };

  return (
    <ExerciseScreen
      index={questionIndex}
      total={items.length}
      missionTitle={missionTitle}
      questionWords={questionWords}
      activeWordIndex={
        isPlaying
          ? activeWordIndex
          : -1
      }
      onReplay={playQuestion}
      isPlaying={isPlaying}
      backgroundImage={
        question.backgroundImage
      }
      activity={
        <section
          dir="rtl"
          style={{
            width: "min(520px, 94%)",
            minHeight: 190,
            margin: "0 auto",
            padding: "22px 18px",
            borderRadius: 30,
            background:
              "rgba(255,255,255,.94)",
            border:
              "4px solid rgba(232,160,32,.86)",
            boxShadow:
              "0 18px 38px rgba(15,36,71,.18)",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              fontSize:
                "clamp(58px,18vw,98px)",
              lineHeight: 1.1,
              filter:
                "drop-shadow(0 9px 12px rgba(0,0,0,.14))",
            }}
          >
            {question.focusEmoji}
          </div>

          <div
            style={{
              marginTop: 12,
              color: "#17365f",
              fontSize:
                "clamp(20px,5vw,29px)",
              lineHeight: 1.55,
              fontWeight: 1000,
            }}
          >
            {question.focusLabel}
          </div>
        </section>
      }
      answers={
        <ExerciseAnswers
          options={question.options}
          selectedId={selectedId}
          feedback={feedback}
          onSelect={selectAnswer}
          variant="text"
          columns="auto"
          disabled={locked}
          direction="rtl"
        />
      }
      feedback={feedback}
      successText="🌟 أَحْسَنْتَ!"
      retryText="حَاوِلْ مَرَّةً أُخْرَى ✨"
    />
  );
}
