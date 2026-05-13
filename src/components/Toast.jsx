function Toast({ message, theme }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        left: "16px",
        right: "16px",
        zIndex: 999,
        background: theme.surface2,
        color: theme.text,
        border: `1px solid ${theme.border}`,
        borderRadius: "18px",
        padding: "14px 16px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
        textAlign: "center",
        fontWeight: "bold",
        lineHeight: "1.7",
        direction: "rtl",
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
