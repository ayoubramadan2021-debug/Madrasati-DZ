import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".nt-root *,.nt-root *::before,.nt-root *::after{box-sizing:border-box;margin:0;padding:0}",
".nt-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".nt-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".nt-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:nt-d1 14s ease-in-out infinite alternate}",
".nt-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:nt-d2 11s ease-in-out infinite alternate}",
"@keyframes nt-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes nt-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".nt-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".nt-content{position:relative;z-index:2}",
".nt-hero{position:relative;padding:24px 20px 28px;text-align:center}",
".nt-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:background .2s}",
".nt-back:active{background:var(--border-soft)}",
".nt-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;margin:12px 0 12px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".nt-logo.in{opacity:1;transform:scale(1)}",
".nt-logo-bg{position:absolute;inset:0;border-radius:24px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong)}",
".nt-logo-em{position:relative;font-size:40px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6));animation:nt-bob 4s ease-in-out infinite}",
"@keyframes nt-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
".nt-title{font-size:26px;font-weight:900;line-height:1;margin-bottom:8px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(14px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".nt-title.in{opacity:1;transform:translateY(0)}",
".nt-badge{display:inline-block;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;border-radius:20px;padding:4px 14px;font-size:12px;font-weight:800;opacity:0;transition:opacity .6s ease .35s}",
".nt-badge.in{opacity:1}",
".nt-body{padding:0 16px}",
".nt-state{text-align:center;padding:50px 20px;color:var(--text-muted);font-size:15px}",
".nt-empty{text-align:center;padding:50px 20px;color:var(--text-faint)}",
".nt-empty-em{font-size:48px;margin-bottom:10px}",
".nt-list{display:flex;flex-direction:column;gap:10px}",
".nt-item{position:relative;border-radius:16px;padding:15px 16px;display:flex;gap:14px;overflow:hidden;animation:nt-slide .5s ease backwards;transition:transform .2s}",
".nt-item:active{transform:scale(.99)}",
"@keyframes nt-slide{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}",
".nt-item-ic{width:44px;height:44px;border-radius:13px;display:grid;place-items:center;font-size:21px;flex-shrink:0}",
".nt-item-body{flex:1;min-width:0}",
".nt-item-t{font-weight:700;color:var(--text);font-size:14px}",
".nt-item-m{color:var(--text-muted);font-size:12px;margin-top:3px;line-height:1.5}",
".nt-item-d{color:var(--text-dim);font-size:11px;margin-top:5px}",
".nt-dot{width:10px;height:10px;border-radius:50%;background:var(--gold);box-shadow:0 0 8px var(--gold);flex-shrink:0;margin-top:5px}",
].join("\n");

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const reload = () => { setLoading(true); window.location.reload(); };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setErr(false);
        const { data: session } = await supabase.auth.getSession();
        const user = session.session?.user;
        if (!user) { setLoading(false); return; }
        const { data } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        setNotifs(data || []);
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

  async function markRead(id: string) {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  }

  const unread = notifs.filter(n => !n.is_read).length;
  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  const iconBg = (type: string) =>
    type === "success" ? "rgba(34,197,94,.15)" : type === "warning" ? "rgba(232,160,32,.15)" : "rgba(59,130,246,.15)";
  const iconEm = (type: string) =>
    type === "success" ? "✅" : type === "warning" ? "⚠️" : "ℹ️";

  return (
    <>
      <style>{CSS}</style>
      <div className="nt-root">
        <div className="nt-orb nt-ob" /><div className="nt-orb nt-og" /><div className="nt-grid" />
        <div className="nt-content">
          <div className="nt-hero">
            <button className="nt-back" onClick={() => navigate("/")}>← رجوع</button>
            <div className={cx("nt-logo", mounted && "in")}>
              <div className="nt-logo-bg" />
              <span className="nt-logo-em">🔔</span>
            </div>
            <h1 className={cx("nt-title", mounted && "in")}>الإشعارات</h1>
            {unread > 0 && <div className={cx("nt-badge", mounted && "in")}>{unread} جديد</div>}
          </div>

          <div className="nt-body">
            {loading && <div className="nt-state">⏳ جاري التحميل...</div>}
            {err && (
              <div className="nt-state">
                <div style={{ fontSize: 42, marginBottom: 10 }}>📡</div>
                <div style={{ fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>تعذّر تحميل البيانات</div>
                <div style={{ fontSize: 13, marginBottom: 16 }}>تحقّق من اتصالك بالإنترنت وحاول مجدداً</div>
                <button onClick={reload} style={{ padding: "11px 26px", border: "none", borderRadius: 12, background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#3a2400", fontFamily: "'Tajawal',sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>إعادة المحاولة ↻</button>
              </div>
            )}

            {!loading && !err && notifs.length === 0 && (
              <div className="nt-empty">
                <div className="nt-empty-em">🔕</div>
                <div>لا توجد إشعارات</div>
              </div>
            )}

            <div className="nt-list">
              {notifs.map((n, i) => (
                <div
                  key={n.id}
                  className="nt-item"
                  onClick={() => !n.is_read && markRead(n.id)}
                  style={{
                    animationDelay: (0.3 + i * 0.06) + "s",
                    background: n.is_read ? "var(--surface-2)" : "linear-gradient(135deg,rgba(232,160,32,.12),rgba(201,125,10,.06))",
                    border: n.is_read ? "1px solid rgba(255,255,255,.07)" : "1.5px solid rgba(232,160,32,.4)",
                    boxShadow: n.is_read ? "0 4px 16px rgba(0,0,0,.3)" : "0 0 18px rgba(232,160,32,.15)",
                    cursor: n.is_read ? "default" : "pointer",
                  }}
                >
                  <div className="nt-item-ic" style={{ background: iconBg(n.type) }}>{iconEm(n.type)}</div>
                  <div className="nt-item-body">
                    <div className="nt-item-t">{n.title}</div>
                    <div className="nt-item-m">{n.body}</div>
                    <div className="nt-item-d">{new Date(n.created_at).toLocaleDateString("ar-DZ")}</div>
                  </div>
                  {!n.is_read && <div className="nt-dot" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
