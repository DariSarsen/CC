import { useNavigate, useParams } from "react-router-dom";
import { useVacancy } from "../../../hooks/vacancy/useVacancy";
import LoadingScreen from "../../../components/LoadingScreen";

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
    <>
      <div className="ml-10 text-white mt-10">
        <p className="text-3xl font-bold capitalize">
          {isEdit ? "Редактировать вакансию" : "Новая вакансия"}
        </p>
        <p className="text-xl font-light">
          {isEdit
            ? "Измените информацию о вакансии"
            : "Создание новой вакансии для студентов"}
        </p>
      </div>

      <div className="max-w-3xl mx-auto m-2 my-20 p-10 bg-red-900 bg-opacity-60 backdrop-blur-sm shadow-2xl rounded-[50px] text-white space-y-10">
        <h2 className="text-3xl font-semibold text-center capitalize">
          {isEdit ? "Обновление вакансии" : "Создание вакансии"}
        </h2>

        {isLoading ? (
          <LoadingScreen />
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 flex flex-col items-center">
            {/* Title */}
            <div className="w-4/5 space-y-2">
              <label htmlFor="title">
                <span className="font-semibold">Название вакансии: *</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Введите название"
                value={form.title}
                onChange={handleChange}
                className="w-full p-4 border-none text-lg bg-red-900 bg-opacity-20 backdrop-blur-sm rounded-lg outline-none focus:ring-1 focus:ring-white placeholder:text-red-200 transition-all duration-300 ease-in-out"
                required
              />
            </div>

            {/* Description */}
            <div className="w-4/5 space-y-2">
              <label htmlFor="description">
                <span className="font-semibold">Описание:</span>
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Описание вакансии"
                value={form.description}
                onChange={handleChange}
                className="w-full p-4 h-32 border-none text-lg bg-red-900 bg-opacity-20 backdrop-blur-sm rounded-lg outline-none focus:ring-1 focus:ring-white placeholder:text-red-200 transition-all duration-300 ease-in-out resize-none"
              />
            </div>

            {/* Requirements */}
            <div className="w-4/5 space-y-2">
              <label htmlFor="requirements">
                <span className="font-semibold">Требования:</span>
              </label>
              <input
                type="text"
                name="requirements"
                id="requirements"
                placeholder="Например: React, Python, Figma"
                value={requirementsInput}
                onChange={handleRequirementsChange}
                className="w-full p-4 border-none text-lg bg-red-900 bg-opacity-20 backdrop-blur-sm rounded-lg outline-none focus:ring-1 focus:ring-white placeholder:text-red-200 transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Location */}
            <div className="w-4/5 space-y-2">
              <label htmlFor="location">
                <span className="font-semibold">Локация:</span>
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Город или онлайн"
                value={form.location}
                onChange={handleChange}
                className="w-full p-4 border-none text-lg bg-red-900 bg-opacity-20 backdrop-blur-sm rounded-lg outline-none focus:ring-1 focus:ring-white placeholder:text-red-200 transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Salary */}
            <div className="w-4/5 space-y-2">
              <label htmlFor="salary">
                <span className="font-semibold">Зарплата:</span>
              </label>
              <input
                type="text"
                name="salary"
                id="salary"
                placeholder="Укажите диапазон"
                value={form.salary}
                onChange={handleChange}
                className="w-full p-4 border-none text-lg bg-red-900 bg-opacity-20 backdrop-blur-sm rounded-lg outline-none focus:ring-1 focus:ring-white placeholder:text-red-200 transition-all duration-300 ease-in-out"
              />
            </div>

            <div className="w-1/2 space-y-2">
              <button
                type="submit"
                className="w-full p-3 mt-6 border-none text-lg bg-red-950 bg-opacity-30 backdrop-blur-sm rounded-lg hover:bg-opacity-70 hover:scale-105 transform transition-all duration-300 ease-in-out"
              >
                {isEdit ? "Сохранить изменения" : "Создать вакансию"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default VacancyFormPage;
