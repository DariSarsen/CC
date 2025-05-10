import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../hooks/notification/useNotification";
import LoadingScreen from "../../../components/LoadingScreen";

const NotificationFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    form,
    handleChange,
    handleFileChange,
    handleSubmit,
    isEdit,
    isLoading,
  } = useNotification(id);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
    navigate("/notifications");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Редактировать оповещение" : "Создать оповещение"}
      </h1>
      {isLoading ? (
         <LoadingScreen />
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Заголовок"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Сообщение"
            className="textarea textarea-bordered w-full"
            rows={5}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Предыдущее изображение"
              className="max-w-xs mt-2"
            />
          )}
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Сохранить" : "Создать"}
          </button>
        </form>
      )}
    </div>
  );
};

export default NotificationFormPage;
