function MathGrade1() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
        direction: "rtl",
      }}
    >
      <h1 style={{ textAlign: "center" }}>📖 رياضيات السنة الأولى</h1>

      <p style={{ textAlign: "center" }}>
        الفصل الأول - دروس وتمارين
      </p>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "18px",
          marginTop: "25px",
        }}
      >
        <h2>🔢 الدرس 1: الأعداد من 0 إلى 9</h2>
        <p>يتعلم التلميذ قراءة وكتابة وتمييز الأعداد من 0 إلى 9.</p>

        <button
          style={{
            padding: "14px 25px",
            borderRadius: "12px",
            border: "none",
            background: "#22c55e",
            color: "white",
            fontSize: "17px",
          }}
        >
          ابدأ الدرس
        </button>
      </div>
    </div>
  );
}

export default MathGrade1;
