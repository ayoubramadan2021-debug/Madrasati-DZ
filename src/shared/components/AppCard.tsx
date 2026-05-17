export default function AppCard({ children }: any) {
  return (
    <div
      style={{
        padding: 16,
        margin: 10,
        borderRadius: 12,
        border: "1px solid #ddd",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      {children}
    </div>
  );
}
