import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ResumeWithUser } from "../../types/resume";
import { fetchResumes } from "../../services/resumeService";

export const useResumes = () => {
  const [resumes, setResumes] = useState<ResumeWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchResumes(token);
        setResumes(data);
      } catch (e) {
        toast.error("Ошибка при загрузке резюме");
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { resumes, loading };
};
