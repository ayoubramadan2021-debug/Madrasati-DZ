import {
  useEffect,
  useState,
} from "react";

import TapSelectImagesV2, {
  type TapSelectImageItem,
  type TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";

export type Lesson59ExerciseMode =
  | "images"
  | "times"
  | "periods"
  | "events";

type Props = {
  items: TapSelectImageItem[];
  audioBase: string;
  backgroundImage: string;
  mode: Lesson59ExerciseMode;
  progressEmoji: string;
  missionPrefix: string;
  onComplete: () => void;
};

function CustomChoiceGrid({
  context,
  mode,
}: {
  context: TapSelectImagesCustomContext;
  mode: Exclude<
    Lesson59ExerciseMode,
    "images"
  >;
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

  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns:
          "repeat(2, minmax(0, 1fr))",
        gap: 14,
      }}
    >
      {item.options.map(
        (rawOption, optionIndex) => {
          const parts =
            rawOption.split("|");

          const selected =
            selectedIndex === optionIndex;

          const correct =
            optionIndex ===
            item.correct_index;

          const selectedCorrect =
            selected &&
            feedbackState === "correct";

          const selectedWrong =
            selected &&
            feedbackState === "wrong";

          let content;

          if (mode === "times") {
            const hour =
              Number(
                rawOption.slice(0, 2),
              );

            content = (
              <div
                dir="ltr"
                style={{
                  display: "grid",
                  gap: 10,
                  justifyItems: "center",
                }}
              >
                <div
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: "50%",
                    border:
                      "6px solid #1B3A6B",
                    background: "#FFFFFF",
                    position: "relative",
                    boxShadow:
                      "0 7px 16px rgba(0,0,0,.10)",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      width: 4,
                      height: 25,
                      background: "#1B3A6B",
                      left: 39,
                      top: 16,
                      borderRadius: 4,
                      transformOrigin:
                        "bottom center",
                      transform:
                        `rotate(${hour * 30}deg)`,
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      width: 4,
                      height: 30,
                      background: "#E2A92D",
                      left: 39,
                      top: 11,
                      borderRadius: 4,
                    }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#D45447",
                      left: 36,
                      top: 36,
                    }}
                  />
                </div>

                <strong
                  style={{
                    fontSize:
                      "clamp(27px, 6vw, 39px)",
                    color: "#1B3A6B",
                  }}
                >
                  {rawOption}
                </strong>
              </div>
            );
          } else if (mode === "periods") {
            content = (
              <div
                style={{
                  display: "grid",
                  gap: 8,
                  justifyItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize:
                      "clamp(40px, 9vw, 62px)",
                  }}
                >
                  {parts[0]}
                </span>

                <strong
                  style={{
                    fontSize:
                      "clamp(22px, 5vw, 33px)",
                    lineHeight: 1.4,
                  }}
                >
                  {parts[1]}
                </strong>
              </div>
            );
          } else {
            content = (
              <div
                style={{
                  display: "grid",
                  gap: 7,
                  justifyItems: "center",
                }}
              >
                <span
                  dir="ltr"
                  style={{
                    fontSize:
                      "clamp(22px, 5vw, 31px)",
                    fontWeight: 900,
                    color: "#D58E16",
                  }}
                >
                  {parts[0]}
                </span>

                <span
                  style={{
                    fontSize:
                      "clamp(35px, 8vw, 54px)",
                  }}
                >
                  {parts[1]}
                </span>

                <strong
                  style={{
                    fontSize:
                      "clamp(18px, 4vw, 27px)",
                    lineHeight: 1.5,
                  }}
                >
                  {parts[2]}
                </strong>
              </div>
            );
          }

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
                  mode === "events"
                    ? 175
                    : 155,
                borderRadius: 25,
                border:
                  selectedCorrect
                    ? "4px solid #2E9B62"
                    : selectedWrong
                      ? "4px solid #D45447"
                      : "3px solid rgba(27,58,107,.17)",
                background:
                  selectedCorrect
                    ? "#DDF5E8"
                    : selectedWrong
                      ? "#FBE2DE"
                      : "#FFFFFF",
                color: "#1B3A6B",
                padding: "15px 9px",
                boxShadow:
                  "0 7px 17px rgba(0,0,0,.09)",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
                textAlign: "center",
              }}
            >
              {content}
            </button>
          );
        },
      )}
    </div>
  );
}

export default function
Lesson59TimesOfDayExerciseV2({
  items,
  audioBase,
  backgroundImage,
  mode,
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
      render_custom={
        mode === "images"
          ? undefined
          : context => (
              <CustomChoiceGrid
                key={
                  context.item
                    .question_audio_key
                }
                context={context}
                mode={mode}
              />
            )
      }
      onComplete={() => {
        onComplete();
      }}
    />
  );
}
