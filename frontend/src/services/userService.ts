import axiosInstance from "../api/axiosInstance";
import { User } from "../types/user";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const createUser = async (userData: CreateUserPayload): Promise<User> => {
  const response = await axiosInstance.post("/users/newUser", userData);
  return response.data;
};
