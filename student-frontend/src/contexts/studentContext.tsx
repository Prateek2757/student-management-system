import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// ✅ Backend Student type
export interface Student {
  _id: string;
  name: string;
  email: string;
  age: number;
  course: string;
  courseStatus: "Active" | "Inactive";
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ Input type for creating student
export interface NewStudentInput {
  name: string;
  email: string;
  course: string;
  age: number;
  courseStatus: "Active" | "Inactive";
  profileImage?: string;
}

interface StudentContextType {
  students: Student[];
  loading: boolean;
  fetchStudents: (searchQuery?: string) => void;
  fetchStudentById: (id: string) => Promise<Student | null>;
  updateStudent: (id: string, data: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  addStudent: (data: NewStudentInput) => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentContext must be used within a StudentProvider");
  }
  return context;
};

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const getTokenOrThrow = () => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Unauthorized: No token found");
    return token;
  };

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch all or search students
  const fetchStudents = async (searchQuery?: string) => {
    setLoading(true);
    try {
      const token = getTokenOrThrow();
      const res = await axios.get(`${API_URL}/student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: searchQuery ? { search: searchQuery } : {},
      });
      setStudents(res.data.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentById = async (id: string): Promise<Student | null> => {
    try {
      const token = getTokenOrThrow();
      const res = await axios.get(`${API_URL}/student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      console.error("❌ Failed to fetch student by ID:", error);
      return null;
    }
  };

  const addStudent = async (data: NewStudentInput) => {
    try {
      const token = getTokenOrThrow();
      const res = await axios.post(`${API_URL}/student`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const newStudent: Student = res.data.data;
      setStudents((prev) => [newStudent, ...prev]);
    } catch (err) {
      console.error("❌ Failed to add student:", err);
      throw err;
    }
  };

  const updateStudent = async (id: string, data: Partial<Student>) => {
    try {
      const token = getTokenOrThrow();
      const res = await axios.put(
        `${API_URL}/student/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedStudent = res.data.data;
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === id ? updatedStudent : student
        )
      );
    } catch (error) {
      console.error("❌ Failed to update student:", error);
      throw error;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const token = getTokenOrThrow();
      await axios.delete(`${API_URL}/student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (error) {
      console.error("❌ Failed to delete student:", error);
    }
  };
  

  // Fetch all on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        fetchStudents,
        fetchStudentById,
        updateStudent,
        addStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};