import axios from "axios";
import { Vacancy } from "../types/vacancy";

const API_URL = "http://localhost:3000/vacancies";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Вы не авторизованы");
  return { Authorization: `Bearer ${token}` };
};

export const createVacancy = async (vacancy: Vacancy) => {
  const { data } = await axios.post(API_URL, vacancy, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const updateVacancy = async (id: string, vacancy: Vacancy) => {
  const { data } = await axios.put(`${API_URL}/${id}`, vacancy, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const deleteVacancy = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
};

export const getVacancyById = async (id: string): Promise<Vacancy> => {
  const { data } = await axios.get(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const getMyVacancies = async (): Promise<Vacancy[]> => {
  const { data } = await axios.get(`${API_URL}/my`, {
    headers: getAuthHeaders(),
  });
  return data;
};
