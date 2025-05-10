import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResumes } from "../../../hooks/resume/useResumes";
import { ResumeWithUser } from "../../../types/resume";

const ResumeListPage = () => {
  const { resumes, loading } = useResumes();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<ResumeWithUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = search.toLowerCase();
    
    setFiltered(
    
        
      resumes.filter((r) =>
        
        (r.User?.name?.toLowerCase().includes(q) ?? false) ||
        (r.skills?.some((s) => s?.name?.toLowerCase().includes(q)) ?? false) ||
        (r.languages?.some((l) => l?.name?.toLowerCase().includes(q)) ?? false)
      )
    );
  }, [search, resumes]);
  

  if (loading) return <p className="p-6">Загрузка...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Все резюме</h1>
      <input
        type="text"
        placeholder="Поиск по имени, навыкам или языкам..."
        className="border px-3 py-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.map((r) => (
        <div key={r.id} className="border p-4 rounded shadow mb-4 bg-white">
            <h2 className="text-xl font-semibold">{r.User?.name ?? "Без имени"}</h2>
        
            <p>
            <strong>Навыки:</strong>{" "}
            {Array.isArray(r.skills) && r.skills.length > 0
                
                ? r.skills.map((s) => s?.name ?? "Без названия").join(", ")
                : "Нет"}
            </p>

            <p>
            <strong>Языки:</strong>{" "}
            {Array.isArray(r.languages) && r.languages.length > 0
                ? r.languages.map((l) => l?.name ?? "Без названия").join(", ")
                : "Нет"}
            </p>

            <button
            className="mt-2 text-blue-600 hover:underline"
            onClick={() => navigate(`/resumes/${r.id}`)}
            >
            Подробнее
            </button>
        </div>
        ))}

    </div>
  );
};

export default ResumeListPage;
