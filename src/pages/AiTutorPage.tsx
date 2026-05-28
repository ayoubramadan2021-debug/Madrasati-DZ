import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";
import dziad from "../assets/dziad.webp";
import dziadThink from "../assets/dziad-think.webp";
import dziadHappy from "../assets/dziad-happy.webp";

type Msg = { role: "user" | "assistant"; content: string };
type Grade = 1 | 2 | 3 | 4 | 5;

const GRADE_LABELS: Record<Grade, string> = {
  1: "السنة 1",
  2: "السنة 2",
  3: "السنة 3",
  4: "السنة 4",
  5: "السنة 5",
};

const CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
  ".ai-root *,.ai-root *::before,.ai-root *::after{box-sizing:border-box;margin:0;padding:0}",
  ".ai-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;display:flex;flex-direction:column;color:var(--text);position:relative;overflow:hidden}",
  ".ai-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
  ".ai-ob{width:480px;height:480px;top:-200px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.55) 0%,transparent 70%);animation:ai-d1 14s ease-in-out infinite alternate}",
  ".ai-og{width:340px;height:340px;bottom:60px;right:-90px;background:radial-gradient(circle,rgba(232,160,32,.12) 0%,transparent 70%);animation:ai-d2 11s ease-in-out infinite alternate}",
  "@keyframes ai-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
  "@keyframes ai-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
  ".ai-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
  ".ai-head{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;padding:16px;background:rgba(10,16,30,.7);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.07)}",
  ".ai-back{padding:8px 14px;background:var(--border-faint);color:var(--text);border:1px solid var(--border);border-radius:12px;font-family:'Tajawal',sans-serif;font-weight:700;font-size:13px;cursor:pointer;transition:background .2s}",
  ".ai-back:active{background:var(--border-soft)}",
  ".ai-head-c{text-align:center;flex:1}",
  ".ai-head-t{display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:900;background:linear-gradient(135deg,#fff 30%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
  ".ai-bot{width:30px;height:30px;object-fit:contain;filter:drop-shadow(0 0 8px rgba(232,160,32,.6));animation:ai-bob 4s ease-in-out infinite}",
  "@keyframes ai-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}",
  ".ai-head-s{display:flex;align-items:center;justify-content:center;gap:5px;font-size:11px;color:var(--text-faint);margin-top:3px}",
  ".ai-dot{width:6px;height:6px;border-radius:50%;background:#22C55E;box-shadow:0 0 6px #22C55E;animation:ai-blink 2s ease-in-out infinite}",
  "@keyframes ai-blink{0%,100%{opacity:1}50%{opacity:.3}}",
  ".ai-grades{position:relative;z-index:3;display:flex;gap:7px;justify-content:center;flex-wrap:wrap;padding:12px 16px;background:rgba(10,16,30,.5);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.05)}",
  ".ai-grade{padding:7px 14px;border-radius:12px;border:1px solid var(--border);background:var(--border-faint);color:var(--text-faint);font-family:'Tajawal',sans-serif;font-weight:700;font-size:12px;cursor:pointer;transition:all .2s}",
  ".ai-grade:active{transform:scale(.94)}",
  ".ai-grade.on{background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;border-color:var(--gold);box-shadow:0 4px 14px rgba(232,160,32,.35)}",
  ".ai-msgs{flex:1;position:relative;z-index:2;padding:20px 16px 170px;display:flex;flex-direction:column;gap:14px;overflow-y:auto}",".ai-hero{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;margin:8px 0 4px;animation:ai-in .6s ease backwards}",".ai-hero-img{width:140px;height:140px;object-fit:contain;filter:drop-shadow(0 8px 20px rgba(232,160,32,.35));animation:ai-bob 4s ease-in-out infinite}",".ai-hero-txt{font-size:13px;font-weight:700;color:var(--gold);opacity:.9}",
  ".ai-row{display:flex;animation:ai-in .4s ease backwards}",
  "@keyframes ai-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}",
  ".ai-row.user{justify-content:flex-start}",
  ".ai-row.bot{justify-content:flex-end}",
  ".ai-bub{max-width:85%;padding:14px 18px;font-size:14px;line-height:1.7;font-weight:500;white-space:pre-wrap}",
  ".ai-bub.user{background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;font-weight:700;border-radius:22px 22px 22px 6px;box-shadow:0 6px 20px rgba(232,160,32,.3)}",
  ".ai-bub.bot{background:linear-gradient(135deg,rgba(18,28,48,.96),rgba(12,18,32,.98));color:rgba(255,255,255,.92);border:1px solid var(--border-soft);border-radius:22px 22px 6px 22px;box-shadow:0 6px 20px rgba(0,0,0,.35)}",
  ".ai-typing{display:flex;gap:5px;padding:4px 2px}",
  ".ai-tdot{width:8px;height:8px;border-radius:50%;background:var(--gold);animation:ai-type 1.2s ease-in-out infinite}",
  ".ai-tdot:nth-child(2){animation-delay:.2s}",
  ".ai-tdot:nth-child(3){animation-delay:.4s}",
  "@keyframes ai-type{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}",
  ".ai-input-wrap{position:fixed;bottom:96px;left:14px;right:14px;z-index:50;background:rgba(14,22,40,.92);backdrop-filter:blur(20px);padding:8px;border-radius:20px;border:1px solid var(--border);display:flex;gap:8px;box-shadow:0 12px 35px rgba(0,0,0,.5)}",
  ".ai-input{flex:1;padding:14px;border-radius:14px;border:none;background:rgba(255,255,255,.1);font-family:'Tajawal',sans-serif;font-size:13px;font-weight:600;color:#fff;outline:none}",
  ".ai-input::placeholder{color:var(--text-dim)}",
  ".ai-send{background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;border:none;padding:0 22px;border-radius:14px;font-family:'Tajawal',sans-serif;font-weight:900;font-size:14px;cursor:pointer;box-shadow:0 4px 14px rgba(232,160,32,.35);transition:transform .15s}",
  ".ai-send:active{transform:scale(.95)}",
  ".ai-send:disabled{opacity:.5;cursor:default}",
].join("\n");

export default function AiTutorPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [grade, setGrade] = useState<Grade>(3);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: t("ai_welcome") }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setMessages(prev => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, grade, subject: "عام", mode: "answer" }),
      });
      const data = await res.json();
      const reply = res.ok
        ? (data.answer || t("ai_no_understand"))
        : (data.message || t("ai_no_reach"));
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: t("ai_no_connect") }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="ai-root">
        <div className="ai-orb ai-ob" />
        <div className="ai-orb ai-og" />
        <div className="ai-grid" />

        <div className="ai-head">
          <button className="ai-back" onClick={() => navigate("/")}>{t("nav_home")}</button>
          <div className="ai-head-c">
            <div className="ai-head-t"><img className="ai-bot" src={dziad} alt="ديزاد" /> {t("ai_name")}</div>
            <div className="ai-head-s"><span className="ai-dot" /> {t("ai_online")}</div>
          </div>
          <div style={{ width: 64 }} />
        </div>

        <div className="ai-grades">
          {([1, 2, 3, 4, 5] as Grade[]).map(g => (
            <button
              key={g}
              className={"ai-grade" + (grade === g ? " on" : "")}
              onClick={() => setGrade(g)}
            >
              {t(("grade_" + g) as any)}
            </button>
          ))}
        </div>

        <div className="ai-msgs">
          {(messages.length <= 1 || loading) && (
            <div className="ai-hero">
              <img className="ai-hero-img" src={loading ? dziadThink : dziad} alt="ديزاد" />
              <div className="ai-hero-txt">{t("ai_name")}</div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={"ai-row " + (m.role === "user" ? "user" : "bot")} style={{ animationDelay: "0.05s" }}>
              <div className={"ai-bub " + (m.role === "user" ? "user" : "bot")}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="ai-row bot">
              <div className="ai-bub bot">
                <div className="ai-typing">
                  <span className="ai-tdot" /><span className="ai-tdot" /><span className="ai-tdot" />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="ai-input-wrap">
          <input
            className="ai-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder={t("ai_placeholder")}
          />
          <button className="ai-send" onClick={handleSend} disabled={loading}>{t("ai_send")} 🚀</button>
        </div>
      </div>
    </>
  );
}
