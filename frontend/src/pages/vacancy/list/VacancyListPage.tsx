import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useVacancies } from "../../../hooks/vacancy/useVacancies";
import LoadingScreen from "../../../components/LoadingScreen";
import VacancyResponseModal from "../../../components/VacancyResponseModal";

import { IoIosSearch } from "react-icons/io";

const VacancyListPage = () => {
  const { role } = useAuth();
  const [search, setSearch] = useState("");
  const [showMyVacancies, setShowMyVacancies] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null);

  const { vacancies, isLoading } = useVacancies(showMyVacancies);

  const filteredVacancies = vacancies.filter((v) => {
    const q = search.toLowerCase();
    return (
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-6 text-white mb-36">

      <div className=" mb-6 flex flex-row flex-wrap gap-4 justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold capitalize">
            {(showMyVacancies && role === "company") ? "Мои Вакансии" : "Вакансии"}
          </h1>
          <p className="text-lg text-white">
            Поиск, отклики и управление вакансиями
          </p>
        </div>

        {role === "company" && (
          <div className="flex place-items-center gap-4 flex-wrap">
            <Link
              to="/vacancies/new"
              className="px-5 py-2 rounded-lg bg-red-950/30 backdrop-blur-xs hover:bg-opacity-70 transform transition duration-300"
            >
              Создать вакансию
            </Link>

            <button
              onClick={() => setShowMyVacancies((prev) => !prev)}
              className="px-5 py-2 rounded-lg border border-red-300 bg-red-800/30 hover:bg-opacity-60 transform transition duration-300"
            >
              {showMyVacancies ? "Показать все" : "Показать мои"}
            </button>
          </div>
        )}
      </div>

      <div className="mb-8 relative w-full">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl z-10">
          <IoIosSearch />
        </span>
        <input
          type="text"
          placeholder="Поиск по названию или описанию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 p-4 border-none text-lg bg-red-900/50 backdrop-blur-xs rounded-lg outline-hidden focus:ring-1 focus:ring-white placeholder:text-red-100 transform transition-all duration-300 ease-in-out"
        />
      </div>

      {isLoading ? (
        <LoadingScreen />
      ) : filteredVacancies.length === 0 ? (
        <p className="text-center text-white">Вакансии не найдены</p>
      ) : (
        <ul className="space-y-6">
          {filteredVacancies.map((vacancy) => (
            <li
              key={vacancy.id}
              className="p-6 rounded-2xl bg-red-900/80 backdrop-blur-xs shadow-2xl transform transition-all duration-300"
            >
              <Link
                to={`/vacancies/${vacancy.id}`}
                className="text-2xl font-semibold text-white hover:underline"
              >
                {vacancy.title}
              </Link>
              <p className="text-sm text-white">
                {vacancy.location} — {vacancy.salary}
              </p>
              <div className="border-b border-red-800 py-1"/>
              <p className="text-white mt-2 line-clamp-3">
                {vacancy.description}
              </p>

              <div className="mt-4 flex gap-4 flex-wrap justify-end">
                {role === "company" && (
                  <Link
                    to={`/vacancies/${vacancy.id}/responses`}
                      className="px-5 py-2 rounded-lg bg-red-950/30 backdrop-blur-xs hover:bg-opacity-80 transform transition duration-300"
                    >
                    Посмотреть отклики
                  </Link>
                )}

                {role === "student" && (
                  
                  <button
                    className="px-4 py-2 rounded-lg bg-white/20 hover:bg-opacity-40 transition-all duration-300  border border-white border-opacity-20"
                    onClick={() => {
                      setSelectedVacancyId(vacancy.id!);
                      setShowModal(true);
                    }}
                  >
                    Откликнуться
                  </button>

                )}
              </div>

            </li>
          ))}

          {showModal && selectedVacancyId && (
            <VacancyResponseModal
              vacancyId={selectedVacancyId}
              onClose={() => {
                setShowModal(false);
                setSelectedVacancyId(null);
              }}
            />
          )}

        </ul>
        
      )}
    </div>
  );
};

export default VacancyListPage;
