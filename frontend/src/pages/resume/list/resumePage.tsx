import { useResume } from "../../../hooks/resume/useResume";
import LoadingScreen from "../../../components/LoadingScreen";

const ResumePage = () => {
    const { resume, formData, isEditing, setIsEditing, handleChange, addItem, removeItem, saveResume, loading } = useResume();

    if (loading) {
        <LoadingScreen />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Личный кабинет</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Просмотр" : "Редактировать"}
            </button>

            {isEditing ? (
                <div>
                    <h2 className="text-lg font-semibold">Опыт работы</h2>
                    {formData?.experience.map((exp, index) => (
                        <div key={index} className="border p-2 mb-2">
                            <input type="text" name="company" value={exp.company} onChange={(e) => handleChange(e, "experience", index)} placeholder="Компания" />
                            <input type="text" name="position" value={exp.position} onChange={(e) => handleChange(e, "experience", index)} placeholder="Должность" />
                            <input type="text" name="duration" value={exp.duration} onChange={(e) => handleChange(e, "experience", index)} placeholder="Длительность" />
                            <button onClick={() => removeItem("experience", index)}>Удалить</button>
                        </div>
                    ))}
                    <button onClick={() => addItem("experience", { company: "", position: "", duration: "" })}>Добавить опыт</button>

                    <h2 className="text-lg font-semibold">Навыки</h2>
                    {formData?.skills.map((skill, index) => (
                        <div key={index} className="border p-2 mb-2">
                            <input type="text" name="name" value={skill.name} onChange={(e) => handleChange(e, "skills", index)} placeholder="Название" />
                            <input type="text" name="level" value={skill.level} onChange={(e) => handleChange(e, "skills", index)} placeholder="Уровень" />
                            <button onClick={() => removeItem("skills", index)}>Удалить</button>
                        </div>
                    ))}
                    <button onClick={() => addItem("skills", { name: "", level: "" })}>Добавить навык</button>

                    <h2 className="text-lg font-semibold">Языки</h2>
                    {formData?.languages.map((lang, index) => (
                        <div key={index} className="border p-2 mb-2">
                            <input type="text" name="name" value={lang.name} onChange={(e) => handleChange(e, "languages", index)} placeholder="Язык" />
                            <input type="text" name="proficiency" value={lang.proficiency} onChange={(e) => handleChange(e, "languages", index)} placeholder="Уровень" />
                            <button onClick={() => removeItem("languages", index)}>Удалить</button>
                        </div>
                    ))}
                    <button onClick={() => addItem("languages", { name: "", proficiency: "" })}>Добавить язык</button>

                    <h2 className="text-lg font-semibold">Дополнительная информация</h2>
                    <textarea name="additionalInfo" value={formData?.additionalInfo} onChange={(e) => handleChange(e, "additionalInfo")} />

                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveResume}>Сохранить</button>
                </div>
            ) : (
                <div>
                    <h2 className="text-lg font-semibold">Опыт работы</h2>
                    {resume?.experience?.length ? (
                        resume.experience.map((exp, index) => (
                            <div key={index} className="border p-2 mb-2">
                                <p><strong>Компания:</strong> {exp.company}</p>
                                <p><strong>Должность:</strong> {exp.position}</p>
                                <p><strong>Длительность:</strong> {exp.duration}</p>
                            </div>
                        ))
                    ) : (
                        <p>Нет данных</p>
                    )}

                    <h2 className="text-lg font-semibold mt-4">Навыки</h2>
                    {resume?.skills?.length ? (
                        resume.skills.map((skill, index) => (
                            <p key={index}><strong>{skill.name}</strong>: {skill.level}</p>
                        ))
                    ) : (
                        <p>Нет данных</p>
                    )}

                    <h2 className="text-lg font-semibold mt-4">Языки</h2>
                    {resume?.languages?.length ? (
                        resume.languages.map((lang, index) => (
                            <p key={index}><strong>{lang.name}</strong>: {lang.proficiency}</p>
                        ))
                    ) : (
                        <p>Нет данных</p>
                    )}

                    <h2 className="text-lg font-semibold mt-4">Дополнительная информация</h2>
                    <p>{resume?.additionalInfo?.trim() ? resume.additionalInfo : "Нет данных"}</p>
                </div>
            )}
        </div>
    );
};

export default ResumePage;
