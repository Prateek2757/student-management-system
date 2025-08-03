// Final StudentsPage with delete confirmation modal split into components

import { useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useStudentContext } from "@/contexts/studentContext";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

import { SearchBar } from "./SearchBar";
import { StudentList } from "./StudentList";
import { EditStudentModal } from "./EditStudentModel";
import { DeleteConfirmationDialog } from "./DeletrConformation";

type CourseStatus = "Active" | "Inactive";

interface Student {
  _id: string;
  name: string;
  email: string;
  age: number;
  course: string;
  courseStatus: CourseStatus;
  createdAt: string;
}

export default function StudentsPage() {
  const { students, deleteStudent, updateStudent } = useStudentContext();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("All Courses");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Status");
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form, setForm] = useState<Partial<Student>>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const courses = [
    "All Courses",
    ...Array.from(new Set(students.map((s) => s.course))),
  ];

  const statuses: ("All Status" | CourseStatus)[] = [
    "All Status",
    "Active",
    "Inactive",
  ];

  const filteredStudents = students.filter((student) => {
    const matchSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCourse =
      selectedCourse === "All Courses" || student.course === selectedCourse;
    const matchStatus =
      selectedStatus === "All Status" || student.courseStatus === selectedStatus;
    return matchSearch && matchCourse && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-100";
      case "Inactive":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const openEdit = (student: Student) => {
    setEditingStudent(student);
    setForm(student);
  };

  const handleUpdate = async () => {
    if (!editingStudent) return;

    if (
      !form.name?.trim() ||
      !form.email?.trim() ||
      !form.course?.trim() ||
      !form.courseStatus
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    await updateStudent(editingStudent._id, {
      name: form.name.trim(),
      email: form.email.trim(),
      age: form.age,
      course: form.course.trim(),
      courseStatus: form.courseStatus as CourseStatus,
    });
    toast.success("Student updated successfully");
    setEditingStudent(null);
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    await deleteStudent(confirmDeleteId);
    toast.success("Student deleted");
    setConfirmDeleteId(null);
  };

  return (
    <div className="space-y-6 px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-muted-foreground">
            Manage and view all student information
          </p>
        </div>
        {isAdmin && (
          <Link
            to="/add-student"
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={16} /> Add Student
          </Link>
        )}
      </div>

      <div className="bg-white p-4 shadow-sm rounded-md">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCourse={selectedCourse}
          onCourseChange={setSelectedCourse}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          courses={courses}
          statuses={statuses}
       
        />

        <StudentList
          students={filteredStudents}
          isAdmin={isAdmin}
          onEdit={openEdit}
          onDelete={(id) => setConfirmDeleteId(id)}
          getStatusColor={getStatusColor}
        />

        <EditStudentModal
          editingStudent={editingStudent}
          form={form}
          setForm={setForm}
          onClose={() => setEditingStudent(null)}
          onSubmit={handleUpdate}
          statuses={statuses}
        />

        <DeleteConfirmationDialog
          open={!!confirmDeleteId}
          onClose={() => setConfirmDeleteId(null)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}