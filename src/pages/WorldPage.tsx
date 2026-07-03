import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import { getWorldById, getWorldLessons } from "../services/worldsService";
import { supabase } from "../lib/supabaseClient";
import { getV2Key } from "../features/lesson-v2/v2Registry";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";

function cleanTitle(s: string): string {
  if (!s) return s;
  return s
    .replace(/[\u064B-\u0652\u0670]/g, "")
    .replace(/ستة/g, "6")
    .replace(/تسعة/g, "9");
}

function getExercisesPath(index: number) {
  const lessonNum = index + 1;
  if (lessonNum === 1) return "/lesson-exercises";
  return `/lesson${lessonNum}-exercises`;
}

export default function WorldPage() {
  const { t, lang } = useLang();
  const { worldId } = useParams();
  const navigate = useNavigate();

  const [world, setWorld] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [introChecked, setIntroChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tm = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(tm);
  }, []);

  useEffect(() => {
    if (!worldId) return;

    setLoading(true);

    Promise.all([getWorldById(worldId), getWorldLessons(worldId)])
      .then(async ([w, ls]) => {
        setWorld(w);
        setLessons(ls);

        if (w?.intro_content) {
          const { data: userData } = await supabase.auth.getUser();

          if (userData?.user) {
            const { data: viewed } = await supabase
              .from("world_intro_views")
              .select("viewed_at")
              .eq("user_id", userData.user.id)
              .eq("world_id", w.id)
              .maybeSingle();

            if (!viewed) setShowIntro(true);
          }
        }

        setIntroChecked(true);
      })
      .catch((e) => console.error("خطأ تحميل العالم:", e))
      .finally(() => setLoading(false));
  }, [worldId]);

  const title = world
    ? lang === "fr" && world.title_fr
      ? world.title_fr
      : world.title_ar
    : "";

  const handleIntroDone = async () => {
    setShowIntro(false);

    if (isReplay) {
      setIsReplay(false);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();

    if (userData?.user && world) {
      await supabase.from("world_intro_views").upsert(
        {
          user_id: userData.user.id,
          world_id: world.id,
        },
        { onConflict: "user_id,world_id" },
      );
    }
  };

  const handleReplayIntro = () => {
    setIsReplay(true);
    setShowIntro(true);
  };

  if (showIntro && world?.intro_content) {
    return (
      <WorldIntroSceneV2
        audio_base={world.intro_content.audio_base}
        slides={world.intro_content.slides}
        onDone={handleIntroDone}
      />
    );
  }

  return (
    <main dir="rtl" style={styles.page}>
      <style>{`
        @keyframes worldCardIn {
          from { opacity: 0; transform: translateY(14px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes worldIconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(3deg); }
        }

        @keyframes worldShine {
          0% { transform: translateX(130%) rotate(18deg); opacity: 0; }
          35% { opacity: .45; }
          100% { transform: translateX(-130%) rotate(18deg); opacity: 0; }
        }
      `}</style>

      <div style={styles.bgOrbOne} />
      <div style={styles.bgOrbTwo} />

      <section style={styles.content}>
        <header style={styles.topBar}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            ← {t("btn_back")}
          </button>

          {world?.intro_content && (
            <button onClick={handleReplayIntro} style={styles.introBtn}>
              🎬 المقدمة
            </button>
          )}
        </header>

        <section style={styles.hero}>
          <div style={styles.heroShine} />
          <div style={styles.worldIcon}>{world?.icon || "🌟"}</div>

          <div style={styles.heroText}>
            <div style={styles.heroLabel}>عالم التعلّم</div>
            <h1 style={styles.title}>{title || "عالم المدرسة"}</h1>
            <p style={styles.subtitle}>
              اختر درسًا، شاهد الشرح، ثم أنجز التمارين.
            </p>
          </div>

          <div style={styles.statsRow}>
            <div style={styles.statPill}>📚 {lessons.length} درس</div>
            <div style={styles.statPill}>✨ نسخة محسّنة</div>
          </div>
        </section>

        {loading ? (
          <div style={styles.loadingBox}>⏳ جارٍ تحميل الدروس...</div>
        ) : lessons.length === 0 ? (
          <div style={styles.emptyBox}>
            <div style={{ fontSize: 46, marginBottom: 8 }}>📭</div>
            لا توجد دروس في هذا العالم بعد.
          </div>
        ) : (
          <section style={styles.lessonsList}>
            {lessons.map((lesson, i) => {
              const v2Key = getV2Key(lesson.id);
              const lessonTitle =
                lang === "fr" && lesson.title_fr
                  ? lesson.title_fr
                  : cleanTitle(lesson.title);

              const lessonPath = v2Key ? `/lesson-v2/${v2Key}` : `/lesson/${lesson.id}`;
              const exercisesPath = getExercisesPath(i);

              return (
                <article
                  key={lesson.id}
                  style={{
                    ...styles.lessonCard,
                    opacity: mounted ? 1 : 0,
                    animation: mounted
                      ? `worldCardIn .42s ease ${i * 0.05}s both`
                      : "none",
                  }}
                >
                  <button
                    onClick={() => navigate(lessonPath)}
                    style={styles.lessonMainBtn}
                  >
                    <div style={styles.lessonNumber}>{i + 1}</div>

                    <div style={styles.lessonInfo}>
                      <div style={styles.lessonMeta}>الدَّرْسُ {i + 1}</div>
                      <div style={styles.lessonTitle}>{lessonTitle}</div>
                    </div>

                    <div style={styles.arrow}>‹</div>
                  </button>

                  <div style={styles.lessonActions}>
                    <button
                      onClick={() => navigate(lessonPath)}
                      style={styles.studyBtn}
                    >
                      شرح الدرس ▶
                    </button>

                    <button
                      onClick={() => navigate(exercisesPath)}
                      style={styles.exerciseBtn}
                    >
                      التمارين 🧩
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {!loading && lessons.length > 0 && (
          <section style={styles.quizCard}>
            <div style={styles.quizIcon}>🏆</div>
            <div style={styles.quizTitle}>اِخْتَبِرْ مَعْرِفَتَكَ!</div>
            <div style={styles.quizText}>
              أنجز دروس هذا العالم، ثم جرّب اختبار العالم.
            </div>

            <button
              onClick={() => navigate(`/world/${worldId}/quiz`)}
              style={styles.quizBtn}
            >
              ابدأ اختبار العالم 🎯
            </button>
          </section>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    width: "100%",
    background:
      "radial-gradient(circle at top,#18396f 0%,#08182f 44%,#06101f 100%)",
    fontFamily: "Tajawal, sans-serif",
    direction: "rtl",
    color: "#fff",
    position: "relative",
    overflowX: "hidden",
    paddingBottom: 98,
    boxSizing: "border-box",
  },

  bgOrbOne: {
    position: "fixed",
    top: -140,
    left: -100,
    width: 320,
    height: 320,
    borderRadius: "50%",
    background: "radial-gradient(circle,rgba(232,160,32,.22),transparent 70%)",
    pointerEvents: "none",
  },

  bgOrbTwo: {
    position: "fixed",
    bottom: 50,
    right: -120,
    width: 360,
    height: 360,
    borderRadius: "50%",
    background: "radial-gradient(circle,rgba(124,58,237,.20),transparent 70%)",
    pointerEvents: "none",
  },

  content: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: 520,
    margin: "0 auto",
    padding: "18px 14px 0",
    boxSizing: "border-box",
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 14,
  },

  backBtn: {
    background: "rgba(255,255,255,.12)",
    border: "1px solid rgba(255,255,255,.18)",
    color: "#fff",
    borderRadius: 14,
    padding: "9px 14px",
    fontSize: 13,
    fontWeight: 900,
    fontFamily: "Tajawal, sans-serif",
    cursor: "pointer",
  },

  introBtn: {
    background: "linear-gradient(135deg,#E8A020,#F4B942)",
    color: "#102447",
    border: "none",
    borderRadius: 14,
    padding: "9px 14px",
    fontSize: 13,
    fontWeight: 900,
    fontFamily: "Tajawal, sans-serif",
    cursor: "pointer",
    boxShadow: "0 7px 16px rgba(232,160,32,.35)",
  },

  hero: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 28,
    border: "2px solid rgba(232,160,32,.45)",
    background:
      "linear-gradient(145deg,rgba(255,248,236,.98),rgba(255,238,194,.96))",
    color: "#0F2447",
    padding: "20px 16px 16px",
    boxShadow: "0 18px 40px rgba(0,0,0,.28)",
    marginBottom: 16,
    textAlign: "center",
  },

  heroShine: {
    position: "absolute",
    top: -80,
    right: -30,
    width: 70,
    height: 330,
    background:
      "linear-gradient(90deg,transparent,rgba(255,255,255,.9),transparent)",
    animation: "worldShine 3s ease-in-out infinite",
    pointerEvents: "none",
  },

  worldIcon: {
    width: 86,
    height: 86,
    margin: "0 auto 10px",
    borderRadius: 28,
    background: "linear-gradient(145deg,#1B3A6B,#0F2447)",
    border: "3px solid #E8A020",
    display: "grid",
    placeItems: "center",
    fontSize: 44,
    boxShadow: "0 12px 24px rgba(27,58,107,.25)",
    animation: "worldIconFloat 3s ease-in-out infinite",
  },

  heroText: {
    position: "relative",
    zIndex: 2,
  },

  heroLabel: {
    fontSize: 13,
    fontWeight: 900,
    color: "#9B6B10",
    marginBottom: 4,
  },

  title: {
    fontSize: 27,
    lineHeight: 1.25,
    fontWeight: 900,
    margin: 0,
    color: "#0F2447",
  },

  subtitle: {
    margin: "8px auto 0",
    fontSize: 14,
    lineHeight: 1.6,
    color: "#385174",
    fontWeight: 800,
    maxWidth: 330,
  },

  statsRow: {
    marginTop: 14,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
  },

  statPill: {
    background: "#FFF3C4",
    border: "2px solid rgba(232,160,32,.45)",
    color: "#0F2447",
    borderRadius: 999,
    padding: "7px 12px",
    fontSize: 13,
    fontWeight: 900,
  },

  loadingBox: {
    background: "rgba(255,255,255,.10)",
    border: "1px solid rgba(255,255,255,.16)",
    borderRadius: 20,
    padding: 36,
    textAlign: "center",
    color: "#FFE8A3",
    fontWeight: 900,
  },

  emptyBox: {
    background: "rgba(255,255,255,.10)",
    border: "1px solid rgba(255,255,255,.16)",
    borderRadius: 20,
    padding: 36,
    textAlign: "center",
    color: "#fff",
    fontWeight: 900,
  },

  lessonsList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  lessonCard: {
    background: "rgba(255,255,255,.96)",
    border: "2px solid rgba(232,160,32,.30)",
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 10px 24px rgba(0,0,0,.24)",
  },

  lessonMainBtn: {
    width: "100%",
    background: "transparent",
    border: "none",
    padding: "14px 14px 10px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    textAlign: "right",
    cursor: "pointer",
    fontFamily: "Tajawal, sans-serif",
  },

  lessonNumber: {
    width: 54,
    height: 54,
    borderRadius: 18,
    background: "linear-gradient(145deg,#E8A020,#F4B942)",
    color: "#0F2447",
    display: "grid",
    placeItems: "center",
    fontSize: 23,
    fontWeight: 900,
    flexShrink: 0,
    boxShadow: "0 7px 14px rgba(232,160,32,.32)",
  },

  lessonInfo: {
    flex: 1,
    minWidth: 0,
  },

  lessonMeta: {
    color: "#8A6311",
    fontSize: 12,
    fontWeight: 900,
    marginBottom: 3,
  },

  lessonTitle: {
    color: "#0F2447",
    fontSize: 16,
    fontWeight: 900,
    lineHeight: 1.35,
  },

  arrow: {
    color: "#E8A020",
    fontSize: 32,
    fontWeight: 900,
    flexShrink: 0,
  },

  lessonActions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    padding: "0 12px 12px",
  },

  studyBtn: {
    minHeight: 42,
    border: "none",
    borderRadius: 14,
    background: "#1B3A6B",
    color: "#fff",
    fontFamily: "Tajawal, sans-serif",
    fontSize: 14,
    fontWeight: 900,
    cursor: "pointer",
  },

  exerciseBtn: {
    minHeight: 42,
    border: "none",
    borderRadius: 14,
    background: "#1FA463",
    color: "#fff",
    fontFamily: "Tajawal, sans-serif",
    fontSize: 14,
    fontWeight: 900,
    cursor: "pointer",
  },

  quizCard: {
    marginTop: 18,
    background:
      "linear-gradient(145deg,rgba(232,160,32,.18),rgba(255,255,255,.10))",
    border: "2px solid rgba(232,160,32,.42)",
    borderRadius: 24,
    padding: "20px 16px",
    textAlign: "center",
    boxShadow: "0 12px 26px rgba(0,0,0,.22)",
  },

  quizIcon: {
    width: 66,
    height: 66,
    margin: "0 auto 10px",
    borderRadius: 22,
    background: "linear-gradient(145deg,#E8A020,#F4B942)",
    display: "grid",
    placeItems: "center",
    fontSize: 34,
    boxShadow: "0 8px 18px rgba(232,160,32,.30)",
  },

  quizTitle: {
    fontSize: 20,
    fontWeight: 900,
    color: "#fff",
    marginBottom: 5,
  },

  quizText: {
    fontSize: 13,
    color: "rgba(255,255,255,.78)",
    fontWeight: 800,
    marginBottom: 14,
  },

  quizBtn: {
    width: "100%",
    minHeight: 50,
    border: "none",
    borderRadius: 17,
    background: "linear-gradient(135deg,#E8A020,#F4B942)",
    color: "#0F2447",
    fontFamily: "Tajawal, sans-serif",
    fontSize: 16,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(232,160,32,.35)",
  },
};
