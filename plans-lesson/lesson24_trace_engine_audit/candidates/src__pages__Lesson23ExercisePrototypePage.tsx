import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type ToolId = "short" | "medium" | "long";

type Tool = {
  id: ToolId;
  color: string;
  length: number;
};

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

const AUDIO_BASE = "/audio/teachers/khalil/lesson_23_exercises";
const AUDIO_KEY = "prototype_l23_ex1_q1";

const QUESTION_WORDS = ["رَتِّبْ", "مِنَ", "الأَقْصَرِ", "إِلَى", "الأَطْوَلِ"];

const FALLBACK_TIMINGS: WordTiming[] = [
  { text: "رَتِّبْ", offset: 200, duration: 650 },
  { text: "مِنَ", offset: 900, duration: 430 },
  { text: "الأَقْصَرِ", offset: 1400, duration: 760 },
  { text: "إِلَى", offset: 2250, duration: 520 },
  { text: "الأَطْوَلِ", offset: 2850, duration: 800 },
];

const TOOLS: Tool[] = [
  { id: "long", color: "#22c55e", length: 245 },
  { id: "short", color: "#ef4444", length: 115 },
  { id: "medium", color: "#facc15", length: 180 },
];

const ORDER: ToolId[] = ["short", "medium", "long"];

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

function playAudio(src: string) {
  try {
    const a = new Audio(src);
    a.play().catch(() => {});
  } catch {}
}

function normalizeTimings(data: unknown): WordTiming[] {
  if (!Array.isArray(data)) return FALLBACK_TIMINGS;

  const clean = data
    .map((x: any) => ({
      text: String(x?.text || ""),
      offset: Number(x?.offset || 0),
      duration: Math.max(380, Number(x?.duration || 0)),
    }))
    .filter((x) => Number.isFinite(x.offset) && Number.isFinite(x.duration));

  if (clean.length !== QUESTION_WORDS.length) return FALLBACK_TIMINGS;
  return clean;
}

export default function Lesson23ExercisePrototypePage() {
  const [chosen, setChosen] = useState<ToolId[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [timings, setTimings] = useState<WordTiming[]>(FALLBACK_TIMINGS);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const questionAudioRef = useRef<HTMLAudioElement | null>(null);

  const remaining = TOOLS.filter((t) => !chosen.includes(t.id));

  function stopQuestion() {
    if (questionAudioRef.current) {
      questionAudioRef.current.pause();
      questionAudioRef.current.currentTime = 0;
      questionAudioRef.current = null;
    }
    setActiveIndex(-1);
  }

  function findActiveIndex(ms: number) {
    for (let i = 0; i < timings.length; i += 1) {
      const t = timings[i];
      if (ms >= t.offset && ms <= t.offset + t.duration + 140) return i;
    }
    return -1;
  }

  function playQuestion() {
    stopQuestion();

    const audio = new Audio(`${AUDIO_BASE}/${AUDIO_KEY}.mp3`);
    questionAudioRef.current = audio;

    audio.ontimeupdate = () => {
      const ms = audio.currentTime * 1000;
      setActiveIndex(findActiveIndex(ms));
    };

    audio.onended = () => setActiveIndex(-1);

    audio.play().catch(() => {
      let i = 0;
      setActiveIndex(0);
      const timer = window.setInterval(() => {
        i += 1;
        if (i >= QUESTION_WORDS.length) {
          window.clearInterval(timer);
          setActiveIndex(-1);
        } else {
          setActiveIndex(i);
        }
      }, 650);
    });
  }

  useEffect(() => {
    fetch(`${AUDIO_BASE}/${AUDIO_KEY}.json`)
      .then((r) => (r.ok ? r.json() : FALLBACK_TIMINGS))
      .then((data) => setTimings(normalizeTimings(data)))
      .catch(() => setTimings(FALLBACK_TIMINGS));

    const t = window.setTimeout(playQuestion, 350);

    return () => {
      window.clearTimeout(t);
      stopQuestion();
    };
  }, []);

  function showWrong() {
    stopQuestion();
    setFeedback("wrong");
    playAudio(FEEDBACK_RETRY);

    window.setTimeout(() => {
      setChosen([]);
      setFeedback("idle");
      playQuestion();
    }, 1100);
  }

  function choose(id: ToolId) {
    if (feedback !== "idle") return;

    const expected = ORDER[chosen.length];

    if (id !== expected) {
      showWrong();
      return;
    }

    const next = [...chosen, id];
    setChosen(next);

    if (next.length === ORDER.length) {
      stopQuestion();
      setFeedback("correct");
      playAudio(FEEDBACK_CORRECT);

      window.setTimeout(() => {
        setChosen([]);
        setFeedback("idle");
        playQuestion();
      }, 1250);
    }
  }

  function undo() {
    if (feedback !== "idle") return;
    setChosen((v) => v.slice(0, -1));
  }

  return (
    <main dir="rtl" style={styles.page}>
      <header style={styles.header}>
        <div style={styles.counter}>1 / 5</div>
        <button type="button" onClick={playQuestion} style={styles.sound}>🔊</button>
      </header>

      <section style={styles.questionBox}>
        <div style={styles.questionLine}>
          {QUESTION_WORDS.map((word, i) => (
            <span
              key={`${word}-${i}`}
              style={{
                ...styles.questionWord,
                opacity: activeIndex === -1 || activeIndex === i ? 1 : 0.45,
                transform: activeIndex === i ? "scale(1.08)" : "scale(1)",
                borderBottom: activeIndex === i ? "4px solid #efb21a" : "4px solid transparent",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </section>

      <section style={styles.exerciseBox}>
        <div style={styles.instruction}>اِلمِسِ القَلَمَ الصَّحِيحَ بِالتَّرْتِيبِ</div>

        <div style={styles.tools}>
          {remaining.map((tool) => (
            <button key={tool.id} type="button" style={styles.toolBtn} onClick={() => choose(tool.id)}>
              <Pencil color={tool.color} length={tool.length} />
            </button>
          ))}
        </div>

        <div style={styles.slots}>
          {ORDER.map((_, i) => {
            const id = chosen[i];
            const tool = id ? TOOLS.find((x) => x.id === id) : null;

            return (
              <div key={i} style={styles.slot}>
                {tool ? (
                  <Pencil color={tool.color} length={Math.min(tool.length, 150)} />
                ) : (
                  <span style={styles.slotNum}>{i + 1}</span>
                )}
              </div>
            );
          })}
        </div>

        <button type="button" onClick={undo} style={styles.undo}>تَرَاجُع</button>
      </section>

      {feedback !== "idle" && (
        <div style={styles.feedbackWrap}>
          <div
            style={{
              ...styles.feedbackBadge,
              background: feedback === "correct" ? "#20A567" : "#EF4444",
            }}
          >
            <span style={styles.feedbackText}>
              {feedback === "correct" ? "أَحْسَنْتَ" : "حَاوِلْ مَرَّةً أُخْرَى"}
            </span>
          </div>
        </div>
      )}
    </main>
  );
}

function Pencil({ color, length }: { color: string; length: number }) {
  const total = length + 62;
  const gradientId = `body-${color.replace("#", "")}`;

  return (
    <svg
      width={total}
      height="42"
      viewBox={`0 0 ${total} 42`}
      style={{ display: "block", maxWidth: "100%" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.78" />
        </linearGradient>
      </defs>

      <rect x="4" y="11" width="18" height="20" rx="6" fill="#f472b6" stroke="#8b315c" strokeWidth="2" />
      <rect x="22" y="11" width="9" height="20" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
      <rect x="31" y="9" width={length} height="24" rx="8" fill={`url(#${gradientId})`} stroke="#1f2937" strokeOpacity="0.35" strokeWidth="2" />
      <line x1="43" y1="14" x2={length + 18} y2="14" stroke="white" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
      <polygon points={`${length + 31},9 ${length + 52},21 ${length + 31},33`} fill="#e9bd78" stroke="#8a5a25" strokeWidth="1.5" />
      <polygon points={`${length + 51},16 ${length + 61},21 ${length + 51},26`} fill="#111827" />
    </svg>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    height: "100dvh",
    overflow: "hidden",
    padding: "8px",
    paddingBottom: "76px",
    boxSizing: "border-box",
    background: "linear-gradient(180deg,#fff7d6,#ffe7a3)",
    color: "#17365d",
    display: "grid",
    gridTemplateRows: "54px 126px 1fr",
    gap: 8,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    direction: "ltr",
  },
  counter: {
    width: 84,
    height: 48,
    border: "4px solid #efb21a",
    borderRadius: 18,
    background: "#fffef7",
    display: "grid",
    placeItems: "center",
    fontSize: 22,
    fontWeight: 1000,
    direction: "ltr",
  },
  sound: {
    width: 54,
    height: 54,
    borderRadius: "50%",
    border: "4px solid white",
    background: "#efb21a",
    fontSize: 25,
    boxShadow: "0 6px 12px rgba(0,0,0,.18)",
  },
  questionBox: {
    border: "5px solid #efb21a",
    borderRadius: 24,
    background: "#fffef7",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: "8px",
    boxSizing: "border-box",
  },
  questionLine: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px 12px",
    fontSize: "clamp(26px,7vw,42px)",
    fontWeight: 1000,
    lineHeight: 1.55,
    color: "#17365d",
  },
  questionWord: {
    display: "inline-block",
    color: "#17365d",
    transition: "transform .16s ease, opacity .16s ease, border-color .16s ease",
  },
  exerciseBox: {
    minHeight: 0,
    border: "5px solid #c97b25",
    borderRadius: 28,
    background: "linear-gradient(180deg,#f7cf8d,#dfaa62)",
    padding: 10,
    boxSizing: "border-box",
    display: "grid",
    gridTemplateRows: "52px 1fr 78px 44px",
    gap: 8,
    overflow: "hidden",
  },
  instruction: {
    background: "#fff2bd",
    borderRadius: 18,
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    fontSize: "clamp(19px,5vw,29px)",
    fontWeight: 1000,
  },
  tools: {
    minHeight: 0,
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gap: 8,
  },
  toolBtn: {
    width: "100%",
    border: "4px solid #efb21a",
    borderRadius: 20,
    background: "#fff8df",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    boxShadow: "0 4px 0 rgba(0,0,0,.12)",
  },
  slots: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 8,
    background: "rgba(255,255,255,.35)",
    borderRadius: 22,
    padding: 8,
    direction: "ltr",
  },
  slot: {
    border: "4px dashed #efb21a",
    borderRadius: 18,
    background: "rgba(255,255,255,.78)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },
  slotNum: {
    color: "#efb21a",
    fontSize: 28,
    fontWeight: 1000,
  },
  undo: {
    border: 0,
    borderRadius: 16,
    background: "#fff7d6",
    color: "#17365d",
    fontSize: "clamp(18px,5vw,26px)",
    fontWeight: 1000,
  },
  feedbackWrap: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "grid",
    placeItems: "center",
    pointerEvents: "none",
  },
  feedbackBadge: {
    minWidth: 290,
    minHeight: 112,
    borderRadius: 999,
    border: "9px solid white",
    color: "white",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    boxShadow: "0 20px 42px rgba(0,0,0,.28)",
    animation: "feedbackPop .32s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  feedbackText: {
    fontSize: "clamp(32px,8vw,50px)",
    fontWeight: 1000,
    lineHeight: 1.15,
    whiteSpace: "nowrap",
  },
};
