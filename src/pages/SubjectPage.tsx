import { useNavigate, useParams } from "react-router-dom";
import appData from "../data/appData";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  surface: "#FFFFFF", surface2: "#F7F9FC",
  text: "#1A2540", textMuted: "#8A97AA",
  border: "#D8E2F0", shadow: "0 2px 12px rgba(27,58,107,0.09)",
};

const SUBJECT_COLORS: Record<string, string> = {
  math: "#2E7D5E", arabic: "#C0392B", french: "#1565C0",
  islamic: "#6A1B9A", civic: "#E65100", science: "#00838F",
};

const SECTIONS = [
  { slug:"lessons",   icon:"📖", name:"الدروس",          desc:"شروحات مبسطة حسب المستوى",     color:"#2D5BA3" },
  { slug:"exercises", icon:"✏️", name:"التمارين",        desc:"تمارين تفاعلية مع تصحيح فوري", color:"#2E7D5E" },
  { slug:"quizzes",   icon:"📝", name:"الاختبارات",      desc:"اختبارات قصيرة لقياس الفهم",   color:"#E8A020" },
  { slug:"progress",  icon:"⭐", name:"النقاط والتقدم", desc:"متابعة مستوى التلميذ",          color:"#E65100" },
];

export default function SubjectPage() {
  const { gradeId, subject } = useParams();
  const navigate = useNavigate();
  const currentSubject = (appData.subjects || []).find((s: any) => s.slug === subject);
  const subjectColor = SUBJECT_COLORS[subject || ""] || C.primary;

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:32 }}>

      <div style={{ background:`linear-gradient(135deg,${subjectColor},${subjectColor}bb)`, padding:"20px 16px 28px", borderRadius:"0 0 28px 28px", marginBottom:16, position:"relative" }}>
        <button
          onClick={() => navigate(`/grade/${gradeId}`)}
          style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:12, fontFamily:"'Cairo',sans-serif" }}
        >
          ← رجوع
        </button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:52, marginBottom:8 }}>{currentSubject?.icon || "📘"}</div>
          <h1 style={{ margin:"0 0 8px", color:"white", fontSize:24, fontWeight:800 }}>
            {currentSubject?.name || subject}
          </h1>
          <div style={{ display:"inline-block", background:"rgba(255,255,255,0.2)", padding:"4px 14px", borderRadius:20, fontSize:13, color:"white" }}>
            السنة {gradeId} ابتدائي
          </div>
        </div>
      </div>

      <div style={{ padding:"0 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {SECTIONS.map((section) => (
          <div
            key={section.slug}
            onClick={() => navigate(`/grade/${gradeId}/subject/${subject}/section/${section.slug}`)}
            style={{ background:section.color, borderRadius:18, padding:"20px 14px", textAlign:"center", boxShadow:`0 4px 16px ${section.color}44`, color:"white", minHeight:130, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, cursor:"pointer" }}
          >
            <div style={{ width:54, height:54, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"grid", placeItems:"center", fontSize:26 }}>
              {section.icon}
            </div>
            <div style={{ fontSize:16, fontWeight:700 }}>{section.name}</div>
            <div style={{ fontSize:11, opacity:0.85 }}>{section.desc}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
