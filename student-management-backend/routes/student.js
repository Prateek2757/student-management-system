const express = require("express");
const studentControllers = require("../controllers/studentControllers");
const { protect, admin } = require("../middleware/authMiddleware");
const { validateStudent } = require("../validators/studentValidator");


const router = express.Router();

router.post("/", protect, admin, validateStudent, studentControllers.createStudent);
router.get("/", studentControllers.getStudents);
router.get("/:id", protect, studentControllers.getStudentById);
router.put("/:id", protect, admin, validateStudent, studentControllers.updateStudent);
router.delete("/:id", protect, admin, studentControllers.deleteStudent);


module.exports = router;