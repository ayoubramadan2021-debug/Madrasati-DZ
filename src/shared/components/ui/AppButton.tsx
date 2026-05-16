import type { AppTheme } from "../../../types/theme.types";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { common } from "../../../theme";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme: AppTheme;
  children: ReactNode;
  active?: boolean;
  fullWidth?: boolean;
};

function AppButton({
  theme,
  children,
  active = true,
  fullWidth = true,
  style,
  ...props
}: AppButtonProps) {
  return (
    <button
      {...props}
      style={{
        width: fullWidth ? "100%" : "auto",
        marginTop: "14px",
        padding: "16px",
        border: "none",
        borderRadius: common.radius.medium,
        background: active
          ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
          : theme.surface2,
        color: "white",
        fontSize: "20px",
        fontWeight: "bold",
        opacity: active ? 1 : 0.5,
        cursor: active ? "pointer" : "not-allowed",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default AppButton;
