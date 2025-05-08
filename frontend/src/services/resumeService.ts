import axios from "axios";
import { Resume, ResumeWithUser, defaultResume } from "../types/resume";

const API_URL = "http://localhost:3000/resumes";

// своё резюме
export const getResume = async (token: string | null): Promise<Resume> => {
  if (!token) throw new Error("Вы не авторизованы");
  try {
    const { data } = await axios.get<Resume>(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err: any) {
    if (err.response?.status === 404) return defaultResume;
    throw err;
  }
};

// обновление
export const updateResume = async (
  token: string | null,
  formData: Resume
) => {
  if (!token) throw new Error("Вы не авторизованы");
  await axios.put(API_URL, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// все резюме для компаний/ЦК
export const fetchResumes = async (
  token: string | null
): Promise<ResumeWithUser[]> => {
  if (!token) throw new Error("Вы не авторизованы");
  const { data } = await axios.get<ResumeWithUser[]>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// одно резюме для компаний/ЦК
export const fetchResumeById = async (
  id: string,
  token: string | null
): Promise<ResumeWithUser> => {
  if (!token) throw new Error("Вы не авторизованы");
  const { data } = await axios.get<ResumeWithUser>(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
