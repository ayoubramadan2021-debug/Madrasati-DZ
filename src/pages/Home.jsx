import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { common } from "../theme";
import appData from "../data/appData";
import { supabase } from "../lib/supabaseClient";
import { getCurrentUser } from "../services/sessionService";
import { getUserProgress } from "../services/progressService";
import { useLanguage } from "../i18n/LanguageContext";

const gradeColors = ["#16a34a","#f97316","#3b82f6","#8b5cf6","#ec4899","#14b8a6"];

function Home({ theme, setThemeName }) {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [onlineProgress, setOnlineProgress] = useState([]);

  useEffect(() => { loadUserAndProgress(); }, []);

  async function loadUserAndProgress() {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", currentUser.id)
        .single();
      if (profile?.full_name) setFullName(profile.full_name);
      const progressData = await getUserProgress(currentUser.id);
      setOnlineProgress(progressData);
    }
  }

  const totalExercises = appData.subjects.reduce((sum, s) => sum + s.exercises.length, 0);
  const totalLessons = appData.subjects.reduce((sum, s) => sum + s.lessons.length, 0);
  const onlinePoints = onlineProgress.reduce((sum, i) => sum + Number(i.points || 0), 0);
  const completedOnline = onlineProgress.filter((i) => i.completed).length;
  const progressPercent = totalExercises > 0 ? Math.round((completedOnline / totalExercises) * 100) : 0;

  const displayName = fullName || (user ? user.email.split("@")[0] : "");
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


  const stats = [
    { title: t.average, value: onlinePoints, icon: "🎓", color: "#16a34a", bg: "#dcfce7" },
    { title: t.absence, value: 0, icon: "📅", color: "#f97316", bg: "#fff7ed" },
    { title: t.completed, value: completedOnline, icon: "📋", color: "#3b82f6", bg: "#eff6ff" },
    { title: t.progress, value: progressPercent + "%", icon: "🏆", color: "#8b5cf6", bg: "#f5f3ff" },
  ];

  const services = [
    { to: "/progress", label: t.progress, icon: "📈", color: "#16a34a" },
    { to: "/favorites", label: t.favorites, icon: "💚", color: "#f97316" },
    { to: "/leaderboard", label: t.leaderboard, icon: "🏆", color: "#3b82f6" },
    { to: "/ai-tutor", label: t.aiTutor, icon: "🤖", color: "#8b5cf6" },
  ];

  const filteredGrades = appData.grades.filter((g) => g.name.includes(search));
  const filteredSubjects = appData.subjects.filter((s) => s.name.includes(search));
  const filteredLessons = appData.subjects.flatMap((s) =>
    s.lessons.filter((l) => l.title.includes(search)).map((l) => ({
      ...l, subjectName: s.name, subjectSlug: s.slug
    }))
  );

  return (
    <Layout theme={theme} setThemeName={setThemeName}>

      <div style={{
        background: "linear-gradient(135deg, " + theme.primary + ", " + theme.secondary + ")",
        borderRadius: common.radius.large,
        padding: "24px 20px", marginBottom: "16px",
        color: "white", display: "flex", alignItems: "center", gap: "16px",
      }}>
        <div style={{
          width: "70px", height: "70px", borderRadius: "50%",
          background: "rgba(255,255,255,0.25)",
          display: "grid", placeItems: "center", fontSize: "36px",
          border: "3px solid rgba(255,255,255,0.4)", flexShrink: 0,
        }}>🏫</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "13px", opacity: 0.85 }}>{t.welcome} 👋</div>
          <div style={{ fontSize: "20px", fontWeight: "bold", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "normal" }}>
            {user ? displayName : t.appName}
          </div>
          <div style={{ fontSize: "12px", opacity: 0.8 }}>{t.smartPlatform}</div>
        </div>
        {!user && (
          <Link to="/auth" style={{
            background: "rgba(255,255,255,0.25)", color: "white",
            padding: "8px 14px", borderRadius: "20px",
            textDecoration: "none", fontSize: "13px", fontWeight: "bold",
            border: "1px solid rgba(255,255,255,0.4)", flexShrink: 0,
          }}>{t.login}</Link>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "20px" }}>
        {stats.map((item) => (
          <div key={item.title} style={{
            background: theme.surface, borderRadius: common.radius.medium,
            padding: "14px 8px", textAlign: "center",
            boxShadow: theme.cardShadow, border: "1px solid " + theme.border,
          }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "50%",
              background: item.bg, margin: "0 auto 8px",
              display: "grid", placeItems: "center", fontSize: "20px",
            }}>{item.icon}</div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: item.color }}>{item.value}</div>
            <div style={{ fontSize: "11px", color: theme.muted }}>{item.title}</div>
          </div>
        ))}
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t.searchPlaceholder}
        style={{
          width: "100%", padding: "14px 16px",
          borderRadius: common.radius.full,
          border: "1px solid " + theme.border,
          background: theme.surface, color: theme.text,
          fontSize: "16px", outline: "none",
          boxSizing: "border-box", marginBottom: "20px",
        }}
      />

      {!search && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h2 style={{ color: theme.text, margin: 0, fontSize: "20px" }}>{t.services}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "24px" }}>
            {services.map((s) => (
              <Link key={s.to} to={s.to} style={{ textDecoration: "none" }}>
                <div style={{
                  background: s.color, borderRadius: common.radius.medium,
                  padding: "20px 16px", display: "flex", alignItems: "center", gap: "12px",
                  color: "white",
                }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "14px",
                    background: "rgba(255,255,255,0.25)",
                    display: "grid", placeItems: "center", fontSize: "24px",
                  }}>{s.icon}</div>
                  <span style={{ fontWeight: "bold", fontSize: "16px" }}>{s.label}</span>
                </div>
              </Link>
            ))}
          </div>

          <h2 style={{ color: theme.text, margin: "0 0 12px", fontSize: "20px" }}>{t.schoolYears}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {appData.grades.map((grade, i) => (
              <Link key={grade.id} to={"/grade/" + grade.id} style={{ textDecoration: "none" }}>
                <div style={{
                  background: gradeColors[i % gradeColors.length],
                  borderRadius: common.radius.medium, padding: "18px 20px",
                  display: "flex", alignItems: "center", gap: "16px", color: "white",
                }}>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "16px",
                    background: "rgba(255,255,255,0.25)",
                    display: "grid", placeItems: "center", fontSize: "28px", flexShrink: 0,
                  }}>🎒</div>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>{translateGradeName(grade.name)}</div>
                    <div style={{ fontSize: "13px", opacity: 0.85 }}>{t.gradeDescription}</div>
                  </div>
                  <span style={{ marginRight: "auto", fontSize: "22px", opacity: 0.8 }}>›</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {search && (
        <div>
          <h2 style={{ color: theme.text }}>نتائج البحث</h2>
          {filteredGrades.length === 0 && filteredSubjects.length === 0 && filteredLessons.length === 0 && (
            <div style={{ background: theme.surface, border: "1px solid " + theme.border, padding: "18px", borderRadius: common.radius.medium, color: theme.muted }}>
              لا توجد نتائج مطابقة.
            </div>
          )}
          {filteredGrades.map((grade, i) => (
            <Link key={grade.id} to={"/grade/" + grade.id} style={{ textDecoration: "none", display: "block", marginBottom: "10px" }}>
              <div style={{ background: gradeColors[i % gradeColors.length], borderRadius: common.radius.medium, padding: "16px 20px", color: "white", fontWeight: "bold", fontSize: "18px" }}>
                🎒 {translateGradeName(grade.name)}
              </div>
            </Link>
          ))}
          {filteredSubjects.map((subject) => (
            <Link key={subject.slug} to={"/grade/1/subject/" + subject.slug} style={{ textDecoration: "none", display: "block", marginBottom: "10px" }}>
              <div style={{ background: theme.surface, border: "1px solid " + theme.border, borderRight: "6px solid " + theme.primary, borderRadius: common.radius.medium, padding: "16px 20px", color: theme.text, fontWeight: "bold", fontSize: "18px" }}>
                {subject.icon} {subject.name}
              </div>
            </Link>
          ))}
          {filteredLessons.map((lesson) => (
            <Link key={lesson.subjectSlug + "-" + lesson.id} to={"/grade/1/subject/" + lesson.subjectSlug + "/lesson/" + lesson.id} style={{ textDecoration: "none", display: "block", marginBottom: "10px" }}>
              <div style={{ background: theme.surface, border: "1px solid " + theme.border, borderRight: "6px solid " + theme.secondary, borderRadius: common.radius.medium, padding: "16px 20px", color: theme.text, fontWeight: "bold" }}>
                📖 {lesson.title}
                <div style={{ fontSize: "13px", marginTop: "4px", color: theme.muted }}>{lesson.subjectName}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Home;