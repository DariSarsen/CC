import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../hooks/notification/useNotification";
import LoadingScreen from "../../../components/LoadingScreen";
import { FaUpload } from "react-icons/fa6";

const NotificationFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3000";

  const {
    form,
    handleChange,
    handleFileChange,
    handleSubmit,
    isEdit,
    isLoading,
    imageFile,
  } = useNotification(id);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit();
    navigate("/notifications");
  };

  const getImagePreview = () => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    } else if (form.imageUrl) {
      return `${BASE_URL}${form.imageUrl}`;
    }
    return null;
  };

  return (
    <div className="text-white">
      <p className="text-3xl font-bold capitalize">
        {isEdit ? "Редактировать оповещение" : "Создать оповещение"}
      </p>
      <p className="text-xl font-light">
        Добавьте текст и изображение к уведомлению
      </p>

      <div className="max-w-5xl mx-auto my-20 p-10 bg-red-900/50 backdrop-blur-xs shadow-2xl rounded-[50px] text-white space-y-10">
        <h2 className="text-3xl font-semibold text-center capitalize">
          {isEdit ? "Редактирование" : "Новое оповещение"}
        </h2>

        {isLoading ? (
          <LoadingScreen />
        ) : (
          <form
            onSubmit={onSubmit}
            className="space-y-6 flex flex-col items-center w-full"
          >
            {/* Title */}
            <div className="w-4/5 space-y-2">
              <label htmlFor="title">
                <span className="font-semibold">Заголовок: *</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Введите заголовок"
                className="w-full p-3 border-none text-lg bg-red-900/20 backdrop-blur-xs rounded-lg outline-hidden focus:ring-1 focus:ring-white placeholder:text-red-200 transition duration-300 ease-in-out"
                required
              />
            </div>
            
            <div className="flex flex-row items-start justify-between w-4/5 gap-7">
              {/* Image Upload */}
              <div className="w-2/5 space-y-2">
                {/* Preview */}
                {getImagePreview() && (
                  <>
                    <img
                      src={getImagePreview()!}
                      alt="Preview"
                      className="max-w-full mt-2 rounded-lg"
                    />
                    <p className="text-sm text-white mt-2">
                      {imageFile ? "Новое изображение:" : "Текущее изображение:"}
                    </p>
                  </>
                )}

                <label className="font-semibold">Изображение:</label>

                <label
                  htmlFor="image"
                  className="flex items-center gap-3 px-4 py-3 bg-red-900/20 backdrop-blur-xs rounded-lg cursor-pointer hover:bg-red-900/70 transition"
                >
                  <FaUpload size={20} />
                  <span className="text-sm text-white truncate">
                    {imageFile?.name || form.imageUrl?.split("/").pop() || "Выберите файл (необязательно)"}
                  </span>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Content */}
              <div className="w-3/5 space-y-2">
                <label htmlFor="content">
                  <span className="font-semibold">Сообщение: *</span>
                </label>
                <textarea
                  name="content"
                  id="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Введите сообщение"
                  rows={15}
                  className="w-full p-4 border-none text-lg bg-red-900/20 backdrop-blur-xs rounded-lg outline-hidden focus:ring-1 focus:ring-white placeholder:text-red-200 transition duration-300 ease-in-out"
                  required
                />
              </div>

            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-1/2 p-3 border-none text-lg bg-red-950/30 backdrop-blur-xs rounded-lg hover:bg-opacity-70 hover:scale-105 transform transition-all duration-300 ease-in-out"
            >
              {isEdit ? "Сохранить" : "Создать"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NotificationFormPage;
