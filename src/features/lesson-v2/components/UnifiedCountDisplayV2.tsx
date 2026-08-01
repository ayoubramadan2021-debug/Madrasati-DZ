type Props = {
  count: number;
  emoji: string;
  itemLabel?: string;
};

export default function UnifiedCountDisplayV2({
  count,
  emoji,
  itemLabel = "عناصر",
}: Props) {
  const safeCount = Math.max(
    0,
    Math.floor(count),
  );

  return (
    <div
      className="unified-count-display-v2"
      aria-label={`${safeCount} ${itemLabel}`}
    >
      <style>{`
        .unified-count-display-v2 {
          width: min(100%, 560px);
          min-height: 220px;

          box-sizing: border-box;
          padding: 16px;

          display: grid;
          grid-template-columns:
            repeat(5, minmax(0, 1fr));

          align-content: center;
          align-items: center;
          justify-items: center;

          gap:
            clamp(6px, 1.4vh, 13px)
            clamp(8px, 2vw, 17px);
        }

        .unified-count-display-v2__item {
          width: min(100%, 76px);
          aspect-ratio: 1;

          display: grid;
          place-items: center;

          font-size:
            clamp(
              2.35rem,
              min(9.8vw, 7.5vh),
              4.5rem
            );

          line-height: 1;

          filter:
            drop-shadow(
              0 5px 5px
              rgba(0, 0, 0, 0.2)
            );

          opacity: 0;

          animation:
            unifiedCountItemAppear
            420ms
            cubic-bezier(.2,.85,.3,1.25)
            forwards;
        }

        @keyframes unifiedCountItemAppear {
          0% {
            opacity: 0;
            transform:
              translateY(14px)
              scale(.65);
          }

          70% {
            opacity: 1;
            transform:
              translateY(-2px)
              scale(1.08);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @media (max-width: 520px) {
          .unified-count-display-v2 {
            min-height: 205px;
            padding: 10px 7px;
            gap: 5px 7px;
          }

          .unified-count-display-v2__item {
            width: min(100%, 64px);
          }
        }

        @media (max-height: 720px) {
          .unified-count-display-v2 {
            min-height: 185px;
            padding-top: 8px;
            padding-bottom: 8px;
          }

          .unified-count-display-v2__item {
            width: min(100%, 57px);
          }
        }
      `}</style>

      {Array.from(
        { length: safeCount },
        (_, index) => (
          <span
            key={`${emoji}-${index}`}
            className="unified-count-display-v2__item"
            aria-hidden="true"
            style={{
              animationDelay:
                `${120 + index * 90}ms`,
            }}
          >
            {emoji}
          </span>
        ),
      )}
    </div>
  );
}
