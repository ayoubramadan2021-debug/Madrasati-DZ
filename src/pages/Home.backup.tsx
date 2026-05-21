import { useNavigate } from "react-router-dom";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "var(--gold)", success: "#2E7D5E",
  surface: "#FFFFFF", surface2: "#F7F9FC",
  text: "#1A2540", textMuted: "#8A97AA",
  border: "#D8E2F0", shadow: "0 2px 12px rgba(27,58,107,0.09)",
};

export default function Home() {
  const navigate = useNavigate();
  const menuItems = [
    { to: "/ai-tutor", icon: "🤖", label: "المعلم الذكي ديزاد", color: C.primaryLight },
    { to: "/leaderboard", icon: "🏆", label: "لوحة الصدارة والترتيب", color: C.accent },
  ];

  const grades = [
    { id: "1", label: "السنة الأولى ابتدائي" },
    { id: "2", label: "السنة الثانية ابتدائي" },
    { id: "3", label: "السنة الثالثة ابتدائي" },
    { id: "4", label: "السنة الرابعة ابتدائي" },
    { id: "5", label: "السنة الخامسة ابتدائي" },
  ];

  return (
    <div style={{ fontFamily: "'Cairo', sans-serif", background: C.surface2, minHeight: "100vh", padding: "16px 16px 90px", direction: "rtl" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {menuItems.map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.to)} style={{ background: C.surface, borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: C.shadow, border: `1px solid ${C.border}`, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <span style={{ fontWeight: 700, color: C.text }}>{item.label}</span>
            </div>
            <span style={{ color: item.color, fontWeight: "bold" }}>←</span>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 800, color: C.primary, marginBottom: 14, borderRight: `4px solid ${C.accent}`, paddingRight: 8 }}>السنوات الدراسية (الطور الابتدائي)</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {grades.map((g) => (
          <div key={g.id} onClick={() => navigate(`/grade/${g.id}`)} style={{ background: C.surface, borderRadius: 16, padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: C.shadow, border: `1px solid ${C.border}`, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.primary, color: C.surface, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 16 }}>{g.id}</div>
              <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{g.label}</span>
            </div>
            <span style={{ color: C.textMuted }}>←</span>
          </div>
        ))}
      </div>
    </div>
  );
}