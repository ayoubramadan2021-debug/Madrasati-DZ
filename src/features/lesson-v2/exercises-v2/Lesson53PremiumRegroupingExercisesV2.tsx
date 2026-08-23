
import {
  useState,
  type CSSProperties,
} from "react";

import TapSelectImagesV2, {
  type TapSelectImageItem,
  type TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";

type ExerciseProps = {
  audio_base: string;
  onComplete?: () => void;
};

type Choice = {
  id: string;
  label: string;
};

type Visual =
  | {
      kind: "number";
      value: number;
    }
  | {
      kind: "base10";
      tens: number;
      ones: number;
    }
  | {
      kind: "exchange";
      units: number;
    }
  | {
      kind: "equation";
      expression: string;
    };

type Round = {
  question: string;
  audio: string;
  visual: Visual;
  choices: Choice[];
  correctId: string;
};

type Exercise = {
  title: string;
  emoji: string;
  mission: string;
  rounds: Round[];
};

const EXERCISES: Exercise[] =
[
  {
    "title": "أُمَثِّلُ الْعَدَدَ",
    "emoji": "🔢",
    "mission": "مهمة التمثيل",
    "rounds": [
      {
        "question": "أَيُّ تَمْثِيلٍ يُوَافِقُ الْعَدَدَ أَرْبَعَةً وَثَلَاثِينَ؟",
        "audio": "l53_ex1_q1_represent_34",
        "visual": {
          "kind": "number",
          "value": 34
        },
        "choices": [
          {
            "id": "swap",
            "label": "4 عَشَرَاتٍ وَ3 وَحَدَاتٍ"
          },
          {
            "id": "correct",
            "label": "3 عَشَرَاتٍ وَ4 وَحَدَاتٍ"
          },
          {
            "id": "less",
            "label": "3 عَشَرَاتٍ وَ5 وَحَدَاتٍ"
          },
          {
            "id": "other",
            "label": "2 عَشَرَتَانِ وَ4 وَحَدَاتٍ"
          }
        ],
        "correctId": "correct"
      },
      {
        "question": "أَيُّ تَمْثِيلٍ يُوَافِقُ الْعَدَدَ ثَمَانِيَةً وَعِشْرِينَ؟",
        "audio": "l53_ex1_q2_represent_28",
        "visual": {
          "kind": "number",
          "value": 28
        },
        "choices": [
          {
            "id": "swap",
            "label": "8 عَشَرَاتٍ وَ2 وَحْدَتَانِ"
          },
          {
            "id": "less",
            "label": "2 عَشَرَتَانِ وَ7 وَحَدَاتٍ"
          },
          {
            "id": "other",
            "label": "3 عَشَرَاتٍ وَ8 وَحَدَاتٍ"
          },
          {
            "id": "correct",
            "label": "2 عَشَرَتَانِ وَ8 وَحَدَاتٍ"
          }
        ],
        "correctId": "correct"
      },
      {
        "question": "أَيُّ تَمْثِيلٍ يُوَافِقُ الْعَدَدَ سَبْعَةً وَثَلَاثِينَ؟",
        "audio": "l53_ex1_q3_represent_37",
        "visual": {
          "kind": "number",
          "value": 37
        },
        "choices": [
          {
            "id": "correct",
            "label": "3 عَشَرَاتٍ وَ7 وَحَدَاتٍ"
          },
          {
            "id": "swap",
            "label": "7 عَشَرَاتٍ وَ3 وَحَدَاتٍ"
          },
          {
            "id": "less",
            "label": "3 عَشَرَاتٍ وَ6 وَحَدَاتٍ"
          },
          {
            "id": "other",
            "label": "2 عَشَرَتَانِ وَ7 وَحَدَاتٍ"
          }
        ],
        "correctId": "correct"
      },
      {
        "question": "أَيُّ تَمْثِيلٍ يُوَافِقُ الْعَدَدَ اثْنَيْنِ وَعِشْرِينَ؟",
        "audio": "l53_ex1_q4_represent_22",
        "visual": {
          "kind": "number",
          "value": 22
        },
        "choices": [
          {
            "id": "swap",
            "label": "4 عَشَرَاتٍ وَ4 وَحَدَاتٍ"
          },
          {
            "id": "less",
            "label": "2 عَشَرَتَانِ وَ3 وَحَدَاتٍ"
          },
          {
            "id": "correct",
            "label": "2 عَشَرَتَانِ وَ2 وَحْدَتَانِ"
          },
          {
            "id": "other",
            "label": "عَشَرَةٌ وَوَحْدَتَانِ"
          }
        ],
        "correctId": "correct"
      }
    ]
  },
  {
    "title": "أَعُدُّ الْعَشَرَاتِ وَالْوَحَدَاتِ",
    "emoji": "🧮",
    "mission": "مهمة العد",
    "rounds": [
      {
        "question": "أَعُدُّ الْعَشَرَاتِ وَالْوَحَدَاتِ، ثُمَّ أَخْتَارُ الْعَدَدَ الصَّحِيحَ.",
        "audio": "l53_ex2_q1_count_24",
        "visual": {
          "kind": "base10",
          "tens": 2,
          "ones": 4
        },
        "choices": [
          {
            "id": "42",
            "label": "42"
          },
          {
            "id": "23",
            "label": "23"
          },
          {
            "id": "24",
            "label": "24"
          },
          {
            "id": "34",
            "label": "34"
          }
        ],
        "correctId": "24"
      },
      {
        "question": "أَعُدُّ الْعَشَرَاتِ وَالْوَحَدَاتِ، ثُمَّ أَخْتَارُ الْعَدَدَ الصَّحِيحَ.",
        "audio": "l53_ex2_q2_count_31",
        "visual": {
          "kind": "base10",
          "tens": 3,
          "ones": 1
        },
        "choices": [
          {
            "id": "31",
            "label": "31"
          },
          {
            "id": "13",
            "label": "13"
          },
          {
            "id": "30",
            "label": "30"
          },
          {
            "id": "41",
            "label": "41"
          }
        ],
        "correctId": "31"
      },
      {
        "question": "أَعُدُّ الْعَشَرَاتِ وَالْوَحَدَاتِ، ثُمَّ أَخْتَارُ الْعَدَدَ الصَّحِيحَ.",
        "audio": "l53_ex2_q3_count_18",
        "visual": {
          "kind": "base10",
          "tens": 1,
          "ones": 8
        },
        "choices": [
          {
            "id": "81",
            "label": "81"
          },
          {
            "id": "17",
            "label": "17"
          },
          {
            "id": "28",
            "label": "28"
          },
          {
            "id": "18",
            "label": "18"
          }
        ],
        "correctId": "18"
      },
      {
        "question": "أَعُدُّ الْعَشَرَاتِ وَالْوَحَدَاتِ، ثُمَّ أَخْتَارُ الْعَدَدَ الصَّحِيحَ.",
        "audio": "l53_ex2_q4_count_36",
        "visual": {
          "kind": "base10",
          "tens": 3,
          "ones": 6
        },
        "choices": [
          {
            "id": "63",
            "label": "63"
          },
          {
            "id": "36",
            "label": "36"
          },
          {
            "id": "35",
            "label": "35"
          },
          {
            "id": "26",
            "label": "26"
          }
        ],
        "correctId": "36"
      }
    ]
  },
  {
    "title": "أَسْتَبْدِلُ الْوَحَدَاتِ بِالْعَشَرَاتِ",
    "emoji": "🔄",
    "mission": "مهمة الاستبدال",
    "rounds": [
      {
        "question": "كَمْ عَشَرَةً نَحْصُلُ عَلَيْهَا عِنْدَ اسْتِبْدَالِ عَشْرِ وَحَدَاتٍ؟",
        "audio": "l53_ex3_q1_exchange_10",
        "visual": {
          "kind": "exchange",
          "units": 10
        },
        "choices": [
          {
            "id": "2",
            "label": "عَشَرَتَانِ"
          },
          {
            "id": "10",
            "label": "عَشْرُ عَشَرَاتٍ"
          },
          {
            "id": "0",
            "label": "لَا شَيْءَ"
          },
          {
            "id": "1",
            "label": "عَشَرَةٌ وَاحِدَةٌ"
          }
        ],
        "correctId": "1"
      },
      {
        "question": "كَمْ عَشَرَةً نَحْصُلُ عَلَيْهَا عِنْدَ اسْتِبْدَالِ عِشْرِينَ وَحْدَةً؟",
        "audio": "l53_ex3_q2_exchange_20",
        "visual": {
          "kind": "exchange",
          "units": 20
        },
        "choices": [
          {
            "id": "1",
            "label": "عَشَرَةٌ وَاحِدَةٌ"
          },
          {
            "id": "2",
            "label": "عَشَرَتَانِ"
          },
          {
            "id": "3",
            "label": "ثَلَاثُ عَشَرَاتٍ"
          },
          {
            "id": "20",
            "label": "عِشْرُونَ عَشَرَةً"
          }
        ],
        "correctId": "2"
      },
      {
        "question": "كَمْ عَشَرَةً نَحْصُلُ عَلَيْهَا عِنْدَ اسْتِبْدَالِ ثَلَاثِينَ وَحْدَةً؟",
        "audio": "l53_ex3_q3_exchange_30",
        "visual": {
          "kind": "exchange",
          "units": 30
        },
        "choices": [
          {
            "id": "2",
            "label": "عَشَرَتَانِ"
          },
          {
            "id": "4",
            "label": "أَرْبَعُ عَشَرَاتٍ"
          },
          {
            "id": "3",
            "label": "ثَلَاثُ عَشَرَاتٍ"
          },
          {
            "id": "30",
            "label": "ثَلَاثُونَ عَشَرَةً"
          }
        ],
        "correctId": "3"
      },
      {
        "question": "كَمْ عَشَرَةً نَحْصُلُ عَلَيْهَا عِنْدَ اسْتِبْدَالِ أَرْبَعِينَ وَحْدَةً؟",
        "audio": "l53_ex3_q4_exchange_40",
        "visual": {
          "kind": "exchange",
          "units": 40
        },
        "choices": [
          {
            "id": "4",
            "label": "أَرْبَعُ عَشَرَاتٍ"
          },
          {
            "id": "3",
            "label": "ثَلَاثُ عَشَرَاتٍ"
          },
          {
            "id": "5",
            "label": "خَمْسُ عَشَرَاتٍ"
          },
          {
            "id": "40",
            "label": "أَرْبَعُونَ عَشَرَةً"
          }
        ],
        "correctId": "4"
      }
    ]
  },
  {
    "title": "أُحَلِّلُ الْعَدَدَ",
    "emoji": "🧩",
    "mission": "مهمة التحليل",
    "rounds": [
      {
        "question": "أَخْتَارُ التَّحْلِيلَ الصَّحِيحَ لِلْعَدَدِ سِتَّةٍ وَعِشْرِينَ.",
        "audio": "l53_ex4_q1_decompose_26",
        "visual": {
          "kind": "equation",
          "expression": "26 = ؟ + ؟"
        },
        "choices": [
          {
            "id": "correct",
            "label": "20 + 6"
          },
          {
            "id": "a",
            "label": "10 + 6"
          },
          {
            "id": "b",
            "label": "20 + 5"
          },
          {
            "id": "c",
            "label": "30 + 6"
          }
        ],
        "correctId": "correct"
      },
      {
        "question": "أَخْتَارُ التَّحْلِيلَ الصَّحِيحَ لِلْعَدَدِ تِسْعَةٍ وَثَلَاثِينَ.",
        "audio": "l53_ex4_q2_decompose_39",
        "visual": {
          "kind": "equation",
          "expression": "39 = ؟ + ؟"
        },
        "choices": [
          {
            "id": "a",
            "label": "20 + 9"
          },
          {
            "id": "b",
            "label": "30 + 8"
          },
          {
            "id": "correct",
            "label": "30 + 9"
          },
          {
            "id": "c",
            "label": "40 + 9"
          }
        ],
        "correctId": "correct"
      },
      {
        "question": "أَخْتَارُ التَّحْلِيلَ الصَّحِيحَ لِلْعَدَدِ أَرْبَعَةَ عَشَرَ.",
        "audio": "l53_ex4_q3_decompose_14",
        "visual": {
          "kind": "equation",
          "expression": "14 = ؟ + ؟"
        },
        "choices": [
          {
            "id": "a",
            "label": "20 + 4"
          },
          {
            "id": "correct",
            "label": "10 + 4"
          },
          {
            "id": "b",
            "label": "10 + 3"
          },
          {
            "id": "c",
            "label": "4 + 4"
          }
        ],
        "correctId": "correct"
      },
      {
        "question": "أَخْتَارُ التَّحْلِيلَ الصَّحِيحَ لِلْعَدَدِ اثْنَيْنِ وَثَلَاثِينَ.",
        "audio": "l53_ex4_q4_decompose_32",
        "visual": {
          "kind": "equation",
          "expression": "32 = ؟ + ؟"
        },
        "choices": [
          {
            "id": "a",
            "label": "20 + 2"
          },
          {
            "id": "b",
            "label": "30 + 3"
          },
          {
            "id": "c",
            "label": "40 + 2"
          },
          {
            "id": "correct",
            "label": "30 + 2"
          }
        ],
        "correctId": "correct"
      }
    ]
  }
];

const BACKGROUND =
  "/lessons/v2/lesson53/s1.webp";

const C = {
  navy: "#17365f",
  navyDeep: "#0f2447",
  gold: "#e5a21b",
  goldLight: "#fff1c9",
  white: "#ffffff",
  green: "#16845b",
  greenLight: "#dcf5e9",
  blue: "#2877b9",
  blueLight: "#e3f2ff",
};

function createShellItems(
  rounds: Round[],
): TapSelectImageItem[] {
  return rounds.map(round => ({
    question: round.question,
    question_audio_key: round.audio,
    options: [],
    correct_index: 0,
    image_fit: "cover",
  }));
}

function BaseTenVisual({
  tens,
  ones,
}: {
  tens: number;
  ones: number;
}) {
  return (
    <div style={styles.baseTen}>
      <div style={styles.tensWrap}>
        {Array.from(
          { length: tens },
          (_, index) => (
            <div
              key={index}
              style={styles.tenBar}
            >
              {Array.from(
                { length: 10 },
                (_, cell) => (
                  <span
                    key={cell}
                    style={styles.tenCell}
                  />
                ),
              )}
            </div>
          ),
        )}
      </div>

      <div style={styles.onesWrap}>
        {Array.from(
          { length: ones },
          (_, index) => (
            <span
              key={index}
              style={styles.oneCircle}
            />
          ),
        )}
      </div>
    </div>
  );
}

function RoundVisual({
  visual,
  revealedChoice,
}: {
  visual: Visual;
  revealedChoice?: string | null;
}) {
  if (visual.kind === "number") {
    return (
      <div style={styles.numberVisual}>
        {visual.value}
      </div>
    );
  }

  if (visual.kind === "base10") {
    return (
      <BaseTenVisual
        tens={visual.tens}
        ones={visual.ones}
      />
    );
  }

  if (visual.kind === "exchange") {
    const tens =
      Math.floor(visual.units / 10);

    return (
      <div style={styles.exchange}>
        <div style={styles.unitsGroup}>
          {Array.from(
            { length: visual.units },
            (_, index) => (
              <span
                key={index}
                style={styles.unitDot}
              />
            ),
          )}
        </div>

        <div style={styles.exchangeArrow}>
          ⇄
        </div>

        <div style={styles.exchangeResult}>
          <strong>{tens}</strong>
          <span>
            {tens === 1
              ? "عَشَرَةٌ"
              : "عَشَرَاتٌ"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      style={styles.equation}
    >
      {revealedChoice
        ? `${visual.expression
            .split("=")[0]
            .trim()} = ${revealedChoice}`
        : visual.expression}
    </div>
  );
}

function ChoiceRoundView({
  context,
  rounds,
}: {
  context: TapSelectImagesCustomContext;
  rounds: Round[];
}) {
  const round = rounds[context.itemIndex];

  const [
    selected,
    setSelected,
  ] = useState<string | null>(null);

  const choose = (
    choiceId: string,
  ) => {
    if (context.locked) return;

    setSelected(choiceId);

    if (choiceId === round.correctId) {
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
      <RoundVisual
        visual={round.visual}
        revealedChoice={
          selected === round.correctId
            ? round.choices.find(
                choice =>
                  choice.id ===
                  round.correctId,
              )?.label ?? null
            : null
        }
      />

      <div style={styles.choices}>
        {round.choices.map(choice => {
          const isSelected =
            selected === choice.id;

          return (
            <button
              key={choice.id}
              type="button"
              disabled={context.locked}
              onClick={() =>
                choose(choice.id)
              }
              style={{
                ...styles.choice,
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
                    ? "translateY(-3px) scale(1.02)"
                    : "scale(1)",
              }}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Lesson53Exercise({
  exerciseIndex,
  audio_base,
  onComplete,
}: ExerciseProps & {
  exerciseIndex: number;
}) {
  const exercise =
    EXERCISES[exerciseIndex];

  const items =
    createShellItems(
      exercise.rounds,
    );

  return (
    <TapSelectImagesV2
      items={items}
      audio_base={audio_base}
      background_image={BACKGROUND}
      progress_emoji={exercise.emoji}
      mission_prefix={exercise.mission}
      render_custom={context => (
        <ChoiceRoundView
          key={context.itemIndex}
          context={context}
          rounds={exercise.rounds}
        />
      )}
      onComplete={() => {
        onComplete?.();
      }}
    />
  );
}

export function
Lesson53PremiumExercise1V2(
  props: ExerciseProps,
) {
  return (
    <Lesson53Exercise
      {...props}
      exerciseIndex={0}
    />
  );
}

export function
Lesson53PremiumExercise2V2(
  props: ExerciseProps,
) {
  return (
    <Lesson53Exercise
      {...props}
      exerciseIndex={1}
    />
  );
}

export function
Lesson53PremiumExercise3V2(
  props: ExerciseProps,
) {
  return (
    <Lesson53Exercise
      {...props}
      exerciseIndex={2}
    />
  );
}

export function
Lesson53PremiumExercise4V2(
  props: ExerciseProps,
) {
  return (
    <Lesson53Exercise
      {...props}
      exerciseIndex={3}
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
    gap: 15,
  },

  numberVisual: {
    minHeight:
      "clamp(140px,22dvh,210px)",
    display: "grid",
    placeItems: "center",
    borderRadius: 24,
    border:
      `4px solid ${C.gold}`,
    background:
      "linear-gradient(145deg,#ffffff,#fff1c9)",
    color: C.navyDeep,
    fontSize:
      "clamp(74px,21vw,125px)",
    fontWeight: 950,
    boxShadow:
      "0 11px 25px rgba(23,54,95,.15)",
  },

  baseTen: {
    minHeight:
      "clamp(165px,24dvh,235px)",
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    borderRadius: 24,
    border:
      `4px solid ${C.gold}`,
    background: C.white,
    boxShadow:
      "0 11px 25px rgba(23,54,95,.14)",
  },

  tensWrap: {
    display: "flex",
    gap: 7,
    alignItems: "flex-end",
  },

  tenBar: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,18px)",
    gap: 3,
    padding: 6,
    borderRadius: 12,
    background: C.gold,
    boxShadow:
      "0 5px 12px rgba(229,162,27,.25)",
  },

  tenCell: {
    width: 17,
    height: 17,
    borderRadius: 4,
    background: "#fff6d7",
  },

  onesWrap: {
    maxWidth: 105,
    display: "grid",
    gridTemplateColumns:
      "repeat(4,22px)",
    gap: 7,
  },

  oneCircle: {
    width: 21,
    height: 21,
    borderRadius: "50%",
    background: C.blue,
    boxShadow:
      "inset 0 -3px 0 rgba(0,0,0,.15)",
  },

  exchange: {
    minHeight:
      "clamp(190px,27dvh,270px)",
    padding: 15,
    display: "grid",
    gridTemplateColumns:
      "1fr auto 105px",
    alignItems: "center",
    gap: 12,
    borderRadius: 24,
    border:
      `4px solid ${C.gold}`,
    background: C.white,
    boxShadow:
      "0 11px 25px rgba(23,54,95,.14)",
  },

  unitsGroup: {
    display: "grid",
    gridTemplateColumns:
      "repeat(10,12px)",
    justifyContent: "center",
    gap: 4,
  },

  unitDot: {
    width: 11,
    height: 11,
    borderRadius: "50%",
    background: C.blue,
  },

  exchangeArrow: {
    color: C.gold,
    fontSize:
      "clamp(34px,9vw,52px)",
    fontWeight: 950,
  },

  exchangeResult: {
    minHeight: 105,
    display: "grid",
    placeItems: "center",
    alignContent: "center",
    gap: 3,
    borderRadius: 21,
    background: C.blueLight,
    border:
      `3px solid ${C.blue}`,
    color: C.navy,
    fontSize: 17,
    fontWeight: 900,
  },

  equation: {
    minHeight:
      "clamp(145px,22dvh,210px)",
    display: "grid",
    placeItems: "center",
    borderRadius: 24,
    border:
      `4px solid ${C.gold}`,
    background:
      "linear-gradient(145deg,#ffffff,#fff1c9)",
    color: C.navyDeep,
    fontSize:
      "clamp(43px,13vw,75px)",
    fontWeight: 950,
    boxShadow:
      "0 11px 25px rgba(23,54,95,.15)",
  },

  choices: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
    gap: 10,
  },

  choice: {
    minHeight:
      "clamp(92px,13dvh,135px)",
    padding: "12px 9px",
    border: "4px solid",
    borderRadius: 20,
    color: C.navy,
    fontFamily:
      "Tajawal, sans-serif",
    fontSize:
      "clamp(17px,4.7vw,23px)",
    fontWeight: 900,
    lineHeight: 1.55,
    cursor: "pointer",
    boxShadow:
      "0 7px 16px rgba(23,54,95,.13)",
    transition:
      "all .25s ease",
  },
};

// TAALIM_DZ_UNIFIED_VISUAL_HELPERS_53
export function getLesson53PremiumUnifiedItems(
  exerciseIndex: number,
): TapSelectImageItem[] {
  const exercise = EXERCISES[exerciseIndex];
  return createShellItems(exercise.rounds);
}

export function getLesson53PremiumUnifiedMeta(
  exerciseIndex: number,
) {
  const exercise = EXERCISES[exerciseIndex];
  return {
    backgroundImage: BACKGROUND,
    missionTitle: `${exercise.emoji} ${exercise.mission}`,
  };
}

export function renderLesson53PremiumUnifiedVisual(
  exerciseIndex: number,
  context: TapSelectImagesCustomContext,
) {
  const exercise = EXERCISES[exerciseIndex];
  return (
    <ChoiceRoundView
      context={context}
      rounds={exercise.rounds}
    />
  );
}
