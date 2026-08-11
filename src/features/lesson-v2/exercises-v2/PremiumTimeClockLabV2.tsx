import {
  useEffect,
  useRef,
  useState,
} from "react";


export type PremiumTimeClockModeV2 =
  | "identify"
  | "read";


export type PremiumTimeClockOptionV2 = {
  id: string;
  icon: string;
  label: string;
};


export type PremiumTimeClockDataV2 = {
  mode: PremiumTimeClockModeV2;
  hour: number;
  options: PremiumTimeClockOptionV2[];
  correctId: string;
};


export type PremiumTimeClockLabV2Props =
  PremiumTimeClockDataV2 & {
    locked: boolean;
    showResult: boolean;
    onResult: (correct: boolean) => void;
  };


export default function PremiumTimeClockLabV2({
  mode,
  hour,
  options,
  correctId,
  locked,
  showResult,
  onResult,
}: PremiumTimeClockLabV2Props) {

  const [
    selectedId,
    setSelectedId,
  ] = useState<string | null>(
    null,
  );

  const [
    solved,
    setSolved,
  ] = useState(false);

  const wasLocked =
    useRef(locked);


  useEffect(
    () => {
      if (
        wasLocked.current
        && !locked
        && !solved
      ) {
        setSelectedId(null);
      }

      wasLocked.current =
        locked;
    },
    [
      locked,
      solved,
    ],
  );


  const normalizedHour =
    (
      (
        Math.trunc(hour)
        % 12
      )
      + 12
    )
    % 12;


  const hourAngle =
    normalizedHour * 30 - 90;

  const minuteAngle =
    -90;


  function point(
    angleDeg: number,
    radius: number,
  ) {
    const r =
      angleDeg
      * Math.PI
      / 180;

    return {
      x:
        150
        + Math.cos(r)
        * radius,

      y:
        150
        + Math.sin(r)
        * radius,
    };
  }


  const hourEnd =
    point(
      hourAngle,
      60,
    );

  const minuteEnd =
    point(
      minuteAngle,
      99,
    );

  const hourLabel =
    point(
      hourAngle,
      90,
    );

  const minuteLabel =
    point(
      minuteAngle,
      122,
    );


  const showHandLabels =
    mode === "read"
    || solved;


  function submit(
    id: string,
  ) {
    if (
      locked
      || solved
    ) {
      return;
    }

    setSelectedId(id);

    const correct =
      id === correctId;

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
        gap: 14,
      }}
    >
      <div
        style={{
          padding:
            "12px 8px 14px",
          borderRadius: 28,
          border:
            "2px solid #E4B42B",
          background:
            "linear-gradient(180deg,#FFFFFF,#FFF9E9)",
          boxShadow:
            "0 12px 28px rgba(23,54,95,.12)",
          display: "grid",
          justifyItems:
            "center",
          gap: 8,
        }}
      >
        <svg
          viewBox="0 0 300 300"
          role="img"
          aria-label={`ساعة مضبوطة على ${hour}:00`}
          style={{
            width:
              "min(78vw,320px)",
            height: "auto",
            display: "block",
          }}
        >
          <defs>
            <filter
              id="clockShadow"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feDropShadow
                dx="0"
                dy="5"
                stdDeviation="5"
                floodOpacity=".18"
              />
            </filter>
          </defs>


          <circle
            cx="150"
            cy="150"
            r="137"
            fill="#FFFFFF"
            stroke="#17365F"
            strokeWidth="8"
            filter="url(#clockShadow)"
          />

          <circle
            cx="150"
            cy="150"
            r="126"
            fill="none"
            stroke="#E9B62C"
            strokeWidth="2"
          />


          {Array.from({
            length: 60,
          }).map(
            (_, index) => {

              const angle =
                index * 6 - 90;

              const outer =
                point(
                  angle,
                  126,
                );

              const inner =
                point(
                  angle,
                  index % 5 === 0
                    ? 116
                    : 121,
                );

              return (
                <line
                  key={index}
                  x1={inner.x}
                  y1={inner.y}
                  x2={outer.x}
                  y2={outer.y}
                  stroke={
                    index % 5 === 0
                      ? "#17365F"
                      : "#9AA8B5"
                  }
                  strokeWidth={
                    index % 5 === 0
                      ? 3
                      : 1.2
                  }
                  strokeLinecap="round"
                />
              );
            },
          )}


          {Array.from({
            length: 12,
          }).map(
            (_, index) => {

              const number =
                index + 1;

              const p =
                point(
                  number * 30 - 90,
                  101,
                );

              return (
                <text
                  key={number}
                  x={p.x}
                  y={p.y + 6}
                  textAnchor="middle"
                  fontSize="20"
                  fontWeight="800"
                  fill="#17365F"
                >
                  {number}
                </text>
              );
            },
          )}


          {/* العقرب القصير: الساعات */}
          <line
            x1="150"
            y1="150"
            x2={hourEnd.x}
            y2={hourEnd.y}
            stroke="#17365F"
            strokeWidth="10"
            strokeLinecap="round"
          />


          {/* العقرب الطويل: الدقائق */}
          <line
            x1="150"
            y1="150"
            x2={minuteEnd.x}
            y2={minuteEnd.y}
            stroke="#D59D18"
            strokeWidth="6"
            strokeLinecap="round"
          />


          <circle
            cx="150"
            cy="150"
            r="10"
            fill="#E9B62C"
            stroke="#17365F"
            strokeWidth="4"
          />


          {showHandLabels
            ? (
              <>
                <rect
                  x={
                    Math.max(
                      4,
                      Math.min(
                        210,
                        hourLabel.x - 34,
                      ),
                    )
                  }
                  y={
                    Math.max(
                      8,
                      Math.min(
                        260,
                        hourLabel.y - 15,
                      ),
                    )
                  }
                  width="72"
                  height="28"
                  rx="12"
                  fill="#17365F"
                />

                <text
                  x={
                    Math.max(
                      40,
                      Math.min(
                        246,
                        hourLabel.x + 2,
                      ),
                    )
                  }
                  y={
                    Math.max(
                      27,
                      Math.min(
                        279,
                        hourLabel.y + 5,
                      ),
                    )
                  }
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="800"
                  fill="#FFFFFF"
                >
                  الساعات
                </text>


                <rect
                  x={
                    Math.max(
                      4,
                      Math.min(
                        210,
                        minuteLabel.x - 34,
                      ),
                    )
                  }
                  y={
                    Math.max(
                      8,
                      Math.min(
                        260,
                        minuteLabel.y - 15,
                      ),
                    )
                  }
                  width="72"
                  height="28"
                  rx="12"
                  fill="#D59D18"
                />

                <text
                  x={
                    Math.max(
                      40,
                      Math.min(
                        246,
                        minuteLabel.x + 2,
                      ),
                    )
                  }
                  y={
                    Math.max(
                      27,
                      Math.min(
                        279,
                        minuteLabel.y + 5,
                      ),
                    )
                  }
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="800"
                  fill="#FFFFFF"
                >
                  الدقائق
                </text>
              </>
            )
            : null}
        </svg>


        <div
          dir="rtl"
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(2,minmax(0,1fr))",
            gap: 8,
          }}
        >
          <div
            style={{
              padding:
                "8px 6px",
              borderRadius: 15,
              background: "#EEF3F8",
              color: "#17365F",
              textAlign:
                "center",
              fontWeight: 900,
              fontSize: 16,
            }}
          >
            ━ القصير: الساعات
          </div>

          <div
            style={{
              padding:
                "8px 6px",
              borderRadius: 15,
              background: "#FFF5D8",
              color: "#9A6B08",
              textAlign:
                "center",
              fontWeight: 900,
              fontSize: 16,
            }}
          >
            ━ الطويل: الدقائق
          </div>
        </div>


        {mode === "read"
          ? (
            <div
              style={{
                minWidth: 115,
                minHeight: 54,
                borderRadius: 16,
                border:
                  solved
                    ? "3px solid #E3AD22"
                    : "3px dashed #E3AD22",
                background:
                  solved
                    ? "#17365F"
                    : "#FFF8E7",
                color:
                  solved
                    ? "#FFFFFF"
                    : "#A77613",
                display: "grid",
                placeItems:
                  "center",
                fontSize:
                  "clamp(25px,8vw,36px)",
                fontWeight: 1000,
              }}
            >
              {solved
                ? `${hour}:00`
                : "؟"}
            </div>
          )
          : null}
      </div>


      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,minmax(0,1fr))",
          gap: 10,
        }}
      >
        {options.map(
          (option) => {

            const selected =
              selectedId
              === option.id;

            const correct =
              option.id
              === correctId;

            const good =
              selected
              && solved
              && correct;

            const bad =
              selected
              && showResult
              && !correct;


            return (
              <button
                key={option.id}
                type="button"
                disabled={
                  locked
                  || solved
                }
                onClick={() =>
                  submit(
                    option.id,
                  )
                }
                style={{
                  minHeight: 92,
                  borderRadius: 20,
                  border:
                    good
                      ? "3px solid #278746"
                      : bad
                        ? "3px solid #C94747"
                        : "2px solid #D8E3EC",
                  background:
                    good
                      ? "#EDF9F0"
                      : bad
                        ? "#FFF1F1"
                        : "#FFFFFF",
                  display: "grid",
                  justifyItems:
                    "center",
                  alignContent:
                    "center",
                  gap: 5,
                  boxShadow:
                    "0 7px 18px rgba(23,54,95,.08)",
                }}
              >
                <span
                  style={{
                    fontSize: 31,
                  }}
                >
                  {good
                    ? "✅"
                    : option.icon}
                </span>

                <strong
                  style={{
                    color: "#17365F",
                    fontSize:
                      "clamp(17px,5vw,22px)",
                    textAlign:
                      "center",
                    lineHeight: 1.35,
                  }}
                >
                  {option.label}
                </strong>
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}
