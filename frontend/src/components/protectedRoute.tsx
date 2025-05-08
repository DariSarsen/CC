import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  requiredRole?: string | string[];
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [redirectPath, setRedirectPath] = useState("/login");

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthorized(false);
        return;
      }
      try {
        const { data: user } = await axios.get(
          "http://localhost:3000/auth/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Сохраняем данные пользователя (если нужно)
        localStorage.setItem("user", JSON.stringify(user));

        if (requiredRole) {
          const roles = Array.isArray(requiredRole)
            ? requiredRole
            : [requiredRole];
          if (!roles.includes(user.role)) {
            toast.error("У вас нет доступа!");
            setRedirectPath("/"); 
            setAuthorized(false);
            return;
          }
        }
        setAuthorized(true);
      } catch (err) {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, [requiredRole]);

  if (authorized === null) {
    return <div className="p-6 text-center">Загрузка...</div>;
  }

  return authorized ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
