const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "", // image path or URL
    },
  },
  { timestamps: true }
);
const Student = mongoose.model("student", studentSchema);
module.exports = Student;
