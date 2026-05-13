import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { common } from "../theme";

import { getCurrentUser } from "../services/sessionService";
import { saveProgress } from "../services/progressService";
import { getExerciseById } from "../services/exerciseService";
import { createNotification } from "../services/notificationService";
import { addFavorite } from "../services/favoriteService";

function cleanAnswer(value) {
  return String(value || "")
    .split(":")
    .pop()
    .trim();
}

function ExercisePage({ theme, setThemeName }) {
  const { gradeId, subject, exerciseId } = useParams();

  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState("");

  useEffect(() => {
    loadExercise();
  }, [exerciseId]);

  async function loadExercise() {
    setLoading(true);
    const data = await getExerciseById(exerciseId);
    setExercise(data);
    setLoading(false);
  }

  const isCorrect =
    cleanAnswer(selected) === cleanAnswer(exercise?.correct_answer);

  async function checkAnswer() {
    if (!selected) return;

    setChecked(true);

    if (cleanAnswer(selected) === cleanAnswer(exercise.correct_answer)) {
      const user = await getCurrentUser();

      if (!user) {
        setSaveMessage("ℹ️ سجّل الدخول لحفظ النقاط والتقدم أونلاين");
        return;
      }

      const result = await saveProgress({
        userId: user.id,
        lessonId: `${subject}-exercise-${exerciseId}`,
        points: 10,
      });

      if (result?.alreadyDone) {
        setSaveMessage("✅ إجابة صحيحة، لكن هذا التمرين محسوب سابقًا ولا تُضاف نقاط جديدة");
      } else {
        await createNotification({
          userId: user.id,
          title: "🎉 تمرين مكتمل",
          body: `أحسنت! أكملت تمرين ${exercise.title} وربحت 10 نقاط.`,
        });

        setSaveMessage("✅ إجابة صحيحة وتم حفظ 10 نقاط في حسابك");
      }
    } else {
      setSaveMessage("❌ إجابة غير صحيحة، لن يتم حفظ نقاط");
    }
  }

  async function handleAddFavorite() {
    const user = await getCurrentUser();

    if (!user) {
      setFavoriteMessage("🔐 سجّل الدخول أولًا لحفظ التمرين في المفضلة");
      return;
    }

    await addFavorite({
      userId: user.id,
      itemId: exercise.id,
      itemType: "exercise",
      title: exercise.title,
      subject: exercise.subject,
      grade: exercise.grade,
    });

    setFavoriteMessage("⭐ تم حفظ التمرين في المفضلة");
  }

  function finishExercise() {
    setFinished(true);
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName} toast={favoriteMessage}>
      <Link
        to={`/grade/${gradeId}/subject/${subject}/section/exercises`}
        style={backStyle(theme)}
      >
        ⬅️ رجوع للتمارين
      </Link>

      {loading ? (
        <div style={cardStyle(theme)}>جاري تحميل التمرين...</div>
      ) : !exercise ? (
        <div style={cardStyle(theme)}>
          <h2>التمرين غير موجود</h2>
        </div>
      ) : (
        <>
          <section style={heroStyle(theme)}>
            <div style={{ fontSize: "54px" }}>✍️</div>

            <h1 style={{ fontSize: "30px", margin: "8px 0", color: theme.text }}>
              {exercise.title}
            </h1>

            <p style={{ color: theme.muted, fontSize: "18px" }}>
              المادة: {exercise.subject} - السنة {exercise.grade}
            </p>
          </section>

          <button onClick={handleAddFavorite} style={mainButton(theme, true)}>
            ⭐ حفظ في المفضلة
          </button>

          {favoriteMessage && (
            <div style={messageBox(theme)}>
              {favoriteMessage}
            </div>
          )}

          {!finished ? (
            <div style={cardStyle(theme)}>
              <h2 style={{ lineHeight: "1.8" }}>{exercise.question}</h2>

              <div style={{ marginTop: "20px" }}>
                {(exercise.options || []).map((option) => (
                  <button
                    key={option}
                    disabled={checked}
                    onClick={() => setSelected(option)}
                    style={{
                      width: "100%",
                      marginBottom: "12px",
                      padding: "16px",
                      borderRadius: common.radius.medium,
                      border:
                        String(selected) === String(option)
                          ? `2px solid ${theme.primary}`
                          : `1px solid ${theme.border}`,
                      background:
                        String(selected) === String(option)
                          ? theme.surface2
                          : theme.surface,
                      color: theme.text,
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {!checked ? (
                <button
                  onClick={checkAnswer}
                  disabled={!selected}
                  style={mainButton(theme, !!selected)}
                >
                  تحقق من الإجابة
                </button>
              ) : (
                <>
                  <div
                    style={{
                      marginTop: "18px",
                      padding: "18px",
                      borderRadius: common.radius.medium,
                      background: isCorrect
                        ? "rgba(16,185,129,0.18)"
                        : "rgba(239,68,68,0.18)",
                      border: isCorrect
                        ? "1px solid rgba(16,185,129,0.5)"
                        : "1px solid rgba(239,68,68,0.5)",
                      color: theme.text,
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {isCorrect
                      ? "✅ إجابة صحيحة"
                      : `❌ غير صحيح. الإجابة الصحيحة هي: ${exercise.correct_answer}`}
                  </div>

                  {saveMessage && (
                    <div style={messageBox(theme)}>
                      {saveMessage}
                    </div>
                  )}

                  <button onClick={finishExercise} style={mainButton(theme, true)}>
                    إنهاء التمرين
                  </button>
                </>
              )}
            </div>
          ) : (
            <div style={cardStyle(theme)}>
              <h2 style={{ textAlign: "center" }}>🎉 انتهى التمرين</h2>

              <p style={{ textAlign: "center", fontSize: "22px", color: theme.text }}>
                نتيجتك: {isCorrect ? "1 من 1" : "0 من 1"}
              </p>

              <p style={{ textAlign: "center", color: theme.muted }}>
                {saveMessage}
              </p>

              <Link
                to={`/grade/${gradeId}/subject/${subject}/section/exercises`}
                style={{ textDecoration: "none" }}
              >
                <button style={mainButton(theme, true)}>
                  العودة إلى قائمة التمارين
                </button>
              </Link>
            </div>
          )}
        </>
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

const mainButton = (theme, active) => ({
  width: "100%",
  marginTop: "14px",
  padding: "16px",
  border: "none",
  borderRadius: common.radius.medium,
  background: active
    ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
    : theme.surface2,
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
  opacity: active ? 1 : 0.5,
});

const messageBox = (theme) => ({
  marginTop: "14px",
  padding: "14px",
  borderRadius: common.radius.medium,
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  color: theme.text,
  textAlign: "center",
  lineHeight: "1.7",
});

export default ExercisePage;
