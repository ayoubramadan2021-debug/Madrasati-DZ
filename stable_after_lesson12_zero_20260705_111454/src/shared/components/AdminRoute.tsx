import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../../lib/isAdmin";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"checking" | "ok" | "deny">("checking");

  useEffect(() => {
    let alive = true;
    isAdmin()
      .then((ok) => { if (alive) setState(ok ? "ok" : "deny"); })
      .catch(() => { if (alive) setState("deny"); });
    return () => { alive = false; };
  }, []);

  if (state === "checking") {
    return (
      <div style={{ minHeight: "100vh", background: "#07101f", display: "grid", placeItems: "center", color: "#E8A020", fontFamily: "Tajawal,sans-serif", fontSize: 15 }}>
        جارٍ التحقق من الصلاحية... 🔐
      </div>
    );
  }
  if (state === "deny") return <Navigate to="/" replace />;
  return <>{children}</>;
}
