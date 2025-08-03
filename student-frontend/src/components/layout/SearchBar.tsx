// src/components/SearchBar.tsx
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useStudentContext } from "@/contexts/studentContext";
import { debounce } from "lodash";

export  const SearchBarNavigation = () => {
  const { fetchStudents } = useStudentContext();
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = debounce((value: string) => {
    fetchStudents(value.trim());
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative hidden md:block">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search students..."
        className="pl-10 w-64"
      />
    </div>
  );
};