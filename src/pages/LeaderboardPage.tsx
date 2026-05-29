import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import { supabase } from "../lib/supabaseClient";
import { withTimeout } from "../lib/withTimeout";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".lb-root *,.lb-root *::before,.lb-root *::after{box-sizing:border-box;margin:0;padding:0}",
".lb-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".lb-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".lb-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:lb-d1 14s ease-in-out infinite alternate}",
".lb-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.14) 0%,transparent 70%);animation:lb-d2 11s ease-in-out infinite alternate}",
"@keyframes lb-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes lb-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".lb-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".lb-content{position:relative;z-index:2}",
".lb-hero{position:relative;padding:24px 20px 28px;text-align:center}",
".lb-back{position:absolute;top:20px;right:16px;display:inline-flex;align-items:center;gap:6px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:background .2s}",
".lb-back:active{background:var(--border-soft)}",
".lb-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:84px;height:84px;margin:12px 0 14px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".lb-logo.in{opacity:1;transform:scale(1)}",
".lb-logo-bg{position:absolute;inset:0;border-radius:26px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong),inset 0 1px 0 var(--border-soft)}",
".lb-logo-em{position:relative;font-size:44px;filter:drop-shadow(0 0 16px rgba(232,160,32,.7));animation:lb-bob 4s ease-in-out infinite}",
"@keyframes lb-bob{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-5px) rotate(-4deg)}}",
".lb-title{font-size:28px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(14px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".lb-title.in{opacity:1;transform:translateY(0)}",
".lb-sub{font-size:13px;color:var(--text-faint);opacity:0;transition:opacity .6s ease .35s}",
".lb-sub.in{opacity:1}",
".lb-body{padding:0 16px}",
".lb-state{text-align:center;padding:50px 20px;color:var(--text-muted);font-size:15px}",
".lb-podium{display:flex;align-items:flex-end;justify-content:center;gap:10px;margin-bottom:22px}",
".lb-pcol{text-align:center;opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s cubic-bezier(.34,1.4,.64,1)}",
".lb-pcol.in{opacity:1;transform:translateY(0)}",
".lb-medal{font-size:34px;margin-bottom:4px;filter:drop-shadow(0 0 10px rgba(0,0,0,.4))}",
".lb-pcard{position:relative;border-radius:18px;padding:14px 10px;overflow:hidden;background:var(--surface-2)}",
".lb-pcard-glow{position:absolute;inset:0;opacity:.5}",
".lb-pav{position:relative;font-size:26px}",
".lb-pname{position:relative;font-weight:800;color:var(--text);font-size:13px;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
".lb-ppts{position:relative;font-weight:900;font-size:17px;margin-top:2px}",
".lb-list{display:flex;flex-direction:column;gap:10px}",
".lb-item{position:relative;border-radius:16px;padding:13px 16px;display:flex;align-items:center;gap:14px;overflow:hidden;animation:lb-slide .5s ease backwards}",
"@keyframes lb-slide{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}",
".lb-rank{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:15px;flex-shrink:0}",
".lb-av{font-size:26px}",
".lb-ibody{flex:1;min-width:0}",
".lb-iname{font-weight:700;color:var(--text);font-size:14px}",
".lb-igrade{color:var(--text-faint);font-size:12px;margin-top:2px}",
".lb-ipts{font-weight:900;color:var(--gold);font-size:15px;flex-shrink:0}",
".lb-me-badge{display:inline-block;font-size:10px;font-weight:800;color:#000;background:var(--gold);border-radius:6px;padding:1px 7px;margin-right:6px}",
".lb-empty{text-align:center;padding:40px;color:var(--text-faint)}",
".lb-empty-em{font-size:42px;margin-bottom:8px}",
].join("\n");

export default function LeaderboardPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const reload = () => { setLoading(true); window.location.reload(); };
  const [myId, setMyId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setErr(false);
        const { data: session } = await withTimeout(Promise.resolve(supabase.auth.getSession()));
        setMyId(session.session?.user?.id || null);
        const { data } = await withTimeout(Promise.resolve(supabase
          .from("profiles")
          .select("id, full_name, points, grade")
          .neq("role", "admin")
          .order("points", { ascending: false })
          .limit(20)));
        setLeaders(data || []);
      } catch (e) {
        setErr(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  const podium = [
    { idx: 1, medal: "🥈", color: "#C0C7D0", flex: 1,   delay: "0.35s", pt: 18 },
    { idx: 0, medal: "🥇", color: "var(--gold)", flex: 1.25, delay: "0.25s", pt: 26 },
    { idx: 2, medal: "🥉", color: "#CD7F32", flex: 1,   delay: "0.45s", pt: 18 },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="lb-root">
        <div className="lb-orb lb-ob" />
        <div className="lb-orb lb-og" />
        <div className="lb-grid" />

        <div className="lb-content">
          <div className="lb-hero">
            <button className="lb-back" onClick={() => navigate("/")}>← {t("btn_back")}</button>
            <div className={cx("lb-logo", mounted && "in")}>
              <div className="lb-logo-bg" />
              <span className="lb-logo-em">🏆</span>
            </div>
            <h1 className={cx("lb-title", mounted && "in")}>{t("lb_title")}</h1>
            <div className={cx("lb-sub", mounted && "in")}>{t("lb_top20")}</div>
          </div>

          <div className="lb-body">
            {loading && <div className="lb-state">⏳ {t("loading")}</div>}
            {err && (
              <div className="lb-state">
                <div style={{ fontSize: 42, marginBottom: 10 }}>📡</div>
                <div style={{ fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>{t("pf_load_error")}</div>
                <div style={{ fontSize: 13, marginBottom: 16 }}>{t("pf_check_net")}</div>
                <button onClick={reload} style={{ padding: "11px 26px", border: "none", borderRadius: 12, background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#3a2400", fontFamily: "'Tajawal',sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>إعادة المحاولة ↻</button>
              </div>
            )}

            {/* المنصة - أول 3 */}
            {!loading && !err && leaders.length >= 3 && (
              <div className="lb-podium">
                {podium.map((p) => {
                  const l = leaders[p.idx];
                  return (
                    <div
                      key={p.idx}
                      className={cx("lb-pcol", mounted && "in")}
                      style={{ flex: p.flex, transitionDelay: p.delay }}
                    >
                      <div className="lb-medal">{p.medal}</div>
                      <div className="lb-pcard" style={{ border: "2px solid " + p.color, boxShadow: "0 6px 24px " + p.color + "30", paddingTop: p.pt }}>
                        <div className="lb-pcard-glow" style={{ background: "radial-gradient(circle at 50% 0%," + p.color + "22,transparent 70%)" }} />
                        <div className="lb-pav">{l?.id === myId ? "🧑‍🚀" : "👦"}</div>
                        <div className="lb-pname">{l?.full_name || t("pg_student")}</div>
                        <div className="lb-ppts" style={{ color: p.color }}>{l?.points || 0}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* باقي القائمة */}
            <div className="lb-list">
              {leaders.slice(3).map((l, i) => {
                const isMe = l.id === myId;
                return (
                  <div
                    key={l.id}
                    className="lb-item"
                    style={{
                      animationDelay: (0.5 + i * 0.05) + "s",
                      background: isMe ? "linear-gradient(135deg,rgba(232,160,32,.16),rgba(201,125,10,.08))" : "var(--surface-2)",
                      border: isMe ? "1.5px solid rgba(232,160,32,.5)" : "1px solid rgba(255,255,255,.07)",
                      boxShadow: isMe ? "0 0 20px rgba(232,160,32,.2)" : "0 4px 18px rgba(0,0,0,.3)",
                    }}
                  >
                    <div className="lb-rank" style={{ background: "var(--border-faint)", color: "var(--text-muted)" }}>{i + 4}</div>
                    <div className="lb-av">{isMe ? "🧑‍🚀" : "👦"}</div>
                    <div className="lb-ibody">
                      <div className="lb-iname">
                        {isMe && <span className="lb-me-badge">{t("lb_me")}</span>}
                        {l.full_name || t("pg_student")}
                      </div>
                      <div className="lb-igrade">{t("lb_year")} {l.grade}</div>
                    </div>
                    <div className="lb-ipts">{l.points || 0} {t("lb_point")}</div>
                  </div>
                );
              })}
            </div>

            {!loading && !err && leaders.length === 0 && (
              <div className="lb-empty">
                <div className="lb-empty-em">📭</div>
                <div>{t("lb_no_data")}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
