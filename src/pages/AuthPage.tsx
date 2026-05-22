import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const GRADES = ["السنة الأولى","السنة الثانية","السنة الثالثة","السنة الرابعة","السنة الخامسة"];

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".au-root *,.au-root *::before,.au-root *::after{box-sizing:border-box;margin:0;padding:0}",
".au-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;position:relative;overflow:hidden}",
".au-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".au-ob{width:520px;height:520px;top:-200px;left:-140px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:au-d1 14s ease-in-out infinite alternate}",
".au-og{width:400px;height:400px;bottom:-140px;right:-100px;background:radial-gradient(circle,rgba(232,160,32,.14) 0%,transparent 70%);animation:au-d2 11s ease-in-out infinite alternate}",
"@keyframes au-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes au-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".au-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".au-head{position:relative;z-index:2;text-align:center;margin-bottom:26px;opacity:0;transform:translateY(-16px);transition:opacity .7s ease,transform .7s cubic-bezier(.34,1.56,.64,1)}",
".au-head.in{opacity:1;transform:translateY(0)}",
".au-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;margin-bottom:14px}",
".au-logo-bg{position:absolute;inset:0;border-radius:24px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong),inset 0 1px 0 var(--border-soft)}",
".au-logo-em{position:relative;font-size:40px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6));animation:au-bob 4s ease-in-out infinite}",
"@keyframes au-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}",
".au-title{font-size:38px;font-weight:900;line-height:1;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".au-tag{color:var(--text-faint);font-size:13px;margin-top:6px}",
".au-card{position:relative;z-index:2;background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:26px;width:100%;max-width:400px;box-shadow:0 20px 60px rgba(0,0,0,.5);opacity:0;transform:translateY(20px);transition:opacity .6s ease .2s,transform .6s ease .2s}",
".au-card.in{opacity:1;transform:translateY(0)}",
".au-tabs{display:grid;grid-template-columns:1fr 1fr;background:var(--surface-soft);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:4px;margin-bottom:22px}",
".au-tab{padding:11px;border:none;border-radius:11px;background:transparent;color:var(--text-faint);font-family:'Tajawal',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .25s}",
".au-tab.active{background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;box-shadow:0 4px 12px rgba(232,160,32,.3)}",
".au-label{font-size:13px;font-weight:700;color:var(--text-muted);display:block;margin-bottom:6px}",
".au-field{width:100%;padding:13px 16px;border-radius:12px;border:1.5px solid var(--border);background:var(--surface-softer);color:var(--text);font-family:'Tajawal',sans-serif;font-size:14px;outline:none;margin-bottom:14px;transition:border-color .2s}",
".au-field::placeholder{color:var(--text-dim)}",
".au-field:focus{border-color:rgba(232,160,32,.5)}",
".au-field option{background:#0c1322;color:#fff}",
".au-msg{border-radius:10px;padding:11px 14px;font-size:13px;margin-bottom:14px;text-align:center;font-weight:600}",
".au-err{background:rgba(220,80,80,.12);border:1px solid rgba(220,80,80,.35);color:#ff8080}",
".au-ok{background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.35);color:#4ade80}",
".au-submit{width:100%;padding:15px;border:none;border-radius:14px;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;font-family:'Tajawal',sans-serif;font-size:16px;font-weight:800;cursor:pointer;box-shadow:0 6px 18px rgba(232,160,32,.35);transition:transform .15s}",
".au-submit:active{transform:scale(.97)}",
".au-submit:disabled{opacity:.6;cursor:default}",
".au-ghost{width:100%;margin-top:12px;padding:13px;border:1.5px solid var(--border-soft);border-radius:14px;background:transparent;color:var(--text-muted);font-family:'Tajawal',sans-serif;font-size:14px;cursor:pointer;transition:background .2s}",
".au-ghost:active{background:var(--surface-soft)}",
].join("\n");

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  async function handleSubmit() {
    setError(""); setSuccess(""); setLoading(true);
    try {
      if (isLogin) {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        setSuccess("✅ تم تسجيل الدخول بنجاح! جارٍ التحويل...");
        setTimeout(() => navigate("/"), 1000);
      } else {
        const { data, error: err } = await supabase.auth.signUp({ email, password });
        if (err) throw err;
        if (data.user) {
          await supabase.from("profiles").upsert([{
            id: data.user.id, full_name: name,
            grade: Number(grade), points: 0
          }]);
        }
        setSuccess("✅ تم إنشاء الحساب! تحقق من بريدك الإلكتروني.");
      }
    } catch (e: any) {
      setError(e.message || "حدث خطأ");
    }
    setLoading(false);
  }

  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  return (
    <>
      <style>{CSS}</style>
      <div className="au-root">
        <div className="au-orb au-ob" />
        <div className="au-orb au-og" />
        <div className="au-grid" />

        <div className={cx("au-head", mounted && "in")}>
          <div className="au-logo">
            <div className="au-logo-bg" />
            <span className="au-logo-em">🎓</span>
          </div>
          <div className="au-title">تعليم</div>
          <div className="au-tag">منصة تعليمية للابتدائي في الجزائر</div>
        </div>

        <div className={cx("au-card", mounted && "in")}>
          <div className="au-tabs">
            {["تسجيل الدخول", "حساب جديد"].map((label, i) => (
              <button
                key={i}
                className={cx("au-tab", ((i === 0) === isLogin) && "active")}
                onClick={() => { setIsLogin(i === 0); setError(""); }}
              >
                {label}
              </button>
            ))}
          </div>

          {!isLogin && (
            <>
              <label className="au-label">الاسم الكامل</label>
              <input className="au-field" value={name} onChange={e => setName(e.target.value)} placeholder="أحمد بن عمر" />
              <label className="au-label">السنة الدراسية</label>
              <select className="au-field" value={grade} onChange={e => setGrade(e.target.value)}>
                {GRADES.map((g, i) => <option key={i} value={String(i + 1)}>{g}</option>)}
              </select>
            </>
          )}

          <label className="au-label">البريد الإلكتروني</label>
          <input className="au-field" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" type="email" />

          <label className="au-label">كلمة المرور</label>
          <input className="au-field" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" style={{ marginBottom: 20 }} />

          {error && <div className="au-msg au-err">{error}</div>}
          {success && <div className="au-msg au-ok">{success}</div>}

          <button className="au-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "جاري المعالجة..." : isLogin ? "تسجيل الدخول" : "إنشاء الحساب"}
          </button>

          <button className="au-ghost" onClick={() => navigate("/")}>تصفح بدون تسجيل</button>
        </div>
      </div>
    </>
  );
}
