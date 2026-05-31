import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useLang } from "../i18n/LanguageContext";
import { withTimeout } from "../lib/withTimeout";
import { ThemeToggle } from "../useTheme";
import { getLevel } from "../lib/level";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".pf-root *,.pf-root *::before,.pf-root *::after{box-sizing:border-box;margin:0;padding:0}",
".pf-root{min-height:100dvh;background:var(--bg);font-family:Tajawal,sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".pf-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".pf-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:pf-d1 14s ease-in-out infinite alternate}",
".pf-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:pf-d2 11s ease-in-out infinite alternate}",
"@keyframes pf-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes pf-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".pf-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".pf-content{position:relative;z-index:2}",
".pf-center{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;position:relative;z-index:2}",
".pf-state{color:var(--text-muted);font-size:16px}",
".pf-lock-em{font-size:62px;margin-bottom:16px}",
".pf-lock-t{font-weight:800;color:var(--text);font-size:18px;margin-bottom:18px}",
".pf-btn{padding:14px 32px;border:none;border-radius:14px;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;font-family:Tajawal,sans-serif;font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 4px 16px rgba(232,160,32,.35);transition:transform .2s}",
".pf-btn:active{transform:scale(.96)}",
".pf-hero{position:relative;padding:24px 16px 44px;text-align:center}",
".pf-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:Tajawal,sans-serif;transition:background .2s}",
".pf-back:active{background:var(--border-soft)}",
".pf-av-wrap{position:relative;display:inline-flex;align-items:center;justify-content:center;width:92px;height:92px;margin:14px 0 12px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".pf-av-wrap.in{opacity:1;transform:scale(1)}",
".pf-av-ring{position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(232,160,32,.3);animation:pf-spin 16s linear infinite}",
"@keyframes pf-spin{to{transform:rotate(360deg)}}",
".pf-av{position:relative;width:92px;height:92px;border-radius:50%;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:2px solid rgba(232,160,32,.4);display:grid;place-items:center;font-size:44px;box-shadow:0 8px 28px rgba(0,0,0,.5)}",
".pf-name{font-size:24px;font-weight:900;background:linear-gradient(135deg,#fff 30%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(12px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".pf-name.in{opacity:1;transform:translateY(0)}",
".pf-body{padding:0 16px;margin-top:-24px;position:relative;z-index:3}",
".pf-stats{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:20px;margin-bottom:14px;box-shadow:var(--shadow-hero);display:grid;grid-template-columns:1fr 1fr 1fr;text-align:center;opacity:0;transform:translateY(16px);transition:opacity .5s ease .3s,transform .5s ease .3s}",
".pf-stats.in{opacity:1;transform:translateY(0)}",
".pf-stat-n{font-size:24px;font-weight:900;line-height:1}",
".pf-stat-l{color:var(--text-faint);font-size:11px;margin-top:4px}",
".pf-stat-div{position:relative}",
".pf-stat-div::before,.pf-stat-div::after{content:'';position:absolute;top:15%;height:70%;width:1px;background:var(--border-soft)}",
".pf-stat-div::before{right:0}",
".pf-stat-div::after{left:0}",
".pf-card{background:var(--surface-2);border:1px solid var(--border-soft);border-radius:18px;padding:18px;margin-bottom:14px;box-shadow:var(--shadow-card);opacity:0;transform:translateY(16px);transition:opacity .5s ease .4s,transform .5s ease .4s}",
".pf-card.in{opacity:1;transform:translateY(0)}",
".pf-card-t{font-weight:800;color:var(--text);font-size:15px;margin-bottom:14px}",
".pf-input{width:100%;padding:13px 16px;border-radius:12px;border:1.5px solid rgba(232,160,32,.4);background:var(--surface-soft);color:var(--text);font-family:Tajawal,sans-serif;font-size:14px;outline:none;direction:rtl;margin-bottom:12px}",
".pf-row-btns{display:flex;gap:10px}",
".pf-save{flex:1;padding:12px;border:none;border-radius:12px;background:linear-gradient(135deg,#22C55E,#16a34a);color:var(--text);font-family:Tajawal,sans-serif;font-size:14px;font-weight:800;cursor:pointer;box-shadow:0 4px 14px rgba(34,197,94,.3);transition:transform .15s}",
".pf-save:active{transform:scale(.96)}",
".pf-cancel{flex:1;padding:12px;border:1.5px solid var(--border-soft);border-radius:12px;background:transparent;color:var(--text-muted);font-family:Tajawal,sans-serif;font-size:14px;cursor:pointer}",
".pf-view{display:flex;align-items:center;justify-content:space-between}",
".pf-view-name{color:var(--text);font-size:15px;font-weight:700}",
".pf-edit{padding:8px 16px;border:1.5px solid rgba(232,160,32,.4);border-radius:10px;background:rgba(232,160,32,.08);color:var(--gold);font-family:Tajawal,sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:background .2s}",
".pf-edit:active{background:rgba(232,160,32,.18)}",
".pf-links{background:var(--surface-2);border:1px solid var(--border-soft);border-radius:18px;overflow:hidden;margin-bottom:14px;box-shadow:var(--shadow-card);opacity:0;transform:translateY(16px);transition:opacity .5s ease .5s,transform .5s ease .5s}",
".pf-links.in{opacity:1;transform:translateY(0)}",
".pf-link{width:100%;display:flex;align-items:center;gap:14px;padding:16px;border:none;background:transparent;font-family:Tajawal,sans-serif;cursor:pointer;transition:background .2s}",
".pf-link:active{background:var(--surface-softer)}",
".pf-link-ic{width:40px;height:40px;border-radius:11px;display:grid;place-items:center;font-size:20px;flex-shrink:0;background:rgba(232,160,32,.1)}",
".pf-link-l{font-weight:700;color:var(--text);font-size:15px;flex:1;text-align:right}",
".pf-link-a{color:var(--text-dim);font-size:18px}",
".pf-logout{width:100%;padding:15px;border:1px solid rgba(220,80,80,.3);border-radius:16px;background:rgba(220,80,80,.1);color:#ff6b6b;font-family:Tajawal,sans-serif;font-size:15px;font-weight:800;cursor:pointer;opacity:0;transition:opacity .5s ease .6s,background .2s;transform:translateY(16px)}",
".pf-logout.in{opacity:1;transform:translateY(0)}",
".pf-logout:active{background:rgba(220,80,80,.2)}",
].join("\n");

export default function ProfilePage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const reload = () => { setLoading(true); window.location.reload(); };
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [points, setPoints] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { load(); }, []);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, [profile]);

  async function load() {
    try {
      setErr(false);
      const { data: session } = await withTimeout(Promise.resolve(supabase.auth.getSession()));
      const user = session?.session?.user;
      if (!user) { setLoading(false); return; }
      const { data: prof } = await withTimeout(Promise.resolve(supabase.from("profiles").select("*").eq("id", user.id).single()));
      const { data: prog } = await withTimeout(Promise.resolve(supabase.from("progress").select("points,completed").eq("user_id", user.id)));
      setProfile(prof);
      setName(prof?.full_name || "");
      if (prog) {
        setPoints(prog.reduce((s: number, i: any) => s + Number(i.points || 0), 0));
        setCompleted(prog.filter((i: any) => i.completed).length);
      }
    } catch (e) {
      setErr(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const user = session?.session?.user;
      if (user) {
        await supabase.from("profiles").update({ full_name: name }).eq("id", user.id);
        setProfile((p: any) => ({ ...p, full_name: name }));
      }
    } catch (e) {}
    setEditing(false);
    setSaving(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/auth");
  }

  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");
  const isAdmin = profile?.role === "admin";

  if (loading) return (
    <>
      <style>{CSS}</style>
      <div className="pf-root">
        <div className="pf-orb pf-ob" /><div className="pf-orb pf-og" /><div className="pf-grid" />
        <div className="pf-center"><div className="pf-state">⏳ {t("pf_loading")}</div></div>
      </div>
    </>
  );

  if (err) return (
    <>
      <style>{CSS}</style>
      <div className="pf-root">
        <div className="pf-orb pf-ob" /><div className="pf-orb pf-og" /><div className="pf-grid" />
        <div className="pf-center">
          <div className="pf-lock-em">📡</div>
          <div className="pf-lock-t">{t("pf_load_error")}</div>
          <div className="pf-state" style={{ marginBottom: 16, textAlign: "center" }}>{t("pf_check_net")}</div>
          <button className="pf-btn" onClick={reload}>{t("btn_retry")} ↻</button>
        </div>
      </div>
    </>
  );

  if (!profile) return (
    <>
      <style>{CSS}</style>
      <div className="pf-root">
        <div className="pf-orb pf-ob" /><div className="pf-orb pf-og" /><div className="pf-grid" />
        <div className="pf-center">
          <div className="pf-lock-em">🔐</div>
          <div className="pf-lock-t">{t("pf_login_first")}</div>
          <button className="pf-btn" onClick={() => navigate("/auth")}>{t("menu_login")}</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="pf-root">
        <div className="pf-orb pf-ob" /><div className="pf-orb pf-og" /><div className="pf-grid" />

        <div className="pf-content">
          <div className="pf-hero">
            <button className="pf-back" onClick={() => navigate("/")}>← {t("btn_back")}</button>
            <div className={cx("pf-av-wrap", mounted && "in")}>
              <div className="pf-av-ring" />
              <div className="pf-av">👦</div>
            </div>
            <div className={cx("pf-name", mounted && "in")}>{profile.full_name || t("pg_student")}</div>
          </div>

          <div className="pf-body">

            {!isAdmin && (() => {
              const lvl = getLevel(profile.xp || 0);
              return (
                <div className={cx("pf-stats", mounted && "in")} style={{ display: "block", marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ fontWeight: 900, fontSize: 18, color: "var(--gold)" }}>⭐ المستوى {lvl.level}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{lvl.current}/{lvl.needed} للمستوى التالي</div>
                  </div>
                  <div style={{ height: 10, background: "var(--surface-softer)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: lvl.percent + "%", background: "linear-gradient(90deg,var(--gold),var(--gold-deep))", borderRadius: 99, transition: "width .5s" }} />
                  </div>
                </div>
              );
            })()}

            {!isAdmin && (
              <div className={cx("pf-stats", mounted && "in")}>
                <div>
                  <div className="pf-stat-n" style={{ color: "var(--gold)" }}>{points}</div>
                  <div className="pf-stat-l">{t("pf_points")}</div>
                </div>
                <div className="pf-stat-div">
                  <div className="pf-stat-n" style={{ color: "#E8A020" }}>🌟 {profile.xp || 0}</div>
                  <div className="pf-stat-l">نقطة خبرة</div>
                </div>
                <div className="pf-stat-div">
                  <div className="pf-stat-n" style={{ color: "#22C55E" }}>{completed}</div>
                  <div className="pf-stat-l">{t("pf_completed")}</div>
                </div>
                <div>
                  <div className="pf-stat-n" style={{ color: "#3B82F6" }}>{profile.grade || "—"}</div>
                  <div className="pf-stat-l">{t("pf_year")}</div>
                </div>
              </div>
            )}

            <div className={cx("pf-card", mounted && "in")}>
              <div className="pf-card-t">{t("pf_my_info")}</div>
              {editing ? (
                <>
                  <input className="pf-input" value={name} onChange={e => setName(e.target.value)} />
                  <div className="pf-row-btns">
                    <button className="pf-save" onClick={handleSave} disabled={saving}>{saving ? "..." : t("pf_save") + " ✓"}</button>
                    <button className="pf-cancel" onClick={() => setEditing(false)}>{t("pf_cancel")}</button>
                  </div>
                </>
              ) : (
                <div className="pf-view">
                  <span className="pf-view-name">{profile.full_name || "—"}</span>
                  <button className="pf-edit" onClick={() => setEditing(true)}>{t("pf_edit")} ✏️</button>
                </div>
              )}
            </div>

            {!isAdmin && (
              <div className={cx("pf-links", mounted && "in")}>
                {[
                  { icon: "📊", label: t("menu_my_progress"), path: "/progress" },
                  { icon: "🏅", label: t("menu_achievements"), path: "/achievements" },
                  { icon: "⭐", label: t("menu_favorites"), path: "/favorites" },
                  { icon: "🔔", label: t("menu_notifications"), path: "/notifications" },
                ].map((item, i) => (
                  <button key={i} className="pf-link" onClick={() => navigate(item.path)} style={{ borderBottom: i < 2 ? "1px solid var(--border-faint)" : "none" }}>
                    <span className="pf-link-ic">{item.icon}</span>
                    <span className="pf-link-l">{item.label}</span>
                    <span className="pf-link-a">←</span>
                  </button>
                ))}
              </div>
            )}

            {isAdmin && (
              <div className={cx("pf-links", mounted && "in")} style={{ border: "1px solid rgba(232,160,32,.25)" }}>
                {[{ icon: "🧑‍🏫", label: t("pf_admin"), path: "/admin" }].map((item, i) => (
                  <button key={i} className="pf-link" onClick={() => navigate(item.path)}>
                    <span className="pf-link-ic">{item.icon}</span>
                    <span className="pf-link-l">{item.label}</span>
                    <span className="pf-link-a">←</span>
                  </button>
                ))}
              </div>
            )}

            {profile?.role === "parent" && (
              <div className={cx("pf-links", mounted && "in")} style={{ border: "1px solid rgba(232,160,32,.25)" }}>
                {[
                  { icon: "👨‍👩‍👧", label: t("pf_follow_kids"), path: "/parent/dashboard" },
                  { icon: "🔗", label: t("pf_link_parent"), path: "/parent" },
                ].map((item, i, arr) => (
                  <button key={i} className="pf-link" onClick={() => navigate(item.path)} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border-faint)" : "none" }}>
                    <span className="pf-link-ic">{item.icon}</span>
                    <span className="pf-link-l">{item.label}</span>
                    <span className="pf-link-a">←</span>
                  </button>
                ))}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><ThemeToggle /></div>
            <button className={cx("pf-logout", mounted && "in")} onClick={handleLogout}>{t("menu_logout")} 🚪</button>
          </div>
        </div>
      </div>
    </>
  );
}
