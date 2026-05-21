import os

# مصفوفة الألوان الفاخرة الجديدة (Premium Dark + Gold)
C_DARK_GOLD = {
    "bg_dark": "#0B0F19",       # الخلفية الداكنة العميقة السينمائية
    "bg_card": "#151D30",       # بطاقات ثلاثية الأبعاد بارزة
    "gold": "#FFD700",          # الذهب الخالص للمؤشرات الهامة والنجوم
    "gold_glow": "#E6B800",     # التوهج الذهبي
    "accent_cyan": "#00F2FE",   # لون نيون مكمل لإعطاء لمسة تكنولوجية حديثة
    "text_white": "#FFFFFF",
    "text_muted": "#8A9CB6",
    "border_gold": "rgba(255, 215, 0, 0.25)",
    "shadow_3d": "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255,255,255,0.15)"
}

files = {}

# ===== 1. تحديث شريط التصفح السفلي (BottomNav.tsx) ليصبح عائماً ومشعاً بالفخامة =====
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
      position:"fixed", bottom:16, left:16, right:16, zIndex:100, 
      height:76, background:"rgba(21, 29, 48, 0.85)", 
      backdropFilter:"blur(20px)", borderRadius:24,
      border:"1px solid rgba(255, 215, 0, 0.2)", 
      display:"grid", gridTemplateColumns:"repeat(5,1fr)", alignItems:"center", padding:"0 8px",
      boxShadow: "0 12px 40px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)"
    }}>
      {NAV.map(item => {
        const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
        return (
          <Link key={item.to} to={item.to} style={{ textDecoration:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:4, position:"relative" }}>
            <div style={{ 
              width:46, height:46, borderRadius:16, 
              background: active ? "linear-gradient(135deg, #FFD700, #B8860B)" : "transparent", 
              display:"grid", placeItems:"center", fontSize:22,
              transform: active ? "scale(1.15) translateY(-6px)" : "scale(1)",
              boxShadow: active ? "0 8px 20px rgba(255, 215, 0, 0.35)" : "none",
              transition:"all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}>
              <span style={{ filter: active ? "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" : "none" }}>{item.icon}</span>
            </div>
            <span style={{ 
              fontSize:10, 
              color: active ? "#FFD700" : "#8A9CB6", 
              fontWeight: active ? 800 : 500, 
              fontFamily:"'Cairo',sans-serif",
              opacity: active ? 1 : 0.7,
              transition: "all 0.2s"
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

# ===== 2. الصفحة الرئيسية الفاخرة ثلاثية الأبعاد (Home.tsx) مع الأنيميشن والجزيئات المشعة =====
files["src/pages/Home.tsx"] = """import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const menuItems = [
    { to: "/ai-tutor", icon: "🤖", label: "المعلم الذكي ديزاد", desc: "ذكاء اصطناعي مخصص للمنهج الجزائري", tag: "جديد مذهل" },
    { to: "/leaderboard", icon: "🏆", label: "لوحة الصدارة والترتيب", desc: "تحدّ أبطال الولايات واكسب الذهب", tag: "المتصدرين" },
  ];

  const grades = [
    { id: "1", label: "السنة الأولى ابتدائي", emoji: "🌱" },
    { id: "2", label: "السنة الثانية ابتدائي", emoji: "🚀" },
    { id: "3", label: "السنة الثالثة ابتدائي", emoji: "⚡" },
    { id: "4", label: "السنة الرابعة ابتدائي", emoji: "🔮" },
    { id: "5", label: "السنة الخامسة ابتدائي", emoji: "👑" },
  ];

  return (
    <div style={{ 
      fontFamily: "'Cairo', sans-serif", background: "#0B0F19", minHeight: "100vh", 
      padding: "20px 16px 110px", direction: "rtl", color: "#FFFFFF",
      position: "relative", overflow: "hidden"
    }}>
      {/* جزيئات مضيئة في الخلفية (Cinematic Particles) */}
      <div style={{ position: "absolute", top: "10%", left: "15%", width: 6, height: 6, background: "#FFD700", borderRadius: "50%", opacity: 0.4, filter: "blur(1px)", animation: "pulse 3s infinite" }} />
      <div style={{ position: "absolute", top: "40%", right: "8%", width: 8, height: 8, background: "#00F2FE", borderRadius: "50%", opacity: 0.3, filter: "blur(1px)" }} />
      <div style={{ position: "absolute", bottom: "25%", left: "10%", width: 5, height: 5, background: "#FFD700", borderRadius: "50%", opacity: 0.5 }} />

      {/* الهيدر السينمائي الفاخر */}
      <div style={{ 
        background: "linear-gradient(135deg, #151D30 0%, #0F1626 100%)", 
        borderRadius: 28, padding: "24px 20px", textAlign: "center", marginBottom: 24,
        border: "1px solid rgba(255, 215, 0, 0.2)",
        boxShadow: "0 12px 36px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)"
      }}>
        <div style={{ fontSize: 52, marginBottom: 10, filter: "drop-shadow(0 4px 12px rgba(255,215,0,0.4))" }}>🎓</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, background: "linear-gradient(120deg, #FFFFFF 30%, #FFD700 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>تطبيق تَعْلِيمْ دِيزَادْ</h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#8A9CB6", fontWeight: 600 }}>المنصة الجزائرية الفاخرة للأبطال الصغار</p>
      </div>

      {/* قسم الميزات الخارقة */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
        {menuItems.map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.to)} style={{ 
            background: "linear-gradient(135deg, #1C2640 0%, #151D30 100%)", 
            borderRadius: 22, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", 
            boxShadow: "0 8px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.08)", 
            border: "1px solid rgba(255, 215, 0, 0.15)", cursor: "pointer",
            transition: "all 0.3s ease"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: "rgba(255,215,0,0.1)", display:"grid", placeItems:"center", fontSize:26, border:"1px solid rgba(255,215,0,0.25)" }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 800, color: "#FFFFFF", fontSize: 15, display:"flex", alignItems:"center", gap:8 }}>
                  {item.label}
                  <span style={{ fontSize:10, background:"linear-gradient(90deg, #FFD700, #B8860B)", color:"#0B0F19", padding:"1px 6px", borderRadius:6, fontWeight:900 }}>{item.tag}</span>
                </div>
                <div style={{ color: "#8A9CB6", fontSize: 11, marginTop: 2 }}>{item.desc}</div>
              </div>
            </div>
            <span style={{ color: "#FFD700", fontWeight: "bold", fontSize:18 }}>⚡</span>
          </div>
        ))}
      </div>

      {/* خريطة المستويات التعليمية الجذابة */}
      <h3 style={{ fontSize: 17, fontWeight: 900, color: "#FFD700", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 4, height: 18, background: "#00F2FE", borderRadius: 2 }} />
        اختر مغامرتك الدراسية
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {grades.map((g) => (
          <div key={g.id} onClick={() => navigate(`/grade/${g.g.id || g.id}`)} style={{ 
            background: "linear-gradient(135deg, #151D30 0%, #0F1626 100%)", 
            borderRadius: 24, padding: "18px", display: "flex", alignItems: "center", justifyContent: "space-between", 
            boxShadow: "0 10px 25px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)", 
            border: "1px solid rgba(255, 215, 0, 0.12)", cursor: "pointer"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ 
                width: 46, height: 46, borderRadius: "50%", 
                background: "linear-gradient(135deg, #FFD700, #B8860B)", 
                color: "#0B0F19", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 18,
                boxShadow: "0 4px 14px rgba(255, 215, 0, 0.3)"
              }}>{g.id}</div>
              <div>
                <span style={{ fontWeight: 800, color: "#FFFFFF", fontSize: 16 }}>{g.label}</span>
                <span style={{ display: "block", fontSize: 11, color: "#8A9CB6", marginTop: 2 }}>دروس تفاعلية مذهلة بجودة Premium {g.emoji}</span>
              </div>
            </div>
            <span style={{ color: "#8A9CB6", fontWeight: "bold" }}>✨</span>
          </div>
        ))}
      </div>
    </div>
  );
}
"""

# ===== 3. ترقية واجهة المعلم الذكي (AiTutorPage.tsx) لتصبح كقمرة قيادة سفينة فضائية سينمائية =====
files["src/pages/AiTutorPage.tsx"] = """import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AiTutorPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { role: "assistant", text: "أهلاً بك يا بطل! أنا رفيقك الخارق والمعلم الذكي. اسألني عن أي تمرين أو قاعدة في الرياضيات واللغات وسأبسطها لك بالذهب والملخصات الفاخرة! 🌟" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", text: `تحليل مذهل يا بطل! سؤالك بخصوص "${userMsg}" يتم معالجته الآن في مصفوفة الذكاء الاصطناعي الجزائري الفاخر ليعطيك الحل بالتفصيل قريباً!` }]);
    }, 800);
  };

  return (
    <div style={{ fontFamily: "'Cairo', sans-serif", background: "#0B0F19", minHeight: "100vh", direction: "rtl", paddingBottom: 110, display: "flex", flexDirection: "column", color: "#FFFFFF" }}>
      
      {/* الهيدر المتوهج */}
      <div style={{ 
        background: "linear-gradient(135deg, #151D30 0%, #0F1626 100%)", 
        padding: "20px 16px", textAlignt: "center",
        borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <button onClick={() => navigate("/")} style={{ padding: "6px 14px", background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)", borderRadius: 12, fontFamily:"Cairo", fontWeight:700 }}>الرئيسية</button>
        <div style={{ textAlign: "center", flex: 1, marginRight: -40 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#FFD700", textShadow: "0 0 10px rgba(255,215,0,0.3)" }}>🤖 الرفيق الذكي الفاخر</h2>
          <span style={{ fontSize: 11, color: "#00F2FE", fontWeight: 700 }}>Powered by Taleem Premium AI</span>
        </div>
      </div>

      {/* مساحة الرسائل الفاخرة */}
      <div style={{ flex: 1, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
            alignSelf: m.role === "user" ? "flex-start" : "flex-end", 
            background: m.role === "user" ? "#1C2640" : "linear-gradient(135deg, #151D30 0%, #111827 100%)", 
            color: "#FFFFFF", 
            padding: "14px 18px", 
            borderRadius: m.role === "user" ? "20px 20px 20px 4px" : "20px 20px 4px 20px", 
            maxWidth: "85%", 
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)", 
            border: m.role === "user" ? "1px solid rgba(0, 242, 254, 0.25)" : "1px solid rgba(255, 215, 0, 0.25)"
          }}>
            <div style={{ fontSize: 14, lineHeight: 1.6, fontWeight: 600 }}>{m.text}</div>
          </div>
        ))}
      </div>

      {/* صندوق الإدخال الخارق العائم */}
      <div style={{ position: "fixed", bottom: 96, left: 16, right: 16, background: "#151D30", padding: 8, borderRadius: 18, border: "1px solid rgba(255, 215, 0, 0.25)", display: "flex", gap: 8, zIndex: 50, boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="اطرح سؤالك أو اكتب تمرينك هنا يا بطل..." style={{ flex: 1, padding: "14px", borderRadius: 14, border: "none", background: "#0B0F19", fontFamily: "Cairo", fontSize: 13, outline: "none", color: "#FFFFFF" }} />
        <button onClick={handleSend} style={{ background: "linear-gradient(135deg, #FFD700, #B8860B)", color: "#0B0F19", border: "none", padding: "0 22px", borderRadius: 14, fontFamily: "Cairo", fontWeight: 900, cursor: "pointer", boxShadow: "0 4px 12px rgba(255,215,0,0.3)" }}>إرسال</button>
      </div>
    </div>
  );
}
"""

print("⏳ جاري صب القوالب الفاخرة (Premium Dark + Gold)...")
for path, code in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(code.strip())
print("🎉 أبهرناك! تم تحويل الواجهات بالكامل إلى الطراز السينمائي الفاخر 🚀🌟")
