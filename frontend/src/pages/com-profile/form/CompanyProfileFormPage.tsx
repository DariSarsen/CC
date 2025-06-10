import { useCompanyProfile } from "../../../hooks/com-profile/useCompanyProfile";
import LoadingScreen from "../../../components/LoadingScreen";

const CompanyProfileFormPage = () => {
  const { form, handleChange, handleSubmit, isLoading, isEdit } = useCompanyProfile();

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        {isEdit ? "Редактировать профиль компании" : "Создать профиль компании"}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="companyName"
            value={form.companyName || ""}
            onChange={handleChange}
            placeholder="Название компании"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Адрес"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            placeholder="Телефон"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="directorFullName"
            value={form.directorFullName || ""}
            onChange={handleChange}
            placeholder="ФИО директора"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="canProvideInternship"
            checked={form.canProvideInternship || false}
            onChange={handleChange}
            className="h-5 w-5 text-blue-500"
          />
          <span className="text-gray-700">Может предоставлять практику</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="BIN"
            value={form.BIN || ""}
            onChange={handleChange}
            placeholder="БИН"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="BIK"
            value={form.BIK || ""}
            onChange={handleChange}
            placeholder="БИК"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="KBE"
            value={form.KBE || ""}
            onChange={handleChange}
            placeholder="КБЕ"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="BANK"
            value={form.BANK || ""}
            onChange={handleChange}
            placeholder="Банк"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="representedBy"
            value={form.representedBy || ""}
            onChange={handleChange}
            placeholder="Представляется кем"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="basis"
            value={form.basis || ""}
            onChange={handleChange}
            placeholder="На основании чего"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default CompanyProfileFormPage;