import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const FAQ = [
  { q: "كيف أبدأ التعلم؟", a: "اختر السنة الدراسية ثم المادة والدرس الذي تريده." },
  { q: "كيف أحصل على نقاط؟", a: "أكمل التمارين بإجابات صحيحة لتحصل على نقاط." },
  { q: "هل التطبيق مجاني؟", a: "نعم، تطبيق تعليم مجاني بالكامل لجميع تلاميذ الابتدائي." },
];

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".sp-root *,.sp-root *::before,.sp-root *::after{box-sizing:border-box;margin:0;padding:0}",
".sp-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".sp-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".sp-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:sp-d1 14s ease-in-out infinite alternate}",
".sp-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:sp-d2 11s ease-in-out infinite alternate}",
"@keyframes sp-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes sp-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".sp-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".sp-content{position:relative;z-index:2}",
".sp-hero{position:relative;padding:24px 20px 26px;text-align:center}",
".sp-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.8);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:background .2s}",
".sp-back:active{background:rgba(255,255,255,.12)}",
".sp-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:78px;height:78px;margin:8px 0 10px}",
".sp-logo-bg{position:absolute;inset:0;border-radius:22px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong)}",
".sp-logo-em{position:relative;font-size:38px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6))}",
".sp-title{font-size:24px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".sp-sub{font-size:13px;color:var(--text-faint)}",
".sp-body{padding:0 16px}",
".sp-sec{display:flex;align-items:center;gap:8px;margin:8px 0 12px}",
".sp-sec-bar{width:4px;height:20px;border-radius:4px;background:linear-gradient(180deg,var(--gold),var(--gold-deep))}",
".sp-sec-t{font-size:17px;font-weight:800;color:#fff}",
".sp-faq{background:var(--surface-2);border:1px solid var(--border-soft);border-radius:16px;padding:16px;margin-bottom:10px;box-shadow:0 4px 16px rgba(0,0,0,.3)}",
".sp-faq-q{font-weight:700;color:var(--gold);font-size:14px;margin-bottom:6px}",
".sp-faq-a{color:var(--text-muted);font-size:13px;line-height:1.7}",
".sp-card{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:var(--shadow-hero)}",
".sp-label{font-size:13px;font-weight:700;color:rgba(255,255,255,.7);display:block;margin-bottom:8px}",
".sp-textarea{width:100%;padding:13px 16px;border-radius:12px;border:1.5px solid rgba(255,255,255,.1);background:var(--surface-softer);color:var(--text);font-family:'Tajawal',sans-serif;font-size:14px;resize:vertical;outline:none;direction:rtl;line-height:1.7;transition:border-color .2s}",
".sp-textarea:focus{border-color:rgba(232,160,32,.5)}",
".sp-textarea::placeholder{color:var(--text-dim)}",
".sp-send{margin-top:12px;width:100%;padding:14px;border:none;border-radius:13px;color:#000;font-family:'Tajawal',sans-serif;font-size:15px;font-weight:800;transition:transform .15s}",
".sp-send:active{transform:scale(.97)}",
".sp-success{background:linear-gradient(135deg,rgba(34,197,94,.12),rgba(16,163,74,.05));border:1.5px solid rgba(34,197,94,.4);border-radius:20px;padding:32px;text-align:center;box-shadow:0 0 24px rgba(34,197,94,.15)}",
".sp-success-em{font-size:56px;margin-bottom:12px}",
".sp-success-t{font-weight:800;color:#4ade80;font-size:18px;margin-bottom:8px}",
".sp-success-d{color:var(--text-muted);font-size:14px;margin-bottom:20px}",
".sp-again{padding:12px 24px;border:none;border-radius:12px;background:linear-gradient(135deg,#22C55E,#16a34a);color:var(--text);font-family:'Tajawal',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:transform .15s}",
".sp-again:active{transform:scale(.96)}",
].join("\n");

export default function SupportPage() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!msg.trim()) return;
    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const user = session.session?.user;
      await supabase.from("support_messages").insert([{ user_id: user?.id || null, message: msg, status: "pending" }]);
      setSent(true);
    } catch (e) {}
    setLoading(false);
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="sp-root">
        <div className="sp-orb sp-ob" /><div className="sp-orb sp-og" /><div className="sp-grid" />
        <div className="sp-content">
          <div className="sp-hero">
            <button className="sp-back" onClick={() => navigate("/")}>← رجوع</button>
            <div className="sp-logo">
              <div className="sp-logo-bg" />
              <span className="sp-logo-em">💬</span>
            </div>
            <h1 className="sp-title">الدعم</h1>
            <div className="sp-sub">نحن هنا لمساعدتك</div>
          </div>

          <div className="sp-body">
            {sent ? (
              <div className="sp-success">
                <div className="sp-success-em">✅</div>
                <div className="sp-success-t">تم إرسال رسالتك!</div>
                <div className="sp-success-d">سنرد عليك في أقرب وقت</div>
                <button className="sp-again" onClick={() => { setSent(false); setMsg(""); }}>إرسال رسالة أخرى</button>
              </div>
            ) : (
              <>
                <div className="sp-sec">
                  <div className="sp-sec-bar" />
                  <div className="sp-sec-t">أسئلة شائعة</div>
                </div>
                {FAQ.map((item, i) => (
                  <div key={i} className="sp-faq">
                    <div className="sp-faq-q">❓ {item.q}</div>
                    <div className="sp-faq-a">{item.a}</div>
                  </div>
                ))}

                <div className="sp-sec" style={{ marginTop: 20 }}>
                  <div className="sp-sec-bar" />
                  <div className="sp-sec-t">راسلنا</div>
                </div>
                <div className="sp-card">
                  <label className="sp-label">رسالتك</label>
                  <textarea
                    className="sp-textarea"
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    placeholder="اكتب مشكلتك أو سؤالك هنا..."
                    rows={4}
                  />
                  <button
                    className="sp-send"
                    onClick={handleSend}
                    disabled={!msg.trim() || loading}
                    style={{
                      background: msg.trim() ? "linear-gradient(135deg,var(--gold),var(--gold-deep))" : "rgba(255,255,255,.1)",
                      color: msg.trim() ? "#000" : "var(--text-faint)",
                      cursor: msg.trim() ? "pointer" : "default",
                      boxShadow: msg.trim() ? "0 6px 18px rgba(232,160,32,.35)" : "none",
                    }}
                  >
                    {loading ? "جاري الإرسال..." : "إرسال الرسالة 📤"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
