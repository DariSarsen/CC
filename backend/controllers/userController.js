const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { sendEmail } = require("../utils/email");

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role, notifyUser } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Необходимо заполнить все поля" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Пользователь уже существует" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        if (notifyUser) {
            console.log("Отправка email пользователю:", email);
            console.log("Пароль пользователя:", password);
            try {
                await sendEmail({
                    to: email,
                    subject: "Ваш аккаунт создан администратором LegacyLink!",
                    text: `Здравствуйте!\nРады сообщить вам, что администратор LegacyLink успешно создал ваш аккаунт.\nВаши данные для входа в систему:\n🔹 Логин: ${email}\n🔹 Пароль: ${password}\nПожалуйста, сохраните эти данные в надежном месте. Если у вас возникнут вопросы, не стесняйтесь обращаться к нам.\nС уважением, команда LegacyLink.`,
                });
            } catch (emailError) {
                console.error("Ошибка при отправке email:", emailError);
                return res.status(500).json({ message: "Ошибка при отправке email" });
            }
        }

        res.status(201).json({ message: "Пользователь создан", user: newUser });
    } catch (error) {
        console.error("Ошибка при создании пользователя:", error.message);
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
};
