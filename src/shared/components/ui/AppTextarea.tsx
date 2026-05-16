import type { AppTheme } from "../../../types/theme.types";
import type { TextareaHTMLAttributes } from "react";
import { common } from "../../../theme";

type AppTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  theme: AppTheme;
};

function AppTextarea({ theme, style, ...props }: AppTextareaProps) {
  return (
    <textarea
      {...props}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: common.radius.small,
        border: `1px solid ${theme.border}`,
        background: theme.surface2,
        color: theme.text,
        fontSize: "16px",
        lineHeight: "1.8",
        ...style,
      }}
    />
  );
}

export default AppTextarea;
