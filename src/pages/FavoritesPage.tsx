import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "#E8A020", surface: "#FFFFFF",
  surface2: "#F7F9FC", text: "#1A2540",
  textMuted: "#8A97AA", border: "#D8E2F0",
  shadow: "0 2px 12px rgba(27,58,107,0.09)",
  error: "#C0392B",
};

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    async function load() {
      const { data: session } = await supabase.auth.getSession();
      const user = session.session?.user;
      if (!user) { setLoading(false); return; }
      const { data } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setFavorites(data || []);
      setLoading(false);
    }
    load();
  }, []);

  async function removeFavorite(id: string) {
    await supabase.from("favorites").delete().eq("id", id);
    setFavorites(prev => prev.filter(f => f.id !== id));
  }

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:32 }}>
      <div style={{ background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, padding:"20px 16px 28px", borderRadius:"0 0 28px 28px", marginBottom:16 }}>
        <button onClick={() => navigate("/")} style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:12, fontFamily:"'Cairo',sans-serif" }}>← رجوع</button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:8 }}>⭐</div>
          <h1 style={{ margin:"0 0 4px", color:"white", fontSize:22, fontWeight:800 }}>المفضلة</h1>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13 }}>{favorites.length} عنصر محفوظ</div>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>
        {loading && <div style={{ textAlign:"center", padding:40, color:C.textMuted }}>⏳ جاري التحميل...</div>}

        {!loading && favorites.length === 0 && (
          <div style={{ textAlign:"center", padding:40, color:C.textMuted }}>
            <div style={{ fontSize:48 }}>📭</div>
            <div style={{ marginTop:8, fontSize:16 }}>لا يوجد عناصر في المفضلة</div>
            <button onClick={() => navigate("/grade/1")} style={{ marginTop:16, padding:"12px 24px", border:"none", borderRadius:12, background:C.primary, color:"white", fontFamily:"'Cairo',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>
              تصفح الدروس
            </button>
          </div>
        )}

        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {favorites.map(f => (
            <div key={f.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:"16px", display:"flex", alignItems:"center", gap:14, boxShadow:C.shadow }}>
              <div style={{ width:48, height:48, borderRadius:14, background:"#FDF3E0", display:"grid", placeItems:"center", fontSize:22, flexShrink:0 }}>⭐</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:C.text, fontSize:15 }}>{f.title || "درس"}</div>
                <div style={{ color:C.textMuted, fontSize:12, marginTop:2 }}>{f.subject} — السنة {f.grade}</div>
              </div>
              <button
                onClick={() => removeFavorite(f.id)}
                style={{ width:32, height:32, borderRadius:"50%", background:"#FDECEA", color:C.error, border:"none", cursor:"pointer", fontSize:16, display:"grid", placeItems:"center" }}
              >✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
