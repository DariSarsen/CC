import axios from "axios";
import { Resume, defaultResume } from "../types/resume";

const API_URL = "http://localhost:3000/resumes";

export const getResume = async (token: string | null): Promise<Resume> => {
    if (!token) throw new Error("Вы не авторизованы");

    try {
        const res = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        return res.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return defaultResume; 
        }
        throw error;
    }
};

export const updateResume = async (token: string | null, formData: Resume) => {
    if (!token) throw new Error("Вы не авторизованы");

    await axios.put(API_URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
