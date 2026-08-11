import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  CSSProperties,
  ReactNode,
} from "react";

import UnifiedExerciseKaraokeV2 from "../../components/UnifiedExerciseKaraokeV2";

export type Lesson30FeedbackState =
  | "correct"
  | "wrong"
  | null;

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

type FrameProps = {
  title: string;
  icon: string;

  index: number;
  total: number;

  question: string;
  audioBase: string;
  audioKey: string;

  feedback: Lesson30FeedbackState;

  children: ReactNode;
};

const FEEDBACK_CORRECT =
  "/audio/teachers/taline/feedback/correct.mp3";

const FEEDBACK_RETRY =
  "/audio/teachers/taline/feedback/wrong.mp3";

export function playLesson30Feedback(
  correct: boolean,
) {
  const audio = new Audio(
    correct
      ? FEEDBACK_CORRECT
      : FEEDBACK_RETRY,
  );

  audio.play().catch(() => {});
}

function normalizeTimings(
  values: WordTiming[],
): WordTiming[] {
  return values.map((value) => ({
    text: String(value.text ?? ""),
    offset: Number(value.offset ?? 0),
    duration: Math.max(
      Number(value.duration ?? 0),
      180,
    ),
  }));
}

function useQuestionKaraoke(
  audioBase: string,
  audioKey: string,
) {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const autoplayRef =
    useRef<number | null>(null);

  const generationRef = useRef(0);

  const [activeIndex, setActiveIndex] =
    useState(-1);

  const [shownWordCount, setShownWordCount] =
    useState(0);

  const [playing, setPlaying] =
    useState(false);

  const stop = useCallback(() => {
    generationRef.current += 1;

    if (autoplayRef.current !== null) {
      window.clearTimeout(
        autoplayRef.current,
      );

      autoplayRef.current = null;
    }

    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;

      audio.ontimeupdate = null;
      audio.onplay = null;
      audio.onended = null;
      audio.onerror = null;
    }

    audioRef.current = null;

    setPlaying(false);
    setActiveIndex(-1);
    setShownWordCount(0);
  }, []);

  const loadTimings =
    useCallback(async () => {
      try {
        const response = await fetch(
          `${audioBase}/${audioKey}.json`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          return [];
        }

        const result =
          (await response.json()) as WordTiming[];

        return normalizeTimings(result);
      } catch {
        return [];
      }
    }, [
      audioBase,
      audioKey,
    ]);

  const play = useCallback(async () => {
    stop();

    const generation =
      generationRef.current;

    const timings =
      await loadTimings();

    if (
      generation !==
      generationRef.current
    ) {
      return;
    }

    const audio = new Audio(
      `${audioBase}/${audioKey}.mp3`,
    );

    audio.preload = "auto";
    audioRef.current = audio;

    audio.ontimeupdate = () => {
      const current =
        audio.currentTime * 1000;

      let currentIndex = -1;
      let revealedCount = 0;

      for (
        let index = 0;
        index < timings.length;
        index += 1
      ) {
        const timing = timings[index];

        if (current >= timing.offset) {
          revealedCount = index + 1;
        }

        if (
          current >= timing.offset &&
          current <
            timing.offset +
              Math.max(
                timing.duration,
                180,
              )
        ) {
          currentIndex = index;
          break;
        }
      }

      setActiveIndex(currentIndex);

      setShownWordCount(
        (previous) =>
          Math.max(
            previous,
            revealedCount,
          ),
      );
    };

    audio.onplay = () => {
      setPlaying(true);
    };

    audio.onended = () => {
      setPlaying(false);
      setActiveIndex(-1);
      setShownWordCount(timings.length);
    };

    audio.onerror = () => {
      setPlaying(false);
      setActiveIndex(-1);
    };

    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  }, [
    audioBase,
    audioKey,
    loadTimings,
    stop,
  ]);

  useEffect(() => {
    stop();

    autoplayRef.current =
      window.setTimeout(() => {
        void play();
      }, 350);

    return stop;
  }, [
    audioKey,
    play,
    stop,
  ]);

  return {
    activeIndex,
    shownWordCount,
    playing,
    play,
  };
}

export function Lesson30ExerciseFrame({
  title,
  icon,
  index,
  total,
  question,
  audioBase,
  audioKey,
  feedback,
  children,
}: FrameProps) {
  const {
    activeIndex,
    shownWordCount,
    playing,
    play,
  } = useQuestionKaraoke(
    audioBase,
    audioKey,
  );

  const previousFeedback =
    useRef<Lesson30FeedbackState>(
      null,
    );

  const karaokeWords = useMemo(
    () =>
      question
        .split(/\s+/)
        .map((word) => word.trim())
        .filter(Boolean),
    [question],
  );

  useEffect(() => {
    const previous =
      previousFeedback.current;

    previousFeedback.current =
      feedback;

    if (
      previous === "wrong" &&
      feedback === null
    ) {
      const timer =
        window.setTimeout(() => {
          void play();
        }, 80);

      return () =>
        window.clearTimeout(timer);
    }

    return undefined;
  }, [
    feedback,
    play,
  ]);

  const coachText =
    feedback === "correct"
      ? "رائع يا بطل! اخترت الإجابة الصحيحة 🎉"
      : feedback === "wrong"
        ? "محاولة جميلة! جرّب مرة أخرى ✨"
        : "اختر الإجابة الصحيحة";

  const feedbackText =
    feedback === "correct"
      ? "🌟 أَحْسَنْتَ!"
      : "حَاوِلْ مَرَّةً أُخْرَى ✨";

  return (
    <main style={styles.page} dir="rtl">
      <style>
        {`
          @keyframes lesson30FeedbackPop {
            0% {
              transform: scale(.75);
              opacity: 0;
            }

            65% {
              transform: scale(1.08);
              opacity: 1;
            }

            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>

      <section style={styles.container}>
        <header style={styles.header}>
          <div
            style={styles.counter}
            dir="ltr"
          >
            <span>{index + 1}</span>

            <span>/</span>

            <span>{total}</span>
          </div>

          <button
            type="button"
            onClick={() => void play()}
            aria-label="إعادة صوت السؤال"
            style={{
              ...styles.audioButton,

              transform: playing
                ? "scale(.94)"
                : "scale(1)",
            }}
          >
            🔊
          </button>
        </header>

        <div style={styles.progress}>
          {Array.from(
            { length: total },
            (_, progressIndex) => (
              <span
                key={progressIndex}
                style={{
                  ...styles.progressItem,

                  ...(progressIndex < index
                    ? styles.progressDone
                    : progressIndex === index
                      ? styles.progressCurrent
                      : styles.progressPending),
                }}
              />
            ),
          )}
        </div>

        <div style={styles.mission}>
          <span style={styles.missionIcon}>
            {icon}
          </span>

          <span>{title}</span>
        </div>

        <UnifiedExerciseKaraokeV2
          words={karaokeWords}
          activeIndex={
            playing
              ? activeIndex
              : -1
          }
          shownWordCount={
            shownWordCount
          }
        />

        {children}

        {feedback !== null && (
          <div style={styles.coachBanner}>
            {coachText}
          </div>
        )}

        {feedback === "correct" && (
          <div style={styles.celebration}>
            ✨ 🎉 ⭐
          </div>
        )}

        {feedback !== null && (
          <div
            style={{
              ...styles.feedbackPill,

              background:
                feedback === "correct"
                  ? "#20A567"
                  : "#EF4444",
            }}
          >
            {feedbackText}
          </div>
        )}
      </section>
    </main>
  );
}

export const lesson30Styles:
  Record<string, CSSProperties> = {
  optionButton: {
    width: "100%",
    minWidth: 0,
    minHeight: 82,

    boxSizing: "border-box",

    padding: "10px 7px",

    border: "4px solid #e8ad18",
    borderBottomWidth: 8,
    borderRadius: 23,

    background: "#fff",
    color: "#60351f",

    fontFamily: "inherit",

    fontSize:
      "clamp(19px,4.8vw,27px)",

    fontWeight: 900,

    cursor: "pointer",
    overflow: "hidden",

    boxShadow:
      "0 5px 10px rgba(100,70,0,.11)",
  },

  correctOption: {
    borderColor: "#20A567",
    background: "#20A567",
    color: "#fff",
  },

  wrongOption: {
    borderColor: "#991b1b",
    background: "#EF4444",
    color: "#fff",
  },
};

const styles:
  Record<string, CSSProperties> = {
  page: {
    position: "fixed",
    inset: 0,
    zIndex: 99999,

    width: "100vw",
    height: "100dvh",

    boxSizing: "border-box",
    overflowY: "auto",

    padding: "8px 10px 84px",

    background:
      "linear-gradient(180deg,#fff9e7,#fff8dc)",

    color: "#17365f",

    fontFamily:
      "system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
  },

  container: {
    width: "100%",
    maxWidth: 520,
    margin: "0 auto",
  },

  header: {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    direction: "ltr",
  },

  counter: {
    minWidth: 116,

    padding: "8px 17px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    gap: 9,

    border: "4px solid #edb21f",
    borderRadius: 26,

    background: "#fff",
    color: "#75411f",

    fontSize: 27,
    fontWeight: 1000,

    boxShadow:
      "0 5px 12px rgba(128,83,0,.14)",
  },

  audioButton: {
    width: 68,
    height: 68,

    border: "5px solid #fff",
    borderRadius: "50%",

    background: "#edb21f",

    fontSize: 29,
    cursor: "pointer",

    boxShadow:
      "0 6px 14px rgba(0,0,0,.17)",
  },

  progress: {
    margin: "12px 0 8px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    gap: 9,
  },

  progressItem: {
    width: 17,
    height: 17,

    display: "block",

    borderRadius: 99,
  },

  progressDone: {
    background: "#20A567",
  },

  progressCurrent: {
    width: 58,
    background: "#edb21f",
  },

  progressPending: {
    background: "#e5dbb7",
  },

  mission: {
    width: "fit-content",
    maxWidth: "94%",

    margin: "0 auto 10px",
    padding: "7px 20px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    border: "3px solid #edb21f",
    borderRadius: 999,

    background: "#fff",
    color: "#17365f",

    fontSize: 19,
    fontWeight: 1000,

    textAlign: "center",
  },

  missionIcon: {
    fontSize: 24,
  },

  coachBanner: {
    position: "fixed",

    left: 18,
    right: 18,
    bottom: 98,

    zIndex: 999,

    padding: "12px 16px",

    border: "3px solid #20A567",
    borderRadius: 22,

    background:
      "rgba(255,255,255,.96)",

    color: "#17365f",

    textAlign: "center",
    fontSize: 18,
    fontWeight: 900,

    boxShadow:
      "0 10px 26px rgba(0,0,0,.18)",

    animation:
      "lesson30FeedbackPop .35s cubic-bezier(.34,1.56,.64,1)",
  },

  celebration: {
    position: "fixed",
    inset: 0,

    zIndex: 998,
    pointerEvents: "none",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontSize: 44,

    animation:
      "lesson30FeedbackPop .45s cubic-bezier(.34,1.56,.64,1)",
  },

  feedbackPill: {
    position: "fixed",

    top: "50%",
    left: "50%",

    zIndex: 1000,

    transform:
      "translate(-50%,-50%)",

    padding: "20px 34px",

    border: "6px solid rgba(255,255,255,.9)",
    borderRadius: 999,

    color: "#fff",

    fontSize: 28,
    fontWeight: 900,

    whiteSpace: "nowrap",

    boxShadow:
      "0 18px 38px rgba(0,0,0,.28)",

    animation:
      "lesson30FeedbackPop .35s cubic-bezier(.34,1.56,.64,1)",
  },
};
