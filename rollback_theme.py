import os

files = {}

# ===== 1. إعادة App.tsx إلى وضعه الطبيعي المستقر بدون الـ Context =====
files["src/App.tsx"] = """import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AiTutorPage from "./pages/AiTutorPage";
import BottomNav from "./shared/components/BottomNav";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-tutor" element={<AiTutorPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}
"""

# ===== 2. إعادة الصفحة الرئيسية (Home.tsx) إلى الألوان الرسمية الثابتة والمستقرة =====
files["src/pages/Home.tsx"] = """import { useNavigate } from "react-router-dom";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "#E8A020", success: "#2E7D5E",
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
"""

# ===== 3. إعادة شريط التنقل السفلي (BottomNav.tsx) إلى وضعه القياسي الثابت =====
files["src/shared/components/BottomNav.tsx"] = """import { Link, useLocation } from "react-router-dom";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  textMuted: "#8A97AA", border: "#D8E2F0", shadow: "0 2px 12px rgba(27,58,107,0.09)"
};

export default function BottomNav() {
  const { pathname } = useLocation();
  const NAV = [
    { to: "/", icon: "🏠", label: "الرئيسية" },
    { to: "/progress", icon: "📊", label: "التقدم" },
    { to: "/ai-tutor", icon: "🤖", label: "المعلم" },
    { to: "/leaderboard", icon: "🏆", label: "الترتيب" },
    { to: "/profile", icon: "👤", label: "حسابي" }
  ];

  return (
    <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 64, background: "white", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", alignItems: "center", borderTop: `1px solid ${C.border}`, boxShadow: C.shadow, zIndex: 100 }}>
      {NAV.map((item) => {
        const active = pathname === item.to;
        return (
          <Link key={item.to} to={item.to} style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 20, filter: active ? "none" : "grayscale(100%)" }}>{item.icon}</span>
            <span style={{ fontSize: 11, color: active ? C.primary : C.textMuted, fontWeight: active ? "bold" : "normal", fontFamily: "'Cairo', sans-serif" }}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
"""

print("⏳ جاري إلغاء ميزات التبديل والعودة للوضعية المستقرة السابقة...")
for path, code in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(code.strip())

# حذف ملف السياق الإضافي لتنظيف المشروع
context_file = "src/context/ThemeContext.tsx"
if os.path.exists(context_file):
    os.remove(context_file)
    print("🧹 تم حذف ملف ThemeContext الزائد بنجاح.")

print("✅ تم استرجاع الوضعية الكلاسيكية الأصلية المستقرة بنجاح!")
