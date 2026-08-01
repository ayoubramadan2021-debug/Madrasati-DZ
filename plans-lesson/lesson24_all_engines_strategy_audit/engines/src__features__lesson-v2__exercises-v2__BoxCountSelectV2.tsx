import { useEffect, useState } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
import EmojiIcon from "../components/EmojiIcon";

export type BoxCountSelectItem = {
  inside_items: string[];
  outside_items?: string[];
  question: string;
  question_audio_key: string;
  options: string[];
  correct: string;
  box_title?: string;
};

interface Props {
  items: BoxCountSelectItem[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
}

const C = {
  navy: "#1B3A6B",
  navyDeep: "#152C50",
  gold: "#E8A020",
  green: "#1FA463",
  greenSoft: "#D7F0E2",
  red: "#E05B49",
  redSoft: "#F8DAD5",
  cream: "#FFF8EC",
};

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

export default function BoxCountSelectV2({ items, audio_base, onComplete }: Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);

  const karaoke = useKaraoke(audio_base);
  const item = items[itemIdx];

  useEffect(() => {
    items.forEach(async (it) => {
      const t = await loadTimings(audio_base, it.question_audio_key);
      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio_base]);

  useEffect(() => {
    karaoke.stop();
    setSelectedOption(null);
    setFeedbackState("idle");
    setLocked(false);

    if (!item) return;
    const t = timings[item.question_audio_key];
    if (!t) return;

    const timer = window.setTimeout(() => {
      karaoke.play(item.question_audio_key, t);
    }, 500);

    return () => {
      window.clearTimeout(timer);
      karaoke.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, timings]);

  const playFeedback = (correct: boolean) => {
    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
    a.play().catch(() => {});
  };

  const replayQuestion = () => {
    const t = timings[item.question_audio_key];
    if (t) {
      karaoke.stop();
      karaoke.play(item.question_audio_key, t);
    }
  };

  const handleSelect = (option: string) => {
    if (locked || feedbackState === "correct") return;

    setSelectedOption(option);
    const isCorrect = option === item.correct;

    if (isCorrect) {
      setFeedbackState("correct");
      setLocked(true);
      playFeedback(true);
      karaoke.stop();

      const newScore = score + 1;
      setScore(newScore);

      window.setTimeout(() => {
        if (itemIdx + 1 < items.length) {
          setItemIdx(itemIdx + 1);
        } else {
          onComplete?.(newScore, items.length);
        }
      }, 1400);
    } else {
      setFeedbackState("wrong");
      playFeedback(false);
      window.setTimeout(() => {
        setFeedbackState("idle");
        setSelectedOption(null);
      }, 1200);
    }
  };

  if (!item) return null;

  const words = timings[item.question_audio_key];
  const isActive = karaoke.activeKey === item.question_audio_key;
  const inside = item.inside_items;
  const outside = item.outside_items ?? [];
  const insideCount = inside.length;

  const coachText =
    feedbackState === "correct"
      ? "رائع! عرفتَ كم بقي داخل الصندوق 🎉"
      : feedbackState === "wrong"
      ? "اقتربت! انظر داخل الصندوق فقط 👏"
      : "عُدَّ الكرات داخل الصندوق ثم اختر العدد الصحيح 📦";

  const renderBall = (e: string, idx: number, size = 54) => (
    <div
      key={`${e}-${idx}`}
      style={{
        width: size + 8,
        height: size + 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "ballPop .35s ease both",
        animationDelay: `${idx * 0.07}s`,
        filter: "drop-shadow(0 7px 10px rgba(0,0,0,.18))",
      }}
    >
      <EmojiIcon emoji={e} size={size} />
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(180deg,#F3ECFB 0%,#E9DDF7 100%)",
        fontFamily: "Tajawal, sans-serif",
        direction: "rtl",
        maxWidth: 520,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px" }}>
        <div
          style={{
            background: C.navy,
            color: "#fff",
            borderRadius: 16,
            padding: "6px 16px",
            fontWeight: 900,
            fontSize: 18,
          }}
        >
          <span dir="ltr">{itemIdx + 1} / {items.length}</span>
        </div>

        <button
          onClick={replayQuestion}
          style={{
            background: C.gold,
            border: "4px solid #fff",
            borderRadius: "50%",
            width: 56,
            height: 56,
            fontSize: 24,
            cursor: "pointer",
            boxShadow: "0 8px 18px rgba(232,160,32,.35)",
          }}
        >
          🔊
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <div
          style={{
            background: "rgba(255,255,255,.92)",
            color: C.navyDeep,
            border: `2px solid ${C.gold}`,
            borderRadius: 999,
            padding: "8px 18px",
            fontSize: 18,
            fontWeight: 900,
            boxShadow: "0 6px 16px rgba(0,0,0,.10)",
          }}
        >
          📦 مهمة الصندوق {itemIdx + 1}
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div
          style={{
            background: "#FFFBEF",
            border: `5px solid ${C.gold}`,
            borderRadius: 30,
            padding: "14px",
            boxShadow: "0 12px 28px rgba(0,0,0,.13)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: 28,
              fontWeight: 1000,
              color: C.navyDeep,
              marginBottom: 12,
            }}
          >
            {item.box_title || "صندوق الكرات"}
          </div>

          <div
            style={{
              position: "relative",
              minHeight: 290,
              borderRadius: 28,
              background: "linear-gradient(180deg,#FFF7D8 0%,#FFE7A2 100%)",
              border: `4px solid ${C.gold}`,
              overflow: "hidden",
              padding: "18px 12px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 25% 15%, rgba(255,255,255,.75), transparent 26%), radial-gradient(circle at 80% 20%, rgba(255,255,255,.45), transparent 22%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                justifyContent: "center",
                marginTop: 6,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 260,
                  height: 170,
                  marginTop: 16,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -24,
                    left: 28,
                    width: 96,
                    height: 42,
                    background: "linear-gradient(180deg,#F0B36F,#C98142)",
                    border: "4px solid #9C6231",
                    borderBottom: "none",
                    borderRadius: "18px 18px 4px 4px",
                    transform: "rotate(-18deg)",
                    transformOrigin: "bottom right",
                    boxShadow: "0 8px 12px rgba(0,0,0,.12)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -24,
                    right: 28,
                    width: 96,
                    height: 42,
                    background: "linear-gradient(180deg,#F0B36F,#C98142)",
                    border: "4px solid #9C6231",
                    borderBottom: "none",
                    borderRadius: "18px 18px 4px 4px",
                    transform: "rotate(18deg)",
                    transformOrigin: "bottom left",
                    boxShadow: "0 8px 12px rgba(0,0,0,.12)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 22,
                    left: 30,
                    right: 30,
                    height: 34,
                    background: "#8E5528",
                    borderRadius: "50%",
                    opacity: 0.45,
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 42,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(180deg,#E4A05A,#B86F34)",
                    border: "5px solid #8E5528",
                    borderRadius: "18px 18px 34px 34px",
                    boxShadow: "inset 0 -20px 0 rgba(130,70,30,.20), 0 14px 22px rgba(0,0,0,.16)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 54,
                    left: 18,
                    right: 18,
                    height: 30,
                    background: "rgba(255,255,255,.18)",
                    borderRadius: "50%",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 70,
                    left: 16,
                    right: 16,
                    minHeight: 80,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {insideCount > 0 ? (
                    inside.map((e, i) => renderBall(e, i, insideCount >= 3 ? 47 : 54))
                  ) : (
                    <div
                      style={{
                        color: "#fff",
                        fontSize: 24,
                        fontWeight: 1000,
                        textShadow: "0 2px 4px rgba(0,0,0,.25)",
                      }}
                    >
                      فَارِغٌ
                    </div>
                  )}
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    color: "#fff",
                    fontSize: 22,
                    fontWeight: 1000,
                    textShadow: "0 2px 5px rgba(0,0,0,.25)",
                  }}
                >
                  داخل الصندوق
                </div>
              </div>
            </div>

            {outside.length > 0 && (
              <div
                style={{
                  position: "relative",
                  zIndex: 3,
                  marginTop: 12,
                  background: "rgba(255,255,255,.72)",
                  border: "3px dashed rgba(27,58,107,.25)",
                  borderRadius: 22,
                  padding: "10px 8px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: C.navyDeep,
                    fontWeight: 1000,
                    fontSize: 19,
                    marginBottom: 6,
                  }}
                >
                  خارج الصندوق
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {outside.map((e, i) => renderBall(e, i, 43))}
                </div>
              </div>
            )}

            {insideCount === 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  zIndex: 4,
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  background: "#fff",
                  border: `4px solid ${C.gold}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.gold,
                  fontSize: 42,
                  fontWeight: 1000,
                  boxShadow: "0 8px 18px rgba(0,0,0,.14)",
                }}
              >
                0
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 16px 0" }}>
        <div
          onClick={replayQuestion}
          style={{
            background: "#fff",
            borderRadius: 20,
            border: `3px solid ${C.gold}`,
            padding: "14px 16px",
            textAlign: "center",
            fontSize: 20,
            fontWeight: 800,
            lineHeight: 1.8,
            boxShadow: "0 6px 16px rgba(0,0,0,.10)",
            cursor: "pointer",
          }}
        >
          {words
            ? words.map((w, i) => {
                const isShown = karaoke.activeKey ? karaoke.shown.has(i) : true;
                const isCurrent = isActive && karaoke.currentIdx === i;
                return (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      margin: "0 2px",
                      opacity: isShown ? 1 : 0.35,
                      color: isCurrent ? C.gold : C.navyDeep,
                      transform: isCurrent ? "translateY(-2px) scale(1.08)" : "scale(1)",
                      transition: "all .25s ease",
                    }}
                  >
                    {w.text}{" "}
                  </span>
                );
              })
            : item.question}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
          padding: "16px 16px 100px",
        }}
      >
        {item.options.map((opt, optionIndex) => {
          const isSelected = selectedOption === opt;
          const showAsCorrect = isSelected && feedbackState === "correct";
          const showAsWrong = isSelected && feedbackState === "wrong";

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={locked}
              style={{
                minHeight: 86,
                borderRadius: 22,
                fontSize: 34,
                fontWeight: 1000,
                fontFamily: "Tajawal, sans-serif",
                background: showAsCorrect
                  ? C.greenSoft
                  : showAsWrong
                  ? C.redSoft
                  : "#fff",
                color: C.navy,
                border: `4px solid ${
                  showAsCorrect ? C.green : showAsWrong ? C.red : C.gold
                }`,
                boxShadow: "0 8px 16px rgba(0,0,0,.10)",
                cursor: "pointer",
                transition: "all .25s ease",
                animation: "optionPopIn .35s ease both",
                animationDelay: `${optionIndex * 0.07}s`,
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {feedbackState !== "idle" && (
        <div
          style={{
            position: "fixed",
            left: 18,
            right: 18,
            bottom: 92,
            zIndex: 999,
            background: "rgba(255,255,255,.97)",
            color: C.navyDeep,
            border: `3px solid ${feedbackState === "correct" ? C.green : C.gold}`,
            borderRadius: 22,
            padding: "12px 16px",
            textAlign: "center",
            fontSize: 18,
            fontWeight: 900,
            boxShadow: "0 10px 26px rgba(0,0,0,.18)",
            animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {coachText}
        </div>
      )}

      <style>{`
        @keyframes optionPopIn {
          0% { opacity: 0; transform: translateY(14px) scale(.94); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes feedbackPop {
          0% { opacity: 0; transform: scale(.7); }
          60% { opacity: 1; transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ballPop {
          0% { opacity: 0; transform: translateY(10px) scale(.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
