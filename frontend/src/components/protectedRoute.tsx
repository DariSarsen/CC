import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProtectedRoute = ({ requiredRole }: { requiredRole?: string }) => {
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setAuthorized(false);
            return;
        }

        axios.get("http://localhost:3000/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            if (requiredRole && res.data.role !== requiredRole) {
                toast.error("У вас нет доступа!");
                setAuthorized(false);
            } else {
                setAuthorized(true);
            }
        })
        .catch(() => {
            toast.error("Ошибка сервера!");
            setAuthorized(false);
        });
    }, [requiredRole]);

    if (authorized === null) return <div>Загрузка...</div>;

    return authorized ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;


