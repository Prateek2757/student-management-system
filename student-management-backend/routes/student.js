const express = require("express");
const studentControllers = require("../controllers/studentControllers");
const authMiddleware= require("../middleware/authMiddleware")
const {validateStudent} = require("../validators/studentValidator")
const router = express.Router();

router.post("/",authMiddleware,validateStudent,studentControllers.createStudent)
router.get("/",authMiddleware,studentControllers.getStudents)
router.get("/:id",authMiddleware,studentControllers.getStudentById)
router.put("/:id",authMiddleware,validateStudent,studentControllers.updateStudent)
router.delete("/:id",authMiddleware,studentControllers.deleteStudent)

module.exports=router;
