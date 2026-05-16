import type { AppTheme } from "../../../types/theme.types";
import type { InputHTMLAttributes } from "react";
import { common } from "../../../theme";

type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
  theme: AppTheme;
};

function AppInput({ theme, style, ...props }: AppInputProps) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: common.radius.small,
        border: `1px solid ${theme.border}`,
        background: theme.surface2,
        color: theme.text,
        fontSize: "16px",
        ...style,
      }}
    />
  );
}

export default AppInput;
