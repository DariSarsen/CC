import { useEffect, useState } from "react";
import { VacancyResponse } from "../../types/vacancyResponse";
import { toast } from "react-toastify";
import { getMyVacancyResponses } from "../../services/vacancyResponseService";

export const useMyResponses = () => {
  const [responses, setResponses] = useState<VacancyResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResponses = async () => {
      setIsLoading(true);
      try {
        const data = await getMyVacancyResponses();
        setResponses(data);
      } catch (err) {
        if ((err as any).response?.status === 404) {
          toast.info("Вы еще не отправляли отклики");
        } else {
          toast.error("Ошибка при загрузке ваших откликов");
        }
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponses();
  }, []);

  return { responses, isLoading };
};
