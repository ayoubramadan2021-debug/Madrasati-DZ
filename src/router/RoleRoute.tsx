import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { hasRole, type UserRole } from "../services/roleService";

type RoleRouteProps = {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
};

function RoleRoute({
  children,
  allowedRoles,
  redirectTo = "/",
}: RoleRouteProps) {
  const { user, loadingAuth } = useAuth();

  const [checkingRole, setCheckingRole] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkRoleAccess();
  }, [user]);

  async function checkRoleAccess() {
    if (!user) {
      setAllowed(false);
      setCheckingRole(false);
      return;
    }

    const result = await hasRole(user.id, allowedRoles);

    setAllowed(result);
    setCheckingRole(false);
  }

  if (loadingAuth || checkingRole) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        جاري التحقق من الصلاحيات...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default RoleRoute;
