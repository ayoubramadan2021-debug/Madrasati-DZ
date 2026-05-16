import type { AppTheme } from "../../../types/theme.types";
import AppCard from "./AppCard";

type EmptyStateProps = {
  theme: AppTheme;
  title?: string;
  message?: string;
};

function EmptyState({
  theme,
  title = "لا توجد بيانات",
  message = "لا يوجد محتوى لعرضه حالياً",
}: EmptyStateProps) {
  return (
    <AppCard theme={theme}>
      <h2 style={{ color: theme.text }}>📭 {title}</h2>
      <p style={{ color: theme.muted }}>{message}</p>
    </AppCard>
  );
}

export default EmptyState;
