import { useEffect, useState } from "react";

export type SciencePremiumIconChoiceOptionV2 = {
  id: string;
  icon: string;
  label: string;
};

export type SciencePremiumIconChoiceDataV2 = {
  options: SciencePremiumIconChoiceOptionV2[];
  correctId: string;
};

export type SciencePremiumIconChoiceLabV2Props =
  SciencePremiumIconChoiceDataV2 & {
    locked: boolean;
    showResult: boolean;
    onResult: (correct: boolean) => void;
  };

const ASSET_BASE = "/lessons/v2/science-premium";

function PremiumAsset({ assetKey }: { assetKey: string }) {
  const keys = String(assetKey || "correct")
    .split("+")
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 2);

  return (
    <div
      aria-hidden="true"
      style={{
        width: 104,
        height: 104,
        borderRadius: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: keys.length > 1 ? 2 : 0,
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(23,54,95,.16)",
      }}
    >
      {keys.map((key) => (
        <img
          key={key}
          src={`${ASSET_BASE}/${key}.webp`}
          alt=""
          draggable={false}
          style={{
            width: keys.length > 1 ? 58 : 104,
            height: keys.length > 1 ? 58 : 104,
            objectFit: "contain",
            display: "block",
          }}
        />
      ))}
    </div>
  );
}

export default function SciencePremiumIconChoiceLabV2({
  options,
  correctId,
  locked,
  showResult,
  onResult,
}: SciencePremiumIconChoiceLabV2Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setSelectedId(null);
    setSolved(false);
  }, [correctId, options]);

  const submit = (id: string) => {
    if (locked || solved) return;
    setSelectedId(id);
    const correct = id === correctId;
    if (correct) setSolved(true);
    onResult(correct);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(2,minmax(0,1fr))",
        gap: 12,
      }}
    >
      {options.map((option) => {
        const selected = selectedId === option.id;
        const good = selected && option.id === correctId;
        const bad = selected && showResult && option.id !== correctId;

        return (
          <button
            key={option.id}
            type="button"
            disabled={locked || solved}
            onClick={() => submit(option.id)}
            style={{
              position: "relative",
              minHeight: 232,
              padding: "14px 10px",
              borderRadius: 28,
              border: good
                ? "4px solid #47A765"
                : bad
                  ? "4px solid #E45A5A"
                  : "2px solid #D9E5EE",
              background: "#FFFFFF",
              boxShadow: "0 10px 24px rgba(23,54,95,.08)",
              display: "grid",
              alignContent: "center",
              justifyItems: "center",
              gap: 12,
              fontFamily: "inherit",
              cursor: locked ? "default" : "pointer",
            }}
          >
            <PremiumAsset assetKey={option.icon} />

            <div
              dir="rtl"
              style={{
                width: "100%",
                minHeight: 58,
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                color: "#17365F",
                fontWeight: 900,
                fontSize: "clamp(18px,5vw,27px)",
                lineHeight: 1.5,
              }}
            >
              {option.label}
            </div>

            {good ? (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  background: "#47A765",
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 900,
                }}
              >
                ✓
              </div>
            ) : null}

            {bad ? (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  background: "#E45A5A",
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: 900,
                }}
              >
                ×
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
