import { useParams } from "react-router-dom";
import { useState } from "react";
import { useResponsesByVacancy } from "../../hooks/vacancyResponses/useResponsesByVacancy";
import LoadingScreen from "../../components/LoadingScreen";
import { updateResponseStatus } from "../../services/vacancyResponseService";
import { toast } from "react-toastify";

const VacancyResponsesPage = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const { responses, isLoading, refetch } = useResponsesByVacancy(vacancyId ?? "");
  const [selectedStatus, setSelectedStatus] = useState<"pending" | "accepted" | "rejected">("pending");

  const handleStatusChange = async (responseId: string, status: "accepted" | "rejected") => {
    try {
      await updateResponseStatus(responseId, status);
      toast.success("Статус обновлён");
      refetch();
    } catch {
      toast.error("Ошибка обновления статуса");
    }
  };

  const filteredResponses = responses.filter((r) => r.status === selectedStatus);

  const stats = {
    total: responses.length,
    pending: responses.filter((r) => r.status === "pending").length,
    accepted: responses.filter((r) => r.status === "accepted").length,
    rejected: responses.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="max-w-4xl m-2 mx-auto my-16 p-8 bg-red-900 bg-opacity-80 backdrop-blur-xs text-white rounded-[40px] shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Отклики на вакансию</h1>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Статистика */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg border border-white border-opacity-20">
              <p className="text-lg font-bold">{stats.total}</p>
              <p className="text-sm">Всего</p>
            </div>
            <div className="bg-yellow-500 bg-opacity-30 p-3 rounded-lg border border-white border-opacity-20">
              <p className="text-lg font-bold">{stats.pending}</p>
              <p className="text-sm">Ожидают</p>
            </div>
            <div className="bg-green-600 bg-opacity-30 p-3 rounded-lg border border-white border-opacity-20">
              <p className="text-lg font-bold">{stats.accepted}</p>
              <p className="text-sm">Приняты</p>
            </div>
            <div className="bg-red-600 bg-opacity-30 p-3 rounded-lg border border-white border-opacity-20">
              <p className="text-lg font-bold">{stats.rejected}</p>
              <p className="text-sm">Отклонены</p>
            </div>
          </div>

          {/* Кнопки переключения */}
          <div className="flex justify-center gap-4 mb-6">
            {["pending", "accepted", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status as any)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedStatus === status
                    ? "bg-white text-red-900"
                    : "bg-white bg-opacity-20 hover:bg-opacity-40"
                }`}
              >
                {status === "pending" && "Ожидают"}
                {status === "accepted" && "Приняты"}
                {status === "rejected" && "Отклонены"}
              </button>
            ))}
          </div>

          {/* Список откликов */}
          {filteredResponses.length === 0 ? (
            <p className="text-center text-lg">Нет откликов</p>
          ) : (
            <ul className="space-y-6">
              {filteredResponses.map((response) => (
                <li key={response.id} className="bg-white bg-opacity-10 p-5 rounded-xl shadow-md border border-white border-opacity-10">
                  <p className="text-lg">
                    <strong>Соискатель:</strong> {response.User?.name ?? "Без имени"}
                  </p>
                  <p className="mt-2">
                    <strong>Письмо:</strong> {response.coverLetter}
                  </p>
                  <p className="mt-2">
                    <strong>Статус:</strong>{" "}
                    <span className="capitalize font-medium">{response.status}</span>
                  </p>

                  <div className="flex gap-3 mt-4">
                    {["accepted", "rejected"].map((s) => (
                      <button
                        key={s}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          response.status === s
                            ? "bg-green-600 text-white"
                            : "bg-white text-black hover:bg-opacity-60"
                        }`}
                        onClick={() => handleStatusChange(response.id, s as any)}
                      >
                        {s === "accepted" ? "Принят" : "Отклонён"}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default VacancyResponsesPage;
