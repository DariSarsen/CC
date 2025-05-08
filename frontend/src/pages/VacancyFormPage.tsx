import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createVacancy, getVacancyById, updateVacancy } from "../services/vacancyService";

const VacancyFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: ""
  });

  useEffect(() => {
    if (isEdit && id) {
      getVacancyById(id).then((v) =>
        setForm({
          title: v.title,
          description: v.description || "",
          requirements: (v.requirements || []).join(", "),
          location: v.location || "",
          salary: v.salary || ""
        })
      );
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      requirements: form.requirements.split(",").map((r) => r.trim())
    };

    if (isEdit && id) {
      await updateVacancy(id, payload);
    } else {
      await createVacancy(payload);
    }

    navigate("/vacancies");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? "Редактировать вакансию" : "Создать вакансию"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Название" className="input" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Описание" className="input" />
        <input name="requirements" value={form.requirements} onChange={handleChange} placeholder="Требования (через запятую)" className="input" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Локация" className="input" />
        <input name="salary" value={form.salary} onChange={handleChange} placeholder="Зарплата" className="input" />
        <button type="submit" className="btn btn-primary">{isEdit ? "Сохранить" : "Создать"}</button>
      </form>
    </div>
  );
};

export default VacancyFormPage;
