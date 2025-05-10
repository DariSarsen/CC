import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser } from "../../services/userService";

export const useCreateUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData);
      toast.success("Пользователь создан");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ошибка при создании пользователя");
    }
  };

  return { formData, handleChange, handleSubmit };
};
