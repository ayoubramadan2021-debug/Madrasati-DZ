import {
  useEffect,
  useRef,
  useState,
} from "react";

export type PremiumTimelineItemV2 = {
  id: string;
  icon: string;
  label: string;
};

export type PremiumTimelineOrderDataV2 = {
  items: PremiumTimelineItemV2[];
  correctOrder: string[];
};

export type PremiumTimelineOrderLabV2Props =
  PremiumTimelineOrderDataV2 & {
    locked: boolean;
    showResult: boolean;
    onResult: (correct: boolean) => void;
  };

function MiniClock({ hour }: { hour: number }) {
  const normalized = ((Math.trunc(hour) % 12) + 12) % 12;
  const angle = normalized * 30;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="31" fill="#fff" stroke="#17365F" strokeWidth="4" />
      <circle cx="36" cy="36" r="26" fill="none" stroke="#E7B128" strokeWidth="1.5" />
      {[0,3,6,9].map((n) => {
        const a = (n * 30 - 90) * Math.PI / 180;
        const x1 = 36 + Math.cos(a) * 23;
        const y1 = 36 + Math.sin(a) * 23;
        const x2 = 36 + Math.cos(a) * 27;
        const y2 = 36 + Math.sin(a) * 27;
        return <line key={n} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#17365F" strokeWidth="2" />;
      })}
      <line x1="36" y1="36" x2="36" y2="14" stroke="#D49B18" strokeWidth="3.5" strokeLinecap="round" />
      <line
        x1="36"
        y1="36"
        x2="36"
        y2="20"
        stroke="#17365F"
        strokeWidth="6"
        strokeLinecap="round"
        transform={`rotate(${angle} 36 36)`}
      />
      <circle cx="36" cy="36" r="4.5" fill="#E7B128" stroke="#17365F" strokeWidth="2" />
    </svg>
  );
}

function PremiumScene({ icon, label }: { icon: string; label: string }) {
  const time = label.match(/(?:^|\s)(\d{1,2}):00/);
  if (time) {
    return (
      <div
        style={{
          width: 82,
          height: 82,
          borderRadius: 24,
          display: "grid",
          placeItems: "center",
          background: "linear-gradient(145deg,#FFF8E0,#FFFFFF)",
          boxShadow: "0 9px 20px rgba(23,54,95,.13)",
          border: "2px solid #F0C448",
        }}
      >
        <MiniClock hour={Number(time[1])} />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: 82,
        height: 82,
        borderRadius: 25,
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(circle at 28% 20%,#FFFFFF 0 17%,#FFF3C4 18% 43%,#F2BC31 44% 72%,#D89614 100%)",
        border: "3px solid #FFFFFF",
        boxShadow: "0 10px 24px rgba(23,54,95,.16)",
      }}
    >
      <span style={{ fontSize: 40, filter: "drop-shadow(0 4px 3px rgba(23,54,95,.22))" }}>{icon}</span>
      <span style={{ position: "absolute", top: 5, insetInlineEnd: 8, color: "white", fontSize: 13 }}>✦</span>
    </div>
  );
}

export default function PremiumTimelineOrderLabV2({
  items,
  correctOrder,
  locked,
  showResult,
  onResult,
}: PremiumTimelineOrderLabV2Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const wasLocked = useRef(locked);

  useEffect(() => {
    if (wasLocked.current && !locked && !solved) {
      setSelected([]);
    }
    wasLocked.current = locked;
  }, [locked, solved]);

  function choose(id: string) {
    if (locked || solved || selected.includes(id)) return;
    const next = [...selected, id];
    setSelected(next);
    if (next.length !== correctOrder.length) return;
    const correct = next.every((value, index) => value === correctOrder[index]);
    if (correct) {
      setSolved(true);
      onResult(true);
      return;
    }
    onResult(false);
  }

  function undo() {
    if (locked || solved || selected.length === 0) return;
    setSelected(selected.slice(0, -1));
  }

  return (
    <div style={{ width: "100%", display: "grid", gap: 13 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 7,
          minHeight: 52,
          padding: "8px 10px",
          borderRadius: 19,
          background: "linear-gradient(180deg,#FFF9E8,#FFF4D1)",
          border: "2px solid #E6B42B",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,.8)",
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: index < selected.length ? "linear-gradient(145deg,#234B7B,#102A49)" : "#FFFFFF",
              color: index < selected.length ? "#FFFFFF" : "#17365F",
              display: "grid",
              placeItems: "center",
              fontWeight: 1000,
              border: "2px solid #17365F",
              boxShadow: index < selected.length ? "0 5px 12px rgba(23,54,95,.20)" : "none",
            }}
          >
            {index + 1}
          </div>
        ))}
        <button
          type="button"
          onClick={undo}
          disabled={locked || solved || selected.length === 0}
          style={{
            marginInlineStart: 7,
            minWidth: 50,
            minHeight: 40,
            border: "1px solid #D9E3ED",
            borderRadius: 14,
            background: "linear-gradient(180deg,#FFFFFF,#EDF3F8)",
            color: "#17365F",
            fontSize: 21,
            fontWeight: 900,
          }}
        >
          ↩
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 11 }}>
        {items.map((item) => {
          const step = selected.indexOf(item.id);
          const chosen = step >= 0;
          return (
            <button
              key={item.id}
              type="button"
              disabled={locked || solved || chosen}
              onClick={() => choose(item.id)}
              style={{
                position: "relative",
                minHeight: 154,
                padding: "13px 8px",
                borderRadius: 27,
                border: chosen ? "3px solid #17365F" : "2px solid #D7E3EE",
                background: chosen
                  ? "linear-gradient(180deg,#F1F6FB,#E8F0F8)"
                  : "linear-gradient(145deg,#FFFFFF,#F8FBFD)",
                display: "grid",
                justifyItems: "center",
                alignContent: "center",
                gap: 9,
                boxShadow: "0 10px 25px rgba(23,54,95,.10)",
              }}
            >
              {chosen ? (
                <span
                  style={{
                    position: "absolute",
                    top: 7,
                    insetInlineStart: 7,
                    width: 31,
                    height: 31,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: "linear-gradient(145deg,#234B7B,#102A49)",
                    color: "#FFFFFF",
                    fontWeight: 1000,
                    boxShadow: "0 5px 12px rgba(23,54,95,.22)",
                  }}
                >
                  {step + 1}
                </span>
              ) : null}

              <PremiumScene icon={item.icon} label={item.label} />

              <strong
                dir="rtl"
                style={{
                  color: "#17365F",
                  fontSize: "clamp(16px,4.7vw,21px)",
                  textAlign: "center",
                  lineHeight: 1.4,
                  fontWeight: 950,
                }}
              >
                {item.label}
              </strong>
            </button>
          );
        })}
      </div>

      {showResult && !solved ? (
        <div style={{ textAlign: "center", color: "#B23A3A", fontWeight: 850 }}>
          أَعِدْ تَرْتِيبَ الْبَطَاقَاتِ
        </div>
      ) : null}
    </div>
  );
}
