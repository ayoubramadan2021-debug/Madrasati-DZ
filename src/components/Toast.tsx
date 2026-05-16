import type { AppTheme } from "../types/theme.types";

type ToastProps = {
  message?: string;
  theme: AppTheme;
};

function Toast({ message, theme }: ToastProps) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "18px",
        left: "18px",
        right: "18px",
        zIndex: 9999,
        background: theme.surface,
        color: theme.text,
        border: `1px solid ${theme.border}`,
        padding: "14px",
        borderRadius: "16px",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
