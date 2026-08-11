import {
  useEffect,
  useRef,
  useState,
} from "react";

export type DurationOrderItemV2 = {
  id: string;
  label: string;
  icon?: string;
};

export type DurationOrderLabV2Props = {
  items: DurationOrderItemV2[];
  correctOrder: string[];

  locked: boolean;
  showResult: boolean;

  onResult: (
    correct: boolean,
  ) => void;
};

export default function DurationOrderLabV2({
  items,
  correctOrder,
  locked,
  showResult,
  onResult,
}: DurationOrderLabV2Props) {
  const [
    selected,
    setSelected,
  ] = useState<string[]>([]);

  const wasLockedRef =
    useRef(locked);

  useEffect(() => {
    if (
      wasLockedRef.current
      && !locked
      && !showResult
    ) {
      setSelected([]);
    }

    wasLockedRef.current =
      locked;
  }, [
    locked,
    showResult,
  ]);

  const choose = (
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
        next.length
          === correctOrder.length
        && next.every(
          (value, index) =>
            value
            === correctOrder[index],
        );

      onResult(correct);
    }
  };

  const remaining =
    items.filter(
      (item) =>
        !selected.includes(
          item.id,
        ),
    );

  const selectedItems =
    selected
      .map(
        (id) =>
          items.find(
            (item) =>
              item.id === id,
          ),
      )
      .filter(
        (
          item,
        ): item is DurationOrderItemV2 =>
          Boolean(item),
      );

  return (
    <div
      dir="rtl"
      style={styles.wrapper}
    >
      <div style={styles.instruction}>
        رَتِّبْ مِنَ الْأَقْصَرِ مُدَّةً
        إِلَى الْأَطْوَلِ مُدَّةً
      </div>

      <div style={styles.orderRow}>
        {Array.from({
          length: items.length,
        }).map((_, index) => {
          const item =
            selectedItems[index];

          return (
            <div
              key={index}
              style={
                item
                  ? styles.slotFilled
                  : styles.slot
              }
            >
              <div style={styles.rank}>
                {index + 1}
              </div>

              {item ? (
                <>
                  {item.icon && (
                    <div
                      style={
                        styles.icon
                      }
                    >
                      {item.icon}
                    </div>
                  )}

                  <div>
                    {item.label}
                  </div>
                </>
              ) : (
                <div
                  style={
                    styles.placeholder
                  }
                >
                  ؟
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!showResult && (
        <div style={styles.options}>
          {remaining.map(
            (item) => (
              <button
                key={item.id}
                type="button"
                disabled={locked}
                onClick={() =>
                  choose(item.id)
                }
                style={
                  styles.optionButton
                }
              >
                {item.icon && (
                  <span
                    style={
                      styles.optionIcon
                    }
                  >
                    {item.icon}
                  </span>
                )}

                <span>
                  {item.label}
                </span>
              </button>
            ),
          )}
        </div>
      )}

      {selected.length > 0
        && !locked
        && !showResult
        && (
          <button
            type="button"
            onClick={() =>
              setSelected([])
            }
            style={
              styles.resetButton
            }
          >
            ↻ أَعِدِ التَّرْتِيبَ
          </button>
        )}

      {showResult && (
        <div
          style={
            styles.success
          }
        >
          ✅ تَرْتِيبٌ صَحِيحٌ
        </div>
      )}
    </div>
  );
}

const styles: Record<
  string,
  React.CSSProperties
> = {
  wrapper: {
    width: "100%",
    display: "grid",
    gap: 16,
    padding: 8,
  },

  instruction: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 900,
    color: "#17365F",
  },

  orderRow: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 10,
  },

  slot: {
    minHeight: 105,
    border:
      "2px dashed #E8A020",
    borderRadius: 18,
    display: "grid",
    placeItems: "center",
    position: "relative",
    background: "#FFF9ED",
    padding: 8,
    textAlign: "center",
  },

  slotFilled: {
    minHeight: 105,
    border:
      "2px solid #E8A020",
    borderRadius: 18,
    display: "grid",
    placeItems: "center",
    position: "relative",
    background: "#FFFFFF",
    padding: 8,
    textAlign: "center",
    fontWeight: 900,
    color: "#17365F",
  },

  rank: {
    position: "absolute",
    top: 6,
    right: 8,
    width: 25,
    height: 25,
    borderRadius: 999,
    display: "grid",
    placeItems: "center",
    background: "#E8A020",
    color: "#FFFFFF",
    fontWeight: 900,
    fontSize: 13,
  },

  icon: {
    fontSize: 31,
  },

  placeholder: {
    fontSize: 32,
    color: "#B8A77A",
    fontWeight: 900,
  },

  options: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 10,
  },

  optionButton: {
    minHeight: 75,
    border:
      "2px solid #E8A020",
    borderRadius: 18,
    background: "#FFFFFF",
    color: "#17365F",
    fontWeight: 900,
    fontSize: 16,
    padding: 8,
    cursor: "pointer",
  },

  optionIcon: {
    display: "block",
    fontSize: 27,
    marginBottom: 3,
  },

  resetButton: {
    justifySelf: "center",
    border:
      "1px solid #17365F",
    borderRadius: 14,
    padding: "9px 15px",
    background: "#FFFFFF",
    color: "#17365F",
    fontWeight: 800,
  },

  success: {
    textAlign: "center",
    fontSize: 19,
    fontWeight: 900,
    color: "#1FA463",
  },
};
