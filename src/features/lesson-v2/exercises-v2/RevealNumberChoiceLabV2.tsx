import {
  useEffect,
  useRef,
  useState,
} from "react";


export type RevealNumberChoiceModeV2 =
  | "tensGroups"
  | "sequence";


export type RevealNumberChoiceOptionV2 = {
  id: string;
  label: string;
  value: number;
};


export type RevealNumberChoiceDataV2 = {
  mode: RevealNumberChoiceModeV2;

  correctValue: number;

  choices:
    RevealNumberChoiceOptionV2[];

  tens?: number;

  sequence?:
    (number | null)[];
};


export type RevealNumberChoiceLabV2Props =
  RevealNumberChoiceDataV2 & {
    locked: boolean;

    showResult: boolean;

    onResult:
      (correct: boolean) => void;
  };


export default function RevealNumberChoiceLabV2({
  mode,
  correctValue,
  choices,
  tens = 0,
  sequence = [],
  locked,
  showResult,
  onResult,
}: RevealNumberChoiceLabV2Props) {

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

  const wasLockedRef =
    useRef(
      locked,
    );


  /*
   * بعد Feedback الخاص بالإجابة الخاطئة
   * يعيد المحرك المركزي locked إلى false.
   *
   * نمسح الاختيار الخاطئ فقط.
   * لا نكشف الجواب الصحيح.
   */
  useEffect(
    () => {
      if (
        wasLockedRef.current
        && !locked
        && !solved
      ) {
        setSelectedId(
          null,
        );
      }

      wasLockedRef.current =
        locked;
    },
    [
      locked,
      solved,
    ],
  );


  const answerSlot = (
    key: string,
  ) => (
    <div
      key={key}
      aria-label={
        solved
          ? `العدد الصحيح ${correctValue}`
          : "مكان العدد الناقص"
      }
      style={{
        position: "relative",
        minWidth: 72,
        minHeight: 66,
        borderRadius: 16,
        border:
          solved
            ? "3px solid #D4A12A"
            : "3px dashed #D4A12A",
        background:
          solved
            ? "#17365F"
            : "#FFF8E8",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        boxShadow:
          solved
            ? "0 8px 20px rgba(23,54,95,.18)"
            : "none",
        transition:
          "all .28s ease",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          opacity:
            solved
              ? 0
              : 1,
          transform:
            solved
              ? "scale(.7)"
              : "scale(1)",
          color: "#B77B09",
          fontSize:
            "clamp(30px,9vw,46px)",
          fontWeight: 1000,
          transition:
            "all .22s ease",
        }}
      >
        ؟
      </span>

      <strong
        style={{
          position: "absolute",
          opacity:
            solved
              ? 1
              : 0,
          transform:
            solved
              ? "translateY(0) scale(1)"
              : "translateY(18px) scale(.7)",
          color: "#FFFFFF",
          fontSize:
            "clamp(30px,9vw,46px)",
          fontWeight: 1000,
          transition:
            "all .3s ease",
        }}
      >
        {correctValue}
      </strong>
    </div>
  );


  const renderTensGroups = () => (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: 12,
        borderRadius: 20,
        border:
          "2px solid #F0D18A",
        background:
          "linear-gradient(180deg,#FFF9EC,#FFFFFF)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent:
            "center",
          alignItems: "center",
          gap: 6,
        }}
      >
        {Array.from({
          length:
            Math.max(
              0,
              tens,
            ),
        }).map(
          (_, index) => (
            <div
              key={`ten-${index}`}
              aria-hidden="true"
              style={{
                width: 34,
                minHeight: 78,
                borderRadius: 9,
                border:
                  "2px solid #D8A83E",
                background:
                  "repeating-linear-gradient(180deg,#FFE49E 0,#FFE49E 5px,#FFF4D1 5px,#FFF4D1 8px)",
                display: "grid",
                placeItems: "center",
                color: "#765000",
                fontSize: 12,
                fontWeight: 1000,
              }}
            >
              10
            </div>
          ),
        )}
      </div>

      <div
        dir="ltr"
        style={{
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <strong
          style={{
            color: "#52606D",
            fontSize: 32,
          }}
        >
          =
        </strong>

        {answerSlot(
          "tens-answer-slot",
        )}
      </div>
    </div>
  );


  const renderSequence = () => (
    <div
      dir="ltr"
      aria-label="سلسلة عددية"
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(4,minmax(0,1fr))",
        gap: 8,
      }}
    >
      {sequence.map(
        (
          value,
          index,
        ) => {
          if (
            value === null
          ) {
            return answerSlot(
              `sequence-slot-${index}`,
            );
          }

          return (
            <div
              key={`sequence-${index}`}
              style={{
                minHeight: 66,
                borderRadius: 16,
                border:
                  "2px solid #D9E5F1",
                background:
                  "#FFFFFF",
                color:
                  "#17365F",
                display: "grid",
                placeItems:
                  "center",
                fontSize:
                  "clamp(26px,7vw,38px)",
                fontWeight: 1000,
                boxShadow:
                  "0 8px 18px rgba(23,54,95,.07)",
              }}
            >
              {value}
            </div>
          );
        },
      )}
    </div>
  );


  function submit(
    option:
      RevealNumberChoiceOptionV2,
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
      === correctValue;

    if (
      correct
    ) {
      /*
       * أولًا نكشف الرقم مكان ؟
       * ثم نرسل النتيجة الصحيحة
       * للمحرك المركزي.
       */
      setSolved(
        true,
      );

      onResult(
        true,
      );

      return;
    }

    /*
     * الإجابة خاطئة:
     * تبقى ؟ كما هي.
     */
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
      {mode
        === "tensGroups"
        ? renderTensGroups()
        : renderSequence()}

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
              === correctValue;

            const selectedWrong =
              selected
              && showResult
              && !correct;

            const selectedCorrect =
              selected
              && solved
              && correct;

            return (
              <button
                key={option.id}
                type="button"
                disabled={
                  locked
                  || solved
                }
                aria-pressed={
                  selected
                }
                onClick={() =>
                  submit(
                    option,
                  )
                }
                style={{
                  minHeight: 68,
                  borderRadius: 18,
                  border:
                    selectedCorrect
                      ? "3px solid #218838"
                      : selectedWrong
                        ? "3px solid #C93636"
                        : "2px solid #D5E0EA",
                  background:
                    selectedCorrect
                      ? "#EAF8EE"
                      : selectedWrong
                        ? "#FFF0F0"
                        : "#FFFFFF",
                  color:
                    selectedCorrect
                      ? "#176B2C"
                      : selectedWrong
                        ? "#A92C2C"
                        : "#17365F",
                  fontSize:
                    "clamp(24px,7vw,34px)",
                  fontWeight: 1000,
                  cursor:
                    locked
                    || solved
                      ? "default"
                      : "pointer",
                  opacity:
                    locked
                    && !selected
                      ? .82
                      : 1,
                  transition:
                    "all .2s ease",
                  boxShadow:
                    "0 7px 16px rgba(23,54,95,.07)",
                }}
              >
                {
                  selectedCorrect
                    ? "✓"
                    : option.label
                }
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}
