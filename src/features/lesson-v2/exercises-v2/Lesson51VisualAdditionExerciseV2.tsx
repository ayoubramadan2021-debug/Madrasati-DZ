import UnifiedExerciseFeedbackV2 from
  "../components/UnifiedExerciseFeedbackV2";

import {
  useEffect,
  useState,
} from "react";

import {
  loadTimings,
  useKaraoke,
  type WordTiming,
} from "../useKaraoke";

import type {
  Lesson51VisualAdditionItem,
} from "../content/lesson51_visual_addition_types";

export type Lesson51VisualAdditionExerciseV2Props = {
  items:
    readonly Lesson51VisualAdditionItem[];

  audio_base: string;
  missionTitle: string;

  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

const CORRECT_AUDIO =
  "/audio/v2_feedback/correct.mp3";

const RETRY_AUDIO =
  "/audio/v2_feedback/retry.mp3";

type FeedbackState =
  | "idle"
  | "correct"
  | "wrong";

const COLORS = {
  navy: "#173B6C",
  navyDeep: "#0D284D",
  gold: "#F0B51A",
  cream: "#FFF9EC",
  green: "#20A66A",
  red: "#D9534F",
};

function playFeedback(
  correct: boolean,
) {
  const audio = new Audio(
    correct
      ? CORRECT_AUDIO
      : RETRY_AUDIO,
  );

  audio.play().catch(() => {});
}

function EmojiGroup({
  count,
  emoji,
  label,
}: {
  count: number;
  emoji: string;
  label: string;
}) {
  const columns =
    count >= 10
      ? 5
      : count >= 7
        ? 4
        : 3;

  const emojiSize =
    count >= 10
      ? "clamp(18px,4.2vw,27px)"
      : count >= 7
        ? "clamp(21px,4.8vw,31px)"
        : "clamp(24px,5.5vw,35px)";

  return (
    <section
      data-testid="lesson51-bounded-emoji-group"
      aria-label={`${count} ${label}`}
      style={{
        flex: "1 1 0",
        width: 0,
        minWidth: 0,
        minHeight: 170,

        overflow: "hidden",

        background:
          "linear-gradient(180deg,#FFFFFF,#FFF9ED)",

        border:
          `3px solid ${COLORS.gold}`,

        borderRadius: 24,

        padding: "12px 8px",
        boxSizing: "border-box",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        boxShadow:
          "0 8px 18px rgba(15,40,77,.12)",
      }}
    >
      <div
        dir="ltr"
        style={{
          flex: "0 0 auto",

          fontSize:
            "clamp(30px,7vw,43px)",

          lineHeight: 1,
          fontWeight: 1000,
          color: COLORS.navy,

          marginBottom: 10,
        }}
      >
        {count}
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,

          display: "grid",

          gridTemplateColumns:
            `repeat(${columns}, minmax(0, 1fr))`,

          justifyItems: "center",
          alignItems: "center",

          columnGap:
            count >= 10
              ? 1
              : 3,

          rowGap:
            count >= 10
              ? 3
              : 5,

          overflow: "hidden",
          boxSizing: "border-box",

          paddingInline: 2,
        }}
      >
        {Array.from({
          length: count,
        }).map((_, index) => (
          <span
            key={index}
            aria-hidden="true"
            style={{
              display: "block",

              width: "100%",
              minWidth: 0,
              maxWidth: "100%",

              overflow: "hidden",

              textAlign: "center",

              fontSize: emojiSize,
              lineHeight: 1.08,

              filter:
                "drop-shadow(0 3px 3px rgba(0,0,0,.12))",
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </section>
  );
}

export default function
Lesson51VisualAdditionExerciseV2({
  items,
  audio_base,
  missionTitle,
  onComplete,
}: Lesson51VisualAdditionExerciseV2Props) {
  const [itemIndex, setItemIndex] =
    useState(0);

  const [built, setBuilt] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [feedback, setFeedback] =
    useState<FeedbackState>("idle");

  const [locked, setLocked] =
    useState(false);

  const [timings, setTimings] =
    useState<
      Record<string, WordTiming[]>
    >({});

  const karaoke =
    useKaraoke(audio_base);

  const item =
    items[itemIndex];

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      const loaded:
        Record<string, WordTiming[]> = {};

      for (const current of items) {
        const result =
          await loadTimings(
            audio_base,
            current.question_audio_key,
          );

        if (result) {
          loaded[
            current.question_audio_key
          ] = result;
        }
      }

      if (!cancelled) {
        setTimings(loaded);
      }
    }

    void loadAll();

    return () => {
      cancelled = true;
    };
  }, [
    audio_base,
    items,
  ]);

  useEffect(() => {
    karaoke.stop();

    setBuilt(0);
    setFeedback("idle");
    setLocked(false);

    if (!item) return;

    const words =
      timings[
        item.question_audio_key
      ];

    if (!words) return;

    const timer =
      window.setTimeout(() => {
        karaoke.play(
          item.question_audio_key,
          words,
        );
      }, 450);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    itemIndex,
    item,
    timings,
  ]);

  if (!item) {
    return null;
  }

  const words =
    timings[
      item.question_audio_key
    ] ?? [];

  const active =
    karaoke.activeKey ===
    item.question_audio_key;

  const addOne = () => {
    if (locked) return;

    setFeedback("idle");

    setBuilt(
      (current) =>
        Math.min(
          19,
          current + 1,
        ),
    );
  };

  const removeOne = () => {
    if (locked) return;

    setFeedback("idle");

    setBuilt(
      (current) =>
        Math.max(
          0,
          current - 1,
        ),
    );
  };

  const clearBuilt = () => {
    if (locked) return;

    setBuilt(0);
    setFeedback("idle");
  };

  const validate = () => {
    if (locked || built === 0) {
      return;
    }

    karaoke.stop();

    if (
      built === item.correct_total
    ) {
      const nextScore =
        score + 1;

      setScore(nextScore);
      setFeedback("correct");
      setLocked(true);

      playFeedback(true);

      window.setTimeout(() => {
        if (
          itemIndex + 1 <
          items.length
        ) {
          setItemIndex(
            (current) =>
              current + 1,
          );

          return;
        }

        onComplete?.(
          nextScore,
          items.length,
        );
      }, 1500);

      return;
    }

    setFeedback("wrong");
    playFeedback(false);

    window.setTimeout(() => {
      setFeedback("idle");
    }, 1300);
  };

  const replay = () => {
    const currentTimings =
      timings[
        item.question_audio_key
      ];

    if (currentTimings) {
      karaoke.play(
        item.question_audio_key,
        currentTimings,
      );
    }
  };

  return (
    <main
      data-testid=
        "lesson51-visual-addition-engine"
      dir="rtl"
      style={{
        position: "relative",
        minHeight: "100dvh",
        boxSizing: "border-box",
        overflowY: "auto",
        padding:
          "18px 16px 110px",
        fontFamily:
          "Tajawal, sans-serif",
        color: COLORS.navyDeep,
        background: COLORS.cream,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            `url('${item.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter:
            "blur(3px) brightness(.72)",
          transform: "scale(1.03)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(180deg,rgba(255,249,236,.12),rgba(255,241,204,.95) 78%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div
            dir="ltr"
            style={{
              minWidth: 92,
              textAlign: "center",
              background: "#FFF",
              border:
                `4px solid ${COLORS.gold}`,
              borderRadius: 999,
              padding: "10px 14px",
              fontSize: 25,
              fontWeight: 1000,
              boxShadow:
                "0 7px 16px rgba(0,0,0,.14)",
            }}
          >
            {itemIndex + 1}
            {" / "}
            {items.length}
          </div>

          <div
            aria-label="تقدم المهمة"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              gap: 7,
            }}
          >
            {items.map(
              (_, index) => {
                const completed =
                  index < itemIndex;

                const current =
                  index ===
                  itemIndex;

                return (
                  <span
                    key={index}
                    style={{
                      width:
                        current
                          ? 38
                          : 15,
                      height: 15,
                      borderRadius: 999,
                      background:
                        completed
                          ? COLORS.green
                          : current
                            ? COLORS.gold
                            : "#F8EED6",
                      boxShadow:
                        "0 2px 7px rgba(0,0,0,.12)",
                      transition:
                        "all .25s ease",
                    }}
                  />
                );
              },
            )}
          </div>

          <button
            type="button"
            onClick={replay}
            aria-label=
              "إعادة سماع السؤال"
            style={{
              width: 59,
              height: 59,
              borderRadius: "50%",
              border: "5px solid #FFF",
              background:
                COLORS.gold,
              fontSize: 27,
              cursor: "pointer",
              boxShadow:
                "0 7px 16px rgba(0,0,0,.16)",
            }}
          >
            🔊
          </button>
        </header>

        <div
          style={{
            width: "fit-content",
            maxWidth: "92%",
            margin:
              "0 auto 14px",
            padding: "9px 17px",
            background: "#FFF",
            border:
              `3px solid ${COLORS.gold}`,
            borderRadius: 999,
            textAlign: "center",
            fontSize:
              "clamp(17px,4.5vw,22px)",
            fontWeight: 1000,
            boxShadow:
              "0 7px 17px rgba(0,0,0,.12)",
          }}
        >
          {missionTitle}
        </div>

        <section
          style={{
            background:
              "rgba(255,255,255,.97)",
            border:
              `4px solid ${COLORS.gold}`,
            borderRadius: 30,
            padding: "16px 12px",
            boxShadow:
              "0 12px 28px rgba(0,0,0,.16)",
            marginBottom: 14,
          }}
        >
          <div
            dir="ltr"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              gap: 7,
              width: "100%",
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <EmojiGroup
              count={item.left_count}
              emoji={item.item_emoji}
              label={item.item_label}
            />

            <div
              aria-label="زائد"
              style={{
                flex: "0 0 34px",
                width: 34,
                minWidth: 34,
                textAlign: "center",
                fontSize:
                  "clamp(35px,8vw,52px)",
                lineHeight: 1,
                fontWeight: 1000,
                color: COLORS.navy,
              }}
            >
              +
            </div>

            <EmojiGroup
              count={item.right_count}
              emoji={item.item_emoji}
              label={item.item_label}
            />
          </div>

          <div
            dir="ltr"
            style={{
              marginTop: 13,
              textAlign: "center",
              fontSize:
                "clamp(38px,10vw,61px)",
              fontWeight: 1000,
              color: COLORS.navy,
            }}
          >
            {item.left_count}
            {" + "}
            {item.right_count}
            {" = ?"}
          </div>
        </section>

        <section
          style={{
            background:
              "rgba(255,255,255,.97)",
            border:
              `3px solid ${COLORS.gold}`,
            borderRadius: 25,
            padding: "13px 12px",
            marginBottom: 14,
            textAlign: "center",
            boxShadow:
              "0 8px 20px rgba(0,0,0,.12)",
          }}
        >
          <div
            style={{
              minHeight: 46,
              fontSize:
                "clamp(20px,5vw,27px)",
              lineHeight: 1.65,
              fontWeight: 1000,
            }}
          >
            {words.length > 0
              ? words.map(
                  (word, index) => {
                    const shown =
                      active
                        ? karaoke.shown
                            .has(index)
                        : true;

                    const current =
                      active &&
                      karaoke.currentIdx ===
                        index;

                    return (
                      <span
                        key={
                          `${word.text}-${index}`
                        }
                        style={{
                          display:
                            "inline-block",
                          marginInline: 3,
                          opacity:
                            shown
                              ? 1
                              : 0.18,
                          color:
                            current
                              ? COLORS.gold
                              : COLORS.navy,
                          transform:
                            current
                              ? "scale(1.08)"
                              : "scale(1)",
                          transition:
                            "all .15s ease",
                        }}
                      >
                        {word.text}
                      </span>
                    );
                  },
                )
              : item.question}
          </div>
        </section>

        <section
          style={{
            background:
              "rgba(255,255,255,.97)",
            border:
              feedback === "correct"
                ? `4px solid ${COLORS.green}`
                : feedback === "wrong"
                  ? `4px solid ${COLORS.red}`
                  : `4px dashed ${COLORS.gold}`,
            borderRadius: 29,
            padding: "15px 12px",
            textAlign: "center",
            boxShadow:
              "0 10px 24px rgba(0,0,0,.13)",
          }}
        >
          <div
            style={{
              fontSize:
                "clamp(19px,4.8vw,25px)",
              fontWeight: 1000,
              marginBottom: 10,
            }}
          >
            أَبْنِي نَاتِجَ الْجَمْعِ
          </div>

          <div
            dir="ltr"
            style={{
              fontSize:
                "clamp(42px,11vw,68px)",
              lineHeight: 1,
              color: COLORS.navy,
              fontWeight: 1000,
              marginBottom: 11,
            }}
          >
            {built === 0
              ? "?"
              : built}
          </div>

          <div
            style={{
              minHeight: 88,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent:
                "center",
              gap: 4,
              marginBottom: 13,
            }}
          >
            {built === 0 ? (
              <span
                style={{
                  color: "#B7AA8C",
                  fontSize: 20,
                  fontWeight: 900,
                }}
              >
                أَضِفْ عُنْصُرًا
              </span>
            ) : (
              Array.from({
                length: built,
              }).map((_, index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  style={{
                    fontSize:
                      built >= 16
                        ? "clamp(24px,5.5vw,33px)"
                        : "clamp(27px,6.5vw,38px)",
                    lineHeight: 1,
                    animation:
                      "lesson51AddPop .18s ease",
                  }}
                >
                  {item.item_emoji}
                </span>
              ))
            )}
          </div>

          <div
            dir="ltr"
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1.4fr 1fr",
              gap: 9,
              marginBottom: 10,
            }}
          >
            <button
              type="button"
              onClick={removeOne}
              disabled={
                locked ||
                built === 0
              }
              aria-label=
                "حذف عنصر واحد"
              style={{
                minHeight: 58,
                border:
                  `3px solid ${COLORS.gold}`,
                borderRadius: 18,
                background: "#FFF",
                color: COLORS.navy,
                fontSize: 31,
                fontWeight: 1000,
                opacity:
                  built === 0
                    ? 0.45
                    : 1,
              }}
            >
              −1
            </button>

            <button
              type="button"
              onClick={addOne}
              disabled={
                locked ||
                built >= 19
              }
              aria-label=
                "إضافة عنصر واحد"
              style={{
                minHeight: 58,
                border:
                  `3px solid ${COLORS.gold}`,
                borderRadius: 18,
                background:
                  COLORS.gold,
                color:
                  COLORS.navyDeep,
                fontSize: 27,
                fontWeight: 1000,
                boxShadow:
                  "0 6px 14px rgba(240,181,26,.3)",
              }}
            >
              +1 {item.item_emoji}
            </button>

            <button
              type="button"
              onClick={clearBuilt}
              disabled={
                locked ||
                built === 0
              }
              style={{
                minHeight: 58,
                border:
                  `3px solid ${COLORS.gold}`,
                borderRadius: 18,
                background: "#FFF",
                color: COLORS.navy,
                fontSize: 18,
                fontWeight: 1000,
              }}
            >
              مَسْحٌ
            </button>
          </div>

          <button
            type="button"
            onClick={validate}
            disabled={
              locked ||
              built === 0
            }
            style={{
              width: "100%",
              minHeight: 59,
              border: 0,
              borderRadius: 19,
              background:
                built === 0
                  ? "#C8C0AE"
                  : COLORS.navy,
              color: "#FFF",
              fontSize:
                "clamp(20px,5vw,26px)",
              fontWeight: 1000,
              boxShadow:
                "0 7px 16px rgba(23,59,108,.25)",
            }}
          >
            أَتَحَقَّقُ مِنَ النَّاتِجِ
          </button>

        </section>
      </div>

      <div
        data-testid="lesson51-unified-feedback"
        style={{
          display: "contents",
        }}
      >
        <UnifiedExerciseFeedbackV2
          feedback={feedback}
          successText="🌟 أَحْسَنْتَ!"
          retryText="حَاوِلْ مَرَّةً أُخْرَى ✨"
        />
      </div>

      <style>
        {`
          @keyframes lesson51AddPop {
            from {
              opacity: 0;
              transform: scale(.55);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </main>
  );
}
