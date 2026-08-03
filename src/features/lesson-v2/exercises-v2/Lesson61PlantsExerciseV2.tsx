import {
  useEffect,
  useState,
} from "react";

import TapSelectImagesV2, {
  type TapSelectImageItem,
  type TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";

type Props = {
  items: TapSelectImageItem[];
  audioBase: string;
  backgroundImage: string;
  progressEmoji: string;
  missionPrefix: string;
  onComplete: () => void;
};

const PALETTES:
Record<
  string,
  {
    background: string;
    border: string;
  }
> = {
  garden: {
    background:
      "linear-gradient(180deg,#FFF4F8,#F4FFE8)",
    border: "#D88CB1",
  },
  forest: {
    background:
      "linear-gradient(180deg,#E7F8E6,#D1ECD2)",
    border: "#4E9B61",
  },
  desert: {
    background:
      "linear-gradient(180deg,#FFF4D1,#F3D28A)",
    border: "#D99B31",
  },
  water: {
    background:
      "linear-gradient(180deg,#E5F7FF,#D7F4E5)",
    border: "#4DA6C8",
  },
  tree: {
    background:
      "linear-gradient(180deg,#EFF9E8,#D7EBCB)",
    border: "#568A49",
  },
  trees: {
    background:
      "linear-gradient(180deg,#EFF9E8,#D7EBCB)",
    border: "#568A49",
  },
  shrub: {
    background:
      "linear-gradient(180deg,#FFF0F5,#EAEFD8)",
    border: "#B87791",
  },
  shrubs: {
    background:
      "linear-gradient(180deg,#FFF0F5,#EAEFD8)",
    border: "#B87791",
  },
  herb: {
    background:
      "linear-gradient(180deg,#F0FFE8,#DAF0C9)",
    border: "#70A94F",
  },
  herbs: {
    background:
      "linear-gradient(180deg,#F0FFE8,#DAF0C9)",
    border: "#70A94F",
  },
  rose: {
    background:
      "linear-gradient(180deg,#FFF0F5,#FFF8E7)",
    border: "#D98DA7",
  },
  pine: {
    background:
      "linear-gradient(180deg,#E9F8E8,#D8EFD9)",
    border: "#4C8E58",
  },
  cactus: {
    background:
      "linear-gradient(180deg,#FFF2CE,#E8F0CC)",
    border: "#8DA64E",
  },
  reed: {
    background:
      "linear-gradient(180deg,#E7F8FF,#E8F1D1)",
    border: "#6B9E82",
  },
  care: {
    background:
      "linear-gradient(180deg,#E5F7FF,#E7F8E6)",
    border: "#4B9AB4",
  },
  harm: {
    background:
      "linear-gradient(180deg,#FFF0ED,#F8D9D3)",
    border: "#D45447",
  },
  ignore: {
    background:
      "linear-gradient(180deg,#F5F5F5,#E3E3E3)",
    border: "#8A8A8A",
  },
  remove: {
    background:
      "linear-gradient(180deg,#FFF2E6,#F2DDC8)",
    border: "#B27C50",
  },
};

const PLANT_VISUALS:
Record<
  string,
  {
    src: string;
    position: string;
  }
> = {
  garden: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s2.webp",
    position: "center",
  },
  forest: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s3.webp",
    position: "center",
  },
  desert: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s4.webp",
    position: "20% center",
  },
  water: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s4.webp",
    position: "80% center",
  },
  tree: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s5.webp",
    position: "18% center",
  },
  trees: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s3.webp",
    position: "center",
  },
  shrub: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s5.webp",
    position: "50% center",
  },
  shrubs: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s2.webp",
    position: "center",
  },
  herb: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s5.webp",
    position: "82% center",
  },
  herbs: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s5.webp",
    position: "82% center",
  },
  rose: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s2.webp",
    position: "65% center",
  },
  pine: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s3.webp",
    position: "center",
  },
  cactus: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s4.webp",
    position: "18% center",
  },
  reed: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s4.webp",
    position: "82% center",
  },
  care: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s6.webp",
    position: "center",
  },
  harm: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s6.webp",
    position: "20% center",
  },
  ignore: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s6.webp",
    position: "50% center",
  },
  remove: {
    src: "/lessons/v2/lesson61-plants-with-us-1/s6.webp",
    position: "80% center",
  },
};

function PlantChoiceGrid({
  context,
}: {
  context:
    TapSelectImagesCustomContext;
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
      dir="rtl"
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns:
          "repeat(2,minmax(0,1fr))",
        gap: 15,
      }}
    >
      {item.options.map(
        (
          rawOption,
          optionIndex,
        ) => {
          const [
            kind,
            _emoji,
            title,
            subtitle,
          ] = rawOption.split("|");

          const palette =
            PALETTES[kind] ?? {
              background: "#FFFFFF",
              border: "#D5DCE5",
            };

          const visual =
            PLANT_VISUALS[kind] ??
            PLANT_VISUALS.garden;

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
                minHeight: 154,
                padding: "9px",
                borderRadius: 26,
                background:
                  selectedCorrect
                    ? "#DDF5E8"
                    : selectedWrong
                      ? "#FBE2DE"
                      : palette.background,
                border:
                  selectedCorrect
                    ? "4px solid #2E9B62"
                    : selectedWrong
                      ? "4px solid #D45447"
                      : `3px solid ${palette.border}`,
                boxShadow:
                  "0 8px 18px rgba(0,0,0,.09)",
                display: "grid",
                alignContent: "center",
                justifyItems: "center",
                gap: 6,
                color: "#1B3A6B",
                textAlign: "center",
              }}
            >
              <img
                src={visual.src}
                alt={title}
                style={{
                  width: "100%",
                  height: 88,
                  borderRadius: 16,
                  objectFit: "cover",
                  objectPosition:
                    visual.position,
                  display: "block",
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,.10)",
                }}
              />

              <strong
                style={{
                  fontSize:
                    "clamp(18px,4vw,25px)",
                  lineHeight: 1.35,
                }}
              >
                {title}
              </strong>

              <span
                style={{
                  fontSize:
                    "clamp(12px,2.8vw,17px)",
                  lineHeight: 1.45,
                  fontWeight: 700,
                  opacity: 0.84,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient:
                    "vertical",
                  overflow: "hidden",
                }}
              >
                {subtitle}
              </span>
            </button>
          );
        },
      )}
    </div>
  );
}

export default function
Lesson61PlantsExerciseV2({
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
        <PlantChoiceGrid
          key={
            context.item
              .question_audio_key
          }
          context={context}
        />
      )}
      onComplete={() => {
        onComplete();
      }}
    />
  );
}
