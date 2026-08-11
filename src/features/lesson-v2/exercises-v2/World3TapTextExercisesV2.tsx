import {
  useEffect,
  useMemo,
  useState,
} from "react";

import LessonCompleteV2 from
  "../components/LessonCompleteV2";

import TapSelectImagesV2, {
  type TapSelectImageItem,
  type TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";

type Stage = 0 | 1 | 2 | 3 | 4;

export type FourTapExercises = [
  TapSelectImageItem[],
  TapSelectImageItem[],
  TapSelectImageItem[],
  TapSelectImageItem[],
];

type Props = {
  lessonKey: string;
  exercises: FourTapExercises;
  audioBase: string;
  backgrounds: [
    string,
    string,
    string,
    string,
  ];
  message: string;
  nextPath: string;
  quizPath: string;
};

type NumberLineSpec = {
  start: number;
  steps: number;
  end: number;
};

type EquationSpec = {
  left?: number;
  op: "+" | "-";
  right?: number;
  result: number;
  missing: "left" | "right";
};

const NUMBER_LINE_MAP:
Record<string, NumberLineSpec> = {
  lesson57_ex3_q1: {
    start: 12,
    steps: 3,
    end: 15,
  },
  lesson57_ex3_q2: {
    start: 17,
    steps: 2,
    end: 19,
  },
  lesson57_ex3_q3: {
    start: 13,
    steps: 5,
    end: 18,
  },
  lesson57_ex3_q4: {
    start: 31,
    steps: 8,
    end: 39,
  },
};

const EQUATION_MAP:
Record<string, EquationSpec> = {
  lesson57_ex4_q1: {
    left: 13,
    op: "+",
    result: 18,
    missing: "right",
  },
  lesson57_ex4_q2: {
    op: "+",
    right: 4,
    result: 26,
    missing: "left",
  },
  lesson57_ex4_q3: {
    left: 9,
    op: "-",
    result: 3,
    missing: "right",
  },
  lesson57_ex4_q4: {
    left: 29,
    op: "-",
    result: 24,
    missing: "right",
  },
};

const ANIMAL_IMAGE_MAP:
Record<string, string> = {
  "حصان": "/lessons/v2/lesson58/animals/horse.svg",
  "الحصان": "/lessons/v2/lesson58/animals/horse.svg",
  "بقرة": "/lessons/v2/lesson58/animals/cow.svg",
  "البقرة": "/lessons/v2/lesson58/animals/cow.svg",
  "أرنب": "/lessons/v2/lesson58/animals/rabbit.svg",
  "الأرنب": "/lessons/v2/lesson58/animals/rabbit.svg",
  "أسد": "/lessons/v2/lesson58/animals/lion.svg",
  "الأسد": "/lessons/v2/lesson58/animals/lion.svg",
  "نمر": "/lessons/v2/lesson58/animals/tiger.svg",
  "النمر": "/lessons/v2/lesson58/animals/tiger.svg",
  "دجاجة": "/lessons/v2/lesson58/animals/chicken.svg",
  "الدجاجة": "/lessons/v2/lesson58/animals/chicken.svg",
  "كتاكيت": "/lessons/v2/lesson58/animals/chicks.svg",
  "الأعشاب": "/lessons/v2/lesson58/animals/grass.svg",
  "أعشاب": "/lessons/v2/lesson58/animals/grass.svg",
  "اللحوم": "/lessons/v2/lesson58/animals/meat.svg",
  "لحوم": "/lessons/v2/lesson58/animals/meat.svg",
  "بيض": "/lessons/v2/lesson58/animals/egg.svg",
  "بَيُوض": "/lessons/v2/lesson58/animals/egg.svg",
  "وَلُود": "/lessons/v2/lesson58/animals/baby.svg",
};

function normalizeDigits(
  text: string,
) {
  const map: Record<string, string> = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };

  return text.replace(
    /[٠-٩]/g,
    char => map[char] ?? char,
  );
}

function parseTensUnits(
  text: string,
) {
  const normalized =
    normalizeDigits(text);

  if (
    !normalized.includes("عشرات")
    && !normalized.includes("عشرة")
  ) {
    return null;
  }

  const matches = [
    ...normalized.matchAll(/\d+/g),
  ].map(match =>
    Number(match[0]),
  );

  if (!matches.length) {
    return null;
  }

  const tens = matches[0] ?? 0;
  let units = 0;

  if (matches.length >= 2) {
    units = matches[1] ?? 0;
  } else if (
    normalized.includes("وحدة")
  ) {
    units = 1;
  }

  return {
    tens,
    units,
    label: text,
  };
}

function extractAnimalImages(
  text: string,
) {
  const found = new Set<string>();

  Object.entries(
    ANIMAL_IMAGE_MAP,
  ).forEach(
    ([key, src]) => {
      if (text.includes(key)) {
        found.add(src);
      }
    },
  );

  return Array.from(found);
}

function NumberBadge({
  value,
  active,
  highlighted,
}: {
  value: number;
  active?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        fontSize: 15,
        border: highlighted
          ? "3px solid #2E9B62"
          : active
            ? "3px solid #E2B24D"
            : "2px solid rgba(27,58,107,0.18)",
        background: highlighted
          ? "#DDF5E8"
          : active
            ? "#FFF5D8"
            : "#FFFFFF",
        color: "#1B3A6B",
        boxShadow:
          "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      {value}
    </div>
  );
}

function HopArc({
  label,
}: {
  label: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: 2,
        justifyItems: "center",
        marginTop: 2,
      }}
    >
      <div
        style={{
          fontSize: 18,
          color: "#E2B24D",
          lineHeight: 1,
        }}
      >
        ⤴
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: "#1B3A6B",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function NumberLineAid({
  spec,
}: {
  spec: NumberLineSpec;
}) {
  const values =
    Array.from(
      { length: spec.end - spec.start + 1 },
      (_, index) =>
        spec.start + index,
    );

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "3px solid rgba(226,178,77,0.55)",
        borderRadius: 26,
        padding: "16px 12px 18px",
        boxShadow:
          "0 10px 24px rgba(0,0,0,0.08)",
        display: "grid",
        gap: 14,
      }}
    >
      <div
        style={{
          fontSize: "clamp(18px, 3.9vw, 24px)",
          fontWeight: 900,
          color: "#1B3A6B",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        نَنْطَلِقُ مِنْ{" "}
        <span style={{ color: "#2E9B62" }}>
          {spec.start}
        </span>
        {" "}وَنَتَقَدَّمُ{" "}
        <span style={{ color: "#E2B24D" }}>
          {spec.steps}
        </span>
        {" "}خُطُوَاتٍ.
      </div>

      <div
        style={{
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        <div
          style={{
            minWidth: "max-content",
            display: "grid",
            gap: 8,
            alignItems: "end",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${values.length}, 34px)`,
              gap: 10,
              alignItems: "center",
            }}
          >
            {values.map(value => {
              const offset =
                value - spec.start;
              const shouldShowHop =
                offset > 0
                && offset <= spec.steps;

              return (
                <div
                  key={value}
                  style={{
                    display: "grid",
                    justifyItems: "center",
                    gap: 4,
                  }}
                >
                  {shouldShowHop ? (
                    <HopArc
                      label={`+1`}
                    />
                  ) : (
                    <div
                      style={{
                        height: 28,
                      }}
                    />
                  )}

                  <NumberBadge
                    value={value}
                    active={
                      value === spec.start
                    }
                    highlighted={
                      value === spec.end
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: "clamp(17px, 3.6vw, 22px)",
          fontWeight: 900,
          color: "#1B3A6B",
          textAlign: "center",
        }}
      >
        نَصِلُ إِلَى:
        {" "}
        <span style={{ color: "#2E9B62" }}>
          {spec.end}
        </span>
      </div>
    </div>
  );
}

function EquationCell({
  text,
  filled,
}: {
  text: string;
  filled?: boolean;
}) {
  return (
    <div
      style={{
        minWidth: 58,
        minHeight: 58,
        padding: "6px 10px",
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "clamp(24px, 4.8vw, 32px)",
        fontWeight: 900,
        background: filled
          ? "#DDF5E8"
          : "#FFFFFF",
        border: filled
          ? "3px solid #2E9B62"
          : "3px solid rgba(27,58,107,0.16)",
        color: filled
          ? "#2E9B62"
          : "#1B3A6B",
        boxShadow:
          "0 6px 14px rgba(0,0,0,0.08)",
      }}
    >
      {text}
    </div>
  );
}

function EquationAid({
  spec,
  selectedValue,
  isCorrect,
}: {
  spec: EquationSpec;
  selectedValue: string | null;
  isCorrect: boolean;
}) {
  const leftText =
    spec.missing === "left"
      ? isCorrect && selectedValue
        ? selectedValue
        : "؟"
      : String(spec.left ?? "");

  const rightText =
    spec.missing === "right"
      ? isCorrect && selectedValue
        ? selectedValue
        : "؟"
      : String(spec.right ?? "");

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "3px solid rgba(226,178,77,0.55)",
        borderRadius: 26,
        padding: "18px 12px",
        boxShadow:
          "0 10px 24px rgba(0,0,0,0.08)",
        display: "grid",
        gap: 14,
      }}
    >
      <div
        style={{
          fontSize: "clamp(18px, 3.9vw, 24px)",
          fontWeight: 900,
          color: "#1B3A6B",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        أَكْمِلِ الْعَمَلِيَّةَ.
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          flexWrap: "wrap",
          direction: "ltr",
        }}
      >
        <EquationCell
          text={leftText}
          filled={
            spec.missing === "left"
            && isCorrect
          }
        />
        <EquationCell
          text={spec.op}
        />
        <EquationCell
          text={rightText}
          filled={
            spec.missing === "right"
            && isCorrect
          }
        />
        <EquationCell text="=" />
        <EquationCell
          text={String(spec.result)}
        />
      </div>
    </div>
  );
}

function AnimalSceneAid({
  stageIndex,
}: {
  stageIndex: number;
}) {
  const sceneByStage = [
    [
      "/lessons/v2/lesson58/animals/horse.svg",
      "/lessons/v2/lesson58/animals/cow.svg",
      "/lessons/v2/lesson58/animals/rabbit.svg",
      "/lessons/v2/lesson58/animals/grass.svg",
    ],
    [
      "/lessons/v2/lesson58/animals/lion.svg",
      "/lessons/v2/lesson58/animals/tiger.svg",
      "/lessons/v2/lesson58/animals/meat.svg",
    ],
    [
      "/lessons/v2/lesson58/animals/chicken.svg",
      "/lessons/v2/lesson58/animals/egg.svg",
      "/lessons/v2/lesson58/animals/chicks.svg",
      "/lessons/v2/lesson58/animals/rabbit.svg",
    ],
    [
      "/lessons/v2/lesson58/animals/horse.svg",
      "/lessons/v2/lesson58/animals/lion.svg",
      "/lessons/v2/lesson58/animals/chicken.svg",
      "/lessons/v2/lesson58/animals/rabbit.svg",
    ],
  ];

  const items =
    sceneByStage[stageIndex] ?? [];

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "3px solid rgba(226,178,77,0.55)",
        borderRadius: 26,
        padding: "12px",
        boxShadow:
          "0 10px 24px rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      {items.map(src => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            width: 58,
            height: 58,
            objectFit: "contain",
          }}
        />
      ))}
    </div>
  );
}

function TenRod({
  index,
}: {
  index: number;
}) {
  return (
    <div
      key={`rod-${index}`}
      style={{
        width: 18,
        minWidth: 18,
        borderRadius: 10,
        padding: 3,
        background:
          "linear-gradient(180deg, #72A9E8 0%, #4B88CE 100%)",
        display: "grid",
        gridTemplateColumns:
          "repeat(2, 1fr)",
        gap: 2,
        boxShadow:
          "0 4px 10px rgba(0,0,0,0.10)",
      }}
    >
      {Array.from({
        length: 10,
      }).map((_, cellIndex) => (
        <span
          key={cellIndex}
          style={{
            width: 4,
            height: 8,
            borderRadius: 2,
            background: "#EAF4FF",
            display: "block",
          }}
        />
      ))}
    </div>
  );
}

function UnitDot({
  index,
}: {
  index: number;
}) {
  return (
    <span
      key={`unit-${index}`}
      style={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        display: "inline-block",
        background:
          "linear-gradient(180deg, #F8C95C 0%, #F1A93B 100%)",
        boxShadow:
          "0 3px 8px rgba(0,0,0,0.12)",
      }}
    />
  );
}

function ChoiceBody({
  text,
  useBundles,
  useAnimalImages,
}: {
  text: string;
  useBundles: boolean;
  useAnimalImages: boolean;
}) {
  if (useBundles) {
    const parsed =
      parseTensUnits(text);

    if (!parsed) {
      return (
        <span
          style={{
            fontSize:
              "clamp(23px, 4.5vw, 32px)",
            lineHeight: 1.5,
            fontWeight: 900,
          }}
        >
          {text}
        </span>
      );
    }

    return (
      <div
        style={{
          width: "100%",
          display: "grid",
          gap: 12,
          justifyItems: "center",
        }}
      >
        <div
          style={{
            fontSize:
              "clamp(18px, 3.7vw, 26px)",
            fontWeight: 900,
            color: "#1B3A6B",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {parsed.label}
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "flex-end",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {Array.from({
              length: parsed.tens,
            }).map((_, index) => (
              <TenRod
                key={index}
                index={index}
              />
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(5, 14px)",
              gap: 7,
              justifyContent:
                "center",
              alignItems: "center",
              minWidth: 24,
            }}
          >
            {Array.from({
              length: parsed.units,
            }).map((_, index) => (
              <UnitDot
                key={index}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (useAnimalImages) {
    const images =
      extractAnimalImages(text);

    return (
      <div
        style={{
          width: "100%",
          display: "grid",
          gap: 10,
          justifyItems: "center",
        }}
      >
        {images.length ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {images.map(src => (
              <img
                key={src}
                src={src}
                alt=""
                style={{
                  width: 52,
                  height: 52,
                  objectFit: "contain",
                }}
              />
            ))}
          </div>
        ) : null}

        <div
          style={{
            fontSize:
              "clamp(22px, 4.6vw, 32px)",
            lineHeight: 1.45,
            fontWeight: 900,
            wordBreak: "break-word",
            textAlign: "center",
          }}
        >
          {text}
        </div>
      </div>
    );
  }

  return (
    <span
      style={{
        fontSize:
          "clamp(24px, 4.7vw, 34px)",
        lineHeight: 1.5,
        fontWeight: 900,
        wordBreak: "break-word",
      }}
    >
      {text}
    </span>
  );
}

function SupplementalVisual({
  lessonKey,
  stageIndex,
  context,
  selectedValue,
  isCorrect,
}: {
  lessonKey: string;
  stageIndex: number;
  context: TapSelectImagesCustomContext;
  selectedValue: string | null;
  isCorrect: boolean;
}) {
  if (
    lessonKey === "lesson57"
    && stageIndex === 2
  ) {
    const spec =
      NUMBER_LINE_MAP[
        context.item
          .question_audio_key
      ];

    return spec ? (
      <NumberLineAid
        spec={spec}
      />
    ) : null;
  }

  if (
    lessonKey === "lesson57"
    && stageIndex === 3
  ) {
    const spec =
      EQUATION_MAP[
        context.item
          .question_audio_key
      ];

    return spec ? (
      <EquationAid
        spec={spec}
        selectedValue={selectedValue}
        isCorrect={isCorrect}
      />
    ) : null;
  }

  if (lessonKey === "lesson58") {
    return (
      <AnimalSceneAid
        stageIndex={stageIndex}
      />
    );
  }

  return null;
}

function TextChoiceGrid({
  lessonKey,
  stageIndex,
  context,
}: {
  lessonKey: string;
  stageIndex: number;
  context: TapSelectImagesCustomContext;
}) {
  const {
    item,
    itemIndex,
    locked,
    feedbackState,
    completeRound,
    showWrong,
  } = context;

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState<number | null>(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [itemIndex]);

  useEffect(() => {
    if (feedbackState === "idle") {
      setSelectedIndex(null);
    }
  }, [feedbackState]);

  const useBundles =
    lessonKey === "lesson56"
    && stageIndex === 1;

  const useAnimalImages =
    lessonKey === "lesson58";

  const selectedValue =
    selectedIndex !== null
      ? item.options[selectedIndex]
      : null;

  const isCorrect =
    selectedIndex !== null
    && selectedIndex === item.correct_index
    && feedbackState === "correct";

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        maxWidth: 920,
        margin: "0 auto",
        display: "grid",
        gap: 18,
      }}
    >
      <SupplementalVisual
        lessonKey={lessonKey}
        stageIndex={stageIndex}
        context={context}
        selectedValue={selectedValue}
        isCorrect={isCorrect}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        {item.options.map(
          (option, optionIndex) => {
            const selected =
              selectedIndex === optionIndex;

            const correct =
              optionIndex ===
              item.correct_index;

            const selectedCorrect =
              selected
              && feedbackState === "correct";

            const selectedWrong =
              selected
              && feedbackState === "wrong";

            return (
              <button
                key={`${itemIndex}-${optionIndex}`}
                type="button"
                disabled={locked}
                onClick={() => {
                  if (locked) {
                    return;
                  }

                  setSelectedIndex(
                    optionIndex,
                  );

                  if (correct) {
                    completeRound();
                  } else {
                    showWrong(() => {
                      setSelectedIndex(
                        null,
                      );
                    });
                  }
                }}
                style={{
                  minHeight:
                    useBundles || useAnimalImages
                      ? 180
                      : 130,
                  borderRadius: 26,
                  border:
                    selectedCorrect
                      ? "4px solid #2E9B62"
                      : selectedWrong
                        ? "4px solid #D45447"
                        : "3px solid rgba(27,58,107,0.16)",
                  background:
                    selectedCorrect
                      ? "#DDF5E8"
                      : selectedWrong
                        ? "#FBE2DE"
                        : "#FFFFFF",
                  color: "#1B3A6B",
                  padding:
                    useBundles || useAnimalImages
                      ? "18px 12px"
                      : "18px 14px",
                  cursor:
                    locked
                      ? "default"
                      : "pointer",
                  boxShadow:
                    selected
                      ? "0 7px 0 rgba(27,58,107,0.12)"
                      : "0 6px 16px rgba(0,0,0,0.08)",
                  transform:
                    selected
                      ? "translateY(2px)"
                      : "none",
                  transition:
                    "all 160ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  textAlign: "center",
                }}
              >
                <ChoiceBody
                  text={option}
                  useBundles={useBundles}
                  useAnimalImages={useAnimalImages}
                />
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}

const STAGE_EMOJI = [
  "🔢",
  "🧩",
  "⭐",
  "🎯",
] as const;

export default function
World3TapTextExercisesV2({
  lessonKey,
  exercises,
  audioBase,
  backgrounds,
  message,
  nextPath,
  quizPath,
}: Props) {
  const [
    stage,
    setStage,
  ] = useState<Stage>(0);

  if (stage < 4) {
    const exercise =
      exercises[stage];

    return (
      <TapSelectImagesV2
        key={`${lessonKey}-ex${stage + 1}`}
        items={exercise}
        audio_base={audioBase}
        background_image={
          backgrounds[stage]
        }
        progress_emoji={
          STAGE_EMOJI[stage]
        }
        mission_prefix={
          `التَّمْرِينُ ${stage + 1}`
        }
        render_custom={context => (
          <TextChoiceGrid
            key={
              context.item
                .question_audio_key
            }
            lessonKey={lessonKey}
            stageIndex={stage}
            context={context}
          />
        )}
        onComplete={() => {
          setStage(
            (stage + 1) as Stage,
          );
        }}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey={lessonKey}
      nextLabel="الدرس التالي"
      message={message}
      onReplay={() => {
        setStage(0);
      }}
      nextPath={nextPath}
      quizPath={quizPath}
    />
  );
}
