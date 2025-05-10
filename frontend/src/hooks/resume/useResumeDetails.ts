import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ResumeWithUser } from "../../types/resume";
import { fetchResumeById } from "../../services/resumeService";

export const useResumeDetails = (id: string) => {
  const [resume, setResume] = useState<ResumeWithUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchResumeById(id, token);
        setResume(data);
      } catch (e) {
        toast.error("Ошибка при загрузке резюме");
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { resume, loading };
};
