const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware =require("../middleware/authMiddleware")

router.get("/profile",authMiddleware,userController.getLoginUser);

router.put("/update",authMiddleware,upload.single("image"),userController.updateUser);

module.exports =router; 