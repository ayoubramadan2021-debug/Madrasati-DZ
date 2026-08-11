import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export type PremiumNumberCompareModeV2 =
  | "pickGreater"
  | "pickSmaller"
  | "pickSign";

export type PremiumNumberCompareDataV2 = {
  mode: PremiumNumberCompareModeV2;
  left: number;
  right: number;
};

type Props =
  PremiumNumberCompareDataV2 & {
    locked: boolean;
    showResult: boolean;

    onResult: (
      correct: boolean,
    ) => void;
  };

function safeNumber(
  value: number,
) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      99,
      Math.trunc(value),
    ),
  );
}

function compareSign(
  left: number,
  right: number,
) {
  if (left > right) {
    return ">";
  }

  if (left < right) {
    return "<";
  }

  return "=";
}

function NumberVisual({
  value,
  selected,
  disabled,
  onClick,
}: {
  value: number;
  selected: boolean;
  disabled: boolean;
  onClick?: () => void;
}) {
  const tens =
    Math.floor(value / 10);

  const units =
    value % 10;

  const content = (
    <>
      <strong
        style={styles.bigNumber}
      >
        {value}
      </strong>

      <div
        style={styles.placeRow}
      >
        <span
          style={styles.placeBadge}
        >
          {tens} عَشَرَات
        </span>

        <span
          style={
            styles.placeBadgeBlue
          }
        >
          {units} وَحَدَات
        </span>
      </div>

      <div
        aria-hidden="true"
        style={styles.baseTenVisual}
      >
        <div style={styles.rods}>
          {Array.from({
            length: tens,
          }).map(
            (_, index) => (
              <span
                key={`t-${index}`}
                style={styles.rod}
              />
            ),
          )}
        </div>

        <div style={styles.units}>
          {Array.from({
            length: units,
          }).map(
            (_, index) => (
              <span
                key={`u-${index}`}
                style={styles.unit}
              />
            ),
          )}
        </div>
      </div>
    </>
  );

  if (!onClick) {
    return (
      <div
        style={{
          ...styles.numberCard,

          ...(selected
            ? styles.selectedCard
            : {}),
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        ...styles.numberButton,

        ...(selected
          ? styles.selectedCard
          : {}),
      }}
    >
      {content}
    </button>
  );
}

export default function
PremiumNumberCompareLabV2({
  mode,
  left,
  right,
  locked,
  showResult,
  onResult,
}: Props) {
  const safeLeft =
    safeNumber(left);

  const safeRight =
    safeNumber(right);

  const [
    selected,
    setSelected,
  ] =
    useState<string | null>(
      null,
    );

  const wasLockedRef =
    useRef(locked);

  useEffect(() => {
    if (
      wasLockedRef.current
      && !locked
      && !showResult
    ) {
      setSelected(null);
    }

    wasLockedRef.current =
      locked;
  }, [
    locked,
    showResult,
  ]);

  const submitSide = (
    side:
      | "left"
      | "right",
  ) => {
    if (
      locked
      || showResult
    ) {
      return;
    }

    setSelected(side);

    const chosen =
      side === "left"
        ? safeLeft
        : safeRight;

    const other =
      side === "left"
        ? safeRight
        : safeLeft;

    const correct =
      mode === "pickGreater"
        ? chosen > other
        : chosen < other;

    onResult(correct);
  };

  const submitSign = (
    sign:
      | ">"
      | "<"
      | "=",
  ) => {
    if (
      locked
      || showResult
    ) {
      return;
    }

    setSelected(sign);

    onResult(
      sign
      === compareSign(
        safeLeft,
        safeRight,
      ),
    );
  };

  const chooseNumber =
    mode === "pickGreater"
    || mode === "pickSmaller";

  return (
    <div
      dir="rtl"
      style={styles.root}
      aria-label="مختبر مقارنة الأعداد"
    >
      <div
        style={
          styles.compareRow
        }
      >
        <NumberVisual
          value={safeLeft}
          selected={
            selected === "left"
          }
          disabled={
            locked
            || showResult
            || !chooseNumber
          }
          onClick={
            chooseNumber
              ? () =>
                  submitSide(
                    "left",
                  )
              : undefined
          }
        />

        <div
          aria-hidden="true"
          style={
            styles.centerMark
          }
        >
          {mode === "pickSign"
            ? "؟"
            : "↔"}
        </div>

        <NumberVisual
          value={safeRight}
          selected={
            selected === "right"
          }
          disabled={
            locked
            || showResult
            || !chooseNumber
          }
          onClick={
            chooseNumber
              ? () =>
                  submitSide(
                    "right",
                  )
              : undefined
          }
        />
      </div>

      {mode === "pickSign"
        ? (
            <div
              style={
                styles.signGrid
              }
            >
              {(
                [
                  ">",
                  "=",
                  "<",
                ] as const
              ).map(
                (sign) => (
                  <button
                    key={sign}
                    type="button"
                    disabled={
                      locked
                      || showResult
                    }
                    onClick={() =>
                      submitSign(
                        sign,
                      )
                    }
                    style={{
                      ...styles
                        .signButton,

                      ...(selected
                        === sign
                        ? styles
                            .selectedSign
                        : {}),
                    }}
                  >
                    {sign}
                  </button>
                ),
              )}
            </div>
          )
        : (
            <div
              style={styles.hint}
            >
              اضْغَطْ عَلَى الْعَدَدِ الصَّحِيحِ
            </div>
          )}
    </div>
  );
}

const styles: Record<
  string,
  CSSProperties
> = {
  root: {
    width: "100%",
    display: "grid",
    gap: 12,
  },

  compareRow: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1fr) auto minmax(0,1fr)",
    alignItems: "center",
    gap: 7,
    direction: "ltr",
  },

  numberCard: {
    minWidth: 0,
    minHeight: 150,
    borderRadius: 20,
    border:
      "2px solid #D9E5F1",
    background:
      "rgba(255,255,255,.96)",
    padding: "10px 6px",
    display: "grid",
    alignContent: "center",
    gap: 8,
    color: "#17365F",
  },

  numberButton: {
    minWidth: 0,
    minHeight: 150,
    borderRadius: 20,
    border:
      "2px solid #D9E5F1",
    background:
      "rgba(255,255,255,.96)",
    padding: "10px 6px",
    display: "grid",
    alignContent: "center",
    gap: 8,
    color: "#17365F",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  selectedCard: {
    border:
      "3px solid #E8A020",
    background: "#FFF9ED",
  },

  bigNumber: {
    fontSize:
      "clamp(38px,11vw,58px)",
    lineHeight: 1,
    fontWeight: 1000,
    textAlign: "center",
  },

  placeRow: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
    gap: 5,
    direction: "rtl",
  },

  placeBadge: {
    borderRadius: 10,
    padding: "5px 3px",
    background: "#FFF3D6",
    color: "#8A5B00",
    fontSize: 11,
    fontWeight: 900,
    textAlign: "center",
  },

  placeBadgeBlue: {
    borderRadius: 10,
    padding: "5px 3px",
    background: "#E9F4FF",
    color: "#175A96",
    fontSize: 11,
    fontWeight: 900,
    textAlign: "center",
  },

  baseTenVisual: {
    display: "grid",
    gap: 6,
    justifyItems: "center",
  },

  rods: {
    minHeight: 38,
    display: "flex",
    justifyContent:
      "center",
    alignItems: "end",
    gap: 3,
    flexWrap: "wrap",
  },

  rod: {
    width: 8,
    height: 34,
    borderRadius: 4,
    background: "#F4C76A",
    border:
      "1px solid #C48716",
  },

  units: {
    minHeight: 12,
    display: "flex",
    justifyContent:
      "center",
    gap: 3,
    flexWrap: "wrap",
  },

  unit: {
    width: 9,
    height: 9,
    borderRadius: "50%",
    background: "#DDEEFF",
    border:
      "1px solid #31699A",
  },

  centerMark: {
    color: "#C48716",
    fontSize:
      "clamp(28px,8vw,42px)",
    fontWeight: 1000,
  },

  signGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3,minmax(0,1fr))",
    gap: 9,
    direction: "ltr",
  },

  signButton: {
    minHeight: 58,
    borderRadius: 16,
    border:
      "2px solid #D9E5F1",
    background: "#FFFFFF",
    color: "#17365F",
    fontSize: 34,
    fontWeight: 1000,
    cursor: "pointer",
  },

  selectedSign: {
    border:
      "3px solid #E8A020",
    background: "#FFF9ED",
  },

  hint: {
    textAlign: "center",
    color: "#52606D",
    fontWeight: 900,
    fontSize: 14,
  },
};
