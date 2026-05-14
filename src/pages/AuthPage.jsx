import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const { user, loadingAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMessage("❌ " + error.message);
    } else {
      setMessage("✅ تم تسجيل الدخول بنجاح");
    }

    setLoading(false);
  };

  const signup = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setMessage("❌ " + error.message);
    } else {
      setMessage("✅ تم إنشاء الحساب. تحقق من بريدك إذا طُلب ذلك.");
    }

    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (loadingAuth) {
    return <Page><p>جاري التحميل...</p></Page>;
  }

  if (user) {
    return (
      <Page>
        <h1>👤 حسابي</h1>
        <div style={cardStyle}>
          <p>أنت مسجل الدخول حاليًا.</p>
          <p style={{ wordBreak: "break-all", color: "#cbd5e1" }}>{user.email}</p>

          <Link to="/progress">
            <button style={blueButton}>الذهاب إلى لوحة التقدم</button>
          </Link>

          <button onClick={logout} style={redButton}>تسجيل الخروج</button>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <h1>🔐 {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}</h1>

      <div style={cardStyle}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={mode === "login" ? login : signup}
          disabled={loading}
          style={blueButton}
        >
          {loading ? "جاري المعالجة..." : mode === "login" ? "دخول" : "إنشاء حساب"}
        </button>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          style={grayButton}
        >
          {mode === "login" ? "ليس لديك حساب؟ أنشئ حسابًا" : "لديك حساب؟ سجّل الدخول"}
        </button>

        {message && <p style={{ marginTop: "15px", color: "white" }}>{message}</p>}
      </div>
    </Page>
  );
}

function Page({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "25px"
    }}>
      {children}
    </div>
  );
}

const cardStyle = {
  background: "#13203a",
  padding: "22px",
  borderRadius: "18px",
  marginTop: "20px"
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "12px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  fontSize: "16px"
};

const blueButton = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
  marginTop: "12px"
};

const redButton = {
  ...blueButton,
  background: "#dc2626"
};

const grayButton = {
  ...blueButton,
  background: "#475569"
};
