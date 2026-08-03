import {
  useEffect,
  useState,
} from "react";

import TapSelectImagesV2, {
  type TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";

import type {
  Lesson62ExerciseItem,
} from "../content/lesson62_exercises";

type Props = {
  items: Lesson62ExerciseItem[];
  audioBase: string;
  backgroundImage: string;
  progressEmoji: string;
  missionPrefix: string;
  onComplete: () => void;
};

function TenFrame() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 59,
        height: 34,
        padding: 4,
        borderRadius: 9,
        border:
          "2px solid #D68B2D",
        background:
          "rgba(255,255,255,.96)",
        display: "grid",
        gridTemplateColumns:
          "repeat(5,1fr)",
        gridTemplateRows:
          "repeat(2,1fr)",
        gap: 3,
        boxShadow:
          "0 3px 7px rgba(0,0,0,.08)",
      }}
    >
      {Array.from(
        { length: 10 },
        (_, index) => (
          <span
            key={index}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#173E72",
              justifySelf: "center",
              alignSelf: "center",
            }}
          />
        ),
      )}
    </div>
  );
}

function UnitDots({
  count,
}: {
  count: number;
}) {
  if (count <= 0) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        minHeight: 34,
        display: "grid",
        gridTemplateColumns:
          "repeat(5,11px)",
        alignContent: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      {Array.from(
        { length: count },
        (_, index) => (
          <span
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#173E72",
              boxShadow:
                "0 2px 4px rgba(0,0,0,.12)",
            }}
          />
        ),
      )}
    </div>
  );
}

function DotModel({
  value,
  compact = false,
}: {
  value: number;
  compact?: boolean;
}) {
  const tens = Math.floor(
    value / 10,
  );

  const units = value % 10;

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gap: compact ? 5 : 9,
        justifyItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: compact ? 4 : 7,
        }}
      >
        {Array.from(
          { length: tens },
          (_, index) => (
            <TenFrame key={index} />
          ),
        )}
      </div>

      <UnitDots count={units} />
    </div>
  );
}

function FormulaVisual({
  tens,
  units,
}: {
  tens: number;
  units: number;
}) {
  return (
    <div
      dir="ltr"
      style={{
        width: "100%",
        minHeight: 88,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        fontSize:
          "clamp(30px,7vw,45px)",
        fontWeight: 950,
        color: "#173E72",
        fontVariantNumeric:
          "tabular-nums",
      }}
    >
      <span>{tens}</span>
      <span
        style={{
          color: "#D68B2D",
        }}
      >
        +
      </span>
      <span>{units}</span>
    </div>
  );
}

function NumberVisual({
  value,
}: {
  value: number;
}) {
  return (
    <div
      dir="ltr"
      style={{
        minHeight: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize:
          "clamp(48px,12vw,76px)",
        lineHeight: 1,
        fontWeight: 950,
        color: "#173E72",
        fontVariantNumeric:
          "tabular-nums",
        textShadow:
          "0 3px 0 rgba(214,139,45,.20)",
      }}
    >
      {value}
    </div>
  );
}

function MatchingVisual({
  shownNumber,
  tens,
  units,
  dotValue,
}: {
  shownNumber: number;
  tens: number;
  units: number;
  dotValue: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns:
          "70px minmax(0,1fr)",
        gridTemplateRows:
          "auto auto",
        alignItems: "center",
        gap: "8px 7px",
      }}
    >
      <div
        dir="ltr"
        style={{
          gridRow: "1 / 3",
          minHeight: 86,
          borderRadius: 18,
          background: "#173E72",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize:
            "clamp(32px,7vw,46px)",
          fontWeight: 950,
          boxShadow:
            "0 5px 10px rgba(23,62,114,.18)",
        }}
      >
        {shownNumber}
      </div>

      <DotModel
        value={dotValue}
        compact
      />

      <div
        dir="ltr"
        style={{
          justifySelf: "center",
          padding: "4px 13px",
          borderRadius: 14,
          background:
            "rgba(214,139,45,.13)",
          color: "#173E72",
          fontSize:
            "clamp(21px,4.4vw,29px)",
          fontWeight: 950,
          fontVariantNumeric:
            "tabular-nums",
        }}
      >
        {tens} + {units}
      </div>
    </div>
  );
}

function OptionVisual({
  code,
}: {
  code: string;
}) {
  const parts = code.split("|");
  const kind = parts[0];

  if (kind === "dots") {
    return (
      <DotModel
        value={Number(parts[1])}
      />
    );
  }

  if (kind === "formula") {
    return (
      <FormulaVisual
        tens={Number(parts[1])}
        units={Number(parts[2])}
      />
    );
  }

  if (kind === "number") {
    return (
      <NumberVisual
        value={Number(parts[1])}
      />
    );
  }

  if (kind === "match") {
    return (
      <MatchingVisual
        shownNumber={Number(
          parts[1],
        )}
        tens={Number(parts[2])}
        units={Number(parts[3])}
        dotValue={Number(
          parts[4],
        )}
      />
    );
  }

  return null;
}

function ChoiceGrid({
  context,
}: {
  context:
    TapSelectImagesCustomContext;
}) {
  const item =
    context.item as
      Lesson62ExerciseItem;

  const {
    itemIndex,
    locked,
    feedbackState,
    completeRound,
    showWrong,
  } = context;

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState<number | null>(
    null,
  );

  useEffect(() => {
    setSelectedIndex(null);
  }, [itemIndex]);

  useEffect(() => {
    if (
      feedbackState === "idle"
    ) {
      setSelectedIndex(null);
    }
  }, [feedbackState]);

  const matching =
    item.mode === "matching";

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        maxWidth: 730,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns:
          "repeat(2,minmax(0,1fr))",
        gap: 12,
      }}
    >
      {item.options.map(
        (
          option,
          optionIndex,
        ) => {
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
              key={`${itemIndex}-${optionIndex}`}
              type="button"
              aria-label={
                `الخيار ${optionIndex + 1}`
              }
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
                width: "100%",
                minHeight:
                  matching
                    ? 177
                    : 153,
                padding:
                  matching
                    ? "11px 9px"
                    : "13px 9px",
                borderRadius: 24,
                border:
                  selectedCorrect
                    ? "4px solid #2E9B62"
                    : selectedWrong
                      ? "4px solid #D45447"
                      : "3px solid #D6A03A",
                background:
                  selectedCorrect
                    ? "#E3F7EA"
                    : selectedWrong
                      ? "#FCE6E2"
                      : "linear-gradient(180deg,#FFFFFF,#FFF8E9)",
                boxShadow:
                  selected
                    ? "0 8px 19px rgba(0,0,0,.16)"
                    : "0 6px 14px rgba(0,0,0,.09)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor:
                  locked
                    ? "default"
                    : "pointer",
                overflow: "hidden",
              }}
            >
              <OptionVisual
                code={option}
              />
            </button>
          );
        },
      )}
    </div>
  );
}

export default function
Lesson62NumbersExerciseV2({
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
