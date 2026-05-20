import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "#E8A020", success: "#2E7D5E",
  surface: "#FFFFFF", surface2: "#F7F9FC",
  text: "#1A2540", textMuted: "#8A97AA",
  border: "#D8E2F0", shadow: "0 2px 12px rgba(27,58,107,0.09)",
};

export default function SupportPage() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!msg.trim()) return;
    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const user = session.session?.user;
      await supabase.from("support_messages").insert([{ user_id: user?.id || null, message: msg, status: "pending" }]);
      setSent(true);
    } catch(e) {}
    setLoading(false);
  }

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:32 }}>
      <div style={{ background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, padding:"20px 16px 28px", borderRadius:"0 0 28px 28px", marginBottom:16 }}>
        <button onClick={() => navigate("/")} style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:12, fontFamily:"'Cairo',sans-serif" }}>← رجوع</button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:8 }}>💬</div>
          <h1 style={{ margin:"0 0 4px", color:"white", fontSize:22, fontWeight:800 }}>الدعم</h1>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13 }}>نحن هنا لمساعدتك</div>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>
        {sent ? (
          <div style={{ background:"#E8F5EF", border:`1.5px solid ${C.success}`, borderRadius:18, padding:32, textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:12 }}>✅</div>
            <div style={{ fontWeight:800, color:C.success, fontSize:18, marginBottom:8 }}>تم إرسال رسالتك!</div>
            <div style={{ color:C.textMuted, fontSize:14, marginBottom:20 }}>سنرد عليك في أقرب وقت</div>
            <button onClick={() => { setSent(false); setMsg(""); }} style={{ padding:"12px 24px", border:"none", borderRadius:12, background:C.success, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>
              إرسال رسالة أخرى
            </button>
          </div>
        ) : (
          <>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <div style={{ width:4, height:20, borderRadius:4, background:C.accent }} />
              <div style={{ fontSize:18, fontWeight:700, color:C.text }}>أسئلة شائعة</div>
            </div>
            {[
              { q:"كيف أبدأ التعلم؟", a:"اختر السنة الدراسية ثم المادة والدرس الذي تريده." },
              { q:"كيف أحصل على نقاط؟", a:"أكمل التمارين بإجابات صحيحة لتحصل على نقاط." },
              { q:"هل التطبيق مجاني؟", a:"نعم، تطبيق تعليم مجاني بالكامل لجميع تلاميذ الابتدائي." },
            ].map((item, i) => (
              <div key={i} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:16, marginBottom:10, boxShadow:C.shadow }}>
                <div style={{ fontWeight:700, color:C.primary, fontSize:14, marginBottom:6 }}>❓ {item.q}</div>
                <div style={{ color:C.textMuted, fontSize:13, lineHeight:1.7 }}>{item.a}</div>
              </div>
            ))}

            <div style={{ display:"flex", alignItems:"center", gap:8, margin:"20px 0 12px" }}>
              <div style={{ width:4, height:20, borderRadius:4, background:C.accent }} />
              <div style={{ fontSize:18, fontWeight:700, color:C.text }}>راسلنا</div>
            </div>
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:20, boxShadow:C.shadow }}>
              <label style={{ fontSize:13, fontWeight:600, color:C.text, display:"block", marginBottom:8 }}>رسالتك</label>
              <textarea
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder="اكتب مشكلتك أو سؤالك هنا..."
                rows={4}
                style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:`1.5px solid ${C.border}`, fontFamily:"'Cairo',sans-serif", fontSize:14, resize:"none", outline:"none", boxSizing:"border-box" as any, direction:"rtl" }}
              />
              <button
                onClick={handleSend}
                disabled={!msg.trim() || loading}
                style={{ marginTop:12, width:"100%", padding:"14px", border:"none", borderRadius:12, background: msg.trim() ? C.primary : C.border, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:15, fontWeight:700, cursor: msg.trim() ? "pointer" : "default" }}
              >
                {loading ? "جاري الإرسال..." : "إرسال الرسالة 📤"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
