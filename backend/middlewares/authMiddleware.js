const jwt = require("jsonwebtoken");

module.exports = (requiredRole = null) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Нет доступа" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ message: "Доступ запрещен" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Токен недействителен или истёк" });
        }
    };
};
