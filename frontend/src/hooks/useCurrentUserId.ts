import { useMemo } from "react";

export const useCurrentUserId = (): string | null => {
  return useMemo(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id as string;
    } catch {
      console.error("Не удалось декодировать токен");
      return null;
    }
  }, []);
};
