import { useCreateUserForm } from "../../../hooks/admin/useCreateUserForm";

const CreateUser = () => {
  const { formData, handleChange, handleSubmit } = useCreateUserForm();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Добавить нового пользователя</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="student">Студент</option>
          <option value="company">Компания</option>
          <option value="career_center">Центр карьеры</option>
          <option value="admin">Админ</option>
        </select>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Добавить пользователя
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
