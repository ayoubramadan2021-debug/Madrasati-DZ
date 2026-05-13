import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { common } from "../theme";

import { getLessons } from "../services/lessonService";
import { getExercises } from "../services/exerciseService";

function SearchPage({ theme, setThemeName }) {
  const [query, setQuery] = useState("");
  const [lessons, setLessons] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    setLoading(true);
    setLessons(await getLessons());
    setExercises(await getExercises());
    setLoading(false);
  }

  const cleanQuery = query.trim().toLowerCase();

  const filteredLessons = lessons.filter((lesson) =>
    `${lesson.title} ${lesson.content} ${lesson.subject} ${lesson.grade}`
      .toLowerCase()
      .includes(cleanQuery)
  );

  const filteredExercises = exercises.filter((exercise) =>
    `${exercise.title} ${exercise.question} ${exercise.subject} ${exercise.grade}`
      .toLowerCase()
      .includes(cleanQuery)
  );

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "56px" }}>🔎</div>

        <h1 style={{ color: theme.text }}>البحث</h1>

        <p style={{ color: theme.muted }}>
          ابحث عن درس أو تمرين داخل المنصة
        </p>
      </section>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="اكتب كلمة البحث..."
        style={inputStyle(theme)}
      />

      {loading ? (
        <div style={cardStyle(theme)}>جاري تحميل المحتوى...</div>
      ) : !query ? (
        <div style={cardStyle(theme)}>
          <p style={{ color: theme.muted }}>
            اكتب في مربع البحث لعرض النتائج.
          </p>
        </div>
      ) : (
        <>
          <div style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>
              📖 الدروس: {filteredLessons.length}
            </h2>

            {filteredLessons.length === 0 ? (
              <p style={{ color: theme.muted }}>لا توجد دروس مطابقة.</p>
            ) : (
              filteredLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/grade/${lesson.grade}/subject/${lesson.subject}/lesson/${lesson.id}`}
                  style={{ textDecoration: "none", color: theme.text }}
                >
                  <div style={resultItem(theme, "#8b5cf6")}>
                    <strong>{lesson.title}</strong>
                    <p style={{ color: theme.muted }}>
                      المادة: {lesson.subject} | السنة: {lesson.grade}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>
              ✍️ التمارين: {filteredExercises.length}
            </h2>

            {filteredExercises.length === 0 ? (
              <p style={{ color: theme.muted }}>لا توجد تمارين مطابقة.</p>
            ) : (
              filteredExercises.map((exercise) => (
                <Link
                  key={exercise.id}
                  to={`/grade/${exercise.grade}/subject/${exercise.subject}/exercise/${exercise.id}`}
                  style={{ textDecoration: "none", color: theme.text }}
                >
                  <div style={resultItem(theme, "#10b981")}>
                    <strong>{exercise.title}</strong>
                    <p style={{ color: theme.muted }}>
                      {exercise.question}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

const heroStyle = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.large,
  padding: "28px",
  textAlign: "center",
  boxShadow: common.shadow.hero,
});

const inputStyle = (theme) => ({
  width: "100%",
  marginTop: "22px",
  padding: "16px",
  borderRadius: common.radius.medium,
  border: `1px solid ${theme.border}`,
  background: theme.surface2,
  color: theme.text,
  fontSize: "18px",
  outline: "none",
});

const cardStyle = (theme) => ({
  marginTop: "22px",
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  padding: "22px",
  borderRadius: common.radius.large,
  boxShadow: common.shadow.card,
});

const resultItem = (theme, color) => ({
  marginTop: "12px",
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  borderRight: `8px solid ${color}`,
  padding: "16px",
  borderRadius: common.radius.medium,
  color: theme.text,
});

export default SearchPage;
