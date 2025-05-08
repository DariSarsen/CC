import { useParams } from "react-router-dom";
import { useResumeById } from "../hooks/useResumeById";

const ResumeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { resume, loading } = useResumeById(id!);

  if (loading) return <p className="p-6">Загрузка...</p>;
  if (!resume) return <p className="p-6 text-red-600">Резюме не найдено.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">
        Резюме пользователя: {resume.User?.name ?? "Нет имени"}
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Навыки</h2>
        {Array.isArray(resume.skills) && resume.skills.length > 0 ? (
          <ul className="list-disc list-inside">
            {resume.skills.map((s, i) => (
              <li key={i}>
                {s?.name ?? ""} — {s?.level ?? ""}
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет данных</p>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Опыт работы</h2>
        {Array.isArray(resume.experience) && resume.experience.length > 0 ? (
          <ul className="list-disc list-inside">
            {resume.experience.map((e, i) => (
              <li key={i}>
                {e?.position ?? ""} в{" "}
                {e?.company ?? ""} (
                {e?.duration ?? ""})
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет опыта</p>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Языки</h2>
        {Array.isArray(resume.languages) && resume.languages.length > 0 ? (
          <ul className="list-disc list-inside">
            {resume.languages.map((l, i) => (
              <li key={i}>
                {l?.name ?? ""} — {l?.proficiency ?? ""}
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет данных</p>
        )}
      </section>

      {resume.additionalInfo && (
        <section>
          <h2 className="text-xl font-semibold mb-2">
            Дополнительная информация
          </h2>
          <p>{resume.additionalInfo ?? "Нет информации"}</p>
        </section>
      )}
    </div>
  );
};

export default ResumeDetailsPage;
