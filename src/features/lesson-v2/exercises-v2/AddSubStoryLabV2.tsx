import UnifiedExerciseKaraokeV2 from "../components/UnifiedExerciseKaraokeV2";
import UnifiedExerciseHeaderV2 from "../components/UnifiedExerciseHeaderV2";
import { Lesson26ExerciseFeedbackV2 } from "./HealthyFoodExerciseV2";
import { useEffect, useRef, useState } from "react";

export type AddSubOption = { id: string; label: string; emoji?: string };

export type AddSubStoryItem = {
  id: string;
  title: string;
  story: string;
  question: string;
  question_audio_key: string;
  scene_image: string;
  mode: "classify" | "operation" | "result";
  emoji: string;
  before: number;
  change: number;
  action: "add" | "sub";
  options: AddSubOption[];
  correct: string;
  success: string;
};

type Props = {
  items: AddSubStoryItem[];
  audio_base: string;
  missionTitle: string;
  missionIcon?: string;
  onComplete: () => void;
};

type Timing = { text: string; offset: number; duration: number };

const FEEDBACK_CORRECT = "/audio/teachers/taline/feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/teachers/taline/feedback/wrong.mp3";
const KARAOKE_LEAD_MS = 420;

const C = {
  bg: "#fff3c4",
  white: "#ffffff",
  gold: "#edb21f",
  goldSoft: "#fff8df",
  navy: "#17365f",
  brown: "#7b3f18",
  green: "#20a567",
  red: "#ef4444",
  border: "#e8c14a",
};

function cleanText(t: string) {
  return (t || "").replace(/[،,.!?؟؛:]/g, "").trim();
}

async function loadTimings(audioBase: string, key: string): Promise<Timing[]> {
  try {
    const r = await fetch(`${audioBase}/${key}.json`);
    if (!r.ok) return [];
    return await r.json();
  } catch {
    return [];
  }
}

function ObjectsBox({ count, emoji }: { count: number; emoji: string }) {
  return (
    <div
      style={{
        minHeight: 54,
        borderRadius: 17,
        border: `3px solid ${C.border}`,
        background: C.goldSoft,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 2,
        padding: 6,
      }}
    >
      {Array.from({ length: Math.max(0, count) }).map((_, i) => (
        <span key={i} style={{ fontSize: 19, lineHeight: 1 }}>
          {emoji}
        </span>
      ))}
    </div>
  );
}

export default function AddSubStoryLabV2({
  items,
  audio_base,
  missionTitle,
  missionIcon = "🧮",
  onComplete,
}: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [activeKey, setActiveKey] = useState("");
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());
  const [timings, setTimings] = useState<Record<string, Timing[]>>({});

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const feedbackRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const nextRef = useRef<number | null>(null);

  const item = items[index];

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    if (nextRef.current !== null) {
      window.clearTimeout(nextRef.current);
      nextRef.current = null;
    }
  };

  const stopQuestionAudioAndKaraoke = () => {
    clearTimers();
    setActiveKey("");
    setCurrentIdx(-1);
    setShown(new Set());

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } catch {}
  };

  const stopFeedbackAudio = () => {
    try {
      if (feedbackRef.current) {
        feedbackRef.current.pause();
        feedbackRef.current.currentTime = 0;
      }
    } catch {}
  };

  const playFeedback = (correct: boolean) => {
    stopQuestionAudioAndKaraoke();
    stopFeedbackAudio();

    try {
      const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
      feedbackRef.current = a;
      a.play().catch(() => {});
    } catch {}
  };

  const playQuestion = (customTimings?: Timing[]) => {
    stopQuestionAudioAndKaraoke();

    const list = customTimings ?? timings[item.question_audio_key] ?? [];
    setActiveKey(item.question_audio_key);

    try {
      const a = new Audio(`${audio_base}/${item.question_audio_key}.mp3`);
      audioRef.current = a;

      let endAt = 0;

      list.forEach((w, i) => {
        const start = Math.max(0, Number(w.offset || 0) - KARAOKE_LEAD_MS);
        const duration = Number(w.duration || 450);
        endAt = Math.max(endAt, start + duration);

        const t1 = window.setTimeout(() => {
          setCurrentIdx(i);
          setShown((prev) => {
            const next = new Set(prev);
            next.add(i);
            return next;
          });
        }, start);

        const t2 = window.setTimeout(() => {
          setCurrentIdx((v) => (v === i ? -1 : v));
        }, start + duration);

        timersRef.current.push(t1, t2);
      });

      const tend = window.setTimeout(() => {
        setCurrentIdx(-1);
        setActiveKey("");
      }, endAt + 250);

      timersRef.current.push(tend);
      a.play().catch(() => {});
    } catch {}
  };

  useEffect(() => {
    let alive = true;

    (async () => {
      const all: Record<string, Timing[]> = {};
      for (const it of items) {
        all[it.question_audio_key] = await loadTimings(audio_base, it.question_audio_key);
      }
      if (alive) setTimings(all);
    })();

    return () => {
      alive = false;
      stopQuestionAudioAndKaraoke();
      stopFeedbackAudio();
    };
  }, [audio_base, items]);

  useEffect(() => {
    setIndex(0);
    setSelected("");
    setFeedback("idle");
    stopQuestionAudioAndKaraoke();
  }, [missionTitle]);

  useEffect(() => {
    setSelected("");
    setFeedback("idle");

    const t = window.setTimeout(() => {
      playQuestion(timings[item.question_audio_key]);
    }, 350);

    return () => window.clearTimeout(t);
  }, [index, timings]);

  const choose = (id: string) => {
    if (feedback === "correct") return;

    setSelected(id);
    const ok = id === item.correct;

    if (ok) {
      setFeedback("correct");
      playFeedback(true);

      nextRef.current = window.setTimeout(() => {
        if (index + 1 >= items.length) onComplete();
        else setIndex((v) => v + 1);
      }, 1250);
    } else {
      setFeedback("wrong");
      playFeedback(false);

      nextRef.current = window.setTimeout(() => {
        setSelected("");
        setFeedback("idle");
        playQuestion(timings[item.question_audio_key]);
      }, 1250);
    }
  };

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

  const words = timings[item.question_audio_key] ?? [];
  const isPlaying = activeKey === item.question_audio_key;

  const karaokeWords = item.question
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        width: "100vw",
        height: "100dvh",
        overflowY: "auto",
        direction: "rtl",
        background: `linear-gradient(180deg, ${C.bg}, #fff8dc)`,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: C.navy,
        padding: "8px 10px 84px",
        boxSizing: "border-box",
      }}
    >
      <style>
        {`
          @keyframes feedbackPop {
            0% { transform: scale(.75); opacity: 0; }
            65% { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes addSubPop {
            0% { transform: scale(.72); opacity: 0; }
            65% { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes addSubFloat {
            0% { transform: translateY(8px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      <section style={{ width: "100%", maxWidth: 520, margin: "0 auto" }}>
        <UnifiedExerciseHeaderV2
          index={index}
          total={items.length}
          missionTitle={missionTitle}
          missionIcon={missionIcon}
          onReplay={() =>
            playQuestion(
              timings[item.question_audio_key],
            )
          }
          isPlaying={isPlaying}
        />

        <div
          style={{
            width: "100%",
            border: `4px solid ${C.gold}`,
            borderRadius: 24,
            padding: 5,
            background: C.white,
            overflow: "hidden",
            boxShadow: "0 8px 18px rgba(128,83,0,.14)",
            boxSizing: "border-box",
          }}
        >
          <img
            src={item.scene_image}
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: 205,
              objectFit: "cover",
              objectPosition: "center 28%",
              borderRadius: 18,
            }}
          />
        </div>

        <UnifiedExerciseKaraokeV2
          words={karaokeWords}
          activeIndex={
            isPlaying ? currentIdx : -1
          }
        />

        <div
          style={{
            width: "100%",
            marginTop: 10,
            display: "grid",
            gridTemplateColumns: "1fr 52px 1fr",
            alignItems: "center",
            gap: 8,
            boxSizing: "border-box",
          }}
        >
          <ObjectsBox count={item.before} emoji={item.emoji} />

          <div
            style={{
              height: 52,
              borderRadius: 17,
              background: item.action === "add" ? C.green : "#f97316",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 1000,
              boxShadow: "0 6px 12px rgba(0,0,0,.16)",
            }}
          >
            {item.action === "add" ? "+" : "−"}
          </div>

          <ObjectsBox count={item.change} emoji={item.emoji} />
        </div>

        <div
          style={{
            width: "100%",
            marginTop: 12,
            display: "grid",
            gridTemplateColumns: item.options.length === 2 ? "1fr 1fr" : "1fr 1fr 1fr",
            gap: 10,
            boxSizing: "border-box",
          }}
        >
          {item.options.map((op) => {
            const isSelected = selected === op.id;
            const good = isSelected && feedback === "correct";
            const bad = isSelected && feedback === "wrong";

            return (
              <button
                key={op.id}
                onClick={() => choose(op.id)}
                style={{
                  minHeight: 72,
                  border: "none",
                  borderRadius: 20,
                  background: good ? C.green : bad ? C.red : C.goldSoft,
                  color: good || bad ? "#fff" : C.brown,
                  boxShadow: "0 6px 13px rgba(128,83,0,.14)",
                  borderBottom: `5px solid ${good ? "#147a47" : bad ? "#991b1b" : "#d7a31d"}`,
                  fontSize: 20,
                  fontWeight: 1000,
                  padding: "7px 5px",
                }}
              >
                {op.emoji && <div style={{ fontSize: 22, lineHeight: 1 }}>{op.emoji}</div>}
                <div>{op.label}</div>
              </button>
            );
          })}
        </div>

        {feedback !== "idle" && (
          <div style={{
            position: "fixed",
            left: 18,
            right: 18,
            bottom: 98,
            zIndex: 999,
            background: "rgba(255,255,255,.96)",
            color: C.navy,
            border: `3px solid ${feedback === "correct" ? C.green : C.gold}`,
            borderRadius: 22,
            padding: "12px 16px",
            textAlign: "center",
            fontSize: 18,
            fontWeight: 900,
            boxShadow: "0 10px 26px rgba(0,0,0,.18)",
            animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>
            {coachText}
          </div>
        )}

        {feedback === "correct" && (
          <div style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            animation: "feedbackPop .45s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>
            ✨ 🎉 ⭐
          </div>
        )}

        {feedback !== "idle" && (
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: feedback === "correct" ? "#20A567" : "#EF4444",
            color: "white",
            padding: "20px 34px",
            borderRadius: 999,
            fontSize: 28,
            fontWeight: 900,
            boxShadow: "0 18px 38px rgba(0,0,0,.28)",
            border: "6px solid rgba(255,255,255,.9)",
            zIndex: 1000,
            animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>
            {feedbackText}
          </div>
        )}

      </section>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2147483646,
          pointerEvents: "none",
        }}
      >
        <Lesson26ExerciseFeedbackV2
          feedback={feedback}
        />
      </div>
</main>
  );
}
