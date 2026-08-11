import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
import UnifiedExerciseKaraokeV2 from "../components/UnifiedExerciseKaraokeV2";

export type PremiumLengthMode = "discover" | "judge" | "arrange";

export type PremiumLengthStrip = {
  id: string;
  value: number;
  length: number;
  color: string;
};

export type PremiumLengthQuestion = {
  mode: PremiumLengthMode;
  question: string;
  question_audio_key: string;
  strips: PremiumLengthStrip[];
  correct_id?: string;
  direction?: "asc" | "desc";
};

export interface LengthLabPremiumExerciseV2Props {
  items: PremiumLengthQuestion[];
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

function fallbackWords(question: string): WordTiming[] {
  return question.split(/\s+/).filter(Boolean).map((text, i) => ({
    text,
    offset: i * 520,
    duration: 460,
  }));
}

function sortStrips(q: PremiumLengthQuestion) {
  return [...q.strips].sort((a, b) =>
    q.direction === "desc" ? b.value - a.value : a.value - b.value
  );
}

function missionTitle(mode: PremiumLengthMode) {
  if (mode === "discover") return "أَكْتَشِفُ الطُّولَ";
  if (mode === "judge") return "أُقَارِنُ بِخَطِّ البِدَايَةِ";
  return "أُرَتِّبُ الشَّرَائِطَ";
}

function missionHint(q: PremiumLengthQuestion) {
  if (q.mode === "discover") return "ثَلَاثَةُ شَرَائِطَ، اِخْتَرِ الجَوَابَ الصَّحِيحَ";
  if (q.mode === "judge") return "شَرِيطَانِ يَبْدَآنِ مِنْ نَفْسِ الخَطِّ";
  return q.direction === "desc"
    ? "اِلْمِسْ مِنَ الأَطْوَلِ إِلَى الأَقْصَرِ"
    : "اِلْمِسْ مِنَ الأَقْصَرِ إِلَى الأَطْوَلِ";
}

export default function LengthLabPremiumExerciseV2({
  items,
  audio_base,
  onComplete,
}: LengthLabPremiumExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");

  const karaoke = useKaraoke(audio_base);
  const question = items[itemIdx];

  const sorted = useMemo(() => question ? sortStrips(question) : [], [question]);
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const remaining = question ? question.strips.filter((s) => !selectedSet.has(s.id)) : [];

  const currentKey = question?.question_audio_key || "";
  const currentTiming = currentKey ? timings[currentKey] : undefined;

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      for (const it of items) {
        const t = await loadTimings(audio_base, it.question_audio_key);
        if (!cancelled && t) {
          setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
        }
      }
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, [audio_base, items]);

  useEffect(() => {
    karaoke.stop();
    setSelectedIds([]);
    setFeedbackState("idle");

    if (!question || !currentTiming) return;

    const timer = window.setTimeout(() => {
      karaoke.play(question.question_audio_key, currentTiming);
    }, 450);

    return () => window.clearTimeout(timer);
    // مهم: لا نضع timings كاملًا هنا حتى لا يتوقف الصوت عند تحميل توقيتات سؤال آخر
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, currentKey, currentTiming]);

  function replayQuestion() {
    if (!question) return;
    const t = timings[question.question_audio_key];
    if (t) karaoke.play(question.question_audio_key, t);
  }

  function nextAfterCorrect() {
    window.setTimeout(() => {
      if (itemIdx < items.length - 1) {
        setItemIdx(itemIdx + 1);
      } else {
        onComplete?.(items.length, items.length);
      }
    }, 1450);
  }

  function showCorrect() {
    karaoke.stop();
    setFeedbackState("correct");
    playFeedback(true);
    nextAfterCorrect();
  }

  function showWrong() {
    karaoke.stop();
    setFeedbackState("wrong");
    playFeedback(false);

    window.setTimeout(() => {
      setSelectedIds([]);
      setFeedbackState("idle");
      replayQuestion();
    }, 1150);
  }

  function choose(strip: PremiumLengthStrip) {
    if (!question || feedbackState !== "idle") return;

    if (question.mode === "discover" || question.mode === "judge") {
      if (strip.id === question.correct_id) showCorrect();
      else showWrong();
      return;
    }

    const expected = sorted[selectedIds.length];

    if (!expected || expected.id !== strip.id) {
      showWrong();
      return;
    }

    const next = [...selectedIds, strip.id];
    setSelectedIds(next);

    if (next.length === sorted.length) {
      showCorrect();
    }
  }

  function undo() {
    if (feedbackState !== "idle") return;
    setSelectedIds((v) => v.slice(0, -1));
  }

  if (!question) return null;

  const isArrange = question.mode === "arrange";

  const words =
    timings[question.question_audio_key]
    || fallbackWords(question.question);

  const karaokeWords =
    words.map((word) => word.text);

  const isActive =
    karaoke.activeKey === question.question_audio_key;

  const shownWordCount =
    karaoke.shown.size > 0
      ? Math.max(...karaoke.shown) + 1
      : 0;

  const effectiveShownWordCount =
    feedbackState !== "idle"
      ? karaokeWords.length
      : shownWordCount;

  return (
    <main dir="rtl" style={styles.page}>
      <header style={styles.header}>
        <div style={styles.counter}>{itemIdx + 1} / {items.length}</div>
        <button type="button" onClick={replayQuestion} style={styles.sound}>🔊</button>
      </header>

      <section style={styles.questionBox}>
        <UnifiedExerciseKaraokeV2
          words={karaokeWords}
          activeIndex={
            isActive
              ? karaoke.currentIdx
              : -1
          }
          shownWordCount={
            effectiveShownWordCount
          }
        />
      </section>

      <section
        style={{
          ...styles.lab,
          gridTemplateRows: isArrange ? "54px 1fr 82px 42px" : "54px 1fr 42px",
        }}
      >
        <div style={styles.labHeader}>
          <strong>{missionTitle(question.mode)}</strong>
          <span>{missionHint(question)}</span>
        </div>

        {question.mode === "discover" && (
          <div style={styles.threeGrid}>
            {question.strips.map((strip, index) => (
              <button
                key={strip.id}
                type="button"
                onClick={() => choose(strip)}
                style={styles.measureCard}
              >
                <span style={styles.optionBadge}>{index + 1}</span>
                <MeasureBoard strip={strip} />
              </button>
            ))}
          </div>
        )}

        {question.mode === "judge" && (
          <div style={styles.judgeGrid}>
            {question.strips.map((strip, index) => (
              <button
                key={strip.id}
                type="button"
                onClick={() => choose(strip)}
                style={styles.judgeCard}
              >
                <div style={styles.choiceLabel}>
                  {index === 0 ? "الشَّرِيطُ الأَوَّلُ" : "الشَّرِيطُ الثَّانِي"}
                </div>
                <MeasureBoard strip={strip} large />
              </button>
            ))}
          </div>
        )}

        {isArrange && (
          <>
            <div
              style={{
                ...styles.arrangeGrid,
                gridTemplateRows: `repeat(${remaining.length}, minmax(0, 1fr))`,
              }}
            >
              {remaining.map((strip, index) => (
                <button
                  key={strip.id}
                  type="button"
                  onClick={() => choose(strip)}
                  style={styles.measureCard}
                >
                  <span style={styles.optionBadge}>{index + 1}</span>
                  <MeasureBoard strip={strip} compact={remaining.length > 3} />
                </button>
              ))}
            </div>

            <div
              style={{
                ...styles.slots,
                gridTemplateColumns: `repeat(${sorted.length}, 1fr)`,
              }}
            >
              {sorted.map((_, i) => {
                const id = selectedIds[i];
                const placed = id ? question.strips.find((s) => s.id === id) : null;

                return (
                  <div key={i} style={styles.slot}>
                    {placed ? <MiniStrip strip={placed} /> : <span style={styles.slotNum}>{i + 1}</span>}
                  </div>
                );
              })}
            </div>
          </>
        )}

        <button type="button" onClick={isArrange ? undo : replayQuestion} style={styles.undo}>
          {isArrange ? "تَرَاجُع" : "أَعِدِ السُّؤَالَ"}
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

function MeasureBoard({
  strip,
  large = false,
  compact = false,
}: {
  strip: PremiumLengthStrip;
  large?: boolean;
  compact?: boolean;
}) {
  return (
    <div style={{ ...styles.board, minHeight: compact ? 54 : large ? 92 : 74 }}>
      <div style={styles.startLine} />
      <div style={styles.stripArea}>
        <Strip strip={strip} large={large} compact={compact} />
      </div>
      <Ruler />
    </div>
  );
}

function Strip({
  strip,
  large = false,
  compact = false,
}: {
  strip: PremiumLengthStrip;
  large?: boolean;
  compact?: boolean;
}) {
  const height = compact ? 20 : large ? 30 : 26;

  return (
    <div
      style={{
        ...styles.strip,
        width: strip.length,
        height,
        background: `linear-gradient(90deg, ${strip.color}, #fff1b8)`,
      }}
    >
      <span style={styles.stripShine} />
      <span style={styles.stripEndDot} />
    </div>
  );
}

function MiniStrip({ strip }: { strip: PremiumLengthStrip }) {
  return (
    <div
      style={{
        ...styles.miniStrip,
        width: Math.min(strip.length * 0.52, 128),
        background: `linear-gradient(90deg, ${strip.color}, #fff1b8)`,
      }}
    />
  );
}

function Ruler() {
  const ticks = Array.from({ length: 9 });

  return (
    <div style={styles.ruler}>
      {ticks.map((_, i) => (
        <span
          key={i}
          style={{
            ...styles.tick,
            height: i % 2 === 0 ? 17 : 11,
          }}
        />
      ))}
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
    background: "radial-gradient(circle at top,#fff9df,#ffe5a2 74%)",
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
  lab: {
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
  labHeader: {
    background: "linear-gradient(180deg,#fff7d6,#fff0ba)",
    borderRadius: 18,
    border: "2px solid rgba(232,160,32,.28)",
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    placeItems: "center",
    textAlign: "center",
    lineHeight: 1.1,
    color: C.navyDeep,
    overflow: "hidden",
  },
  threeGrid: {
    minHeight: 0,
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gap: 8,
  },
  judgeGrid: {
    minHeight: 0,
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gap: 10,
  },
  arrangeGrid: {
    minHeight: 0,
    display: "grid",
    gap: 7,
  },
  measureCard: {
    position: "relative",
    width: "100%",
    border: `4px solid ${C.gold}`,
    borderRadius: 22,
    background: "linear-gradient(180deg,#fffef8,#fff3cf)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    padding: "7px 10px",
    boxShadow: "0 5px 0 rgba(0,0,0,.12)",
  },
  judgeCard: {
    width: "100%",
    border: `4px solid ${C.gold}`,
    borderRadius: 24,
    background: "linear-gradient(180deg,#fffef8,#fff3cf)",
    display: "grid",
    gridTemplateRows: "34px 1fr",
    placeItems: "center",
    overflow: "hidden",
    padding: "7px 10px",
    boxShadow: "0 5px 0 rgba(0,0,0,.12)",
  },
  choiceLabel: {
    width: "100%",
    height: 30,
    borderRadius: 14,
    background: "#fff8dd",
    display: "grid",
    placeItems: "center",
    color: C.navyDeep,
    fontWeight: 1000,
    fontSize: "clamp(14px,4vw,19px)",
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
    zIndex: 3,
  },
  board: {
    width: "100%",
    maxWidth: 330,
    height: "100%",
    display: "grid",
    gridTemplateRows: "1fr 18px",
    alignItems: "center",
    justifyItems: "stretch",
    direction: "ltr",
    position: "relative",
  },
  startLine: {
    position: "absolute",
    left: 16,
    top: 10,
    bottom: 20,
    width: 5,
    borderRadius: 999,
    background: C.red,
    boxShadow: "0 0 0 3px rgba(212,84,71,.12)",
  },
  stripArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 24,
    paddingRight: 10,
    minWidth: 0,
  },
  strip: {
    position: "relative",
    borderRadius: 999,
    border: "2px solid rgba(40,40,40,.22)",
    boxShadow: "inset 0 4px 0 rgba(255,255,255,.42), inset 0 -4px 0 rgba(0,0,0,.13), 0 4px 8px rgba(0,0,0,.13)",
    flex: "0 0 auto",
  },
  stripShine: {
    position: "absolute",
    left: 18,
    right: 20,
    top: 5,
    height: 4,
    borderRadius: 999,
    background: "rgba(255,255,255,.55)",
  },
  stripEndDot: {
    position: "absolute",
    right: -6,
    top: "50%",
    transform: "translateY(-50%)",
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: C.navyDeep,
    border: "2px solid white",
  },
  ruler: {
    marginLeft: 24,
    marginRight: 10,
    height: 18,
    borderTop: "3px solid rgba(27,58,107,.35)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tick: {
    width: 3,
    borderRadius: 99,
    background: "rgba(27,58,107,.45)",
  },
  slots: {
    display: "grid",
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
  miniStrip: {
    height: 22,
    borderRadius: 999,
    border: "2px solid rgba(40,40,40,.20)",
    boxShadow: "inset 0 3px 0 rgba(255,255,255,.40), inset 0 -3px 0 rgba(0,0,0,.12)",
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
};
