import { useNotificationDetails } from "../../../hooks/notification/useNotificationDetails";

const NotificationDetailsPage = () => {
  const { notification, role, handleDelete, handleEdit } = useNotificationDetails();
  const BASE_URL = "http://localhost:3000";

  if (!notification) {
    return (
      <div className="p-6 text-white text-center text-xl">
        Оповещение не найдено
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="max-w-5xl space-y-5 mx-auto my-20 p-15 bg-red-900/50 backdrop-blur-xs shadow-2xl rounded-[50px] ">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold capitalize">
            {notification.title}
          </h1>
          <p className="text-sm text-red-200">
            Создано: {new Date(notification.created_at || "").toLocaleString()}
          </p>
        </div>
        
        <div className="flex flex-row items-start justify-between gap-7">
          {/* Image Upload */}
          
            {notification.imageUrl ? (
              <div className="w-2/5">
                <img
                  src={`${BASE_URL}${notification.imageUrl}`}
                  alt={`${notification.imageUrl}`}
                  className="max-w-full rounded-lg"
                />
              </div>
            ) : (
              ""
            )}
          <div className={`${notification.imageUrl ? ("w-3/5") : ("w-full")}`}> 
            <p className="text-lg whitespace-pre-line text-justify">
              {notification.content}
            </p>
          </div>
        </div>

        {role === "career_center" && (
          <div className="flex justify-around gap-6 mt-16">
            <button
              onClick={handleEdit}
              className="px-6 py-3 bg-green-800/40 border border-white/40 hover:bg-green-800/70 hover:border-green-900/80 text-white rounded-lg shadow-md transition transform"
            >
              Редактировать
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-800/40 border border-white/40 hover:bg-red-800/70 hover:border-red-900/80 text-white rounded-lg shadow-md transition transform"
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDetailsPage;
