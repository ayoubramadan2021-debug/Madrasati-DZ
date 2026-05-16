import type { ReactNode } from "react";
import RoleRoute from "./RoleRoute";

type AdminRouteProps = {
  children: ReactNode;
};

function AdminRoute({ children }: AdminRouteProps) {
  return (
    <RoleRoute allowedRoles={["admin"]} redirectTo="/">
      {children}
    </RoleRoute>
  );
}

export default AdminRoute;
