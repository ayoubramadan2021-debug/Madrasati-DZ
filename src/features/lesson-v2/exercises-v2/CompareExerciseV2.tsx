import { useEffect, useState } from "react";
import {
  useKaraoke,
  loadTimings,
  type WordTiming,
} from "../useKaraoke";
import { isKeyword } from "../keywords";
import EmojiIcon from "../components/EmojiIcon";

export type CompareVisual = {
  image: string;
  label: string;
  alt?: string;
  accent?: string;
  badge?: string;
};

export type CompareItem = {
  group_a?: string[];
  group_b?: string[];
  visual_a?: CompareVisual;
  visual_b?: CompareVisual;
  background_image?: string;
  relation?: "longer" | "shorter";
  mission_title?: string;
  hint?: string;
  coach_idle?: string;
  coach_correct?: string;
  coach_wrong?: string;
  question: string;
  question_audio_key: string;
  options: string[];
  correct: string;
};

interface CompareExerciseV2Props {
  items: CompareItem[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
}

const C = {
  navy: "#1B3A6B",
  navyDeep: "#10294D",
  gold: "#E8A020",
  cream: "#FFF8EC",
  green: "#1FA463",
  greenSoft: "#DCFCE7",
  red: "#D45447",
  redSoft: "#FEE2E2",
};

const FEEDBACK_CORRECT =
  "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY =
  "/audio/v2_feedback/retry.mp3";

export default function CompareExerciseV2({
  items,
  audio_base,
  onComplete,
}: CompareExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<
    Record<string, WordTiming[]>
  >({});
  const [selectedOption, setSelectedOption] =
    useState<string | null>(null);
  const [feedbackState, setFeedbackState] =
    useState<"idle" | "correct" | "wrong">("idle");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const karaoke = useKaraoke(audio_base);
  const item = items[itemIdx];

  useEffect(() => {
    setItemIdx(0);
    setSelectedOption(null);
    setFeedbackState("idle");
    setAttempts(0);
    setLocked(false);
  }, [items, audio_base]);

  useEffect(() => {
    let cancelled = false;
    setTimings({});

    items.forEach(async (entry) => {
      const result = await loadTimings(
        audio_base,
        entry.question_audio_key,
      );

      if (!cancelled && result) {
        setTimings((previous) => ({
          ...previous,
          [entry.question_audio_key]: result,
        }));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [audio_base, items]);

  useEffect(() => {
    karaoke.stop();
    setSelectedOption(null);
    setFeedbackState("idle");
    setAttempts(0);
    setLocked(false);

    if (!item) return;

    const words = timings[item.question_audio_key];
    if (!words) return;

    const timer = window.setTimeout(() => {
      karaoke.play(item.question_audio_key, words);
    }, 600);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, timings]);

  if (!item) return null;

  const playFeedback = (correct: boolean) => {
    const audio = new Audio(
      correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY,
    );
    audio.play().catch(() => {});
  };

  const nextItem = () => {
    if (itemIdx < items.length - 1) {
      setItemIdx((current) => current + 1);
    } else {
      onComplete?.(items.length, items.length);
    }
  };

  const handleSelect = (option: string) => {
    if (locked || feedbackState === "correct") return;

    karaoke.stop();
    setSelectedOption(option);

    const correct = option === item.correct;
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (correct) {
      setFeedbackState("correct");
      setLocked(true);
      playFeedback(true);
      window.setTimeout(nextItem, 1700);
      return;
    }

    setFeedbackState("wrong");
    playFeedback(false);

    if (nextAttempts >= 3) {
      setLocked(true);
      window.setTimeout(nextItem, 2200);
      return;
    }

    window.setTimeout(() => {
      setFeedbackState("idle");
      setSelectedOption(null);
    }, 1400);
  };

  const replayQuestion = () => {
    const words = timings[item.question_audio_key];
    if (words) {
      karaoke.play(item.question_audio_key, words);
    }
  };

  const renderLegacyGroup = (emojis: string[]) => (
    <div style={styles.legacyGroup}>
      {emojis.map((emoji, index) => (
        <EmojiIcon
          key={`${itemIdx}-${index}-${emoji}`}
          emoji={emoji}
          size={38}
        />
      ))}
    </div>
  );

  const renderVisual = (
    visual: CompareVisual,
    side: "a" | "b",
  ) => (
    <article
      style={{
        ...styles.visualCard,
        borderColor: visual.accent ?? C.gold,
      }}
    >
      {visual.badge && (
        <span
          style={{
            ...styles.visualBadge,
            background: visual.accent ?? C.gold,
          }}
        >
          {visual.badge}
        </span>
      )}

      <img
        src={visual.image}
        alt={visual.alt ?? visual.label}
        style={styles.visualImage}
        draggable={false}
      />

      <div style={styles.visualLabel}>
        <span style={styles.sideMarker}>
          {side === "a" ? "أ" : "ب"}
        </span>
        {visual.label}
      </div>
    </article>
  );

  const words = timings[item.question_audio_key];
  const active =
    karaoke.activeKey === item.question_audio_key;

  const missionText =
    item.mission_title ??
    (item.relation === "shorter"
      ? `مهمة الأقصر ${itemIdx + 1}`
      : `مهمة الأطول ${itemIdx + 1}`);

  const coachText =
    feedbackState === "correct"
      ? item.coach_correct ??
        "ممتاز! قارنتَ الطولين بدقة 🎉"
      : feedbackState === "wrong"
        ? item.coach_wrong ??
          "انظر إلى بداية الشيئين ونهايتهما ثم حاول مجددًا 👏"
        : item.coach_idle ??
          "قارن بين الشيئين واختر الإجابة الصحيحة.";

  return (
    <main dir="rtl" style={styles.page}>
      {item.background_image && (
        <div
          style={{
            ...styles.background,
            backgroundImage:
              `url("${item.background_image}")`,
          }}
        />
      )}
      <div style={styles.overlay} />

      <section style={styles.content}>
        <header style={styles.header}>
          <button
            type="button"
            onClick={replayQuestion}
            style={styles.soundButton}
            aria-label="إعادة صوت السؤال"
          >
            🔊
          </button>

          <div style={styles.progressIcons}>
            {items.map((_, index) => {
              const done = index < itemIdx;
              const current = index === itemIdx;

              return (
                <span
                  key={index}
                  style={{
                    ...styles.progressIcon,
                    opacity:
                      done || current ? 1 : 0.28,
                    transform: current
                      ? "translateY(-3px) scale(1.15)"
                      : "scale(1)",
                    filter:
                      done || current
                        ? "none"
                        : "grayscale(1)",
                  }}
                >
                  🎡
                </span>
              );
            })}
          </div>

          <div style={styles.counter}>
            <span dir="ltr">
              {itemIdx + 1} / {items.length}
            </span>
          </div>
        </header>

        <div style={styles.mission}>
          🎯 {missionText}
        </div>

        <section style={styles.compareArea}>
          {item.visual_a && item.visual_b ? (
            <>
              {renderVisual(item.visual_a, "a")}
              <div style={styles.compareSymbol}>↔</div>
              {renderVisual(item.visual_b, "b")}
            </>
          ) : (
            <>
              {renderLegacyGroup(item.group_a ?? [])}
              <div style={styles.compareSymbol}>↔</div>
              {renderLegacyGroup(item.group_b ?? [])}
            </>
          )}
        </section>

        {item.hint && (
          <div style={styles.hint}>{item.hint}</div>
        )}

        <section
          style={styles.questionBox}
          onClick={replayQuestion}
        >
          {words ? (
            words.map((word, index) => {
              const shown = karaoke.activeKey
                ? karaoke.shown.has(index)
                : true;
              const current =
                active &&
                karaoke.currentIdx === index;

              return (
                <span
                  key={`${word.text}-${index}`}
                  style={{
                    ...styles.word,
                    opacity: shown ? 1 : 0,
                    color: current
                      ? C.gold
                      : isKeyword(word.text)
                        ? "#16884E"
                        : C.navyDeep,
                    transform: current
                      ? "translateY(-3px) scale(1.08)"
                      : "translateY(0) scale(1)",
                  }}
                >
                  {word.text}{" "}
                </span>
              );
            })
          ) : (
            <span>{item.question}</span>
          )}
        </section>

        <section style={styles.options}>
          {item.options.map((option, index) => {
            const selected =
              selectedOption === option;
            const correct =
              selected &&
              feedbackState === "correct";
            const wrong =
              selected &&
              feedbackState === "wrong";
            const reveal =
              locked &&
              option === item.correct &&
              feedbackState !== "correct";

            return (
              <button
                type="button"
                key={option}
                onClick={() => handleSelect(option)}
                disabled={locked}
                style={{
                  ...styles.optionButton,
                  background:
                    correct || reveal
                      ? C.greenSoft
                      : wrong
                        ? C.redSoft
                        : "#FFFFFF",
                  borderColor:
                    correct || reveal
                      ? C.green
                      : wrong
                        ? C.red
                        : C.gold,
                  animationDelay: `${index * 90}ms`,
                }}
              >
                {option}
              </button>
            );
          })}
        </section>

        {feedbackState !== "idle" && (
          <>
            <div
              style={{
                ...styles.feedbackPill,
                background:
                  feedbackState === "correct"
                    ? C.green
                    : "#EF4444",
              }}
            >
              {feedbackState === "correct"
                ? "🌟 أَحْسَنْتَ!"
                : "حَاوِلْ مَرَّةً أُخْرَى ✨"}
            </div>

            <div
              style={{
                ...styles.coach,
                borderColor:
                  feedbackState === "correct"
                    ? C.green
                    : C.gold,
              }}
            >
              {coachText}
            </div>
          </>
        )}
      </section>

      <style>{`
        @keyframes premiumOptionIn {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(.94);
          }
          70% {
            opacity: 1;
            transform: translateY(-2px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes premiumFeedback {
          0% {
            opacity: 0;
            transform: translate(-50%,-50%) scale(.65);
          }
          65% {
            opacity: 1;
            transform: translate(-50%,-50%) scale(1.08);
          }
          100% {
            opacity: 1;
            transform: translate(-50%,-50%) scale(1);
          }
        }
      `}</style>
    </main>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  page: {
    position: "relative",
    width: "100%",
    minHeight: "100dvh",
    overflow: "hidden",
    background:
      "linear-gradient(180deg,#E9F8FF,#FFF1C8)",
    fontFamily: "Tajawal, system-ui, sans-serif",
  },
  background: {
    position: "fixed",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(4px) brightness(.82)",
    transform: "scale(1.04)",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background:
      "linear-gradient(180deg,rgba(230,248,255,.86),rgba(255,241,199,.95))",
  },
  content: {
    position: "relative",
    zIndex: 2,
    width: "min(900px,100%)",
    minHeight: "100dvh",
    margin: "0 auto",
    padding: "14px 14px 130px",
    boxSizing: "border-box",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "52px 1fr auto",
    alignItems: "center",
    gap: 10,
  },
  soundButton: {
    width: 50,
    height: 50,
    border: "4px solid #FFFFFF",
    borderRadius: "50%",
    background: C.gold,
    color: "#FFFFFF",
    fontSize: 22,
    boxShadow:
      "0 8px 18px rgba(127,77,0,.22)",
  },
  progressIcons: {
    display: "flex",
    justifyContent: "center",
    gap: 7,
  },
  progressIcon: {
    display: "inline-grid",
    placeItems: "center",
    width: 27,
    height: 27,
    fontSize: 22,
    transition: "all .2s ease",
  },
  counter: {
    minWidth: 70,
    padding: "7px 13px",
    borderRadius: 999,
    background: C.navy,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 900,
    textAlign: "center",
  },
  mission: {
    width: "fit-content",
    margin: "12px auto",
    padding: "8px 17px",
    border: `3px solid ${C.gold}`,
    borderRadius: 999,
    background: "rgba(255,255,255,.94)",
    color: C.navyDeep,
    fontSize: 17,
    fontWeight: 950,
    boxShadow:
      "0 8px 20px rgba(53,71,91,.13)",
  },
  compareArea: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1fr) 38px minmax(0,1fr)",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  visualCard: {
    position: "relative",
    overflow: "hidden",
    minWidth: 0,
    border: "4px solid",
    borderRadius: 25,
    background: "rgba(255,255,255,.96)",
    boxShadow:
      "0 14px 30px rgba(29,63,87,.17)",
  },
  visualImage: {
    display: "block",
    width: "100%",
    aspectRatio: "1 / 1.08",
    objectFit: "contain",
    background:
      "linear-gradient(180deg,#DFF5FF,#FFF2C7)",
  },
  visualLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    minHeight: 52,
    padding: "7px 5px",
    color: C.navyDeep,
    fontSize: "clamp(13px,3.5vw,19px)",
    fontWeight: 950,
    textAlign: "center",
  },
  sideMarker: {
    display: "inline-grid",
    placeItems: "center",
    width: 27,
    height: 27,
    flex: "0 0 auto",
    borderRadius: "50%",
    background: C.navy,
    color: "#FFFFFF",
    fontSize: 14,
  },
  visualBadge: {
    position: "absolute",
    zIndex: 2,
    top: 9,
    right: 9,
    padding: "5px 9px",
    borderRadius: 999,
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: 900,
    boxShadow:
      "0 5px 12px rgba(0,0,0,.15)",
  },
  legacyGroup: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    minHeight: 180,
    padding: 12,
    border: `3px solid ${C.gold}`,
    borderRadius: 24,
    background: "#FFFFFF",
  },
  compareSymbol: {
    display: "grid",
    placeItems: "center",
    color: C.navy,
    fontSize: 30,
    fontWeight: 1000,
  },
  hint: {
    width: "fit-content",
    margin: "10px auto 0",
    padding: "7px 13px",
    borderRadius: 14,
    background: "rgba(27,58,107,.09)",
    color: C.navy,
    fontSize: 14,
    fontWeight: 850,
    textAlign: "center",
  },
  questionBox: {
    marginTop: 12,
    padding: "13px 14px",
    border: `3px solid ${C.gold}`,
    borderRadius: 22,
    background: "rgba(255,255,255,.97)",
    color: C.navyDeep,
    fontSize: "clamp(19px,4.9vw,29px)",
    fontWeight: 950,
    lineHeight: 1.65,
    textAlign: "center",
    boxShadow:
      "0 9px 20px rgba(29,63,87,.12)",
  },
  word: {
    display: "inline-block",
    margin: "0 2px",
    transition: "all .22s ease",
  },
  options: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
    gap: 10,
    marginTop: 13,
  },
  optionButton: {
    minHeight: 68,
    padding: "11px 8px",
    border: "4px solid",
    borderRadius: 22,
    color: C.navyDeep,
    fontFamily: "Tajawal, sans-serif",
    fontSize: "clamp(16px,4.3vw,23px)",
    fontWeight: 950,
    boxShadow:
      "0 9px 18px rgba(29,63,87,.12)",
    opacity: 0,
    animation:
      "premiumOptionIn .42s ease forwards",
  },
  feedbackPill: {
    position: "fixed",
    zIndex: 1000,
    top: "48%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    minWidth: 250,
    padding: "18px 28px",
    border: "6px solid rgba(255,255,255,.92)",
    borderRadius: 999,
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: 1000,
    textAlign: "center",
    boxShadow:
      "0 18px 42px rgba(0,0,0,.27)",
    animation:
      "premiumFeedback .38s cubic-bezier(.34,1.56,.64,1)",
  },
  coach: {
    position: "fixed",
    zIndex: 999,
    left: 16,
    right: 16,
    bottom: 88,
    padding: "12px 15px",
    border: "3px solid",
    borderRadius: 22,
    background: "rgba(255,255,255,.97)",
    color: C.navyDeep,
    fontSize: 17,
    fontWeight: 900,
    textAlign: "center",
    boxShadow:
      "0 12px 28px rgba(0,0,0,.17)",
  },
};
