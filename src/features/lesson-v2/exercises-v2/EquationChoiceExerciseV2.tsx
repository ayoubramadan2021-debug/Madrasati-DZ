import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import UnifiedExerciseAnswersV2 from "../components/UnifiedExerciseAnswersV2";
import UnifiedExerciseScreenV2 from "../components/UnifiedExerciseScreenV2";
import {
  UnifiedTargetNumberV2,
} from "../components/UnifiedNumberQuantityV2";

export type EquationChoiceQuestion = {
  question: string;
  question_audio_key: string;

  target: number;

  options: string[];
  correct: string;
};

export type EquationChoiceExerciseV2Props = {
  items: EquationChoiceQuestion[];
  audio_base: string;
  background_image?: string;

  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

type FeedbackState =
  | "idle"
  | "correct"
  | "wrong";

const FEEDBACK_CORRECT =
  "/audio/v2_feedback/correct.mp3";

const FEEDBACK_RETRY =
  "/audio/v2_feedback/retry.mp3";

async function loadTimings(
  audioBase: string,
  key: string,
): Promise<WordTiming[] | null> {
  try {
    const response = await fetch(
      `${audioBase}/${key}.json`,
    );

    if (!response.ok) {
      return null;
    }

    return (
      await response.json()
    ) as WordTiming[];
  } catch {
    return null;
  }
}

function playFeedback(
  correct: boolean,
): void {
  try {
    const audio = new Audio(
      correct
        ? FEEDBACK_CORRECT
        : FEEDBACK_RETRY,
    );

    void audio.play();
  } catch {
    // يبقى التمرين فعالًا دون الصوت.
  }
}

export default function EquationChoiceExerciseV2({
  items,
  audio_base,
  background_image,
  onComplete,
}: EquationChoiceExerciseV2Props) {
  const [itemIndex, setItemIndex] =
    useState(0);

  const [timings, setTimings] =
    useState<
      Record<string, WordTiming[]>
    >({});

  const [selected, setSelected] =
    useState<string | null>(null);

  const [feedback, setFeedback] =
    useState<FeedbackState>("idle");

  const [attempts, setAttempts] =
    useState(0);

  const [locked, setLocked] =
    useState(false);

  const [activeKey, setActiveKey] =
    useState<string | null>(null);

  const [activeWordIndex, setActiveWordIndex] =
    useState(-1);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const wordTimersRef =
    useRef<number[]>([]);

  const transitionTimerRef =
    useRef<number | null>(null);

  const item = items[itemIndex];

  const stopQuestionAudio =
    useCallback(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }

      wordTimersRef.current.forEach(
        (timer) =>
          window.clearTimeout(timer),
      );

      wordTimersRef.current = [];

      setActiveKey(null);
      setActiveWordIndex(-1);
      setIsPlaying(false);
    }, []);

  const clearTransitionTimer =
    useCallback(() => {
      if (
        transitionTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          transitionTimerRef.current,
        );

        transitionTimerRef.current = null;
      }
    }, []);

  const playQuestion =
    useCallback(
      async (
        key: string,
        words: WordTiming[],
      ) => {
        stopQuestionAudio();

        setActiveKey(key);
        setActiveWordIndex(-1);
        setIsPlaying(true);

        const audio = new Audio(
          `${audio_base}/${key}.mp3`,
        );

        audioRef.current = audio;

        audio.addEventListener(
          "ended",
          () => {
            setActiveWordIndex(-1);
            setActiveKey(null);
            setIsPlaying(false);
          },
          { once: true },
        );

        try {
          await audio.play();
        } catch {
          setActiveKey(null);
          setIsPlaying(false);
          return;
        }

        words.forEach(
          (word, index) => {
            const startTimer =
              window.setTimeout(() => {
                setActiveWordIndex(index);
              }, word.offset);

            const endTimer =
              window.setTimeout(() => {
                setActiveWordIndex(
                  (current) =>
                    current === index
                      ? -1
                      : current,
                );
              }, word.offset + word.duration);

            wordTimersRef.current.push(
              startTimer,
              endTimer,
            );
          },
        );
      },
      [
        audio_base,
        stopQuestionAudio,
      ],
    );

  useEffect(() => {
    let cancelled = false;

    void Promise.all(
      items.map(async (currentItem) => ({
        key:
          currentItem.question_audio_key,

        words:
          await loadTimings(
            audio_base,
            currentItem.question_audio_key,
          ),
      })),
    ).then((results) => {
      if (cancelled) {
        return;
      }

      const loaded:
        Record<string, WordTiming[]> = {};

      results.forEach(
        ({ key, words }) => {
          if (words) {
            loaded[key] = words;
          }
        },
      );

      setTimings(loaded);
    });

    return () => {
      cancelled = true;
    };
  }, [
    audio_base,
    items,
  ]);

  const currentTimings =
    item
      ? timings[
          item.question_audio_key
        ]
      : undefined;

  useEffect(() => {
    clearTransitionTimer();
    stopQuestionAudio();

    setSelected(null);
    setFeedback("idle");
    setAttempts(0);
    setLocked(false);

    if (
      !item ||
      !currentTimings
    ) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        void playQuestion(
          item.question_audio_key,
          currentTimings,
        );
      }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    clearTransitionTimer,
    currentTimings,
    item,
    itemIndex,
    playQuestion,
    stopQuestionAudio,
  ]);

  useEffect(
    () => () => {
      clearTransitionTimer();
      stopQuestionAudio();
    },
    [
      clearTransitionTimer,
      stopQuestionAudio,
    ],
  );

  if (!item) {
    return null;
  }

  const questionWords =
    currentTimings?.map(
      (word) => word.text,
    ) ??
    item.question
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const replayQuestion = () => {
    if (!currentTimings) {
      return;
    }

    void playQuestion(
      item.question_audio_key,
      currentTimings,
    );
  };

  const moveForward = () => {
    if (
      itemIndex <
      items.length - 1
    ) {
      setItemIndex(
        (current) => current + 1,
      );

      return;
    }

    onComplete?.(
      items.length,
      items.length,
    );
  };

  const handleSelect = (
    option: string,
  ) => {
    if (
      locked ||
      feedback !== "idle"
    ) {
      return;
    }

    stopQuestionAudio();
    setSelected(option);

    const correct =
      option === item.correct;

    const nextAttempts =
      attempts + 1;

    setAttempts(nextAttempts);

    if (correct) {
      setFeedback("correct");
      setLocked(true);

      playFeedback(true);

      transitionTimerRef.current =
        window.setTimeout(() => {
          setFeedback("idle");
          moveForward();
        }, 1800);

      return;
    }

    setFeedback("wrong");
    playFeedback(false);

    if (nextAttempts >= 3) {
      setLocked(true);

      transitionTimerRef.current =
        window.setTimeout(() => {
          setFeedback("idle");
          moveForward();
        }, 2200);

      return;
    }

    transitionTimerRef.current =
      window.setTimeout(() => {
        setFeedback("idle");
        setSelected(null);
      }, 1500);
  };

  return (
    <UnifiedExerciseScreenV2
      index={itemIndex}
      total={items.length}
      missionTitle="أَخْتَارُ التَّرْكِيبَ الْمُطَابِقَ"
      questionWords={questionWords}
      activeWordIndex={
        activeKey ===
        item.question_audio_key
          ? activeWordIndex
          : -1
      }
      onReplay={replayQuestion}
      isPlaying={
        activeKey ===
          item.question_audio_key &&
        isPlaying
      }
      backgroundImage={
        background_image
      }
      activity={
        <UnifiedTargetNumberV2
          number={item.target}
          active={
            activeKey ===
            item.question_audio_key
          }
        />
      }
      answers={
        <UnifiedExerciseAnswersV2
          options={item.options.map(
            (option) => ({
              id: option,
              content: option,
              ariaLabel:
                `اختيار العملية ${option}`,
            }),
          )}
          selectedId={selected}
          correctId={item.correct}
          showCorrect={
            locked &&
            feedback === "wrong"
          }
          feedback={feedback}
          onSelect={handleSelect}
          variant="text"
          columns={1}
          disabled={locked}
          direction="ltr"
        />
      }
      feedback={feedback}
      successText="🌟 أَحْسَنْتَ!"
      retryText="حَاوِلْ مَرَّةً أُخْرَى ✨"
      activityLabel="العدد المطلوب"
      answersLabel="العمليات المقترحة"
    />
  );
}
