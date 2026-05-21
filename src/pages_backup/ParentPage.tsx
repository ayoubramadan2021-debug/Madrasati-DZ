import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { getProfile } from "../services/profileService";
import { getUserProgress } from "../services/progressService";
import { supabase } from "../lib/supabaseClient";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".pa-root *,.pa-root *::before,.pa-root *::after{box-sizing:border-box;margin:0;padding:0}",
".pa-root{min-height:100dvh;background:#07101f;font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".pa-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".pa-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%)}",
".pa-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%)}",
".pa-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".pa-content{position:relative;z-index:2}",
".pa-hero{position:relative;padding:24px 20px 24px;text-align:center}",
".pa-back{position:absolute;top:20px;right:16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.8);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif}",
".pa-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;margin:8px 0 10px}",
".pa-logo-bg{position:absolute;inset:0;border-radius:24px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:0 8px 32px rgba(0,0,0,.5)}",
".pa-logo-em{position:relative;font-size:40px}",
".pa-title{font-size:23px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,#E8A020 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".pa-sub{font-size:13px;color:rgba(255,255,255,.4)}",
".pa-body{padding:0 16px}",
".pa-state{text-align:center;padding:50px 20px;color:rgba(255,255,255,.45);font-size:15px}",
".pa-card{background:linear-gradient(135deg,rgba(15,25,45,.97),rgba(10,16,30,.99));border:1px solid rgba(255,255,255,.09);border-radius:18px;padding:20px;margin-bottom:16px;box-shadow:0 8px 28px rgba(0,0,0,.4)}",
".pa-card-t{font-size:17px;font-weight:800;color:#E8A020;margin-bottom:12px}",
".pa-info{font-size:14px;color:rgba(255,255,255,.65);line-height:2}",
".pa-info b{color:#fff;font-weight:700}",
".pa-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}",
".pa-stat{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:16px 8px;text-align:center}",
".pa-stat-em{font-size:30px;margin-bottom:6px}",
".pa-stat-n{font-size:24px;font-weight:900;color:#E8A020;line-height:1}",
".pa-stat-l{font-size:11px;color:rgba(255,255,255,.5);margin-top:5px}",
".pa-label{display:block;margin-bottom:8px;color:rgba(255,255,255,.7);font-weight:700;font-size:13px}",
".pa-input{width:100%;padding:13px 16px;border-radius:12px;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#fff;font-family:'Tajawal',sans-serif;font-size:14px;outline:none;direction:rtl}",
".pa-input:focus{border-color:rgba(232,160,32,.5)}",
".pa-save{width:100%;margin-top:16px;padding:14px;border:none;border-radius:13px;background:linear-gradient(135deg,#E8A020,#c97d0a);color:#000;font-family:'Tajawal',sans-serif;font-size:15px;font-weight:800;cursor:pointer}",
".pa-msg{margin-top:14px;padding:13px;border-radius:12px;text-align:center;font-size:14px;font-weight:600;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#fff}",
".pa-deny{min-height:100dvh;background:#07101f;color:#fff;display:grid;place-items:center;text-align:center;padding:30px;font-family:'Tajawal',sans-serif;direction:rtl}",
].join("\n");

function ParentPage() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [parentEmail, setParentEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (!u) { setAuthorized(false); return; }
      const prof = await getProfile(u.id);
      if (prof?.role === "parent" || prof?.role === "admin") {
        setAuthorized(true);
        setUser(u);
        setProfile(prof);
        setProgress(await getUserProgress(u.id));
      } else {
        setAuthorized(false);
      }
    })();
  }, []);

  async function saveParentLink() {
    if (!user || !parentEmail) return;
    const { error } = await supabase
      .from("parent_links")
      .insert([{ parent_email: parentEmail, student_id: user.id }]);
    if (error) { setMessage("❌ حدث خطأ أثناء ربط ولي الأمر"); return; }
    setMessage("✅ تم ربط ولي الأمر بنجاح");
    setParentEmail("");
  }

  const totalPoints = progress.reduce((s, i) => s + Number(i.points || 0), 0);
  const exercises = progress.filter((i) => String(i.lesson_id || "").includes("exercise")).length;
  const quizzes = progress.filter((i) => String(i.lesson_id || "").includes("quiz")).length;

  if (authorized === null) {
    return <div className="pa-deny" style={{ color: "#E8A020" }}>... جاري التحقق</div>;
  }
  if (authorized === false) {
    return (
      <div className="pa-deny">
        <div>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🔒</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>غير مصرّح لك</div>
          <div style={{ color: "rgba(255,255,255,.5)", fontSize: 14 }}>هذه الصفحة مخصّصة لأولياء الأمور</div>
          <button onClick={() => navigate("/")} style={{ marginTop: 20, padding: "12px 24px", border: "none", borderRadius: 12, background: "linear-gradient(135deg,#E8A020,#c97d0a)", color: "#000", fontFamily: "Tajawal,sans-serif", fontWeight: 800, fontSize: 14 }}>العودة للرئيسية</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="pa-root">
        <div className="pa-orb pa-ob" /><div className="pa-orb pa-og" /><div className="pa-grid" />
        <div className="pa-content">
          <div className="pa-hero">
            <button className="pa-back" onClick={() => navigate("/")}>← رجوع</button>
            <div className="pa-logo"><div className="pa-logo-bg" /><span className="pa-logo-em">👨‍👩‍👧</span></div>
            <h1 className="pa-title">متابعة وليّ الأمر</h1>
            <div className="pa-sub">متابعة تقدم التلميذ ونشاطه</div>
          </div>
          <div className="pa-body">
            <div className="pa-card">
              <div className="pa-card-t">👤 بيانات التلميذ</div>
              <div className="pa-info">
                الاسم: <b>{profile?.full_name || "تلميذ بدون اسم"}</b><br />
                البريد: <b>{user?.email}</b><br />
                السنة: <b>{profile?.grade || 1}</b>
              </div>
            </div>
            <div className="pa-grid3">
              <div className="pa-stat"><div className="pa-stat-em">⭐</div><div className="pa-stat-n">{totalPoints}</div><div className="pa-stat-l">النقاط</div></div>
              <div className="pa-stat"><div className="pa-stat-em">✍️</div><div className="pa-stat-n">{exercises}</div><div className="pa-stat-l">تمارين</div></div>
              <div className="pa-stat"><div className="pa-stat-em">📝</div><div className="pa-stat-n">{quizzes}</div><div className="pa-stat-l">اختبارات</div></div>
            </div>
            <div className="pa-card">
              <div className="pa-card-t">🔗 ربط وليّ الأمر</div>
              <label className="pa-label">بريد وليّ الأمر</label>
              <input className="pa-input" type="email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} placeholder="parent@email.com" />
              <button className="pa-save" onClick={saveParentLink}>حفظ وليّ الأمر</button>
              {message && <div className="pa-msg">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ParentPage;
