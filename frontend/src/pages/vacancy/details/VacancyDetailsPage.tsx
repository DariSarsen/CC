import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
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
  const { responses } = useResponsesByVacancy(vacancy?.id ?? "");

  const stats = {
    total: responses.length,
  };

  const [showModal, setShowModal] = useState(false);


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
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{vacancy.title}</h1>
      <div className="text-2l mb-4 text-emerald-100 rounded-md bg-emerald-800 opacity-50 p-1 w-max border border-emerald-950">{stats.total} человека уже откликнулось</div>
      <p><strong>Описание:</strong> {vacancy.description}</p>
      <p>
        <strong>Требования:</strong>{" "}
        {vacancy.requirements.length
          ? vacancy.requirements.join(", ")
          : "Не указаны"}
      </p>
      <p><strong>Локация:</strong> {vacancy.location}</p>
      <p><strong>Зарплата:</strong> {vacancy.salary}</p>
      
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

      {isOwner && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleEdit}
            className="btn btn-outline btn-primary"
          >
            Редактировать
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-outline btn-error"
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

export default VacancyDetailsPage;
