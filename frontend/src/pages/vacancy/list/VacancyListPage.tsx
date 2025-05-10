import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserRole } from "../../../hooks/useUserRole";
import { useVacancies } from "../../../hooks/vacancy/useVacancies";

const VacancyListPage = () => {
  const [search, setSearch] = useState("");
  const [showMyVacancies, setShowMyVacancies] = useState(true);
  const role = useUserRole();
  const { vacancies, isLoading } = useVacancies(role, showMyVacancies);

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
