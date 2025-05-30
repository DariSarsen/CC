import { useState } from "react";
import { Link } from "react-router-dom";
import { useResumes } from "../../../hooks/resume/useResumes";
import LoadingScreen from "../../../components/LoadingScreen";

import {
  FaUser,
  FaBriefcase,
  FaTools,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const ResumeListPage = () => {
  const { resumes, loading } = useResumes();
  const [search, setSearch] = useState("");

  const filteredResumes = resumes.filter((resume) => {
    const fullName = resume.User?.name?.toLowerCase() || "";
    const skills = resume.skills?.map((s) => s.name.toLowerCase()).join(" ") || "";
    return (
      fullName.includes(search.toLowerCase()) ||
      skills.includes(search.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-6 text-white mb-36">
      <div className="mb-8">
        <h1 className="text-4xl font-bold capitalize">Резюме студентов</h1>
        <p className="text-lg text-white">Просмотр, поиск и отбор кандидатов</p>
      </div>

      <div className="flex items-center gap-3 mb-8 bg-red-900/80 p-4 rounded-xl">
        <IoIosSearch className="text-white text-xl" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по имени или навыкам..."
          className="w-full bg-transparent focus:outline-none text-white placeholder-red-200 text-lg"
        />
      </div>

      {loading ? (
        <LoadingScreen />
      ) : filteredResumes.length === 0 ? (
        <p className="text-center text-white">Резюме не найдены</p>
      ) : (
        <ul className="space-y-6">
          {filteredResumes.map((resume) => (
            <li
              key={resume.id}
              className="p-6 rounded-2xl bg-red-950/70 backdrop-blur-lg shadow-2xl"
            >
              <Link
                to={`/resumes/${resume.id}`}
                className="text-2xl font-semibold text-white hover:underline flex items-center gap-2 mb-1"
              >
                <FaUser className="text-white" /> {resume.User?.name ?? "Без имени"}
              </Link>

              <p className="text-base text-white mb-3">{resume.User?.email ?? "Без email"}</p>

              {resume.experience?.length > 0 && (
                <div className="mb-3">
                  <h3 className="flex items-center gap-2 text-white font-semibold text-lg mb-1">
                    <FaBriefcase /> Опыт
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.experience.map((exp, idx) => (
                      <span
                        key={idx}
                        className="bg-red-300/20 text-white text-sm px-3 py-1 rounded-full border border-black/30"
                      >
                        {exp.position} в {exp.company} ({exp.duration})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {resume.skills?.length > 0 && (
                <div className="mb-3">
                  <h3 className="flex items-center gap-2 text-white font-semibold text-lg mb-1">
                    <FaTools /> Навыки
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-red-300/20 border border-black/30 text-sm px-3 py-1 rounded-full text-white"
                      >
                        {s.name} ({s.level})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {resume.languages?.length > 0 && (
                <div className="mb-3">
                  <h3 className="flex items-center gap-2 text-white font-semibold text-lg mb-1">
                    <FaGlobe /> Языки
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.languages.map((l, idx) => (
                      <span
                        key={idx}
                        className="bg-red-300/20 border border-black/30 text-sm px-3 py-1 rounded-full text-white"
                      >
                        {l.name} ({l.proficiency})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {resume.additionalInfo && (
                <div>
                  <h3 className="flex items-center gap-2 text-white font-semibold text-lg mb-1">
                    <FaInfoCircle /> Дополнительно
                  </h3>
                  <p className="text-white text-base line-clamp-3">{resume.additionalInfo}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeListPage;
