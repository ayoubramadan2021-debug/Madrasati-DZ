import { useParams, useNavigate } from "react-router-dom";
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

export default function LessonPage() {
  const { gradeId, subject, lessonId } = useParams();
  const navigate = useNavigate();
  const subjectColor = SUBJECT_COLORS[subject || ""] || C.primary;

  // جلب الدرس من appData
  const currentSubject = (appData.subjects || []).find((s: any) => s.slug === subject);
  const lesson = (currentSubject?.lessons || []).find((l: any) => String(l.id) === String(lessonId));

  return (
    <div style={{ fontFamily:"'Cairo',sans-serif", minHeight:"100vh", background:C.surface2, paddingBottom:32 }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${subjectColor},${subjectColor}bb)`, padding:"20px 16px 24px", borderRadius:"0 0 28px 28px", marginBottom:16 }}>
        <button
          onClick={() => navigate(`/grade/${gradeId}/subject/${subject}/section/lessons`)}
          style={{ color:"white", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:600, cursor:"pointer", marginBottom:12, fontFamily:"'Cairo',sans-serif" }}
        >
          ← رجوع للدروس
        </button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:8 }}>📖</div>
          <h1 style={{ margin:"0 0 6px", color:"white", fontSize:22, fontWeight:800 }}>
            {lesson?.title || "الدرس"}
          </h1>
          <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13 }}>
            {currentSubject?.name} — السنة {gradeId} ابتدائي
          </div>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>

        {!lesson ? (
          <div style={{ textAlign:"center", padding:40, color:C.textMuted }}>
            <div style={{ fontSize:48 }}>📭</div>
            <div style={{ marginTop:8, fontSize:16 }}>الدرس غير موجود</div>
          </div>
        ) : (
          <>
            {/* محتوى الدرس */}
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:20, boxShadow:C.shadow, marginBottom:14 }}>
              <h2 style={{ margin:"0 0 14px", color:C.primary, fontSize:18, fontWeight:700 }}>
                🧠 محتوى الدرس
              </h2>
              <p style={{ color:C.text, lineHeight:2, fontSize:16, margin:0 }}>
                {lesson.desc}
              </p>
            </div>

            {/* زر المفضلة */}
            <button
              style={{ width:"100%", padding:"14px", border:"none", borderRadius:16, background:C.accent, color:"white", fontSize:16, fontWeight:700, marginBottom:14, cursor:"pointer", fontFamily:"'Cairo',sans-serif", boxShadow:`0 4px 14px ${C.accent}44` }}
            >
              ⭐ حفظ في المفضلة
            </button>

            {/* زر التمارين */}
            <button
              onClick={() => navigate(`/grade/${gradeId}/subject/${subject}/section/exercises`)}
              style={{ width:"100%", padding:"14px", border:"none", borderRadius:16, background:`linear-gradient(135deg,${C.primary},${C.primaryLight})`, color:"white", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"'Cairo',sans-serif", boxShadow:`0 4px 14px ${C.primary}44` }}
            >
              ✍️ اذهب إلى التمارين
            </button>
          </>
        )}
      </div>
    </div>
  );
}
