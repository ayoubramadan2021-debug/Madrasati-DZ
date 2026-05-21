import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Grade { id:number; name:string; color:string; glow:string; icon:string; subjects:number; lessons:number; progress:number; }

const grades: Grade[] = [
  { id:1, name:"السنة الأولى",  color:"#22C55E", glow:"#16a34a", icon:"🌱", subjects:6,  lessons:48, progress:15 },
  { id:2, name:"السنة الثانية", color:"#3B82F6", glow:"#2563eb", icon:"📖", subjects:7,  lessons:56, progress:30 },
  { id:3, name:"السنة الثالثة", color:"#A855F7", glow:"#9333ea", icon:"🔬", subjects:8,  lessons:64, progress:20 },
  { id:4, name:"السنة الرابعة", color:"#F97316", glow:"#ea580c", icon:"🧮", subjects:9,  lessons:72, progress:45 },
  { id:5, name:"السنة الخامسة", color:"#EAB308", glow:"#ca8a04", icon:"🏆", subjects:10, lessons:80, progress:10 },
];

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".home-root *,.home-root *::before,.home-root *::after{box-sizing:border-box;margin:0;padding:0}",
".home-root{min-height:100dvh;background:#07101f;font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative}",
".bg-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".orb-blue{width:500px;height:500px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.65) 0%,transparent 70%);animation:drift-b 14s ease-in-out infinite alternate}",
".orb-gold{width:380px;height:380px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.14) 0%,transparent 70%);animation:drift-g 11s ease-in-out infinite alternate}",
".orb-acc{width:250px;height:250px;top:45%;left:55%;background:radial-gradient(circle,rgba(168,85,247,.09) 0%,transparent 70%);animation:drift-g 8s ease-in-out infinite alternate}",
"@keyframes drift-b{from{transform:translate(0,0) scale(1)}to{transform:translate(6%,5%) scale(1.12)}}",
"@keyframes drift-g{from{transform:translate(0,0) scale(1)}to{transform:translate(-5%,-7%) scale(1.08)}}",
".bg-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);background-size:44px 44px}",
".particles{position:fixed;inset:0;pointer-events:none;z-index:1}",
".dot{position:absolute;border-radius:50%;background:rgba(232,160,32,.8);animation:float-dot linear infinite}",
"@keyframes float-dot{0%{transform:translateY(0) scale(1);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateY(-90px) scale(.3);opacity:0}}",
".content{position:relative;z-index:2;padding-bottom:110px}",
".hero{position:relative;padding:60px 20px 36px;text-align:center}",
".logo-ring{position:absolute;top:36px;left:50%;transform:translateX(-50%);width:220px;height:220px;border-radius:50%;border:1px solid rgba(232,160,32,.15);animation:spin-slow 20s linear infinite;pointer-events:none}",
".logo-ring::before{content:'';position:absolute;top:-3px;left:50%;width:6px;height:6px;border-radius:50%;background:#E8A020;box-shadow:0 0 12px #E8A020,0 0 24px #E8A020}",
".logo-ring2{position:absolute;top:56px;left:50%;transform:translateX(-50%);width:180px;height:180px;border-radius:50%;border:1px solid rgba(27,58,107,.4);animation:spin-slow 14s linear infinite reverse;pointer-events:none}",
"@keyframes spin-slow{to{transform:translateX(-50%) rotate(360deg)}}",
".logo-wrap{position:relative;display:inline-flex;align-items:center;justify-content:center;width:100px;height:100px;margin-bottom:22px;opacity:0;transform:scale(.6) translateY(-20px);transition:opacity .8s cubic-bezier(.34,1.56,.64,1),transform .8s cubic-bezier(.34,1.56,.64,1)}",
".logo-wrap.in{opacity:1;transform:scale(1) translateY(0)}",
".logo-bg{position:absolute;inset:0;border-radius:30px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:0 0 0 4px rgba(232,160,32,.06),0 12px 40px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.08)}",
".logo-emoji{position:relative;font-size:50px;filter:drop-shadow(0 0 16px rgba(232,160,32,.7));animation:bob 4s ease-in-out infinite}",
"@keyframes bob{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-6px) rotate(-3deg)}}",
".badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:30px;background:rgba(232,160,32,.1);border:1px solid rgba(232,160,32,.25);font-size:11px;font-weight:600;color:#E8A020;letter-spacing:.8px;margin-bottom:14px;opacity:0;transform:translateY(8px);transition:opacity .5s ease .1s,transform .5s ease .1s}",
".badge.in{opacity:1;transform:translateY(0)}",
".bdot{width:6px;height:6px;border-radius:50%;background:#E8A020;box-shadow:0 0 6px #E8A020;animation:blink 2s ease-in-out infinite}",
"@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}",
".hero-title{font-size:52px;font-weight:900;line-height:1;margin-bottom:10px;background:linear-gradient(135deg,#fff 20%,#e2c97e 60%,#E8A020 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 20px rgba(232,160,32,.25));opacity:0;transform:translateY(20px);transition:opacity .6s ease .25s,transform .6s ease .25s}",
".hero-title.in{opacity:1;transform:translateY(0)}",
".hero-sub{font-size:14px;font-weight:400;color:rgba(255,255,255,.38);letter-spacing:1px;opacity:0;transition:opacity .6s ease .4s}",
".hero-sub.in{opacity:1}",
".divider{display:flex;align-items:center;gap:12px;margin:24px auto 0;width:200px;opacity:0;transition:opacity .6s ease .55s}",
".divider.in{opacity:1}",
".dline{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(232,160,32,.4))}",
".dline.r{background:linear-gradient(90deg,rgba(232,160,32,.4),transparent)}",
".dstar{color:#E8A020;font-size:10px}",
".stats{display:flex;margin:24px 16px 0;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:20px;overflow:hidden;opacity:0;transform:translateY(16px);transition:opacity .6s ease .65s,transform .6s ease .65s}",
".stats.in{opacity:1;transform:translateY(0)}",
".stat{flex:1;padding:16px 8px;text-align:center;position:relative}",
".stat+.stat::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:rgba(255,255,255,.07)}",
".stat-n{font-size:26px;font-weight:900;color:#E8A020;display:block;line-height:1;text-shadow:0 0 20px rgba(232,160,32,.4)}",
".stat-l{font-size:11px;color:rgba(255,255,255,.35);margin-top:5px;display:block}",
".sec-head{display:flex;align-items:center;gap:10px;padding:28px 20px 14px;opacity:0;transform:translateX(16px);transition:opacity .5s ease .75s,transform .5s ease .75s}",
".sec-head.in{opacity:1;transform:translateX(0)}",
".sec-ico{font-size:20px;filter:drop-shadow(0 0 8px rgba(232,160,32,.5))}",
".sec-title{font-size:17px;font-weight:700;color:#fff}",
".sec-line{flex:1;height:1px;background:linear-gradient(90deg,rgba(255,255,255,.08),transparent)}",
".cards{display:flex;flex-direction:column;gap:12px;padding:0 16px}",
".card{position:relative;border-radius:22px;overflow:hidden;cursor:pointer;opacity:0;transform:translateX(50px) scale(.95);transition:opacity .55s cubic-bezier(.34,1.2,.64,1),transform .55s cubic-bezier(.34,1.2,.64,1),box-shadow .3s ease}",
".card.in{opacity:1;transform:translateX(0) scale(1)}",
".card:active{transform:scale(.97)!important}",
".cbg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(15,25,45,.96),rgba(10,16,30,.98));border:1px solid rgba(255,255,255,.07);border-radius:22px;transition:border-color .3s ease}",
".card.act .cbg{border-color:rgba(255,255,255,.16)}",
".cstrip{position:absolute;right:0;top:0;bottom:0;width:4px;border-radius:0 22px 22px 0;transition:width .3s ease}",
".card.act .cstrip{width:7px}",
".cglow{position:absolute;inset:0;border-radius:22px;opacity:0;pointer-events:none;transition:opacity .35s ease}",
".card.act .cglow{opacity:1}",
".cshim{position:absolute;inset:0;border-radius:22px;background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.045) 50%,transparent 65%);opacity:0;pointer-events:none;transition:opacity .3s ease}",
".card.act .cshim{opacity:1}",
".cghost{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:64px;font-weight:900;color:#fff;opacity:.045;line-height:1;pointer-events:none;user-select:none}",
".cinner{position:relative;display:flex;align-items:center;gap:14px;padding:18px 18px 18px 20px;transition:transform .2s ease}",
".card.act .cinner{transform:translateX(-2px)}",
".cicon{width:60px;height:60px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease}",
".card.act .cicon{transform:scale(1.12) rotate(-5deg)}",
".ctext{flex:1;min-width:0}",
".cname{font-size:19px;font-weight:800;color:#fff;display:block;margin-bottom:6px;letter-spacing:-.3px}",
".cmeta{display:flex;gap:14px}",
".cpill{font-size:11.5px;color:rgba(255,255,255,.45);display:flex;align-items:center;gap:5px}",
".cprog-wrap{margin-top:8px;height:3px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden}",
".cprog-fill{height:100%;border-radius:2px;animation:prog-load 1s ease forwards;transform-origin:right}",
"@keyframes prog-load{from{width:0}}",
".carrow{width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.05);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:17px;color:rgba(255,255,255,.35);transition:background .25s,color .25s,transform .25s cubic-bezier(.34,1.56,.64,1)}",
".card.act .carrow{background:rgba(255,255,255,.12);color:#fff;transform:translateX(-5px)}",
".cta{margin:24px 16px 0;padding:18px;background:linear-gradient(135deg,rgba(27,58,107,.5),rgba(232,160,32,.09));border:1px solid rgba(232,160,32,.22);border-radius:20px;display:flex;align-items:center;gap:12px;opacity:0;transition:opacity .6s ease 1.4s;position:relative;overflow:hidden}",
".cta::before{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 40%,rgba(232,160,32,.04) 50%,transparent 60%);animation:cta-shim 3s linear infinite}",
"@keyframes cta-shim{from{transform:translateX(-100%)}to{transform:translateX(200%)}}",
".cta.in{opacity:1}",
".cta-ico{font-size:32px;flex-shrink:0;animation:bob 3s ease-in-out infinite}",
".cta-body{flex:1}",
".cta-t{font-size:14px;font-weight:800;color:#E8A020;margin-bottom:3px}",
".cta-d{font-size:12px;color:rgba(255,255,255,.38);line-height:1.5}",
".cta-btn{padding:9px 16px;background:linear-gradient(135deg,#E8A020,#c97d0a);border-radius:12px;font-size:12px;font-weight:800;color:#000;white-space:nowrap;box-shadow:0 4px 16px rgba(232,160,32,.35),0 0 0 1px rgba(255,255,255,.1) inset;cursor:pointer;border:none;font-family:'Tajawal',sans-serif;transition:transform .2s,box-shadow .2s}",
".cta-btn:active{transform:scale(.96)}",
".hd-actions{position:absolute;top:18px;left:16px;display:flex;gap:10px;z-index:5}",
".hd-btn{position:relative;width:44px;height:44px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);display:grid;place-items:center;font-size:20px;cursor:pointer;transition:background .2s,transform .15s}",
".hd-btn:active{transform:scale(.9);background:rgba(255,255,255,.12)}",
".hd-badge{position:absolute;top:-4px;left:-4px;min-width:18px;height:18px;padding:0 4px;border-radius:9px;background:#EF4444;color:#fff;font-size:10px;font-weight:800;display:grid;place-items:center;box-shadow:0 0 0 2px #07101f}",
].join("\n");

export default function Home() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const dots = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: (Math.random() * 100) + "%",
        top: (Math.random() * 100) + "%",
        w: (Math.random() * 3.5 + 1.5) + "px",
        delay: (Math.random() * 7) + "s",
        dur: (Math.random() * 4 + 4) + "s",
        op: Math.random() * 0.6 + 0.15,
      })),
    []
  );

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div className="home-root">
        <div className="bg-orb orb-blue" />
        <div className="bg-orb orb-gold" />
        <div className="bg-orb orb-acc" />
        <div className="bg-grid" />
        <div className="particles">
          {dots.map((d) => (
            <div key={d.id} className="dot" style={{ left:d.left, top:d.top, width:d.w, height:d.w, animationDelay:d.delay, animationDuration:d.dur, opacity:d.op }} />
          ))}
        </div>

        <div className="content">
          <div className="hero">
            <div className="hd-actions">
              <div className="hd-btn" onClick={() => navigate("/search")}>🔎</div>
              <div className="hd-btn" onClick={() => navigate("/notifications")}>🔔</div>
              <div className="hd-btn" onClick={() => navigate("/favorites")}>⭐</div>
            </div>
            <div className="logo-ring" />
            <div className="logo-ring2" />
            <div className={cx("logo-wrap", mounted && "in")}>
              <div className="logo-bg" />
              <span className="logo-emoji">🎓</span>
            </div>
            <div className={cx("badge", mounted && "in")}>
              <div className="bdot" /> منصة جزائرية
            </div>
            <h1 className={cx("hero-title", mounted && "in")}>تعليم</h1>
            <p className={cx("hero-sub", mounted && "in")}>منصة التعليم الذكي الجزائرية</p>
            <div className={cx("divider", mounted && "in")}>
              <div className="dline" />
              <span className="dstar">✦</span>
              <div className="dline r" />
            </div>
          </div>

          <div className={cx("stats", mounted && "in")}>
            {[["5","سنوات"],["40+","مادة"],["320+","درس"]].map(([n,l]) => (
              <div className="stat" key={l}>
                <span className="stat-n">{n}</span>
                <span className="stat-l">{l}</span>
              </div>
            ))}
          </div>

          <div className={cx("sec-head", mounted && "in")}>
            <span className="sec-ico">📚</span>
            <span className="sec-title">اختر سنتك الدراسية</span>
            <div className="sec-line" />
          </div>

          <div className="cards">
            {grades.map((g, i) => {
              const isAct = active === g.id;
              const delay = 0.8 + i * 0.1;
              return (
                <div
                  key={g.id}
                  className={cx("card", mounted && "in", isAct && "act")}
                  style={{
                    transitionDelay: delay + "s",
                    boxShadow: isAct
                      ? "0 0 0 2px " + g.color + "60, 0 8px 32px " + g.color + "25"
                      : "0 4px 20px rgba(0,0,0,.4)",
                  }}
                  onClick={() => navigate("/grade/" + g.id)}
                  onMouseEnter={() => setActive(g.id)}
                  onMouseLeave={() => setActive(null)}
                  onTouchStart={() => setActive(g.id)}
                  onTouchEnd={() => setActive(null)}
                >
                  <div className="cbg" />
                  <div className="cstrip" style={{ background: "linear-gradient(180deg," + g.color + "," + g.glow + ")" }} />
                  <div className="cglow" style={{ boxShadow: "inset 0 0 40px " + g.color + "12,0 0 30px " + g.color + "15" }} />
                  <div className="cshim" />
                  <div className="cghost">{g.id}</div>
                  <div className="cinner">
                    <div className="cicon" style={{ background:"linear-gradient(145deg," + g.color + "22," + g.color + "10)", border:"1px solid " + g.color + "30", boxShadow: isAct ? "0 0 20px " + g.color + "30" : "none" }}>
                      {g.icon}
                    </div>
                    <div className="ctext">
                      <span className="cname">{g.name}</span>
                      <div className="cmeta">
                        <span className="cpill">📖 {g.subjects} مواد</span>
                        <span className="cpill">🎯 {g.lessons} درس</span>
                      </div>
                      <div className="cprog-wrap">
                        <div className="cprog-fill" style={{ width: g.progress + "%", background:"linear-gradient(90deg," + g.color + "," + g.glow + ")", animationDelay: (delay + 0.3) + "s" }} />
                      </div>
                    </div>
                    <div className="carrow">←</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={cx("cta", mounted && "in")}>
            <span className="cta-ico">🤖</span>
            <div className="cta-body">
              <div className="cta-t">المعلم الذكي جاهز!</div>
              <div className="cta-d">اسأل أي سؤال وراح يجاوبك فوراً</div>
            </div>
            <button className="cta-btn" onClick={() => navigate("/ai-tutor")}>جرّبه ←</button>
          </div>
        </div>
      </div>
    </>
  );
}
