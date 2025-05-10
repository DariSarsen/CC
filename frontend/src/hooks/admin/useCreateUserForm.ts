import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/users/newUser",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ошибка при создании пользователя");
    }
  };

  return { formData, handleChange, handleSubmit };
};
