import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";


const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Личный кабинет</h1>
      {user && <p className="text-lg">Добро пожаловать, {user.name}!</p>}

      <nav className="mt-4">
        <ul className="space-y-2">
          {["student", "career_center"].includes(user?.role || "") && (
            <li>
              <Link to="/notifications" className="text-blue-500">Оповещении</Link>
            </li>
          )}

          {user?.role === "student" && (
            <>
              <li>
                <Link to="/myResume" className="text-blue-500">Мое резюме</Link>
              </li>
              <li>
                <Link to="/myResponses" className="text-blue-500">Мое отклики</Link>
              </li>
            </>
          )}

          {user?.role === "admin" && (
            <li>
              <Link to="/newUser" className="text-red-500">New user</Link>
            </li>
          )}

          {["career_center", "company"].includes(user?.role || "") && (
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
