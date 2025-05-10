import { useEffect, useState } from "react";
import axios from "axios";
import { Vacancy } from "../../types/vacancy";
import { toast } from "react-toastify";

export const useVacancies = (role: string, showMy: boolean) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVacancies = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const url =
          role === "company" && showMy
            ? "http://localhost:3000/vacancies/my"
            : "http://localhost:3000/vacancies";

        const { data } = await axios.get(url, { headers });
        setVacancies(data);
      } catch {
        toast.error("Не удалось загрузить вакансии");
      } finally {
        setIsLoading(false);
      }
    };

    if (role) fetchVacancies();
  }, [role, showMy]);

  return { vacancies, isLoading };
};
