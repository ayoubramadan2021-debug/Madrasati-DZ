import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { common } from "../theme";
import { useLanguage } from "../i18n/LanguageContext";

import { getCurrentUser } from "../services/sessionService";
import { isAdmin } from "../services/adminService";

import { createLesson, getLessons, deleteLesson, updateLesson } from "../services/lessonService";
import { createExercise, getExercises, deleteExercise } from "../services/exerciseService";
import { createQuiz, getQuizzes, deleteQuiz } from "../services/quizService";
import { getAllSupportMessages, replyToSupportMessage } from "../services/supportService";

function AdminPage({ theme, setThemeName }) {
  const { language } = useLanguage();

  const adminText = {
    ar: {
      title: "لوحة الإدارة",
      subtitle: "إدارة الدروس والتمارين والاختبارات",
      checking: "جاري التحقق من الصلاحيات...",
      denied: "الوصول مرفوض",
      deniedText: "هذه الصفحة خاصة بالمدير فقط.",
      lesson: "درس",
      exercise: "تمرين",
      quiz: "اختبار",
      content: "المحتوى",
      support: "دعم",
      stats: "إحصائيات",
      addLesson: "إضافة درس",
      lessonTitle: "عنوان الدرس",
      subject: "المادة",
      grade: "السنة",
      lessonContent: "محتوى الدرس",
      saveLesson: "حفظ الدرس",
      addExercise: "إضافة تمرين",
      exerciseTitle: "عنوان التمرين",
      question: "السؤال",
      saveExercise: "حفظ التمرين",
      addQuiz: "إضافة اختبار",
      saveQuiz: "حفظ الاختبار"
    },
    fr: {
      title: "Panneau d’administration",
      subtitle: "Gérer les leçons, exercices et quiz",
      checking: "Vérification des permissions...",
      denied: "Accès refusé",
      deniedText: "Cette page est réservée à l’administrateur.",
      lesson: "Leçon",
      exercise: "Exercice",
      quiz: "Quiz",
      content: "Contenu",
      support: "Support",
      stats: "Statistiques",
      addLesson: "Ajouter une leçon",
      lessonTitle: "Titre de la leçon",
      subject: "Matière",
      grade: "Année",
      lessonContent: "Contenu de la leçon",
      saveLesson: "Enregistrer la leçon",
      addExercise: "Ajouter un exercice",
      exerciseTitle: "Titre de l’exercice",
      question: "Question",
      saveExercise: "Enregistrer l’exercice",
      addQuiz: "Ajouter un quiz",
      saveQuiz: "Enregistrer le quiz"
    },
    en: {
      title: "Admin Panel",
      subtitle: "Manage lessons, exercises and quizzes",
      checking: "Checking permissions...",
      denied: "Access denied",
      deniedText: "This page is for admins only.",
      lesson: "Lesson",
      exercise: "Exercise",
      quiz: "Quiz",
      content: "Content",
      support: "Support",
      stats: "Stats",
      addLesson: "Add Lesson",
      lessonTitle: "Lesson Title",
      subject: "Subject",
      grade: "Grade",
      lessonContent: "Lesson Content",
      saveLesson: "Save Lesson",
      addExercise: "Add Exercise",
      exerciseTitle: "Exercise Title",
      question: "Question",
      saveExercise: "Save Exercise",
      addQuiz: "Add Quiz",
      saveQuiz: "Save Quiz"
    }
  };

  const at = adminText[language] || adminText.ar;

  const subjectLabels = {
    ar: {
      math: "الرياضيات",
      arabic: "اللغة العربية",
      french: "اللغة الفرنسية",
      islamic: "التربية الإسلامية",
      civic: "التربية المدنية",
      science: "التربية العلمية"
    },
    fr: {
      math: "Mathématiques",
      arabic: "Arabe",
      french: "Français",
      islamic: "Éducation islamique",
      civic: "Éducation civique",
      science: "Sciences"
    },
    en: {
      math: "Mathematics",
      arabic: "Arabic",
      french: "French",
      islamic: "Islamic Education",
      civic: "Civic Education",
      science: "Science"
    }
  };

  const gradeLabels = {
    ar: {
      1: "السنة الأولى",
      2: "السنة الثانية",
      3: "السنة الثالثة",
      4: "السنة الرابعة",
      5: "السنة الخامسة"
    },
    fr: {
      1: "1ère année",
      2: "2ème année",
      3: "3ème année",
      4: "4ème année",
      5: "5ème année"
    },
    en: {
      1: "Grade 1",
      2: "Grade 2",
      3: "Grade 3",
      4: "Grade 4",
      5: "Grade 5"
    }
  };

  const st = subjectLabels[language] || subjectLabels.ar;
  const gt = gradeLabels[language] || gradeLabels.ar;

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [activeTab, setActiveTab] = useState("lesson");
  const [message, setMessage] = useState("");

  const [lessons, setLessons] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [supportMessages, setSupportMessages] = useState([]);
  const [replyText, setReplyText] = useState("");

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonSubject, setLessonSubject] = useState("math");
  const [lessonGrade, setLessonGrade] = useState(1);
  const [lessonContent, setLessonContent] = useState("");
  const [editingLessonId, setEditingLessonId] = useState(null);

  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exerciseSubject, setExerciseSubject] = useState("math");
  const [exerciseGrade, setExerciseGrade] = useState(1);
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [quizTitle, setQuizTitle] = useState("");
  const [quizSubject, setQuizSubject] = useState("math");
  const [quizGrade, setQuizGrade] = useState(1);

  const [q1, setQ1] = useState("");
  const [q1a, setQ1a] = useState("");
  const [q1b, setQ1b] = useState("");
  const [q1c, setQ1c] = useState("");
  const [q1correct, setQ1correct] = useState("");

  const [q2, setQ2] = useState("");
  const [q2a, setQ2a] = useState("");
  const [q2b, setQ2b] = useState("");
  const [q2c, setQ2c] = useState("");
  const [q2correct, setQ2correct] = useState("");

  const [q3, setQ3] = useState("");
  const [q3a, setQ3a] = useState("");
  const [q3b, setQ3b] = useState("");
  const [q3c, setQ3c] = useState("");
  const [q3correct, setQ3correct] = useState("");

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    setLoading(true);

    const user = await getCurrentUser();

    if (!user) {
      setAllowed(false);
      setLoading(false);
      return;
    }

    const admin = await isAdmin(user.id);
    setAllowed(admin);

    if (admin) {
      await loadData();
    }

    setLoading(false);
  }

  async function loadData() {
    setLessons(await getLessons());
    setExercises(await getExercises());
    setQuizzes(await getQuizzes());
    setSupportMessages(await getAllSupportMessages());
  }

  async function handleLessonSubmit(e) {
    e.preventDefault();
    setMessage("");

    const lessonPayload = {
      title: lessonTitle,
      subject: lessonSubject,
      grade: lessonGrade,
      content: lessonContent,
    };

    const result = editingLessonId
      ? await updateLesson(editingLessonId, lessonPayload)
      : await createLesson(lessonPayload);

    if (result.error) {
      setMessage("❌ حدث خطأ أثناء حفظ الدرس");
      return;
    }

    setMessage(editingLessonId ? "✅ تم تعديل الدرس بنجاح" : "✅ تم حفظ الدرس بنجاح");
    setLessonTitle("");
    setLessonContent("");
    setEditingLessonId(null);
    await loadData();
  }

  async function handleExerciseSubmit(e) {
    e.preventDefault();
    setMessage("");

    const result = await createExercise({
      title: exerciseTitle,
      subject: exerciseSubject,
      grade: exerciseGrade,
      question,
      options: [option1, option2, option3, option4],
      correctAnswer,
    });

    if (result.error) {
      setMessage("❌ حدث خطأ أثناء حفظ التمرين");
      return;
    }

    setMessage("✅ تم حفظ التمرين بنجاح");
    setExerciseTitle("");
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectAnswer("");
    await loadData();
  }

  async function handleQuizSubmit(e) {
    e.preventDefault();
    setMessage("");

    const questions = [
      { question: q1, options: [q1a, q1b, q1c], correctAnswer: q1correct },
      { question: q2, options: [q2a, q2b, q2c], correctAnswer: q2correct },
      { question: q3, options: [q3a, q3b, q3c], correctAnswer: q3correct },
    ];

    const result = await createQuiz({
      title: quizTitle,
      subject: quizSubject,
      grade: quizGrade,
      questions,
    });

    if (result.error) {
      setMessage("❌ حدث خطأ أثناء حفظ الاختبار");
      return;
    }

    setMessage("✅ تم حفظ الاختبار بنجاح");
    setQuizTitle("");
    setQ1(""); setQ1a(""); setQ1b(""); setQ1c(""); setQ1correct("");
    setQ2(""); setQ2a(""); setQ2b(""); setQ2c(""); setQ2correct("");
    setQ3(""); setQ3a(""); setQ3b(""); setQ3c(""); setQ3correct("");
    await loadData();
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "56px" }}>🧑‍🏫</div>
        <h1 style={{ color: theme.text }}>{at.title}</h1>
        <p style={{ color: theme.muted }}>{at.subtitle}</p>
      </section>

      {loading ? (
        <div style={cardStyle(theme)}>{at.checking}</div>
      ) : !allowed ? (
        <div style={cardStyle(theme)}>
          <h2>🚫 {at.denied}</h2>
          <p style={{ color: theme.muted }}>{at.deniedText}</p>
        </div>
      ) : (
        <>
          <div style={tabsStyle}>
            <button onClick={() => setActiveTab("lesson")} style={tabButton(theme, activeTab === "lesson")}>📖 {at.lesson}</button>
            <button onClick={() => setActiveTab("exercise")} style={tabButton(theme, activeTab === "exercise")}>✍️ {at.exercise}</button>
            <button onClick={() => setActiveTab("quiz")} style={tabButton(theme, activeTab === "quiz")}>📝 {at.quiz}</button>
            <button onClick={() => setActiveTab("content")} style={tabButton(theme, activeTab === "content")}>📚 {at.content}</button>
            <button onClick={() => setActiveTab("support")} style={tabButton(theme, activeTab === "support")}>💬 {at.support}</button>
            <button onClick={() => setActiveTab("stats")} style={tabButton(theme, activeTab === "stats")}>📊 {at.stats}</button>
          </div>

          {activeTab === "lesson" && (
            <form onSubmit={handleLessonSubmit} style={cardStyle(theme)}>
              <h2 style={{ color: theme.text }}>{editingLessonId ? "✏️ تعديل الدرس" : "📖 " + at.addLesson}</h2>
              <label style={labelStyle(theme)}>{at.lessonTitle}</label>
              <input required value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} style={inputStyle(theme)} />

              <label style={labelStyle(theme)}>{at.subject}</label>
              <select value={lessonSubject} onChange={(e) => setLessonSubject(e.target.value)} style={inputStyle(theme)}>
                <option value="math">{st.math}</option>
                <option value="arabic">{st.arabic}</option>
                <option value="french">{st.french}</option>
                <option value="islamic">{st.islamic}</option>
                <option value="civic">{st.civic}</option>
                <option value="science">{st.science}</option>
              </select>

              <label style={labelStyle(theme)}>{at.grade}</label>
              <select value={lessonGrade} onChange={(e) => setLessonGrade(e.target.value)} style={inputStyle(theme)}>
                <option value="1">{gt[1]}</option>
                <option value="2">{gt[2]}</option>
                <option value="3">{gt[3]}</option>
                <option value="4">{gt[4]}</option>
                <option value="5">{gt[5]}</option>
              </select>

              <label style={labelStyle(theme)}>{at.lessonContent}</label>
              <textarea required rows="7" value={lessonContent} onChange={(e) => setLessonContent(e.target.value)} style={{ ...inputStyle(theme), lineHeight: "1.8" }} />

              <button style={buttonStyle(theme)}>💾 {at.saveLesson}</button>
            </form>
          )}

          {activeTab === "exercise" && (
            <form onSubmit={handleExerciseSubmit} style={cardStyle(theme)}>
              <h2 style={{ color: theme.text }}>✍️ {at.addExercise}</h2>
              <label style={labelStyle(theme)}>{at.exerciseTitle}</label>
              <input required value={exerciseTitle} onChange={(e) => setExerciseTitle(e.target.value)} style={inputStyle(theme)} />

              <label style={labelStyle(theme)}>{at.subject}</label>
              <select value={exerciseSubject} onChange={(e) => setExerciseSubject(e.target.value)} style={inputStyle(theme)}>
                <option value="math">{st.math}</option>
                <option value="arabic">{st.arabic}</option>
                <option value="french">{st.french}</option>
                <option value="islamic">{st.islamic}</option>
                <option value="civic">{st.civic}</option>
                <option value="science">{st.science}</option>
              </select>

              <label style={labelStyle(theme)}>{at.grade}</label>
              <select value={exerciseGrade} onChange={(e) => setExerciseGrade(e.target.value)} style={inputStyle(theme)}>
                <option value="1">{gt[1]}</option>
                <option value="2">{gt[2]}</option>
                <option value="3">{gt[3]}</option>
                <option value="4">{gt[4]}</option>
                <option value="5">{gt[5]}</option>
              </select>

              <label style={labelStyle(theme)}>{at.question}</label>
              <input required value={question} onChange={(e) => setQuestion(e.target.value)} style={inputStyle(theme)} />

              <label style={labelStyle(theme)}>الاختيار 1</label>
              <input required value={option1} onChange={(e) => setOption1(e.target.value)} style={inputStyle(theme)} />
              <label style={labelStyle(theme)}>الاختيار 2</label>
              <input required value={option2} onChange={(e) => setOption2(e.target.value)} style={inputStyle(theme)} />
              <label style={labelStyle(theme)}>الاختيار 3</label>
              <input required value={option3} onChange={(e) => setOption3(e.target.value)} style={inputStyle(theme)} />
              <label style={labelStyle(theme)}>الاختيار 4</label>
              <input required value={option4} onChange={(e) => setOption4(e.target.value)} style={inputStyle(theme)} />

              <label style={labelStyle(theme)}>الإجابة الصحيحة</label>
              <input required value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} style={inputStyle(theme)} />

              <button style={buttonStyle(theme)}>💾 {at.saveExercise}</button>
            </form>
          )}

          {activeTab === "quiz" && (
            <form onSubmit={handleQuizSubmit} style={cardStyle(theme)}>
              <h2 style={{ color: theme.text }}>📝 {at.addQuiz}</h2>

              <label style={labelStyle(theme)}>عنوان الاختبار</label>
              <input required value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} style={inputStyle(theme)} />

              <label style={labelStyle(theme)}>{at.subject}</label>
              <select value={quizSubject} onChange={(e) => setQuizSubject(e.target.value)} style={inputStyle(theme)}>
                <option value="math">{st.math}</option>
                <option value="arabic">{st.arabic}</option>
                <option value="french">{st.french}</option>
                <option value="islamic">{st.islamic}</option>
                <option value="civic">{st.civic}</option>
                <option value="science">{st.science}</option>
              </select>

              <label style={labelStyle(theme)}>{at.grade}</label>
              <select value={quizGrade} onChange={(e) => setQuizGrade(e.target.value)} style={inputStyle(theme)}>
                <option value="1">{gt[1]}</option>
                <option value="2">{gt[2]}</option>
                <option value="3">{gt[3]}</option>
                <option value="4">{gt[4]}</option>
                <option value="5">{gt[5]}</option>
              </select>

              <h3 style={{ color: theme.text }}>{at.question} 1</h3>
              <input required placeholder={at.question} value={q1} onChange={(e) => setQ1(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="اختيار 1" value={q1a} onChange={(e) => setQ1a(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="اختيار 2" value={q1b} onChange={(e) => setQ1b(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="اختيار 3" value={q1c} onChange={(e) => setQ1c(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="الإجابة الصحيحة" value={q1correct} onChange={(e) => setQ1correct(e.target.value)} style={inputStyle(theme)} />

              <h3 style={{ color: theme.text }}>{at.question} 2</h3>
              <input required placeholder={at.question} value={q2} onChange={(e) => setQ2(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="اختيار 1" value={q2a} onChange={(e) => setQ2a(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="اختيار 2" value={q2b} onChange={(e) => setQ2b(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="اختيار 3" value={q2c} onChange={(e) => setQ2c(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="الإجابة الصحيحة" value={q2correct} onChange={(e) => setQ2correct(e.target.value)} style={inputStyle(theme)} />

              <h3 style={{ color: theme.text }}>{at.question} 3</h3>
              <input required placeholder={at.question} value={q3} onChange={(e) => setQ3(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="اختيار 1" value={q3a} onChange={(e) => setQ3a(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="اختيار 2" value={q3b} onChange={(e) => setQ3b(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="اختيار 3" value={q3c} onChange={(e) => setQ3c(e.target.value)} style={inputStyle(theme)} />
              <input required placeholder="الإجابة الصحيحة" value={q3correct} onChange={(e) => setQ3correct(e.target.value)} style={inputStyle(theme)} />

              <button style={buttonStyle(theme)}>💾 {at.saveQuiz}</button>
            </form>
          )}

          {activeTab === "content" && (
            <div style={cardStyle(theme)}>
              <h2 style={{ color: theme.text }}>📚 {at.content} الحالي</h2>

              <div style={statBox(theme)}>📚 الدروس: {lessons.length}</div>
              <div style={statBox(theme)}>✍️ التمارين: {exercises.length}</div>
              <div style={statBox(theme)}>📝 الاختبارات: {quizzes.length}</div>

              <h3 style={{ color: theme.text, marginTop: "22px" }}>📖 الدروس</h3>

              {lessons.length === 0 ? (
                <p style={{ color: theme.muted }}>لا توجد دروس بعد.</p>
              ) : (
                lessons.map((lesson) => (
                  <div key={lesson.id} style={contentItem(theme)}>
                    <div style={{ width: "100%" }}>
                      <strong>{lesson.title}</strong>
                      <p style={{ color: theme.muted }}>
                        {lesson.subject} - السنة {lesson.grade}
                      </p>

                      <p style={{ color: theme.muted, lineHeight: "1.8" }}>
                        {String(lesson.content || "").slice(0, 120)}...
                      </p>

                      <button
                        onClick={() => {
                          setActiveTab("lesson");
                          setEditingLessonId(lesson.id);
                          setLessonTitle(lesson.title || "");
                          setLessonSubject(lesson.subject || "math");
                          setLessonGrade(lesson.grade || 1);
                          setLessonContent(lesson.content || "");
                          setMessage("✏️ يمكنك الآن تعديل الدرس ثم الضغط على حفظ التعديل");
                        }}
                        style={smallButton(theme)}
                      >
                        ✏️ تعديل
                      </button>

                      <button
                        onClick={async () => {
                          const ok = confirm("هل تريد حذف هذا الدرس؟");
                          if (!ok) return;

                          await deleteLesson(lesson.id);
                          setMessage("🗑️ تم حذف الدرس");
                          await loadData();
                        }}
                        style={dangerButton(theme)}
                      >
                        🗑️ حذف
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}


          {activeTab === "support" && (
            <div style={cardStyle(theme)}>
              <h2 style={{ color: theme.text }}>💬 رسائل الدعم</h2>

              {supportMessages.length === 0 ? (
                <p style={{ color: theme.muted }}>لا توجد رسائل دعم بعد.</p>
              ) : (
                supportMessages.map((item) => (
                  <div key={item.id} style={contentItem(theme)}>
                    <div style={{ width: "100%" }}>
                      <strong>من: {item.email}</strong>

                      <p style={{ color: theme.muted, lineHeight: "1.8" }}>
                        {item.message}
                      </p>

                      {item.reply && (
                        <p style={{ color: theme.muted }}>
                          ✅ الرد: {item.reply}
                        </p>
                      )}

                      {!item.reply && (
                        <>
                          <textarea
                            rows="3"
                            placeholder="اكتب رد الإدارة هنا..."
                            onChange={(e) => setReplyText(e.target.value)}
                            style={{
                              ...inputStyle(theme),
                              lineHeight: "1.8",
                            }}
                          />

                          <button
                            onClick={async () => {
                              await replyToSupportMessage({
                                id: item.id,
                                reply: replyText,
                              });

                              setReplyText("");
                              setMessage("✅ تم إرسال الرد");
                              await loadData();
                            }}
                            style={buttonStyle(theme)}
                          >
                            إرسال الرد
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "stats" && (
            <div style={cardStyle(theme)}>
              <h2 style={{ color: theme.text }}>📊 {at.stats} الإدارة</h2>
              <div style={statBox(theme)}>📚 عدد الدروس: {lessons.length}</div>
              <div style={statBox(theme)}>✍️ عدد التمارين: {exercises.length}</div>
              <div style={statBox(theme)}>📝 عدد الاختبارات: {quizzes.length}</div>
            </div>
          )}

          {message && <div style={messageStyle(theme)}>{message}</div>}
        </>
      )}
    </Layout>
  );
}

const tabsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: "8px",
  marginTop: "22px",
};

const tabButton = (theme, active) => ({
  padding: "12px",
  borderRadius: common.radius.medium,
  border: `1px solid ${theme.border}`,
  background: active
    ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
    : theme.surface,
  color: active ? "white" : theme.text,
  fontWeight: "bold",
  fontSize: "12px",
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
  marginTop: "22px",
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  padding: "22px",
  borderRadius: common.radius.large,
  boxShadow: common.shadow.card,
});

const labelStyle = (theme) => ({
  display: "block",
  marginTop: "14px",
  marginBottom: "8px",
  color: theme.text,
  fontWeight: "bold",
});

const inputStyle = (theme) => ({
  width: "100%",
  marginTop: "8px",
  padding: "15px",
  borderRadius: common.radius.medium,
  border: `1px solid ${theme.border}`,
  background: theme.surface2,
  color: theme.text,
  fontSize: "17px",
  outline: "none",
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

const contentItem = (theme) => ({
  marginTop: "14px",
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  padding: "16px",
  borderRadius: common.radius.medium,
  color: theme.text,
});

const statBox = (theme) => ({
  marginTop: "14px",
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  padding: "18px",
  borderRadius: common.radius.medium,
  color: theme.text,
  fontSize: "20px",
  fontWeight: "bold",
});

const messageStyle = (theme) => ({
  marginTop: "16px",
  padding: "14px",
  borderRadius: common.radius.medium,
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  color: theme.text,
});

export default AdminPage;


const smallButton = (theme) => ({
  marginTop: "10px",
  marginLeft: "8px",
  padding: "10px 14px",
  borderRadius: common.radius.medium,
  border: "none",
  background: theme.primary,
  color: "white",
  fontWeight: "bold"
});

const dangerButton = (theme) => ({
  marginTop: "10px",
  padding: "10px 14px",
  borderRadius: common.radius.medium,
  border: "none",
  background: "#dc2626",
  color: "white",
  fontWeight: "bold"
});
