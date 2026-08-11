import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export type SmallCityOrderItemV2 = {
  id: string;
  label: string;
};

type Props = {
  items: SmallCityOrderItemV2[];
  correctOrder: string[];
  locked: boolean;
  showResult: boolean;
  onResult: (correct: boolean) => void;
};

export default function SmallCityOrderLabV2({
  items,
  correctOrder,
  locked,
  showResult,
  onResult,
}: Props) {
  const [selected, setSelected] =
    useState<string[]>([]);

  const wasLocked =
    useRef(false);

  useEffect(() => {
    if (
      wasLocked.current
      && !locked
      && !showResult
    ) {
      setSelected([]);
    }

    wasLocked.current =
      locked;
  }, [
    locked,
    showResult,
  ]);

  const selectItem = (
    id: string,
  ) => {
    if (
      locked
      || showResult
      || selected.includes(id)
    ) {
      return;
    }

    const next = [
      ...selected,
      id,
    ];

    setSelected(next);

    if (
      next.length
      === items.length
    ) {
      const correct =
        next.every(
          (value, index) =>
            value
            === correctOrder[index],
        );

      onResult(correct);
    }
  };

  const reset = () => {
    if (
      locked
      || showResult
    ) {
      return;
    }

    setSelected([]);
  };

  const selectedLabels =
    selected.map(
      (id) =>
        items.find(
          (item) =>
            item.id === id,
        )?.label ?? id,
    );

  return (
    <div style={styles.root}>
      <div style={styles.selected}>
        {selectedLabels.length === 0
          ? (
              <span
                style={
                  styles.hint
                }
              >
                اضغط العناصر بالترتيب الصحيح
              </span>
            )
          : selectedLabels.map(
              (
                label,
                index,
              ) => (
                <span
                  key={
                    `${label}-${index}`
                  }
                  style={
                    styles.selectedChip
                  }
                >
                  {index + 1}
                  {" — "}
                  {label}
                </span>
              ),
            )}
      </div>

      <div style={styles.options}>
        {items.map((item) => {
          const used =
            selected.includes(
              item.id,
            );

          return (
            <button
              key={item.id}
              type="button"
              disabled={
                locked
                || showResult
                || used
              }
              onClick={() =>
                selectItem(
                  item.id,
                )
              }
              style={{
                ...styles.button,
                opacity:
                  used
                    ? 0.42
                    : 1,
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={reset}
        disabled={
          locked
          || showResult
          || selected.length === 0
        }
        style={styles.reset}
      >
        إعادة الترتيب
      </button>
    </div>
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  root: {
    display: "grid",
    gap: 12,
    width: "100%",
  },

  selected: {
    minHeight: 58,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderRadius: 18,
    background:
      "rgba(255,255,255,.88)",
    border:
      "2px dashed #E8A020",
  },

  hint: {
    color: "#6B7280",
    fontWeight: 800,
  },

  selectedChip: {
    padding: "8px 12px",
    borderRadius: 14,
    background: "#FFF7E0",
    border:
      "2px solid #E8A020",
    color: "#17365F",
    fontWeight: 900,
  },

  options: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(120px,1fr))",
    gap: 10,
  },

  button: {
    minHeight: 56,
    borderRadius: 16,
    border:
      "2px solid #D9E5F1",
    background: "#FFFFFF",
    color: "#17365F",
    fontSize: 17,
    fontWeight: 900,
    cursor: "pointer",
    padding: "8px 10px",
  },

  reset: {
    justifySelf: "center",
    border: 0,
    borderRadius: 14,
    padding: "9px 16px",
    background: "#17365F",
    color: "#FFFFFF",
    fontWeight: 900,
    cursor: "pointer",
  },
};
