import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { common } from "../theme";
import appData from "../data/appData";
import { useLanguage } from "../i18n/LanguageContext";

const subjectColors = ["#16a34a","#f97316","#3b82f6","#8b5cf6","#ec4899","#14b8a6","#f59e0b","#ef4444"];

function GradePage({ theme, setThemeName }) {
  const { t } = useLanguage();

  function translateGradeName(name) {
    const grades = {
      "السنة الأولى": t.grade1,
      "السنة الثانية": t.grade2,
      "السنة الثالثة": t.grade3,
      "السنة الرابعة": t.grade4,
      "السنة الخامسة": t.grade5,
    };
    return grades[name] || name;
  }

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
  const { id } = useParams();
  const grade = appData.grades.find((item) => String(item.id) === String(id));

  return (
    <Layout theme={theme} setThemeName={setThemeName}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
        borderRadius: common.radius.large,
        padding: "24px 20px",
        marginBottom: "20px",
        color: "white",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "56px", marginBottom: "8px" }}>🎒</div>
        <h1 style={{ fontSize: "28px", margin: "0 0 6px", color: "white" }}>
          {grade ? translateGradeName(grade.name) : `${t.grade} ${id}`}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, fontSize: "15px" }}>
          {t.chooseSubject}
        </p>
      </div>

      <Link to="/" style={{
        color: theme.primary, textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: "6px",
        fontSize: "15px", marginBottom: "16px",
        background: theme.surface, padding: "8px 14px",
        borderRadius: common.radius.full,
        border: `1px solid ${theme.border}`,
      }}>⬅️ {t.backHome}</Link>

      {/* Subjects Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {appData.subjects.map((subject, i) => (
          <Link key={subject.slug} to={`/grade/${id}/subject/${subject.slug}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: subjectColors[i % subjectColors.length],
              borderRadius: common.radius.medium,
              padding: "18px 20px",
              display: "flex", alignItems: "center", gap: "16px",
              boxShadow: `0 4px 16px ${subjectColors[i % subjectColors.length]}55`,
              color: "white",
            }}>
              <div style={{
                width: "54px", height: "54px", borderRadius: "16px",
                background: "rgba(255,255,255,0.25)",
                display: "grid", placeItems: "center",
                fontSize: "28px", flexShrink: 0,
              }}>{subject.icon}</div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>{translateSubject(subject.slug, subject.name)}</div>
                <div style={{ fontSize: "13px", opacity: 0.85, marginTop: "3px" }}>{t.gradeDescription}</div>
              </div>
              <span style={{ marginRight: "auto", fontSize: "22px", opacity: 0.8 }}>›</span>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default GradePage;
