import { Link, useParams } from "react-router-dom";
import appData from "../data/appData";
import { useLanguage } from "../i18n/LanguageContext";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "#E8A020", surface: "#FFFFFF",
  surface2: "#F7F9FC", text: "#1A2540",
  textMuted: "#8A97AA", border: "#D8E2F0",
  shadow: "0 2px 12px rgba(27,58,107,0.09)",
};

const SUBJECT_COLORS: Record<string, string> = {
  math:    "#2E7D5E",
  arabic:  "#C0392B",
  french:  "#1565C0",
  islamic: "#6A1B9A",
  civic:   "#E65100",
  science: "#00838F",
};

const FALLBACK_COLORS = ["#2E7D5E","#C0392B","#1565C0","#6A1B9A","#E65100","#00838F","#E8A020","#1B3A6B"];

export default function GradePage() {
  const { t } = useLanguage() || { t: {} as any };
  const { gradeId: id } = useParams();
  const grade = appData.grades.find((g: any) => String(g.id) === String(id));

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:32 }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, padding:"24px 16px 28px", borderRadius:"0 0 28px 28px", marginBottom:16, textAlign:"center", position:"relative" }}>
        <Link to="/" style={{ position:"absolute", top:16, right:16, color:"white", textDecoration:"none", background:"rgba(255,255,255,0.15)", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600 }}>
          ← رجوع
        </Link>
        <div style={{ fontSize:52, marginBottom:8 }}>🎒</div>
        <h1 style={{ margin:"0 0 6px", color:"white", fontSize:24, fontWeight:800 }}>
          {grade ? grade.name : `السنة ${id}`}
        </h1>
        <p style={{ color:"rgba(255,255,255,0.75)", margin:0, fontSize:13 }}>
          اختر المادة التي تريد تعلمها
        </p>
      </div>

      {/* المواد */}
      <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", gap:12 }}>
        {(appData.subjects || []).map((subject: any, i: number) => {
          const color = SUBJECT_COLORS[subject.slug] || FALLBACK_COLORS[i % FALLBACK_COLORS.length];
          return (
            <Link
              key={subject.slug}
              to={`/grade/${id}/subject/${subject.slug}`}
              style={{ textDecoration:"none" }}
            >
              <div style={{ background:color, borderRadius:18, padding:"18px 20px", display:"flex", alignItems:"center", gap:16, boxShadow:`0 4px 16px ${color}44`, color:"white" }}>
                <div style={{ width:54, height:54, borderRadius:16, background:"rgba(255,255,255,0.2)", display:"grid", placeItems:"center", fontSize:28, flexShrink:0 }}>
                  {subject.icon}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:18, fontWeight:700 }}>{subject.name}</div>
                  <div style={{ fontSize:12, opacity:0.85, marginTop:3 }}>دروس وتمارين هذه السنة</div>
                </div>
                <div style={{ fontSize:22, opacity:0.8 }}>←</div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
