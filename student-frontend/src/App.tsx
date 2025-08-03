import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import { StudentProvider } from "./contexts/studentContext";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import StudentsPage from "./components/students/Students";
import AddStudent from "./pages/AddStudent";
import ProtectedRoute from "./components/auth/Protectedauth";

function App() {
  return (
    <>
    <Toaster richColors position="top-right" />
    <BrowserRouter>
    <AuthProvider>

      <StudentProvider>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />

            <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
            <Route path="/students" element={<StudentsPage/>} />
            <Route path="/add-student" element={<AddStudent/>} />

            {/* This gets injected into <Outlet /> inside AppLayout */}
            <Route index element={<Dashboard />} />
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </StudentProvider>
    </AuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
