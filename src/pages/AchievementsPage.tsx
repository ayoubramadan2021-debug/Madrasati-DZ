import { withTimeout } from "../lib/withTimeout";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/sessionService";
import { getProfile } from "../services/profileService";
import { getMyWorldProgress } from "../services/worldsService";
import { getLevel } from "../lib/level";
import { getUserProgress } from "../services/progressService";
import { useLang } from "../i18n/LanguageContext";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".ac-root *,.ac-root *::before,.ac-root *::after{box-sizing:border-box;margin:0;padding:0}",
".ac-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".ac-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".ac-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:ac-d1 14s ease-in-out infinite alternate}",
".ac-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:ac-d2 11s ease-in-out infinite alternate}",
"@keyframes ac-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes ac-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".ac-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".ac-content{position:relative;z-index:2}",
".ac-hero{position:relative;padding:24px 20px 24px;text-align:center}",
".ac-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;margin:8px 0 10px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".ac-logo.in{opacity:1;transform:scale(1)}",
".ac-logo-bg{position:absolute;inset:0;border-radius:24px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong)}",
".ac-logo-em{position:relative;font-size:40px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6));animation:ac-bob 4s ease-in-out infinite}",
"@keyframes ac-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
".ac-title{font-size:24px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".ac-sub{font-size:13px;color:var(--text-faint)}",
".ac-body{padding:0 16px}",
".ac-state{text-align:center;padding:50px 20px;color:var(--text-faint);font-size:15px}",
".ac-summary{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:20px;margin-bottom:18px;box-shadow:var(--shadow-hero)}",
".ac-greet{font-size:18px;font-weight:800;color:var(--text);margin-bottom:6px}",
".ac-count{font-size:13px;color:var(--text-muted);margin-bottom:14px}",
".ac-count b{color:var(--gold)}",
".ac-bar{width:100%;height:14px;border-radius:999px;background:rgba(255,255,255,.07);overflow:hidden}",
".ac-bar-f{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--gold),var(--gold-deep));box-shadow:0 0 12px rgba(232,160,32,.5);transition:width .9s cubic-bezier(.34,1.2,.64,1)}",
".ac-list{display:flex;flex-direction:column;gap:12px}",
".ac-badge{position:relative;border-radius:18px;padding:18px;display:flex;align-items:center;gap:16px;overflow:hidden;animation:ac-pop .5s ease backwards}",
"@keyframes ac-pop{from{opacity:0;transform:translateY(18px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}",
".ac-badge-strip{position:absolute;right:0;top:0;bottom:0;width:4px;border-radius:0 18px 18px 0}",
".ac-badge-em{font-size:44px;flex-shrink:0;transition:transform .3s}",
".ac-badge-body{flex:1;min-width:0}",
".ac-badge-t{font-size:16px;font-weight:800;color:var(--text);margin-bottom:4px}",
".ac-badge-d{font-size:12px;color:var(--text-muted);line-height:1.6;margin-bottom:8px}",
".ac-badge-s{font-size:12px;font-weight:800}",
].join("\n");

function AchievementsPage() {
  const { t } = useLang();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const reload = () => { setLoading(true); window.location.reload(); };
  const [profile, setProfile] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [worldProgress, setWorldProgress] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { loadAchievements(); }, []);
  useEffect(() => {
    const tm = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(tm);
  }, [profile]);

  async function loadAchievements() {
    setLoading(true);
    try {
      setErr(false);
      const user = await withTimeout(Promise.resolve(getCurrentUser()));
      if (!user) { setLoading(false); return; }
      const userProfile = await withTimeout(Promise.resolve(getProfile(user.id)));
      const userProgress = await withTimeout(Promise.resolve(getUserProgress(user.id)));
      setProfile(userProfile);
      setProgress(userProgress || []);
      try {
        const wp = await withTimeout(Promise.resolve(getMyWorldProgress()));
        setWorldProgress(wp || []);
      } catch { /* تجاهل */ }
    } catch (e) {
      setErr(true);
    } finally {
      setLoading(false);
    }
  }

  const totalPoints = progress.reduce((sum, item) => sum + Number(item.points || 0), 0);
  const completedExercises = progress.filter((item) => String(item.lesson_id || "").includes("exercise")).length;
  const completedQuizzes = progress.filter((item) => String(item.lesson_id || "").includes("quiz")).length;
  const completedWorlds = worldProgress.filter((w) => w.status === "completed").length;
  const level = getLevel(profile?.xp || 0).level;

  const badges = [
    { icon: "🎯", title: t("badge_start_t"), desc: t("badge_start_d"), unlocked: progress.length >= 1 },
    { icon: "⭐", title: t("badge_10pts_t"), desc: t("badge_10pts_d"), unlocked: totalPoints >= 10 },
    { icon: "🏅", title: t("badge_active_t"), desc: t("badge_active_d"), unlocked: progress.length >= 3 },
    { icon: "🧮", title: t("badge_exhero_t"), desc: t("badge_exhero_d"), unlocked: completedExercises >= 3 },
    { icon: "📝", title: t("badge_quizlover_t"), desc: t("badge_quizlover_d"), unlocked: completedQuizzes >= 1 },
    { icon: "👑", title: t("badge_star_t"), desc: t("badge_star_d"), unlocked: totalPoints >= 100 },
    { icon: "🏆", title: "فاتح العوالم", desc: "أكمل عالماً كاملاً بنجاح", unlocked: completedWorlds >= 1 },
    { icon: "🔥", title: "مغامر مثابر", desc: "أكمل 3 عوالم", unlocked: completedWorlds >= 3 },
    { icon: "🌟", title: "نجم صاعد", desc: "وصل المستوى 3", unlocked: level >= 3 },
    { icon: "🚀", title: "خبير", desc: "وصل المستوى 5", unlocked: level >= 5 },
  ];

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div className="ac-root">
        <div className="ac-orb ac-ob" /><div className="ac-orb ac-og" /><div className="ac-grid" />
        <div className="ac-content">
          <div className="ac-hero">
            <div className={cx("ac-logo", mounted && "in")}>
              <div className="ac-logo-bg" />
              <span className="ac-logo-em">🏅</span>
            </div>
            <h1 className="ac-title">{t("ac_title")}</h1>
            <div className="ac-sub">{t("ac_sub")}</div>
          </div>

          <div className="ac-body">
            {loading ? (
              <div className="ac-state">⏳ {t("ac_loading")}</div>
            ) : err ? (
              <div className="ac-state">
                <div style={{ fontSize: 42, marginBottom: 10 }}>📡</div>
                <div style={{ fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>{t("pf_load_error")}</div>
                <div style={{ fontSize: 13, marginBottom: 16 }}>{t("pf_check_net")}</div>
                <button onClick={reload} style={{ padding: "11px 26px", border: "none", borderRadius: 12, background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#3a2400", fontFamily: "'Tajawal',sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>إعادة المحاولة ↻</button>
              </div>
            ) : !profile ? (
              <div className="ac-state">🔐 {t("ac_login")}</div>
            ) : (
              <>
                <div className="ac-summary">
                  <div className="ac-greet">👋 {profile.full_name || t("pg_student")}</div>
                  <div className="ac-count">{t("ac_got_a")} <b>{unlockedCount}</b> {t("ac_got_b")} {badges.length} {t("ac_badges")}</div>
                  <div className="ac-bar">
                    <div className="ac-bar-f" style={{ width: (mounted ? Math.round((unlockedCount / badges.length) * 100) : 0) + "%" }} />
                  </div>
                </div>

                <div className="ac-list">
                  {badges.map((badge, i) => (
                    <div
                      key={badge.title}
                      className="ac-badge"
                      style={{
                        animationDelay: (0.3 + i * 0.08) + "s",
                        background: badge.unlocked ? "linear-gradient(135deg,rgba(34,197,94,.1),rgba(16,163,74,.04))" : "var(--surface-2)",
                        border: badge.unlocked ? "1px solid rgba(34,197,94,.3)" : "1px solid rgba(255,255,255,.07)",
                        boxShadow: badge.unlocked ? "0 0 20px rgba(34,197,94,.12)" : "0 4px 16px rgba(0,0,0,.3)",
                        opacity: badge.unlocked ? 1 : 0.6,
                      }}
                    >
                      <div className="ac-badge-strip" style={{ background: badge.unlocked ? "linear-gradient(180deg,#22C55E,#16a34a)" : "var(--border)" }} />
                      <div className="ac-badge-em" style={{ filter: badge.unlocked ? "none" : "grayscale(1)" }}>{badge.icon}</div>
                      <div className="ac-badge-body">
                        <div className="ac-badge-t">{badge.title}</div>
                        <div className="ac-badge-d">{badge.desc}</div>
                        <div className="ac-badge-s" style={{ color: badge.unlocked ? "#4ade80" : "var(--text-faint)" }}>
                          {badge.unlocked ? "✅ " + t("ac_unlocked") : "🔒 " + t("ac_locked")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AchievementsPage;
