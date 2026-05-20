import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const C = {
  primary: "#1B3A6B",
  primaryLight: "#2D5BA3",
  accent: "#E8A020",
  surface: "#FFFFFF",
  surface2: "#F7F9FC",
  text: "#1A2540",
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.surface2,
        fontFamily: "'Cairo',sans-serif",
        paddingBottom: 90,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg,${C.primary},${C.primaryLight})`,
          padding: "28px 20px 40px",
          borderRadius: "0 0 28px 28px",
          color: "white",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 58 }}>🎓</div>

        <h1 style={{ margin: "8px 0" }}>
          تعليم DZ
        </h1>

        <div style={{ opacity: 0.8 }}>
          منصة التعليم الذكي الجزائرية
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <button
          onClick={() => navigate("/grade/1")}
          style={{
            width: "100%",
            padding: 18,
            border: "none",
            borderRadius: 18,
            background: C.primary,
            color: "white",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          ابدأ التعلم
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
