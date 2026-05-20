import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "#E8A020", success: "#2E7D5E",
  surface: "#FFFFFF", surface2: "#F7F9FC",
  text: "#1A2540", textMuted: "#8A97AA",
  border: "#D8E2F0", shadow: "0 2px 12px rgba(27,58,107,0.09)",
};

export default function NotificationsPage() {
  const navigate  = useNavigate();
  const [notifs, setNotifs]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: session } = await supabase.auth.getSession();
      const user = session.session?.user;
      if (!user) { setLoading(false); return; }
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });
      setNotifs(data || []);
      setLoading(false);
    }
    load();
  }, []);

  async function markRead(id: string) {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  }

  const unread = notifs.filter(n => !n.is_read).length;

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:32 }}>
      <div style={{ background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, padding:"20px 16px 28px", borderRadius:"0 0 28px 28px", marginBottom:16 }}>
        <button onClick={() => navigate("/")} style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:12, fontFamily:"'Cairo',sans-serif" }}>← رجوع</button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:8 }}>🔔</div>
          <h1 style={{ margin:"0 0 4px", color:"white", fontSize:22, fontWeight:800 }}>الإشعارات</h1>
          {unread > 0 && <div style={{ display:"inline-block", background:C.accent, color:"white", borderRadius:20, padding:"3px 12px", fontSize:13, fontWeight:700 }}>{unread} جديد</div>}
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>
        {loading && <div style={{ textAlign:"center", padding:40, color:C.textMuted }}>⏳ جاري التحميل...</div>}

        {!loading && notifs.length === 0 && (
          <div style={{ textAlign:"center", padding:40, color:C.textMuted }}>
            <div style={{ fontSize:48 }}>🔕</div>
            <div style={{ marginTop:8 }}>لا توجد إشعارات</div>
          </div>
        )}

        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {notifs.map(n => (
            <div
              key={n.id}
              onClick={() => !n.is_read && markRead(n.id)}
              style={{ background: n.is_read ? C.surface : "#EBF1FA", border:`1.5px solid ${n.is_read ? C.border : C.primary}`, borderRadius:16, padding:"16px", display:"flex", gap:14, boxShadow:C.shadow, cursor: n.is_read ? "default" : "pointer" }}
            >
              <div style={{ width:44, height:44, borderRadius:12, background: n.type === "success" ? "#E8F5EF" : n.type === "warning" ? "#FDF3E0" : "#EBF1FA", display:"grid", placeItems:"center", fontSize:22, flexShrink:0 }}>
                {n.type === "success" ? "✅" : n.type === "warning" ? "⚠️" : "ℹ️"}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:C.text, fontSize:14 }}>{n.title}</div>
                <div style={{ color:C.textMuted, fontSize:12, marginTop:3 }}>{n.message}</div>
                <div style={{ color:C.textMuted, fontSize:11, marginTop:4 }}>{new Date(n.created_at).toLocaleDateString("ar-DZ")}</div>
              </div>
              {!n.is_read && <div style={{ width:10, height:10, borderRadius:"50%", background:C.primary, flexShrink:0, marginTop:4 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
