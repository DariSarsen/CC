import axiosInstance from "../api/axiosInstance"; 
import { Resume, ResumeWithUser, defaultResume } from "../types/resume";

const API_URL = "http://localhost:3000/resumes";

// своё резюме
export const getResume = async (): Promise<Resume> => {
  try {
    const { data } = await axiosInstance.get<Resume>(`${API_URL}/me`);  
    return data;
  } catch (err: any) {
    if (err.response?.status === 404) return defaultResume;
    throw err;
  }
};

// обновление
export const updateResume = async (formData: Resume) => {
  await axiosInstance.put(API_URL, formData);  // Без токена в заголовках
};

// все резюме для компаний/ЦК
export const fetchResumes = async (): Promise<ResumeWithUser[]> => {
  const { data } = await axiosInstance.get<ResumeWithUser[]>(API_URL);  
  return data;
};

// одно резюме для компаний/ЦК
export const fetchResumeById = async (id: string): Promise<ResumeWithUser> => {
  const { data } = await axiosInstance.get<ResumeWithUser>(`${API_URL}/${id}`);  
  return data;
};
