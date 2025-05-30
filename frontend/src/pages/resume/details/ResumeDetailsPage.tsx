import { useParams } from "react-router-dom";
import { useResumeDetails } from "../../../hooks/resume/useResumeDetails";
import LoadingScreen from "../../../components/LoadingScreen";

import {
  FaUser,
  FaTools,
  FaBriefcase,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";

const ResumeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { resume, loading } = useResumeDetails(id!);

  if (loading) return <LoadingScreen />;
  if (!resume)
    return <p className="p-6 text-red-600 text-lg">Резюме не найдено.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-red-900/80 backdrop-blur-sm text-white rounded-2xl shadow-2xl mt-10 mb-32">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        <FaUser className="text-white" />
        {resume.User?.name ?? "Нет имени"}
      </h1>

      <p className="text-white text-lg mb-6">{resume.User?.email ?? "Нет email"}</p>

      {/* Навыки */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-white font-semibold text-2xl mb-3">
          <FaTools /> Навыки
        </h2>
        {resume.skills?.length ? (
          <div className="flex flex-wrap gap-3">
            {resume.skills.map((s, i) => (
              <span
                key={i}
                className="bg-red-800 px-4 py-1 text-sm rounded-full border border-black/20"
              >
                {s.name} ({s.level})
              </span>
            ))}
          </div>
        ) : (
          <p className="text-white">Нет данных</p>
        )}
      </section>

      {/* Опыт */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-white font-semibold text-2xl mb-3">
          <FaBriefcase /> Опыт работы
        </h2>
        {resume.experience?.length ? (
          <div className="flex flex-col gap-3">
            {resume.experience.map((e, i) => (
              <div
                key={i}
                className="bg-red-800 border border-black/20 rounded-lg p-3"
              >
                <p className="text-base">
                  <strong>{e.position}</strong> в {e.company}
                </p>
                <p className="text-sm text-white">{e.duration}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">Нет опыта</p>
        )}
      </section>

      {/* Языки */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-white font-semibold text-2xl mb-3">
          <FaGlobe /> Языки
        </h2>
        {resume.languages?.length ? (
          <div className="flex flex-wrap gap-3">
            {resume.languages.map((l, i) => (
              <span
                key={i}
                className="bg-red-800 px-4 py-1 text-sm rounded-full border border-black/20"
              >
                {l.name} ({l.proficiency})
              </span>
            ))}
          </div>
        ) : (
          <p className="text-white">Нет данных</p>
        )}
      </section>

      {/* Дополнительно */}
      {resume.additionalInfo && (
        <section>
          <h2 className="flex items-center gap-2 text-white font-semibold text-2xl mb-3">
            <FaInfoCircle /> Дополнительная информация
          </h2>
          <p className="text-white text-base leading-relaxed">
            {resume.additionalInfo}
          </p>
        </section>
      )}
    </div>
  );
};

export default ResumeDetailsPage;
