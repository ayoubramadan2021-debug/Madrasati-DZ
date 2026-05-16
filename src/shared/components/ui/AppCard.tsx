import type { AppTheme } from "../../../types/theme.types";
import type { HTMLAttributes, ReactNode } from "react";
import { common } from "../../../theme";

type AppCardProps = HTMLAttributes<HTMLDivElement> & {
  theme: AppTheme;
  children: ReactNode;
};

function AppCard({ theme, children, style, ...props }: AppCardProps) {
  return (
    <div
      {...props}
      style={{
        marginTop: "18px",
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        padding: "22px",
        borderRadius: common.radius.medium,
        boxShadow: common.shadow.card,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default AppCard;
