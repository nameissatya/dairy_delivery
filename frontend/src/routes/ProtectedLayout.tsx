import { Navigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

export default function ProtectedLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <AppLayout />;
}
