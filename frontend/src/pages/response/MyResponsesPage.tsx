import { useMyResponses } from "../../hooks/vacancyResponses/useMyResponses";
import LoadingScreen from "../../components/LoadingScreen";
import { FaEye, FaTrashAlt  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyResponsesPage = () => {
  const {
    responses,
    rawResponses,
    isLoading,
    stats,
    filterStatus,
    setFilterStatus,
    handleDelete,
  } = useMyResponses();

  const navigate = useNavigate();

  return (
    <>
    <div className="max-w-4xl mx-auto p-10 bg-red-900/80 backdrop-blur-xs text-white rounded-[40px] shadow-xl mb-36">
      <h1 className="text-3xl font-bold mb-6 text-center">Мои отклики</h1>

      {isLoading ? (
        <LoadingScreen />
      ) : rawResponses.length === 0 ? (
        <p className="text-center text-lg text-white">Вы ещё не откликались на вакансии.</p>
      ) : (
        <>
          {/* Статистика */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
            <div className="bg-white/20 p-3 rounded-lg border border-white border-opacity-20">
              <p className="text-lg font-bold">{stats.total}</p>
              <p className="text-sm">Всего</p>
            </div>
            <div className="bg-yellow-500/30 p-3 rounded-lg border border-white border-opacity-20">
              <p className="text-lg font-bold">{stats.pending}</p>
              <p className="text-sm">Ожидают</p>
            </div>
            <div className="bg-green-600/30 p-3 rounded-lg border border-white border-opacity-20">
              <p className="text-lg font-bold">{stats.accepted}</p>
              <p className="text-sm">Приняты</p>
            </div>
            <div className="bg-red-600/30 p-3 rounded-lg border border-white border-opacity-20">
              <p className="text-lg font-bold">{stats.rejected}</p>
              <p className="text-sm">Отклонены</p>
            </div>
          </div>

          {/* Фильтры */}
          <div className="flex justify-center gap-3 mb-6">
            {["all", "pending", "accepted", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filterStatus === status
                    ? "bg-white text-red-900"
                    : "bg-white/20 hover:bg-opacity-40"
                }`}
              >
                {{
                  all: "Все",
                  pending: "Ожидают",
                  accepted: "Приняты",
                  rejected: "Отклонены",
                }[status]}
              </button>
            ))}
          </div>

          {responses.length === 0 ? (
            <p className="text-center text-white mt-4">Нет откликов.</p>
          ) : ( 
            <>
              {/* Список откликов */}
              <ul className="space-y-6">
                {responses.map((response) => (
                  <li
                    key={response.id}
                    className="bg-white/10 p-5 rounded-xl shadow-md border border-white border-opacity-10"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-2xl font-semibold">
                        {response.Vacancy?.title || "Без названия"}
                      </h2>
                      <div className="flex gap-5">
                        <button
                          className="text-green-100 hover:text-green-300"
                          onClick={() => navigate(`/vacancies/${response.Vacancy?.id}`)}
                        >
                          <FaEye size={30} />
                        </button>
                        <button
                          className="text-red-100 hover:text-red-400"
                          onClick={() => handleDelete(response.id)}
                        >
                          <FaTrashAlt size={30} />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-white opacity-50">
                      <strong>Отправлено:</strong>{" "}
                      {new Date(response.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-lg mt-1">
                      <strong>Статус:</strong>{" "}
                      <span className="capitalize font-medium">{response.status}</span>
                    </p>
                    <p className="text-xl text-white opacity-80 mt-2">
                      <strong>Письмо:</strong> {response.coverLetter || "Нет письма"}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
    </>
    
  );
};

export default MyResponsesPage;
