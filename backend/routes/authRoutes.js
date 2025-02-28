const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/me", authMiddleware(), async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: ["id", "name", "email", "role"] });
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Необходимо заполнить все поля" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Неверный email или пароль." });
        }

        if (user.blockedUntil && user.blockedUntil > new Date()) {
            return res.status(401).json({ message: `Аккаунт заблокирован до ${user.blockedUntil}` });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            const loginAttempts = user.loginAttempts + 1;
            const maxLoginAttempts = 5;
            const lockoutTimeInMinutes = 5; 
            if (loginAttempts >= maxLoginAttempts) {
                const blockedUntil = new Date();
                blockedUntil.setMinutes(blockedUntil.getMinutes() + lockoutTimeInMinutes);

                await user.update({ loginAttempts: 0, blockedUntil });

                return res.status(401).json({ message: `Слишком много попыток входа. Аккаунт заблокирован до ${blockedUntil}` });
                
            } else {
                await user.update({ loginAttempts });
                return res.status(401).json({ message: "Неверный email или пароль" });
            }

        } 

        await user.update({ loginAttempts: 0, blockedUntil: null });

        //generate token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role}, message: "Успешный вход!" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
});

module.exports = router;
