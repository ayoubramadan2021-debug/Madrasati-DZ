import {
  useEffect,
  useState,
} from "react";

import UnifiedExerciseFeedbackV2 from
  "../components/UnifiedExerciseFeedbackV2";

import type {
  Lesson52PulseHotspotItem,
  Lesson52PulseSpotId,
} from "../content/lesson52_pulse_hotspot_types";

type Props = {
  items: Lesson52PulseHotspotItem[];
  audio_base: string;
  missionTitle?: string;
  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

const FEEDBACK_CORRECT =
  "/audio/v2_feedback/correct.mp3";

const FEEDBACK_RETRY =
  "/audio/v2_feedback/retry.mp3";

const SPOTS: Array<{
  id: Lesson52PulseSpotId;
  label: string;
  emoji: string;
  top: string;
  left: string;
}> = [
  {
    id: "head",
    label: "الرَّأْسُ",
    emoji: "🧠",
    top: "10%",
    left: "50%",
  },
  {
    id: "chest",
    label: "الصَّدْرُ",
    emoji: "❤️",
    top: "37%",
    left: "43%",
  },
  {
    id: "wrist",
    label: "الْمِعْصَمُ",
    emoji: "✋",
    top: "53%",
    left: "76%",
  },
  {
    id: "knee",
    label: "الرُّكْبَةُ",
    emoji: "🦵",
    top: "75%",
    left: "44%",
  },
];

export default function
Lesson52PulseHotspotExerciseV2({
  items,
  audio_base,
  missionTitle =
    "الْمَهَمَّةُ الرَّابِعَةُ: أُحَدِّدُ مَوْضِعَ النَّبْضِ",
  onComplete,
}: Props) {
  const [index, setIndex] =
    useState(0);

  const [feedback, setFeedback] =
    useState<
      "idle" | "correct" | "wrong"
    >("idle");

  const [selected, setSelected] =
    useState<
      Lesson52PulseSpotId | null
    >(null);

  const item = items[index];

  useEffect(() => {
    if (!item) {
      return;
    }

    const timer = window.setTimeout(
      () => {
        const audio = new Audio(
          `${audio_base}/${item.question_audio_key}.mp3`,
        );

        audio.play().catch(() => {
          // الصوت سيضاف في المرحلة التالية.
        });
      },
      500,
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    audio_base,
    item,
  ]);

  if (!item) {
    return null;
  }

  const chooseSpot = (
    spot: Lesson52PulseSpotId,
  ) => {
    if (feedback !== "idle") {
      return;
    }

    setSelected(spot);

    const correct =
      spot === item.correct_spot;

    setFeedback(
      correct ? "correct" : "wrong",
    );

    new Audio(
      correct
        ? FEEDBACK_CORRECT
        : FEEDBACK_RETRY,
    )
      .play()
      .catch(() => {});

    if (correct) {
      window.setTimeout(() => {
        if (index < items.length - 1) {
          setIndex(
            current => current + 1,
          );

          setSelected(null);
          setFeedback("idle");
        } else {
          onComplete?.(
            items.length,
            items.length,
          );
        }
      }, 1500);

      return;
    }

    window.setTimeout(() => {
      setSelected(null);
      setFeedback("idle");
    }, 1300);
  };

  return (
    <main
      dir="rtl"
      data-testid="lesson52-pulse-hotspot"
      style={{
        minHeight: "100dvh",
        padding:
          "18px 14px 34px",
        boxSizing: "border-box",

        background:
          "linear-gradient(180deg,#EAF7FF,#FFF8E8)",

        fontFamily:
          '"Tajawal", Arial, sans-serif',

        color: "#17365F",
      }}
    >
      <section
        style={{
          width: "min(760px,100%)",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            padding: "14px 18px",
            borderRadius: 22,

            background:
              "rgba(255,255,255,.96)",

            border:
              "3px solid #E8A020",

            textAlign: "center",

            boxShadow:
              "0 10px 24px rgba(23,54,95,.14)",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 900,
              color: "#8A5A00",
            }}
          >
            {missionTitle}
          </div>

          <div
            style={{
              marginTop: 8,
              fontSize:
                "clamp(20px,5vw,29px)",
              fontWeight: 1000,
              lineHeight: 1.7,
            }}
          >
            {item.question}
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 15,
              fontWeight: 800,
              color: "#5B6F86",
            }}
          >
            السُّؤَالُ {index + 1}
            {" / "}
            {items.length}
          </div>
        </header>

        <section
          aria-label="اختر موضع النبض"
          style={{
            position: "relative",

            width:
              "min(390px,92vw)",
            height: 470,

            margin:
              "18px auto 0",

            overflow: "hidden",

            borderRadius: 34,

            border:
              "4px solid #E8A020",

            background:
              "linear-gradient(180deg,#FFFFFF,#E9F7FF)",

            boxShadow:
              "0 16px 34px rgba(23,54,95,.18)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "15%",
              left: "50%",
              transform:
                "translateX(-50%)",

              fontSize: 230,
              lineHeight: 1,
              opacity: 0.9,
              filter:
                "drop-shadow(0 12px 16px rgba(0,0,0,.14))",
            }}
          >
            🧍
          </div>

          {SPOTS.map(spot => {
            const active =
              selected === spot.id;

            const correct =
              active &&
              spot.id ===
                item.correct_spot;

            return (
              <button
                key={spot.id}
                type="button"
                aria-label={spot.label}
                onClick={() =>
                  chooseSpot(spot.id)
                }
                style={{
                  position: "absolute",
                  top: spot.top,
                  left: spot.left,

                  transform:
                    "translate(-50%,-50%)",

                  width: 72,
                  minHeight: 72,

                  padding: 5,

                  borderRadius: "50%",

                  border:
                    active
                      ? `5px solid ${
                          correct
                            ? "#20A567"
                            : "#EF4444"
                        }`
                      : "4px solid #FFFFFF",

                  background:
                    active
                      ? correct
                        ? "#C9F7DF"
                        : "#FFD4D4"
                      : "rgba(23,54,95,.88)",

                  color: "#FFFFFF",

                  boxShadow:
                    "0 8px 18px rgba(0,0,0,.25)",

                  cursor: "pointer",
                  touchAction: "manipulation",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "block",
                    fontSize: 27,
                    lineHeight: 1,
                  }}
                >
                  {spot.emoji}
                </span>

                <span
                  style={{
                    display: "block",
                    marginTop: 3,
                    fontSize: 11,
                    fontWeight: 1000,
                    color:
                      active
                        ? "#17365F"
                        : "#FFFFFF",
                  }}
                >
                  {spot.label}
                </span>
              </button>
            );
          })}
        </section>

        <div
          style={{
            width: "min(560px,100%)",
            margin: "14px auto 0",

            padding: "11px 14px",

            borderRadius: 18,

            background:
              "rgba(255,255,255,.95)",

            border:
              "2px solid rgba(232,160,32,.55)",

            textAlign: "center",
            fontSize: 16,
            fontWeight: 900,
          }}
        >
          💡 {item.hint}
        </div>
      </section>

      <UnifiedExerciseFeedbackV2
        feedback={feedback}
        successText="🌟 أَحْسَنْتَ!"
        retryText="حَاوِلْ مَرَّةً أُخْرَى ✨"
      />
    </main>
  );
}
