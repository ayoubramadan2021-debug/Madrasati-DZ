import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { common } from "../theme";

import {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
} from "../services/authService";

import { isAdmin } from "../services/adminService";
import { getProfile, upsertProfile } from "../services/profileService";

function AuthPage({ theme, setThemeName }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [profile, setProfile] = useState(null);

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [grade, setGrade] = useState(1);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const currentUser = await getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      const adminStatus = await isAdmin(currentUser.id);
      setAdmin(adminStatus);

      const savedProfile = await getProfile(currentUser.id);
      setProfile(savedProfile);

      if (savedProfile) {
        setFullName(savedProfile.full_name || "");
        setAge(savedProfile.age || "");
        setBirthDate(savedProfile.birth_date || "");
        setBirthPlace(savedProfile.birth_place || "");
        setGrade(savedProfile.grade || 1);
      }
    } else {
      setAdmin(false);
      setProfile(null);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const result =
      mode === "login"
        ? await signIn(email, password)
        : await signUp(email, password);

    setLoading(false);

    if (result.error) {
      setMessage("❌ " + result.error.message);
      return;
    }

    await loadUser();

    if (mode === "register") {
      setMessage("✅ تم إنشاء الحساب بنجاح، أكمل بيانات الملف الشخصي");
    } else {
      setMessage("✅ تم تسجيل الدخول بنجاح");
      navigate("/");
    }
  }

  async function handleSaveProfile() {
    if (!user) return;

    setLoading(true);
    setMessage("");

    const result = await upsertProfile({
      id: user.id,
      full_name: fullName,
      age,
      birth_date: birthDate,
      birth_place: birthPlace,
      grade,
    });

    setLoading(false);

    if (result.error) {
      setMessage("❌ لم يتم حفظ الملف الشخصي");
      return;
    }

    setMessage("✅ تم حفظ الملف الشخصي بنجاح");
    await loadUser();
  }

  async function handleLogout() {
    setLoading(true);

    await signOut();

    setUser(null);
    setAdmin(false);
    setProfile(null);
    setEmail("");
    setPassword("");
    setMessage("✅ تم تسجيل الخروج بنجاح");

    setLoading(false);

    setTimeout(() => {
      navigate("/");
    }, 800);
  }

  return (
    <Layout theme={theme} setThemeName={setThemeName}>
      <section style={heroStyle(theme)}>
        <div style={{ fontSize: "54px" }}>👤</div>

        <h1 style={{ color: theme.text }}>حساب التلميذ</h1>

        <p style={{ color: theme.muted }}>
          تسجيل الدخول، الملف الشخصي، وحفظ التقدم
        </p>
      </section>

      {user ? (
        <>
          <div style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>✅ أنت مسجل الدخول</h2>

            <div style={infoBox(theme)}>
              <strong>البريد الإلكتروني</strong>
              <p>{user.email}</p>
            </div>

            <div style={infoBox(theme)}>
              <strong>نوع الحساب</strong>
              <p>{admin ? "🧑‍🏫 مدير / Admin" : "🎒 تلميذ / Student"}</p>
            </div>

            <button
              onClick={handleLogout}
              disabled={loading}
              style={logoutButton(theme)}
            >
              {loading ? "جاري الخروج..." : "🚪 تسجيل الخروج"}
            </button>
          </div>

          <div style={cardStyle(theme)}>
            <h2 style={{ color: theme.text }}>📝 الملف الشخصي</h2>

            <label style={labelStyle(theme)}>الاسم الكامل</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="مثال: أحمد بن علي"
              style={inputStyle(theme)}
            />

            <label style={labelStyle(theme)}>العمر</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="مثال: 8"
              style={inputStyle(theme)}
            />

            <label style={labelStyle(theme)}>تاريخ الميلاد</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              style={inputStyle(theme)}
            />

            <label style={labelStyle(theme)}>مكان الميلاد</label>
            <input
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="مثال: قسنطينة"
              style={inputStyle(theme)}
            />

            <label style={labelStyle(theme)}>السنة الدراسية</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              style={inputStyle(theme)}
            >
              <option value="1">السنة الأولى</option>
              <option value="2">السنة الثانية</option>
              <option value="3">السنة الثالثة</option>
              <option value="4">السنة الرابعة</option>
              <option value="5">السنة الخامسة</option>
            </select>

            <button
              onClick={handleSaveProfile}
              disabled={loading}
              style={buttonStyle(theme)}
            >
              💾 حفظ الملف الشخصي
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} style={cardStyle(theme)}>
          <h2 style={{ color: theme.text }}>
            {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
          </h2>

          <label style={labelStyle(theme)}>البريد الإلكتروني</label>

          <input
            type="email"
            required
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle(theme)}
          />

          <label style={labelStyle(theme)}>كلمة المرور</label>

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength="6"
              placeholder="6 أحرف على الأقل"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle(theme)}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
                color: theme.text,
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button type="submit" disabled={loading} style={buttonStyle(theme)}>
            {loading
              ? "جاري المعالجة..."
              : mode === "login"
              ? "دخول"
              : "إنشاء حساب"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setMessage("");
            }}
            style={switchButtonStyle(theme)}
          >
            {mode === "login"
              ? "ليس لديك حساب؟ أنشئ حسابًا"
              : "لديك حساب؟ سجل الدخول"}
          </button>
        </form>
      )}

      {message && <div style={messageStyle(theme)}>{message}</div>}
    </Layout>
  );
}

const heroStyle = (theme) => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.large,
  padding: "26px",
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
});

const infoBox = (theme) => ({
  marginTop: "14px",
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  borderRadius: common.radius.medium,
  padding: "16px",
  color: theme.text,
  lineHeight: "1.8",
});

const labelStyle = (theme) => ({
  display: "block",
  marginBottom: "8px",
  marginTop: "14px",
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

const logoutButton = (theme) => ({
  width: "100%",
  marginTop: "22px",
  padding: "16px",
  border: "none",
  borderRadius: common.radius.medium,
  background: "linear-gradient(135deg, #ef4444, #f97316)",
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
});

const switchButtonStyle = (theme) => ({
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: common.radius.medium,
  border: `1px solid ${theme.border}`,
  background: "transparent",
  color: theme.text,
  fontSize: "16px",
});

const messageStyle = (theme) => ({
  marginTop: "16px",
  padding: "14px",
  borderRadius: common.radius.medium,
  background: theme.surface2,
  border: `1px solid ${theme.border}`,
  color: theme.text,
  lineHeight: "1.7",
});

export default AuthPage;
