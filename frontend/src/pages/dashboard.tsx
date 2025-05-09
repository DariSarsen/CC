import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface User {
  id: string;
  name: string;
  role: "student" | "company" | "career_center" | "admin";
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Вы не авторизованы");
          return;
        }
        setUser(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null);
        
      } catch (error) {
        toast.error("Ошибка загрузки данных пользователя");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Личный кабинет</h1>
      {user && <p className="text-lg">Добро пожаловать, {user.name}!</p>}

      <nav className="mt-4">
        <ul className="space-y-2">

          {((user?.role === "student") || (user?.role === "career_center") || (user?.role === "admin")) && (
            <li>
              <Link to="/notifications" className="text-blue-500">Оповещении</Link>
            </li>
          )}


          {user?.role === "student" && (
            <li>
              <Link to="/myResume" className="text-blue-500">Мое резюме</Link>
            </li>
          )}
          

          {user?.role === "admin" && (
            <li>
              <Link to="/newUser" className="text-red-500">New user</Link>
            </li>
          )}

          {((user?.role === "career_center") || (user?.role === "company")) && (
            <li>
              <Link to="/resumes" className="text-blue-500">Резюме студентов</Link>
            </li>
          )}
          
          <li>
            <Link to="/vacancies" className="text-blue-500">Вакансии</Link>
          </li>
          <li>
            <Link to="/settings" className="text-blue-500">Настройки</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;