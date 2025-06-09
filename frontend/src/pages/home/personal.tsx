import { useState } from "react";
import { useUserProfile } from "../../hooks/user/useUpdateMe";
import { FaEdit, FaSave, FaEye, FaUpload } from "react-icons/fa";

const UserProfilePage = () => {
  const {
    user,
    formData,
    isEditing,
    error,
    setIsEditing,
    handleChange,
    saveProfile,
    imageFile,
    handleFileChange
  } = useUserProfile();
  const BASE_URL = "http://localhost:3000";
  const [showPasswordFields, setShowPasswordFields] = useState(false);


  return (
    <div className="max-w-3xl mx-auto mt-10 mb-20 bg-red-900/60 backdrop-blur-sm text-white p-6 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Профиль</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-black gap-2 bg-white/80 hover:bg-red-500/60 hover:text-white px-4 py-2 rounded text-sm transition duration-300"
        >
          {isEditing ? <><FaEye /> Просмотр</> : <><FaEdit /> Редактировать</>}
        </button>
      </div>

      {isEditing ? (
        <>
        <div className="space-y-4 flex flex-row gap-4 justify-center">
          <div className="w-2/5">
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : `${BASE_URL}${user?.photo}`}
              alt="Preview"
              className="w-64 h-max mt-2 rounded-lg"
            />
            <p className="text-sm text-white mt-2">
              {imageFile ? "Новое изображение:" : "Текущее изображение:"}
            </p>
          </div>

          <div className="w-3/5 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-white font-semibold">Пароль</label>
              <button
                type="button"
                onClick={() => setShowPasswordFields(!showPasswordFields)}
                className="text-sm text-red-300 underline"
              >
                {showPasswordFields ? "Скрыть" : "Изменить пароль"}
              </button>
            </div>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                showPasswordFields ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-3 my-2">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Текущий пароль"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-red-900 text-white focus:outline-white focus:outline-1"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Новый пароль"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-red-900 text-white focus:outline-white focus:outline-1"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Подтвердите пароль"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-red-900 text-white focus:outline-white focus:outline-1"
                />
              </div>
            </div>


            <div>
              <label className="font-semibold">Изображение:</label>

              <label
                htmlFor="image"
                className="flex items-center gap-3 px-4 py-3 mt-2 bg-red-900 backdrop-blur-xs rounded-lg cursor-pointer hover:bg-red-900/70 transition"
              >
                <FaUpload size={20} />
                <span className="text-sm text-white truncate">
                  {imageFile?.name || user?.photo?.split("/").pop() || "Выберите файл (необязательно)"}
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
          </div>
        </div>
        <div className="flex justify-center h-10 items-center mt-5">
          <button
            onClick={saveProfile}
            className="h-fit bg-green-700/50 w-1/3 border-2 border-green-700 hover:border-green-400/30 hover:bg-green-700/90 px-4 py-2 rounded text-white flex items-center justify-center gap-2 transition-all duration-300"
          >
            <FaSave /> Сохранить изменения
          </button>
        </div>
        
        {error && <div className="text-red-700 bg-white text-center m-5 p-2 rounded-2xl tracking-wide shadow-2xs">{error}</div>}

        
        </>
      ) : (
        <div className="space-y-4 flex flex-row gap-8">

          {user?.photo && (
            <div className="w-2/5">
              <img
                src={`${BASE_URL}${user.photo}`}
                alt="Фото пользователя"
                className="h-full object-cover rounded-sm mt-2 border"
              />
            </div>
          )}

          <div className="w-3/5">
            
            <div className="text-xl">
              <strong>Имя:</strong> {user?.name}
            </div>
            
            <div className="text-xl">
              <strong>Email:</strong> {user?.email}
            </div>
            
            <div className="text-xl">
              <strong>Role:</strong> {user?.role}
            </div>
            
            {user?.CompanyProfile && (
              <div className="text-xl">
                <strong>Email:</strong> {user?.email}
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
