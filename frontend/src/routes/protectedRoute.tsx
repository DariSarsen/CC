import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingScreen from "../components/LoadingScreen";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  requiredRole?: string | string[];
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      toast.error("У вас нет доступа!");
      return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
