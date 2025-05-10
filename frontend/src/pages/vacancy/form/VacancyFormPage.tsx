import { useNavigate, useParams } from "react-router-dom";
import { useVacancy } from "../../../hooks/vacancy/useVacancy";

const VacancyFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    form,
    handleChange,
    handleRequirementsChange,
    requirementsInput,
    handleSubmit,
    isEdit,
    isLoading,
  } = useVacancy(id);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
    navigate("/vacancies");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Редактировать вакансию" : "Создать вакансию"}
      </h1>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Название"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Описание"
            className="textarea textarea-bordered w-full"
          />
          <input
            name="requirements"
            value={requirementsInput}
            onChange={handleRequirementsChange}
            placeholder="Требования (через запятую)"
            className="input input-bordered w-full"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Локация"
            className="input input-bordered w-full"
          />
          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Зарплата"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Сохранить" : "Создать"}
          </button>
        </form>
      )}
    </div>
  );
};

export default VacancyFormPage;
