import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { common } from "../theme";
import { getQuizById } from "../services/quizService";
import { getCurrentUser } from "../services/sessionService";
import { saveProgress } from "../services/progressService";

function QuizPage({ theme, setThemeName }) {
  const { gradeId, subject, quizId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  async function loadQuiz() {
    setLoading(true);
    const data = await getQuizById(quizId);
    setQuiz(data);
    setLoading(false);
  }

  const questions = quiz?.questions || [];

  function selectAnswer(index, option) {
    setAnswers({
      ...answers,
      [index]: option,
    });
  }

  function calculateScore() {
    let score = 0;

    questions.forEach((q, index) => {
      if (
        String(answers[index] || "").trim() ===
        String(q.correctAnswer || "").trim()
      ) {
        score += 1;
      }
    });

    return score;
  }

  async function finishQuiz() {
    const score = calculateScore();
    const points = score * 10;

    setFinished(true);

    const user = await getCurrentUser();

    if (!user) {
      setSaveMessage("ℹ️ سجّل الدخول لحفظ نتيجة الاختبار");
      return;
    }

    const result = await saveProgress({
      userId: user.id,
      lessonId: `${subject}-quiz-${quizId}`,
      points,
    });

    if (result?.alreadyDone) {
      setSaveMessage("✅ الاختبار محسوب سابقًا ولا تُضاف نقاط جديدة");
    } else {
      setSaveMessage(`✅ تم حفظ النتيجة وإضافة ${points} نقطة`);
    }
  }

  if (loading) {
    return (
      <Layout theme={theme} setThemeName={setThemeName}>
        <div style={cardStyle(theme)}>جاري تحميل الاختبار...</div>
      </Layout>
    );
  }

  if (!quiz) {
    return (
      <Layout theme={theme} setThemeName={setThemeName}>
        <div style={cardStyle(theme)}>الاختبار غير موجود</div>
      </Layout>
    );
  }

  const score = calculateScore();
  const percent =
    questions.length > 0
      ? Math.round((score / questions.length) * 100)
      : 0;

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <Link
        to={`/grade/${gradeId}/subject/${subject}/section/quizzes`}
        style={backStyle(theme)}
      >
        ⬅️ رجوع للاختبارات
      </Link>

      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "56px" }}>📝</div>

        <h1 style={{ color: theme.text }}>
          {quiz.title}
        </h1>

        <p style={{ color: theme.muted }}>
          المادة: {quiz.subject} - السنة {quiz.grade}
        </p>
      </section>

      {!finished ? (
        <>
          {questions.map((q, index) => (
            <div key={index} style={cardStyle(theme)}>
              <h2 style={{ color: theme.text }}>
                السؤال {index + 1}
              </h2>

              <p
                style={{
                  color: theme.text,
                  fontSize: "20px",
                  lineHeight: "1.8",
                }}
              >
                {q.question}
              </p>

              {(q.options || []).map((option) => (
                <button
                  key={option}
                  onClick={() => selectAnswer(index, option)}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "15px",
                    borderRadius: common.radius.medium,
                    border:
                      answers[index] === option
                        ? `2px solid ${theme.primary}`
                        : `1px solid ${theme.border}`,
                    background:
                      answers[index] === option
                        ? theme.surface2
                        : theme.surface,
                    color: theme.text,
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          ))}

          <button
            onClick={finishQuiz}
            style={mainButton(theme)}
          >
            إنهاء الاختبار
          </button>
        </>
      ) : (
        <div style={cardStyle(theme)}>
          <h2 style={{ color: theme.text, textAlign: "center" }}>
            🎉 انتهى الاختبار
          </h2>

          <p style={resultStyle(theme)}>
            النتيجة: {score} من {questions.length}
          </p>

          <p style={resultStyle(theme)}>
            النسبة: {percent}%
          </p>

          <p style={{ color: theme.muted, textAlign: "center" }}>
            {saveMessage}
          </p>

          <button
            onClick={() => {
              setAnswers({});
              setFinished(false);
              setSaveMessage("");
            }}
            style={mainButton(theme)}
          >
            🔁 إعادة المحاولة
          </button>
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
  padding: "28px",
  textAlign: "center",
  boxShadow: common.shadow.hero,
});

const cardStyle = (theme) => ({
  marginTop: "20px",
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  padding: "22px",
  borderRadius: common.radius.large,
  boxShadow: common.shadow.card,
});

const mainButton = (theme) => ({
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

const resultStyle = (theme) => ({
  color: theme.text,
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
});

export default QuizPage;
