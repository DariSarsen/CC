import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface User {
  id: string;
  name: string;
  role: "student" | "company" | "career_center" | "admin";
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Вы не авторизованы");
          return;
        }
        setUser(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null);
        
        console.log("user", localStorage.getItem("user"));
      } catch (error) {
        toast.error("Ошибка загрузки данных пользователя");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Личный кабинет</h1>
      {user && <p className="text-lg">Добро пожаловать, {user.name}!</p>}

      <nav className="mt-4">
        <ul className="space-y-2">
        {user?.role === "student" ? (
            <li>
            <Link to="/myResume" className="text-blue-500">Мое резюме</Link>
          </li>
          ) : null}
          
          {user?.role !== "company" ? (
            <li>
              <Link to="/vacancies" className="text-blue-500">Вакансии</Link>
            </li>
          ) : null}
          {user?.role === "admin" && (
            <li>
              <Link to="/admin" className="text-red-500">Админ-панель</Link>
            </li>
          )}
          <li>
            <Link to="/settings" className="text-blue-500">Настройки</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;




// import { useState, useEffect, ChangeEvent } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// interface Experience {
//     company: string;
//     position: string;
//     duration: string;
// }

// interface Skill {
//     name: string;
//     level: string;
// }

// interface Language {
//     name: string;
//     proficiency: string;
// }

// interface Resume {
//     experience: Experience[];
//     skills: Skill[];
//     languages: Language[];
//     additionalInfo: string;
// }

// const defaultResume: Resume = {
//     experience: [],
//     skills: [],
//     languages: [],
//     additionalInfo: "",
// };

// const ResumePage = () => {
//     const [resume, setResume] = useState<Resume>(defaultResume);
//     const [formData, setFormData] = useState<Resume>(defaultResume);
//     const [isEditing, setIsEditing] = useState(false);

//     useEffect(() => {
//         const fetchResume = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     toast.error("Вы не авторизованы");
//                     return;
//                 }

//                 const res = await axios.get(`http://localhost:3000/resumes/me`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 const userResume = res.data ?? defaultResume;
//                 setResume(userResume);
//                 setFormData(userResume);
//             } catch (error) {
//                 toast.error("Ошибка загрузки резюме");
//                 console.error("Ошибка загрузки резюме:", error);
//             }
//         };
//         fetchResume();
//     }, []);

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Resume, index?: number) => {
//         setFormData((prev) => {
//             if (!prev) return prev;
//             if (Array.isArray(prev[field])) {
//                 return {
//                     ...prev,
//                     [field]: (prev[field] as any[]).map((item, i) =>
//                         i === index ? { ...item, [e.target.name]: e.target.value } : item
//                     ),
//                 };
//             } else {
//                 return {
//                     ...prev,
//                     [field]: e.target.value,
//                 };
//             }
//         });
//     };

//     const addExperience = () => {
//         setFormData((prev) => ({
//             ...prev,
//             experience: [...prev.experience, { company: "", position: "", duration: "" }],
//         }));
//     };

//     const addSkill = () => {
//         setFormData((prev) => ({
//             ...prev,
//             skills: [...prev.skills, { name: "", level: "" }],
//         }));
//     };

//     const addLanguage = () => {
//         setFormData((prev) => ({
//             ...prev,
//             languages: [...prev.languages, { name: "", proficiency: "" }],
//         }));
//     };

//     const saveResume = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 toast.error("Вы не авторизованы");
//                 return;
//             }

//             await axios.put("http://localhost:3000/resumes/", formData, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             toast.success("Резюме обновлено");
//             setResume(formData);
//             setIsEditing(false);
//         } catch (error) {
//             toast.error("Ошибка при обновлении резюме");
//             console.error("Ошибка сохранения резюме:", error);
//         }
//     };

//     const removeExperience = (index: number) => {
//         setFormData((prev) => ({
//             ...prev,
//             experience: prev.experience.filter((_, i) => i !== index),
//         }));
//     };
    
//     const removeSkill = (index: number) => {
//         setFormData((prev) => ({
//             ...prev,
//             skills: prev.skills.filter((_, i) => i !== index),
//         }));
//     };
    
//     const removeLanguage = (index: number) => {
//         setFormData((prev) => ({
//             ...prev,
//             languages: prev.languages.filter((_, i) => i !== index),
//         }));
//     };
    

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-xl font-bold mb-4">Личный кабинет</h1>
//             <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={() => setIsEditing(!isEditing)}>
//                 {isEditing ? "Просмотр" : "Редактировать"}
//             </button>

//             {isEditing ? (
//                 <div>
//                     <h2 className="text-lg font-semibold">Опыт работы</h2>
//                     {formData.experience.map((exp, index) => (
//                         <div key={index} className="border p-2 mb-2 flex items-center">
//                             <div className="flex-grow">
//                                 <input type="text" name="company" value={exp.company} onChange={(e) => handleChange(e, "experience", index)} placeholder="Компания" className="border p-2 w-full mb-1" />
//                                 <input type="text" name="position" value={exp.position} onChange={(e) => handleChange(e, "experience", index)} placeholder="Должность" className="border p-2 w-full mb-1" />
//                                 <input type="text" name="duration" value={exp.duration} onChange={(e) => handleChange(e, "experience", index)} placeholder="Длительность" className="border p-2 w-full mb-1" />
//                             </div>
//                             <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => removeExperience(index)}>Удалить</button>
//                         </div>
//                     ))}
//                     <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={addExperience}>Добавить опыт</button>

//                     <h2 className="text-lg font-semibold mt-4">Навыки</h2>
//                     {formData.skills.map((skill, index) => (
//                         <div key={index} className="border p-2 mb-2 flex items-center">
//                             <div className="flex-grow">
//                                 <input type="text" name="name" value={skill.name} onChange={(e) => handleChange(e, "skills", index)} placeholder="Название навыка" className="border p-2 w-full mb-1" />
//                                 <input type="text" name="level" value={skill.level} onChange={(e) => handleChange(e, "skills", index)} placeholder="Уровень" className="border p-2 w-full mb-1" />
//                             </div>
//                             <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => removeSkill(index)}>Удалить</button>
//                         </div>
//                     ))}
//                     <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={addSkill}>Добавить навык</button>

//                     <h2 className="text-lg font-semibold mt-4">Языки</h2>
//                     {formData.languages.map((lang, index) => (
//                         <div key={index} className="border p-2 mb-2 flex items-center">
//                             <div className="flex-grow">
//                                 <input type="text" name="name" value={lang.name} onChange={(e) => handleChange(e, "languages", index)} placeholder="Язык" className="border p-2 w-full mb-1" />
//                                 <input type="text" name="proficiency" value={lang.proficiency} onChange={(e) => handleChange(e, "languages", index)} placeholder="Уровень владения" className="border p-2 w-full mb-1" />
//                             </div>
//                             <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => removeLanguage(index)}>Удалить</button>
//                         </div>
//                     ))}
//                     <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={addLanguage}>Добавить язык</button>

//                     <h2 className="text-lg font-semibold mt-4">Дополнительная информация</h2>
//                     <textarea name="additionalInfo" value={formData.additionalInfo} onChange={(e) => handleChange(e, "additionalInfo")} className="border p-2 w-full mb-2" />

//                     <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveResume}>Сохранить</button>
//                 </div>
//             ) : (
//                 <pre>{JSON.stringify(resume, null, 2)}</pre>
//             )}
//         </div>
//     );
// };

// export default ResumePage;
