import axiosInstance from "../api/axiosInstance";
import { User, CreateUserPayload, UpdateUserPayload } from "../types/user";

// Создание
export const createUser = async (userData: CreateUserPayload): Promise<User> => {
  const response = await axiosInstance.post("/users/newUser", userData);
  return response.data.user;
};

// Получение всех
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

// Обновление
export const updateUser = async (id: string, userData: UpdateUserPayload): Promise<User> => {
  const response = await axiosInstance.put(`/users/${id}`, userData);
  return response.data.user;
};

// Удаление
export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
