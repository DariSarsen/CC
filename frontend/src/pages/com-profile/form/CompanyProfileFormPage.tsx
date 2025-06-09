import { useCompanyProfile } from "../../../hooks/com-profile/useCompanyProfile";

const CompanyProfileFormPage = () => {
  const { form, handleChange, handleSubmit, isLoading, isEdit } = useCompanyProfile();

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>{isEdit ? "Редактировать профиль компании" : "Создать профиль компании"}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          name="companyName"
          value={form.companyName || ""}
          onChange={handleChange}
          placeholder="Название компании"
          required
        />

        <input
          name="address"
          value={form.address || ""}
          onChange={handleChange}
          placeholder="Адрес"
        />

        <input
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
          placeholder="Телефон"
        />

        <input
          name="directorFullName"
          value={form.directorFullName || ""}
          onChange={handleChange}
          placeholder="ФИО директора"
        />

        <label>
          <input
            type="checkbox"
            name="canProvideInternship"
            checked={form.canProvideInternship || false}
            onChange={handleChange}
          />
          Может предоставлять практику
        </label>

        <input
          name="BIN"
          value={form.BIN || ""}
          onChange={handleChange}
          placeholder="БИН"
        />
        <input
          name="BIK"
          value={form.BIK || ""}
          onChange={handleChange}
          placeholder="БИК"
        />
        <input
          name="KBE"
          value={form.KBE || ""}
          onChange={handleChange}
          placeholder="КБЕ"
        />
        <input
          name="BANK"
          value={form.BANK || ""}
          onChange={handleChange}
          placeholder="Банк"
        />
        <input
          name="representedBy"
          value={form.representedBy || ""}
          onChange={handleChange}
          placeholder="Представляется кем"
        />
        <input
          name="basis"
          value={form.basis || ""}
          onChange={handleChange}
          placeholder="На основании чего"
        />

        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default CompanyProfileFormPage;
