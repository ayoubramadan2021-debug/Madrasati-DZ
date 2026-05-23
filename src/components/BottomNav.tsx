import { Link, useLocation } from "react-router-dom";

const items = [
  { to: "/", icon: "🏠", label: "الرئيسية" },
  { to: "/grade/1", icon: "📚", label: "الدروس" },
  { to: "/ai-tutor", icon: "🤖", label: "المعلم" },
  { to: "/progress", icon: "📊", label: "التقدم" },
  { to: "/profile", icon: "👤", label: "حسابي" },
];

const CSS = [
".bn-wrap{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;z-index:999;background:var(--bn-bg,rgba(10,16,30,.82));backdrop-filter:blur(20px) saturate(1.4);-webkit-backdrop-filter:blur(20px) saturate(1.4);border-top:1px solid var(--border);box-shadow:0 -8px 30px rgba(0,0,0,.25);display:grid;grid-template-columns:repeat(5,1fr);padding:10px 4px calc(12px + env(safe-area-inset-bottom,0px));direction:rtl}",
".bn-item{display:flex;flex-direction:column;align-items:center;gap:5px;text-decoration:none;padding:6px 2px;position:relative;transition:transform .2s;-webkit-tap-highlight-color:transparent}",
".bn-item:active{transform:scale(.88)}",
".bn-ic-wrap{position:relative;width:46px;height:34px;display:grid;place-items:center;border-radius:14px;transition:all .3s cubic-bezier(.34,1.56,.64,1)}",
".bn-item.active .bn-ic-wrap{background:var(--gold-soft)}",
".bn-item.active .bn-ic-wrap::before{content:'';position:absolute;inset:-3px;border-radius:16px;background:radial-gradient(circle,var(--gold-glow) 0%,transparent 70%);opacity:.7;z-index:-1;animation:bn-glow 2s ease-in-out infinite}",
"@keyframes bn-glow{0%,100%{opacity:.4}50%{opacity:.8}}",
".bn-ic{font-size:21px;line-height:1;transition:transform .3s;filter:grayscale(.3) opacity(.65)}",
".bn-item.active .bn-ic{transform:scale(1.18);filter:grayscale(0) opacity(1)}",
".bn-label{font-size:10.5px;font-weight:700;font-family:'Tajawal',sans-serif;color:var(--text-faint);transition:color .25s;white-space:nowrap}",
".bn-item.active .bn-label{color:var(--gold);font-weight:800}",
].join("\n");

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      <style>{CSS}</style>
      <div className="bn-wrap">
        {items.map((item) => {
          const active =
            item.to === "/" ? path === "/" :
            item.to === "/grade/1" ? path.startsWith("/grade") || path.startsWith("/lesson") || path.startsWith("/exercise") || path.startsWith("/quiz") :
            path === item.to;
          return (
            <Link key={item.to} to={item.to} className={"bn-item" + (active ? " active" : "")}>
              <div className="bn-ic-wrap"><span className="bn-ic">{item.icon}</span></div>
              <span className="bn-label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
