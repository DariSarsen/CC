const Resume = require("../models/students/resume");
const User = require("../models/users");


exports.createResume = async (req, res) => {
    try {
        const { experience, skills, languages, additionalInfo } = req.body;
        const userId = req.user.id; 

        const existingResume = await Resume.findOne({ where: { userId } });
        if (existingResume) {
            return res.status(400).json({ message: "Резюме уже существует" });
        }

        const resume = await Resume.create({ userId, experience, skills, languages, additionalInfo });
        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};


exports.getResume = async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await Resume.findByPk(id, { include: User });

        if (!resume) {
            return res.status(404).json({ message: "Резюме не найдено" });
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};


exports.getResumes = async (req, res) => {
    try {
        const resumes = await Resume.findAll({ include: User });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
}


exports.updateResume = async (req, res) => {
    try {
        const { id } = req.params;
        const { experience, skills, languages, additionalInfo } = req.body;
        const userId = req.user.id; // ID пользователя из токена

        const resume = await Resume.findOne({ where: { id, userId } });

        if (!resume) {
            return res.status(404).json({ message: "Резюме не найдено или у вас нет доступа" });
        }

        await resume.update({ experience, skills, languages, additionalInfo });
        res.json({ message: "Резюме обновлено", resume });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};


exports.deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const resume = await Resume.findOne({ where: { id, userId } });

        if (!resume) {
            return res.status(404).json({ message: "Резюме не найдено или у вас нет доступа" });
        }

        await resume.destroy();
        res.json({ message: "Резюме удалено" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};
