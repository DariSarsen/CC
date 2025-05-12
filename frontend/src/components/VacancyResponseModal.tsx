import { useVacancyResponseForm } from "../hooks/vacancyResponses/useVacancyResponseForm";

interface Props {
  vacancyId: string;
  onClose: () => void;
}

const VacancyResponseModal = ({ vacancyId, onClose }: Props) => {
  const { coverLetter, setCoverLetter, loading, handleSubmit } =
    useVacancyResponseForm(vacancyId, onClose);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Отклик на вакансию</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea textarea-bordered w-full h-32 mb-4"
            placeholder="Сопроводительное письмо"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={loading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VacancyResponseModal;
