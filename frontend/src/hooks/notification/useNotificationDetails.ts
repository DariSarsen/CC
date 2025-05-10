import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNotificationById, deleteNotification } from "../../services/notificationService";
import { Notification } from "../../types/notification";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

type JwtPayload = { role: string };

export const useNotificationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      setRole(decoded.role);
    }

    if (id) {
      getNotificationById(id)
        .then(setNotification)
        .catch(() => toast.error("Ошибка загрузки оповещения"));
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (confirm("Удалить это оповещение?")) {
      try {
        await deleteNotification(id);
        toast.success("Оповещение удалено");
        navigate("/notifications");
      } catch {
        toast.error("Ошибка при удалении");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/notifications/${id}/edit`);
  };

  return {
    notification,
    role,
    handleDelete,
    handleEdit,
  };
};
