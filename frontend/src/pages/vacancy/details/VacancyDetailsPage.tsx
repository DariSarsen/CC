import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { deleteVacancy } from "../../../services/vacancyService";
import { useAuth } from "../../../contexts/AuthContext";
import { useVacancyDetails } from "../../../hooks/vacancy/useVacancyDetails";
import { useResponsesByVacancy } from "../../../hooks/vacancyResponses/useResponsesByVacancy";
import LoadingScreen from "../../../components/LoadingScreen";
import VacancyResponseModal from "../../../components/VacancyResponseModal";

const VacancyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { vacancy, isLoading } = useVacancyDetails(id!);
  const { responses } = useResponsesByVacancy(vacancy?.id || "", !!vacancy?.id);
  const [showModal, setShowModal] = useState(false);
  const BASE_URL = "http://localhost:3000";

  const stats = {
    total: responses.length,
  };
  console.log(vacancy)
  const handleDelete = async () => {
    if (!id) return;
    if (confirm("Вы уверены, что хотите удалить вакансию?")) {
      try {
        await deleteVacancy(id);
        toast.success("Вакансия удалена");
        navigate("/vacancies");
      } catch {
        toast.error("Ошибка при удалении вакансии");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/vacancies/${id}/edit`);
  };

  if (isLoading) return <LoadingScreen />;
  if (!vacancy) return <p className="p-6">Вакансия не найдена</p>;

  const isOwner = user?.id === vacancy.userId;

  return (
    <>
      <div className="text-white">
        <p className="text-3xl font-bold capitalize">Vacancy Details</p>
        <p className="text-xl font-light">Подробности по выбранной вакансии</p>
      </div>

      <div className="max-w-4xl mx-auto m-2 my-10 p-10 bg-red-900/70 backdrop-blur-xs shadow-2xl rounded-[50px] text-white space-y-8">
        <h2 className="text-4xl font-semibold">{vacancy.title}</h2>

        {showModal && (
          <VacancyResponseModal
            vacancyId={vacancy.id!}
            onClose={() => setShowModal(false)}
          />
        )}

        <div className="text-lg space-y-4">
          <p className=" bg-green-700 border border-green-900 border-opacity-40/30 rounded-lg px-4 py-2 w-max">
            {stats.total} отклик(а)
          </p>
          <p>
            <strong>Дата публикации:</strong>{" "}
            {format(new Date(vacancy.createdAt || ""), "dd.MM.yyyy HH:mm")}
          </p>
          <p>
            <strong className="font-bold">Требования:</strong>{" "}
            {vacancy.requirements.length
              ? vacancy.requirements.join(", ")
              : "Не указаны"}
          </p>
          <p>
            <strong className="font-bold">Локация:</strong> {vacancy.location}
          </p>
          <p>
            <strong className="font-bold">Зарплата:</strong> {vacancy.salary}
          </p>
          <p>
            <strong className="font-bold">Описание:</strong> {vacancy.description}
          </p>
          {vacancy.User && (
            <>
              <p>
                <strong className="font-bold">Адрес:</strong> {vacancy.User.CompanyProfile?.address}
              </p>
              <p>
                <strong className="font-bold">Контактная информация:</strong> {vacancy.User.CompanyProfile?.phone}
              </p>
              <p>
                <strong className="font-bold">Компания может проводить практику:</strong> {vacancy.User.CompanyProfile?.canProvideInternship ? "Да" : "Нет"}
              </p>

              <p>
                <strong className="font-bold">Вакансия от </strong> {vacancy.User.CompanyProfile?.companyName}
              </p>
              <div className="bg-white/10 rounded-lg p-4 border border-white/20 space-y-2 text-sm text-white/80">
                <h3 className="font-semibold">Вакансия была размещена</h3>
                <div className="flex flex-row gap-4 my-3 items-center">
                  <img
                    src={`${BASE_URL}${user?.photo}`}
                    alt=''
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div className="space-y-1 items-center">
                    <p><strong>Имя:</strong> {vacancy.User.name}</p>
                    <p><strong>Email:</strong> {vacancy.User.email}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {isOwner && (
          <div className="flex justify-around gap-4 mt-6">
            <button
              onClick={handleEdit}
              className="p-3 text-green-800 border-none text-xl bg-white/60 rounded-lg hover:bg-opacity-40 hover:bg-green-700 hover:text-white transition-all duration-500"
            >
              Редактировать
            </button>
            <button
              onClick={handleDelete}
              className="p-3 text-red-800 border-none text-xl bg-white/60 rounded-lg hover:bg-opacity-70 hover:bg-red-700 hover:text-white transition-all duration-500"
            >
              Удалить
            </button>
          </div>
        )}
        
        {user?.role === "student" && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="p-3 border-none text-lg bg-red-950/30 backdrop-blur-xs rounded-lg hover:bg-opacity-70 hover:scale-105 transform transition-all duration-300 ease-in-out"
            >
              Откликнуться
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default VacancyDetailsPage;
