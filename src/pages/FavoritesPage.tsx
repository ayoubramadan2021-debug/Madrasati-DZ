import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".fv-root *,.fv-root *::before,.fv-root *::after{box-sizing:border-box;margin:0;padding:0}",
".fv-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".fv-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".fv-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:fv-d1 14s ease-in-out infinite alternate}",
".fv-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:fv-d2 11s ease-in-out infinite alternate}",
"@keyframes fv-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes fv-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".fv-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".fv-content{position:relative;z-index:2}",
".fv-hero{position:relative;padding:24px 20px 28px;text-align:center}",
".fv-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:background .2s}",
".fv-back:active{background:var(--border-soft)}",
".fv-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;margin:12px 0 12px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".fv-logo.in{opacity:1;transform:scale(1)}",
".fv-logo-bg{position:absolute;inset:0;border-radius:24px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong)}",
".fv-logo-em{position:relative;font-size:40px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6));animation:fv-bob 4s ease-in-out infinite}",
"@keyframes fv-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
".fv-title{font-size:26px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(14px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".fv-title.in{opacity:1;transform:translateY(0)}",
".fv-sub{font-size:13px;color:var(--text-faint);opacity:0;transition:opacity .6s ease .35s}",
".fv-sub.in{opacity:1}",
".fv-body{padding:0 16px}",
".fv-state{text-align:center;padding:50px 20px;color:var(--text-muted);font-size:15px}",
".fv-empty{text-align:center;padding:40px 20px;color:var(--text-faint)}",
".fv-empty-em{font-size:48px;margin-bottom:10px}",
".fv-empty-btn{margin-top:16px;padding:12px 26px;border:none;border-radius:13px;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;font-family:'Tajawal',sans-serif;font-size:14px;font-weight:800;cursor:pointer;box-shadow:0 4px 14px rgba(232,160,32,.3);transition:transform .15s}",
".fv-empty-btn:active{transform:scale(.96)}",
".fv-list{display:flex;flex-direction:column;gap:10px}",
".fv-item{position:relative;background:var(--surface-2);border:1px solid var(--border-soft);border-radius:16px;padding:14px 16px;display:flex;align-items:center;gap:14px;box-shadow:0 4px 18px rgba(0,0,0,.3);overflow:hidden;animation:fv-slide .5s ease backwards}",
"@keyframes fv-slide{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}",
".fv-item-strip{position:absolute;right:0;top:0;bottom:0;width:4px;border-radius:0 16px 16px 0;background:linear-gradient(180deg,var(--gold),var(--gold-deep))}",
".fv-item-ic{width:48px;height:48px;border-radius:14px;background:rgba(232,160,32,.14);border:1px solid rgba(232,160,32,.25);display:grid;place-items:center;font-size:22px;flex-shrink:0}",
".fv-item-body{flex:1;min-width:0}",
".fv-item-t{font-weight:700;color:var(--text);font-size:15px}",
".fv-item-d{color:var(--text-faint);font-size:12px;margin-top:2px}",
".fv-del{width:34px;height:34px;border-radius:50%;background:rgba(220,80,80,.12);border:1px solid rgba(220,80,80,.25);color:#ff6b6b;cursor:pointer;font-size:15px;display:grid;place-items:center;flex-shrink:0;transition:background .2s}",
".fv-del:active{background:rgba(220,80,80,.22)}",
].join("\n");

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<any[]>([]);
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
          .from("favorites")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        setFavorites(data || []);
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

  async function removeFavorite(id: string) {
    await supabase.from("favorites").delete().eq("id", id);
    setFavorites(prev => prev.filter(f => f.id !== id));
  }

  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div className="fv-root">
        <div className="fv-orb fv-ob" /><div className="fv-orb fv-og" /><div className="fv-grid" />
        <div className="fv-content">
          <div className="fv-hero">
            <button className="fv-back" onClick={() => navigate("/")}>← رجوع</button>
            <div className={cx("fv-logo", mounted && "in")}>
              <div className="fv-logo-bg" />
              <span className="fv-logo-em">⭐</span>
            </div>
            <h1 className={cx("fv-title", mounted && "in")}>المفضلة</h1>
            <div className={cx("fv-sub", mounted && "in")}>{favorites.length} عنصر محفوظ</div>
          </div>

          <div className="fv-body">
            {loading && <div className="fv-state">⏳ جاري التحميل...</div>}
            {err && (
              <div className="fv-state">
                <div style={{ fontSize: 42, marginBottom: 10 }}>📡</div>
                <div style={{ fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>تعذّر تحميل البيانات</div>
                <div style={{ fontSize: 13, marginBottom: 16 }}>تحقّق من اتصالك بالإنترنت وحاول مجدداً</div>
                <button onClick={reload} style={{ padding: "11px 26px", border: "none", borderRadius: 12, background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#3a2400", fontFamily: "'Tajawal',sans-serif", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>إعادة المحاولة ↻</button>
              </div>
            )}

            {!loading && !err && favorites.length === 0 && (
              <div className="fv-empty">
                <div className="fv-empty-em">📭</div>
                <div style={{ fontSize: 16 }}>لا يوجد عناصر في المفضلة</div>
                <button className="fv-empty-btn" onClick={() => navigate("/grade/1")}>تصفح الدروس</button>
              </div>
            )}

            <div className="fv-list">
              {favorites.map((f, i) => (
                <div key={f.id} className="fv-item" style={{ animationDelay: (0.3 + i * 0.06) + "s" }}>
                  <div className="fv-item-strip" />
                  <div className="fv-item-ic">⭐</div>
                  <div className="fv-item-body">
                    <div className="fv-item-t">{f.title || "درس"}</div>
                    <div className="fv-item-d">{f.subject} — السنة {f.grade}</div>
                  </div>
                  <button className="fv-del" onClick={() => removeFavorite(f.id)}>✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
