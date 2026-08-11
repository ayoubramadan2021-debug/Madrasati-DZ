import {
  useEffect,
  useRef,
  useState,
} from "react";

import UnifiedExerciseKaraokeV2
  from "../components/UnifiedExerciseKaraokeV2";

export type RegroupingExchangeChoice = {
  id: string;
  label: string;
  tens: number;
  ones: number;
};

export type RegroupingExchangeItem = {
  id: string;
  mode:
    | "group"
    | "exchange"
    | "represent"
    | "table";
  total: number;
  question: string;
  question_audio_key: string;
  choices: RegroupingExchangeChoice[];
  correct_id: string;
  success: string;
};

type Timing = {
  text: string;
  offset: number;
  duration: number;
};

type Props = {
  items: RegroupingExchangeItem[];
  audio_base: string;
  title: string;
  missionIcon?: string;
  background_image?: string;
  onComplete?: (
    score: number,
    total: number,
  ) => void;
};

const COLORS = {
  navy: "#163968",
  navyDeep: "#0D274B",
  gold: "#E8A020",
  cream: "#FFF9EE",
  green: "#168D58",
  greenSoft: "#DDF5E8",
  red: "#D54B40",
  redSoft: "#FBE3DF",
  blueSoft: "#E7F2FF",
};

function TenRod({
  compact = false,
}: {
  compact?: boolean;
}) {
  const size = compact ? 11 : 17;

  return (
    <div
      aria-label="عشرة"
      style={{
        display: "grid",
        gridTemplateColumns:
          `repeat(2, ${size}px)`,
        gridTemplateRows:
          `repeat(5, ${size}px)`,
        gap: 2,
        padding: compact ? 5 : 7,
        borderRadius: 12,
        background:
          "linear-gradient(180deg,#FFD66B,#E8A020)",
        border:
          "2px solid rgba(117,70,0,.35)",
        boxShadow:
          "0 5px 12px rgba(91,55,0,.18)",
      }}
    >
      {Array.from({ length: 10 }).map(
        (_, index) => (
          <span
            key={index}
            style={{
              borderRadius: 4,
              background: "#FFF4C8",
              border:
                "1px solid rgba(117,70,0,.28)",
            }}
          />
        ),
      )}
    </div>
  );
}

function UnitDot({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <span
      aria-label="وحدة"
      style={{
        width: compact ? 14 : 24,
        height: compact ? 14 : 24,
        borderRadius: "50%",
        background:
          "linear-gradient(145deg,#FFB667,#E47C38)",
        border:
          "2px solid rgba(130,60,15,.25)",
        boxShadow:
          "0 3px 7px rgba(80,35,0,.15)",
      }}
    />
  );
}

function Blocks({
  tens,
  ones,
  compact = false,
}: {
  tens: number;
  ones: number;
  compact?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: compact ? 7 : 12,
      }}
    >
      {Array.from({
        length: tens,
      }).map((_, index) => (
        <TenRod
          key={`ten-${index}`}
          compact={compact}
        />
      ))}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            compact
              ? "repeat(5,14px)"
              : "repeat(5,24px)",
          gap: compact ? 4 : 7,
        }}
      >
        {Array.from({
          length: ones,
        }).map((_, index) => (
          <UnitDot
            key={`one-${index}`}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}

function LooseUnits({
  total,
}: {
  total: number;
}) {
  const groups: number[] = [];
  let remaining = total;

  while (remaining > 0) {
    const amount =
      Math.min(10, remaining);

    groups.push(amount);
    remaining -= amount;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      {groups.map((amount, groupIndex) => (
        <div
          key={groupIndex}
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(5,22px)",
            gap: 6,
            padding: 9,
            borderRadius: 18,
            border:
              "3px dashed rgba(232,160,32,.65)",
            background:
              "rgba(255,255,255,.76)",
          }}
        >
          {Array.from({
            length: amount,
          }).map((_, index) => (
            <UnitDot
              key={index}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function PlaceValueTable() {
  return (
    <div
      style={{
        width: "min(360px,92%)",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: 20,
        border:
          `3px solid ${COLORS.gold}`,
        background: "#FFFFFF",
        boxShadow:
          "0 10px 24px rgba(15,39,75,.12)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: COLORS.blueSoft,
          fontWeight: 1000,
          fontSize: 22,
          color: COLORS.navyDeep,
        }}
      >
        <div
          style={{
            padding: 13,
            borderLeft:
              "1px solid rgba(22,57,104,.2)",
          }}
        >
          العشرات
        </div>

        <div
          style={{
            padding: 13,
          }}
        >
          الوحدات
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          fontSize: 38,
          fontWeight: 1000,
          color: COLORS.gold,
        }}
      >
        <div
          style={{
            padding: 17,
            borderLeft:
              "1px solid rgba(22,57,104,.2)",
          }}
        >
          ؟
        </div>

        <div
          style={{
            padding: 17,
          }}
        >
          ؟
        </div>
      </div>
    </div>
  );
}

export default function
RegroupingExchangeExerciseV2({
  items,
  audio_base,
  title,
  missionIcon = "🔟",
  background_image,
  onComplete,
}: Props) {
  const [
    index,
    setIndex,
  ] = useState(0);

  const [
    score,
    setScore,
  ] = useState(0);

  const [
    selected,
    setSelected,
  ] = useState("");

  const [
    feedback,
    setFeedback,
  ] = useState<
    "idle" | "correct" | "wrong"
  >("idle");

  const [
    exchanged,
    setExchanged,
  ] = useState(false);

  const [
    timings,
    setTimings,
  ] = useState<Timing[]>([]);

  const [
    activeWord,
    setActiveWord,
  ] = useState(-1);

  const [
    shownWordCount,
    setShownWordCount,
  ] = useState(0);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const timersRef =
    useRef<number[]>([]);

  const nextRef =
    useRef<number | null>(null);

  const item = items[index];

  const stopAudio = () => {
    timersRef.current.forEach(
      timer => window.clearTimeout(timer),
    );

    timersRef.current = [];

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setActiveWord(-1);
    setShownWordCount(0);
  };

  const playQuestion = async () => {
    stopAudio();

    if (!item) return;

    let loaded: Timing[] = [];

    try {
      const response = await fetch(
        `${audio_base}/${item.question_audio_key}.json`,
      );

      if (response.ok) {
        loaded =
          await response.json();
      }
    } catch {
      loaded = [];
    }

    setTimings(loaded);

    const audio = new Audio(
      `${audio_base}/${item.question_audio_key}.mp3`,
    );

    audioRef.current = audio;

    timersRef.current =
      loaded.map((timing, wordIndex) =>
        window.setTimeout(() => {
          setActiveWord(wordIndex);

          setShownWordCount(
            wordIndex + 1,
          );
        }, Math.max(0, timing.offset)),
      );

    audio.onended = () => {
      setActiveWord(-1);

      const finalWordCount =
        loaded.length > 0
          ? loaded.length
          : item.question
              .trim()
              .split(/\s+/)
              .filter(Boolean)
              .length;

      setShownWordCount(
        finalWordCount,
      );
    };

    audio.play().catch(() => {});
  };

  useEffect(() => {
    setSelected("");
    setFeedback("idle");
    setTimings([]);
    setActiveWord(-1);
    setExchanged(
      item?.mode !== "exchange",
    );

    const timer =
      window.setTimeout(() => {
        void playQuestion();
      }, 450);

    return () => {
      window.clearTimeout(timer);

      if (nextRef.current) {
        window.clearTimeout(
          nextRef.current,
        );
      }

      stopAudio();
    };
    // eslint-disable-next-line
  }, [index]);

  if (!item) return null;

  const correctChoice =
    item.choices.find(
      choice =>
        choice.id === item.correct_id,
    );

  const handleChoice = (
    choice: RegroupingExchangeChoice,
  ) => {
    if (
      feedback === "correct" ||
      (
        item.mode === "exchange" &&
        !exchanged
      )
    ) {
      return;
    }

    setSelected(choice.id);

    if (choice.id === item.correct_id) {
      const nextScore = score + 1;

      setScore(nextScore);
      setFeedback("correct");
      stopAudio();

      nextRef.current =
        window.setTimeout(() => {
          if (index + 1 < items.length) {
            setIndex(
              current => current + 1,
            );
          } else {
            onComplete?.(
              nextScore,
              items.length,
            );
          }
        }, 1250);

      return;
    }

    setFeedback("wrong");

    nextRef.current =
      window.setTimeout(() => {
        setSelected("");
        setFeedback("idle");
      }, 900);
  };

  const karaokeWords =
    timings.length > 0
      ? timings.map(
          timing => timing.text,
        )
      : item.question
          .trim()
          .split(/\s+/)
          .filter(Boolean);

  return (
    <main
      dir="rtl"
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "hidden",
        padding:
          "22px 16px 38px",
        fontFamily:
          '"Tajawal","Noto Kufi Arabic",sans-serif',
        background:
          "linear-gradient(180deg,#F1F7FF 0%,#FFF6E7 100%)",
        color: COLORS.navyDeep,
      }}
    >
      {background_image && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              `url("${background_image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.08,
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(760px,100%)",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              padding: "9px 16px",
              borderRadius: 999,
              background: COLORS.navy,
              color: "#FFFFFF",
              fontWeight: 1000,
              fontSize: 19,
            }}
          >
            {index + 1} / {items.length}
          </div>

          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontWeight: 1000,
              fontSize:
                "clamp(19px,4.7vw,27px)",
              color: COLORS.navy,
            }}
          >
            {missionIcon} {title}
          </div>

          <button
            type="button"
            onClick={() => {
              void playQuestion();
            }}
            aria-label="إعادة سماع السؤال"
            style={{
              width: 54,
              height: 54,
              border: 0,
              borderRadius: "50%",
              background: COLORS.gold,
              fontSize: 25,
              cursor: "pointer",
              boxShadow:
                "0 8px 16px rgba(150,90,0,.20)",
            }}
          >
            🔊
          </button>
        </header>

        <section
          style={{
            borderRadius: 28,
            padding: "18px 14px",
            marginBottom: 16,
            background:
              "rgba(255,255,255,.94)",
            border:
              `3px solid ${COLORS.gold}`,
            boxShadow:
              "0 12px 28px rgba(15,39,75,.10)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              minHeight: 67,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 7,
              fontWeight: 900,
              fontSize:
                "clamp(21px,5vw,29px)",
              lineHeight: 1.85,
            }}
          >
            <UnifiedExerciseKaraokeV2
              words={karaokeWords}
              activeIndex={activeWord}
              shownWordCount={
                shownWordCount
              }
            />
          </div>
        </section>

        <section
          style={{
            minHeight: 255,
            borderRadius: 30,
            padding: "20px 12px",
            marginBottom: 18,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
            background:
              "rgba(255,252,242,.95)",
            border:
              "2px solid rgba(232,160,32,.5)",
            boxShadow:
              "0 14px 32px rgba(15,39,75,.10)",
          }}
        >
          {item.mode === "group" && (
            <>
              <div
                style={{
                  fontWeight: 1000,
                  fontSize: 22,
                  textAlign: "center",
                }}
              >
                اجمع كل عشر وحدات
              </div>

              <LooseUnits
                total={item.total}
              />
            </>
          )}

          {item.mode === "exchange" && (
            <>
              {!exchanged ? (
                <>
                  <LooseUnits
                    total={item.total}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setExchanged(true);
                    }}
                    style={{
                      alignSelf: "center",
                      border: 0,
                      borderRadius: 18,
                      padding:
                        "13px 22px",
                      background:
                        COLORS.gold,
                      color:
                        COLORS.navyDeep,
                      fontSize: 20,
                      fontWeight: 1000,
                      cursor: "pointer",
                    }}
                  >
                    أستبدل 10 وحدات بعشرة
                  </button>
                </>
              ) : (
                <>
                  <Blocks
                    tens={
                      Math.floor(
                        item.total / 10,
                      )
                    }
                    ones={
                      item.total % 10
                    }
                  />

                  <div
                    style={{
                      textAlign: "center",
                      color: COLORS.green,
                      fontSize: 21,
                      fontWeight: 1000,
                    }}
                  >
                    تم الاستبدال بنجاح
                  </div>
                </>
              )}
            </>
          )}

          {item.mode === "represent" && (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontSize:
                    "clamp(70px,20vw,120px)",
                  lineHeight: 1,
                  fontWeight: 1000,
                  color: COLORS.navy,
                }}
              >
                {item.total}
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontSize: 21,
                  fontWeight: 900,
                }}
              >
                اختر تمثيل العدد بالعشرات والوحدات
              </div>
            </>
          )}

          {item.mode === "table" && (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontSize: 57,
                  fontWeight: 1000,
                  color: COLORS.navy,
                }}
              >
                {item.total}
              </div>

              <PlaceValueTable />
            </>
          )}
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2,minmax(0,1fr))",
            gap: 12,
          }}
        >
          {item.choices.map(choice => {
            const isSelected =
              selected === choice.id;

            const isCorrect =
              isSelected &&
              feedback === "correct";

            const isWrong =
              isSelected &&
              feedback === "wrong";

            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => {
                  handleChoice(choice);
                }}
                disabled={
                  item.mode ===
                    "exchange" &&
                  !exchanged
                }
                style={{
                  minHeight: 136,
                  borderRadius: 24,
                  padding: "12px 8px",
                  border:
                    isCorrect
                      ? `4px solid ${COLORS.green}`
                      : isWrong
                        ? `4px solid ${COLORS.red}`
                        : `3px solid ${COLORS.gold}`,
                  background:
                    isCorrect
                      ? COLORS.greenSoft
                      : isWrong
                        ? COLORS.redSoft
                        : "#FFFFFF",
                  color: COLORS.navyDeep,
                  cursor:
                    item.mode ===
                      "exchange" &&
                    !exchanged
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    item.mode ===
                      "exchange" &&
                    !exchanged
                      ? 0.48
                      : 1,
                  boxShadow:
                    "0 8px 18px rgba(15,39,75,.10)",
                }}
              >
                <Blocks
                  tens={choice.tens}
                  ones={choice.ones}
                  compact
                />

                <div
                  style={{
                    marginTop: 9,
                    fontSize: 17,
                    lineHeight: 1.55,
                    fontWeight: 1000,
                  }}
                >
                  {choice.label}
                </div>
              </button>
            );
          })}
        </section>

        <div
          role="status"
          style={{
            minHeight: 58,
            marginTop: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            fontSize: 22,
            fontWeight: 1000,
            color:
              feedback === "wrong"
                ? COLORS.red
                : COLORS.green,
            background:
              feedback === "correct"
                ? COLORS.greenSoft
                : feedback === "wrong"
                  ? COLORS.redSoft
                  : "transparent",
          }}
        >
          {feedback === "correct" &&
            `✅ ${item.success}`}

          {feedback === "wrong" &&
            "حاول مرة أخرى، وعدّ العشرات والوحدات جيدًا."}
        </div>

        {feedback === "correct" &&
          correctChoice && (
            <div
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: 900,
                color: COLORS.green,
              }}
            >
              {correctChoice.tens} عشرات و
              {" "}
              {correctChoice.ones} وحدات
            </div>
          )}
      </div>
    </main>
  );
}
