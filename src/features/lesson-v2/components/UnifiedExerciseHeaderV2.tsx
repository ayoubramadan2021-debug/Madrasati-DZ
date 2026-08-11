import type { CSSProperties } from "react";

type Props = {
  index: number;
  total: number;
  missionTitle: string;
  missionIcon?: string;
  onReplay: () => void;
  isPlaying?: boolean;
};

const COLORS = {
  white: "#ffffff",
  navy: "#17365f",
  brown: "#7b3f18",
  gold: "#edb21f",
  green: "#20a567",
};

export default function UnifiedExerciseHeaderV2({
  index,
  total,
  missionTitle,
  onReplay,
  isPlaying = false,
}: Props) {
  return (
    <>
      <div style={styles.topBar}>
        <button
      className="unified-exercise-header-v2__sound"
          type="button"
          onClick={onReplay}
          aria-label="إعادة سماع السؤال"
          aria-pressed={isPlaying}
          style={styles.soundBtn}
        >
          🔊
        </button>

        <div
      className="unified-exercise-header-v2__counter" style={styles.counter} dir="ltr">
          {index + 1} / {total}
        </div>
      </div>

      <div
      className="unified-exercise-header-v2__progress" style={styles.progressDots}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.dot,
              width: i === index ? 34 : 11,
              background:
                i === index
                  ? COLORS.gold
                  : i < index
                    ? COLORS.green
                    : "#e7d5a7",
            }}
          />
        ))}
      </div>

      <div
      className="unified-exercise-header-v2__mission" style={styles.missionPill}>
        <strong>{missionTitle}</strong>
      </div>
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  counter: {
    minWidth: 86,
    height: 46,
    borderRadius: 20,
    border: `4px solid ${COLORS.gold}`,
    background: COLORS.white,
    color: COLORS.brown,
    display: "grid",
    placeItems: "center",
    fontSize: 21,
    fontWeight: 1000,
    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
    direction: "ltr",
    unicodeBidi: "isolate",
    fontVariantNumeric: "tabular-nums",
  },

  soundBtn: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    border: "5px solid #fff",
    background: COLORS.gold,
    color: "#fff",
    fontSize: 30,
    boxShadow: "0 6px 14px rgba(0,0,0,.14)",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    padding: 0,
  },

  progressDots: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
    direction: "ltr",
  },

  dot: {
    height: 11,
    borderRadius: 99,
    display: "inline-block",
    transition: "all .25s ease",
  },

  missionPill: {
    width: "fit-content",
    maxWidth: "88%",
    margin: "0 auto 5px",
    background: COLORS.white,
    border: `3px solid ${COLORS.gold}`,
    borderRadius: 999,
    padding: "5px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.navy,
    fontSize: 15,
    lineHeight: 1.3,
    boxShadow: "0 4px 10px rgba(0,0,0,.07)",
  },
};
