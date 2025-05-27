import { Navigate, Route, Routes } from "react-router";
import createAuthRoutes from "./auth-routes";
import createDashboardRoutes from "./dashboard-routes";
import { useUser } from "@/providers/user";

export default function MainRoutes() {
  const { user, loading } = useUser();

  return (
    <Routes>
      <Route index element={<Navigate to="/dashboard" />} />
      {createAuthRoutes()}
      {createDashboardRoutes(user, loading)}
    </Routes>
  );
}
