import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";

export type LengthVisualKind = "pencil" | "ribbon" | "ruler";

export type LengthOrderVisualItem = {
  id: string;
  kind: LengthVisualKind;
  sort_value: number;
  length: number;
  color: string;
};

export type LengthOrderQuestion = {
  question: string;
  question_audio_key: string;
  items: LengthOrderVisualItem[];
  direction: "asc" | "desc";
};

export interface TouchOrderLengthExerciseV2Props {
  items: LengthOrderQuestion[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
}

const C = {
  navy: "#1B3A6B",
  navyDeep: "#0F2447",
  gold: "#E8A020",
  cream: "#FFF8EC",
  green: "#1FA463",
  red: "#D45447",
};

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

function playFeedback(correct: boolean) {
  const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
  a.play().catch(() => {});
}

function getSortedItems(question: LengthOrderQuestion) {
  return [...question.items].sort((a, b) => {
    return question.direction === "asc"
      ? a.sort_value - b.sort_value
      : b.sort_value - a.sort_value;
  });
}

function wordsFromQuestion(question: string): WordTiming[] {
  return question.split(/\s+/).filter(Boolean).map((text, i) => ({
    text,
    offset: i * 520,
    duration: 460,
  }));
}

export default function TouchOrderLengthExerciseV2({
  items,
  audio_base,
  onComplete,
}: TouchOrderLengthExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");

  const karaoke = useKaraoke(audio_base);
  const question = items[itemIdx];
  const sortedItems = question ? getSortedItems(question) : [];
  const selectedSet = new Set(selectedIds);
  const remaining = question ? question.items.filter((it) => !selectedSet.has(it.id)) : [];

  useEffect(() => {
    items.forEach(async (it) => {
      const t = await loadTimings(audio_base, it.question_audio_key);
      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
    });
  }, [audio_base, items]);

  useEffect(() => {
    karaoke.stop();
    setSelectedIds([]);
    setFeedbackState("idle");

    if (!question) return;

    const t = timings[question.question_audio_key];
    if (!t) return;

    const timer = setTimeout(() => {
      karaoke.play(question.question_audio_key, t);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, timings]);

  const replayQuestion = () => {
    if (!question) return;
    const t = timings[question.question_audio_key];
    if (t) karaoke.play(question.question_audio_key, t);
  };

  function showWrong() {
    karaoke.stop();
    setFeedbackState("wrong");
    playFeedback(false);

    setTimeout(() => {
      setSelectedIds([]);
      setFeedbackState("idle");
      replayQuestion();
    }, 1200);
  }

  function choose(item: LengthOrderVisualItem) {
    if (!question || feedbackState !== "idle") return;

    const expected = sortedItems[selectedIds.length];

    if (!expected || expected.id !== item.id) {
      showWrong();
      return;
    }

    const next = [...selectedIds, item.id];
    setSelectedIds(next);

    if (next.length === sortedItems.length) {
      karaoke.stop();
      setFeedbackState("correct");
      playFeedback(true);

      setTimeout(() => {
        if (itemIdx < items.length - 1) {
          setItemIdx(itemIdx + 1);
        } else {
          onComplete?.(items.length, items.length);
        }
      }, 1500);
    }
  }

  function undo() {
    if (feedbackState !== "idle") return;
    setSelectedIds((v) => v.slice(0, -1));
  }

  if (!question) return null;

  const words = timings[question.question_audio_key] || wordsFromQuestion(question.question);
  const isActive = karaoke.activeKey === question.question_audio_key;

  return (
    <main dir="rtl" style={styles.page}>
      <header style={styles.header}>
        <div style={styles.counter}>{itemIdx + 1} / {items.length}</div>
        <button type="button" onClick={replayQuestion} style={styles.sound}>🔊</button>
      </header>

      <section style={styles.questionBox}>
        <div style={styles.questionLine}>
          {words.map((word, i) => {
            const active = isActive && karaoke.currentIdx === i;
            const shown = karaoke.shown.has(i);

            return (
              <span
                key={`${word.text}-${i}`}
                style={{
                  ...styles.questionWord,
                  opacity: isActive && !shown && !active ? 0.42 : 1,
                  transform: active ? "scale(1.08)" : "scale(1)",
                }}
              >
                {word.text}
              </span>
            );
          })}
        </div>
      </section>

      <section style={styles.exerciseBox}>
        <div style={styles.instruction}>
          {question.direction === "asc"
            ? "اِلمِسِ الأَقْصَرَ ثُمَّ الأَطْوَلَ"
            : "اِلمِسِ الأَطْوَلَ ثُمَّ الأَقْصَرَ"}
        </div>

        <div style={styles.objects}>
          {remaining.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => choose(item)}
              style={styles.objectBtn}
            >
              <VisualObject item={item} />
            </button>
          ))}
        </div>

        <div style={styles.slots}>
          {sortedItems.map((_, i) => {
            const id = selectedIds[i];
            const placed = id ? question.items.find((x) => x.id === id) : null;

            return (
              <div key={i} style={styles.slot}>
                {placed ? (
                  <VisualObject item={{ ...placed, length: Math.min(placed.length, 155) }} compact />
                ) : (
                  <span style={styles.slotNum}>{i + 1}</span>
                )}
              </div>
            );
          })}
        </div>

        <button type="button" onClick={undo} style={styles.undo}>تَرَاجُع</button>
      </section>

      {feedbackState !== "idle" && (
        <div style={styles.feedbackLayer}>
          <div
            style={{
              ...styles.feedbackBackShape,
              background: feedbackState === "correct" ? C.green : C.red,
            }}
          >
            {feedbackState === "correct" ? "✅" : "✨"}
          </div>

          <div
            style={{
              ...styles.feedbackToast,
              borderColor: feedbackState === "correct" ? C.green : C.gold,
            }}
          >
            <span style={styles.feedbackToastText}>
              {feedbackState === "correct"
                ? "رائع يا بطل! اخترت الترتيب الصحيح 🎉"
                : "اقتربت! انظر إلى الطول جيدًا 👏"}
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes feedbackPop {
          0% { transform: scale(.72); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes feedbackToastPop {
          0% { transform: translateY(18px) scale(.92); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </main>
  );
}

function VisualObject({
  item,
  compact = false,
}: {
  item: LengthOrderVisualItem;
  compact?: boolean;
}) {
  if (item.kind === "ribbon") return <Ribbon item={item} compact={compact} />;
  if (item.kind === "ruler") return <Ruler item={item} compact={compact} />;
  return <Pencil item={item} compact={compact} />;
}

function Pencil({ item, compact }: { item: LengthOrderVisualItem; compact: boolean }) {
  const length = compact ? Math.min(item.length, 150) : item.length;
  const total = length + 62;
  const gradientId = `pencil-${item.id.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg width={total} height="42" viewBox={`0 0 ${total} 42`} style={styles.svg}>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1">
          <stop offset="0%" stopColor={item.color} />
          <stop offset="100%" stopColor={item.color} stopOpacity="0.78" />
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

function Ribbon({ item, compact }: { item: LengthOrderVisualItem; compact: boolean }) {
  const length = compact ? Math.min(item.length, 150) : item.length;
  const total = length + 24;

  return (
    <svg width={total} height="42" viewBox={`0 0 ${total} 42`} style={styles.svg}>
      <path
        d={`M10 16 C25 4, 40 28, 55 16 S85 16, 100 16 S130 16, ${length + 8} 16`}
        fill="none"
        stroke={item.color}
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d={`M10 16 C25 4, 40 28, 55 16 S85 16, 100 16 S130 16, ${length + 8} 16`}
        fill="none"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Ruler({ item, compact }: { item: LengthOrderVisualItem; compact: boolean }) {
  const length = compact ? Math.min(item.length, 150) : item.length;
  const total = length + 20;
  const ticks = Array.from({ length: Math.max(4, Math.floor(length / 18)) });

  return (
    <svg width={total} height="42" viewBox={`0 0 ${total} 42`} style={styles.svg}>
      <rect x="10" y="8" width={length} height="26" rx="7" fill={item.color} stroke="#8a5a25" strokeWidth="2" />
      {ticks.map((_, i) => {
        const x = 18 + i * 18;
        return <line key={i} x1={x} y1="9" x2={x} y2={i % 2 === 0 ? 27 : 21} stroke="#1f2937" strokeWidth="2" />;
      })}
      <line x1="18" y1="14" x2={length - 8} y2="14" stroke="white" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
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
    color: C.navy,
    display: "grid",
    gridTemplateRows: "54px 124px 1fr",
    gap: 8,
    fontFamily: "Tajawal, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    direction: "ltr",
  },
  counter: {
    width: 86,
    height: 48,
    border: `4px solid ${C.gold}`,
    borderRadius: 18,
    background: C.cream,
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
    background: C.gold,
    fontSize: 25,
    boxShadow: "0 6px 12px rgba(0,0,0,.18)",
  },
  questionBox: {
    border: `5px solid ${C.gold}`,
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
    fontSize: "clamp(25px,7vw,40px)",
    fontWeight: 1000,
    lineHeight: 1.55,
    color: C.navyDeep,
  },
  questionWord: {
    display: "inline-block",
    color: C.navyDeep,
    transition: "transform .16s ease, opacity .16s ease",
  },
  exerciseBox: {
    minHeight: 0,
    border: "5px solid #c97b25",
    borderRadius: 28,
    background: "linear-gradient(180deg,#f7cf8d,#dfaa62)",
    padding: 10,
    boxSizing: "border-box",
    display: "grid",
    gridTemplateRows: "52px 1fr 80px 44px",
    gap: 8,
    overflow: "hidden",
  },
  instruction: {
    background: "#fff2bd",
    borderRadius: 18,
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    fontSize: "clamp(19px,5vw,28px)",
    fontWeight: 1000,
  },
  objects: {
    minHeight: 0,
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gap: 8,
  },
  objectBtn: {
    width: "100%",
    border: `4px solid ${C.gold}`,
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
    border: `4px dashed ${C.gold}`,
    borderRadius: 18,
    background: "rgba(255,255,255,.78)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },
  slotNum: {
    color: C.gold,
    fontSize: 28,
    fontWeight: 1000,
  },
  undo: {
    border: 0,
    borderRadius: 16,
    background: "#fff7d6",
    color: C.navy,
    fontSize: "clamp(18px,5vw,26px)",
    fontWeight: 1000,
  },
  feedbackLayer: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 84,
    zIndex: 9999,
    display: "grid",
    placeItems: "center",
    pointerEvents: "none",
    padding: "0 16px",
  },
  feedbackBackShape: {
    width: 250,
    height: 92,
    borderRadius: 999,
    display: "grid",
    placeItems: "center",
    color: "white",
    fontSize: 44,
    fontWeight: 1000,
    boxShadow: "0 16px 32px rgba(0,0,0,.18)",
    animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  feedbackToast: {
    width: "min(92vw, 390px)",
    minHeight: 70,
    marginTop: -64,
    borderRadius: 24,
    border: "5px solid",
    background: "rgba(255,255,255,.96)",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: "8px 14px",
    boxShadow: "0 12px 28px rgba(0,0,0,.18)",
    animation: "feedbackToastPop .30s ease",
  },
  feedbackToastText: {
    color: C.navyDeep,
    fontSize: "clamp(19px,5.4vw,28px)",
    fontWeight: 1000,
    lineHeight: 1.35,
  },
  svg: {
    display: "block",
    maxWidth: "100%",
  },
};
