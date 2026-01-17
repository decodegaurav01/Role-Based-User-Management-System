const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware")

router.get("/users", authMiddleware, adminController.getAllUsers);


router.delete("/user/:id", authMiddleware, adminController.deleteUser);

router.get("/user/:id", authMiddleware,adminController.getUserById)

router.put("/user/:id",authMiddleware,upload.single("image"),adminController.updateUser);


module.exports = router;
 