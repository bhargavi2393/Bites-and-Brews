const express = require("express");
const router = express.Router();
const protect =  require("../middleware/authMiddleware");
const {registerUser, loginUser, updateUser, deleteUser,getAllUsers} =  require("../controllers/authController.js");

router.get("/get",getAllUsers)
router.post("/signup", registerUser)
router.post("/signin",loginUser)
router.put("/update",protect, updateUser)
router.delete("/delete",protect, deleteUser)

module.exports = router;
