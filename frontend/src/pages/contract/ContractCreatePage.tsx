import { useContractForm } from "../../hooks/contract/useContractForm";

const ContractCreatePage = () => {
  const {
    form,
    companies,
    loading,
    handleChange,
    handleSubmit,
    selectedCompanyId,
    setSelectedCompanyId,
  } = useContractForm();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Создание договора</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Выберите компанию:</label>
        <select
          value={selectedCompanyId || ""}
          onChange={(e) => setSelectedCompanyId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Выберите --</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.companyName}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key.replace(/_/g, " ")}
            value={value as string}
            onChange={handleChange}
            disabled={key.startsWith("company_") || key.includes("BIN") || key.includes("com_phone") || key.includes("Com_director")}
            className="w-full border p-2 rounded bg-gray-100"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Создание..." : "Создать договор"}
      </button>
    </div>
  );
};

export default ContractCreatePage;
