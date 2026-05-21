import os

files = {}

# ===== 1. شريط تصفح سفلي زجاجي يطفو بنعومة فائقة (BottomNav.tsx) =====
files["src/shared/components/BottomNav.tsx"] = """import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const { pathname } = useLocation();
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
      height:76, background:"rgba(255, 255, 255, 0.75)", 
      backdropFilter:"blur(30px)", borderRadius:28,
      border:"1px solid rgba(255, 255, 255, 0.6)", 
      display:"grid", gridTemplateColumns:"repeat(5,1fr)", alignItems:"center", padding:"0 8px",
      boxShadow: "0 10px 35px rgba(31, 66, 135, 0.08), inset 0 2px 4px rgba(255,255,255,1)"
    }}>
      {NAV.map(item => {
        const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
        return (
          <Link key={item.to} to={item.to} style={{ textDecoration:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:4, position:"relative" }}>
            <div style={{ 
              width:48, height:48, borderRadius:18, 
              background: active ? "linear-gradient(135deg, #FFDF00, #FFA500)" : "transparent", 
              display:"grid", placeItems:"center", fontSize:22,
              transform: active ? "scale(1.12) translateY(-10px)" : "scale(1)",
              boxShadow: active ? "0 12px 24px rgba(255, 165, 0, 0.35)" : "none",
              transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}>
              <span style={{ filter: active ? "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" : "none" }}>{item.icon}</span>
            </div>
            <span style={{ 
              fontSize:10, 
              color: active ? "#1F4287" : "#7A8B9E", 
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

# ===== 2. الواجهة الرئيسية اللؤلؤية المستقبلية المشرقة (Home.tsx) =====
files["src/pages/Home.tsx"] = """import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/ai-tutor", icon: "🤖", label: "المعلم الخارق ديزاد", desc: "رفيق ذكي يتحدث معك ويفهم أحلامك", c1: "#6C5CE7", c2: "#A29BFE", tag: "ذكاء فضائي" },
    { to: "/leaderboard", icon: "👑", label: "أبطال لوحة الصدارة", desc: "اكتشف ترتيبك بين عباقرة الجزائر", c1: "#FA8231", c2: "#FFB142", tag: "مجلس الذهب" },
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
      background: "linear-gradient(180deg, #F4F7FC 0%, #E3EDF7 100%)", 
      minHeight: "100vh", padding: "24px 18px 110px", direction: "rtl", color: "#2C3E50",
      position: "relative", overflow: "hidden"
    }}>
      
      {/* هالات ضوئية ناعمة ذائبة في الخلفية (Aurora Glow Fluid) */}
      <div style={{ position: "absolute", top: "-10%", left: "-20%", width: 300, height: 300, background: "rgba(108, 92, 231, 0.15)", borderRadius: "50%", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", top: "30%", right: "-30%", width: 350, height: 350, background: "rgba(85, 230, 193, 0.2)", borderRadius: "50%", filter: "blur(80px)" }} />

      {/* الهيدر السحابي الفاخر بظلال ثلاثية الأبعاد ناعمة */}
      <div style={{ 
        background: "rgba(255, 255, 255, 0.85)", 
        backdropFilter: "blur(20px)",
        borderRadius: 32, padding: "28px 20px", textAlign: "center", marginBottom: 26,
        border: "1px solid rgba(255, 255, 255, 0.7)",
        boxShadow: "0 20px 40px rgba(31, 66, 135, 0.05), inset 0 2px 4px rgba(255,255,255,1)"
      }}>
        <div style={{ fontSize: 56, marginBottom: 8, filter: "drop-shadow(0 8px 16px rgba(254,202,87,0.5))" }}>✨</div>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 900, background: "linear-gradient(135deg, #1B3A6B 0%, #0984E3 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.5px" }}>تطبيق تَعْلِيمْ دِيزَادْ</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#7A8B9E", fontWeight: 700 }}>عالم ناصع البياض ملؤه الألعاب والمكافآت والذهب</p>
      </div>

      {/* بطاقات الخدمات التفاعلية الكبرى */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 30 }}>
        {menuItems.map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.to)} style={{ 
            background: "rgba(255, 255, 255, 0.9)", 
            borderRadius: 24, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", 
            boxShadow: "0 12px 30px rgba(162, 155, 254, 0.08)", 
            border: "1px solid rgba(255, 255, 255, 0.9)", cursor: "pointer",
            position: "relative"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ 
                width: 52, height: 52, borderRadius: 20, 
                background: `linear-gradient(135deg, ${item.c1}, ${item.c2})`, 
                display:"grid", placeItems:"center", fontSize:26, 
                boxShadow: `0 8px 20px rgba(108, 92, 231, 0.2)`
              }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 900, color: "#1B3A6B", fontSize: 16, display:"flex", alignItems:"center", gap:8 }}>
                  {item.label}
                  <span style={{ fontSize:10, background:"rgba(255, 165, 0, 0.15)", color:"#FFA500", padding:"2px 8px", borderRadius:8, fontWeight:800 }}>{item.tag}</span>
                </div>
                <div style={{ color: "#7A8B9E", fontSize: 12, marginTop: 3, fontWeight: 600 }}>{item.desc}</div>
              </div>
            </div>
            <span style={{ color: "#FFA500", fontWeight: "900", fontSize: 18 }}>⭐</span>
          </div>
        ))}
      </div>

      {/* قائمة أطوار المدرسة الجزائية بتصميم لؤلؤي متناسق */}
      <h3 style={{ fontSize: 18, fontWeight: 900, color: "#1B3A6B", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 6, height: 20, background: "linear-gradient(#6C5CE7, #55E6C1)", borderRadius: 3 }} />
        خريطة المغامرة الدراسية
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {grades.map((g) => (
          <div key={g.id} onClick={() => navigate(`/grade/${g.id}`)} style={{ 
            background: "rgba(255, 255, 255, 0.9)", 
            borderRadius: 24, padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", 
            boxShadow: "0 10px 25px rgba(31, 66, 135, 0.04)", 
            border: "1px solid rgba(255, 255, 255, 0.8)", cursor: "pointer",
            transition: "all 0.3s"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ 
                width: 48, height: 48, borderRadius: "50%", 
                background: g.grad, 
                color: "white", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 18,
                boxShadow: "0 6px 15px rgba(0,0,0,0.06)"
              }}>{g.id}</div>
              <div>
                <span style={{尊fontWeight: 900, color: "#1B3A6B", fontSize: 16 }}>{g.label}</span>
                <span style={{ display: "block", fontSize: 12, color: "#7A8B9E", marginTop: 2, fontWeight: 600 }}>{g.desc}</span>
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

# ===== 3. واجهة رفيق الذكاء الاصطناعي اللؤلؤية السماوية البراقة (AiTutorPage.tsx) =====
files["src/pages/AiTutorPage.tsx"] = """import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AiTutorPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { role: "assistant", text: "أهلاً بك يا بطل الجزائر الصغير! 🌟 أنا رفيقك الذكي الجديد. اسألني عن أي تمرين أو فكرة غامضة في الرياضيات أو اللغات وسأبسطها لك بلمح البصر!" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", text: `يا لك من ذكي! سؤالك المتميز حول "${userMsg}" نقوم بتحليله بأحدث تقنيات الفضاء لنمنحك الجواب الشافي والممتع!` }]);
    }, 800);
  };

  return (
    <div style={{ 
      fontFamily: "'Cairo', sans-serif", 
      background: "linear-gradient(180deg, #F4F7FC 0%, #E3EDF7 100%)", 
      minHeight: "100vh", direction: "rtl", paddingBottom: 110, display: "flex", flexDirection: "column", color: "#2C3E50" 
    }}>
      
      {/* الهيدر المتوهج السحابي */}
      <div style={{ 
        background: "rgba(255, 255, 255, 0.8)", 
        backdropFilter: "blur(20px)",
        padding: "20px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 4px 25px rgba(31,66,135,0.04)",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <button onClick={() => navigate("/")} style={{ padding: "6px 14px", background: "white", color: "#6C5CE7", border: "1px solid rgba(108,92,231,0.2)", borderRadius: 12, fontFamily:"Cairo", fontWeight:800, boxShadow:"0 4px 10px rgba(0,0,0,0.02)" }}>الرئيسية</button>
        <div style={{ textAlign: "center", flex: 1, marginRight: -40 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#1B3A6B" }}>🤖 رفيق المعرفة الفضائي</h2>
          <span style={{ fontSize: 11, color: "#6C5CE7", fontWeight: 800 }}>تكنولوجيا تعليم المذهلة الفاخرة</span>
        </div>
      </div>

      {/* نافذة الرسائل السحرية */}
      <div style={{ flex: 1, padding: "24px 16px", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
            alignSelf: m.role === "user" ? "flex-start" : "flex-end", 
            background: m.role === "user" ? "linear-gradient(135deg, #6C5CE7, #8172FF)" : "white", 
            color: m.role === "user" ? "white" : "#2C3E50", 
            padding: "14px 18px", 
            borderRadius: m.role === "user" ? "22px 22px 22px 4px" : "22px 22px 4px 22px", 
            maxWidth: "85%", 
            boxShadow: "0 10px 25px rgba(31,66,135,0.04)", 
            border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.8)"
          }}>
            <div style={{ fontSize: 14, lineHeight: 1.6, fontWeight: 700 }}>{m.text}</div>
          </div>
        ))}
      </div>

      {/* المدخل العائم الفاخر */}
      <div style={{ 
        position: "fixed", bottom: 100, left: 18, right: 18, 
        background: "rgba(255, 255, 255, 0.9)", 
        padding: 8, borderRadius: 22, 
        border: "1px solid rgba(255, 255, 255, 1)", 
        display: "flex", gap: 8, zIndex: 50, 
        boxShadow: "0 15px 35px rgba(31, 66, 135, 0.08)" 
      }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="اكتب سؤالك أو تمرينك الصعب هنا يا ذكي..." style={{ flex: 1, padding: "14px", borderRadius: 16, border: "none", background: "#F4F7FC", fontFamily: "Cairo", fontSize: 13, outline: "none", color: "#2C3E50", fontWeight: 700 }} />
        <button onClick={handleSend} style={{ background: "linear-gradient(135deg, #6C5CE7, #5243D1)", color: "white", border: "none", padding: "0 22px", borderRadius: 16, fontFamily: "Cairo", fontWeight: 900, cursor: "pointer", boxShadow: "0 6px 15px rgba(108,92,231,0.3)" }}>أرسل 🚀</button>
      </div>
    </div>
  );
}
"""

print("⏳ جاري صب القوالب اللؤلؤية الزجاجية (Premium Aurora Light)...")
for path, code in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(code.strip())
print("🎉 مذهل! تم تفجير ثورة التصميم اللؤلؤي المشرق والمبهر بنجاح! 🚀☀️")
