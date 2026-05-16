import type { AppTheme } from "../../../types/theme.types";
import type { SelectHTMLAttributes, ReactNode } from "react";
import { common } from "../../../theme";

type AppSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  theme: AppTheme;
  children: ReactNode;
};

function AppSelect({ theme, children, style, ...props }: AppSelectProps) {
  return (
    <select
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
    >
      {children}
    </select>
  );
}

export default AppSelect;
