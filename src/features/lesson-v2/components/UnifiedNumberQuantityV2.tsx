type TargetNumberProps = {
  number: number;
  active?: boolean;
};

type QuantityGroupProps = {
  count: number;
  emoji: string;
};

export function UnifiedTargetNumberV2({
  number,
  active = false,
}: TargetNumberProps) {
  return (
    <div
      className={
        `unified-target-number-v2${
          active ? " is-active" : ""
        }`
      }
      aria-label={`العدد ${number}`}
    >
      <style>{`
        .unified-target-number-v2 {
          width: 132px;
          height: 132px;

          display: grid;
          place-items: center;

          border: 6px solid #17365f;
          border-radius: 30px;

          background: rgba(255,255,255,.97);
          color: #0f2447;

          font-family:
            "Tajawal",
            Arial,
            sans-serif;

          font-size:
            clamp(4.3rem, 18vw, 6rem);

          line-height: 1;
          font-weight: 1000;

          box-shadow:
            0 10px 25px
            rgba(23,54,95,.18);

          transition:
            transform .25s ease,
            color .25s ease,
            border-color .25s ease,
            box-shadow .25s ease;
        }

        .unified-target-number-v2.is-active {
          color: #e8a020;
          border-color: #e8a020;

          transform:
            scale(1.08)
            rotate(-2deg);

          box-shadow:
            0 0 30px
            rgba(232,160,32,.58),
            0 10px 25px
            rgba(23,54,95,.18);
        }
      `}</style>

      {number}
    </div>
  );
}

export function UnifiedQuantityGroupV2({
  count,
  emoji,
}: QuantityGroupProps) {
  const safeCount = Math.max(
    0,
    Math.floor(count),
  );

  const itemSize =
    safeCount <= 5
      ? 25
      : safeCount <= 10
        ? 21
        : safeCount <= 15
          ? 18
          : 16;

  return (
    <div
      className="unified-quantity-group-v2"
      aria-label={`${safeCount} عناصر`}
    >
      <style>{`
        .unified-quantity-group-v2 {
          width: 100%;
          min-height: 94px;

          display: grid;
          grid-template-columns:
            repeat(5, minmax(0, 1fr));

          align-content: center;
          align-items: center;
          justify-items: center;

          gap: 2px;

          box-sizing: border-box;
          padding: 4px;
        }

        .unified-quantity-group-v2__item {
          display: grid;
          place-items: center;

          line-height: 1;

          filter:
            drop-shadow(
              0 2px 3px
              rgba(0,0,0,.14)
            );
        }
      `}</style>

      {Array.from(
        { length: safeCount },
        (_, index) => (
          <span
            key={`${emoji}-${index}`}
            className="unified-quantity-group-v2__item"
            aria-hidden="true"
            style={{
              fontSize: itemSize,
            }}
          >
            {emoji}
          </span>
        ),
      )}
    </div>
  );
}
