import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProtectedRoute = ({ requiredRole }: { requiredRole?: string }) => {
    const isFirstRender = useRef(true);

    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [redirectPath, setRedirectPath] = useState("/login");

    useEffect(() => {
        console.log("ProtectedRoute effect");
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        console.log("Checking auth...");
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token");
            setAuthorized(false);
            return;
        }
        console.log("Token found");
        axios.get("http://localhost:3000/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
            
        })
        .then((res) => {
            
            console.log("Role: ", res.data.role);
            if (requiredRole && res.data.role !== requiredRole) {
                toast.error("У вас нет доступа!");
                setAuthorized(false);
                setRedirectPath("/");
            } else {
                setAuthorized(true);
                console.log("Authorized");
            }
        })
        .catch(() => {
            console.log("Error while checking auth");
            setAuthorized(false);
        });
    }, [requiredRole]);

    if (authorized === null) return <div>Загрузка...</div>;

    return authorized ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;


