import type { AppTheme } from "../../../types/theme.types";
import AppCard from "./AppCard";

type ErrorStateProps = {
  theme: AppTheme;
  title?: string;
  message?: string;
};

function ErrorState({
  theme,
  title = "حدث خطأ",
  message = "تعذر تحميل البيانات",
}: ErrorStateProps) {
  return (
    <AppCard theme={theme}>
      <h2 style={{ color: theme.text }}>⚠️ {title}</h2>
      <p style={{ color: theme.muted }}>{message}</p>
    </AppCard>
  );
}

export default ErrorState;
