import { useMyResponses } from "../../hooks/vacancyResponses/useMyResponses";
import LoadingScreen from "../../components/LoadingScreen";

const MyResponsesPage = () => {
  const { responses, isLoading } = useMyResponses();
  
  const stats = {
  accepted: responses.filter((r) => r.status === "accepted").length,
  rejected: responses.filter((r) => r.status === "rejected").length,
  pending: responses.filter((r) => r.status === "pending").length,
  total: responses.length,
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Мои отклики</h1>
      {isLoading ? (
        <LoadingScreen />
      ) : responses.length === 0 ? (
        <p className="text-gray-500">Вы ещё не откликались на вакансии.</p>
      ) : (
        <>
        <div className="flex justify-between items-center gap-4">
          <div className="text-2l flex-auto text-emerald-100 rounded-md bg-emerald-800 opacity-50 p-1 w-max border border-emerald-950">Общее количество откликов: {stats.total}</div>
          <div className="text-2l flex-auto text-emerald-100 rounded-md bg-emerald-800 opacity-50 p-1 w-max border border-emerald-950">На расмотрении: {stats.pending}</div>
          <div className="text-2l flex-auto text-emerald-100 rounded-md bg-emerald-800 opacity-50 p-1 w-max border border-emerald-950">Принято: {stats.accepted}</div>
          <div className="text-2l flex-auto text-emerald-100 rounded-md bg-emerald-800 opacity-50 p-1 w-max border border-emerald-950">Отказ: {stats.rejected}</div>
        </div>

       
        <hr className="m-5" />
        <ul className="space-y-4">
          {responses.map((response) => (
            <li
              key={response.id}
              className="border p-4 rounded-md shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold">
                {response.vacancy?.title || "Без названия"}
              </h2>
              <p className="text-gray-600">
                Сопроводительное письмо: {response.coverLetter}
              </p>
              <p className="text-sm text-gray-400">
                Отправлено: {new Date(response.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
};

export default MyResponsesPage;
