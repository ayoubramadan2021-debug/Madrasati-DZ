import {
  useEffect,
  useState,
  type DragEvent,
} from "react";

import TapSelectImagesV2, {
  type TapSelectImageItem,
  type TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";

type ExerciseProps = {
  audio_base: string;
  onComplete?: () => void;
};

const IMAGE_BASE =
  "/lessons/v2/lesson52/exercises";

const COLORS = {
  navy: "#17365f",
  gold: "#e5a21b",
  goldLight: "#fff0c5",
  white: "#ffffff",
  green: "#16845b",
  greenLight: "#dcf5e9",
  red: "#bd3e45",
  redLight: "#fde8e9",
  blue: "#2877b9",
  blueLight: "#e3f2ff",
  gray: "#687484",
  line: "#ead39b",
};

function createShellItems(
  questions: Array<{
    question: string;
    audio: string;
  }>,
): TapSelectImageItem[] {
  return questions.map(
    item => ({
      question: item.question,
      question_audio_key:
        item.audio,
      options: [],
      correct_index: 0,
      image_fit: "cover",
    }),
  );
}

/* ======================================================
   التمرين الثاني
   ====================================================== */

type DragCard = {
  id: string;
  label: string;
  target: string;
  image?: string;
};

type DragTarget = {
  id: string;
  label: string;
};

type DragRound = {
  cards: DragCard[];
  targets: DragTarget[];
};

const DRAG_ITEMS =
  createShellItems([
    {
      question:
        "اِسْحَبْ كُلَّ مَكَانٍ إِلَى التَّصْنِيفِ الصَّحِيحِ.",

      audio:
        "l52_ex2_q1_activity_order",
    },
    {
      question:
        "اِسْحَبْ كُلَّ نَشَاطٍ إِلَى الْمَكَانِ الْمُنَاسِبِ.",

      audio:
        "l52_ex2_q2_after_running",
    },
    {
      question:
        "اِسْحَبْ كُلَّ خَطَرٍ إِلَى التَّصَرُّفِ الصَّحِيحِ.",

      audio:
        "l52_ex2_q3_pulse_order",
    },
    {
      question:
        "اِسْحَبْ كُلَّ وَصْفٍ إِلَى الْمَكَانِ الَّذِي يُنَاسِبُهُ.",

      audio:
        "l52_ex2_q4_place_decision",
    },
  ]);

const DRAG_ROUNDS:
  DragRound[] = [
  {
    targets: [
      {
        id: "healthy",
        label:
          "مَكَانٌ صِحِّيٌّ وَآمِنٌ",
      },
      {
        id: "unsafe",
        label:
          "مَكَانٌ غَيْرُ مُنَاسِبٍ",
      },
    ],

    cards: [
      {
        id: "garden",
        label:
          "الْحَدِيقَةُ النَّظِيفَةُ",
        target: "healthy",
        image:
          `${IMAGE_BASE}/s1.webp`,
      },
      {
        id: "school",
        label:
          "سَاحَةُ الْمَدْرَسَةِ",
        target: "healthy",
        image:
          `${IMAGE_BASE}/s5.webp`,
      },
      {
        id: "road",
        label:
          "الطَّرِيقُ الْمُزْدَحِمُ",
        target: "unsafe",
        image:
          `${IMAGE_BASE}/s4.webp`,
      },
      {
        id: "waste",
        label:
          "مَكَانُ النُّفَايَاتِ",
        target: "unsafe",
        image:
          `${IMAGE_BASE}/s8.webp`,
      },
    ],
  },

  {
    targets: [
      {
        id: "playground",
        label: "الْمَلْعَبُ",
      },
      {
        id: "garden",
        label: "الْحَدِيقَةُ",
      },
      {
        id: "school",
        label:
          "سَاحَةُ الْمَدْرَسَةِ",
      },
      {
        id: "hall",
        label:
          "الْقَاعَةُ الرِّيَاضِيَّةُ",
      },
    ],

    cards: [
      {
        id: "run",
        label: "الْجَرْيُ",
        target: "playground",
      },
      {
        id: "walk",
        label:
          "الْمَشْيُ الْهَادِئُ",
        target: "garden",
      },
      {
        id: "team",
        label:
          "اللَّعِبُ الْجَمَاعِيُّ",
        target: "school",
      },
      {
        id: "exercise",
        label:
          "التَّمَارِينُ الْمُنَظَّمَةُ",
        target: "hall",
      },
    ],
  },

  {
    targets: [
      {
        id: "avoid",
        label: "أَبْتَعِدُ عَنْهُ",
      },
      {
        id: "no-run",
        label:
          "لَا أَجْرِي فِيهِ",
      },
      {
        id: "no-play",
        label:
          "لَا أَلْعَبُ فِيهِ",
      },
      {
        id: "change",
        label:
          "أَخْتَارُ مَكَانًا آخَرَ",
      },
    ],

    cards: [
      {
        id: "smoke",
        label:
          "مَكَانٌ فِيهِ دُخَانٌ",
        target: "avoid",
      },
      {
        id: "cars",
        label:
          "طَرِيقٌ تَمُرُّ فِيهِ السَّيَّارَاتُ",
        target: "no-run",
      },
      {
        id: "trash",
        label:
          "مَكَانٌ فِيهِ نُفَايَاتٌ",
        target: "no-play",
      },
      {
        id: "works",
        label:
          "وَرْشَةُ أَشْغَالٍ",
        target: "change",
      },
    ],
  },

  {
    targets: [
      {
        id: "garden",
        label: "الْحَدِيقَةُ",
      },
      {
        id: "playground",
        label: "الْمَلْعَبُ",
      },
      {
        id: "road",
        label:
          "الطَّرِيقُ الْمُزْدَحِمُ",
      },
      {
        id: "works",
        label:
          "وَرْشَةُ الْأَشْغَالِ",
      },
    ],

    cards: [
      {
        id: "trees",
        label:
          "هَوَاءٌ نَقِيٌّ وَأَشْجَارٌ",
        target: "garden",
      },
      {
        id: "floor",
        label:
          "أَرْضِيَّةٌ آمِنَةٌ لِلْجَرْيِ",
        target: "playground",
      },
      {
        id: "noise",
        label:
          "دُخَانٌ وَضَجِيجٌ وَسَيَّارَاتٌ",
        target: "road",
      },
      {
        id: "machines",
        label:
          "آلَاتٌ وَأَتْرِبَةٌ",
        target: "works",
      },
    ],
  },
];

function DragRoundView({
  context,
}: {
  context:
    TapSelectImagesCustomContext;
}) {
  const round =
    DRAG_ROUNDS[
      context.itemIndex
    ];

  const [
    selected,
    setSelected,
  ] = useState<string | null>(
    null,
  );

  const [
    placed,
    setPlaced,
  ] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    setSelected(null);
    setPlaced({});
  }, [context.itemIndex]);

  const chooseTarget = (
    cardId: string,
    targetId: string,
  ) => {
    if (
      context.locked ||
      placed[cardId]
    ) {
      return;
    }

    const card =
      round.cards.find(
        value =>
          value.id === cardId,
      );

    if (!card) return;

    if (
      card.target !== targetId
    ) {
      context.showWrong(() => {
        setSelected(null);
      });

      return;
    }

    const next = {
      ...placed,
      [cardId]: targetId,
    };

    const finished =
      Object.keys(next).length ===
      round.cards.length;

    if (finished) {
      context.completeRound();
      return;
    }

    context.showCorrect(() => {
      setPlaced(next);
      setSelected(null);
    });
  };

  const drop = (
    event:
      DragEvent<HTMLDivElement>,
    targetId: string,
  ) => {
    event.preventDefault();

    const cardId =
      event.dataTransfer.getData(
        "text/plain",
      ) || selected;

    if (cardId) {
      chooseTarget(
        cardId,
        targetId,
      );
    }
  };

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        minHeight: "calc(100dvh - 430px)",
        display: "grid",
        alignContent: "start",
        gap: 16,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,minmax(0,1fr))",
          gap: 10,
        }}
      >
        {round.cards
          .filter(
            card =>
              !placed[card.id],
          )
          .map(card => (
            <button
              type="button"
              key={card.id}
              draggable
              disabled={
                context.locked
              }
              onDragStart={
                event => {
                  event.dataTransfer
                    .setData(
                      "text/plain",
                      card.id,
                    );

                  setSelected(
                    card.id,
                  );
                }
              }
              onClick={() => {
                setSelected(
                  card.id,
                );
              }}
              style={{
                minHeight:
                  card.image
                    ? "clamp(195px, 29dvh, 290px)"
                    : "clamp(115px, 17dvh, 175px)",
                padding: 8,
                display: "grid",
                alignContent:
                  "center",
                gap: 7,
                borderRadius: 19,
                border:
                  `3px solid ${
                    selected ===
                    card.id
                      ? COLORS.green
                      : COLORS.gold
                  }`,
                background:
                  selected ===
                  card.id
                    ? COLORS
                        .greenLight
                    : COLORS.white,
                color: COLORS.navy,
                fontSize: 17,
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              {card.image && (
                <img
                  src={card.image}
                  alt={card.label}
                  style={{
                    width: "100%",
                    height: "clamp(135px, 21dvh, 220px)",
                    objectFit:
                      "cover",
                    borderRadius: 13,
                  }}
                />
              )}

              {card.label}
            </button>
          ))}
      </div>

      <div
        style={{
          display: "grid",
          gap: 9,
        }}
      >
        {round.targets.map(
          target => (
            <div
              key={target.id}
              role="button"
              tabIndex={0}
              onDragOver={
                event =>
                  event.preventDefault()
              }
              onDrop={event =>
                drop(
                  event,
                  target.id,
                )
              }
              onClick={() => {
                if (selected) {
                  chooseTarget(
                    selected,
                    target.id,
                  );
                }
              }}
              onKeyDown={
                event => {
                  if (
                    event.key ===
                      "Enter" &&
                    selected
                  ) {
                    chooseTarget(
                      selected,
                      target.id,
                    );
                  }
                }
              }
              style={{
                minHeight: "clamp(90px, 12dvh, 135px)",
                padding: 13,
                borderRadius: 18,
                border:
                  `3px dashed ${
                    selected
                      ? COLORS.gold
                      : COLORS.line
                  }`,
                background:
                  "rgba(255,255,255,.92)",
                color: COLORS.navy,
                textAlign: "center",
                fontSize: "clamp(18px, 4.8vw, 24px)",
                fontWeight: 900,
                cursor:
                  selected
                    ? "pointer"
                    : "default",
              }}
            >
              {target.label}

              <div
                style={{
                  marginTop: 7,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent:
                    "center",
                  gap: 5,
                }}
              >
                {round.cards
                  .filter(
                    card =>
                      placed[
                        card.id
                      ] ===
                      target.id,
                  )
                  .map(card => (
                    <span
                      key={card.id}
                      style={{
                        padding:
                          "6px 9px",
                        borderRadius:
                          12,
                        background:
                          COLORS
                            .greenLight,
                        border:
                          `2px solid ${COLORS.green}`,
                        fontSize: 14,
                      }}
                    >
                      {card.label}
                    </span>
                  ))}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export function
Lesson52PremiumDragExerciseV2({
  audio_base,
  onComplete,
}: ExerciseProps) {
  return (
    <TapSelectImagesV2
      items={DRAG_ITEMS}
      audio_base={audio_base}
      background_image={
        `${IMAGE_BASE}/s1.webp`
      }
      progress_emoji="🧩"
      mission_prefix="مهمة السحب"
      render_custom={
        context => (
          <DragRoundView
            key={
              context.itemIndex
            }
            context={context}
          />
        )
      }
      onComplete={() => {
        onComplete?.();
      }}
    />
  );
}

/* ======================================================
   التمرين الثالث
   ====================================================== */

type EffortChoice =
  | "before"
  | "after";

const EFFORT_ITEMS =
  createShellItems([
    {
      question:
        "هَلْ تَكُونُ هَذِهِ الْحَالَةُ قَبْلَ الْجَهْدِ أَمْ بَعْدَهُ؟",

      audio:
        "l52_ex3_q1_breathing",
    },
    {
      question:
        "هَلْ تَكُونُ هَذِهِ الْحَالَةُ قَبْلَ الْجَهْدِ أَمْ بَعْدَهُ؟",

      audio:
        "l52_ex3_q2_heartbeat",
    },
    {
      question:
        "مَتَى أَقُومُ بِهَذَا السُّلُوكِ الصِّحِّيِّ؟",

      audio:
        "l52_ex3_q3_healthy_behavior",
    },
    {
      question:
        "مَتَى أَقُومُ بِهَذَا السُّلُوكِ الصِّحِّيِّ؟",

      audio:
        "l52_ex3_q4_places",
    },
  ]);

const EFFORT_ROUNDS = [
  {
    statement:
      "التَّنَفُّسُ هَادِئٌ وَمُنْتَظَمٌ.",

    correct:
      "before" as EffortChoice,
  },
  {
    statement:
      "دَقَّاتُ الْقَلْبِ وَالتَّنَفُّسُ أَسْرَعُ.",

    correct:
      "after" as EffortChoice,
  },
  {
    statement:
      "أُسَخِّنُ جِسْمِي وَأَتَفَقَّدُ أَمَانَ الْمَكَانِ.",

    correct:
      "before" as EffortChoice,
  },
  {
    statement:
      "أَمْشِي بِبُطْءٍ وَأَشْرَبُ الْمَاءَ وَأَسْتَرِيحُ.",

    correct:
      "after" as EffortChoice,
  },
];

function EffortRoundView({
  context,
}: {
  context:
    TapSelectImagesCustomContext;
}) {
  const round =
    EFFORT_ROUNDS[
      context.itemIndex
    ];

  const answer = (
    choice: EffortChoice,
  ) => {
    if (context.locked) return;

    if (
      choice === round.correct
    ) {
      context.completeRound();
    } else {
      context.showWrong();
    }
  };

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        minHeight: "calc(100dvh - 430px)",
        display: "grid",
        alignContent: "start",
        gap: 16,
      }}
    >
      <div
        style={{
          padding: 18,
          borderRadius: 20,
          background:
            COLORS.white,
          border:
            `3px solid ${COLORS.gold}`,
          color: COLORS.navy,
          textAlign: "center",
          fontSize: 23,
          fontWeight: 900,
          lineHeight: 1.7,
        }}
      >
        {round.statement}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,minmax(0,1fr))",
          gap: 11,
        }}
      >
        <button
          type="button"
          disabled={context.locked}
          onClick={() =>
            answer("before")
          }
          style={{
            minHeight: "clamp(235px, 35dvh, 370px)",
            padding: 15,
            borderRadius: 21,
            border:
              `3px solid ${COLORS.blue}`,
            background:
              COLORS.blueLight,
            color: COLORS.navy,
            fontSize: "clamp(22px, 5.5vw, 29px)",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              fontSize: "clamp(72px, 16vw, 115px)",
            }}
          >
            🧍
          </div>

          قَبْلَ الْجَهْدِ

          <div
            style={{
              marginTop: 7,
              fontSize: 14,
              color: COLORS.gray,
            }}
          >
            نَبْضٌ وَتَنَفُّسٌ
            هَادِئَانِ
          </div>
        </button>

        <button
          type="button"
          disabled={context.locked}
          onClick={() =>
            answer("after")
          }
          style={{
            minHeight: "clamp(235px, 35dvh, 370px)",
            padding: 15,
            borderRadius: 21,
            border:
              `3px solid ${COLORS.red}`,
            background:
              COLORS.redLight,
            color: COLORS.navy,
            fontSize: "clamp(22px, 5.5vw, 29px)",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              fontSize: "clamp(72px, 16vw, 115px)",
            }}
          >
            🏃
          </div>

          بَعْدَ الْجَهْدِ

          <div
            style={{
              marginTop: 7,
              fontSize: 14,
              color: COLORS.gray,
            }}
          >
            نَبْضٌ وَتَنَفُّسٌ
            أَسْرَعُ
          </div>
        </button>
      </div>
    </div>
  );
}

export function
Lesson52PremiumEffortLabExerciseV2({
  audio_base,
  onComplete,
}: ExerciseProps) {
  return (
    <TapSelectImagesV2
      items={EFFORT_ITEMS}
      audio_base={audio_base}
      background_image={
        `${IMAGE_BASE}/s5.webp`
      }
      progress_emoji="🏃"
      mission_prefix="مهمة الجهد"
      render_custom={
        context => (
          <EffortRoundView
            key={
              context.itemIndex
            }
            context={context}
          />
        )
      }
      onComplete={() => {
        onComplete?.();
      }}
    />
  );
}

/* ======================================================
   التمرين الرابع: اختيار المشهد الصحيح بالصور
   ====================================================== */

type PulseImageOption = {
  image: string;
  label: string;
  correct: boolean;
};

type PulseImageRound = {
  options: PulseImageOption[];
};

const PULSE_ITEMS =
  createShellItems([
    {
      question:
        "اِخْتَرِ الصُّورَةَ الَّتِي تُظْهِرُ مَوْضِعَ الْقَلْبِ.",

      audio:
        "l52_ex4_q1_chest",
    },

    {
      question:
        "اِخْتَرِ الصُّورَةَ الَّتِي تُظْهِرُ قِيَاسَ النَّبْضِ عِنْدَ الْمِعْصَمِ.",

      audio:
        "l52_ex4_q2_wrist",
    },

    {
      question:
        "بَعْدَ الْجَرْيِ، أَيْنَ أَقِيسُ نَبْضِي؟",

      audio:
        "l52_ex4_q3_after_running",
    },

    {
      question:
        "أَيُّ صُورَةٍ تُظْهِرُ التَّعَبَ وَسُرْعَةَ التَّنَفُّسِ بَعْدَ الْجَرْيِ؟",

      audio:
        "l52_ex4_q4_heart_place",
    },
  ]);

const EXERCISE4_IMAGE_BASE =
  "/lessons/v2/lesson52/exercise4";

const PULSE_IMAGE_ROUNDS:
  PulseImageRound[] = [
  {
    options: [
      {
        image:
          `${EXERCISE4_IMAGE_BASE}/s2.webp`,

        label:
          "أَلَمٌ فِي الرُّكْبَةِ",

        correct: false,
      },

      {
        image:
          `${EXERCISE4_IMAGE_BASE}/s1.webp`,

        label:
          "الْيَدُ عَلَى الصَّدْرِ",

        correct: true,
      },
    ],
  },

  {
    options: [
      {
        image:
          `${EXERCISE4_IMAGE_BASE}/s4.webp`,

        label:
          "الْيَدُ عَلَى الْجَبْهَةِ",

        correct: false,
      },

      {
        image:
          `${EXERCISE4_IMAGE_BASE}/s3.webp`,

        label:
          "الْأَصَابِعُ عَلَى الْمِعْصَمِ",

        correct: true,
      },
    ],
  },

  {
    options: [
      {
        image:
          `${EXERCISE4_IMAGE_BASE}/s6.webp`,

        label:
          "عِنْدَ السَّاقِ",

        correct: false,
      },

      {
        image:
          `${EXERCISE4_IMAGE_BASE}/s5.webp`,

        label:
          "عِنْدَ الْمِعْصَمِ",

        correct: true,
      },
    ],
  },

  {
    options: [
      {
        image:
          `${EXERCISE4_IMAGE_BASE}/s7.webp`,

        label:
          "تَنَفُّسٌ هَادِئٌ",

        correct: false,
      },

      {
        image:
          `${EXERCISE4_IMAGE_BASE}/s8.webp`,

        label:
          "تَعَبٌ وَتَنَفُّسٌ سَرِيعٌ",

        correct: true,
      },
    ],
  },
];

function PulseImageRoundView({
  context,
}: {
  context:
    TapSelectImagesCustomContext;
}) {
  const round =
    PULSE_IMAGE_ROUNDS[
      context.itemIndex
    ];

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        minHeight:
          "calc(100dvh - 430px)",
        display: "grid",
        gridTemplateColumns:
          "repeat(2, minmax(0, 1fr))",
        alignContent: "start",
        gap: 14,
      }}
    >
      {round.options.map(
        (
          option,
          index,
        ) => (
          <button
            type="button"
            key={
              option.image
            }
            disabled={
              context.locked
            }
            onClick={() => {
              if (
                option.correct
              ) {
                context
                  .completeRound();
              } else {
                context
                  .showWrong();
              }
            }}
            style={{
              width: "100%",
              minWidth: 0,
              minHeight:
                "clamp(310px, 47dvh, 520px)",
              padding: 8,
              display: "grid",
              gridTemplateRows:
                "1fr auto",
              gap: 9,
              borderRadius: 24,
              border:
                "4px solid #e5a21b",
              background:
                "#ffffff",
              color: "#17365f",
              boxShadow:
                "0 13px 30px rgba(23,54,95,.16)",
              fontFamily:
                "Tajawal, Cairo, sans-serif",
              fontSize:
                "clamp(17px, 4.6vw, 25px)",
              fontWeight: 900,
              cursor: "pointer",
              overflow: "hidden",
              transform:
                "translateZ(0)",
              transition:
                "transform .16s ease, box-shadow .16s ease",
            }}
            aria-label={
              option.label
            }
          >
            <img
              src={option.image}
              alt={option.label}
              draggable={false}
              style={{
                display: "block",
                width: "100%",
                height:
                  "clamp(250px, 39dvh, 445px)",
                objectFit: "cover",
                objectPosition:
                  "center",
                borderRadius: 17,
                userSelect: "none",
              }}
            />

            <span
              style={{
                minHeight: 52,
                padding:
                  "7px 5px",
                display: "grid",
                placeItems:
                  "center",
                lineHeight: 1.55,
              }}
            >
              {option.label}
            </span>
          </button>
        ),
      )}
    </div>
  );
}

export function
Lesson52PremiumPulseLabExerciseV2({
  audio_base,
  onComplete,
}: ExerciseProps) {
  return (
    <TapSelectImagesV2
      items={PULSE_ITEMS}
      audio_base={audio_base}
      background_image={
        `${EXERCISE4_IMAGE_BASE}/s1.webp`
      }
      progress_emoji="❤️"
      mission_prefix="مهمة النبض"
      render_custom={
        context => (
          <PulseImageRoundView
            key={
              context.itemIndex
            }
            context={context}
          />
        )
      }
      onComplete={() => {
        onComplete?.();
      }}
    />
  );
}
