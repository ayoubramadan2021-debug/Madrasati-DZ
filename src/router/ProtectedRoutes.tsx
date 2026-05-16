import type { ReactNode } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

type ProtectedRoutesProps = {
  children: ReactNode;
};

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default ProtectedRoutes;
