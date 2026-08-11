import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import LessonCompleteV2 from "../components/LessonCompleteV2";
import UnifiedExerciseAnswersV2, {
  type UnifiedAnswerOption,
} from "../components/UnifiedExerciseAnswersV2";
import UnifiedExerciseScreenV2, {
  type UnifiedExerciseFeedbackState,
} from "../components/UnifiedExerciseScreenV2";

export type UnifiedLessonExerciseQuestionV2 = {
  id: string;
  mission: number;

  prompt: string;
  audioKey: string;

  choices?: UnifiedAnswerOption[];
  answer?: string;

  variant?: "number" | "text" | "image";
  columns?: 1 | 2 | 3 | "auto";

  backgroundImage?: string;

  activity?: ReactNode;

  successText?: string;
  retryText?: string;

  activityLabel?: string;
  answersLabel?: string;
};

export type UnifiedLessonExerciseRenderContextV2<
  Q extends UnifiedLessonExerciseQuestionV2,
> = {
  question: Q;

  feedback: UnifiedExerciseFeedbackState;
  selectedId: string | null;
  locked: boolean;
  showResult: boolean;

  submitAnswer: (answerId: string) => void;
  submitResult: (correct: boolean) => void;
};

export type UnifiedLessonExercisesV2Props<
  Q extends UnifiedLessonExerciseQuestionV2,
> = {
  lessonKey: string;

  audioBase: string;

  questions: Q[];

  missionTitles?: Record<number, string>;
  missionCount?: number;

  completionMessage: string;

  nextLessonKey?: string;
  nextPath?: string;
  nextLabel?: string;

  quizPath?: string | null;

  returnPath?: string;
  returnLabel?: string;

  renderActivity?: (
    context: UnifiedLessonExerciseRenderContextV2<Q>,
  ) => ReactNode;

  feedbackDelay?: number;
  retryDelay?: number;
  autoPlayDelay?: number;

  correctSound?: string;
  retrySound?: string;
};

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

const DEFAULT_CORRECT_SOUND =
  "/audio/v2_feedback/correct.mp3";

const DEFAULT_RETRY_SOUND =
  "/audio/v2_feedback/retry.mp3";

function fallbackTimings(
  text: string,
): WordTiming[] {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => ({
      text: word,
      offset: index * 500,
      duration: 450,
    }));
}

function validTimings(
  value: unknown,
): value is WordTiming[] {
  if (!Array.isArray(value) || value.length === 0) {
    return false;
  }

  return value.every((item) => {
    if (
      !item
      || typeof item !== "object"
    ) {
      return false;
    }

    const timing =
      item as Partial<WordTiming>;

    return (
      typeof timing.text === "string"
      && timing.text.trim().length > 0
      && typeof timing.offset === "number"
      && timing.offset >= 0
      && typeof timing.duration === "number"
      && timing.duration > 0
    );
  });
}

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
    // Feedback sound is non-blocking.
  }
}

export default function UnifiedLessonExercisesV2<
  Q extends UnifiedLessonExerciseQuestionV2,
>({
  lessonKey,
  audioBase,
  questions,

  missionTitles = {},

  completionMessage,

  nextLessonKey,
  nextPath,
  nextLabel,

  quizPath,

  returnPath,
  returnLabel,

  renderActivity,

  feedbackDelay = 1450,
  retryDelay = 900,
  autoPlayDelay = 500,

  correctSound = DEFAULT_CORRECT_SOUND,
  retrySound = DEFAULT_RETRY_SOUND,
}: UnifiedLessonExercisesV2Props<Q>) {
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
  ] =
    useState<UnifiedExerciseFeedbackState>(
      "idle",
    );

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
    shownWordCount,
    setShownWordCount,
  ] = useState(0);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const animationRef =
    useRef<number | null>(null);

  const feedbackTimerRef =
    useRef<number | null>(null);

  const autoPlayTimerRef =
    useRef<number | null>(null);

  const timingsRef =
    useRef<WordTiming[]>([]);

  const question =
    questions[questionIndex];

  const stopQuestionAudio =
    useCallback(() => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(
          animationRef.current,
        );

        animationRef.current = null;
      }

      const audio = audioRef.current;

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      audioRef.current = null;

      setIsPlaying(false);
      setActiveWordIndex(-1);
    }, []);

  const clearTimers =
    useCallback(() => {
      if (
        feedbackTimerRef.current
        !== null
      ) {
        window.clearTimeout(
          feedbackTimerRef.current,
        );

        feedbackTimerRef.current = null;
      }

      if (
        autoPlayTimerRef.current
        !== null
      ) {
        window.clearTimeout(
          autoPlayTimerRef.current,
        );

        autoPlayTimerRef.current = null;
      }
    }, []);

  const replay =
    useCallback(async () => {
      if (!question) return;

      stopQuestionAudio();

      const audio = new Audio(
        `${audioBase}/`
        + `${question.audioKey}.mp3`,
      );

      audioRef.current = audio;

      setActiveWordIndex(-1);
      setShownWordCount(0);

      const tick = () => {
        if (
          audioRef.current !== audio
        ) {
          return;
        }

        const now =
          audio.currentTime * 1000;

        const currentTimings =
          timingsRef.current;

        const shownCount =
          currentTimings.reduce(
            (count, timing) =>
              now >= timing.offset
                ? count + 1
                : count,
            0,
          );

        setShownWordCount(
          shownCount,
        );

        let active = -1;

        for (
          let index = 0;
          index < currentTimings.length;
          index += 1
        ) {
          const timing =
            currentTimings[index];

          if (
            now >= timing.offset
            && now
              < timing.offset
                + timing.duration
          ) {
            active = index;
            break;
          }
        }

        setActiveWordIndex(active);

        if (
          !audio.paused
          && !audio.ended
        ) {
          animationRef.current =
            requestAnimationFrame(tick);
        }
      };

      audio.onplay = () => {
        setIsPlaying(true);
        tick();
      };

      audio.onended = () => {
        setIsPlaying(false);
        setActiveWordIndex(-1);

        if (
          animationRef.current
          !== null
        ) {
          cancelAnimationFrame(
            animationRef.current,
          );

          animationRef.current =
            null;
        }
      };

      audio.onerror = () => {
        setIsPlaying(false);
      };

      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    }, [
      audioBase,
      question,
      stopQuestionAudio,
    ]);

  useEffect(() => {
    if (!question) return;

    let cancelled = false;

    const fallback =
      fallbackTimings(
        question.prompt,
      );

    timingsRef.current = fallback;
    setTimings(fallback);

    fetch(
      `${audioBase}/`
      + `${question.audioKey}.json`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Timing file unavailable",
          );
        }

        return response.json();
      })
      .then((data: unknown) => {
        if (
          cancelled
          || !validTimings(data)
        ) {
          return;
        }

        timingsRef.current = data;
        setTimings(data);
      })
      .catch(() => {
        // Safe fallback already loaded.
      });

    return () => {
      cancelled = true;
    };
  }, [
    audioBase,
    question,
  ]);

  useEffect(() => {
    if (!question) return;

    stopQuestionAudio();

    setSelectedId(null);
    setFeedback("idle");
    setLocked(false);
    setActiveWordIndex(-1);
    setShownWordCount(0);

    if (
      autoPlayTimerRef.current
      !== null
    ) {
      window.clearTimeout(
        autoPlayTimerRef.current,
      );
    }

    autoPlayTimerRef.current =
      window.setTimeout(() => {
        void replay();
      }, autoPlayDelay);

    return () => {
      if (
        autoPlayTimerRef.current
        !== null
      ) {
        window.clearTimeout(
          autoPlayTimerRef.current,
        );

        autoPlayTimerRef.current =
          null;
      }
    };
  }, [
    autoPlayDelay,
    question?.id,
    replay,
    stopQuestionAudio,
  ]);

  useEffect(() => {
    return () => {
      stopQuestionAudio();
      clearTimers();
    };
  }, [
    clearTimers,
    stopQuestionAudio,
  ]);

  const handleResult =
    useCallback((
      correct: boolean,
      answerId: string | null,
    ) => {
      if (
        locked
        || feedback !== "idle"
      ) {
        return;
      }

      stopQuestionAudio();

      setSelectedId(answerId);
      setLocked(true);

      if (!correct) {
        setFeedback("wrong");

        playFeedback(
          retrySound,
        );

        feedbackTimerRef.current =
          window.setTimeout(() => {
            setFeedback("idle");
            setSelectedId(null);
            setLocked(false);

            feedbackTimerRef.current =
              null;
          }, retryDelay);

        return;
      }

      setFeedback("correct");

      playFeedback(
        correctSound,
      );

      feedbackTimerRef.current =
        window.setTimeout(() => {
          if (
            questionIndex
            < questions.length - 1
          ) {
            setQuestionIndex(
              questionIndex + 1,
            );
          } else {
            setComplete(true);
          }

          feedbackTimerRef.current =
            null;
        }, feedbackDelay);
    }, [
      correctSound,
      feedback,
      feedbackDelay,
      locked,
      questionIndex,
      questions.length,
      retryDelay,
      retrySound,
      stopQuestionAudio,
    ]);

  const submitAnswer =
    useCallback((
      answerId: string,
    ) => {
      if (
        !question
        || !question.answer
      ) {
        return;
      }

      handleResult(
        answerId === question.answer,
        answerId,
      );
    }, [
      handleResult,
      question,
    ]);

  const submitResult =
    useCallback((
      correct: boolean,
    ) => {
      handleResult(
        correct,
        null,
      );
    }, [
      handleResult,
    ]);

  const restart =
    useCallback(() => {
      clearTimers();
      stopQuestionAudio();

      setQuestionIndex(0);
      setSelectedId(null);
      setFeedback("idle");
      setLocked(false);
      setComplete(false);

      timingsRef.current = [];
      setTimings([]);
      setActiveWordIndex(-1);
      setShownWordCount(0);
    }, [
      clearTimers,
      stopQuestionAudio,
    ]);

  const allQuestionWords =
    useMemo(
      () =>
        timings.length > 0
          ? timings.map(
              (timing) =>
                timing.text,
            )
          : question
            ? question.prompt
                .split(/\s+/)
                .filter(Boolean)
            : [],
      [
        question,
        timings,
      ],
    );

  /*
   * جميع الكلمات تمر إلى Karaoke منذ البداية
   * حتى يُحجز الحجم الكامل للجملة.
   *
   * shownWordCount فقط يحدد الكلمات المرئية.
   */
  const questionWords =
    allQuestionWords;

  const visibleActiveWordIndex =
    activeWordIndex >= 0
    && activeWordIndex
      < allQuestionWords.length
      ? activeWordIndex
      : -1;

  const activeWord =
    visibleActiveWordIndex >= 0
      ? allQuestionWords[
          visibleActiveWordIndex
        ] ?? ""
      : "";

  if (
    questions.length === 0
    || !question
  ) {
    return null;
  }

  if (complete) {
    return (
      <LessonCompleteV2
        lessonKey={lessonKey}
        message={completionMessage}
        onReplay={restart}
        nextLessonKey={
          nextLessonKey
        }
        nextPath={nextPath}
        nextLabel={nextLabel}
        quizPath={quizPath}
        returnPath={returnPath}
        returnLabel={returnLabel}
      />
    );
  }

  const activity =
    renderActivity
      ? renderActivity({
          question,
          feedback,
          selectedId,
          locked,
          showResult:
            feedback === "correct",
          submitAnswer,
          submitResult,
        })
      : question.activity
        ?? (
          <div
            aria-hidden="true"
          />
        );

  const options =
    question.choices ?? [];

  const answers =
    options.length > 0
      ? (
        <UnifiedExerciseAnswersV2
          options={options}
          selectedId={selectedId}
          feedback={feedback}
          correctId={
            question.answer
            ?? null
          }
          showCorrect={false}
          onSelect={submitAnswer}
          variant={
            question.variant
            ?? "text"
          }
          columns={
            question.columns
            ?? 2
          }
          disabled={locked}
        />
      )
      : (
        <div aria-hidden="true" />
      );

  const missionTitle =
    missionTitles[
      question.mission
    ]
    ?? `الْمُهِمَّةُ ${question.mission}`;

  const missionQuestionIndex =
    questions
      .slice(
        0,
        questionIndex + 1,
      )
      .filter(
        (item) =>
          item.mission
          === question.mission,
      )
      .length - 1;

  const missionQuestionTotal =
    questions.filter(
      (item) =>
        item.mission
        === question.mission,
    ).length;

  return (
    <UnifiedExerciseScreenV2
      index={Math.max(
        0,
        missionQuestionIndex,
      )}
      total={Math.max(
        1,
        missionQuestionTotal,
      )}

      missionTitle={
        missionTitle
      }

      questionWords={
        questionWords
      }

      activeWordIndex={
        visibleActiveWordIndex
      }

      activeWord={
        activeWord
      }

      shownWordCount={
        shownWordCount
      }

      onReplay={replay}

      isPlaying={
        isPlaying
      }

      backgroundImage={
        question.backgroundImage
      }

      activity={
        activity
      }

      answers={
        answers
      }

      feedback={
        feedback
      }

      successText={
        question.successText
      }

      retryText={
        question.retryText
      }

      activityLabel={
        question.activityLabel
      }

      answersLabel={
        question.answersLabel
      }
    />
  );
}
