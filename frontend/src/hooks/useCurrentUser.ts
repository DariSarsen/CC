import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface User {
  id: string;
  name: string;
  role: "student" | "company" | "career_center" | "admin";
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Вы не авторизованы");
        return;
      }

      const userFromStorage = localStorage.getItem("user");
      if (userFromStorage) {
        setUser(JSON.parse(userFromStorage));
      }
    } catch (error) {
      toast.error("Ошибка загрузки данных пользователя");
    }
  }, []);

  return { user };
};
