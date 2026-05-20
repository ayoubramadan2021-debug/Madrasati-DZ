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

const MEDALS = ["🥇","🥈","🥉"];
const MEDAL_COLORS = [C.accent, "#9E9E9E", "#CD7F32"];

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [myId, setMyId]         = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: session } = await supabase.auth.getSession();
      setMyId(session.session?.user?.id || null);
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, points, grade")
        .order("points", { ascending: false })
        .limit(20);
      setLeaders(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:32 }}>
      <div style={{ background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, padding:"20px 16px 28px", borderRadius:"0 0 28px 28px", marginBottom:16 }}>
        <button onClick={() => navigate("/")} style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:12, fontFamily:"'Cairo',sans-serif" }}>← رجوع</button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:8 }}>🏆</div>
          <h1 style={{ margin:"0 0 4px", color:"white", fontSize:22, fontWeight:800 }}>لوحة الترتيب</h1>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13 }}>أفضل 20 تلميذ</div>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>
        {loading && <div style={{ textAlign:"center", padding:40, color:C.textMuted }}>⏳ جاري التحميل...</div>}

        {/* أول 3 */}
        {!loading && leaders.length >= 3 && (
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"center", gap:12, marginBottom:20 }}>
            {/* المركز 2 */}
            <div style={{ textAlign:"center", flex:1 }}>
              <div style={{ fontSize:32 }}>🥈</div>
              <div style={{ background:C.surface, borderRadius:16, padding:"12px 8px", boxShadow:C.shadow, border:`2px solid #9E9E9E` }}>
                <div style={{ fontSize:24 }}>👦</div>
                <div style={{ fontWeight:700, color:C.text, fontSize:13, marginTop:4 }}>{leaders[1]?.full_name || "تلميذ"}</div>
                <div style={{ color:"#9E9E9E", fontWeight:900, fontSize:16 }}>{leaders[1]?.points || 0}</div>
              </div>
            </div>
            {/* المركز 1 */}
            <div style={{ textAlign:"center", flex:1.2 }}>
              <div style={{ fontSize:40 }}>🥇</div>
              <div style={{ background:C.surface, borderRadius:18, padding:"16px 8px", boxShadow:`0 4px 20px ${C.accent}33`, border:`2px solid ${C.accent}` }}>
                <div style={{ fontSize:30 }}>👦</div>
                <div style={{ fontWeight:800, color:C.text, fontSize:14, marginTop:4 }}>{leaders[0]?.full_name || "تلميذ"}</div>
                <div style={{ color:C.accent, fontWeight:900, fontSize:20 }}>{leaders[0]?.points || 0}</div>
              </div>
            </div>
            {/* المركز 3 */}
            <div style={{ textAlign:"center", flex:1 }}>
              <div style={{ fontSize:32 }}>🥉</div>
              <div style={{ background:C.surface, borderRadius:16, padding:"12px 8px", boxShadow:C.shadow, border:`2px solid #CD7F32` }}>
                <div style={{ fontSize:24 }}>👦</div>
                <div style={{ fontWeight:700, color:C.text, fontSize:13, marginTop:4 }}>{leaders[2]?.full_name || "تلميذ"}</div>
                <div style={{ color:"#CD7F32", fontWeight:900, fontSize:16 }}>{leaders[2]?.points || 0}</div>
              </div>
            </div>
          </div>
        )}

        {/* باقي القائمة */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {leaders.slice(3).map((l, i) => (
            <div key={l.id} style={{ background: l.id === myId ? "#EBF1FA" : C.surface, border:`1.5px solid ${l.id === myId ? C.primary : C.border}`, borderRadius:16, padding:"14px 16px", display:"flex", alignItems:"center", gap:14, boxShadow:C.shadow }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:C.surface2, display:"grid", placeItems:"center", fontWeight:800, color:C.textMuted, fontSize:16, flexShrink:0 }}>{i+4}</div>
              <div style={{ fontSize:28 }}>👦</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:C.text, fontSize:14 }}>{l.full_name || "تلميذ"}</div>
                <div style={{ color:C.textMuted, fontSize:12 }}>السنة {l.grade}</div>
              </div>
              <div style={{ fontWeight:900, color:C.accent, fontSize:16 }}>{l.points || 0} نقطة</div>
            </div>
          ))}
        </div>

        {!loading && leaders.length === 0 && (
          <div style={{ textAlign:"center", padding:40, color:C.textMuted }}>
            <div style={{ fontSize:40 }}>📭</div>
            <div style={{ marginTop:8 }}>لا يوجد بيانات بعد</div>
          </div>
        )}
      </div>
    </div>
  );
}
