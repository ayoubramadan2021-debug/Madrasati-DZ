import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".pg-root *,.pg-root *::before,.pg-root *::after{box-sizing:border-box;margin:0;padding:0}",
".pg-root{min-height:100dvh;background:#07101f;font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".pg-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".pg-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:pg-d1 14s ease-in-out infinite alternate}",
".pg-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:pg-d2 11s ease-in-out infinite alternate}",
"@keyframes pg-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes pg-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".pg-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".pg-content{position:relative;z-index:2}",
".pg-hero{position:relative;padding:24px 20px 32px;text-align:center}",
".pg-back{position:absolute;top:20px;right:16px;display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.8);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:background .2s}",
".pg-back:active{background:rgba(255,255,255,.12)}",
".pg-ring{position:absolute;top:18px;left:50%;transform:translateX(-50%);width:120px;height:120px;border-radius:50%;border:1px solid rgba(232,160,32,.15);animation:pg-spin 18s linear infinite;pointer-events:none}",
"@keyframes pg-spin{to{transform:translateX(-50%) rotate(360deg)}}",
".pg-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:84px;height:84px;margin:12px 0 16px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".pg-logo.in{opacity:1;transform:scale(1)}",
".pg-logo-bg{position:absolute;inset:0;border-radius:26px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:0 8px 32px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.08)}",
".pg-logo-em{position:relative;font-size:42px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6));animation:pg-bob 4s ease-in-out infinite}",
"@keyframes pg-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
".pg-title{font-size:30px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,#E8A020 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(14px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".pg-title.in{opacity:1;transform:translateY(0)}",
".pg-sub{font-size:13px;color:rgba(255,255,255,.4);opacity:0;transition:opacity .6s ease .35s}",
".pg-sub.in{opacity:1}",
".pg-body{padding:0 16px}",
".pg-state{text-align:center;padding:50px 20px;color:rgba(255,255,255,.5);font-size:15px}",
".pg-lock{background:linear-gradient(135deg,rgba(15,25,45,.96),rgba(10,16,30,.98));border:1px solid rgba(255,255,255,.08);border-radius:22px;padding:32px 24px;text-align:center;box-shadow:0 8px 28px rgba(0,0,0,.4)}",
".pg-lock-em{font-size:52px;margin-bottom:14px}",
".pg-lock-t{font-weight:800;color:#fff;font-size:17px;margin-bottom:16px}",
".pg-btn{padding:13px 28px;border:none;border-radius:14px;background:linear-gradient(135deg,#E8A020,#c97d0a);color:#000;font-family:'Tajawal',sans-serif;font-size:14px;font-weight:800;cursor:pointer;box-shadow:0 4px 16px rgba(232,160,32,.35);transition:transform .2s}",
".pg-btn:active{transform:scale(.96)}",
".pg-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px}",
".pg-stat{position:relative;background:linear-gradient(135deg,rgba(15,25,45,.96),rgba(10,16,30,.98));border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:18px 8px;text-align:center;overflow:hidden;opacity:0;transform:translateY(16px);transition:opacity .5s ease,transform .5s cubic-bezier(.34,1.3,.64,1)}",
".pg-stat.in{opacity:1;transform:translateY(0)}",
".pg-stat-strip{position:absolute;top:0;left:0;right:0;height:3px}",
".pg-stat-n{font-size:26px;font-weight:900;line-height:1}",
".pg-stat-l{color:rgba(255,255,255,.4);font-size:11px;margin-top:5px}",
".pg-card{background:linear-gradient(135deg,rgba(15,25,45,.96),rgba(10,16,30,.98));border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:20px;margin-bottom:16px;box-shadow:0 6px 24px rgba(0,0,0,.35);opacity:0;transform:translateY(16px);transition:opacity .5s ease .15s,transform .5s ease .15s}",
".pg-card.in{opacity:1;transform:translateY(0)}",
".pg-card-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}",
".pg-card-t{font-weight:800;color:#fff;font-size:14px}",
".pg-card-v{color:#E8A020;font-weight:800;font-size:14px}",
".pg-bar{background:rgba(255,255,255,.07);border-radius:20px;height:10px;overflow:hidden}",
".pg-bar-f{height:100%;border-radius:20px;background:linear-gradient(90deg,#E8A020,#c97d0a);box-shadow:0 0 12px rgba(232,160,32,.5);transition:width .8s cubic-bezier(.34,1.2,.64,1)}",
".pg-sec{display:flex;align-items:center;gap:10px;margin:22px 0 14px;opacity:0;transform:translateX(14px);transition:opacity .5s ease .25s,transform .5s ease .25s}",
".pg-sec.in{opacity:1;transform:translateX(0)}",
".pg-sec-bar{width:4px;height:20px;border-radius:4px;background:linear-gradient(180deg,#E8A020,#c97d0a)}",
".pg-sec-t{font-size:17px;font-weight:800;color:#fff}",
".pg-empty{text-align:center;padding:40px;color:rgba(255,255,255,.4)}",
".pg-empty-em{font-size:42px;margin-bottom:8px}",
".pg-list{display:flex;flex-direction:column;gap:10px}",
".pg-item{position:relative;background:linear-gradient(135deg,rgba(15,25,45,.96),rgba(10,16,30,.98));border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:14px 16px;display:flex;align-items:center;gap:14px;overflow:hidden;animation:pg-slide .5s ease backwards}",
"@keyframes pg-slide{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}",
".pg-item-strip{position:absolute;right:0;top:0;bottom:0;width:4px;border-radius:0 16px 16px 0}",
".pg-item-ic{width:46px;height:46px;border-radius:13px;display:grid;place-items:center;font-size:20px;flex-shrink:0}",
".pg-item-body{flex:1;min-width:0}",
".pg-item-t{font-weight:700;color:#fff;font-size:14px}",
".pg-item-s{color:rgba(255,255,255,.4);font-size:12px;margin-top:2px}",
".pg-item-pts{font-weight:900;color:#E8A020;font-size:16px;flex-shrink:0}",
].join("\n");

export default function ProgressPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) { setLoading(false); return; }
      const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(prof);
      const { data: prog } = await supabase.from("progress").select("*").eq("user_id", user.id);
      setProgress(prog || []);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const points    = progress.reduce((s, i) => s + Number(i.points || 0), 0);
  const completed = progress.filter(i => i.completed).length;
  const total     = progress.length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;

  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div className="pg-root">
        <div className="pg-orb pg-ob" />
        <div className="pg-orb pg-og" />
        <div className="pg-grid" />

        <div className="pg-content">
          <div className="pg-hero">
            <button className="pg-back" onClick={() => navigate("/")}>← رجوع</button>
            <div className="pg-ring" />
            <div className={cx("pg-logo", mounted && "in")}>
              <div className="pg-logo-bg" />
              <span className="pg-logo-em">📊</span>
            </div>
            <h1 className={cx("pg-title", mounted && "in")}>تقدمي</h1>
            <div className={cx("pg-sub", mounted && "in")}>{profile?.full_name || "تلميذ"}</div>
          </div>

          <div className="pg-body">
            {loading && (
              <div className="pg-state">⏳ جاري التحميل...</div>
            )}

            {!loading && !profile && (
              <div className="pg-lock">
                <div className="pg-lock-em">🔐</div>
                <div className="pg-lock-t">سجّل الدخول أولاً</div>
                <button className="pg-btn" onClick={() => navigate("/auth")}>تسجيل الدخول</button>
              </div>
            )}

            {!loading && profile && (
              <>
                <div className="pg-stats">
                  <div className={cx("pg-stat", mounted && "in")} style={{ transitionDelay: "0.3s" }}>
                    <div className="pg-stat-strip" style={{ background: "linear-gradient(90deg,#E8A020,#c97d0a)" }} />
                    <div className="pg-stat-n" style={{ color: "#E8A020" }}>{points}</div>
                    <div className="pg-stat-l">النقاط</div>
                  </div>
                  <div className={cx("pg-stat", mounted && "in")} style={{ transitionDelay: "0.4s" }}>
                    <div className="pg-stat-strip" style={{ background: "linear-gradient(90deg,#22C55E,#16a34a)" }} />
                    <div className="pg-stat-n" style={{ color: "#22C55E" }}>{completed}</div>
                    <div className="pg-stat-l">مكتمل</div>
                  </div>
                  <div className={cx("pg-stat", mounted && "in")} style={{ transitionDelay: "0.5s" }}>
                    <div className="pg-stat-strip" style={{ background: "linear-gradient(90deg,#3B82F6,#2563eb)" }} />
                    <div className="pg-stat-n" style={{ color: "#3B82F6" }}>{pct}%</div>
                    <div className="pg-stat-l">التقدم</div>
                  </div>
                </div>

                <div className={cx("pg-card", mounted && "in")}>
                  <div className="pg-card-head">
                    <span className="pg-card-t">التقدم الإجمالي</span>
                    <span className="pg-card-v">{completed}/{total}</span>
                  </div>
                  <div className="pg-bar">
                    <div className="pg-bar-f" style={{ width: (mounted ? pct : 0) + "%" }} />
                  </div>
                </div>

                <div className={cx("pg-sec", mounted && "in")}>
                  <div className="pg-sec-bar" />
                  <div className="pg-sec-t">سجل النشاط</div>
                </div>

                {progress.length === 0 && (
                  <div className="pg-empty">
                    <div className="pg-empty-em">📭</div>
                    <div>لا يوجد نشاط بعد</div>
                  </div>
                )}

                <div className="pg-list">
                  {progress.map((p, i) => (
                    <div key={p.id} className="pg-item" style={{ animationDelay: (0.4 + i * 0.06) + "s" }}>
                      <div className="pg-item-strip" style={{ background: p.completed ? "linear-gradient(180deg,#22C55E,#16a34a)" : "linear-gradient(180deg,#3B82F6,#2563eb)" }} />
                      <div className="pg-item-ic" style={{ background: p.completed ? "rgba(34,197,94,.12)" : "rgba(59,130,246,.12)" }}>
                        {p.completed ? "✅" : "⏳"}
                      </div>
                      <div className="pg-item-body">
                        <div className="pg-item-t">درس {p.lesson_id}</div>
                        <div className="pg-item-s">{p.completed ? "مكتمل" : "قيد التقدم"}</div>
                      </div>
                      <div className="pg-item-pts">+{p.points || 0}</div>
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
