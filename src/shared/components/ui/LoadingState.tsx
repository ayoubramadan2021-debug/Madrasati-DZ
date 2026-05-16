import type { AppTheme } from "../../../types/theme.types";
import AppCard from "./AppCard";

type LoadingStateProps = {
  theme: AppTheme;
  message?: string;
};

function LoadingState({ theme, message = "جاري التحميل..." }: LoadingStateProps) {
  return (
    <AppCard theme={theme}>
      <p style={{ color: theme.text, textAlign: "center", fontSize: "18px" }}>
        ⏳ {message}
      </p>
    </AppCard>
  );
}

export default LoadingState;
