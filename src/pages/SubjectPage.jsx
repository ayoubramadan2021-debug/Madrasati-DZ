import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { common } from "../theme";
import appData from "../data/appData";
import { useLanguage } from "../i18n/LanguageContext";

const sectionColors = ["#3b82f6","#16a34a","#f97316","#8b5cf6"];

function SubjectPage({ theme, setThemeName }) {
  const { t } = useLanguage();

  function translateSubject(slug, name) {
    const map = {
      math: t.subject_math,
      arabic: t.subject_arabic,
      french: t.subject_french,
      islamic: t.subject_islamic,
      civic: t.subject_civic,
      science: t.subject_science,
    };
    return map[slug] || name;
  }

  function translateSection(slug, title) {
    const map = {
      lessons: t.section_lessons,
      exercises: t.section_exercises,
      quizzes: t.section_quizzes,
      progress: t.section_progress,
    };
    return map[slug] || title;
  }

  function translateSectionDesc(slug, desc) {
    const map = {
      lessons: t.section_lessons_desc,
      exercises: t.section_exercises_desc,
      quizzes: t.section_quizzes_desc,
      progress: t.section_progress_desc,
    };
    return map[slug] || desc;
  }
  const { gradeId, subject } = useParams();
  const currentSubject = appData.subjects.find((item) => item.slug === subject);

  return (
    <Layout theme={theme} setThemeName={setThemeName}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${currentSubject?.color || theme.primary}, ${theme.secondary})`,
        borderRadius: common.radius.large,
        padding: "24px 20px",
        marginBottom: "20px",
        color: "white",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "56px", marginBottom: "8px" }}>{currentSubject?.icon || "📘"}</div>
        <h1 style={{ fontSize: "26px", margin: "0 0 6px", color: "white" }}>
          {currentSubject?.name || subject}
        </h1>
        <div style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.25)",
          padding: "4px 14px", borderRadius: "20px",
          fontSize: "14px", color: "white",
        }}>السنة {gradeId} ابتدائي</div>
      </div>

      <Link to={`/grade/${gradeId}`} style={{
        color: theme.primary, textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: "6px",
        fontSize: "15px", marginBottom: "16px",
        background: theme.surface, padding: "8px 14px",
        borderRadius: common.radius.full,
        border: `1px solid ${theme.border}`,
      }}>⬅️ {t.backSubjects}</Link>

      {/* Sections */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
        {appData.sections.map((section, i) => (
          <Link
            key={section.slug}
            to={`/grade/${gradeId}/subject/${subject}/section/${section.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div style={{
              background: sectionColors[i % sectionColors.length],
              borderRadius: common.radius.medium,
              padding: "20px 16px",
              textAlign: "center",
              boxShadow: `0 4px 16px ${sectionColors[i % sectionColors.length]}55`,
              color: "white",
              minHeight: "120px",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "10px",
            }}>
              <div style={{
                width: "54px", height: "54px", borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                display: "grid", placeItems: "center", fontSize: "28px",
              }}>{section.icon}</div>
              <div style={{ fontSize: "17px", fontWeight: "bold" }}>{translateSection(section.slug, section.title)}</div>
              <div style={{ fontSize: "12px", opacity: 0.85 }}>{translateSectionDesc(section.slug, section.desc)}</div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default SubjectPage;
