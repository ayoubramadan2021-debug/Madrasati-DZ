export default function App() {
  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="card">
        <h1
          style={{
            color: "var(--primary)",
            marginBottom: "10px",
          }}
        >
          تعليم DZ
        </h1>

        <p style={{ color: "var(--muted)" }}>
          اختبار الهوية البصرية الجديدة
        </p>

        <button className="btn">
          ابدأ التعلم
        </button>
      </div>
    </div>
  );
}
