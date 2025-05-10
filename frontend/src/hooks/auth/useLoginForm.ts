import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
      toast.success(data.message || "Успешно!");
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || "Ошибка";
      toast.error(errorMessage);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
  };
};
