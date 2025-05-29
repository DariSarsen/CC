import RoleSelect from "../../../components/RoleSelect";
import { useCreateUserForm } from "../../../hooks/admin/useCreateUserForm";

const CreateUser = () => {
  const { formData, setFormData, handleChange, handleSubmit } = useCreateUserForm();

  return (
    <>
      <div className="text-white">
        <p className="text-3xl font-bold capitalize">New User</p>
        <p className="text-xl font-light">Creating accounts for students, companies, and Career Center users</p>
      </div>

      <div className="max-w-3xl mx-auto m-2 my-20 p-10 bg-red-900 bg-opacity-50 backdrop-blur-sm shadow-2xl rounded-[50px] text-white space-y-10">
      <h2 className="text-3xl font-semibold text-center capitalize">Добавить нового пользователя</h2>
      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
        
        {/* name */}
        <div className="w-4/5 space-y-2">
          <label htmlFor="name">
            <span className="font-semibold">Имя пользователя: *</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Введите имя"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border-none text-lg bg-red-900 bg-opacity-20 backdrop-blur-sm rounded-lg outline-none focus:ring-1 focus:ring-white placeholder:text-red-200 transform transition-all duration-300 ease-in-out"
            required
          />  
        </div> 

        {/* email */}
        <div className="w-4/5 space-y-2">
          <label htmlFor="email">
            <span className="font-semibold">Email: *</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Введите email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border-none text-lg bg-red-900 bg-opacity-20 backdrop-blur-sm rounded-lg outline-none focus:ring-1 focus:ring-white placeholder:text-red-200 transform transition-all duration-300 ease-in-out"
            required
          />  
        </div> 

        {/* password */}
        <div className="w-4/5 space-y-2">
          <label htmlFor="password">
            <span className="font-semibold">Пароль: *</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 border-none text-lg bg-red-900 bg-opacity-20 backdrop-blur-sm rounded-lg outline-none focus:ring-1 focus:ring-white placeholder:text-red-200 transform transition-all duration-300 ease-in-out"
            required
          />  
        </div> 

        {/* Role select field */}
        <div className="w-4/5 space-y-2">
        <RoleSelect
          value={formData.role}
          onChange={(newValue) =>
            setFormData((prev) => ({ ...prev, role: newValue }))
          }
        />

        </div>

        {/* Notify user checkbox */}
        <div className="w-4/5 mt-4">
          <div className="flex gap-3 p-3 text-white cursor-pointer transition hover:bg-opacity-30">
            <input
              type="checkbox"
              name="notifyUser"
              checked={formData.notifyUser}
              onChange={handleChange}
              className="accent-red-800 w-6 h-6 cursor-pointer"
            />
            <span className="text-lg">Уведомить пользователя по email</span>
          </div>
        </div>


        <button type="submit" 
          className="w-1/2 p-3 border-none text-lg bg-red-950 bg-opacity-30 backdrop-blur-sm rounded-lg hover:bg-opacity-70 hover:scale-105 transform transition-all duration-300 ease-in-out">
          Добавить пользователя
        </button>
      </form>
    </div>
  </>
    
  );
};

export default CreateUser;
