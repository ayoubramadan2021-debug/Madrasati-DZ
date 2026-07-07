import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import LessonCompleteV2 from "../components/LessonCompleteV2";

export type FoodOption = {
  id: string;
  label: string;
  emoji: string;
  tone?: "healthy" | "sugar" | "water" | "protein" | "grain" | "dairy";
};

export type HealthyFoodItem = {
  title: string;
  mission: string;
  question: string;
  question_audio_key: string;
  scene_image?: string;
  mode: "single" | "multi";
  correct: string | string[];
  options: FoodOption[];
  hint?: string;
};

type Props = {
  items: HealthyFoodItem[];
  audio_base: string;
  missionTitle: string;
  missionIcon: string;
  onComplete: () => void;
};

const COLORS = {
  bg1: "#fff7d9",
  bg2: "#ffe9ac",
  gold: "#edae1c",
  brown: "#88461f",
  navy: "#18365f",
  green: "#20a567",
  red: "#ef4444",
  white: "#ffffff",
};

const FEEDBACK_AUDIO = {
  correct: "/audio/teachers/taline/feedback/correct.mp3",
  wrong: "/audio/teachers/taline/feedback/wrong.mp3",
};

function cleanText(t: string) {
  return (t || "").replace(/[،,.!?؟؛:]/g, "").trim();
}

export default function HealthyFoodExerciseV2({
  items,
  audio_base,
  missionTitle,
  missionIcon,
  onComplete,
}: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [activeWord, setActiveWord] = useState("");
  const [timings, setTimings] = useState<Array<{ text: string; offset: number; duration: number }>>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const feedbackAudioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const nextTimerRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  const item = items[index];
  const correctList = Array.isArray(item.correct) ? item.correct : [item.correct];
  const isMulti = item.mode === "multi";

  const progress = useMemo(() => `${index + 1} / ${items.length}`, [index, items.length]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];

    if (nextTimerRef.current !== null) {
      window.clearTimeout(nextTimerRef.current);
      nextTimerRef.current = null;
    }
  };

  const stopQuestionAudioAndKaraoke = () => {
    clearTimers();
    setActiveWord("");

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } catch {
      // ignore
    }
  };

  const stopFeedbackAudio = () => {
    try {
      if (feedbackAudioRef.current) {
        feedbackAudioRef.current.pause();
        feedbackAudioRef.current.currentTime = 0;
      }
    } catch {
      // ignore
    }
  };

  const playFeedback = (kind: "correct" | "wrong") => {
    stopQuestionAudioAndKaraoke();
    stopFeedbackAudio();

    try {
      const a = new Audio(FEEDBACK_AUDIO[kind]);
      feedbackAudioRef.current = a;
      a.play().catch(() => {});
    } catch {
      // ignore
    }
  };

  const playQuestion = (
    customTimings?: Array<{ text: string; offset: number; duration: number }>
  ) => {
    stopQuestionAudioAndKaraoke();

    const list = customTimings ?? timings;

    try {
      const a = new Audio(`${audio_base}/${item.question_audio_key}.mp3`);
      audioRef.current = a;

      list.forEach((w) => {
        const start = window.setTimeout(() => {
          if (!mountedRef.current) return;
          setActiveWord(cleanText(w.text));
        }, Math.max(0, Number(w.offset || 0)));

        const end = window.setTimeout(() => {
          if (!mountedRef.current) return;
          setActiveWord("");
        }, Math.max(0, Number(w.offset || 0) + Number(w.duration || 600)));

        timersRef.current.push(start, end);
      });

      a.play().catch(() => {});
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      stopQuestionAudioAndKaraoke();
      stopFeedbackAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stopQuestionAudioAndKaraoke();
    stopFeedbackAudio();

    setSelected([]);
    setFeedback("idle");
    setActiveWord("");

    const jsonUrl = `${audio_base}/${item.question_audio_key}.json`;
    let cancelled = false;

    fetch(jsonUrl)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (cancelled || !mountedRef.current) return;

        const list = Array.isArray(data) ? data : [];
        setTimings(list);

        window.setTimeout(() => {
          if (!cancelled && mountedRef.current) {
            playQuestion(list);
          }
        }, 260);
      })
      .catch(() => {
        if (cancelled || !mountedRef.current) return;

        setTimings([]);
        window.setTimeout(() => {
          if (!cancelled && mountedRef.current) {
            playQuestion([]);
          }
        }, 260);
      });

    return () => {
      cancelled = true;
      stopQuestionAudioAndKaraoke();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, audio_base, item.question_audio_key]);

  const goNext = () => {
    stopQuestionAudioAndKaraoke();

    if (index + 1 >= items.length) {
      onComplete();
      return;
    }

    setIndex((v) => v + 1);
  };

  const handleSingle = (id: string) => {
    if (feedback !== "idle") return;

    const ok = correctList.includes(id);

    setSelected([id]);
    setFeedback(ok ? "correct" : "wrong");
    playFeedback(ok ? "correct" : "wrong");

    nextTimerRef.current = window.setTimeout(() => {
      if (!mountedRef.current) return;

      if (ok) {
        goNext();
      } else {
        setSelected([]);
        setFeedback("idle");
      }
    }, ok ? 1050 : 1250);
  };

  const handleMultiToggle = (id: string) => {
    if (feedback !== "idle") return;

    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= correctList.length) return prev;
      return [...prev, id];
    });
  };

  const checkMulti = () => {
    if (feedback !== "idle") return;

    const a = [...selected].sort().join("|");
    const b = [...correctList].sort().join("|");
    const ok = a === b;

    setFeedback(ok ? "correct" : "wrong");
    playFeedback(ok ? "correct" : "wrong");

    nextTimerRef.current = window.setTimeout(() => {
      if (!mountedRef.current) return;

      if (ok) {
        goNext();
      } else {
        setSelected([]);
        setFeedback("idle");
      }
    }, ok ? 1050 : 1250);
  };

  const wordNodes = item.question.split(" ").map((w, i) => {
    const clean = cleanText(w);
    const on = activeWord && clean === activeWord;

    return (
      <span key={`${w}-${i}`} style={on ? styles.wordActive : styles.word}>
        {w}{" "}
      </span>
    );
  });

  return (
    <section dir="rtl" style={styles.page}>
      <div style={styles.topBar}>
        <button type="button" onClick={() => playQuestion()} style={styles.soundBtn}>
          🔊
        </button>

        <div style={styles.counter}>{progress}</div>
      </div>

      <div style={styles.progressDots}>
        {items.map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.dot,
              width: i === index ? 42 : 14,
              background: i === index ? COLORS.gold : i < index ? COLORS.green : "#e7d5a7",
            }}
          />
        ))}
      </div>

      <div style={styles.missionPill}>
        <strong>{missionTitle}</strong>
        <span>{missionIcon}</span>
      </div>

      {item.scene_image && (
        <div style={styles.imageWrap}>
          <img src={item.scene_image} alt="" style={styles.sceneImg} />
        </div>
      )}

      <div style={styles.questionBox}>
        <div style={styles.questionText}>{wordNodes}</div>
      </div>

      <div style={styles.optionsGrid}>
        {item.options.map((op) => {
          const isSelected = selected.includes(op.id);

          return (
            <button
              key={op.id}
              type="button"
              onClick={() => (isMulti ? handleMultiToggle(op.id) : handleSingle(op.id))}
              style={{
                ...styles.optionBtn,
                borderColor: isSelected ? COLORS.green : "#ead39b",
                boxShadow: isSelected
                  ? "0 8px 18px rgba(32,165,103,.22)"
                  : "0 6px 14px rgba(0,0,0,.08)",
              }}
            >
              <span style={styles.optionLabel}>{op.label}</span>
              <span style={styles.optionEmoji}>{op.emoji}</span>
            </button>
          );
        })}
      </div>

      {isMulti && (
        <button
          type="button"
          onClick={checkMulti}
          disabled={selected.length !== correctList.length || feedback !== "idle"}
          style={{
            ...styles.checkBtn,
            opacity: selected.length === correctList.length && feedback === "idle" ? 1 : 0.55,
          }}
        >
          تَحَقَّقْ
        </button>
      )}

      {feedback !== "idle" && (
        <>
          <div
            style={{
              ...styles.bigFeedback,
              background: feedback === "correct" ? COLORS.green : COLORS.red,
            }}
          >
            {feedback === "correct" ? "أَحْسَنْتَ" : "حَاوِلْ مَرَّةً أُخْرَى"}
          </div>

          <div
            style={{
              ...styles.toast,
              borderColor: feedback === "correct" ? COLORS.green : COLORS.red,
            }}
          >
            {feedback === "correct"
              ? "رائع يا بطل اخترت الإجابة الصحيحة 🎉"
              : "اقتربت حَاوِلْ مَرَّةً أُخْرَى 👏"}
          </div>
        </>
      )}
    </section>
  );
}

export function HealthyFoodComplete({
  lessonKey,
  onReplay,
}: {
  lessonKey: string;
  onReplay: () => void;
}) {
  return (
    <LessonCompleteV2
      lessonKey={lessonKey}
      message="أَحْسَنْتَ يَا بَطَل أَكْمَلْتَ تَمَارِينَ الدَّرْسِ"
      onReplay={onReplay}
    />
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100dvh",
    background: `linear-gradient(180deg, ${COLORS.bg1}, ${COLORS.bg2})`,
    padding: "8px 10px 84px",
    fontFamily: "inherit",
    color: COLORS.navy,
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  counter: {
    minWidth: 102,
    height: 56,
    borderRadius: 24,
    border: `5px solid ${COLORS.gold}`,
    background: COLORS.white,
    color: COLORS.brown,
    display: "grid",
    placeItems: "center",
    fontSize: 25,
    fontWeight: 1000,
    boxShadow: "0 6px 16px rgba(0,0,0,.08)",
    direction: "ltr",
  },
  soundBtn: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    border: "6px solid #fff",
    background: COLORS.gold,
    color: "#fff",
    fontSize: 28,
    boxShadow: "0 10px 20px rgba(0,0,0,.16)",
  },
  progressDots: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    direction: "ltr",
  },
  dot: {
    height: 14,
    borderRadius: 99,
    display: "inline-block",
    transition: "all .25s ease",
  },
  missionPill: {
    width: "fit-content",
    maxWidth: "92%",
    margin: "0 auto 8px",
    background: COLORS.white,
    border: `3px solid ${COLORS.gold}`,
    borderRadius: 999,
    padding: "7px 16px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: COLORS.navy,
    fontSize: 17,
    boxShadow: "0 5px 12px rgba(0,0,0,.08)",
  },
  imageWrap: {
    width: "100%",
    maxWidth: 520,
    margin: "0 auto 8px",
    borderRadius: 22,
    overflow: "hidden",
    border: `4px solid ${COLORS.gold}`,
    background: "#fff9ea",
    boxShadow: "0 8px 18px rgba(0,0,0,.10)",
    aspectRatio: "4 / 3",
    maxHeight: 330,
    padding: 6,
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
  },
  sceneImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top center",
    display: "block",
    borderRadius: 14,
  },
  questionBox: {
    maxWidth: 620,
    margin: "0 auto 10px",
    background: "rgba(255,255,255,.96)",
    border: `4px solid ${COLORS.gold}`,
    borderRadius: 22,
    padding: "12px 12px",
    textAlign: "center",
    boxShadow: "0 6px 14px rgba(0,0,0,.07)",
  },
  questionText: {
    fontSize: "clamp(20px,5.4vw,32px)",
    lineHeight: 1.55,
    fontWeight: 1000,
    color: COLORS.navy,
  },
  word: {
    display: "inline-block",
    padding: "0 2px",
    borderRadius: 8,
  },
  wordActive: {
    display: "inline-block",
    padding: "0 4px",
    borderRadius: 10,
    background: "#fff0b8",
    color: COLORS.brown,
    transform: "translateY(-1px)",
  },
  optionsGrid: {
    maxWidth: 620,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 8,
  },
  optionBtn: {
    minHeight: 72,
    borderRadius: 20,
    border: "4px solid #ead39b",
    background: "rgba(255,255,255,.98)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "8px 6px",
    color: COLORS.navy,
    transition: "all .18s ease",
  },
  optionEmoji: {
    fontSize: "clamp(22px,6vw,32px)",
    lineHeight: 1,
  },
  optionLabel: {
    fontSize: "clamp(15px,4.4vw,22px)",
    fontWeight: 1000,
    lineHeight: 1.25,
  },
  checkBtn: {
    maxWidth: 360,
    width: "82%",
    height: 58,
    display: "block",
    margin: "14px auto 0",
    border: "0",
    borderRadius: 999,
    background: COLORS.green,
    color: "#fff",
    fontSize: 24,
    fontWeight: 1000,
    boxShadow: "0 10px 20px rgba(0,0,0,.16)",
  },
  bigFeedback: {
    position: "fixed",
    left: "50%",
    top: "44%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    minWidth: 250,
    minHeight: 105,
    borderRadius: 999,
    border: "8px solid rgba(255,255,255,.92)",
    boxShadow: "0 18px 36px rgba(0,0,0,.22)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "clamp(28px,7vw,44px)",
    fontWeight: 1000,
    lineHeight: 1.2,
    padding: "0 18px",
  },
  toast: {
    position: "fixed",
    left: 20,
    right: 20,
    bottom: 106,
    zIndex: 999,
    background: "rgba(255,255,255,.96)",
    border: "4px solid",
    borderRadius: 22,
    padding: "11px 14px",
    textAlign: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,.16)",
    color: COLORS.navy,
    fontSize: "clamp(17px,4.7vw,23px)",
    fontWeight: 1000,
  },
};
