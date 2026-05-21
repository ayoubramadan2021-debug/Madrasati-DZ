import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../store/appState";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".db-root *,.db-root *::before,.db-root *::after{box-sizing:border-box;margin:0;padding:0}",
".db-root{min-height:100dvh;background:#07101f;font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding-left:20px;padding-right:20px}",
".db-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".db-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:db-d1 14s ease-in-out infinite alternate}",
".db-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:db-d2 11s ease-in-out infinite alternate}",
"@keyframes db-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes db-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".db-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".db-content{position:relative;z-index:2;width:100%;max-width:420px;text-align:center}",
".db-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:90px;height:90px;margin-bottom:18px;opacity:0;transform:scale(.7);transition:opacity .7s cubic-bezier(.34,1.56,.64,1),transform .7s cubic-bezier(.34,1.56,.64,1)}",
".db-logo.in{opacity:1;transform:scale(1)}",
".db-logo-bg{position:absolute;inset:0;border-radius:26px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:0 8px 32px rgba(0,0,0,.5)}",
".db-logo-em{position:relative;font-size:46px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6));animation:db-bob 4s ease-in-out infinite}",
"@keyframes db-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
".db-title{font-size:34px;font-weight:900;line-height:1;margin-bottom:8px;background:linear-gradient(135deg,#fff 25%,#E8A020 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(14px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".db-title.in{opacity:1;transform:translateY(0)}",
".db-name{font-size:16px;color:rgba(255,255,255,.6);margin-bottom:20px;opacity:0;transition:opacity .6s ease .35s}",
".db-name.in{opacity:1}",
".db-points{background:linear-gradient(135deg,rgba(15,25,45,.97),rgba(10,16,30,.99));border:1px solid rgba(232,160,32,.25);border-radius:20px;padding:22px;margin-bottom:22px;box-shadow:0 8px 28px rgba(0,0,0,.4);opacity:0;transform:translateY(16px);transition:opacity .5s ease .45s,transform .5s ease .45s}",
".db-points.in{opacity:1;transform:translateY(0)}",
".db-points-n{font-size:38px;font-weight:900;color:#E8A020;line-height:1;text-shadow:0 0 20px rgba(232,160,32,.4)}",
".db-points-l{font-size:13px;color:rgba(255,255,255,.45);margin-top:6px}",
".db-btn{width:100%;padding:16px;border:none;border-radius:16px;background:linear-gradient(135deg,#E8A020,#c97d0a);color:#000;font-family:'Tajawal',sans-serif;font-size:16px;font-weight:800;cursor:pointer;box-shadow:0 6px 20px rgba(232,160,32,.35);transition:transform .15s;opacity:0;transform:translateY(16px);transition:opacity .5s ease .55s,transform .5s ease .55s}",
".db-btn.in{opacity:1;transform:translateY(0)}",
".db-btn:active{transform:scale(.97)}",
].join("\n");

export default function DashboardPage() {
  const { profile } = useAppState();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div className="db-root">
        <div className="db-orb db-ob" /><div className="db-orb db-og" /><div className="db-grid" />
        <div className="db-content">
          <div className={cx("db-logo", mounted && "in")}>
            <div className="db-logo-bg" />
            <span className="db-logo-em">🎓</span>
          </div>
          <h1 className={cx("db-title", mounted && "in")}>تعليم</h1>
          <div className={cx("db-name", mounted && "in")}>{profile?.name || "مرحباً بك"}</div>

          <div className={cx("db-points", mounted && "in")}>
            <div className="db-points-n">{profile?.points ?? 0}</div>
            <div className="db-points-l">نقطة</div>
          </div>

          <button className={cx("db-btn", mounted && "in")} onClick={() => navigate("/")}>
            ابدأ التعلم 🚀
          </button>
        </div>
      </div>
    </>
  );
}
