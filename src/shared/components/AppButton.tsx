export default function AppButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        marginTop: 8,
        borderRadius: 8,
        border: "none",
        backgroundColor: "#2563eb",
        color: "white",
        fontWeight: "bold",
        width: "100%",
      }}
    >
      {children}
    </button>
  );
}
