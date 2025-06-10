import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useNotifications } from "../../../hooks/notification/useNotifications";
import LoadingScreen from "../../../components/LoadingScreen";
import { FiArrowRightCircle } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";

const NotificationListPage = () => {
  const { user } = useAuth();
  const { notifications, loading } = useNotifications();
  const BASE_URL = "http://localhost:3000";

  if (loading) return <LoadingScreen />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-white">Оповещения</h1>
        {user?.role === "career_center" && (
          <Link
            to="/notifications/new"
            className="flex flex-row gap-2 items-center px-4 py-2 bg-red-950/50 text-white rounded-lg hover:bg-red-950/70 transition-transform duration-300"
          >
            <AiFillPlusCircle size={20}/>
            <p>Создать оповещение</p>
          </Link>
        )}
      </div>

      <div className="columns-1 sm:columns-2 gap-6 space-y-6">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="break-inside-avoid overflow-hidden rounded-xl group shadow-md flex flex-col"
          >
            {n.imageUrl ? (
              <div className="relative w-full h-64 sm:h-80">
                <img
                  src={`${BASE_URL}${n.imageUrl}`}
                  alt="notification"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black via-black/70 to-transparent text-white z-10 text-shadow-lg/30">
                  <h2 className="text-xl font-semibold">{n.title}</h2>
                  <p className="text-sm">{new Date(n.createdAt || "").toLocaleString()}</p>
                </div>

                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 text-white p-4 transition-opacity duration-300 flex flex-col justify-center items-center text-center space-y-4 z-20">
                  <p className="text-md">{n.content.slice(0, 200)}...</p>
                  <Link
                    to={`/notifications/${n.id}`}
                    className="flex items-center gap-2 text-white hover:text-red-200 transition"
                  >
                    Подробнее <FiArrowRightCircle size={24} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col bg-red-950/60 backdrop-blur-md text-white p-6 min-h-64 rounded-xl">
                <h2 className="text-xl font-semibold break-words text-shadow-lg/10">{n.title}</h2>
                <p className="text-sm mb-4">{new Date(n.createdAt || "").toLocaleString()}</p>
                <p className="text-md line-clamp-3">{n.content}</p>
                <Link
                  to={`/notifications/${n.id}`}
                  className="mt-4 self-end text-white hover:text-red-300 transition"
                >
                  <FiArrowRightCircle size={30} />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationListPage;
