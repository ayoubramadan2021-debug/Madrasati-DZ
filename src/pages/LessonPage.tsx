import { Link, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { common } from "../theme";
import { getCurrentUser } from "../services/sessionService";
import { addFavorite } from "../services/favoriteService";
import { useLessonById } from "../features/lessons";
import { AppButton, AppCard, LoadingState, ErrorState, EmptyState } from "../shared/components/ui";
import { useAppTheme } from "../context/ThemeContext";

function LessonPage() {
  const { theme, setThemeName } = useAppTheme();
  const { gradeId, subject, lessonId } = useParams();

  const {
    data: lesson,
    isLoading,
    isError,
    error,
  } = useLessonById(lessonId);

  async function handleAddFavorite() {
    const user = await getCurrentUser();

    if (!user) {
      alert("🔐 سجّل الدخول أولًا لحفظ الدرس في المفضلة");
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

    alert("⭐ تم حفظ الدرس في المفضلة");
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <Link
        to={`/grade/${gradeId}/subject/${subject}/section/lessons`}
        style={backStyle(theme)}
      >
        ⬅️ رجوع للدروس
      </Link>

      {isLoading ? (
        <LoadingState theme={theme} message="جاري تحميل الدرس..." />
      ) : isError ? (
        <ErrorState
          theme={theme}
          title="حدث خطأ أثناء تحميل الدرس"
          message={error?.message}
        />
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

          <AppButton theme={theme} onClick={handleAddFavorite}>
            ⭐ حفظ في المفضلة
          </AppButton>

          <AppCard theme={theme}>
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
          </AppCard>

          <Link
            to={`/grade/${gradeId}/subject/${subject}/section/exercises`}
            style={{ textDecoration: "none" }}
          >
            <AppButton theme={theme}>
              ✍️ اذهب إلى التمارين
            </AppButton>
          </Link>
        </>
      ) : (
        <EmptyState
          theme={theme}
          title="الدرس غير موجود"
          message="لم يتم العثور على هذا الدرس"
        />
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
