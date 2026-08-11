import type {
  CSSProperties,
  ReactNode,
} from "react";

export type UnifiedAnswerState =
  | "idle"
  | "correct"
  | "wrong";

export type UnifiedAnswerOption = {
  id: string;
  content: ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
};

type Props = {
  options: UnifiedAnswerOption[];

  selectedId?: string | null;
  feedback?: UnifiedAnswerState;

  correctId?: string | null;
  showCorrect?: boolean;

  onSelect: (id: string) => void;

  variant?: "number" | "text" | "image";
  columns?: 1 | 2 | 3 | "auto";

  disabled?: boolean;
  direction?: "rtl" | "ltr";
};

const C = {
  navy: "#17365F",
  gold: "#EDB21F",
  green: "#1FA463",
  greenSoft: "#E7F8EF",
  red: "#D45447",
  redSoft: "#FFF0EE",
  white: "#FFFFFF",
};

export default function UnifiedExerciseAnswersV2({
  options,
  selectedId = null,
  feedback = "idle",

  correctId = null,
  showCorrect = false,

  onSelect,
  variant = "number",
  columns = "auto",
  disabled = false,
  direction = "rtl",
}: Props) {
  const resolvedColumns =
    columns === "auto"
      ? options.length <= 3
        ? options.length
        : 2
      : columns;

  return (
    <div
      className="unified-exercise-answers-v2"
      data-variant={variant}
      role="group"
      aria-label="خيارات الإجابة"
      dir={direction}
      style={{
        ...styles.grid,
        gridTemplateColumns:
          resolvedColumns === 1
            ? "1fr"
            : `repeat(${resolvedColumns}, minmax(0, 1fr))`,
      }}
    >
      {options.map((option) => {
        const selected =
          selectedId === option.id;

        const revealedCorrect =
          showCorrect &&
          correctId === option.id;

        const correct =
          (
            selected &&
            feedback === "correct"
          ) ||
          revealedCorrect;

        const wrong =
          selected &&
          feedback === "wrong";

        const buttonStyle: CSSProperties = {
          ...styles.button,
          ...(variant === "number"
            ? styles.numberButton
            : variant === "text"
              ? styles.textButton
              : styles.imageButton),

          ...(selected
            ? styles.selectedButton
            : {}),

          ...(correct
            ? styles.correctButton
            : {}),

          ...(wrong
            ? styles.wrongButton
            : {}),
        };

        return (
          <button
            key={option.id}
            type="button"
            aria-label={option.ariaLabel}
            aria-pressed={selected}
            disabled={
              disabled ||
              option.disabled === true
            }
            onClick={() =>
              onSelect(option.id)
            }
            style={buttonStyle}
          >
            {option.content}
          </button>
        );
      })}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  grid: {
    width: "100%",
    maxWidth: 620,
    margin: "0 auto",

    display: "grid",
    alignItems: "stretch",
    justifyContent: "center",

    gap: 10,
    boxSizing: "border-box",
  },

  button: {
    minWidth: 0,
    boxSizing: "border-box",

    border: `4px solid ${C.gold}`,
    borderRadius: 20,

    background: C.white,
    color: C.navy,

    boxShadow:
      "0 6px 15px rgba(23,54,95,.12)",

    fontFamily:
      '"Tajawal", "Noto Kufi Arabic", Arial, sans-serif',

    fontWeight: 1000,
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    transition:
      "transform .12s ease, border-color .12s ease, background .12s ease",
  },

  numberButton: {
    minHeight: 74,
    padding: "8px 6px",
    fontSize: "clamp(27px, 8vw, 42px)",
    lineHeight: 1,
  },

  textButton: {
    minHeight: 70,
    padding: "12px 14px",
    fontSize: "clamp(18px, 4.8vw, 25px)",
    lineHeight: 1.45,
    textAlign: "center",
  },

  imageButton: {
    minHeight: 110,
    padding: 10,
    fontSize: 18,
  },

  selectedButton: {
    transform: "translateY(-2px)",
    borderColor: C.navy,
    background: "#F2F7FD",
  },

  correctButton: {
    borderColor: C.green,
    background: C.greenSoft,
    color: "#137A4C",
  },

  wrongButton: {
    borderColor: C.red,
    background: C.redSoft,
    color: "#B42335",
  },
};
