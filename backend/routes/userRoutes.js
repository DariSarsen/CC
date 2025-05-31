const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware("admin"), userController.getAllUsers);
router.post("/newUser", authMiddleware("admin"), userController.createUser);
router.put("/:id", authMiddleware("admin"), userController.updateUser);
router.delete("/:id", authMiddleware("admin"), userController.deleteUser);

module.exports = router;
