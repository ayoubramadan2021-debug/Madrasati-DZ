export default function ProgressBar({ value }: any) {
  return (
    <div style={{ width: "100%", background: "#e5e7eb", borderRadius: 8 }}>
      <div
        style={{
          width: `${value}%`,
          height: 8,
          background: "#2563eb",
          borderRadius: 8,
        }}
      />
    </div>
  );
}
