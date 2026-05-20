import { Link, useParams, useNavigate } from "react-router-dom";
import appData from "../data/appData";

const C = {
  primary: "#1B3A6B", primaryLight: "#2D5BA3",
  accent: "#E8A020", success: "#2E7D5E",
  surface: "#FFFFFF", surface2: "#F7F9FC",
  text: "#1A2540", textMuted: "#8A97AA",
  border: "#D8E2F0", shadow: "0 2px 12px rgba(27,58,107,0.09)",
};

const SUBJECT_COLORS: Record<string, string> = {
  math: "#2E7D5E", arabic: "#C0392B", french: "#1565C0",
  islamic: "#6A1B9A", civic: "#E65100", science: "#00838F",
};

export default function SectionPage() {
  const { gradeId, subject, section } = useParams();
  const navigate = useNavigate();
  const currentSubject = (appData.subjects || []).find((s: any) => s.slug === subject);
  const subjectColor = SUBJECT_COLORS[subject || ""] || C.primary;

  const lessons   = currentSubject?.lessons   || [];
  const exercises = currentSubject?.exercises || [];

  const isLessons   = section === "lessons";
  const isExercises = section === "exercises";

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:32 }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${subjectColor},${subjectColor}bb)`, padding:"20px 16px 24px", borderRadius:"0 0 28px 28px", marginBottom:16, position:"relative" }}>
        <button
          onClick={() => navigate(`/grade/${gradeId}/subject/${subject}`)}
          style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:12, fontFamily:"'Cairo',sans-serif" }}
        >
          ← رجوع
        </button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:6 }}>
            {isLessons ? "📖" : isExercises ? "✏️" : "📝"}
          </div>
          <h1 style={{ margin:"0 0 4px", color:"white", fontSize:22, fontWeight:800 }}>
            {isLessons ? "الدروس" : isExercises ? "التمارين" : "الاختبارات"}
          </h1>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13 }}>
            {currentSubject?.name} — السنة {gradeId} ابتدائي
          </div>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>

        {/* الدروس */}
        {isLessons && (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {lessons.length === 0 && (
              <div style={{ textAlign:"center", padding:40, color:C.textMuted }}>
                <div style={{ fontSize:40 }}>📭</div>
                <div style={{ marginTop:8 }}>لا توجد دروس</div>
              </div>
            )}
            {lessons.map((lesson: any) => (
              <div
                key={lesson.id}
                onClick={() => navigate(`/grade/${gradeId}/subject/${subject}/lesson/${lesson.id}`)}
                style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:"16px", display:"flex", alignItems:"center", gap:14, boxShadow:C.shadow, cursor:"pointer" }}
              >
                <div style={{ width:48, height:48, borderRadius:14, background:subjectColor+"18", display:"grid", placeItems:"center", fontSize:22, flexShrink:0 }}>📖</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:C.text, fontSize:15 }}>{lesson.title}</div>
                  <div style={{ color:C.textMuted, fontSize:12, marginTop:3 }}>{lesson.desc}</div>
                </div>
                <div style={{ width:32, height:32, borderRadius:"50%", background:subjectColor, color:"white", display:"grid", placeItems:"center", fontWeight:700, flexShrink:0 }}>←</div>
              </div>
            ))}
          </div>
        )}

        {/* التمارين */}
        {isExercises && (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {exercises.length === 0 && (
              <div style={{ textAlign:"center", padding:40, color:C.textMuted }}>
                <div style={{ fontSize:40 }}>📭</div>
                <div style={{ marginTop:8 }}>لا توجد تمارين</div>
              </div>
            )}
            {exercises.map((ex: any) => (
              <div
                key={ex.id}
                onClick={() => navigate(`/grade/${gradeId}/subject/${subject}/exercise/${ex.id}`)}
                style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:"16px", display:"flex", alignItems:"center", gap:14, boxShadow:C.shadow, cursor:"pointer" }}
              >
                <div style={{ width:48, height:48, borderRadius:14, background:C.accent+"18", display:"grid", placeItems:"center", fontSize:22, flexShrink:0 }}>✏️</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:C.text, fontSize:15 }}>{ex.title}</div>
                  <div style={{ color:C.textMuted, fontSize:12, marginTop:3 }}>{ex.questions?.length || 0} سؤال</div>
                </div>
                <div style={{ width:32, height:32, borderRadius:"50%", background:C.accent, color:"white", display:"grid", placeItems:"center", fontWeight:700, flexShrink:0 }}>←</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
