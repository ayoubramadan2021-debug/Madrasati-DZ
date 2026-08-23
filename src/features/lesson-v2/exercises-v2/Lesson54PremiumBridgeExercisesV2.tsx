
import {
  useState,
  type CSSProperties,
} from "react";

import TapSelectImagesV2, {
  type TapSelectImageItem,
  type TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";

type Choice = {
  id: string;
  label: string;
};

type ExerciseVisual = {
  kind: "bridge" | "equation";
  expression: string;
  filled?: number;
  target?: number;
};

type Variant = {
  id: string;
  audioKey: string;
  prompt: string;
  voiceText: string;
  visual: ExerciseVisual;
  options: Choice[];
  correctId: string;
};

type Group = {
  id: string;
  title: string;
  variants: Variant[];
};

type ExerciseProps = {
  audio_base: string;
  onComplete?: () => void;
};

const GROUPS: Group[] =
[
  {
    "id": "54-g1",
    "title": "أُكْمِلُ إِلَى عَشَرَةٍ",
    "variants": [
      {
        "id": "54-1-1",
        "audioKey": "lesson54_g1_v1",
        "prompt": "أَكْمِلِ الْعَمَلِيَّةَ: مَا الْعَدَدُ الَّذِي نُضِيفُهُ إِلَى ثَمَانِيَةٍ لِنَحْصُلَ عَلَى عَشَرَةٍ؟",
        "voiceText": "أَكْمِلِ الْعَمَلِيَّةَ. مَا الْعَدَدُ الَّذِي نُضِيفُهُ إِلَى ثَمَانِيَةٍ لِنَحْصُلَ عَلَى عَشَرَةٍ؟",
        "visual": {
          "kind": "bridge",
          "filled": 8,
          "target": 10,
          "expression": "8 + □ = 10"
        },
        "options": [
          {
            "id": "3",
            "label": "3"
          },
          {
            "id": "2",
            "label": "2"
          },
          {
            "id": "4",
            "label": "4"
          },
          {
            "id": "1",
            "label": "1"
          }
        ],
        "correctId": "2"
      },
      {
        "id": "54-1-2",
        "audioKey": "lesson54_g1_v2",
        "prompt": "أَكْمِلِ الْعَمَلِيَّةَ: مَا الْعَدَدُ الَّذِي نُضِيفُهُ إِلَى سَبْعَةٍ لِنَحْصُلَ عَلَى عَشَرَةٍ؟",
        "voiceText": "أَكْمِلِ الْعَمَلِيَّةَ. مَا الْعَدَدُ الَّذِي نُضِيفُهُ إِلَى سَبْعَةٍ لِنَحْصُلَ عَلَى عَشَرَةٍ؟",
        "visual": {
          "kind": "bridge",
          "filled": 7,
          "target": 10,
          "expression": "7 + □ = 10"
        },
        "options": [
          {
            "id": "4",
            "label": "4"
          },
          {
            "id": "2",
            "label": "2"
          },
          {
            "id": "5",
            "label": "5"
          },
          {
            "id": "3",
            "label": "3"
          }
        ],
        "correctId": "3"
      },
      {
        "id": "54-1-3",
        "audioKey": "lesson54_g1_v3",
        "prompt": "أَكْمِلِ الْعَمَلِيَّةَ: مَا الْعَدَدُ الَّذِي نُضِيفُهُ إِلَى تِسْعَةٍ لِنَحْصُلَ عَلَى عَشَرَةٍ؟",
        "voiceText": "أَكْمِلِ الْعَمَلِيَّةَ. مَا الْعَدَدُ الَّذِي نُضِيفُهُ إِلَى تِسْعَةٍ لِنَحْصُلَ عَلَى عَشَرَةٍ؟",
        "visual": {
          "kind": "bridge",
          "filled": 9,
          "target": 10,
          "expression": "9 + □ = 10"
        },
        "options": [
          {
            "id": "1",
            "label": "1"
          },
          {
            "id": "2",
            "label": "2"
          },
          {
            "id": "3",
            "label": "3"
          },
          {
            "id": "0",
            "label": "0"
          }
        ],
        "correctId": "1"
      },
      {
        "id": "54-1-4",
        "audioKey": "lesson54_g1_v4",
        "prompt": "أَكْمِلِ الْعَمَلِيَّةَ: مَا الْعَدَدُ الَّذِي نُضِيفُهُ إِلَى سِتَّةٍ لِنَحْصُلَ عَلَى عَشَرَةٍ؟",
        "voiceText": "أَكْمِلِ الْعَمَلِيَّةَ. مَا الْعَدَدُ الَّذِي نُضِيفُهُ إِلَى سِتَّةٍ لِنَحْصُلَ عَلَى عَشَرَةٍ؟",
        "visual": {
          "kind": "bridge",
          "filled": 6,
          "target": 10,
          "expression": "6 + □ = 10"
        },
        "options": [
          {
            "id": "5",
            "label": "5"
          },
          {
            "id": "3",
            "label": "3"
          },
          {
            "id": "4",
            "label": "4"
          },
          {
            "id": "2",
            "label": "2"
          }
        ],
        "correctId": "4"
      }
    ]
  },
  {
    "id": "54-g2",
    "title": "أُكْمِلُ الْحِسَابَ",
    "variants": [
      {
        "id": "54-2-1",
        "audioKey": "lesson54_g2_v1",
        "prompt": "أَكْمِلِ الْحِسَابَ: تِسْعَةَ عَشَرَ زَائِدُ وَاحِدٍ يُسَاوِي كَمْ؟",
        "voiceText": "أَكْمِلِ الْحِسَابَ. تِسْعَةَ عَشَرَ زَائِدُ وَاحِدٍ يُسَاوِي كَمْ؟",
        "visual": {
          "kind": "equation",
          "expression": "19 + 1 = □"
        },
        "options": [
          {
            "id": "21",
            "label": "21"
          },
          {
            "id": "18",
            "label": "18"
          },
          {
            "id": "20",
            "label": "20"
          },
          {
            "id": "19",
            "label": "19"
          }
        ],
        "correctId": "20"
      },
      {
        "id": "54-2-2",
        "audioKey": "lesson54_g2_v2",
        "prompt": "أَكْمِلِ الْحِسَابَ: عِشْرُونَ نَاقِصُ وَاحِدٍ يُسَاوِي كَمْ؟",
        "voiceText": "أَكْمِلِ الْحِسَابَ. عِشْرُونَ نَاقِصُ وَاحِدٍ يُسَاوِي كَمْ؟",
        "visual": {
          "kind": "equation",
          "expression": "20 − 1 = □"
        },
        "options": [
          {
            "id": "19",
            "label": "19"
          },
          {
            "id": "21",
            "label": "21"
          },
          {
            "id": "18",
            "label": "18"
          },
          {
            "id": "20",
            "label": "20"
          }
        ],
        "correctId": "19"
      },
      {
        "id": "54-2-3",
        "audioKey": "lesson54_g2_v3",
        "prompt": "أَكْمِلِ الْحِسَابَ: تِسْعَةٌ وَعِشْرُونَ زَائِدُ وَاحِدٍ يُسَاوِي كَمْ؟",
        "voiceText": "أَكْمِلِ الْحِسَابَ. تِسْعَةٌ وَعِشْرُونَ زَائِدُ وَاحِدٍ يُسَاوِي كَمْ؟",
        "visual": {
          "kind": "equation",
          "expression": "29 + 1 = □"
        },
        "options": [
          {
            "id": "28",
            "label": "28"
          },
          {
            "id": "31",
            "label": "31"
          },
          {
            "id": "29",
            "label": "29"
          },
          {
            "id": "30",
            "label": "30"
          }
        ],
        "correctId": "30"
      },
      {
        "id": "54-2-4",
        "audioKey": "lesson54_g2_v4",
        "prompt": "أَكْمِلِ الْحِسَابَ: ثَلَاثُونَ نَاقِصُ وَاحِدٍ يُسَاوِي كَمْ؟",
        "voiceText": "أَكْمِلِ الْحِسَابَ. ثَلَاثُونَ نَاقِصُ وَاحِدٍ يُسَاوِي كَمْ؟",
        "visual": {
          "kind": "equation",
          "expression": "30 − 1 = □"
        },
        "options": [
          {
            "id": "31",
            "label": "31"
          },
          {
            "id": "29",
            "label": "29"
          },
          {
            "id": "28",
            "label": "28"
          },
          {
            "id": "30",
            "label": "30"
          }
        ],
        "correctId": "29"
      }
    ]
  },
  {
    "id": "54-g3",
    "title": "اِحْسِبْ",
    "variants": [
      {
        "id": "54-3-1",
        "audioKey": "lesson54_g3_v1",
        "prompt": "اِحْسِبْ: تِسْعَةٌ زَائِدُ ثَلَاثَةٍ.",
        "voiceText": "اِحْسِبْ. تِسْعَةٌ زَائِدُ ثَلَاثَةٍ.",
        "visual": {
          "kind": "equation",
          "expression": "9 + 3 = □"
        },
        "options": [
          {
            "id": "13",
            "label": "13"
          },
          {
            "id": "11",
            "label": "11"
          },
          {
            "id": "14",
            "label": "14"
          },
          {
            "id": "12",
            "label": "12"
          }
        ],
        "correctId": "12"
      },
      {
        "id": "54-3-2",
        "audioKey": "lesson54_g3_v2",
        "prompt": "اِحْسِبْ: سَبْعَةَ عَشَرَ زَائِدُ خَمْسَةٍ.",
        "voiceText": "اِحْسِبْ. سَبْعَةَ عَشَرَ زَائِدُ خَمْسَةٍ.",
        "visual": {
          "kind": "equation",
          "expression": "17 + 5 = □"
        },
        "options": [
          {
            "id": "21",
            "label": "21"
          },
          {
            "id": "22",
            "label": "22"
          },
          {
            "id": "23",
            "label": "23"
          },
          {
            "id": "24",
            "label": "24"
          }
        ],
        "correctId": "22"
      },
      {
        "id": "54-3-3",
        "audioKey": "lesson54_g3_v3",
        "prompt": "اِحْسِبْ: تِسْعَةٌ وَعِشْرُونَ زَائِدُ أَرْبَعَةٍ.",
        "voiceText": "اِحْسِبْ. تِسْعَةٌ وَعِشْرُونَ زَائِدُ أَرْبَعَةٍ.",
        "visual": {
          "kind": "equation",
          "expression": "29 + 4 = □"
        },
        "options": [
          {
            "id": "32",
            "label": "32"
          },
          {
            "id": "34",
            "label": "34"
          },
          {
            "id": "33",
            "label": "33"
          },
          {
            "id": "35",
            "label": "35"
          }
        ],
        "correctId": "33"
      },
      {
        "id": "54-3-4",
        "audioKey": "lesson54_g3_v4",
        "prompt": "اِحْسِبْ: تِسْعَةٌ زَائِدُ سِتَّةٍ.",
        "voiceText": "اِحْسِبْ. تِسْعَةٌ زَائِدُ سِتَّةٍ.",
        "visual": {
          "kind": "equation",
          "expression": "9 + 6 = □"
        },
        "options": [
          {
            "id": "15",
            "label": "15"
          },
          {
            "id": "14",
            "label": "14"
          },
          {
            "id": "16",
            "label": "16"
          },
          {
            "id": "17",
            "label": "17"
          }
        ],
        "correctId": "15"
      }
    ]
  },
  {
    "id": "54-g4",
    "title": "أُفَكِّكُ عَدَدًا",
    "variants": [
      {
        "id": "54-4-1",
        "audioKey": "lesson54_g4_v1",
        "prompt": "فَكِّكِ الْعَدَدَ خَمْسَةً لِنُكْمِلَ ثَمَانِيَةَ عَشَرَ إِلَى عِشْرِينَ.",
        "voiceText": "فَكِّكِ الْعَدَدَ خَمْسَةً لِنُكْمِلَ ثَمَانِيَةَ عَشَرَ إِلَى عِشْرِينَ.",
        "visual": {
          "kind": "equation",
          "expression": "5 = □"
        },
        "options": [
          {
            "id": "correct",
            "label": "2 + 3"
          },
          {
            "id": "a",
            "label": "1 + 3"
          },
          {
            "id": "b",
            "label": "3 + 3"
          },
          {
            "id": "c",
            "label": "4 + 2"
          }
        ],
        "correctId": "correct"
      },
      {
        "id": "54-4-2",
        "audioKey": "lesson54_g4_v2",
        "prompt": "فَكِّكِ الْعَدَدَ سِتَّةً لِنُكْمِلَ سَبْعَةً وَعِشْرِينَ إِلَى ثَلَاثِينَ.",
        "voiceText": "فَكِّكِ الْعَدَدَ سِتَّةً لِنُكْمِلَ سَبْعَةً وَعِشْرِينَ إِلَى ثَلَاثِينَ.",
        "visual": {
          "kind": "equation",
          "expression": "6 = □"
        },
        "options": [
          {
            "id": "a",
            "label": "2 + 3"
          },
          {
            "id": "b",
            "label": "4 + 3"
          },
          {
            "id": "correct",
            "label": "3 + 3"
          },
          {
            "id": "c",
            "label": "2 + 2"
          }
        ],
        "correctId": "correct"
      },
      {
        "id": "54-4-3",
        "audioKey": "lesson54_g4_v3",
        "prompt": "فَكِّكِ الْعَدَدَ سَبْعَةً لِنُكْمِلَ ثَمَانِيَةً إِلَى عَشَرَةٍ.",
        "voiceText": "فَكِّكِ الْعَدَدَ سَبْعَةً لِنُكْمِلَ ثَمَانِيَةً إِلَى عَشَرَةٍ.",
        "visual": {
          "kind": "equation",
          "expression": "7 = □"
        },
        "options": [
          {
            "id": "a",
            "label": "1 + 5"
          },
          {
            "id": "correct",
            "label": "2 + 5"
          },
          {
            "id": "b",
            "label": "3 + 5"
          },
          {
            "id": "c",
            "label": "4 + 5"
          }
        ],
        "correctId": "correct"
      },
      {
        "id": "54-4-4",
        "audioKey": "lesson54_g4_v4",
        "prompt": "فَكِّكِ الْعَدَدَ سَبْعَةً لِنُكْمِلَ سِتَّةَ عَشَرَ إِلَى عِشْرِينَ.",
        "voiceText": "فَكِّكِ الْعَدَدَ سَبْعَةً لِنُكْمِلَ سِتَّةَ عَشَرَ إِلَى عِشْرِينَ.",
        "visual": {
          "kind": "equation",
          "expression": "7 = □"
        },
        "options": [
          {
            "id": "a",
            "label": "3 + 3"
          },
          {
            "id": "b",
            "label": "5 + 3"
          },
          {
            "id": "c",
            "label": "2 + 3"
          },
          {
            "id": "correct",
            "label": "4 + 3"
          }
        ],
        "correctId": "correct"
      }
    ]
  }
];

const BACKGROUND =
  "/lessons/v2/lesson54/s1.webp";

const C = {
  navy: "#17365f",
  navyDeep: "#0f2447",
  gold: "#e5a21b",
  goldLight: "#fff1c9",
  white: "#ffffff",
  green: "#16845b",
  greenLight: "#dcf5e9",
  blue: "#2877b9",
};

function createShellItems(
  variants: Variant[],
): TapSelectImageItem[] {
  return variants.map(variant => ({
    question: variant.voiceText,
    question_audio_key:
      variant.audioKey,
    options: [],
    correct_index: 0,
    image_fit: "cover",
  }));
}

function revealExpression(
  expression: string,
  answer: string | null,
) {
  if (!answer) return expression;

  if (expression.includes("□")) {
    return expression.replace(
      "□",
      answer,
    );
  }

  if (expression.includes("؟")) {
    return expression.replace(
      "؟",
      answer,
    );
  }

  return `${expression}\n← ${answer}`;
}

function BridgeFrame({
  filled,
  target,
}: {
  filled: number;
  target: number;
}) {
  return (
    <div style={styles.bridgeFrame}>
      {Array.from(
        { length: target },
        (_, index) => (
          <span
            key={index}
            style={{
              ...styles.bridgeCell,
              background:
                index < filled
                  ? C.gold
                  : "#fff7df",
              borderColor:
                index < filled
                  ? C.gold
                  : "#e5c978",
            }}
          />
        ),
      )}
    </div>
  );
}

function VisualCard({
  variant,
  answer,
}: {
  variant: Variant;
  answer: string | null;
}) {
  const expression =
    revealExpression(
      variant.visual.expression,
      answer,
    );

  return (
    <div style={styles.visualCard}>
      {variant.visual.kind ===
        "bridge" && (
        <BridgeFrame
          filled={
            variant.visual.filled ?? 0
          }
          target={
            variant.visual.target ?? 10
          }
        />
      )}

      <div
        dir="ltr"
        style={styles.expression}
      >
        {expression}
      </div>
    </div>
  );
}

function VariantView({
  context,
  variants,
}: {
  context:
    TapSelectImagesCustomContext;
  variants: Variant[];
}) {
  const variant =
    variants[context.itemIndex];

  const [
    selected,
    setSelected,
  ] = useState<string | null>(null);

  const correctOption =
    variant.options.find(
      option =>
        option.id ===
        variant.correctId,
    );

  const revealedAnswer =
    selected === variant.correctId
      ? correctOption?.label ?? null
      : null;

  const choose = (
    choiceId: string,
  ) => {
    if (context.locked) return;

    setSelected(choiceId);

    if (
      choiceId ===
      variant.correctId
    ) {
      context.completeRound();
      return;
    }

    context.showWrong(() => {
      setSelected(null);
    });
  };

  return (
    <div
      dir="rtl"
      style={styles.round}
    >
      <VisualCard
        variant={variant}
        answer={revealedAnswer}
      />

      <div style={styles.choices}>
        {variant.options.map(
          option => {
            const isSelected =
              selected === option.id;

            return (
              <button
                key={option.id}
                type="button"
                disabled={context.locked}
                onClick={() =>
                  choose(option.id)
                }
                style={{
                  ...styles.choice,
                  background:
                    isSelected
                      ? C.greenLight
                      : C.white,
                  borderColor:
                    isSelected
                      ? C.green
                      : C.gold,
                  transform:
                    isSelected
                      ? "translateY(-3px) scale(1.03)"
                      : "scale(1)",
                }}
              >
                {option.label}
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}

function Lesson54Group({
  groupIndex,
  audio_base,
  onComplete,
}: ExerciseProps & {
  groupIndex: number;
}) {
  const group = GROUPS[groupIndex];

  const emojis = [
    "🔟",
    "🧮",
    "🌉",
    "🧩",
  ];

  const missions = [
    "مهمة الإكمال",
    "مهمة الحساب",
    "مهمة المرور",
    "مهمة التفكيك",
  ];

  return (
    <TapSelectImagesV2
      items={createShellItems(
        group.variants,
      )}
      audio_base={audio_base}
      background_image={BACKGROUND}
      progress_emoji={
        emojis[groupIndex]
      }
      mission_prefix={
        missions[groupIndex]
      }
      render_custom={context => (
        <VariantView
          key={context.itemIndex}
          context={context}
          variants={group.variants}
        />
      )}
      onComplete={() => {
        onComplete?.();
      }}
    />
  );
}

export function
Lesson54PremiumExercise1V2(
  props: ExerciseProps,
) {
  return (
    <Lesson54Group
      {...props}
      groupIndex={0}
    />
  );
}

export function
Lesson54PremiumExercise2V2(
  props: ExerciseProps,
) {
  return (
    <Lesson54Group
      {...props}
      groupIndex={1}
    />
  );
}

export function
Lesson54PremiumExercise3V2(
  props: ExerciseProps,
) {
  return (
    <Lesson54Group
      {...props}
      groupIndex={2}
    />
  );
}

export function
Lesson54PremiumExercise4V2(
  props: ExerciseProps,
) {
  return (
    <Lesson54Group
      {...props}
      groupIndex={3}
    />
  );
}

const styles:
  Record<string, CSSProperties> = {
  round: {
    width: "100%",
    minHeight:
      "calc(100dvh - 430px)",
    display: "grid",
    alignContent: "start",
    gap: 14,
  },

  visualCard: {
    minHeight:
      "clamp(190px,28dvh,290px)",
    padding: 18,
    display: "grid",
    placeItems: "center",
    alignContent: "center",
    gap: 17,
    borderRadius: 24,
    border:
      `4px solid ${C.gold}`,
    background:
      "linear-gradient(145deg,#ffffff,#fff3cf)",
    boxShadow:
      "0 11px 25px rgba(23,54,95,.15)",
  },

  bridgeFrame: {
    width:
      "min(100%,310px)",
    display: "grid",
    gridTemplateColumns:
      "repeat(5,minmax(34px,1fr))",
    gap: 8,
    padding: 12,
    borderRadius: 20,
    border:
      `3px solid ${C.blue}`,
    background: "#eaf6ff",
  },

  bridgeCell: {
    minHeight: 48,
    borderRadius: 11,
    border: "3px solid",
    boxShadow:
      "inset 0 -4px 0 rgba(0,0,0,.08)",
  },

  expression: {
    whiteSpace: "pre-line",
    textAlign: "center",
    color: C.navyDeep,
    fontSize:
      "clamp(34px,10vw,59px)",
    fontWeight: 950,
    lineHeight: 1.45,
  },

  choices: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
    gap: 10,
  },

  choice: {
    minHeight:
      "clamp(95px,14dvh,145px)",
    padding: "12px 9px",
    border: "4px solid",
    borderRadius: 20,
    color: C.navy,
    fontFamily:
      "Tajawal, sans-serif",
    fontSize:
      "clamp(22px,6vw,31px)",
    fontWeight: 950,
    lineHeight: 1.5,
    cursor: "pointer",
    boxShadow:
      "0 7px 16px rgba(23,54,95,.13)",
    transition:
      "all .25s ease",
  },
};

// TAALIM_DZ_UNIFIED_VISUAL_HELPERS_54
const UNIFIED_EMOJIS_54 = ["🔟", "🧮", "🌉", "🧩"] as const;
const UNIFIED_MISSIONS_54 = ["مهمة الإكمال", "مهمة الحساب", "مهمة المرور", "مهمة التفكيك"] as const;

export function getLesson54PremiumUnifiedItems(
  groupIndex: number,
): TapSelectImageItem[] {
  const group = GROUPS[groupIndex];
  return createShellItems(group.variants);
}

export function getLesson54PremiumUnifiedMeta(
  groupIndex: number,
) {
  return {
    backgroundImage: BACKGROUND,
    missionTitle: `${UNIFIED_EMOJIS_54[groupIndex]} ${UNIFIED_MISSIONS_54[groupIndex]}`,
  };
}

export function renderLesson54PremiumUnifiedVisual(
  groupIndex: number,
  context: TapSelectImagesCustomContext,
) {
  const group = GROUPS[groupIndex];
  return (
    <VariantView
      context={context}
      variants={group.variants}
    />
  );
}
