function __revealPromptValue(
  rawPrompt: string,
  selected: any
): string {
  if (!selected) return rawPrompt;
  const isCorrect =
    selected?.isCorrect === true ||
    selected?.correct === true ||
    selected?.status === "correct";

  if (!isCorrect) return rawPrompt;

  const value =
    selected?.value ??
    selected?.label ??
    selected?.text ??
    selected?.title ??
    "";

  const answer = String(value).trim();
  if (!answer) return rawPrompt;

  return String(rawPrompt)
    .replace("؟", answer)
    .replace("?", answer);
}

function __premiumHash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

function __shufflePremiumChoices<T extends Record<string, any>>(
  question: any,
  raw: T[] | undefined | null
): T[] {
  const arr = Array.isArray(raw) ? [...raw] : [];
  const seed = String(
    question?.id ??
    question?.audioKey ??
    question?.key ??
    question?.prompt ??
    "premium"
  );
  let h = __premiumHash(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (i + 11), 1103515245) + 12345;
    const j = Math.abs(h) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

import {
  useEffect,
  useRef,
  useState,
} from "react";


export type SmallNumberOperationModeV2 =
  | "add"
  | "subtract";


export type SmallNumberOperationChoiceV2 = {
  id: string;
  label: string;
  value: number;
};


export type SmallNumberOperationDataV2 = {
  mode:
    SmallNumberOperationModeV2;

  left: number;

  right: number;

  correctValue: number;

  choices:
    SmallNumberOperationChoiceV2[];
};


export type SmallNumberOperationLabV2Props =
  SmallNumberOperationDataV2 & {
    locked: boolean;

    showResult: boolean;

    onResult:
      (correct: boolean) => void;
  };


export default function SmallNumberOperationLabV2({
  mode,
  left,
  right,
  correctValue,
  choices,
  locked,
  showResult,
  onResult,
}: SmallNumberOperationLabV2Props) {

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


  /*
   * بعد انتهاء feedback الخاطئ
   * يرجع السؤال لحالة المحاولة.
   * الناتج يبقى ؟.
   */
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


  const operator =
    mode === "add"
      ? "+"
      : "−";


  const answerSlot = (
    <div
      aria-label={
        solved
          ? `الناتج الصحيح ${correctValue}`
          : "مكان الناتج"
      }
      style={{
        position: "relative",
        minWidth: 74,
        minHeight: 64,
        borderRadius: 17,
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
        transition:
          "all .28s ease",
        boxShadow:
          solved
            ? "0 8px 18px rgba(23,54,95,.20)"
            : "none",
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
              ? "scale(.6)"
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
            "all .28s ease",
        }}
      >
        {correctValue}
      </strong>
    </div>
  );


  const dot = (
    key: string,
    removed = false,
  ) => (
    <span
      key={key}
      aria-hidden="true"
      style={{
        position: "relative",
        width: 24,
        height: 24,
        borderRadius: "50%",
        background:
          removed
            ? "#F3C8C8"
            : "#9BC7EE",
        border:
          removed
            ? "2px solid #C95353"
            : "2px solid #397CB4",
        opacity:
          removed
            ? .65
            : 1,
      }}
    >
      {removed
        ? (
            <span
              style={{
                position: "absolute",
                left: 1,
                right: 1,
                top: 9,
                height: 3,
                borderRadius: 4,
                background:
                  "#B43A3A",
                transform:
                  "rotate(-35deg)",
              }}
            />
          )
        : null}
    </span>
  );


  const renderAddition = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "minmax(0,1fr) auto minmax(0,1fr)",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          minHeight: 90,
          padding: 10,
          borderRadius: 17,
          background: "#EDF7FF",
          border:
            "2px solid #AED2EF",
          display: "flex",
          flexWrap: "wrap",
          justifyContent:
            "center",
          alignContent: "center",
          gap: 5,
        }}
      >
        {Array.from({
          length: left,
        }).map(
          (_, index) =>
            dot(
              `left-${index}`,
            ),
        )}
      </div>

      <strong
        aria-hidden="true"
        style={{
          color: "#C48716",
          fontSize:
            "clamp(28px,8vw,42px)",
        }}
      >
        +
      </strong>

      <div
        style={{
          minHeight: 90,
          padding: 10,
          borderRadius: 17,
          background: "#FFF7E7",
          border:
            "2px solid #E9CB82",
          display: "flex",
          flexWrap: "wrap",
          justifyContent:
            "center",
          alignContent: "center",
          gap: 5,
        }}
      >
        {Array.from({
          length: right,
        }).map(
          (_, index) =>
            dot(
              `right-${index}`,
            ),
        )}
      </div>
    </div>
  );


  const renderSubtraction = () => {
    const remaining =
      Math.max(
        0,
        left - right,
      );

    return (
      <div
        style={{
          minHeight: 100,
          padding: 12,
          borderRadius: 18,
          background: "#F4F9FF",
          border:
            "2px solid #B8D8EF",
          display: "flex",
          flexWrap: "wrap",
          justifyContent:
            "center",
          alignContent: "center",
          gap: 6,
        }}
      >
        {Array.from({
          length: left,
        }).map(
          (_, index) =>
            dot(
              `subtract-${index}`,
              index >= remaining,
            ),
        )}
      </div>
    );
  };


  function submit(
    option:
      SmallNumberOperationChoiceV2,
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
       * اكشف الناتج أولًا.
       */
      setSolved(
        true,
      );

      /*
       * ثم أرسل النتيجة
       * للمحرك الموحد.
       */
      onResult(
        true,
      );

      return;
    }

    /*
     * الخطأ لا يكشف الناتج.
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
      <div
        style={{
          display: "grid",
          gap: 12,
          padding: 12,
          borderRadius: 21,
          background:
            "linear-gradient(180deg,#F8FBFF,#FFFFFF)",
          border:
            "2px solid #D8E5F0",
        }}
      >
        {mode === "add"
          ? renderAddition()
          : renderSubtraction()}

        <div
          dir="ltr"
          style={{
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <strong
            style={{
              color: "#17365F",
              fontSize:
                "clamp(29px,8vw,42px)",
            }}
          >
            {left}
          </strong>

          <strong
            style={{
              color: "#C48716",
              fontSize:
                "clamp(29px,8vw,42px)",
            }}
          >
            {operator}
          </strong>

          <strong
            style={{
              color: "#17365F",
              fontSize:
                "clamp(29px,8vw,42px)",
            }}
          >
            {right}
          </strong>

          <strong
            style={{
              color: "#52606D",
              fontSize:
                "clamp(27px,8vw,38px)",
            }}
          >
            =
          </strong>

          {answerSlot}
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
              === correctValue;

            const selectedCorrect =
              selected
              && solved
              && correct;

            const selectedWrong =
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
