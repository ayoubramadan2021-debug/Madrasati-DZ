import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AuthPage() {
  const { user, loadingAuth } = useAuth();

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (loadingAuth) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", padding: "30px" }}>
        جاري التحميل...
      </div>
    );
  }

  if (user) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", padding: "25px" }}>
        <h1>👤 حسابي</h1>

        <div style={{ background: "#13203a", padding: "20px", borderRadius: "18px", marginTop: "20px" }}>
          <p>أنت مسجل الدخول حاليًا.</p>
          <p style={{ wordBreak: "break-all", color: "#cbd5e1" }}>{user.email}</p>

          <Link to="/progress">
            <button
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                background: "#2563eb",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              الذهاب إلى لوحة التقدم
            </button>
          </Link>

          <button
            onClick={logout}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              background: "#dc2626",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold"
            }}
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#13203a",
          padding: "30px",
          borderRadius: "20px"
        }}
      >
        <h1 style={{ color: "white", textAlign: "center", marginBottom: "25px" }}>
          🔐 تسجيل الدخول
        </h1>

        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="dark"
        />
      </div>
    </div>
  );
}
