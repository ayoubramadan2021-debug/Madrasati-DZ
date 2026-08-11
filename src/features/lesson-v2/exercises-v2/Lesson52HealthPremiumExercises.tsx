import {
  useEffect,
  useRef,
  useState,
} from "react";

type WordTiming = {
  text: string;
  offset: number;
  duration: number;
};

type FeedbackState =
  | "idle"
  | "success"
  | "retry";

type PlaceKind =
  | "healthy"
  | "polluted";

const WORLD_ID =
  "5daed3bb-7e62-4a5a-93a1-f6dec60df810";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_52_bilan_2/premium";

const COLORS = {
  navy: "#17365f",
  navyDark: "#0b1d35",
  gold: "#e7a11a",
  goldLight: "#f7c95f",
  cream: "#fff8e9",
  white: "#ffffff",
  green: "#16845b",
  greenLight: "#dff6ec",
  red: "#bd3f45",
  redLight: "#fde7e8",
  border: "#efd28b",
  text: "#17365f",
};

const PLACE_ROUNDS: Array<{
  id: string;
  label: string;
  image: string;
  kind: PlaceKind;
}> = [
  {
    id: "garden",
    label: "حديقة نظيفة",
    image:
      "/lessons/v2/lesson52/exercises/s1.webp",
    kind: "healthy",
  },
  {
    id: "playground",
    label: "ملعب آمن",
    image:
      "/lessons/v2/lesson52/exercises/s2.webp",
    kind: "healthy",
  },
  {
    id: "sports-hall",
    label: "قاعة رياضية",
    image:
      "/lessons/v2/lesson52/exercises/s3.webp",
    kind: "healthy",
  },
  {
    id: "busy-road",
    label: "طريق مزدحم",
    image:
      "/lessons/v2/lesson52/exercises/s4.webp",
    kind: "polluted",
  },
  {
    id: "school-yard",
    label: "ساحة مدرسة نظيفة",
    image:
      "/lessons/v2/lesson52/exercises/s5.webp",
    kind: "healthy",
  },
  {
    id: "construction",
    label: "ورشة أشغال",
    image:
      "/lessons/v2/lesson52/exercises/s6.webp",
    kind: "polluted",
  },
  {
    id: "factory",
    label: "مصنع كثير الدخان",
    image:
      "/lessons/v2/lesson52/exercises/s7.webp",
    kind: "polluted",
  },
  {
    id: "dump",
    label: "مفرغة نفايات",
    image:
      "/lessons/v2/lesson52/exercises/s8.webp",
    kind: "polluted",
  },
];

const SEQUENCE_ROUNDS = [
  {
    key: "lesson52_premium_sequence_activity",
    prompt:
      "رَتِّبْ مَرَاحِلَ النَّشَاطِ مِنَ الْإِحْمَاءِ إِلَى شُرْبِ الْمَاءِ.",
    cards: [
      {
        id: "water",
        label: "أشرب الماء",
      },
      {
        id: "run",
        label: "أمارس الجري",
      },
      {
        id: "warmup",
        label: "أقوم بالإحماء",
      },
      {
        id: "cooldown",
        label: "أهدأ تدريجيًّا",
      },
    ],
    correct: [
      "warmup",
      "run",
      "cooldown",
      "water",
    ],
  },
  {
    key: "lesson52_premium_sequence_pulse",
    prompt:
      "رَتِّبْ خُطُوَاتِ مُقَارَنَةِ النَّبْضِ قَبْلَ الْجَرْيِ وَبَعْدَهُ.",
    cards: [
      {
        id: "measure-after",
        label: "أقيس النبض بعد الجري",
      },
      {
        id: "run",
        label: "أجري مدة قصيرة",
      },
      {
        id: "measure-before",
        label: "أقيس النبض قبل الجري",
      },
      {
        id: "compare",
        label: "أقارن النتيجتين",
      },
    ],
    correct: [
      "measure-before",
      "run",
      "measure-after",
      "compare",
    ],
  },
] as const;

const COMPARE_ROUNDS = [
  {
    text: "التَّنَفُّسُ هَادِئٌ.",
    correct: "before",
  },
  {
    text: "دَقَّاتُ الْقَلْبِ أَسْرَعُ.",
    correct: "after",
  },
  {
    text: "النَّبْضُ بَطِيءٌ.",
    correct: "before",
  },
  {
    text:
      "أَحْتَاجُ إِلَى التَّهْدِئَةِ وَشُرْبِ الْمَاءِ.",
    correct: "after",
  },
] as const;

const HOTSPOT_ROUNDS = [
  {
    key: "lesson52_premium_pulse_chest",
    prompt:
      "اِضْغَطْ عَلَى الصَّدْرِ لِتَشْعُرَ بِدَقَّاتِ الْقَلْبِ.",
    correct: "chest",
  },
  {
    key: "lesson52_premium_pulse_left_wrist",
    prompt:
      "اِضْغَطْ عَلَى الْمِعْصَمِ لِقِيَاسِ النَّبْضِ بِلُطْفٍ.",
    correct: "left-wrist",
  },
  {
    key: "lesson52_premium_pulse_right_wrist",
    prompt:
      "اِخْتَرِ الْمِعْصَمَ الْآخَرَ الَّذِي يُمْكِنُ قِيَاسُ النَّبْضِ عِنْدَهُ.",
    correct: "right-wrist",
  },
] as const;

function usePremiumKaraoke(
  audioKey: string,
  fallbackText: string,
) {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const frameRef =
    useRef<number | null>(null);

  const timingsRef =
    useRef<WordTiming[]>([]);

  const [timings, setTimings] =
    useState<WordTiming[]>([]);

  const [activeIndex, setActiveIndex] =
    useState(-1);

  const stop = () => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(
        frameRef.current,
      );

      frameRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setActiveIndex(-1);
  };

  const startAudio = (
    loadedTimings: WordTiming[],
  ) => {
    stop();

    const audio = new Audio(
      `${AUDIO_BASE}/${audioKey}.mp3`,
    );

    audio.preload = "auto";
    audioRef.current = audio;

    const tick = () => {
      const currentMs =
        audio.currentTime * 1000;

      let nextIndex = -1;

      for (
        let index = 0;
        index < loadedTimings.length;
        index += 1
      ) {
        const timing =
          loadedTimings[index];

        const start =
          timing.offset - 90;

        const end =
          timing.offset +
          timing.duration +
          140;

        if (
          currentMs >= start &&
          currentMs <= end
        ) {
          nextIndex = index;
          break;
        }
      }

      setActiveIndex(nextIndex);

      if (!audio.paused && !audio.ended) {
        frameRef.current =
          window.requestAnimationFrame(
            tick,
          );
      }
    };

    audio.onplay = () => {
      frameRef.current =
        window.requestAnimationFrame(
          tick,
        );
    };

    audio.onended = () => {
      setActiveIndex(-1);
    };

    audio.play().catch(() => {
      setActiveIndex(-1);
    });
  };

  useEffect(() => {
    let cancelled = false;

    stop();
    setTimings([]);

    const timer = window.setTimeout(
      async () => {
        try {
          const response = await fetch(
            `${AUDIO_BASE}/${audioKey}.json`,
          );

          const data =
            response.ok
              ? await response.json()
              : [];

          const loaded =
            Array.isArray(data)
              ? data.filter(
                  (
                    item,
                  ): item is WordTiming =>
                    Boolean(
                      item &&
                        typeof item.text ===
                          "string" &&
                        typeof item.offset ===
                          "number" &&
                        typeof item.duration ===
                          "number",
                    ),
                )
              : [];

          if (cancelled) return;

          setTimings(loaded);
          timingsRef.current = loaded;

          startAudio(loaded);
        } catch {
          if (cancelled) return;

          setTimings([]);
          timingsRef.current = [];
        }
      },
      280,
    );

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioKey]);

  const replay = () => {
    startAudio(
      timingsRef.current,
    );
  };

  return {
    timings,
    activeIndex,
    replay,
    fallbackText,
  };
}

function KaraokeBox({
  timings,
  activeIndex,
  fallbackText,
}: {
  timings: WordTiming[];
  activeIndex: number;
  fallbackText: string;
}) {
  const fallbackWords =
    fallbackText
      .split(/\s+/)
      .filter(Boolean);

  const words =
    timings.length > 0
      ? timings.map(item => item.text)
      : fallbackWords;

  return (
    <div
      dir="rtl"
      style={{
        minHeight: 92,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "6px 8px",
        padding: "17px 20px",
        background: COLORS.white,
        border:
          `3px solid ${COLORS.gold}`,
        borderRadius: 24,
        boxShadow:
          "0 10px 25px rgba(23,54,95,.10)",
        fontFamily:
          "Tajawal, Cairo, sans-serif",
        fontWeight: 800,
        fontSize:
          "clamp(18px, 4.6vw, 25px)",
        lineHeight: 1.8,
        color: COLORS.text,
        textAlign: "center",
      }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          style={{
            padding: "1px 5px",
            borderRadius: 9,
            background:
              index === activeIndex
                ? COLORS.goldLight
                : "transparent",
            color:
              index === activeIndex
                ? COLORS.navyDark
                : COLORS.text,
            transform:
              index === activeIndex
                ? "scale(1.08)"
                : "scale(1)",
            transition:
              "all .16s ease",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

function FeedbackOverlay({
  state,
}: {
  state: FeedbackState;
}) {
  if (state === "idle") {
    return null;
  }

  const success =
    state === "success";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
        background:
          "rgba(7,16,31,.20)",
      }}
    >
      <div
        dir="rtl"
        style={{
          minWidth: 230,
          padding: "22px 30px",
          borderRadius: 25,
          background:
            success
              ? COLORS.green
              : COLORS.red,
          color: COLORS.white,
          border:
            "4px solid rgba(255,255,255,.92)",
          boxShadow:
            "0 22px 55px rgba(0,0,0,.32)",
          fontFamily:
            "Tajawal, Cairo, sans-serif",
          fontWeight: 900,
          fontSize: 24,
          textAlign: "center",
        }}
      >
        {success
          ? "أَحْسَنْتَ!"
          : "حَاوِلْ مَرَّةً أُخْرَى"}
      </div>
    </div>
  );
}

function PremiumButton({
  children,
  onClick,
  disabled = false,
  variant = "gold",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "gold" | "green" | "red";
}) {
  const background =
    variant === "green"
      ? COLORS.green
      : variant === "red"
        ? COLORS.red
        : COLORS.gold;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        minHeight: 58,
        border: 0,
        borderRadius: 18,
        background,
        color: COLORS.white,
        fontFamily:
          "Tajawal, Cairo, sans-serif",
        fontWeight: 900,
        fontSize: 19,
        cursor:
          disabled
            ? "default"
            : "pointer",
        opacity:
          disabled
            ? 0.55
            : 1,
        boxShadow:
          "0 8px 19px rgba(23,54,95,.18)",
        WebkitTapHighlightColor:
          "transparent",
      }}
    >
      {children}
    </button>
  );
}

function MissionHeader({
  mission,
  title,
  score,
}: {
  mission: number;
  title: string;
  score: number;
}) {
  return (
    <header
      style={{
        display: "grid",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          gap: 12,
        }}
      >
        <div
          dir="rtl"
          style={{
            padding: "9px 14px",
            borderRadius: 15,
            background: COLORS.navy,
            color: COLORS.white,
            fontWeight: 900,
          }}
        >
          المهمة {mission} من 4
        </div>

        <div
          dir="rtl"
          style={{
            padding: "9px 14px",
            borderRadius: 15,
            background: COLORS.white,
            border:
              `2px solid ${COLORS.border}`,
            color: COLORS.navy,
            fontWeight: 900,
          }}
        >
          النقاط: {score}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: 7,
        }}
      >
        {[1, 2, 3, 4].map(step => (
          <div
            key={step}
            style={{
              height: 9,
              borderRadius: 20,
              background:
                step <= mission
                  ? COLORS.gold
                  : "#eadfca",
            }}
          />
        ))}
      </div>

      <h1
        dir="rtl"
        style={{
          margin: 0,
          color: COLORS.navy,
          fontFamily:
            "Tajawal, Cairo, sans-serif",
          fontSize:
            "clamp(24px, 6vw, 34px)",
          fontWeight: 950,
          textAlign: "center",
        }}
      >
        {title}
      </h1>
    </header>
  );
}

export default function
Lesson52HealthPremiumExercises() {
  const [mission, setMission] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [feedback, setFeedback] =
    useState<FeedbackState>("idle");

  const [locked, setLocked] =
    useState(false);

  const [placeIndex, setPlaceIndex] =
    useState(0);

  const [
    sequenceRoundIndex,
    setSequenceRoundIndex,
  ] = useState(0);

  const [
    sequenceAnswer,
    setSequenceAnswer,
  ] = useState<string[]>([]);

  const [
    compareIndex,
    setCompareIndex,
  ] = useState(0);

  const [
    hotspotIndex,
    setHotspotIndex,
  ] = useState(0);

  const [
    selectedHotspot,
    setSelectedHotspot,
  ] = useState("");

  const [completed, setCompleted] =
    useState(false);

  const placeRound =
    PLACE_ROUNDS[placeIndex];

  const sequenceRound =
    SEQUENCE_ROUNDS[
      sequenceRoundIndex
    ];

  const compareRound =
    COMPARE_ROUNDS[compareIndex];

  const hotspotRound =
    HOTSPOT_ROUNDS[hotspotIndex];

  let missionTitle =
    "خريطة الأماكن الصحية";

  let audioKey =
    "lesson52_premium_place";

  let promptText =
    "صَنِّفْ هَذَا الْمَكَانَ: هَلْ هُوَ مَكَانٌ صِحِّيٌّ أَمْ مَكَانٌ مُلَوَّثٌ؟";

  if (mission === 1) {
    missionTitle =
      "مسار النشاط الآمن";

    audioKey =
      sequenceRound.key;

    promptText =
      sequenceRound.prompt;
  }

  if (mission === 2) {
    missionTitle =
      "قبل الجهد وبعده";

    audioKey =
      "lesson52_premium_compare";

    promptText =
      "هَلْ تَحْدُثُ هَذِهِ الْحَالَةُ قَبْلَ الْجَهْدِ أَمْ بَعْدَهُ؟";
  }

  if (mission === 3) {
    missionTitle =
      "مرصد نبض القلب";

    audioKey =
      hotspotRound.key;

    promptText =
      hotspotRound.prompt;
  }

  const karaoke =
    usePremiumKaraoke(
      audioKey,
      promptText,
    );

  const showSuccess = (
    next: () => void,
  ) => {
    setLocked(true);
    setFeedback("success");
    setScore(value => value + 1);

    window.setTimeout(() => {
      setFeedback("idle");
      setLocked(false);
      next();
    }, 780);
  };

  const showRetry = (
    reset?: () => void,
  ) => {
    setLocked(true);
    setFeedback("retry");

    window.setTimeout(() => {
      setFeedback("idle");
      setLocked(false);
      reset?.();
    }, 760);
  };

  const classifyPlace = (
    choice: PlaceKind,
  ) => {
    if (locked) return;

    if (choice !== placeRound.kind) {
      showRetry();
      return;
    }

    showSuccess(() => {
      if (
        placeIndex <
        PLACE_ROUNDS.length - 1
      ) {
        setPlaceIndex(
          value => value + 1,
        );
      } else {
        setMission(1);
      }
    });
  };

  const chooseSequenceCard = (
    id: string,
  ) => {
    if (
      locked ||
      sequenceAnswer.includes(id)
    ) {
      return;
    }

    const nextAnswer = [
      ...sequenceAnswer,
      id,
    ];

    setSequenceAnswer(nextAnswer);

    if (
      nextAnswer.length !==
      sequenceRound.correct.length
    ) {
      return;
    }

    const correct =
      nextAnswer.join("|") ===
      sequenceRound.correct.join("|");

    if (!correct) {
      showRetry(() => {
        setSequenceAnswer([]);
      });

      return;
    }

    showSuccess(() => {
      setSequenceAnswer([]);

      if (
        sequenceRoundIndex <
        SEQUENCE_ROUNDS.length - 1
      ) {
        setSequenceRoundIndex(
          value => value + 1,
        );
      } else {
        setMission(2);
      }
    });
  };

  const classifyBodyState = (
    choice: "before" | "after",
  ) => {
    if (locked) return;

    if (
      choice !== compareRound.correct
    ) {
      showRetry();
      return;
    }

    showSuccess(() => {
      if (
        compareIndex <
        COMPARE_ROUNDS.length - 1
      ) {
        setCompareIndex(
          value => value + 1,
        );
      } else {
        setMission(3);
      }
    });
  };

  const chooseHotspot = (
    hotspot: string,
  ) => {
    if (locked) return;

    setSelectedHotspot(hotspot);

    if (
      hotspot !== hotspotRound.correct
    ) {
      showRetry(() => {
        setSelectedHotspot("");
      });

      return;
    }

    showSuccess(() => {
      setSelectedHotspot("");

      if (
        hotspotIndex <
        HOTSPOT_ROUNDS.length - 1
      ) {
        setHotspotIndex(
          value => value + 1,
        );
      } else {
        setCompleted(true);
      }
    });
  };

  const resetAll = () => {
    setMission(0);
    setScore(0);
    setFeedback("idle");
    setLocked(false);
    setPlaceIndex(0);
    setSequenceRoundIndex(0);
    setSequenceAnswer([]);
    setCompareIndex(0);
    setHotspotIndex(0);
    setSelectedHotspot("");
    setCompleted(false);
  };

  if (completed) {
    return (
      <main
        dir="rtl"
        style={{
          minHeight:
            "calc(100vh - 80px)",
          display: "grid",
          placeItems: "center",
          padding: "28px 18px 120px",
          background:
            "linear-gradient(180deg,#fffaf0 0%,#f6e4ba 100%)",
          fontFamily:
            "Tajawal, Cairo, sans-serif",
        }}
      >
        <section
          style={{
            width: "min(100%, 620px)",
            padding: "32px 22px",
            borderRadius: 30,
            background: COLORS.white,
            border:
              `3px solid ${COLORS.gold}`,
            boxShadow:
              "0 20px 50px rgba(23,54,95,.16)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 94,
              height: 94,
              margin: "0 auto 20px",
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              background:
                COLORS.greenLight,
              border:
                `5px solid ${COLORS.green}`,
              color: COLORS.green,
              fontSize: 50,
              fontWeight: 950,
            }}
          >
            ✓
          </div>

          <h1
            style={{
              margin:
                "0 0 12px",
              color: COLORS.navy,
              fontSize: 31,
            }}
          >
            أَحْسَنْتَ!
          </h1>

          <p
            style={{
              margin:
                "0 0 25px",
              color: COLORS.text,
              fontSize: 20,
              fontWeight: 800,
              lineHeight: 1.8,
            }}
          >
            أَتْمَمْتَ مَهَامَّ
            الْحَصِيلَةِ الثَّانِيَةِ
            وَجَمَعْتَ {score} نُقْطَةً.
          </p>

          <div
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            <PremiumButton
              variant="green"
              onClick={() => {
                window.location.assign(
                  `/world/${WORLD_ID}`,
                );
              }}
            >
              العودة إلى عالم الألعاب
            </PremiumButton>

            <PremiumButton
              onClick={resetAll}
            >
              إعادة التمارين
            </PremiumButton>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight:
          "calc(100vh - 80px)",
        padding:
          "20px 16px 118px",
        background:
          "radial-gradient(circle at top,#fffdf7 0%,#f9e9c5 58%,#efd08a 100%)",
        color: COLORS.text,
        fontFamily:
          "Tajawal, Cairo, sans-serif",
      }}
    >
      <FeedbackOverlay
        state={feedback}
      />

      <section
        style={{
          width: "min(100%, 720px)",
          margin: "0 auto",
          display: "grid",
          gap: 18,
        }}
      >
        <MissionHeader
          mission={mission + 1}
          title={missionTitle}
          score={score}
        />

        <button
          type="button"
          onClick={karaoke.replay}
          style={{
            justifySelf: "end",
            width: 52,
            height: 52,
            borderRadius: "50%",
            border:
              `3px solid ${COLORS.white}`,
            background: COLORS.gold,
            color: COLORS.white,
            fontSize: 23,
            cursor: "pointer",
            boxShadow:
              "0 8px 18px rgba(23,54,95,.18)",
          }}
          aria-label="إعادة الصوت"
        >
          🔊
        </button>

        <KaraokeBox
          timings={karaoke.timings}
          activeIndex={
            karaoke.activeIndex
          }
          fallbackText={
            karaoke.fallbackText
          }
        />

        {mission === 0 && (
          <section
            style={{
              display: "grid",
              gap: 16,
            }}
          >
            <div
              dir="rtl"
              style={{
                textAlign: "center",
                color: COLORS.navy,
                fontWeight: 900,
              }}
            >
              المكان {placeIndex + 1}
              {" "}من{" "}
              {PLACE_ROUNDS.length}
            </div>

            <div
              style={{
                padding: 9,
                borderRadius: 28,
                background: COLORS.white,
                border:
                  `3px solid ${COLORS.gold}`,
                boxShadow:
                  "0 14px 30px rgba(23,54,95,.13)",
              }}
            >
              <img
                src={placeRound.image}
                alt={placeRound.label}
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: 410,
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: 20,
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,minmax(0,1fr))",
                gap: 12,
              }}
            >
              <PremiumButton
                variant="green"
                disabled={locked}
                onClick={() =>
                  classifyPlace(
                    "healthy",
                  )
                }
              >
                مكان صحي وآمن
              </PremiumButton>

              <PremiumButton
                variant="red"
                disabled={locked}
                onClick={() =>
                  classifyPlace(
                    "polluted",
                  )
                }
              >
                مكان ملوّث
              </PremiumButton>
            </div>
          </section>
        )}

        {mission === 1 && (
          <section
            style={{
              display: "grid",
              gap: 16,
            }}
          >
            <div
              dir="rtl"
              style={{
                textAlign: "center",
                color: COLORS.navy,
                fontWeight: 900,
              }}
            >
              المسار{" "}
              {sequenceRoundIndex + 1}
              {" "}من{" "}
              {SEQUENCE_ROUNDS.length}
            </div>

            <div
              dir="rtl"
              style={{
                minHeight: 94,
                padding: 13,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                borderRadius: 22,
                background:
                  "rgba(255,255,255,.72)",
                border:
                  `2px dashed ${COLORS.gold}`,
              }}
            >
              {sequenceAnswer.length ===
              0 ? (
                <span
                  style={{
                    color: "#8a7550",
                    fontWeight: 800,
                  }}
                >
                  اضغط البطاقات حسب
                  الترتيب الصحيح
                </span>
              ) : (
                sequenceAnswer.map(
                  (id, index) => {
                    const card =
                      sequenceRound.cards.find(
                        item =>
                          item.id === id,
                      );

                    return (
                      <div
                        key={`${id}-${index}`}
                        style={{
                          padding:
                            "10px 13px",
                          borderRadius: 15,
                          background:
                            COLORS.greenLight,
                          border:
                            `2px solid ${COLORS.green}`,
                          color:
                            COLORS.navy,
                          fontWeight: 900,
                        }}
                      >
                        {index + 1}.{" "}
                        {card?.label}
                      </div>
                    );
                  },
                )
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,minmax(0,1fr))",
                gap: 11,
              }}
            >
              {sequenceRound.cards.map(
                card => {
                  const used =
                    sequenceAnswer.includes(
                      card.id,
                    );

                  return (
                    <button
                      type="button"
                      key={card.id}
                      disabled={
                        used || locked
                      }
                      onClick={() =>
                        chooseSequenceCard(
                          card.id,
                        )
                      }
                      style={{
                        minHeight: 92,
                        padding: 13,
                        borderRadius: 20,
                        border:
                          `3px solid ${
                            used
                              ? "#c9c9c9"
                              : COLORS.gold
                          }`,
                        background:
                          used
                            ? "#eeeeee"
                            : COLORS.white,
                        color:
                          used
                            ? "#888888"
                            : COLORS.navy,
                        fontFamily:
                          "Tajawal, Cairo, sans-serif",
                        fontSize: 18,
                        fontWeight: 900,
                        cursor:
                          used || locked
                            ? "default"
                            : "pointer",
                        boxShadow:
                          "0 8px 20px rgba(23,54,95,.10)",
                      }}
                    >
                      {card.label}
                    </button>
                  );
                },
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                setSequenceAnswer([])
              }
              disabled={
                locked ||
                sequenceAnswer.length === 0
              }
              style={{
                justifySelf: "center",
                padding: "10px 22px",
                borderRadius: 15,
                border:
                  `2px solid ${COLORS.navy}`,
                background:
                  COLORS.white,
                color: COLORS.navy,
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              إعادة الترتيب
            </button>
          </section>
        )}

        {mission === 2 && (
          <section
            style={{
              display: "grid",
              gap: 17,
            }}
          >
            <div
              dir="rtl"
              style={{
                textAlign: "center",
                color: COLORS.navy,
                fontWeight: 900,
              }}
            >
              الحالة {compareIndex + 1}
              {" "}من{" "}
              {COMPARE_ROUNDS.length}
            </div>

            <div
              dir="rtl"
              style={{
                padding: "27px 20px",
                borderRadius: 26,
                background: COLORS.white,
                border:
                  `3px solid ${COLORS.gold}`,
                color: COLORS.navy,
                textAlign: "center",
                fontSize:
                  "clamp(23px,6vw,31px)",
                fontWeight: 950,
                lineHeight: 1.8,
                boxShadow:
                  "0 13px 30px rgba(23,54,95,.12)",
              }}
            >
              {compareRound.text}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,minmax(0,1fr))",
                gap: 13,
              }}
            >
              <PremiumButton
                disabled={locked}
                onClick={() =>
                  classifyBodyState(
                    "before",
                  )
                }
              >
                قبل الجهد
              </PremiumButton>

              <PremiumButton
                variant="green"
                disabled={locked}
                onClick={() =>
                  classifyBodyState(
                    "after",
                  )
                }
              >
                بعد الجهد
              </PremiumButton>
            </div>
          </section>
        )}

        {mission === 3 && (
          <section
            style={{
              display: "grid",
              gap: 15,
            }}
          >
            <div
              dir="rtl"
              style={{
                textAlign: "center",
                color: COLORS.navy,
                fontWeight: 900,
              }}
            >
              الموضع {hotspotIndex + 1}
              {" "}من{" "}
              {HOTSPOT_ROUNDS.length}
            </div>

            <div
              style={{
                padding: 10,
                borderRadius: 28,
                background: COLORS.white,
                border:
                  `3px solid ${COLORS.gold}`,
                boxShadow:
                  "0 14px 30px rgba(23,54,95,.12)",
              }}
            >
              <svg
                viewBox="0 0 300 500"
                role="img"
                aria-label="رسم جسم لتحديد مواضع النبض"
                style={{
                  display: "block",
                  width: "100%",
                  maxHeight: 490,
                }}
              >
                <defs>
                  <linearGradient
                    id="bodyFill52"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#dceaff"
                    />
                    <stop
                      offset="100%"
                      stopColor="#a8c5ea"
                    />
                  </linearGradient>
                </defs>

                <circle
                  cx="150"
                  cy="60"
                  r="40"
                  fill="url(#bodyFill52)"
                  stroke={COLORS.navy}
                  strokeWidth="5"
                />

                <rect
                  x="105"
                  y="102"
                  width="90"
                  height="170"
                  rx="42"
                  fill="url(#bodyFill52)"
                  stroke={COLORS.navy}
                  strokeWidth="5"
                />

                <line
                  x1="112"
                  y1="135"
                  x2="45"
                  y2="255"
                  stroke={COLORS.navy}
                  strokeWidth="30"
                  strokeLinecap="round"
                />

                <line
                  x1="188"
                  y1="135"
                  x2="255"
                  y2="255"
                  stroke={COLORS.navy}
                  strokeWidth="30"
                  strokeLinecap="round"
                />

                <line
                  x1="128"
                  y1="255"
                  x2="100"
                  y2="440"
                  stroke={COLORS.navy}
                  strokeWidth="34"
                  strokeLinecap="round"
                />

                <line
                  x1="172"
                  y1="255"
                  x2="200"
                  y2="440"
                  stroke={COLORS.navy}
                  strokeWidth="34"
                  strokeLinecap="round"
                />

                {[
                  {
                    id: "head",
                    x: 150,
                    y: 60,
                  },
                  {
                    id: "chest",
                    x: 150,
                    y: 160,
                  },
                  {
                    id: "left-wrist",
                    x: 48,
                    y: 258,
                  },
                  {
                    id: "right-wrist",
                    x: 252,
                    y: 258,
                  },
                  {
                    id: "knee",
                    x: 198,
                    y: 365,
                  },
                ].map(point => {
                  const active =
                    selectedHotspot ===
                    point.id;

                  return (
                    <g
                      key={point.id}
                      onClick={() =>
                        chooseHotspot(
                          point.id,
                        )
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="25"
                        fill={
                          active
                            ? COLORS.goldLight
                            : "rgba(255,255,255,.92)"
                        }
                        stroke={
                          active
                            ? COLORS.gold
                            : COLORS.red
                        }
                        strokeWidth="5"
                      />

                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        fill={
                          active
                            ? COLORS.gold
                            : COLORS.red
                        }
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            <p
              dir="rtl"
              style={{
                margin: 0,
                textAlign: "center",
                color: COLORS.navy,
                fontWeight: 900,
                fontSize: 18,
              }}
            >
              اضغط على إحدى العلامات
              الموجودة فوق الجسم.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}
