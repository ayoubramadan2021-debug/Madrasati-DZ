
import {
  useState,
  type CSSProperties,
} from "react";

import TapSelectImagesV2, {
  type TapSelectImageItem,
  type TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";

type AnimalChoice = {
  id: string;
  label: string;
  emoji?: string;
};

type AnimalVisual = {
  kind: "emoji";
  emoji: string;
  label: string;
};

type AnimalVariant = {
  id: string;
  audioKey: string;
  prompt: string;
  voiceText: string;
  visual: AnimalVisual;
  options: AnimalChoice[];
  correctId: string;
};

type AnimalGroup = {
  id: string;
  title: string;
  variants: AnimalVariant[];
};

type ExerciseProps = {
  audio_base: string;
  onComplete?: () => void;
};

const GROUPS: AnimalGroup[] =
[
  {
    "id": "55-g1",
    "title": "فَوَائِدُ الْحَيَوَانَاتِ",
    "variants": [
      {
        "id": "55-1-1",
        "audioKey": "lesson55_g1_v1",
        "prompt": "مَاذَا نَسْتَفِيدُ مِنَ الْبَقَرَةُ؟",
        "voiceText": "ماذا نستفيد من الْبَقَرَةُ؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🐄",
          "label": "الْبَقَرَةُ"
        },
        "options": [
          {
            "id": "wrong-1",
            "label": "الْعَسَلُ",
            "emoji": "🍯"
          },
          {
            "id": "milk",
            "label": "الْحَلِيبُ",
            "emoji": "🥛"
          },
          {
            "id": "wrong-2",
            "label": "السَّمَكُ",
            "emoji": "🐟"
          },
          {
            "id": "extra-eggs",
            "label": "الْبَيْضُ",
            "emoji": "🥚"
          }
        ],
        "correctId": "milk"
      },
      {
        "id": "55-1-2",
        "audioKey": "lesson55_g1_v2",
        "prompt": "مَاذَا نَسْتَفِيدُ مِنَ الدَّجَاجَةُ؟",
        "voiceText": "ماذا نستفيد من الدَّجَاجَةُ؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🐔",
          "label": "الدَّجَاجَةُ"
        },
        "options": [
          {
            "id": "wrong-1",
            "label": "الْعَسَلُ",
            "emoji": "🍯"
          },
          {
            "id": "wrong-2",
            "label": "السَّمَكُ",
            "emoji": "🐟"
          },
          {
            "id": "extra-wool",
            "label": "الصُّوفُ",
            "emoji": "🧶"
          },
          {
            "id": "eggs",
            "label": "الْبَيْضُ",
            "emoji": "🥚"
          }
        ],
        "correctId": "eggs"
      },
      {
        "id": "55-1-3",
        "audioKey": "lesson55_g1_v3",
        "prompt": "مَاذَا نَسْتَفِيدُ مِنَ الْخَرُوفُ؟",
        "voiceText": "ماذا نستفيد من الْخَرُوفُ؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🐑",
          "label": "الْخَرُوفُ"
        },
        "options": [
          {
            "id": "wool",
            "label": "الصُّوفُ",
            "emoji": "🧶"
          },
          {
            "id": "wrong-1",
            "label": "الْعَسَلُ",
            "emoji": "🍯"
          },
          {
            "id": "wrong-2",
            "label": "السَّمَكُ",
            "emoji": "🐟"
          },
          {
            "id": "extra-eggs",
            "label": "الْبَيْضُ",
            "emoji": "🥚"
          }
        ],
        "correctId": "wool"
      },
      {
        "id": "55-1-4",
        "audioKey": "lesson55_g1_v4",
        "prompt": "مَاذَا نَسْتَفِيدُ مِنَ الْحِصَانُ؟",
        "voiceText": "ماذا نستفيد من الْحِصَانُ؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🐎",
          "label": "الْحِصَانُ"
        },
        "options": [
          {
            "id": "wrong-1",
            "label": "الْعَسَلُ",
            "emoji": "🍯"
          },
          {
            "id": "wrong-2",
            "label": "السَّمَكُ",
            "emoji": "🐟"
          },
          {
            "id": "transport",
            "label": "التَّنَقُّلُ",
            "emoji": "🛤️"
          },
          {
            "id": "extra-eggs",
            "label": "الْبَيْضُ",
            "emoji": "🥚"
          }
        ],
        "correctId": "transport"
      }
    ]
  },
  {
    "id": "55-g2",
    "title": "أَلِيفٌ أَمْ بَرِّيٌّ؟",
    "variants": [
      {
        "id": "55-2-1",
        "audioKey": "lesson55_g2_v1",
        "prompt": "أُصَنِّفُ الْقِطَّةُ",
        "voiceText": "هل الْقِطَّةُ أليف أم بري؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🐈",
          "label": "الْقِطَّةُ"
        },
        "options": [
          {
            "id": "wild",
            "label": "بَرِّيٌّ",
            "emoji": "🌲"
          },
          {
            "id": "aquatic",
            "label": "مَائِيٌّ",
            "emoji": "🌊"
          },
          {
            "id": "domestic",
            "label": "أَلِيفٌ",
            "emoji": "🏠"
          },
          {
            "id": "bird",
            "label": "طَائِرٌ",
            "emoji": "🪽"
          }
        ],
        "correctId": "domestic"
      },
      {
        "id": "55-2-2",
        "audioKey": "lesson55_g2_v2",
        "prompt": "أُصَنِّفُ الْأَسَدُ",
        "voiceText": "هل الْأَسَدُ أليف أم بري؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🦁",
          "label": "الْأَسَدُ"
        },
        "options": [
          {
            "id": "wild",
            "label": "بَرِّيٌّ",
            "emoji": "🌲"
          },
          {
            "id": "domestic",
            "label": "أَلِيفٌ",
            "emoji": "🏠"
          },
          {
            "id": "aquatic",
            "label": "مَائِيٌّ",
            "emoji": "🌊"
          },
          {
            "id": "bird",
            "label": "طَائِرٌ",
            "emoji": "🪽"
          }
        ],
        "correctId": "wild"
      },
      {
        "id": "55-2-3",
        "audioKey": "lesson55_g2_v3",
        "prompt": "أُصَنِّفُ الْكَلْبُ",
        "voiceText": "هل الْكَلْبُ أليف أم بري؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🐕",
          "label": "الْكَلْبُ"
        },
        "options": [
          {
            "id": "wild",
            "label": "بَرِّيٌّ",
            "emoji": "🌲"
          },
          {
            "id": "aquatic",
            "label": "مَائِيٌّ",
            "emoji": "🌊"
          },
          {
            "id": "bird",
            "label": "طَائِرٌ",
            "emoji": "🪽"
          },
          {
            "id": "domestic",
            "label": "أَلِيفٌ",
            "emoji": "🏠"
          }
        ],
        "correctId": "domestic"
      },
      {
        "id": "55-2-4",
        "audioKey": "lesson55_g2_v4",
        "prompt": "أُصَنِّفُ النَّمِرُ",
        "voiceText": "هل النَّمِرُ أليف أم بري؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🐅",
          "label": "النَّمِرُ"
        },
        "options": [
          {
            "id": "domestic",
            "label": "أَلِيفٌ",
            "emoji": "🏠"
          },
          {
            "id": "wild",
            "label": "بَرِّيٌّ",
            "emoji": "🌲"
          },
          {
            "id": "aquatic",
            "label": "مَائِيٌّ",
            "emoji": "🌊"
          },
          {
            "id": "bird",
            "label": "طَائِرٌ",
            "emoji": "🪽"
          }
        ],
        "correctId": "wild"
      }
    ]
  },
  {
    "id": "55-g3",
    "title": "أَيْنَ يَعِيشُ الْحَيَوَانُ؟",
    "variants": [
      {
        "id": "55-3-1",
        "audioKey": "lesson55_g3_v1",
        "prompt": "أَيْنَ يَعِيشُ الدُّلْفِينُ؟",
        "voiceText": "أين يعيش الدُّلْفِينُ؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🐬",
          "label": "الدُّلْفِينُ"
        },
        "options": [
          {
            "id": "home",
            "label": "الْبَيْتُ",
            "emoji": "🏠"
          },
          {
            "id": "sky",
            "label": "السَّمَاءُ",
            "emoji": "☁️"
          },
          {
            "id": "farm",
            "label": "الْمَزْرَعَةُ",
            "emoji": "🚜"
          },
          {
            "id": "sea",
            "label": "الْبَحْرُ",
            "emoji": "🌊"
          }
        ],
        "correctId": "sea"
      },
      {
        "id": "55-3-2",
        "audioKey": "lesson55_g3_v2",
        "prompt": "أَيْنَ يَعِيشُ الْحِصَانُ؟",
        "voiceText": "أين يعيش الْحِصَانُ؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🐎",
          "label": "الْحِصَانُ"
        },
        "options": [
          {
            "id": "home",
            "label": "الْبَيْتُ",
            "emoji": "🏠"
          },
          {
            "id": "farm",
            "label": "الْمَزْرَعَةُ",
            "emoji": "🚜"
          },
          {
            "id": "sky",
            "label": "السَّمَاءُ",
            "emoji": "☁️"
          },
          {
            "id": "sea",
            "label": "الْبَحْرُ",
            "emoji": "🌊"
          }
        ],
        "correctId": "farm"
      },
      {
        "id": "55-3-3",
        "audioKey": "lesson55_g3_v3",
        "prompt": "أَيْنَ يَعِيشُ الثَّعْلَبُ؟",
        "voiceText": "أين يعيش الثَّعْلَبُ؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🦊",
          "label": "الثَّعْلَبُ"
        },
        "options": [
          {
            "id": "home",
            "label": "الْبَيْتُ",
            "emoji": "🏠"
          },
          {
            "id": "sky",
            "label": "السَّمَاءُ",
            "emoji": "☁️"
          },
          {
            "id": "forest",
            "label": "الْغَابَةُ",
            "emoji": "🌲"
          },
          {
            "id": "sea",
            "label": "الْبَحْرُ",
            "emoji": "🌊"
          }
        ],
        "correctId": "forest"
      },
      {
        "id": "55-3-4",
        "audioKey": "lesson55_g3_v4",
        "prompt": "أَيْنَ يَعِيشُ الدَّجَاجَةُ؟",
        "voiceText": "أين يعيش الدَّجَاجَةُ؟",
        "visual": {
          "kind": "emoji",
          "emoji": "🐔",
          "label": "الدَّجَاجَةُ"
        },
        "options": [
          {
            "id": "farm",
            "label": "الْمَزْرَعَةُ",
            "emoji": "🚜"
          },
          {
            "id": "home",
            "label": "الْبَيْتُ",
            "emoji": "🏠"
          },
          {
            "id": "sky",
            "label": "السَّمَاءُ",
            "emoji": "☁️"
          },
          {
            "id": "sea",
            "label": "الْبَحْرُ",
            "emoji": "🌊"
          }
        ],
        "correctId": "farm"
      }
    ]
  },
  {
    "id": "55-g4",
    "title": "أَرْعَى الْحَيَوَانَ",
    "variants": [
      {
        "id": "55-4-1",
        "audioKey": "lesson55_g4_v1",
        "prompt": "أَخْتَارُ السُّلُوكَ الصَّحِيحَ",
        "voiceText": "اختر السلوك الصحيح. الْقِطَّةُ جَائِعَةٌ.",
        "visual": {
          "kind": "emoji",
          "emoji": "🐈",
          "label": "الْقِطَّةُ جَائِعَةٌ"
        },
        "options": [
          {
            "id": "food",
            "label": "أُقَدِّمُ لَهَا الطَّعَامَ",
            "emoji": "🥣"
          },
          {
            "id": "hurt",
            "label": "أُؤْذِيهِ",
            "emoji": "❌"
          },
          {
            "id": "ignore",
            "label": "أَتْرُكُهُ وَحْدَهُ",
            "emoji": "🚫"
          },
          {
            "id": "play-away",
            "label": "أَلْعَبُ بَعِيدًا عَنْهَا",
            "emoji": "⚽"
          }
        ],
        "correctId": "food"
      },
      {
        "id": "55-4-2",
        "audioKey": "lesson55_g4_v2",
        "prompt": "أَخْتَارُ السُّلُوكَ الصَّحِيحَ",
        "voiceText": "اختر السلوك الصحيح. الْكَلْبُ عَطْشَانُ.",
        "visual": {
          "kind": "emoji",
          "emoji": "🐕",
          "label": "الْكَلْبُ عَطْشَانُ"
        },
        "options": [
          {
            "id": "hurt",
            "label": "أُؤْذِيهِ",
            "emoji": "❌"
          },
          {
            "id": "ignore",
            "label": "أَتْرُكُهُ وَحْدَهُ",
            "emoji": "🚫"
          },
          {
            "id": "water",
            "label": "أُقَدِّمُ لَهُ الْمَاءَ",
            "emoji": "💧"
          },
          {
            "id": "play-away",
            "label": "أَلْعَبُ بَعِيدًا عَنْهُ",
            "emoji": "⚽"
          }
        ],
        "correctId": "water"
      },
      {
        "id": "55-4-3",
        "audioKey": "lesson55_g4_v3",
        "prompt": "أَخْتَارُ السُّلُوكَ الصَّحِيحَ",
        "voiceText": "اختر السلوك الصحيح. الْخَرُوفُ فِي الْبَرْدِ.",
        "visual": {
          "kind": "emoji",
          "emoji": "🐑",
          "label": "الْخَرُوفُ فِي الْبَرْدِ"
        },
        "options": [
          {
            "id": "hurt",
            "label": "أُؤْذِيهِ",
            "emoji": "❌"
          },
          {
            "id": "shelter",
            "label": "أُوَفِّرُ لَهُ مَأْوًى",
            "emoji": "🏠"
          },
          {
            "id": "ignore",
            "label": "أَتْرُكُهُ وَحْدَهُ",
            "emoji": "🚫"
          },
          {
            "id": "play-away",
            "label": "أَلْعَبُ بَعِيدًا عَنْهُ",
            "emoji": "⚽"
          }
        ],
        "correctId": "shelter"
      },
      {
        "id": "55-4-4",
        "audioKey": "lesson55_g4_v4",
        "prompt": "أَخْتَارُ السُّلُوكَ الصَّحِيحَ",
        "voiceText": "اختر السلوك الصحيح. أَرْعَى الْحَيَوَانَ.",
        "visual": {
          "kind": "emoji",
          "emoji": "❤️",
          "label": "أَرْعَى الْحَيَوَانَ"
        },
        "options": [
          {
            "id": "hurt",
            "label": "أُؤْذِيهِ",
            "emoji": "❌"
          },
          {
            "id": "ignore",
            "label": "أَتْرُكُهُ وَحْدَهُ",
            "emoji": "🚫"
          },
          {
            "id": "noise",
            "label": "أُزْعِجُهُ بِالصَّوْتِ",
            "emoji": "📢"
          },
          {
            "id": "kind",
            "label": "أَرْفُقُ بِهِ وَلَا أُؤْذِيهِ",
            "emoji": "🤲"
          }
        ],
        "correctId": "kind"
      }
    ]
  }
];

const BACKGROUND =
  "/lessons/v2/lesson55/s1.webp";

const C = {
  navy: "#17365f",
  navyDeep: "#0f2447",
  gold: "#e5a21b",
  white: "#ffffff",
  green: "#16845b",
  greenLight: "#dcf5e9",
};

function createShellItems(
  variants: AnimalVariant[],
): TapSelectImageItem[] {
  return variants.map(
    variant => ({
      question: variant.voiceText,
      question_audio_key:
        variant.audioKey,
      options: [],
      correct_index: 0,
      image_fit: "cover",
    }),
  );
}

function AnimalRoundView({
  context,
  variants,
}: {
  context:
    TapSelectImagesCustomContext;
  variants: AnimalVariant[];
}) {
  const variant =
    variants[context.itemIndex];

  const [
    selected,
    setSelected,
  ] = useState<string | null>(null);

  const choose = (
    optionId: string,
  ) => {
    if (context.locked) return;

    setSelected(optionId);

    if (
      optionId === variant.correctId
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
      <div style={styles.visualCard}>
        <div style={styles.animalEmoji}>
          {variant.visual.emoji}
        </div>

        <div style={styles.animalLabel}>
          {variant.visual.label}
        </div>
      </div>

      <div style={styles.options}>
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
                  ...styles.option,
                  borderColor:
                    isSelected
                      ? C.green
                      : C.gold,
                  background:
                    isSelected
                      ? C.greenLight
                      : C.white,
                  transform:
                    isSelected
                      ? "translateY(-3px) scale(1.03)"
                      : "scale(1)",
                }}
              >
                <span
                  style={styles.optionEmoji}
                >
                  {option.emoji ?? "🔹"}
                </span>

                <span
                  style={styles.optionLabel}
                >
                  {option.label}
                </span>
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}

function Lesson55Group({
  groupIndex,
  audio_base,
  onComplete,
}: ExerciseProps & {
  groupIndex: number;
}) {
  const group = GROUPS[groupIndex];

  const emojis = [
    "🐄",
    "🏡",
    "🌍",
    "❤️",
  ];

  const missions = [
    "مهمة الفوائد",
    "مهمة التصنيف",
    "مهمة الوسط",
    "مهمة الرفق",
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
        <AnimalRoundView
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
Lesson55PremiumExercise1V2(
  props: ExerciseProps,
) {
  return (
    <Lesson55Group
      {...props}
      groupIndex={0}
    />
  );
}

export function
Lesson55PremiumExercise2V2(
  props: ExerciseProps,
) {
  return (
    <Lesson55Group
      {...props}
      groupIndex={1}
    />
  );
}

export function
Lesson55PremiumExercise3V2(
  props: ExerciseProps,
) {
  return (
    <Lesson55Group
      {...props}
      groupIndex={2}
    />
  );
}

export function
Lesson55PremiumExercise4V2(
  props: ExerciseProps,
) {
  return (
    <Lesson55Group
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
      "clamp(185px,27dvh,275px)",
    padding: 16,
    display: "grid",
    placeItems: "center",
    alignContent: "center",
    gap: 8,
    borderRadius: 24,
    border:
      `4px solid ${C.gold}`,
    background:
      "linear-gradient(145deg,#ffffff,#fff4d5)",
    boxShadow:
      "0 11px 25px rgba(23,54,95,.15)",
  },

  animalEmoji: {
    fontSize:
      "clamp(86px,23vw,140px)",
    lineHeight: 1,
    filter:
      "drop-shadow(0 10px 10px rgba(0,0,0,.16))",
  },

  animalLabel: {
    color: C.navyDeep,
    fontSize:
      "clamp(22px,6vw,31px)",
    fontWeight: 950,
    lineHeight: 1.5,
  },

  options: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
    gap: 10,
  },

  option: {
    minHeight:
      "clamp(112px,16dvh,165px)",
    padding: "10px 8px",
    display: "grid",
    placeItems: "center",
    alignContent: "center",
    gap: 4,
    border: "4px solid",
    borderRadius: 20,
    color: C.navy,
    fontFamily:
      "Tajawal, sans-serif",
    cursor: "pointer",
    boxShadow:
      "0 7px 16px rgba(23,54,95,.13)",
    transition:
      "all .25s ease",
  },

  optionEmoji: {
    fontSize:
      "clamp(34px,9vw,52px)",
    lineHeight: 1.1,
  },

  optionLabel: {
    minHeight: 45,
    display: "grid",
    placeItems: "center",
    fontSize:
      "clamp(15px,4.1vw,20px)",
    fontWeight: 900,
    lineHeight: 1.5,
  },
};

// TAALIM_DZ_UNIFIED_VISUAL_HELPERS_55
const UNIFIED_EMOJIS_55 = ["🐄", "🏡", "🌍", "❤️"] as const;
const UNIFIED_MISSIONS_55 = ["مهمة الفوائد", "مهمة التصنيف", "مهمة الوسط", "مهمة الرفق"] as const;

export function getLesson55PremiumUnifiedItems(
  groupIndex: number,
): TapSelectImageItem[] {
  const group = GROUPS[groupIndex];
  return createShellItems(group.variants);
}

export function getLesson55PremiumUnifiedMeta(
  groupIndex: number,
) {
  return {
    backgroundImage: BACKGROUND,
    missionTitle: `${UNIFIED_EMOJIS_55[groupIndex]} ${UNIFIED_MISSIONS_55[groupIndex]}`,
  };
}

export function renderLesson55PremiumUnifiedVisual(
  groupIndex: number,
  context: TapSelectImagesCustomContext,
) {
  const group = GROUPS[groupIndex];
  return (
    <AnimalRoundView
      context={context}
      variants={group.variants}
    />
  );
}
