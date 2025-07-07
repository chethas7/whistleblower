// components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");

  return isAuthenticated || token ? children : <Navigate to="/auth" />;
}
