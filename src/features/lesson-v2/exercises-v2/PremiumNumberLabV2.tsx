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

import type {
  CSSProperties,
} from "react";


export type PremiumNumberLabModeV2 =
  | "tensUnits"
  | "numberBreakdown"
  | "tensValue"
  | "expanded";


export type PremiumNumberLabDataV2 = {

  mode:
    PremiumNumberLabModeV2;

  tens?:
    number;

  units?:
    number;

  number?:
    number;

  focus?:
    "tens"
    | "units";

};


type Props =
  PremiumNumberLabDataV2
  & {

    locked?:
      boolean;

    showResult?:
      boolean;

  };


function safeDigit(
  value:
    number
    | undefined,
) {

  if (
    typeof value
    !== "number"
  ) {
    return 0;
  }


  if (
    !Number.isFinite(
      value
    )
  ) {
    return 0;
  }


  return Math.max(
    0,
    Math.min(
      9,
      Math.trunc(
        value
      ),
    ),
  );

}


export default function
PremiumNumberLabV2({

  mode,

  tens,

  units,

  number,

  focus,

}: Props) {

  const safeTens =
    safeDigit(
      tens
    );


  const safeUnits =
    safeDigit(
      units
    );


  const safeNumber =

    typeof number
      === "number"

    && Number.isFinite(
      number
    )

      ? Math.max(
          0,
          Math.trunc(
            number
          ),
        )

      : (
          safeTens * 10
          + safeUnits
        );


  const numberTens =
    Math.floor(
      safeNumber
      / 10
    );


  const numberUnits =
    safeNumber
    % 10;


  const shownTens =

    mode
    === "expanded"

      ? numberTens

      : safeTens;


  const shownUnits =

    mode
    === "expanded"

      ? numberUnits

      : safeUnits;


  if (
    mode
    === "numberBreakdown"
  ) {

    return (

      <div
        aria-label="لوحة العشرات والوحدات"
        style={styles.root}
      >

        <div
          style={styles.numberCard}
        >

          <div
            style={styles.bigNumber}
          >
            {safeNumber}
          </div>


          <div
            style={styles.placeRow}
          >

            <div
              style={{
                ...styles.placeCard,

                ...(focus
                  === "tens"

                  ? styles.focused

                  : {}),
              }}
            >

              <strong
                style={styles.placeNumber}
              >
                {numberTens}
              </strong>

              <span>
                عَشَرَات
              </span>

            </div>


            <div
              style={{
                ...styles.placeCard,

                ...(focus
                  === "units"

                  ? styles.focused

                  : {}),
              }}
            >

              <strong
                style={styles.placeNumber}
              >
                {numberUnits}
              </strong>

              <span>
                وَحَدَات
              </span>

            </div>

          </div>

        </div>

      </div>

    );

  }


  return (

    <div
      aria-label="مختبر الأعداد"
      style={styles.root}
    >

      <div
        style={styles.groupCard}
      >

        <div
          style={styles.header}
        >

          <span>
            العَشَرَات
          </span>

          <strong>
            {shownTens}
          </strong>

        </div>


        <div
          style={styles.tensGrid}
        >

          {Array.from({

            length:
              shownTens,

          }).map(
            (
              _,
              index,
            ) => (

              <div
                key={
                  `ten-${index}`
                }
                style={styles.tenRod}
                aria-hidden="true"
              >

                {Array.from({

                  length:
                    10,

                }).map(
                  (
                    __,
                    cell,
                  ) => (

                    <span
                      key={cell}
                      style={styles.tenCell}
                    />

                  ),
                )}

              </div>

            ),
          )}

        </div>

      </div>


      {mode
      !== "tensValue"

        ? (

          <div
            style={styles.groupCard}
          >

            <div
              style={styles.header}
            >

              <span>
                الوَحَدَات
              </span>

              <strong>
                {shownUnits}
              </strong>

            </div>


            <div
              style={styles.unitsGrid}
            >

              {Array.from({

                length:
                  shownUnits,

              }).map(
                (
                  _,
                  index,
                ) => (

                  <span
                    key={
                      `unit-${index}`
                    }
                    style={styles.unit}
                    aria-hidden="true"
                  />

                ),
              )}

            </div>

          </div>

        )

        : null}


      {mode
      === "expanded"

        ? (

          <div
            style={styles.expression}
          >

            <span>
              {numberTens * 10}
            </span>

            <span>
              +
            </span>

            <span>
              {numberUnits}
            </span>

            <span>
              =
            </span>

            <span>
              ؟
            </span>

          </div>

        )

        : null}

    </div>

  );

}


const styles:
Record<
  string,
  CSSProperties
> = {

  root: {

    width:
      "100%",

    display:
      "grid",

    gap:
      12,

  },


  groupCard: {

    padding:
      12,

    borderRadius:
      18,

    border:
      "2px solid #D9E5F1",

    background:
      "rgba(255,255,255,.95)",

    display:
      "grid",

    gap:
      10,

  },


  header: {

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "space-between",

    color:
      "#17365F",

    fontSize:
      17,

    fontWeight:
      900,

  },


  tensGrid: {

    minHeight:
      56,

    display:
      "flex",

    flexWrap:
      "wrap",

    justifyContent:
      "center",

    gap:
      8,

  },


  tenRod: {

    width:
      23,

    padding:
      4,

    borderRadius:
      8,

    display:
      "grid",

    gridTemplateRows:
      "repeat(10,5px)",

    gap:
      1,

    border:
      "2px solid #C48716",

    background:
      "#FFF7E0",

  },


  tenCell: {

    display:
      "block",

    borderRadius:
      2,

    background:
      "#F4C76A",

  },


  unitsGrid: {

    minHeight:
      28,

    display:
      "flex",

    flexWrap:
      "wrap",

    justifyContent:
      "center",

    gap:
      9,

  },


  unit: {

    width:
      22,

    height:
      22,

    borderRadius:
      "50%",

    border:
      "2px solid #31699A",

    background:
      "#DDEEFF",

  },


  numberCard: {

    padding:
      14,

    borderRadius:
      20,

    border:
      "2px solid #D9E5F1",

    background:
      "rgba(255,255,255,.96)",

    display:
      "grid",

    gap:
      14,

  },


  bigNumber: {

    textAlign:
      "center",

    color:
      "#17365F",

    fontWeight:
      1000,

    lineHeight:
      1,

    fontSize:
      "clamp(44px,12vw,72px)",

  },


  placeRow: {

    display:
      "grid",

    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",

    gap:
      10,

  },


  placeCard: {

    padding:
      10,

    borderRadius:
      16,

    border:
      "2px solid #D9E5F1",

    background:
      "#F7FAFC",

    display:
      "grid",

    justifyItems:
      "center",

    gap:
      3,

    color:
      "#52677D",

    fontWeight:
      900,

  },


  focused: {

    borderColor:
      "#E8A020",

    background:
      "#FFF7E0",

  },


  placeNumber: {

    color:
      "#17365F",

    fontSize:
      32,

    fontWeight:
      1000,

  },


  expression: {

    direction:
      "ltr",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    flexWrap:
      "wrap",

    gap:
      12,

    padding:
      14,

    borderRadius:
      18,

    border:
      "2px solid #D9E5F1",

    background:
      "#F7FAFC",

    color:
      "#17365F",

    fontSize:
      "clamp(28px,8vw,42px)",

    fontWeight:
      1000,

  },

};
