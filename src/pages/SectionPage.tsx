import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { common } from "../theme";
import appData from "../data/appData";
import { getLessons } from "../services/lessonService";
import { getExercises } from "../services/exerciseService";
import { getQuizzesByGradeAndSubject } from "../services/quizService";

function SectionPage({ theme, setThemeName }) {
  const { gradeId, subject, section } = useParams();
  const [onlineItems, setOnlineItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentSubject = appData.subjects.find((item) => item.slug === subject);
  const currentSection = appData.sections.find((item) => item.slug === section);

  useEffect(() => { loadOnlineContent(); }, [gradeId, subject, section]);

  async function loadOnlineContent() {
    setLoading(true);
    if (section === "lessons") {
      const data = await getLessons();
      setOnlineItems(data.filter((item) => String(item.grade) === String(gradeId) && String(item.subject) === String(subject)));
    } else if (section === "exercises") {
      const data = await getExercises();
      setOnlineItems(data.filter((item) => String(item.grade) === String(gradeId) && String(item.subject) === String(subject)));
    } else if (section === "quizzes") {
      const data = await getQuizzesByGradeAndSubject(gradeId, subject);
      setOnlineItems(data);
    } else {
      const dataKey = currentSection?.dataKey;
      setOnlineItems(currentSubject?.[dataKey] || []);
    }
    setLoading(false);
  }

  const sectionColor = currentSection?.color || theme.primary;

  return (
    <Layout theme={theme} setThemeName={setThemeName}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${sectionColor}, ${theme.secondary})`,
        borderRadius: common.radius.large,
        padding: "24px 20px",
        marginBottom: "20px",
        color: "white",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "56px", marginBottom: "8px" }}>{currentSection?.icon || "📂"}</div>
        <h1 style={{ fontSize: "26px", margin: "0 0 6px", color: "white" }}>
          {currentSection?.title || section}
        </h1>
        <div style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.25)",
          padding: "4px 14px", borderRadius: "20px",
          fontSize: "14px", color: "white",
        }}>{currentSubject?.name} - السنة {gradeId}</div>
      </div>

      <Link to={`/grade/${gradeId}/subject/${subject}`} style={{
        color: theme.primary, textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: "6px",
        fontSize: "15px", marginBottom: "16px",
        background: theme.surface, padding: "8px 14px",
        borderRadius: common.radius.full,
        border: `1px solid ${theme.border}`,
      }}>⬅️ رجوع للمادة</Link>

      {loading && (
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          padding: "30px", borderRadius: common.radius.medium,
          textAlign: "center", color: theme.muted, fontSize: "18px",
        }}>⏳ جاري تحميل المحتوى...</div>
      )}

      {!loading && onlineItems.length === 0 && (
        <div style={{
          background: theme.surface, border: `1px solid ${theme.border}`,
          padding: "30px", borderRadius: common.radius.medium,
          textAlign: "center",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🚧</div>
          <h2 style={{ color: theme.text, margin: "0 0 8px" }}>لا يوجد محتوى</h2>
          <p style={{ color: theme.muted, margin: 0 }}>أضف المحتوى من لوحة الإدارة.</p>
        </div>
      )}

      {!loading && onlineItems.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {onlineItems.map((item, i) => {
            let target = `/grade/${gradeId}/subject/${subject}/section/${section}`;
            if (section === "lessons") target = `/grade/${gradeId}/subject/${subject}/lesson/${item.id}`;
            if (section === "exercises") target = `/grade/${gradeId}/subject/${subject}/exercise/${item.id}`;
            if (section === "quizzes") target = `/grade/${gradeId}/subject/${subject}/quiz/${item.id}`;

            return (
              <Link key={item.id} to={target} style={{ textDecoration: "none" }}>
                <div style={{
                  background: theme.surface,
                  border: `1px solid ${theme.border}`,
                  borderRadius: common.radius.medium,
                  padding: "18px 20px",
                  display: "flex", alignItems: "center", gap: "16px",
                  boxShadow: theme.cardShadow,
                }}>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "16px",
                    background: `${sectionColor}20`,
                    border: `2px solid ${sectionColor}40`,
                    display: "grid", placeItems: "center",
                    fontSize: "24px", flexShrink: 0,
                    color: sectionColor,
                  }}>{currentSection?.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "17px", fontWeight: "bold", color: theme.text }}>
                      {item.title}
                    </div>
                    {item.content && (
                      <div style={{ fontSize: "13px", color: theme.muted, marginTop: "4px" }}>
                        {item.content.slice(0, 80)}...
                      </div>
                    )}
                    {item.question && (
                      <div style={{ fontSize: "13px", color: theme.muted, marginTop: "4px" }}>
                        {item.question.slice(0, 80)}...
                      </div>
                    )}
                    {section === "quizzes" && (
                      <div style={{ fontSize: "13px", color: theme.muted, marginTop: "4px" }}>
                        عدد الأسئلة: {item.questions?.length || 0}
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: "20px", color: theme.muted }}>›</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </Layout>
  );
}

export default SectionPage;
