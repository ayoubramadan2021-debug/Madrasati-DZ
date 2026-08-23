import type {
  CSSProperties,
} from "react";

import type {
  UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

import type {
  Lesson51UnifiedQuestion,
} from "../content/lesson51_exercises_unified";

const shell: CSSProperties = {
  width: "min(760px, 96%)",
  margin: "0 auto",
  padding: 16,
  borderRadius: 26,
  border: "3px solid #E8A020",
  background: "rgba(255,255,255,.96)",
  boxShadow:
    "0 14px 28px rgba(23,54,95,.12)",
  boxSizing: "border-box",
  display: "grid",
  gap: 14,
  placeItems: "center",
  textAlign: "center",
};

const title: CSSProperties = {
  color: "#17365F",
  fontWeight: 1000,
  fontSize: "clamp(18px,4.5vw,27px)",
  lineHeight: 1.5,
};

function Dot({
  index,
}: {
  index: number;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 30,
        height: 30,
        borderRadius: 999,
        border: "2px solid #17365F",
        background:
          index % 2 === 0
            ? "#9CD7FF"
            : "#FFD86B",
        boxShadow:
          "0 3px 7px rgba(23,54,95,.12)",
      }}
    />
  );
}

function DotGroup({
  count,
}: {
  count: number;
}) {
  return (
    <div
      style={{
        minWidth: 118,
        maxWidth: 180,
        minHeight: 112,
        padding: 12,
        borderRadius: 20,
        border: "2px solid #D6E3EF",
        background: "#F8FBFE",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns:
          "repeat(5, 30px)",
        gap: 7,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {Array.from({
        length: count,
      }).map((_, index) => (
        <Dot
          key={index}
          index={index}
        />
      ))}
    </div>
  );
}

function VisualAddition({
  left,
  right,
}: {
  left: number;
  right: number;
}) {
  return (
    <section
      dir="rtl"
      style={shell}
    >
      <div style={title}>
        أَجْمَعُ الْمَجْمُوعَتَيْنِ
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <DotGroup count={left} />

        <div
          style={{
            color: "#E8A020",
            fontSize: 38,
            fontWeight: 1000,
          }}
        >
          +
        </div>

        <DotGroup count={right} />
      </div>

      <div style={title}>
        {left} + {right} = ؟
      </div>
    </section>
  );
}

function FocusCard({
  emoji,
  label,
}: {
  emoji?: string;
  label?: string;
}) {
  if (!emoji && !label) {
    return null;
  }

  return (
    <section
      dir="rtl"
      style={shell}
    >
      {emoji ? (
        <div
          aria-hidden="true"
          style={{
            fontSize: 44,
            lineHeight: 1,
          }}
        >
          {emoji}
        </div>
      ) : null}

      {label ? (
        <div style={title}>
          {label}
        </div>
      ) : null}
    </section>
  );
}

export default function Lesson51ActivityAdapterV2({
  question,
}: UnifiedLessonExerciseRenderContextV2<Lesson51UnifiedQuestion>) {
  if (
    question.mission === 2 &&
    typeof question.leftValue ===
      "number" &&
    typeof question.rightValue ===
      "number"
  ) {
    return (
      <VisualAddition
        left={question.leftValue}
        right={question.rightValue}
      />
    );
  }

  return (
    <FocusCard
      emoji={question.focusEmoji}
      label={question.focusLabel}
    />
  );
}
