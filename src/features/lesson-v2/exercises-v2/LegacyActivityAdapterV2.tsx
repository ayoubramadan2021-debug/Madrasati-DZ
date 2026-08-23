import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import type {
  UnifiedLessonExerciseQuestionV2,
  UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

export type LegacyMatchEndpointV2 = {
  kind: string;
  value?: string;
  src?: string;
};

export type LegacyMatchPairV2 = {
  match_id: string;
  draggable: LegacyMatchEndpointV2;
  target: LegacyMatchEndpointV2;
};

export type LegacyActivityQuestionV2 =
  UnifiedLessonExerciseQuestionV2 & {
    activityKind:
      | "legacy-word-choice"
      | "legacy-image-choice"
      | "legacy-drag-match";

    sceneImage?: string;
    wordOptions?: string[];
    imageOptions?: string[];
    imageFit?: "cover" | "contain";

    dragPairs?: LegacyMatchPairV2[];
  };

type Props = UnifiedLessonExerciseRenderContextV2<LegacyActivityQuestionV2>;

const C = {
  navy: "#1B3A6B",
  gold: "#E8A020",
  cream: "#FFF8EC",
};

function optionButtonStyle(
  selected: boolean,
  locked: boolean,
): CSSProperties {
  return {
    minHeight: 58,
    borderRadius: 16,
    border: selected
      ? `2px solid ${C.gold}`
      : "1px solid rgba(27,58,107,.18)",
    background: selected
      ? "rgba(232,160,32,.13)"
      : "#fff",
    color: C.navy,
    fontFamily: "Tajawal,sans-serif",
    fontWeight: 900,
    fontSize: 18,
    cursor: locked ? "default" : "pointer",
    opacity: locked && !selected ? .72 : 1,
    padding: "10px 12px",
  };
}

function WordChoiceAdapter({
  question,
  selectedId,
  locked,
  submitAnswer,
}: Props) {
  const options = question.wordOptions ?? [];

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {question.sceneImage && (
        <img
          src={question.sceneImage}
          alt=""
          style={{
            width: "100%",
            maxHeight: 320,
            objectFit: "contain",
            borderRadius: 18,
            background: C.cream,
          }}
        />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,minmax(0,1fr))",
          gap: 10,
        }}
      >
        {options.map((value) => (
          <button
            key={value}
            type="button"
            disabled={locked}
            onClick={() => submitAnswer(value)}
            style={optionButtonStyle(selectedId === value, locked)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

function ImageChoiceAdapter({
  question,
  selectedId,
  locked,
  submitAnswer,
}: Props) {
  const options = question.imageOptions ?? [];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
        gap: 12,
      }}
    >
      {options.map((src, index) => {
        const id = String(index);
        const selected = selectedId === id;

        return (
          <button
            key={`${src}-${index}`}
            type="button"
            disabled={locked}
            onClick={() => submitAnswer(id)}
            style={{
              border: selected
                ? `3px solid ${C.gold}`
                : "1px solid rgba(27,58,107,.16)",
              borderRadius: 18,
              padding: 6,
              background: selected
                ? "rgba(232,160,32,.12)"
                : "#fff",
              cursor: locked ? "default" : "pointer",
              overflow: "hidden",
              minHeight: 150,
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: "100%",
                height: 145,
                display: "block",
                objectFit: question.imageFit ?? "cover",
                borderRadius: 13,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

function DragMatchAdapter({
  question,
  locked,
  showResult,
  submitResult,
}: Props) {
  const pairs = question.dragPairs ?? [];

  const words = useMemo(
    () =>
      pairs.map((pair) => ({
        id: pair.match_id,
        label:
          pair.draggable.value
          ?? pair.draggable.src
          ?? pair.match_id,
      })),
    [pairs],
  );

  const targets = useMemo(
    () =>
      pairs.map((pair) => ({
        id: pair.match_id,
        src: pair.target.src,
        label:
          pair.target.value
          ?? pair.target.src
          ?? pair.match_id,
      })),
    [pairs],
  );

  const [selectedWordId, setSelectedWordId] =
    useState<string | null>(null);
  const [assigned, setAssigned] =
    useState<Record<string, string>>({});

  const previousQuestionId = useRef(question.id);
  const previousShowResult = useRef(showResult);

  useEffect(() => {
    if (previousQuestionId.current !== question.id) {
      previousQuestionId.current = question.id;
      setSelectedWordId(null);
      setAssigned({});
    }
  }, [question.id]);

  useEffect(() => {
    if (previousShowResult.current && !showResult) {
      setSelectedWordId(null);
      setAssigned({});
    }
    previousShowResult.current = showResult;
  }, [showResult]);

  const assignToTarget = (targetId: string) => {
    if (locked || !selectedWordId) return;

    const next = {
      ...assigned,
      [targetId]: selectedWordId,
    };

    setAssigned(next);
    setSelectedWordId(null);

    if (Object.keys(next).length === targets.length) {
      const correct = targets.every(
        (target) => next[target.id] === target.id,
      );
      submitResult(correct);
    }
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {words.map((word) => {
          const used = Object.values(assigned).includes(word.id);
          const selected = selectedWordId === word.id;

          return (
            <button
              key={word.id}
              type="button"
              disabled={locked || used}
              onClick={() => setSelectedWordId(word.id)}
              style={{
                ...optionButtonStyle(selected, locked || used),
                minWidth: 110,
                opacity: used ? .38 : 1,
              }}
            >
              {word.label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,minmax(0,1fr))",
          gap: 12,
        }}
      >
        {targets.map((target) => {
          const wordId = assigned[target.id];
          const word =
            words.find((item) => item.id === wordId) ?? null;

          return (
            <button
              key={target.id}
              type="button"
              disabled={locked || !selectedWordId}
              onClick={() => assignToTarget(target.id)}
              style={{
                borderRadius: 18,
                border: word
                  ? `2px solid ${C.gold}`
                  : "2px dashed rgba(27,58,107,.25)",
                background: "#fff",
                padding: 8,
                minHeight: 175,
                cursor:
                  locked || !selectedWordId
                    ? "default"
                    : "pointer",
              }}
            >
              {target.src ? (
                <img
                  src={target.src}
                  alt=""
                  style={{
                    width: "100%",
                    height: 130,
                    objectFit: "cover",
                    borderRadius: 12,
                    display: "block",
                    marginBottom: 8,
                  }}
                />
              ) : (
                <div
                  style={{
                    minHeight: 110,
                    display: "grid",
                    placeItems: "center",
                    color: C.navy,
                    fontWeight: 900,
                  }}
                >
                  {target.label}
                </div>
              )}

              <div
                style={{
                  minHeight: 24,
                  color: word ? C.navy : "#64748b",
                  fontWeight: 900,
                }}
              >
                {word?.label ?? "اختر كلمة ثم اضغط هنا"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LegacyActivityAdapterV2(
  props: Props,
) {
  switch (props.question.activityKind) {
    case "legacy-word-choice":
      return <WordChoiceAdapter {...props} />;

    case "legacy-image-choice":
      return <ImageChoiceAdapter {...props} />;

    case "legacy-drag-match":
      return <DragMatchAdapter {...props} />;

    default:
      return null;
  }
}
