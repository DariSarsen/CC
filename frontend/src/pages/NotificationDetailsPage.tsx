import { useNotificationDetails } from "../hooks/useNotificationDetails";

const NotificationDetailsPage = () => {
  const { notification, role, handleDelete, handleEdit } = useNotificationDetails();

  if (!notification) return <p className="p-6">Оповещение не найдено</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{notification.title}</h1>
      <p className="text-gray-500 mb-4">
        Создано: {new Date(notification.created_at || "").toLocaleString()}
      </p>
      <p className="text-lg">{notification.content}</p>

      {role === "career_center" && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleEdit}
            className="items-center bg-blue-500 px-2 py-3 text-white hover:bg-blue-400 rounded-md"
          >
            Редактировать
          </button>
          <button
            onClick={handleDelete}
            className="items-center bg-red-500 px-2 py-3 text-white hover:bg-red-400 rounded-md"
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDetailsPage;
