import axios from "axios";
import { Notification } from "../types/notification";

const API_URL = "http://localhost:3000/notifications";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Вы не авторизованы");
  return { Authorization: `Bearer ${token}` };
};

export const getNotifications = async (): Promise<Notification[]> => {
  const { data } = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const getNotificationById = async (id: string): Promise<Notification> => {
  const { data } = await axios.get(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const createNotification = async (formData: FormData): Promise<Notification> => {
  const { data } = await axios.post(API_URL, formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateNotification = async (id: string, formData: FormData): Promise<Notification> => {
  const { data } = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteNotification = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
};
