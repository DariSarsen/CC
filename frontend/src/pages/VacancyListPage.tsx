import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Vacancy } from "../types/vacancy";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  role: string;
};

const VacancyListPage = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showMyVacancies, setShowMyVacancies] = useState(true);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded: JwtPayload = jwtDecode(token);
    setRole(decoded.role);
  }, []);

  useEffect(() => {
    const fetchVacancies = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const url =
          role === "company" && showMyVacancies
            ? "http://localhost:3000/vacancies/my"
            : "http://localhost:3000/vacancies";

        const { data } = await axios.get(url, { headers });
        setVacancies(data);
      } catch (error) {
        toast.error("Не удалось загрузить вакансии");
      } finally {
        setIsLoading(false);
      }
    };

    if (role) fetchVacancies();
  }, [role, showMyVacancies]);

  const filteredVacancies = vacancies.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Вакансии</h1>
        {role === "company" && (
          <div className="flex gap-2">
            <Link to="/vacancies/new" className="btn btn-sm btn-primary">
              Создать вакансию
            </Link>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setShowMyVacancies(!showMyVacancies)}
            >
              {showMyVacancies ? "Показать все вакансии" : "Показать мои вакансии"}
            </button>
          </div>
        )}
      </div>


      <input
        type="text"
        placeholder="Поиск по названию или описанию..."
        className="input input-bordered w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <p>Загрузка...</p>
      ) : filteredVacancies.length === 0 ? (
        <p>Вакансии не найдены</p>
      ) : (
        <ul className="space-y-4">
          {filteredVacancies.map((vacancy) => (
            <li key={vacancy.id} className="border p-4 rounded-md shadow-sm">
              <Link
                to={`/vacancies/${vacancy.id}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {vacancy.title}
              </Link>
              <p className="text-sm text-gray-600">
                {vacancy.location} — {vacancy.salary}
              </p>
              <p className="text-gray-700">{vacancy.description.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VacancyListPage;
