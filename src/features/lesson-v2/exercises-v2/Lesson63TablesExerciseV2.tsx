import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import TapSelectImagesV2, {
  type TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";

import type {
  Lesson63ExerciseItem,
} from "../content/lesson63_exercises";

type Props = {
  items: Lesson63ExerciseItem[];
  audioBase: string;
  backgroundImage: string;
  progressEmoji: string;
  missionPrefix: string;
  onComplete: () => void;
};

type SportKey =
  | "football"
  | "table_tennis"
  | "volleyball"
  | "basketball";

type RowKey =
  | "boys"
  | "girls";

type SchoolItemKey =
  | "notebook"
  | "scissors"
  | "colors"
  | "sharpener"
  | "eraser";

const SPORTS = [
  {
    key: "football" as SportKey,
    label: "كُرَةُ الْقَدَمِ",
    icon: "⚽",
  },
  {
    key: "table_tennis" as SportKey,
    label: "تِنِسُ الطَّاوِلَةِ",
    icon: "🏓",
  },
  {
    key: "volleyball" as SportKey,
    label: "الْكُرَةُ الطَّائِرَةُ",
    icon: "🏐",
  },
  {
    key: "basketball" as SportKey,
    label: "كُرَةُ السَّلَّةِ",
    icon: "🏀",
  },
];

const SPORTS_DATA:
Record<
  SportKey,
  Record<RowKey, number>
> = {
  football: {
    boys: 11,
    girls: 6,
  },
  table_tennis: {
    boys: 3,
    girls: 3,
  },
  volleyball: {
    boys: 7,
    girls: 4,
  },
  basketball: {
    boys: 5,
    girls: 10,
  },
};

const SCHOOL_ITEMS:
Record<
  SchoolItemKey,
  {
    label: string;
    price: number;
  }
> = {
  notebook: {
    label: "الْكُرَّاسُ",
    price: 50,
  },
  scissors: {
    label: "الْمِقَصُّ",
    price: 35,
  },
  colors: {
    label: "الْأَلْوَانُ",
    price: 65,
  },
  sharpener: {
    label: "الْمِبْرَاةُ",
    price: 25,
  },
  eraser: {
    label: "الْمِمْحَاةُ",
    price: 20,
  },
};

function SchoolItemIcon({
  itemKey,
}: {
  itemKey: SchoolItemKey;
}) {
  if (itemKey === "notebook") {
    return (
      <span
        style={{
          width: 32,
          height: 42,
          borderRadius: 5,
          border: "3px solid #913C35",
          background:
            "linear-gradient(90deg,#B64238 0 20%,#F8EEE6 20% 100%)",
          display: "block",
        }}
      />
    );
  }

  if (itemKey === "scissors") {
    return (
      <span
        style={{
          fontSize: 38,
          lineHeight: 1,
        }}
      >
        ✂
      </span>
    );
  }

  if (itemKey === "colors") {
    return (
      <span
        style={{
          height: 40,
          display: "flex",
          alignItems: "flex-end",
          gap: 3,
        }}
      >
        {[
          "#8050A4",
          "#4676B4",
          "#4B9C68",
          "#E1A932",
          "#D75147",
        ].map(
          (color, index) => (
            <span
              key={color}
              style={{
                width: 7,
                height: 27 + index * 2,
                borderRadius: 4,
                background: color,
              }}
            />
          ),
        )}
      </span>
    );
  }

  if (itemKey === "sharpener") {
    return (
      <span
        style={{
          width: 41,
          height: 27,
          borderRadius: 8,
          background: "#66AF8E",
          border: "3px solid #2E6951",
          display: "block",
        }}
      />
    );
  }

  return (
    <span
      style={{
        width: 43,
        height: 25,
        borderRadius: 8,
        background:
          "linear-gradient(135deg,#8052A4 0 50%,#D99AC7 50% 100%)",
        border: "3px solid #624080",
        display: "block",
      }}
    />
  );
}

function Cell({
  children,
  header = false,
  guide = false,
  missing = false,
}: {
  children: ReactNode;
  header?: boolean;
  guide?: boolean;
  missing?: boolean;
}) {
  return (
    <div
      style={{
        minHeight: 58,
        padding: "5px 3px",
        border: guide
          ? "3px solid #E0A225"
          : "1.5px solid #93A9C0",
        background: missing
          ? "#FFF0B5"
          : header
            ? "#F1F6FB"
            : "#FFFFFF",
        color: "#173E72",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: 900,
        fontSize:
          "clamp(14px,3vw,20px)",
        lineHeight: 1.2,
      }}
    >
      {children}
    </div>
  );
}

function SportsTable({
  highlightRow,
  highlightColumn,
}: {
  highlightRow: RowKey;
  highlightColumn: SportKey;
}) {
  const rows = [
    {
      key: "boys" as RowKey,
      label: "أَوْلَادٌ",
    },
    {
      key: "girls" as RowKey,
      label: "بَنَاتٌ",
    },
  ];

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns:
          "78px repeat(4,minmax(54px,1fr))",
        borderRadius: 18,
        overflow: "hidden",
        border: "2px solid #6886A5",
      }}
    >
      <Cell header>
        الرِّيَاضَةُ
      </Cell>

      {SPORTS.map(sport => (
        <Cell
          key={sport.key}
          header
          guide={
            sport.key ===
            highlightColumn
          }
        >
          <div
            style={{
              display: "grid",
              gap: 3,
              justifyItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 25,
              }}
            >
              {sport.icon}
            </span>

            <span
              style={{
                fontSize:
                  "clamp(10px,2vw,14px)",
              }}
            >
              {sport.label}
            </span>
          </div>
        </Cell>
      ))}

      {rows.flatMap(row => [
        <Cell
          key={`${row.key}-label`}
          header
          guide={
            row.key === highlightRow
          }
        >
          {row.label}
        </Cell>,

        ...SPORTS.map(sport => (
          <Cell
            key={`${row.key}-${sport.key}`}
          >
            {
              SPORTS_DATA[
                sport.key
              ][row.key]
            }
          </Cell>
        )),
      ])}
    </div>
  );
}

function CompleteSportTable({
  sportKey,
  boys,
  girls,
  missing,
}: {
  sportKey: SportKey;
  boys: number;
  girls: number;
  missing: RowKey;
}) {
  const sport =
    SPORTS.find(
      value =>
        value.key === sportKey,
    ) ?? SPORTS[0];

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        maxWidth: 520,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns:
          "1.3fr 1fr 1fr",
        borderRadius: 17,
        overflow: "hidden",
        border: "2px solid #6886A5",
      }}
    >
      <Cell header>
        الرِّيَاضَةُ
      </Cell>
      <Cell header>
        أَوْلَادٌ
      </Cell>
      <Cell header>
        بَنَاتٌ
      </Cell>

      <Cell>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 26,
            }}
          >
            {sport.icon}
          </span>

          <span>
            {sport.label}
          </span>
        </div>
      </Cell>

      <Cell
        missing={
          missing === "boys"
        }
      >
        {missing === "boys"
          ? "؟"
          : boys}
      </Cell>

      <Cell
        missing={
          missing === "girls"
        }
      >
        {missing === "girls"
          ? "؟"
          : girls}
      </Cell>
    </div>
  );
}

function PriceTable() {
  const keys:
    SchoolItemKey[] = [
      "notebook",
      "scissors",
      "colors",
      "sharpener",
      "eraser",
    ];

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns:
          "65px repeat(5,minmax(47px,1fr))",
        borderRadius: 18,
        overflow: "hidden",
        border: "2px solid #6886A5",
      }}
    >
      <Cell header>
        الْأَدَاةُ
      </Cell>

      {keys.map(key => (
        <Cell
          key={`${key}-head`}
          header
        >
          <div
            style={{
              display: "grid",
              gap: 4,
              justifyItems: "center",
            }}
          >
            <SchoolItemIcon
              itemKey={key}
            />

            <span
              style={{
                fontSize:
                  "clamp(9px,1.9vw,13px)",
              }}
            >
              {
                SCHOOL_ITEMS[
                  key
                ].label
              }
            </span>
          </div>
        </Cell>
      ))}

      <Cell header>
        الثَّمَنُ
      </Cell>

      {keys.map(key => (
        <Cell
          key={`${key}-price`}
        >
          <span
            dir="ltr"
            style={{
              fontSize:
                "clamp(20px,4.3vw,29px)",
              fontWeight: 950,
            }}
          >
            {
              SCHOOL_ITEMS[
                key
              ].price
            }
          </span>
        </Cell>
      ))}
    </div>
  );
}

function StimulusPanel({
  item,
}: {
  item: Lesson63ExerciseItem;
}) {
  const stimulus =
    item.stimulus as {
      target_row?: RowKey;
      target_column?: SportKey;
      sport?: SportKey;
      boys?: number;
      girls?: number;
      missing?: RowKey;
      sentence?: string;
    };

  if (item.mode === "read") {
    return (
      <SportsTable
        highlightRow={
          stimulus.target_row ??
          "boys"
        }
        highlightColumn={
          stimulus.target_column ??
          "football"
        }
      />
    );
  }

  if (item.mode === "complete") {
    return (
      <div
        style={{
          width: "100%",
          display: "grid",
          gap: 11,
        }}
      >
        <div
          dir="rtl"
          style={{
            padding: "9px 13px",
            borderRadius: 17,
            background: "#FFF8DD",
            border: "2px solid #E1B452",
            color: "#173E72",
            fontSize:
              "clamp(16px,3.3vw,22px)",
            fontWeight: 850,
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          {stimulus.sentence}
        </div>

        <CompleteSportTable
          sportKey={
            stimulus.sport ??
            "football"
          }
          boys={stimulus.boys ?? 0}
          girls={stimulus.girls ?? 0}
          missing={
            stimulus.missing ??
            "boys"
          }
        />
      </div>
    );
  }

  return <PriceTable />;
}

function StandardChoices({
  context,
  item,
  selectedIndex,
  setSelectedIndex,
}: {
  context:
    TapSelectImagesCustomContext;
  item: Lesson63ExerciseItem;
  selectedIndex: number | null;
  setSelectedIndex:
    (value: number | null) => void;
}) {
  const {
    locked,
    feedbackState,
    completeRound,
    showWrong,
  } = context;

  return (
    <div
      dir="rtl"
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(2,minmax(0,1fr))",
        gap: 11,
      }}
    >
      {item.options.map(
        (option, optionIndex) => {
          const selected =
            selectedIndex ===
            optionIndex;

          const correct =
            optionIndex ===
            item.correct_index;

          const selectedCorrect =
            selected &&
            feedbackState ===
              "correct";

          const selectedWrong =
            selected &&
            feedbackState ===
              "wrong";

          return (
            <button
              key={optionIndex}
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
                minHeight: 102,
                padding: 10,
                borderRadius: 21,
                border:
                  selectedCorrect
                    ? "4px solid #2E9B62"
                    : selectedWrong
                      ? "4px solid #D45447"
                      : "3px solid #D6A03A",
                background:
                  selectedCorrect
                    ? "#E2F6E9"
                    : selectedWrong
                      ? "#FBE4E0"
                      : "#FFFFFF",
                color: "#173E72",
                display: "grid",
                placeItems: "center",
                boxShadow:
                  "0 6px 13px rgba(0,0,0,.09)",
              }}
            >
              <span
                dir="ltr"
                style={{
                  fontSize:
                    "clamp(35px,8vw,53px)",
                  fontWeight: 950,
                  lineHeight: 1,
                }}
              >
                {option}
              </span>

              {item.mode === "price" && (
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                  }}
                >
                  دِينَارًا
                </span>
              )}
            </button>
          );
        },
      )}
    </div>
  );
}

function MarkTable({
  context,
  item,
  selectedIndex,
  setSelectedIndex,
}: {
  context:
    TapSelectImagesCustomContext;
  item: Lesson63ExerciseItem;
  selectedIndex: number | null;
  setSelectedIndex:
    (value: number | null) => void;
}) {
  const {
    locked,
    feedbackState,
    completeRound,
    showWrong,
  } = context;

  const stimulus =
    item.stimulus as {
      target_item?: SchoolItemKey;
    };

  const itemKey =
    stimulus.target_item ??
    "eraser";

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns:
          "92px repeat(4,minmax(0,1fr))",
        borderRadius: 18,
        overflow: "hidden",
        border: "2px solid #6886A5",
      }}
    >
      <Cell header>
        الْأَدَاةُ
      </Cell>

      {item.options.map(
        (price, index) => (
          <Cell
            key={`price-${index}`}
            header
          >
            <div
              style={{
                display: "grid",
                gap: 2,
              }}
            >
              <span
                dir="ltr"
                style={{
                  fontSize:
                    "clamp(18px,4vw,25px)",
                  fontWeight: 950,
                }}
              >
                {price}
              </span>

              <span
                style={{
                  fontSize: 11,
                }}
              >
                دِينَارًا
              </span>
            </div>
          </Cell>
        ),
      )}

      <Cell header>
        <div
          style={{
            display: "grid",
            gap: 5,
            justifyItems: "center",
          }}
        >
          <SchoolItemIcon
            itemKey={itemKey}
          />

          <span
            style={{
              fontSize:
                "clamp(12px,2.5vw,17px)",
            }}
          >
            {
              SCHOOL_ITEMS[
                itemKey
              ].label
            }
          </span>
        </div>
      </Cell>

      {item.options.map(
        (_, optionIndex) => {
          const selected =
            selectedIndex ===
            optionIndex;

          const correct =
            optionIndex ===
            item.correct_index;

          const selectedCorrect =
            selected &&
            feedbackState ===
              "correct";

          const selectedWrong =
            selected &&
            feedbackState ===
              "wrong";

          return (
            <button
              key={`cell-${optionIndex}`}
              type="button"
              disabled={locked}
              aria-label={
                `خانة السعر ${item.options[optionIndex]}`
              }
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
                minHeight: 105,
                border:
                  selectedCorrect
                    ? "4px solid #2E9B62"
                    : selectedWrong
                      ? "4px solid #D45447"
                      : "1.5px solid #93A9C0",
                background:
                  selectedCorrect
                    ? "#E2F6E9"
                    : selectedWrong
                      ? "#FBE4E0"
                      : "#FFFFFF",
                color:
                  selectedCorrect
                    ? "#2E9B62"
                    : selectedWrong
                      ? "#D45447"
                      : "#B6C1CC",
                display: "grid",
                placeItems: "center",
              }}
            >
              <span
                style={{
                  fontSize:
                    "clamp(43px,9vw,60px)",
                  fontWeight: 950,
                  lineHeight: 1,
                }}
              >
                {selected
                  ? "×"
                  : "□"}
              </span>
            </button>
          );
        },
      )}
    </div>
  );
}

function ChoiceGrid({
  context,
}: {
  context:
    TapSelectImagesCustomContext;
}) {
  const item =
    context.item as
      Lesson63ExerciseItem;

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState<number | null>(
    null,
  );

  useEffect(() => {
    setSelectedIndex(null);
  }, [context.itemIndex]);

  useEffect(() => {
    if (
      context.feedbackState ===
      "idle"
    ) {
      setSelectedIndex(null);
    }
  }, [context.feedbackState]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 730,
        margin: "0 auto",
        display: "grid",
        gap: 14,
      }}
    >
      {item.mode === "mark" ? (
        <>
          <PriceTable />

          <div
            dir="rtl"
            style={{
              padding: "8px 12px",
              borderRadius: 15,
              background:
                "rgba(255,255,255,.92)",
              border:
                "2px solid #D6A03A",
              color: "#173E72",
              textAlign: "center",
              fontSize:
                "clamp(15px,3vw,20px)",
              fontWeight: 900,
            }}
          >
            اِسْتَعْمِلِ الْجَدْوَلَ أَعْلَاهُ لِمَعْرِفَةِ الثَّمَنِ، ثُمَّ اخْتَرِ الْخَانَةَ الْمُنَاسِبَةَ.
          </div>

          <MarkTable
            context={context}
            item={item}
            selectedIndex={
              selectedIndex
            }
            setSelectedIndex={
              setSelectedIndex
            }
          />
        </>
      ) : (
        <>
          <StimulusPanel
            item={item}
          />

          <StandardChoices
            context={context}
            item={item}
            selectedIndex={
              selectedIndex
            }
            setSelectedIndex={
              setSelectedIndex
            }
          />
        </>
      )}
    </div>
  );
}

export default function
Lesson63TablesExerciseV2({
  items,
  audioBase,
  backgroundImage,
  progressEmoji,
  missionPrefix,
  onComplete,
}: Props) {
  return (
    <TapSelectImagesV2
      items={items}
      audio_base={audioBase}
      background_image={
        backgroundImage
      }
      progress_emoji={
        progressEmoji
      }
      mission_prefix={
        missionPrefix
      }
      render_custom={context => (
        <ChoiceGrid
          key={
            context.item
              .question_audio_key
          }
          context={context}
        />
      )}
      onComplete={onComplete}
    />
  );
}
