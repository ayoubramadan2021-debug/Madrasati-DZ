import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { common } from "../theme";
import { getLessonById } from "../services/lessonService";
import { getCurrentUser } from "../services/sessionService";
import { addFavorite } from "../services/favoriteService";

function LessonPage({ theme, setThemeName }) {
  const { gradeId, subject, lessonId } = useParams();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteMessage, setFavoriteMessage] = useState("");

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  async function loadLesson() {
    setLoading(true);
    const data = await getLessonById(lessonId);
    setLesson(data);
    setLoading(false);
  }

  async function handleAddFavorite() {
    const user = await getCurrentUser();

    if (!user) {
      setFavoriteMessage("🔐 سجّل الدخول أولًا لحفظ الدرس في المفضلة");
      return;
    }

    await addFavorite({
      userId: user.id,
      itemId: lesson.id,
      itemType: "lesson",
      title: lesson.title,
      subject: lesson.subject,
      grade: lesson.grade,
    });

    setFavoriteMessage("⭐ تم حفظ الدرس في المفضلة");
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName} toast={favoriteMessage}>
      <Link
        to={`/grade/${gradeId}/subject/${subject}/section/lessons`}
        style={backStyle(theme)}
      >
        ⬅️ رجوع للدروس
      </Link>

      {loading ? (
        <div style={cardStyle(theme)}>
          جاري تحميل الدرس...
        </div>
      ) : lesson ? (
        <>
          <section style={heroStyle(theme)}>
            <div style={{ fontSize: "54px" }}>📖</div>

            <h1 style={{ fontSize: "34px", margin: "8px 0", color: theme.text }}>
              {lesson.title}
            </h1>

            <p style={{ color: theme.muted, fontSize: "18px" }}>
              المادة: {lesson.subject} - السنة {lesson.grade}
            </p>
          </section>

          <button onClick={handleAddFavorite} style={buttonStyle(theme)}>
            ⭐ حفظ في المفضلة
          </button>

          {favoriteMessage && (
            <div style={messageBox(theme)}>
              {favoriteMessage}
            </div>
          )}

          <div style={cardStyle(theme)}>
            <h2>🧠 محتوى الدرس</h2>

            <p
              style={{
                color: theme.muted,
                lineHeight: "2",
                fontSize: "18px",
                whiteSpace: "pre-line",
              }}
            >
              {lesson.content}
            </p>
          </div>

          <Link
            to={`/grade/${gradeId}/subject/${subject}/section/exercises`}
            style={{ textDecoration: "none" }}
          >
            <button style={buttonStyle(theme)}>
              ✍️ اذهب إلى التمارين
            </button>
          </Link>
        </>
      ) : (
        <div style={cardStyle(theme)}>
          <h2>الدرس غير موجود</h2>
        </div>
      )}
    </Layout>
  );
}

const backStyle = (theme) => ({
  color: theme.text,
  textDecoration: "none",
  display: "inline-block",
  marginBottom: "18px",
  fontSize: "18px",
  background: theme.surface,
  padding: "10px 14px",
  borderRadius: common.radius.small,
  border: `1px solid ${theme.border}`,
});

const heroStyle = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.large,
  padding: "26px",
  textAlign: "center",
  boxShadow: common.shadow.hero,
});

const cardStyle = (theme) => ({
  marginTop: "18px",
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  padding: "22px",
  borderRadius: common.radius.medium,
  boxShadow: common.shadow.card,
});

const messageBox = (theme) => ({
  marginTop: "14px",
  padding: "14px",
  borderRadius: common.radius.medium,
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  color: theme.text,
  textAlign: "center",
});

const buttonStyle = (theme) => ({
  width: "100%",
  marginTop: "20px",
  padding: "16px",
  border: "none",
  borderRadius: common.radius.medium,
  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
});

export default LessonPage;
