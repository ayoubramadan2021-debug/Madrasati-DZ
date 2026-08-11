import {
  useEffect,
  useRef,
  useState,
} from "react";


export type AnalogClockChoiceOptionV2 = {
  id: string;
  label: string;
  value: number;
};


export type AnalogClockChoiceDataV2 = {
  hour: number;
  correctHour: number;
  choices: AnalogClockChoiceOptionV2[];
};


export type AnalogClockChoiceLabV2Props =
  AnalogClockChoiceDataV2 & {
    locked: boolean;
    showResult: boolean;
    onResult: (correct: boolean) => void;
  };


export default function AnalogClockChoiceLabV2({
  hour,
  correctHour,
  choices,
  locked,
  showResult,
  onResult,
}: AnalogClockChoiceLabV2Props) {

  const [
    selectedId,
    setSelectedId,
  ] = useState<string | null>(
    null,
  );

  const [
    solved,
    setSolved,
  ] = useState(
    false,
  );

  const wasLocked =
    useRef(
      locked,
    );


  useEffect(
    () => {
      if (
        wasLocked.current
        && !locked
        && !solved
      ) {
        setSelectedId(
          null,
        );
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


  function submit(
    option: AnalogClockChoiceOptionV2,
  ) {
    if (
      locked
      || solved
    ) {
      return;
    }

    setSelectedId(
      option.id,
    );

    const correct =
      option.value
      === correctHour;

    if (
      correct
    ) {
      setSolved(
        true,
      );

      onResult(
        true,
      );

      return;
    }

    onResult(
      false,
    );
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
          display: "grid",
          justifyItems: "center",
          gap: 10,
          padding: 12,
          borderRadius: 22,
          border:
            "2px solid #D9E6F2",
          background:
            "linear-gradient(180deg,#F7FBFF,#FFFFFF)",
        }}
      >
        <div
          aria-label={`ساعة تشير إلى ${hour}`}
          style={{
            position: "relative",
            width:
              "min(55vw,190px)",
            aspectRatio: "1",
            borderRadius: "50%",
            border:
              "7px solid #17365F",
            background: "#FFFFFF",
            boxShadow:
              "0 10px 24px rgba(23,54,95,.14)",
          }}
        >
          {Array.from({
            length: 12,
          }).map(
            (_, index) => {
              const number =
                index + 1;

              const angle =
                number
                * 30
                * Math.PI
                / 180;

              const x =
                50
                + 39
                * Math.sin(
                  angle,
                );

              const y =
                50
                - 39
                * Math.cos(
                  angle,
                );

              return (
                <span
                  key={number}
                  style={{
                    position: "absolute",
                    left: `${x}%`,
                    top: `${y}%`,
                    transform:
                      "translate(-50%,-50%)",
                    color: "#17365F",
                    fontSize: 15,
                    fontWeight: 1000,
                  }}
                >
                  {number}
                </span>
              );
            },
          )}


          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              width: 6,
              height: "29%",
              borderRadius: 8,
              background: "#17365F",
              transformOrigin:
                "50% 100%",
              transform:
                `translateX(-50%) rotate(${normalizedHour * 30}deg)`,
              zIndex: 3,
            }}
          />


          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "50%",
              width: 3,
              height: "39%",
              borderRadius: 8,
              background: "#C58B19",
              transformOrigin:
                "50% 100%",
              transform:
                "translateX(-50%) rotate(0deg)",
              zIndex: 4,
            }}
          />


          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#D4A12A",
              border:
                "3px solid #17365F",
              transform:
                "translate(-50%,-50%)",
              zIndex: 5,
            }}
          />
        </div>


        <div
          style={{
            minWidth: 100,
            minHeight: 55,
            padding:
              "6px 16px",
            borderRadius: 16,
            border:
              solved
                ? "3px solid #D4A12A"
                : "3px dashed #D4A12A",
            background:
              solved
                ? "#17365F"
                : "#FFF8E8",
            color:
              solved
                ? "#FFFFFF"
                : "#B77B09",
            display: "grid",
            placeItems: "center",
            fontSize:
              "clamp(25px,7vw,34px)",
            fontWeight: 1000,
            transition:
              "all .25s ease",
          }}
        >
          {solved
            ? `${correctHour}:00`
            : "؟"}
        </div>
      </div>


      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,minmax(0,1fr))",
          gap: 10,
        }}
      >
        {choices.map(
          (option) => {

            const selected =
              selectedId
              === option.id;

            const correct =
              option.value
              === correctHour;

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
                    option,
                  )
                }
                style={{
                  minHeight: 66,
                  borderRadius: 18,
                  border:
                    good
                      ? "3px solid #218838"
                      : bad
                        ? "3px solid #C93636"
                        : "2px solid #D5E0EA",
                  background:
                    good
                      ? "#EAF8EE"
                      : bad
                        ? "#FFF0F0"
                        : "#FFFFFF",
                  color:
                    good
                      ? "#176B2C"
                      : bad
                        ? "#A92C2C"
                        : "#17365F",
                  fontSize:
                    "clamp(22px,6vw,30px)",
                  fontWeight: 1000,
                  transition:
                    "all .2s ease",
                }}
              >
                {good
                  ? "✓"
                  : option.label}
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}
