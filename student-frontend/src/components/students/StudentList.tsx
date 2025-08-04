import { Edit, Trash2, Users } from "lucide-react";
import { useState } from "react";

type CourseStatus = "Active" | "Inactive";

interface Student {
  _id: string;
  name: string;
  email: string;
  course: string;
  courseStatus: CourseStatus;
  createdAt: string;
  age: number;
}

interface StudentListProps {
  students: Student[];
  isAdmin: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  getStatusColor: (status: string) => string;
}

export function StudentList({
  students,
  isAdmin,
  onEdit,
  onDelete,
  getStatusColor,
}: StudentListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = students.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (students.length === 0)
    return (
      <div className="text-center py-12">
        <Users className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-lg font-semibold mb-1">No students found</h3>
        <p className="text-sm text-gray-500">
          Try adjusting filters or add a new student.
        </p>
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-4 py-2">Student</th>
            <th className="text-left px-4 py-2">Course</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-left px-4 py-2">Age</th>
            <th className="text-left px-4 py-2">Enrolled</th>
            {isAdmin && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student._id} className="border-b">
              <td className="px-4 py-2">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-500">
                      {student.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">{student.course}</td>
              <td className="px-4 py-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                    student.courseStatus
                  )}`}
                >
                  {student.courseStatus}
                </span>
              </td>
              <td className="px-4 py-2">{student.age}</td>
              <td className="px-4 py-2 text-sm">
                {new Date(student.createdAt).toLocaleDateString()}
              </td>
              {isAdmin && (
                <td className="px-4 py-2 text-right space-x-3 min-w-[110px]">
                  <button
                    onClick={() => onEdit(student)}
                    className="inline-flex items-center justify-center p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                    aria-label={`Edit ${student.name}`}
                    title="Edit"
                  >
                    <Edit size={18} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => onDelete(student._id)}
                    className="inline-flex items-center justify-center p-2 rounded-md border border-red-300 hover:bg-red-100 transition"
                    aria-label={`Delete ${student.name}`}
                    title="Delete"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-4">
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
        <div className="space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}