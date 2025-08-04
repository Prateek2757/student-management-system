const Student = require("../modal/Student");
const mongoose = require("mongoose");

// 🔧 Utility: Send error response
const sendError = (res, status, message) => {
  return res.status(status).json({ success: false, error: message });
};

// ✅ Create student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, course, courseStatus, age } = req.body;

    if (!name || !email || !course || !courseStatus || !age) {
      return sendError(res, 400, "All fields are required.");
    }

    const studentData = {
      name,
      email,
      course,
      courseStatus,
      age,
      profilePicture: req.file ? req.file.filename : null,
    };

    const newStudent = await Student.create(studentData);
    return res.status(201).json({
      success: true,
      message: "Student created successfully.",
      data: newStudent,
    });
  } catch (err) {
    console.error("❌ Error creating student:", err);
    return sendError(res, 500, "Internal server error.");
  }
};

// ✅ Get all students (with optional search)
exports.getStudents = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};
    if (search) {
      const regex = new RegExp(search, "i");
      query = {
        $or: [
          { name: regex },
          { email: regex },
          { course: regex },
          { courseStatus: regex },
        ],
      };
    }

    const students = await Student.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: students });
  } catch (err) {
    console.error("❌ Error fetching students:", err);
    return sendError(res, 500, "Failed to retrieve students.");
  }
};

// ✅ Get single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid student ID.");
    }

    const student = await Student.findById(id);
    if (!student) return sendError(res, 404, "Student not found.");

    return res.status(200).json({ success: true, data: student });
  } catch (err) {
    console.error("❌ Error fetching student by ID:", err);
    return sendError(res, 500, "Internal server error.");
  }
};

// ✅ Update student by ID
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid student ID.");
    }

    const updateData = req.body;
    if (req.file) {
      updateData.profilePicture = req.file.filename;
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedStudent) {
      return sendError(res, 404, "Student not found.");
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      data: updatedStudent,
    });
  } catch (err) {
    console.error("❌ Error updating student:", err);
    return sendError(res, 500, "Internal server error.");
  }
};

// ✅ Delete student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, 400, "Invalid student ID.");
    }

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return sendError(res, 404, "Student not found.");
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
      data: deletedStudent,
    });
  } catch (err) {
    console.error("❌ Error deleting student:", err);
    return sendError(res, 500, "Internal server error.");
  }
};

