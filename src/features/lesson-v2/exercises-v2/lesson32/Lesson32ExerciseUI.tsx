import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { isKeyword } from "../../keywords";

import type {
  CSSProperties,
  ReactNode,
} from "react";


export type Lesson32FeedbackState =
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

  feedback: Lesson32FeedbackState;

  children: ReactNode;
};

const FEEDBACK_CORRECT =
  "/audio/v2_feedback/correct.mp3";

const FEEDBACK_RETRY =
  "/audio/v2_feedback/retry.mp3";

export function playLesson32Feedback(
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
  question: string,
) {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const timersRef = useRef<number[]>([]);

  const autoplayRef =
    useRef<number | null>(null);

  const [words, setWords] =
    useState<WordTiming[]>([]);

  const [currentIdx, setCurrentIdx] =
    useState(-1);

  const [shown, setShown] =
    useState<Set<number>>(new Set());

  const [playing, setPlaying] =
    useState(false);

  const stop = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearTimeout(
        autoplayRef.current,
      );

      autoplayRef.current = null;
    }

    timersRef.current.forEach(
      window.clearTimeout,
    );

    timersRef.current = [];

    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setPlaying(false);
    setCurrentIdx(-1);
  }, []);

  const loadTimings =
    useCallback(async () => {
      try {
        const response = await fetch(
          `${audioBase}/${audioKey}.json`,
          { cache: "no-store" },
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
    }, [audioBase, audioKey]);

  const revealAll = useCallback(
    (values: WordTiming[]) => {
      setShown(
        new Set(
          values.map((_, index) => index),
        ),
      );
    },
    [],
  );

  const play = useCallback(async () => {
    stop();
    setShown(new Set());
    setCurrentIdx(-1);

    let timings = await loadTimings();

    if (timings.length === 0) {
      timings = question
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => ({
          text: word,
          offset: 0,
          duration: 180,
        }));
    }

    setWords(timings);

    const audio = new Audio(
      `${audioBase}/${audioKey}.mp3`,
    );

    audioRef.current = audio;

    audio.addEventListener("ended", () => {
      setPlaying(false);
      setCurrentIdx(-1);
      revealAll(timings);
    });

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      revealAll(timings);
      setPlaying(false);
      return;
    }

    timings.forEach((word, index) => {
      const showTimer = window.setTimeout(() => {
        setShown(
          (previous) =>
            new Set(previous).add(index),
        );

        setCurrentIdx(index);
      }, word.offset);

      const endTimer = window.setTimeout(() => {
        setCurrentIdx(
          (current) =>
            current === index ? -1 : current,
        );
      }, word.offset + word.duration);

      timersRef.current.push(
        showTimer,
        endTimer,
      );
    });
  }, [
    audioBase,
    audioKey,
    loadTimings,
    question,
    revealAll,
    stop,
  ]);

  useEffect(() => {
    stop();

    autoplayRef.current =
      window.setTimeout(() => {
        void play();
      }, 350);

    return stop;
  }, [audioKey, play, stop]);

  return {
    words,
    currentIdx,
    shown,
    playing,
    play,
  };
}

export function Lesson32ExerciseFrame({
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
    words,
    currentIdx,
    shown,
    playing,
    play,
  } = useQuestionKaraoke(
    audioBase,
    audioKey,
    question,
  );

  const previousFeedback =
    useRef<Lesson32FeedbackState>(
      null,
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
      ? "رائع يا بطل! إجابة صحيحة 🎉"
      : feedback === "wrong"
        ? "محاولة جميلة! جرّب مرة أخرى ✨"
        : "";

  const feedbackText =
    feedback === "correct"
      ? "🌟 أَحْسَنْتَ!"
      : "حَاوِلْ مَرَّةً أُخْرَى ✨";

  return (
    <main style={styles.page} dir="rtl">
      <style>{`
        @keyframes feedbackPop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          60% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.15);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>

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

        <div
          onClick={() => void play()}
          role="button"
          tabIndex={0}
          aria-label="إعادة صوت السؤال"
          style={{
            background: "rgba(255,255,255,0.95)",
            border: "2px solid #E8A020",
            borderRadius: 18,
            padding: "12px 16px",
            maxWidth: 400,
            margin: "0 auto 10px",
            minHeight: 50,
            fontSize: 16,
            lineHeight: 1.6,
            textAlign: "center",
            boxShadow:
              "0 6px 20px rgba(0,0,0,.15)",
            cursor: "pointer",
          }}
        >
          {words.length > 0 ? (
            words.map((word, wordIndex) => {
              const isShown =
                shown.has(wordIndex);

              const isCurrent =
                playing &&
                currentIdx === wordIndex;

              return (
                <span
                  key={`${audioKey}-${wordIndex}`}
                  style={{
                    display: "inline-block",
                    opacity: isShown ? 1 : 0,
                    transform: isCurrent
                      ? "translateY(-3px) scale(1.1)"
                      : "translateY(0)",
                    color: isCurrent
                      ? "#E8A020"
                      : isKeyword(word.text)
                        ? "#16a34a"
                        : "#0F2447",
                    fontWeight: isCurrent
                      ? 900
                      : 700,
                    transition: "all .25s ease",
                    margin: "0 2px",
                  }}
                >
                  {word.text}{" "}
                </span>
              );
            })
          ) : (
            <span style={{ opacity: 0.5 }}>
              ...
            </span>
          )}
        </div>

        {children}
      </section>

      {feedback !== null && (
        <div
          style={{
            position: "fixed",
            left: 18,
            right: 18,
            bottom: 98,
            zIndex: 999,
            background: "rgba(255,255,255,.96)",
            color: "#0F2447",
            border: `3px solid ${
              feedback === "correct"
                ? "#1FA463"
                : "#E8A020"
            }`,
            borderRadius: 22,
            padding: "12px 16px",
            textAlign: "center",
            fontSize: 18,
            fontWeight: 900,
            boxShadow:
              "0 10px 26px rgba(0,0,0,.18)",
            animation:
              "feedbackPop .35s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {coachText}
        </div>
      )}

      {feedback === "correct" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            animation:
              "feedbackPop .45s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          ✨ 🎉 ⭐
        </div>
      )}

      {feedback !== null && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              feedback === "correct"
                ? "#20A567"
                : "#EF4444",
            color: "white",
            padding: "20px 34px",
            borderRadius: 999,
            fontSize: 28,
            fontWeight: 900,
            boxShadow:
              "0 18px 38px rgba(0,0,0,.28)",
            border:
              "6px solid rgba(255,255,255,.9)",
            zIndex: 1000,
            animation:
              "feedbackPop 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            pointerEvents: "none",
            textAlign: "center",
            fontFamily: "Tajawal, sans-serif",
            minWidth: 245,
          }}
        >
          {feedbackText}
        </div>
      )}
    </main>
  );
}

export const lesson32Styles:
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
      "lesson32FeedbackPop .35s cubic-bezier(.34,1.56,.64,1)",
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
      "lesson32FeedbackPop .45s cubic-bezier(.34,1.56,.64,1)",
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
      "lesson32FeedbackPop .35s cubic-bezier(.34,1.56,.64,1)",
  },
};
