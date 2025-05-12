import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useNotifications } from "../../../hooks/notification/useNotifications";
import LoadingScreen from "../../../components/LoadingScreen";

const BASE_URL = "http://localhost:3000";

const NotificationListPage = () => {
  const { user } = useAuth();
  const { notifications, loading } = useNotifications();

  if (loading) return <LoadingScreen />;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Оповещения</h1>
        {user?.role === "career_center" && (
          <Link to="/notifications/new" className="btn btn-sm btn-primary">
            Создать оповещение
          </Link>
        )}
      </div>

      <ul className="space-y-6">
        {notifications.map((n) => (
          <li
            key={n.id}
            className="rounded-lg overflow-hidden shadow-md border relative"
          >
            {n.imageUrl ? (
              <div className="relative h-48">
                <img
                  src={`${BASE_URL}${n.imageUrl}`}
                  alt="notification"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <Link
                    to={`/notifications/${n.id}`}
                    className="text-xl font-semibold hover:underline"
                  >
                    {n.title}
                  </Link>
                  <p className="text-sm text-gray-200">
                    {new Date(n.created_at || "").toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <Link
                  to={`/notifications/${n.id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {n.title}
                </Link>
                <p className="text-sm text-gray-500">
                  {new Date(n.created_at || "").toLocaleString()}
                </p>
              </div>
            )}
            <div className="p-4 pt-2">
              <p>{n.content.slice(0, 100)}...</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationListPage;
