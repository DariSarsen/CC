import axios from "axios";
import { Vacancy } from "../types/vacancy";

export const getVacancies = async (): Promise<Vacancy[]> => {
  const res = await axios.get("/vacancies");
  return res.data;
};

export const getVacancyById = async (id: string): Promise<Vacancy> => {
  const res = await axios.get(`/vacancies/${id}`);
  return res.data;
};

export const createVacancy = async (data: Partial<Vacancy>): Promise<Vacancy> => {
  const res = await axios.post("/vacancies", data);
  return res.data;
};

export const updateVacancy = async (id: string, data: Partial<Vacancy>): Promise<Vacancy> => {
  const res = await axios.put(`/vacancies/${id}`, data);
  return res.data;
};

export const deleteVacancy = async (id: string): Promise<void> => {
  await axios.delete(`/vacancies/${id}`);
};
