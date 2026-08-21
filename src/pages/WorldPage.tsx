import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgressTestNode from "../features/progress-tests/components/ProgressTestNode";
import { getProgressTestStatus } from "../features/progress-tests/storage";
import { isLessonCompleted } from "../features/lesson-v2/progress/lessonProgress";
import { useLang } from "../i18n/LanguageContext";
import { getWorldById, getWorldLessons } from "../services/worldsService";
import { supabase } from "../lib/supabaseClient";
import { getV2KeyByLesson } from "../features/lesson-v2/v2Registry";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import { NATURAL_RESERVE_WORLD_ID, naturalReserveIntroContent } from "../features/world-intro/naturalReserveIntro";
import { SMALL_CITY_WORLD_ID, smallCityWorldIntroContent } from "../features/world-intro/smallCityWorldIntro";
import { SCHOOL_WORLD_ID, schoolWorldIntroContent } from "../features/world-intro/schoolWorldIntro";
import { SKILLS_ACADEMY_WORLD_ID, skillsAcademyWorldIntroContent } from "../features/world-intro/skillsAcademyWorldIntro";

// نزع التشكيل + تحويل الكلمات الرقمية — للعرض في الفهرس فقط
function cleanTitle(s: string): string {
  if (!s) return s;
  return s
    .replace(/[\u064B-\u0652\u0670]/g, "")
    .replace(/ستة/g, "6")
    .replace(/تسعة/g, "9");
}

function resolveWorldIntroContent(
  worldRecord: any,
  currentWorldId?: string,
) {
  const resolvedWorldId = String(
    worldRecord?.id
      ?? currentWorldId
      ?? "",
  );

  if (
    resolvedWorldId
    === SCHOOL_WORLD_ID
  ) {
    return schoolWorldIntroContent;
  }

  if (
    resolvedWorldId
    === NATURAL_RESERVE_WORLD_ID
  ) {
    return naturalReserveIntroContent;
  }

  if (
    resolvedWorldId
    === SMALL_CITY_WORLD_ID
  ) {
    return smallCityWorldIntroContent;
  }



  if (
    resolvedWorldId
    === SKILLS_ACADEMY_WORLD_ID
  ) {
    return skillsAcademyWorldIntroContent;
  }

  return worldRecord?.intro_content ?? null;
}

// TEMPORARY DEVELOPMENT SWITCH:
// false = lessons remain open while all PT/MT checkpoints are being built.
// Later, replace this broad switch with segmented checkpoint gates.
const ENABLE_PROGRESS_GATING = false;

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
  type Pt01Status = Awaited<ReturnType<typeof getProgressTestStatus>>;
  const [pt01Record, setPt01Record] = useState<Pt01Status>(null);

  useEffect(() => {
    let active = true;

    const refreshPt01 = async () => {
      const status = await getProgressTestStatus("pt-01");
      if (active) setPt01Record(status);
    };

    void refreshPt01();

    const refresh = () => {
      void refreshPt01();
    };

    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("taalim-dz:progress-test-completed", refresh);

    return () => {
      active = false;
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("taalim-dz:progress-test-completed", refresh);
    };
  }, [worldId]);

  const lesson10Completed = isLessonCompleted("lesson10");
  const pt01BestScore = Number(pt01Record?.bestScore ?? 0);
  const pt01Passed = Boolean(pt01Record?.passed || pt01BestScore >= 70);


  const introContent =
    resolveWorldIntroContent(
      world,
      worldId,
    );

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
        // check if user has seen the intro
        // الفتح التلقائي خاص بمقدمات قاعدة البيانات فقط
        // مقدمة المحمية تُفتح من زر شاهد المقدمة
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

  const title = world ? (lang === "fr" && world.title_fr ? world.title_fr : world.title_ar) : "";

  const handleIntroDone = async () => {
    setShowIntro(false);
    if (isReplay) {
      setIsReplay(false);
      return;
    }
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user && world) {
      await supabase.from("world_intro_views").upsert({
        user_id: userData.user.id,
        world_id: world.id,
      }, { onConflict: "user_id,world_id" });
    }
  };

  const handleReplayIntro = () => {
    setIsReplay(true);
    setShowIntro(true);
  };

  // Show intro scene if not viewed
  if (showIntro && introContent) {
    return (
      <WorldIntroSceneV2
        audio_base={introContent.audio_base}
        slides={introContent.slides}
        onDone={handleIntroDone}
      />
    );
  }

  return (
    <div style={{ minHeight: "100dvh", background: "radial-gradient(circle at top, #14264a 0%, #071122 48%, #050b16 100%)", fontFamily: "Tajawal,sans-serif", direction: "rtl", paddingBottom: 150, overflowX: "hidden" }}>
      <div style={{ padding: "18px 16px 34px", position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, gap: 8 }}>
          <button onClick={() => navigate(-1)} style={{ background: "var(--border-faint)", border: "1px solid var(--border)", color: "#fff", borderRadius: 12, padding: "8px 14px", fontSize: 13, fontWeight: 700, fontFamily: "Tajawal,sans-serif" }}>← {t("btn_back")}</button>
          {introContent && (
            <button onClick={handleReplayIntro} style={{ background: "linear-gradient(135deg,var(--gold),#FFB84D)", border: "none", color: "#fff", borderRadius: 12, padding: "8px 14px", fontSize: 13, fontWeight: 700, fontFamily: "Tajawal,sans-serif", cursor: "pointer", boxShadow: "0 4px 12px rgba(232,160,32,.35)" }}>🎬 شاهد المقدمة</button>
          )}
        </div>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 56, marginBottom: 10 }}>{world?.icon || "🌟"}</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: 0 }}>{title}</h1>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", color: "var(--gold)", padding: 40 }}>⏳ جارٍ التحميل...</div>
        ) : lessons.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--text-faint)", padding: 40 }}>لا توجد دروس في هذا العالم بعد</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {lessons.map((l, i) => {
              const k = getV2KeyByLesson(l);

              // PT-01 is the first global progression gate:
              // - in School World, it blocks cards after lesson 10 (index >= 10)
              // - in every later world, it blocks every lesson until PT-01 is passed
              // This deliberately does NOT depend on getV2KeyByLesson, because some
              // lessons (e.g. 33–42) are not resolved by the V2 registry.
              const currentWorldId = String(world?.id ?? worldId ?? "");
              const isSchoolWorld = currentWorldId === SCHOOL_WORLD_ID;

              const isAfterPt01Locked =
                ENABLE_PROGRESS_GATING
                && !pt01Passed
                && (
                  (isSchoolWorld && i >= 10)
                  || !isSchoolWorld
                );

              const lessonCard = (
                <div
                  key={l.id}
                  onClick={() => {
                    if (isAfterPt01Locked) {
                      if (lesson10Completed) {
                        navigate("/progress-test/pt-01");
                      }
                      return;
                    }

                    if (
                      String(l.world_id ?? world?.id ?? worldId) === "5daed3bb-7e62-4a5a-93a1-f6dec60df810"
                    ) {
                      navigate(
                        `/world2-lesson/${l.id}`
                      );
                      return;
                    }

                    navigate(
                      k
                        ? `/lesson-v2/${k}`
                        : `/lesson/${l.id}`
                    );
                  }}
                  style={{
                    background: isAfterPt01Locked
                      ? "linear-gradient(135deg,rgba(35,45,65,.92),rgba(24,33,50,.96))"
                      : "var(--surface-2)",
                    border: isAfterPt01Locked
                      ? "1px solid rgba(148,163,184,.25)"
                      : "1px solid var(--border-soft)",
                    borderRadius: 16,
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    cursor: isAfterPt01Locked ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 16px rgba(0,0,0,.3)",
                    opacity: mounted ? (isAfterPt01Locked ? .68 : 1) : 0,
                    transform: mounted ? "translateY(0)" : "translateY(10px)",
                    transition: `all .4s ease ${i * 0.08}s`,
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 15,
                      background: isAfterPt01Locked
                        ? "linear-gradient(135deg,#64748b,#475569)"
                        : "linear-gradient(135deg,var(--gold),#F4B942)",
                      color: isAfterPt01Locked ? "#e2e8f0" : "#1B3A6B",
                      display: "grid",
                      placeItems: "center",
                      fontSize: isAfterPt01Locked ? 23 : 26,
                      fontWeight: 900,
                      flexShrink: 0,
                      boxShadow: isAfterPt01Locked
                        ? "0 4px 12px rgba(15,23,42,.35)"
                        : "0 4px 12px rgba(232,160,32,.35)",
                    }}
                  >
                    {isAfterPt01Locked ? "🔒" : i + 1}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, marginBottom: 3, letterSpacing: ".3px" }}>
                      الدرس {i + 1}
                    </div>

                    <div style={{ fontWeight: 800, color: "#fff", fontSize: 16, lineHeight: 1.3 }}>
                      {lang === "fr" && l.title_fr ? l.title_fr : cleanTitle(l.title)}
                    </div>

                    {isAfterPt01Locked && (
                      <div
                        style={{
                          marginTop: 5,
                          color: lesson10Completed ? "#c4b5fd" : "#94a3b8",
                          fontSize: 11,
                          fontWeight: 800,
                          lineHeight: 1.35,
                        }}
                      >
                        {lesson10Completed
                          ? "🔒 اجتز PT-01 لفتح هذا المسار"
                          : "🔒 أكمل الدرس 10 ثم اجتز PT-01"}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      width: 11,
                      height: 11,
                      borderLeft: isAfterPt01Locked
                        ? "2.5px solid #64748b"
                        : "2.5px solid var(--gold)",
                      borderBottom: isAfterPt01Locked
                        ? "2.5px solid #64748b"
                        : "2.5px solid var(--gold)",
                      transform: "rotate(45deg)",
                      flexShrink: 0,
                      marginLeft: 4,
                    }}
                  />
                </div>
              );

              if (
                worldId === SCHOOL_WORLD_ID
                && k === "lesson10"
              ) {
                return (
                  <div
                    key={`lesson10-pt01-${l.id}`}
                    style={{ display: "contents" }}
                  >
                    {lessonCard}

                    <ProgressTestNode
                      unlocked={lesson10Completed}
                      record={pt01Record}
                      onOpen={() => {
                        if (lesson10Completed) {
                          navigate("/progress-test/pt-01");
                        }
                      }}
                    />
                  </div>
                );
              }

              return lessonCard;
            })}
          </div>
        )}

        {!loading && (
          <div style={{ marginTop: 28, padding: "22px 18px", background: "linear-gradient(145deg,rgba(232,160,32,.14),rgba(27,58,107,.18))", border: "1px solid var(--gold)33", borderRadius: 28, textAlign: "center" }}>
            <div style={{ width: 60, height: 60, margin: "0 auto 12px", borderRadius: 18, background: "linear-gradient(135deg,#1B3A6B,#264a7d)", border: "2px solid var(--gold)", display: "grid", placeItems: "center", fontSize: 30, boxShadow: "0 4px 16px rgba(0,0,0,.25)" }}>🏆</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 5 }}>اِخْتَبِرْ مَعْرِفَتَك!</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>🔒 اجتَزِ الاختبارَ لتفتحَ العالمَ التالي</div>
            <button
              onClick={() => navigate(`/world/${worldId}/quiz`)}
              style={{ width: "100%", padding: 15, border: "none", borderRadius: 16, background: "linear-gradient(135deg,var(--gold),#F4B942)", color: "#1B3A6B", fontFamily: "Tajawal,sans-serif", fontSize: 16, fontWeight: 900, cursor: "pointer", boxShadow: "0 6px 20px rgba(232,160,32,.4)" }}
            >
              ابدأ اختبار العالم 🏆
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
