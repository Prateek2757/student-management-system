import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCourse: string;
  onCourseChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  courses: string[];
  statuses: string[];
  onExportClick?: () => void;
}

export function SearchBar({
  searchTerm,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  selectedStatus,
  onStatusChange,
  courses,
  statuses,

}: SearchBarProps) {
  return (
    <div className="flex flex-wrap   gap-4 mb-4">
      <div className="relative w-full  md:w-1/3">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by name, email or course"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md"
        />
      </div>

      <select
        value={selectedCourse}
        onChange={(e) => onCourseChange(e.target.value)}
        className="px-4  py-2 border rounded-md"
      >
        {courses.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-4 py-2 border rounded-md"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}