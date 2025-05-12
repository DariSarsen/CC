import axiosInstance from "../api/axiosInstance";
import { User, CreateUserPayload } from "../types/user";

export const createUser = async (userData: CreateUserPayload): Promise<User> => {
  const response = await axiosInstance.post("/users/newUser", userData);
  return response.data;
};
