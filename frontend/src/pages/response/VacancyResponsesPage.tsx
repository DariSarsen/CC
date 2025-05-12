import { useParams } from "react-router-dom";
import { useResponsesByVacancy } from "../../hooks/vacancyResponses/useResponsesByVacancy";
import LoadingScreen from "../../components/LoadingScreen";
import { updateResponseStatus } from "../../services/vacancyResponseService";
import { toast } from "react-toastify";

const VacancyResponsesPage = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const { responses, isLoading, refetch } = useResponsesByVacancy(vacancyId ?? "");

  const handleStatusChange = async (responseId: string, status: "accepted" | "rejected") => {
    try {
      await updateResponseStatus(responseId, status);
      toast.success("Статус обновлён");
      refetch();
    } catch {
      toast.error("Ошибка обновления статуса");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Отклики на вакансию</h1>
      {isLoading ? (
        <LoadingScreen />
      ) : responses.length === 0 ? (
        <p>Нет откликов</p>
      ) : (
        <ul className="space-y-4">
          {responses.map((response) => (
            <li key={response.id} className="border p-4 rounded">
              <p><strong>Соискатель:</strong> {response.User?.name ?? "Без имени"}</p>
              <p><strong>Письмо:</strong> {response.coverLetter}</p>
              <p><strong>Статус:</strong> <span className="capitalize">{response.status}</span></p>

              <div className="flex gap-2 mt-2">
                {["accepted", "rejected"].map((s) => (
                  <button
                    key={s}
                    className={`btn btn-sm ${
                      response.status === s ? "btn-primary" : "btn-outline"
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
    </div>
  );
};

export default VacancyResponsesPage;
