import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { getProfile, upsertProfile } from "../services/profileService";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".ep-root *,.ep-root *::before,.ep-root *::after{box-sizing:border-box;margin:0;padding:0}",
".ep-root{min-height:100dvh;background:#07101f;font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".ep-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".ep-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:ep-d1 14s ease-in-out infinite alternate}",
".ep-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:ep-d2 11s ease-in-out infinite alternate}",
"@keyframes ep-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes ep-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".ep-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".ep-content{position:relative;z-index:2}",
".ep-hero{position:relative;padding:24px 20px 24px;text-align:center}",
".ep-back{position:absolute;top:20px;right:16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.8);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:background .2s}",
".ep-back:active{background:rgba(255,255,255,.12)}",
".ep-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:78px;height:78px;margin:8px 0 10px}",
".ep-logo-bg{position:absolute;inset:0;border-radius:22px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:0 8px 32px rgba(0,0,0,.5)}",
".ep-logo-em{position:relative;font-size:38px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6))}",
".ep-title{font-size:24px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,#E8A020 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".ep-sub{font-size:13px;color:rgba(255,255,255,.4)}",
".ep-body{padding:0 16px}",
".ep-state{text-align:center;padding:50px 20px;color:rgba(255,255,255,.45);font-size:15px}",
".ep-card{background:linear-gradient(135deg,rgba(15,25,45,.97),rgba(10,16,30,.99));border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:22px;box-shadow:0 8px 28px rgba(0,0,0,.4)}",
".ep-label{display:block;margin-top:14px;margin-bottom:7px;color:rgba(255,255,255,.7);font-weight:700;font-size:13px}",
".ep-label:first-child{margin-top:0}",
".ep-input{width:100%;padding:13px 16px;border-radius:12px;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#fff;font-family:'Tajawal',sans-serif;font-size:14px;outline:none;transition:border-color .2s}",
".ep-input:focus{border-color:rgba(232,160,32,.5)}",
".ep-input::placeholder{color:rgba(255,255,255,.3)}",
".ep-input option{background:#0c1322;color:#fff}",
".ep-save{width:100%;margin-top:20px;padding:15px;border:none;border-radius:14px;background:linear-gradient(135deg,#E8A020,#c97d0a);color:#000;font-family:'Tajawal',sans-serif;font-size:16px;font-weight:800;cursor:pointer;box-shadow:0 6px 18px rgba(232,160,32,.35);transition:transform .15s}",
".ep-save:active{transform:scale(.97)}",
".ep-msg{margin-top:16px;padding:13px;border-radius:12px;text-align:center;font-size:14px;font-weight:600;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#fff}",
].join("\n");

function EditProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [grade, setGrade] = useState<any>(1);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => { loadProfile(); }, []);

  async function loadProfile() {
    setLoading(true);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      const profile = await getProfile(currentUser.id);
      if (profile) {
        setFullName(profile.full_name || "");
        setAge(profile.age || "");
        setBirthDate(profile.birth_date || "");
        setBirthPlace(profile.birth_place || "");
        setGrade(profile.grade || 1);
        setBio(profile.bio || "");
      }
    }
    setLoading(false);
  }

  async function handleSave(e: any) {
    e.preventDefault();
    if (!user) return;
    setMessage("");
    const result = await upsertProfile({
      id: user.id,
      full_name: fullName,
      age,
      birth_date: birthDate,
      birth_place: birthPlace,
      grade,
      bio,
    });
    if (result.error) {
      setMessage("❌ حدث خطأ أثناء حفظ الملف الشخصي");
      return;
    }
    setMessage("✅ تم حفظ الملف الشخصي بنجاح");
    setTimeout(() => { navigate("/profile"); }, 800);
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="ep-root">
        <div className="ep-orb ep-ob" /><div className="ep-orb ep-og" /><div className="ep-grid" />
        <div className="ep-content">
          <div className="ep-hero">
            <button className="ep-back" onClick={() => navigate("/profile")}>← رجوع</button>
            <div className="ep-logo">
              <div className="ep-logo-bg" />
              <span className="ep-logo-em">✏️</span>
            </div>
            <h1 className="ep-title">تعديل الملف الشخصي</h1>
            <div className="ep-sub">حدّث بيانات حسابك التعليمية</div>
          </div>

          <div className="ep-body">
            {loading ? (
              <div className="ep-state">⏳ جاري تحميل البيانات...</div>
            ) : !user ? (
              <div className="ep-state">🔐 سجّل الدخول أولًا</div>
            ) : (
              <form onSubmit={handleSave} className="ep-card">
                <label className="ep-label">الاسم الكامل</label>
                <input className="ep-input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="أحمد بن عمر" />

                <label className="ep-label">العمر</label>
                <input className="ep-input" type="number" value={age} onChange={(e) => setAge(e.target.value)} />

                <label className="ep-label">تاريخ الميلاد</label>
                <input className="ep-input" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

                <label className="ep-label">مكان الميلاد</label>
                <input className="ep-input" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />

                <label className="ep-label">السنة الدراسية</label>
                <select className="ep-input" value={grade} onChange={(e) => setGrade(e.target.value)}>
                  <option value="1">السنة الأولى</option>
                  <option value="2">السنة الثانية</option>
                  <option value="3">السنة الثالثة</option>
                  <option value="4">السنة الرابعة</option>
                  <option value="5">السنة الخامسة</option>
                </select>

                <label className="ep-label">نبذة قصيرة</label>
                <textarea className="ep-input" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="مثال: أحب الرياضيات والقراءة..." style={{ lineHeight: "1.8", resize: "vertical" }} />

                <button className="ep-save" type="submit">💾 حفظ التعديلات</button>

                {message && <div className="ep-msg">{message}</div>}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfilePage;
