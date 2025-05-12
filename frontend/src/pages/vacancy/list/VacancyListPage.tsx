
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useVacancies } from "../../../hooks/vacancy/useVacancies";
import LoadingScreen from "../../../components/LoadingScreen";
import VacancyResponseModal from "../../../components/VacancyResponseModal"; 


const VacancyListPage = () => {
  const { user } = useAuth();                
  const role = user?.role ?? "";             
  const [search, setSearch] = useState("");
  const [showMyVacancies, setShowMyVacancies] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const { vacancies, isLoading } = useVacancies(showMyVacancies);

  const filteredVacancies = vacancies.filter((v) => {
    const q = search.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q)
    );
  });

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
              onClick={() => setShowMyVacancies((prev) => !prev)}
            >
              {showMyVacancies ? "Показать все" : "Показать мои"}
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
        <LoadingScreen />
      ) : filteredVacancies.length === 0 ? (
        <p className="text-center text-gray-500">Вакансии не найдены</p>
      ) : (
        <ul className="space-y-4">
          {filteredVacancies.map((vacancy) => (
            <li
              key={vacancy.id}
              className="border p-4 rounded-md shadow-sm"
            >
              <Link
                to={`/vacancies/${vacancy.id}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {vacancy.title}
              </Link>
              <p className="text-sm text-gray-600">
                {vacancy.location} — {vacancy.salary}
              </p>
              <p className="text-gray-700">
                {vacancy.description.slice(0, 100)}...
              </p>
                  
              {user?.role === "company" && (
                <Link to={`/vacancies/${vacancy.id}/responses`} className="text-blue-500">Посмотреть отклики</Link>
              )}

              {user?.role === "student" && (
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                  Откликнуться
                </button>
              )}

              {showModal && (
                <VacancyResponseModal
                  vacancyId={vacancy.id!}
                  onClose={() => setShowModal(false)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VacancyListPage;
