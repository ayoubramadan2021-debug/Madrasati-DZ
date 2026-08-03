import {
  useEffect,
  useState,
} from "react";

import TapSelectImagesV2, {
  type TapSelectImageItem,
  type TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";

export type Lesson60Mode =
  | "patterns"
  | "outlier"
  | "complete"
  | "ruler";

type Props = {
  items: TapSelectImageItem[];
  audioBase: string;
  backgroundImage: string;
  mode: Lesson60Mode;
  progressEmoji: string;
  missionPrefix: string;
  onComplete: () => void;
};

type Point = {
  x: number;
  y: number;
};

const COLOR_MAP:
Record<string, string> = {
  red: "#DF4D42",
  blue: "#36A8E8",
  green: "#40A96B",
  yellow: "#F2C94C",
};

function parsePoints(
  value: string,
): Point[] {
  return value
    .split(";")
    .map(part => {
      const [
        x,
        y,
      ] = part
        .split(",")
        .map(Number);

      return {
        x,
        y,
      };
    });
}

function objectSymbol(
  kind: string,
  index: number,
) {
  if (kind === "cones") {
    return "🚧";
  }

  if (kind === "birds") {
    return "🐦";
  }

  if (kind === "balls") {
    return index % 2 === 0
      ? "🔵"
      : "🟢";
  }

  return index % 3 === 0
    ? "🔴"
    : index % 3 === 1
      ? "🔵"
      : "🟢";
}

function GuideLine({
  type,
  strong = false,
}: {
  type: string;
  strong?: boolean;
}) {
  let line = {
    x1: 8,
    y1: 55,
    x2: 92,
    y2: 55,
  };

  if (type === "d1") {
    line = {
      x1: 12,
      y1: 78,
      x2: 88,
      y2: 18,
    };
  }

  if (type === "d2") {
    line = {
      x1: 12,
      y1: 18,
      x2: 88,
      y2: 78,
    };
  }

  if (type === "v") {
    line = {
      x1: 50,
      y1: 8,
      x2: 50,
      y2: 92,
    };
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <line
        x1={line.x1}
        y1={line.y1}
        x2={line.x2}
        y2={line.y2}
        stroke={
          strong
            ? "#D9A526"
            : "#6CAF73"
        }
        strokeWidth={
          strong ? 7 : 3
        }
        strokeLinecap="round"
        opacity={
          strong ? 0.7 : 0.45
        }
      />
    </svg>
  );
}

function PatternVisual({
  raw,
  showRuler,
}: {
  raw: string;
  showRuler: boolean;
}) {
  const [
    kind,
    coordinates,
  ] = raw.split("|");

  const points =
    parsePoints(coordinates);

  const first =
    points[0];

  const last =
    points[points.length - 1];

  const angle =
    first && last
      ? Math.atan2(
          last.y - first.y,
          last.x - first.x,
        ) *
        180 /
        Math.PI
      : 0;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 125,
        borderRadius: 18,
        overflow: "hidden",
        background:
          "linear-gradient(180deg,#F9FCFF,#FFF9E9)",
      }}
    >
      {showRuler && first && last ? (
        <div
          style={{
            position: "absolute",
            left: `${first.x}%`,
            top: `${first.y}%`,
            width: `${
              Math.hypot(
                last.x - first.x,
                last.y - first.y,
              )
            }%`,
            height: 13,
            borderRadius: 8,
            background:
              "rgba(235,184,56,.62)",
            border:
              "2px solid rgba(175,117,10,.42)",
            transformOrigin:
              "left center",
            transform:
              `translateY(-50%) rotate(${angle}deg)`,
          }}
        />
      ) : null}

      {points.map(
        (point, index) => (
          <span
            key={`${point.x}-${point.y}-${index}`}
            style={{
              position: "absolute",
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform:
                "translate(-50%,-50%)",
              fontSize:
                kind === "discs"
                  ? 30
                  : 32,
              lineHeight: 1,
              filter:
                "drop-shadow(0 3px 3px rgba(0,0,0,.13))",
            }}
          >
            {objectSymbol(
              kind,
              index,
            )}
          </span>
        ),
      )}
    </div>
  );
}

function CompleteVisual({
  raw,
}: {
  raw: string;
}) {
  const [
    firstRaw,
    secondRaw,
    candidateRaw,
  ] = raw.split("|");

  const parse = (
    value: string,
  ): Point => {
    const [
      x,
      y,
    ] = value
      .split(",")
      .map(Number);

    return {
      x,
      y,
    };
  };

  const first = parse(firstRaw);
  const second = parse(secondRaw);
  const candidate =
    parse(candidateRaw);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 125,
        borderRadius: 18,
        background:
          "linear-gradient(180deg,#F9FCFF,#FFF9E9)",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <line
          x1={first.x}
          y1={first.y}
          x2={second.x}
          y2={second.y}
          stroke="#6CAF73"
          strokeWidth="3"
          strokeDasharray="4 4"
          opacity="0.65"
        />

        <circle
          cx={first.x}
          cy={first.y}
          r="6"
          fill="#274C77"
        />

        <circle
          cx={second.x}
          cy={second.y}
          r="6"
          fill="#274C77"
        />

        <circle
          cx={candidate.x}
          cy={candidate.y}
          r="7"
          fill="#43A66C"
          stroke="#FFFFFF"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

function OutlierBoard({
  context,
  selectedIndex,
  choose,
}: {
  context:
    TapSelectImagesCustomContext;
  selectedIndex: number | null;
  choose: (
    index: number,
  ) => void;
}) {
  const {
    item,
    locked,
    feedbackState,
  } = context;

  const parsed =
    item.options.map(raw => {
      const [
        color,
        x,
        y,
        lineType,
      ] = raw.split("|");

      return {
        color,
        x: Number(x),
        y: Number(y),
        lineType,
      };
    });

  const lineType =
    parsed[0]?.lineType ?? "h";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 330,
        maxWidth: 650,
        margin: "0 auto",
        borderRadius: 28,
        background:
          "linear-gradient(180deg,#FFFFFF,#FFF9E8)",
        border:
          "3px solid rgba(27,58,107,.14)",
        boxShadow:
          "0 10px 24px rgba(0,0,0,.09)",
        overflow: "hidden",
      }}
    >
      <GuideLine
        type={lineType}
      />

      {parsed.map(
        (
          point,
          index,
        ) => {
          const selected =
            selectedIndex === index;

          const correct =
            index ===
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
              key={index}
              type="button"
              disabled={locked}
              onClick={() =>
                choose(index)
              }
              aria-label={
                `النقطة ${index + 1}`
              }
              style={{
                position: "absolute",
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: 66,
                height: 66,
                borderRadius: "50%",
                transform:
                  "translate(-50%,-50%)",
                background:
                  COLOR_MAP[
                    point.color
                  ] ?? "#36A8E8",
                border:
                  selectedCorrect
                    ? "7px solid #2E9B62"
                    : selectedWrong
                      ? "7px solid #D45447"
                      : "5px solid #FFFFFF",
                boxShadow:
                  "0 7px 15px rgba(0,0,0,.18)",
              }}
            />
          );
        },
      )}
    </div>
  );
}

function ChoiceGrid({
  context,
  mode,
}: {
  context:
    TapSelectImagesCustomContext;
  mode: Exclude<
    Lesson60Mode,
    "outlier"
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

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns:
          "repeat(2,minmax(0,1fr))",
        gap: 14,
      }}
    >
      {item.options.map(
        (
          option,
          index,
        ) => {
          const selected =
            selectedIndex === index;

          const correct =
            index ===
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
              key={`${itemIndex}-${index}`}
              type="button"
              disabled={locked}
              onClick={() => {
                if (locked) {
                  return;
                }

                setSelectedIndex(
                  index,
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
                minHeight: 155,
                padding: 9,
                borderRadius: 24,
                background:
                  selectedCorrect
                    ? "#DDF5E8"
                    : selectedWrong
                      ? "#FBE2DE"
                      : "#FFFFFF",
                border:
                  selectedCorrect
                    ? "4px solid #2E9B62"
                    : selectedWrong
                      ? "4px solid #D45447"
                      : "3px solid rgba(27,58,107,.15)",
                boxShadow:
                  "0 7px 17px rgba(0,0,0,.09)",
              }}
            >
              {mode ===
              "complete" ? (
                <CompleteVisual
                  raw={option}
                />
              ) : (
                <PatternVisual
                  raw={option}
                  showRuler={
                    mode ===
                    "ruler"
                  }
                />
              )}
            </button>
          );
        },
      )}
    </div>
  );
}

function AlignmentCustom({
  context,
  mode,
}: {
  context:
    TapSelectImagesCustomContext;
  mode: Lesson60Mode;
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

  if (mode !== "outlier") {
    return (
      <ChoiceGrid
        context={context}
        mode={mode}
      />
    );
  }

  const choose = (
    index: number,
  ) => {
    if (locked) {
      return;
    }

    setSelectedIndex(index);

    if (
      index ===
      item.correct_index
    ) {
      completeRound();
    } else {
      showWrong(() => {
        setSelectedIndex(null);
      });
    }
  };

  return (
    <OutlierBoard
      context={context}
      selectedIndex={
        selectedIndex
      }
      choose={choose}
    />
  );
}

export default function
Lesson60AlignmentExerciseV2({
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
      render_custom={context => (
        <AlignmentCustom
          key={
            context.item
              .question_audio_key
          }
          context={context}
          mode={mode}
        />
      )}
      onComplete={() => {
        onComplete();
      }}
    />
  );
}
