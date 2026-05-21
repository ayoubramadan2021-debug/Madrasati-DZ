import os

files = {}

# ===== 1. إنشاء سياق الثيمات المشترك (ThemeContext.tsx) =====
os.makedirs("src/context", exist_ok=True)
files["src/context/ThemeContext.tsx"] = """import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  C: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  // ثيم الشفق القطبي المشرق المبهر
  const lightTheme = {
    isDark: false,
    bg: "linear-gradient(180deg, #F4F7FC 0%, #E3EDF7 100%)",
    card: "rgba(255, 255, 255, 0.9)",
    navBg: "rgba(255, 255, 255, 0.75)",
    text: "#1F4287",
    textMuted: "#7A8B9E",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    shadow: "0 10px 25px rgba(31, 66, 135, 0.04)",
    headerBg: "rgba(255, 255, 255, 0.85)",
    headerBorder: "1px solid rgba(255, 255, 255, 0.7)",
    headerText: "linear-gradient(135deg, #1B3A6B 0%, #0984E3 100%)",
    goldStar: "#FFA500"
  };

  // ثيم الظلام السينمائي الفاخر
  const darkTheme = {
    isDark: true,
    bg: "#0B0F19",
    card: "linear-gradient(135deg, #1C2640 0%, #151D30 100%)",
    navBg: "rgba(21, 29, 48, 0.85)",
    text: "#FFFFFF",
    textMuted: "#8A9CB6",
    border: "1px solid rgba(255, 215, 0, 0.15)",
    shadow: "0 10px 25px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)",
    headerBg: "linear-gradient(135deg, #151D30 0%, #0F1626 100%)",
    headerBorder: "1px solid rgba(255, 215, 0, 0.2)",
    headerText: "linear-gradient(120deg, #FFFFFF 30%, #FFD700 100%)",
    goldStar: "#FFD700"
  };

  const C = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, C }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useAppTheme must be used within a ThemeProvider");
  return context;
};
"""

# ===== 2. تحديث المكون الرئيسي (main.tsx أو App.tsx) لتغليفه بالثيم المطور =====
# سنقوم بتعديل App.tsx ليدعم سياق الثيم الزر العائم
files["src/App.tsx"] = """import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useAppTheme } from "./context/ThemeContext";
import Home from "./pages/Home";
import AiTutorPage from "./pages/AiTutorPage";
import BottomNav from "./shared/components/BottomNav";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useAppTheme();
  return (
    <button 
      onClick={toggleTheme} 
      style={{
        position: "fixed", top: 20, left: 20, zIndex: 110,
        width: 50, height: 50, borderRadius: "50%",
        background: theme === "light" ? "#151D30" : "#FFFFFF",
        color: theme === "light" ? "#FFD700" : "#1B3A6B",
        border: theme === "light" ? "2px solid #FFD700" : "2px solid #1B3A6B",
        fontSize: 24, cursor: "pointer", display: "grid", placeItems: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      }}
      title="تبديل المظهر السحري"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

function AppContent() {
  return (
    <Router>
      <ThemeToggleButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-tutor" element={<AiTutorPage />} />
        {/* باقي المسارات ستحاكي نفس الهيكل تلقائياً */}
        <Route path="*" element={<Home />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
"""

# ===== 3. إعادة صياغة الصفحة الرئيسية الذكية (Home.tsx) لتتغير لحظياً حسب الثيم المختار =====
files["src/pages/Home.tsx"] = """import { useNavigate } from "react-router-dom";
import { useAppTheme } from "../context/ThemeContext";

export default function Home() {
  const navigate = useNavigate();
  const { C, theme } = useAppTheme();

  const menuItems = [
    { to: "/ai-tutor", icon: "🤖", label: "المعلم الخارق ديزاد", desc: "رفيق ذكي يتحدث معك ويفهم أحلامك", tag: "ذكاء فضائي" },
    { to: "/leaderboard", icon: "👑", label: "أبطال لوحة الصدارة", desc: "اكتشف ترتيبك بين عباقرة الجزائر", tag: "مجلس الذهب" },
  ];

  const grades = [
    { id: "1", label: "السنة الأولى ابتدائي", desc: "رحلة الحروف والأرقام السحرية", icon: "🌱", grad: "linear-gradient(135deg, #55E6C1, #58B19F)" },
    { id: "2", label: "السنة الثانية ابتدائي", desc: "مغامرة القراءة والجمع الذكي", icon: "⚡", grad: "linear-gradient(135deg, #74B9FF, #0984E3)" },
    { id: "3", label: "السنة الثالثة ابتدائي", desc: "استكشاف اللغات والعلوم الممتعة", icon: "🚀", grad: "linear-gradient(135deg, #A29BFE, #6C5CE7)" },
    { id: "4", label: "السنة الرابعة ابتدائي", desc: "تحديات العباقرة وحل الألغاز", icon: "🔮", grad: "linear-gradient(135deg, #FF8ED4, #E056FD)" },
    { id: "5", label: "السنة الخامسة ابتدائي", desc: "طريق التميز وتاج البطولة", icon: "👑", grad: "linear-gradient(135deg, #FFEAA7, #FDCB6E)" },
  ];

  return (
    <div style={{ 
      fontFamily: "'Cairo', sans-serif", 
      background: C.bg, 
      minHeight: "100vh", padding: "80px 18px 110px 18px", direction: "rtl", color: C.text,
      transition: "all 0.5s ease"
    }}>
      
      {/* الهيدر السحابي/السينمائي الفاخر المتغير ديناميكياً */}
      <div style={{ 
        background: C.headerBg, 
        backdropFilter: "blur(20px)",
        borderRadius: 32, padding: "28px 20px", textAlign: "center", marginBottom: 26,
        border: C.headerBorder,
        boxShadow: C.shadow,
        transition: "all 0.5s ease"
      }}>
        <div style={{ fontSize: 56, marginBottom: 8, filter: "drop-shadow(0 8px 16px rgba(254,202,87,0.4))" }}>✨</div>
        <h1 style={{ 
          margin: 0, fontSize: 30, fontWeight: 900, 
          background: C.headerText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>تطبيق تَعْلِيمْ دِيزَادْ</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: C.textMuted, fontWeight: 700 }}>
          {C.isDark ? "المنصة الجزائرية الفاخرة للأبطال الصغار" : "عالم ناصع البياض ملؤه الألعاب والمكافآت والذهب"}
        </p>
      </div>

      {/* بطاقات الخدمات التفاعلية */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 30 }}>
        {menuItems.map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.to)} style={{ 
            background: C.card, 
            borderRadius: 24, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", 
            boxShadow: C.shadow, 
            border: C.border, cursor: "pointer",
            transition: "all 0.4s ease"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ 
                width: 52, height: 52, borderRadius: 20, 
                background: C.isDark ? "rgba(255,215,0,0.1)" : "linear-gradient(135deg, #6C5CE7, #A29BFE)", 
                display:"grid", placeItems:"center", fontSize:26, 
                border: C.isDark ? "1px solid rgba(255,215,0,0.25)" : "none",
                boxShadow: C.isDark ? "none" : "0 8px 20px rgba(108, 92, 231, 0.2)"
              }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 900, color: C.text, fontSize: 16, display:"flex", alignItems:"center", gap:8 }}>
                  {item.label}
                  <span style={{ fontSize:10, background: C.isDark ? "linear-gradient(90deg, #FFD700, #B8860B)" : "rgba(255, 165, 0, 0.15)", color: C.isDark ? "#0B0F19" : "#FFA500", padding:"2px 8px", borderRadius:8, fontWeight:800 }}>{item.tag}</span>
                </div>
                <div style={{ color: C.textMuted, fontSize: 12, marginTop: 3, fontWeight: 600 }}>{item.desc}</div>
              </div>
            </div>
            <span style={{ color: C.goldStar, fontWeight: "900", fontSize: 18 }}>⭐</span>
          </div>
        ))}
      </div>

      {/* السنوات الدراسية */}
      <h3 style={{ fontSize: 18, fontWeight: 900, color: C.text, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 6, height: 20, background: "linear-gradient(#6C5CE7, #55E6C1)", borderRadius: 3 }} />
        خريطة المغامرة الدراسية
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {grades.map((g) => (
          <div key={g.id} onClick={() => navigate(`/grade/${g.id}`)} style={{ 
            background: C.card, 
            borderRadius: 24, padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", 
            boxShadow: C.shadow, 
            border: C.border, cursor: "pointer",
            transition: "all 0.4s ease"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ 
                width: 48, height: 48, borderRadius: "50%", 
                background: g.grad, 
                color: "white", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 18,
                boxShadow: "0 6px 15px rgba(0,0,0,0.06)"
              }}>{g.id}</div>
              <div>
                <span style={{ fontWeight: 900, color: C.text, fontSize: 16 }}>{g.label}</span>
                <span style={{ display: "block", fontSize: 12, color: C.textMuted, marginTop: 2, fontWeight: 600 }}>{g.desc}</span>
              </div>
            </div>
            <span style={{ fontSize: 20 }}>{g.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
"""

# ===== 4. ترقية شريط التنقل السفلي (BottomNav.tsx) ليعمل بمرونة مع الثيم المختار =====
files["src/shared/components/BottomNav.tsx"] = """import { Link, useLocation } from "react-router-dom";
import { useAppTheme } from "../../context/ThemeContext";

export default function BottomNav() {
  const { pathname } = useLocation();
  const { C } = useAppTheme();
  
  const NAV = [
    { to:"/",            icon:"🏠", label:"الرئيسية" },
    { to:"/progress",    icon:"📊", label:"التقدم"   },
    { to:"/ai-tutor",    icon:"🤖", label:"المعلم"   },
    { to:"/grade/1",     icon:"📖", label:"الدروس"   },
    { to:"/profile",     icon:"👤", label:"حسابي"    },
  ];

  return (
    <nav style={{ 
      position:"fixed", bottom:20, left:20, right:20, zIndex:100, 
      height:76, background: C.navBg, 
      backdropFilter:"blur(30px)", borderRadius:28,
      border: C.border, 
      display:"grid", gridTemplateColumns:"repeat(5,1fr)", alignItems:"center", padding:"0 8px",
      boxShadow: C.shadow,
      transition: "all 0.5s ease"
    }}>
      {NAV.map(item => {
        const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
        return (
          <Link key={item.to} to={item.to} style={{ textDecoration:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{ 
              width:48, height:48, borderRadius:18, 
              background: active ? "linear-gradient(135deg, #FFDF00, #FFA500)" : "transparent", 
              display:"grid", placeItems:"center", fontSize:22,
              transform: active ? "scale(1.12) translateY(-10px)" : "scale(1)",
              boxShadow: active ? "0 12px 24px rgba(255, 165, 0, 0.35)" : "none",
              transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}>
              <span>{item.icon}</span>
            </div>
            <span style={{ 
              fontSize:10, 
              color: active ? (C.isDark ? "#FFD700" : "#1F4287") : C.textMuted, 
              fontWeight: active ? 900 : 600, 
              fontFamily:"'Cairo',sans-serif",
              opacity: active ? 1 : 0.75,
              transition: "all 0.3s"
            }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
"""

print("⏳ جاري صياغة وتركيب مفتاح التبديل السحري بين الثيمين...")
for path, code in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(code.strip())
print("🎉 مذهل! تم حقن زر التبديل والـ Context السحري بنجاح!")
