import {
  Icon,
} from "@iconify/react";

import {
  EDUCATION_ICON_DATA,
} from "./educationIconData";

export default function EducationObjectIconV2({
  iconKey,
  size = 72,
}: {
  iconKey?: string;
  size?: number;
}) {
  if (!iconKey) {
    return null;
  }

  const keys =
    iconKey
      .split("+")
      .map(
        value =>
          value.trim()
      )
      .filter(Boolean)
      .slice(0, 2);

  if (!keys.length) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap:
          keys.length > 1
            ? 4
            : 0,
        overflow: "visible",
      }}
    >
      {keys.map(
        key => {
          const data =
            EDUCATION_ICON_DATA[key]
            ?? EDUCATION_ICON_DATA.choice;

          return (
            <Icon
              key={key}
              icon={data}
              width={
                keys.length > 1
                  ? Math.round(
                      size * 0.58
                    )
                  : size
              }
              height={
                keys.length > 1
                  ? Math.round(
                      size * 0.58
                    )
                  : size
              }
              style={{
                display: "block",
                flex: "0 0 auto",
              }}
            />
          );
        }
      )}
    </div>
  );
}
