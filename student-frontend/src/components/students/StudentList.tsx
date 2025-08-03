import { Edit, Trash2, Users } from "lucide-react";

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
          {students.map((student) => (
            <tr key={student._id} className="border-b">
              <td className="px-4 py-2">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
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
    </div>
  );
}
