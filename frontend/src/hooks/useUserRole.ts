import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  role: string;
};

export const useUserRole = (): string => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: JwtPayload = jwtDecode(token);
      setRole(decoded.role);
    } catch {
      console.error("Ошибка декодирования токена");
    }
  }, []);

  return role;
};
