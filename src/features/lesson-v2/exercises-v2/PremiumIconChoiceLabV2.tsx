import {
  useEffect,
  useRef,
  useState,
} from "react";

export type PremiumIconChoiceOptionV2 = {
  id: string;
  icon: string;
  label: string;
};

export type PremiumIconChoiceDataV2 = {
  options: PremiumIconChoiceOptionV2[];
  correctId: string;
};

export type PremiumIconChoiceLabV2Props =
  PremiumIconChoiceDataV2 & {
    locked: boolean;
    showResult: boolean;
    onResult: (correct: boolean) => void;
  };

function PremiumGlyph({
  icon,
  chosen,
}: {
  icon: string;
  chosen: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: 74,
        height: 74,
        borderRadius: 24,
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(circle at 30% 20%,#FFFFFF 0 18%,#FFF4C8 19% 44%,#F5C13D 45% 72%,#D99A16 100%)",
        border: "3px solid rgba(255,255,255,.92)",
        boxShadow:
          chosen
            ? "0 10px 24px rgba(23,54,95,.25), inset 0 0 0 3px #17365F"
            : "0 10px 22px rgba(23,54,95,.16), inset 0 -6px 12px rgba(143,91,0,.12)",
        transform: chosen ? "translateY(-2px) scale(1.03)" : "none",
        transition: "all .18s ease",
      }}
    >
      <span
        style={{
          fontSize: 38,
          lineHeight: 1,
          filter: "drop-shadow(0 4px 3px rgba(23,54,95,.20))",
        }}
      >
        {icon}
      </span>

      <span
        style={{
          position: "absolute",
          top: 5,
          insetInlineEnd: 8,
          color: "#FFFFFF",
          fontSize: 13,
          textShadow: "0 1px 4px rgba(23,54,95,.35)",
        }}
      >
        ✦
      </span>
    </div>
  );
}

export default function PremiumIconChoiceLabV2({
  options,
  correctId,
  locked,
  showResult,
  onResult,
}: PremiumIconChoiceLabV2Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const wasLocked = useRef(locked);

  useEffect(() => {
    if (wasLocked.current && !locked && !solved) {
      setSelectedId(null);
    }
    wasLocked.current = locked;
  }, [locked, solved]);

  function submit(id: string) {
    if (locked || solved) return;
    setSelectedId(id);
    const correct = id === correctId;
    if (correct) {
      setSolved(true);
      onResult(true);
      return;
    }
    onResult(false);
  }

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
        const correct = option.id === correctId;
        const good = selected && solved && correct;
        const bad = selected && showResult && !correct;

        return (
          <button
            key={option.id}
            type="button"
            disabled={locked || solved}
            onClick={() => submit(option.id)}
            style={{
              minHeight: 144,
              padding: "14px 9px",
              borderRadius: 27,
              border:
                good
                  ? "3px solid #278746"
                  : bad
                    ? "3px solid #C94747"
                    : "2px solid #D7E3EE",
              background:
                good
                  ? "linear-gradient(180deg,#F4FFF6,#E6F8EB)"
                  : bad
                    ? "linear-gradient(180deg,#FFF8F8,#FFECEC)"
                    : "linear-gradient(145deg,#FFFFFF,#F7FAFD)",
              display: "grid",
              justifyItems: "center",
              alignContent: "center",
              gap: 10,
              boxShadow:
                good
                  ? "0 12px 28px rgba(39,135,70,.18)"
                  : "0 10px 25px rgba(23,54,95,.10)",
              transition: "all .18s ease",
            }}
          >
            <PremiumGlyph icon={good ? "✓" : option.icon} chosen={selected} />
            <strong
              dir="rtl"
              style={{
                color: bad ? "#A93131" : "#17365F",
                fontSize: "clamp(17px,4.7vw,22px)",
                lineHeight: 1.45,
                textAlign: "center",
                fontWeight: 950,
              }}
            >
              {option.label}
            </strong>
          </button>
        );
      })}
    </div>
  );
}
