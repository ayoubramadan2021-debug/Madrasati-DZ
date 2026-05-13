import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { common } from "../theme";

import { getCurrentUser } from "../services/authService";
import { getProfile, upsertProfile } from "../services/profileService";

function EditProfilePage({ theme, setThemeName }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [grade, setGrade] = useState(1);
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

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

  async function handleSave(e) {
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

    setTimeout(() => {
      navigate("/profile");
    }, 800);
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "56px" }}>✏️</div>
        <h1 style={{ color: theme.text }}>تعديل الملف الشخصي</h1>
        <p style={{ color: theme.muted }}>حدّث بيانات حسابك التعليمية</p>
      </section>

      {loading ? (
        <div style={cardStyle(theme)}>جاري تحميل البيانات...</div>
      ) : !user ? (
        <div style={cardStyle(theme)}>🔐 سجّل الدخول أولًا.</div>
      ) : (
        <form onSubmit={handleSave} style={cardStyle(theme)}>
          <label style={labelStyle(theme)}>الاسم الكامل</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle(theme)} />

          <label style={labelStyle(theme)}>العمر</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={inputStyle(theme)} />

          <label style={labelStyle(theme)}>تاريخ الميلاد</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} style={inputStyle(theme)} />

          <label style={labelStyle(theme)}>مكان الميلاد</label>
          <input value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} style={inputStyle(theme)} />

          <label style={labelStyle(theme)}>السنة الدراسية</label>
          <select value={grade} onChange={(e) => setGrade(e.target.value)} style={inputStyle(theme)}>
            <option value="1">السنة الأولى</option>
            <option value="2">السنة الثانية</option>
            <option value="3">السنة الثالثة</option>
            <option value="4">السنة الرابعة</option>
            <option value="5">السنة الخامسة</option>
          </select>

          <label style={labelStyle(theme)}>نبذة قصيرة</label>
          <textarea
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="مثال: أحب الرياضيات والقراءة..."
            style={{ ...inputStyle(theme), lineHeight: "1.8" }}
          />

          <button style={buttonStyle(theme)}>💾 حفظ التعديلات</button>

          {message && <div style={messageStyle(theme)}>{message}</div>}
        </form>
      )}
    </Layout>
  );
}

const heroStyle = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.large,
  padding: "28px",
  textAlign: "center",
  boxShadow: common.shadow.hero,
});

const cardStyle = (theme) => ({
  marginTop: "22px",
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  padding: "22px",
  borderRadius: common.radius.large,
  boxShadow: common.shadow.card,
  color: theme.text,
});

const labelStyle = (theme) => ({
  display: "block",
  marginTop: "14px",
  marginBottom: "8px",
  color: theme.text,
  fontWeight: "bold",
});

const inputStyle = (theme) => ({
  width: "100%",
  padding: "15px",
  borderRadius: common.radius.medium,
  border: `1px solid ${theme.border}`,
  background: theme.surface2,
  color: theme.text,
  fontSize: "17px",
  outline: "none",
});

const buttonStyle = (theme) => ({
  width: "100%",
  marginTop: "20px",
  padding: "16px",
  border: "none",
  borderRadius: common.radius.medium,
  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
});

const messageStyle = (theme) => ({
  marginTop: "16px",
  padding: "14px",
  borderRadius: common.radius.medium,
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  color: theme.text,
});

export default EditProfilePage;
