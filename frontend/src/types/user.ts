export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "company" | "career_center" | "admin";
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
  notifyUser: boolean;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
}