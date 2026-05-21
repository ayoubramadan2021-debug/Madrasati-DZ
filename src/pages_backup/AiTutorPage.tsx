import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_AI_API_URL || "https://madrasati-ai-api.onrender.com";

type Msg = { role: "user" | "assistant"; content: string };

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".ai-root *,.ai-root *::before,.ai-root *::after{box-sizing:border-box;margin:0;padding:0}",
".ai-root{min-height:100dvh;background:#07101f;font-family:'Tajawal',sans-serif;direction:rtl;display:flex;flex-direction:column;color:#fff;position:relative;overflow:hidden}",
".ai-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".ai-ob{width:480px;height:480px;top:-200px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.55) 0%,transparent 70%);animation:ai-d1 14s ease-in-out infinite alternate}",
".ai-og{width:340px;height:340px;bottom:60px;right:-90px;background:radial-gradient(circle,rgba(232,160,32,.12) 0%,transparent 70%);animation:ai-d2 11s ease-in-out infinite alternate}",
"@keyframes ai-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes ai-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".ai-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".ai-head{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;padding:16px;background:rgba(10,16,30,.7);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.07)}",
".ai-back{padding:8px 14px;background:rgba(255,255,255,.06);color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.1);border-radius:12px;font-family:'Tajawal',sans-serif;font-weight:700;font-size:13px;cursor:pointer;transition:background .2s}",
".ai-back:active{background:rgba(255,255,255,.12)}",
".ai-head-c{text-align:center;flex:1}",
".ai-head-t{display:flex;align-items:center;justify-content:center;gap:8px;font-size:17px;font-weight:900;background:linear-gradient(135deg,#fff 30%,#E8A020 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".ai-bot{font-size:20px;filter:drop-shadow(0 0 8px rgba(232,160,32,.6));animation:ai-bob 4s ease-in-out infinite}",
"@keyframes ai-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}",
".ai-head-s{display:flex;align-items:center;justify-content:center;gap:5px;font-size:11px;color:rgba(255,255,255,.4);margin-top:3px}",
".ai-dot{width:6px;height:6px;border-radius:50%;background:#22C55E;box-shadow:0 0 6px #22C55E;animation:ai-blink 2s ease-in-out infinite}",
"@keyframes ai-blink{0%,100%{opacity:1}50%{opacity:.3}}",
".ai-msgs{flex:1;position:relative;z-index:2;padding:20px 16px 170px;display:flex;flex-direction:column;gap:14px;overflow-y:auto}",
".ai-row{display:flex;animation:ai-in .4s ease backwards}",
"@keyframes ai-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}",
".ai-row.user{justify-content:flex-start}",
".ai-row.bot{justify-content:flex-end}",
".ai-bub{max-width:85%;padding:14px 18px;font-size:14px;line-height:1.7;font-weight:500;white-space:pre-wrap}",
".ai-bub.user{background:linear-gradient(135deg,#E8A020,#c97d0a);color:#000;font-weight:700;border-radius:22px 22px 22px 6px;box-shadow:0 6px 20px rgba(232,160,32,.3)}",
".ai-bub.bot{background:linear-gradient(135deg,rgba(18,28,48,.96),rgba(12,18,32,.98));color:rgba(255,255,255,.92);border:1px solid rgba(255,255,255,.08);border-radius:22px 22px 6px 22px;box-shadow:0 6px 20px rgba(0,0,0,.35)}",
".ai-typing{display:flex;gap:5px;padding:4px 2px}",
".ai-tdot{width:8px;height:8px;border-radius:50%;background:#E8A020;animation:ai-type 1.2s ease-in-out infinite}",
".ai-tdot:nth-child(2){animation-delay:.2s}",
".ai-tdot:nth-child(3){animation-delay:.4s}",
"@keyframes ai-type{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}",
".ai-input-wrap{position:fixed;bottom:96px;left:14px;right:14px;z-index:50;background:rgba(14,22,40,.92);backdrop-filter:blur(20px);padding:8px;border-radius:20px;border:1px solid rgba(255,255,255,.1);display:flex;gap:8px;box-shadow:0 12px 35px rgba(0,0,0,.5)}",
".ai-input{flex:1;padding:14px;border-radius:14px;border:none;background:rgba(255,255,255,.05);font-family:'Tajawal',sans-serif;font-size:13px;font-weight:600;color:#fff;outline:none}",
".ai-input::placeholder{color:rgba(255,255,255,.35)}",
".ai-send{background:linear-gradient(135deg,#E8A020,#c97d0a);color:#000;border:none;padding:0 22px;border-radius:14px;font-family:'Tajawal',sans-serif;font-weight:900;font-size:14px;cursor:pointer;box-shadow:0 4px 14px rgba(232,160,32,.35);transition:transform .15s}",
".ai-send:active{transform:scale(.95)}",
".ai-send:disabled{opacity:.5;cursor:default}",
].join("\n");

export default function AiTutorPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "أهلاً بك يا بطل الجزائر الصغير! 🌟 أنا رفيقك الذكي الجديد. اسألني عن أي تمرين أو فكرة غامضة في الرياضيات أو اللغات وسأبسطها لك بلمح البصر!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const apiMsgs = newMsgs
        .filter(m => m.role === "user" || m.role === "assistant")
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch(API + "/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMsgs, grade: 1, subject: "عام" }),
      });
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content || "عذراً، ما قدرتش أجاوبك دلوقتي. حاول مرة أخرى 🙏";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ تعذّر الاتصال بالخادم. تأكد من الإنترنت وحاول مجدداً." }]);
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
          <button className="ai-back" onClick={() => navigate("/")}>الرئيسية</button>
          <div className="ai-head-c">
            <div className="ai-head-t"><span className="ai-bot">🤖</span> المعلم الذكي</div>
            <div className="ai-head-s"><span className="ai-dot" /> متصل الآن</div>
          </div>
          <div style={{ width: 64 }} />
        </div>

        <div className="ai-msgs">
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
            placeholder="اكتب سؤالك أو تمرينك الصعب هنا يا ذكي..."
          />
          <button className="ai-send" onClick={handleSend} disabled={loading}>أرسل 🚀</button>
        </div>
      </div>
    </>
  );
}
