import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";

export type LengthVisualKind = "pencil" | "ribbon" | "ruler" | "rope" | "brush";
export type LengthQuestionMode = "select" | "compare" | "order";

export type LengthVisualItem = {
  id: string;
  kind: LengthVisualKind;
  sort_value: number;
  length: number;
  color: string;
};

export type LengthVarietyQuestion = {
  mode: LengthQuestionMode;
  question: string;
  question_audio_key: string;
  items: LengthVisualItem[];
  correct_id?: string;
  direction?: "asc" | "desc";
};

export interface LengthVarietyExerciseV2Props {
  items: LengthVarietyQuestion[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
}

const C = {
  navy: "#1B3A6B",
  navyDeep: "#0F2447",
  gold: "#E8A020",
  cream: "#FFF8EC",
  paper: "#FFFDF6",
  green: "#1FA463",
  red: "#D45447",
  orange: "#C97922",
  soft: "#FFF3CE",
};

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

function playFeedback(correct: boolean) {
  const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
  a.play().catch(() => {});
}

function getSortedItems(question: LengthVarietyQuestion) {
  return [...question.items].sort((a, b) => {
    return question.direction === "desc"
      ? b.sort_value - a.sort_value
      : a.sort_value - b.sort_value;
  });
}

function wordsFromQuestion(question: string): WordTiming[] {
  return question.split(/\s+/).filter(Boolean).map((text, i) => ({
    text,
    offset: i * 520,
    duration: 460,
  }));
}

function modeTitle(mode: LengthQuestionMode) {
  if (mode === "select") return "اِخْتِيَارٌ حَسَبَ الطُّولِ";
  if (mode === "compare") return "مُقَارَنَةُ الطُّولِ";
  return "تَرْتِيبٌ حَسَبَ الطُّولِ";
}

function modeInstruction(question: LengthVarietyQuestion) {
  if (question.mode === "select") return "اِلْمِسِ الشَّكْلَ المُنَاسِبَ";
  if (question.mode === "compare") return "قَارِنْ بَيْنَ الشَّكْلَيْنِ ثُمَّ اخْتَرْ";
  return question.direction === "desc"
    ? "اِلْمِسِ الأَطْوَلَ ثُمَّ الأَقْصَرَ"
    : "اِلْمِسِ الأَقْصَرَ ثُمَّ الأَطْوَلَ";
}

export default function LengthVarietyExerciseV2({
  items,
  audio_base,
  onComplete,
}: LengthVarietyExerciseV2Props) {
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

  function replayQuestion() {
    if (!question) return;
    const t = timings[question.question_audio_key];
    if (t) karaoke.play(question.question_audio_key, t);
  }

  function goNextAfterCorrect() {
    setTimeout(() => {
      if (itemIdx < items.length - 1) {
        setItemIdx(itemIdx + 1);
      } else {
        onComplete?.(items.length, items.length);
      }
    }, 1500);
  }

  function showCorrect() {
    karaoke.stop();
    setFeedbackState("correct");
    playFeedback(true);
    goNextAfterCorrect();
  }

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

  function choose(item: LengthVisualItem) {
    if (!question || feedbackState !== "idle") return;

    if (question.mode === "select" || question.mode === "compare") {
      if (item.id === question.correct_id) showCorrect();
      else showWrong();
      return;
    }

    const expected = sortedItems[selectedIds.length];

    if (!expected || expected.id !== item.id) {
      showWrong();
      return;
    }

    const next = [...selectedIds, item.id];
    setSelectedIds(next);

    if (next.length === sortedItems.length) {
      showCorrect();
    }
  }

  function undo() {
    if (feedbackState !== "idle") return;
    setSelectedIds((v) => v.slice(0, -1));
  }

  if (!question) return null;

  const isOrder = question.mode === "order";
  const isCompare = question.mode === "compare";
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

      <section
        style={{
          ...styles.exerciseBox,
          gridTemplateRows: isOrder ? "46px 1fr 78px 42px" : "46px 1fr 42px",
        }}
      >
        <div style={styles.modePill}>
          <span>{modeTitle(question.mode)}</span>
          <small style={styles.modeHint}>{modeInstruction(question)}</small>
        </div>

        {question.mode === "select" && (
          <div style={styles.selectGrid}>
            {question.items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => choose(item)}
                style={styles.selectCard}
              >
                <span style={styles.optionBadge}>{index + 1}</span>
                <VisualObject item={item} />
              </button>
            ))}
          </div>
        )}

        {question.mode === "compare" && (
          <div style={styles.compareWrap}>
            <button
              type="button"
              onClick={() => choose(question.items[0])}
              style={styles.compareCard}
            >
              <span style={styles.compareLabel}>الخِيَارُ الأَوَّلُ</span>
              <VisualObject item={question.items[0]} />
            </button>

            <div style={styles.vsBadge}>؟</div>

            <button
              type="button"
              onClick={() => choose(question.items[1])}
              style={styles.compareCard}
            >
              <span style={styles.compareLabel}>الخِيَارُ الثَّانِي</span>
              <VisualObject item={question.items[1]} />
            </button>
          </div>
        )}

        {question.mode === "order" && (
          <>
            <div style={styles.orderObjects}>
              {remaining.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => choose(item)}
                  style={styles.orderBtn}
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
          </>
        )}

        <button type="button" onClick={isOrder ? undo : replayQuestion} style={styles.undo}>
          {isOrder ? "تَرَاجُع" : "أَعِدِ السُّؤَالَ"}
        </button>
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
                ? "رائع يا بطل! إجابة صحيحة 🎉"
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

function VisualObject({ item, compact = false }: { item: LengthVisualItem; compact?: boolean }) {
  if (item.kind === "ribbon") return <Ribbon item={item} compact={compact} />;
  if (item.kind === "ruler") return <Ruler item={item} compact={compact} />;
  if (item.kind === "rope") return <Rope item={item} compact={compact} />;
  if (item.kind === "brush") return <Brush item={item} compact={compact} />;
  return <Pencil item={item} compact={compact} />;
}

function Pencil({ item, compact }: { item: LengthVisualItem; compact: boolean }) {
  const length = compact ? Math.min(item.length, 150) : item.length;
  const total = length + 62;
  const gradientId = `pencil-${item.id.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg width={total} height="46" viewBox={`0 0 ${total} 46`} style={styles.svg}>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1">
          <stop offset="0%" stopColor={item.color} />
          <stop offset="100%" stopColor={item.color} stopOpacity="0.78" />
        </linearGradient>
      </defs>
      <rect x="4" y="13" width="18" height="20" rx="6" fill="#f472b6" stroke="#8b315c" strokeWidth="2" />
      <rect x="22" y="13" width="9" height="20" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
      <rect x="31" y="11" width={length} height="24" rx="8" fill={`url(#${gradientId})`} stroke="#1f2937" strokeOpacity="0.35" strokeWidth="2" />
      <line x1="43" y1="16" x2={length + 18} y2="16" stroke="white" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
      <polygon points={`${length + 31},11 ${length + 52},23 ${length + 31},35`} fill="#e9bd78" stroke="#8a5a25" strokeWidth="1.5" />
      <polygon points={`${length + 51},18 ${length + 61},23 ${length + 51},28`} fill="#111827" />
    </svg>
  );
}

function Ribbon({ item, compact }: { item: LengthVisualItem; compact: boolean }) {
  const length = compact ? Math.min(item.length, 150) : item.length;
  const total = length + 24;

  return (
    <svg width={total} height="46" viewBox={`0 0 ${total} 46`} style={styles.svg}>
      <path
        d={`M10 22 C28 5, 44 39, 62 22 S98 22, 116 22 S150 22, ${length + 8} 22`}
        fill="none"
        stroke={item.color}
        strokeWidth="15"
        strokeLinecap="round"
      />
      <path
        d={`M10 22 C28 5, 44 39, 62 22 S98 22, 116 22 S150 22, ${length + 8} 22`}
        fill="none"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Ruler({ item, compact }: { item: LengthVisualItem; compact: boolean }) {
  const length = compact ? Math.min(item.length, 150) : item.length;
  const total = length + 20;
  const ticks = Array.from({ length: Math.max(4, Math.floor(length / 18)) });

  return (
    <svg width={total} height="46" viewBox={`0 0 ${total} 46`} style={styles.svg}>
      <rect x="10" y="10" width={length} height="28" rx="7" fill={item.color} stroke="#8a5a25" strokeWidth="2" />
      {ticks.map((_, i) => {
        const x = 18 + i * 18;
        return <line key={i} x1={x} y1="11" x2={x} y2={i % 2 === 0 ? 31 : 24} stroke="#1f2937" strokeWidth="2" />;
      })}
      <line x1="18" y1="16" x2={length - 8} y2="16" stroke="white" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function Rope({ item, compact }: { item: LengthVisualItem; compact: boolean }) {
  const length = compact ? Math.min(item.length, 150) : item.length;
  const icon = compact ? 30 : 40;

  return (
    <div
      style={{
        width: length + icon * 2 + 26,
        maxWidth: "100%",
        height: compact ? 44 : 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: "ltr",
      }}
    >
      <img
        src="/lessons/v2/lesson23-assets/temoji/rope.svg"
        alt=""
        style={{
          width: icon,
          height: icon,
          objectFit: "contain",
          flex: "0 0 auto",
          filter: "drop-shadow(0 3px 3px rgba(0,0,0,.18))",
        }}
      />

      <div
        style={{
          width: length,
          height: compact ? 15 : 18,
          borderRadius: 999,
          margin: "0 -2px",
          background:
            "repeating-linear-gradient(135deg,#8B5A2B 0 9px,#D99A45 9px 18px,#F3C06A 18px 27px)",
          border: "2px solid rgba(90,50,20,.35)",
          boxShadow:
            "inset 0 3px 0 rgba(255,255,255,.32), inset 0 -3px 0 rgba(0,0,0,.16), 0 5px 8px rgba(0,0,0,.12)",
          flex: "0 0 auto",
        }}
      />

      <img
        src="/lessons/v2/lesson23-assets/temoji/rope.svg"
        alt=""
        style={{
          width: icon,
          height: icon,
          objectFit: "contain",
          flex: "0 0 auto",
          transform: "scaleX(-1)",
          filter: "drop-shadow(0 3px 3px rgba(0,0,0,.18))",
        }}
      />
    </div>
  );
}

function Brush({ item, compact }: { item: LengthVisualItem; compact: boolean }) {
  const length = compact ? Math.min(item.length, 150) : item.length;
  const icon = compact ? 38 : 50;

  return (
    <div
      style={{
        width: length + icon + 28,
        maxWidth: "100%",
        height: compact ? 50 : 62,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: "ltr",
      }}
    >
      <div
        style={{
          width: length,
          height: compact ? 18 : 22,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${item.color}, #f8d08a)`,
          border: "2px solid rgba(90,50,20,.35)",
          boxShadow:
            "inset 0 4px 0 rgba(255,255,255,.36), inset 0 -3px 0 rgba(0,0,0,.14), 0 5px 8px rgba(0,0,0,.12)",
          flex: "0 0 auto",
        }}
      />

      <img
        src="/lessons/v2/lesson23-assets/temoji/brush.svg"
        alt=""
        style={{
          width: icon,
          height: icon,
          objectFit: "contain",
          marginLeft: -4,
          flex: "0 0 auto",
          filter: "drop-shadow(0 4px 4px rgba(0,0,0,.20))",
        }}
      />
    </div>
  );
}


const styles: Record<string, CSSProperties> = {
  page: {
    height: "100dvh",
    overflow: "hidden",
    padding: "8px",
    paddingBottom: "76px",
    boxSizing: "border-box",
    background: "radial-gradient(circle at top,#fff9de,#ffe6a1 72%)",
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
    boxShadow: "0 6px 12px rgba(0,0,0,.10)",
  },
  sound: {
    width: 54,
    height: 54,
    borderRadius: "50%",
    border: "4px solid white",
    background: C.gold,
    fontSize: 25,
    boxShadow: "0 8px 16px rgba(0,0,0,.20)",
  },
  questionBox: {
    border: `5px solid ${C.gold}`,
    borderRadius: 26,
    background: "#fffef7",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: "8px",
    boxSizing: "border-box",
    boxShadow: "0 5px 0 rgba(232,160,32,.18)",
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
    borderRadius: 30,
    background: "linear-gradient(180deg,#f8d59a,#dea85d)",
    padding: 10,
    boxSizing: "border-box",
    gap: 8,
    overflow: "hidden",
    display: "grid",
    boxShadow: "inset 0 0 0 4px rgba(255,255,255,.22)",
  },
  modePill: {
    background: "linear-gradient(180deg,#fff7d6,#fff0ba)",
    borderRadius: 18,
    border: "2px solid rgba(232,160,32,.28)",
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    placeItems: "center",
    textAlign: "center",
    fontSize: "clamp(15px,4.5vw,22px)",
    fontWeight: 1000,
    lineHeight: 1.1,
    color: C.navyDeep,
  },
  modeHint: {
    fontSize: "clamp(11px,3.5vw,16px)",
    color: "#8a4d16",
    fontWeight: 900,
  },
  selectGrid: {
    minHeight: 0,
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gap: 8,
  },
  selectCard: {
    position: "relative",
    width: "100%",
    border: `4px solid ${C.gold}`,
    borderRadius: 22,
    background: "linear-gradient(180deg,#fffef8,#fff3cf)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    boxShadow: "0 5px 0 rgba(0,0,0,.12)",
  },
  optionBadge: {
    position: "absolute",
    right: 10,
    top: 8,
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: C.gold,
    color: "white",
    display: "grid",
    placeItems: "center",
    fontSize: 18,
    fontWeight: 1000,
  },
  compareWrap: {
    minHeight: 0,
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    alignItems: "stretch",
  },
  compareCard: {
    minWidth: 0,
    border: `5px solid ${C.gold}`,
    borderRadius: 26,
    background: "linear-gradient(180deg,#fffef8,#fff0bf)",
    display: "grid",
    gridTemplateRows: "44px 1fr",
    placeItems: "center",
    padding: 8,
    overflow: "hidden",
    boxShadow: "0 7px 0 rgba(0,0,0,.12)",
  },
  compareLabel: {
    width: "100%",
    minHeight: 36,
    borderRadius: 14,
    background: "#fff8dd",
    display: "grid",
    placeItems: "center",
    fontSize: "clamp(13px,3.7vw,18px)",
    fontWeight: 1000,
    color: C.navyDeep,
    textAlign: "center",
  },
  vsBadge: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 4,
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: C.gold,
    border: "5px solid white",
    color: "white",
    fontSize: 32,
    fontWeight: 1000,
    display: "grid",
    placeItems: "center",
    boxShadow: "0 8px 18px rgba(0,0,0,.20)",
  },
  orderObjects: {
    minHeight: 0,
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gap: 8,
  },
  orderBtn: {
    width: "100%",
    border: `4px solid ${C.gold}`,
    borderRadius: 22,
    background: "linear-gradient(180deg,#fffef8,#fff3cf)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    boxShadow: "0 5px 0 rgba(0,0,0,.12)",
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
    background: "rgba(255,255,255,.82)",
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
    fontSize: "clamp(17px,5vw,25px)",
    fontWeight: 1000,
    boxShadow: "inset 0 -3px 0 rgba(0,0,0,.08)",
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
