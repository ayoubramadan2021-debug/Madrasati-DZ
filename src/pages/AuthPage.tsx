import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "#E8A020", success: "#2E7D5E",
  error: "#C0392B", surface: "#FFFFFF",
  surface2: "#F7F9FC", text: "#1A2540",
  textMuted: "#8A97AA", border: "#D8E2F0",
};

const GRADES = ["السنة الأولى","السنة الثانية","السنة الثالثة","السنة الرابعة","السنة الخامسة"];

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin]   = useState(true);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [grade, setGrade]       = useState("1");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");

  async function handleSubmit() {
    setError(""); setSuccess(""); setLoading(true);
    try {
      if (isLogin) {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        navigate("/");
      } else {
        const { data, error: err } = await supabase.auth.signUp({ email, password });
        if (err) throw err;
        if (data.user) {
          await supabase.from("profiles").upsert([{
            id: data.user.id, full_name: name,
            grade: Number(grade), points: 0
          }]);
        }
        setSuccess("✅ تم إنشاء الحساب! تحقق من بريدك الإلكتروني.");
      }
    } catch(e: any) {
      setError(e.message || "حدث خطأ");
    }
    setLoading(false);
  }

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:20 }}>

      {/* الشعار */}
      <div style={{ textAlign:"center", marginBottom:32 }}>
        <div style={{ width:72, height:72, borderRadius:20, background:"rgba(255,255,255,0.15)", display:"grid", placeItems:"center", fontSize:36, margin:"0 auto 12px" }}>🎓</div>
        <div style={{ fontFamily:"serif", fontSize:36, color:"white", fontWeight:700 }}>تعليم</div>
        <div style={{ color:"rgba(255,255,255,0.7)", fontSize:14, marginTop:4 }}>منصة تعليمية للابتدائي في الجزائر</div>
      </div>

      {/* البطاقة */}
      <div style={{ background:C.surface, borderRadius:24, padding:28, width:"100%", maxWidth:400, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>

        {/* تبديل */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", background:C.surface2, borderRadius:14, padding:4, marginBottom:24 }}>
          {["تسجيل الدخول","حساب جديد"].map((label, i) => (
            <button key={i} onClick={() => { setIsLogin(i===0); setError(""); }}
              style={{ padding:"10px", border:"none", borderRadius:12, background:(i===0)===isLogin ? C.primary : "transparent", color:(i===0)===isLogin ? "white" : C.textMuted, fontFamily:"'Cairo',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>
              {label}
            </button>
          ))}
        </div>

        {/* حقول التسجيل */}
        {!isLogin && (
          <>
            <label style={{ fontSize:13, fontWeight:600, color:C.text, display:"block", marginBottom:6 }}>الاسم الكامل</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="أحمد بن عمر"
              style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:14, outline:"none", marginBottom:14, boxSizing:"border-box" as any, direction:"rtl" }} />
            <label style={{ fontSize:13, fontWeight:600, color:C.text, display:"block", marginBottom:6 }}>السنة الدراسية</label>
            <select value={grade} onChange={e => setGrade(e.target.value)}
              style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:14, outline:"none", marginBottom:14, background:C.surface, direction:"rtl" }}>
              {GRADES.map((g,i) => <option key={i} value={String(i+1)}>{g}</option>)}
            </select>
          </>
        )}

        <label style={{ fontSize:13, fontWeight:600, color:C.text, display:"block", marginBottom:6 }}>البريد الإلكتروني</label>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" type="email"
          style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:14, outline:"none", marginBottom:14, boxSizing:"border-box" as any }} />

        <label style={{ fontSize:13, fontWeight:600, color:C.text, display:"block", marginBottom:6 }}>كلمة المرور</label>
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password"
          style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:14, outline:"none", marginBottom:20, boxSizing:"border-box" as any }} />

        {error && <div style={{ background:"#FDECEA", border:`1px solid ${C.error}`, borderRadius:10, padding:"10px 14px", color:C.error, fontSize:13, marginBottom:14, textAlign:"center" }}>{error}</div>}
        {success && <div style={{ background:"#E8F5EF", border:`1px solid ${C.success}`, borderRadius:10, padding:"10px 14px", color:C.success, fontSize:13, marginBottom:14, textAlign:"center" }}>{success}</div>}

        <button onClick={handleSubmit} disabled={loading}
          style={{ width:"100%", padding:"14px", border:"none", borderRadius:14, background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:16, fontWeight:700, cursor:"pointer", boxShadow:`0 4px 14px ${C.primary}44` }}>
          {loading ? "جاري المعالجة..." : isLogin ? "تسجيل الدخول" : "إنشاء الحساب"}
        </button>

        <button onClick={() => navigate("/")}
          style={{ width:"100%", marginTop:12, padding:"12px", border:`1.5px solid ${C.border}`, borderRadius:14, background:"transparent", color:C.textMuted, fontFamily:"'Cairo',sans-serif", fontSize:14, cursor:"pointer" }}>
          تصفح بدون تسجيل
        </button>
      </div>
    </div>
  );
}
