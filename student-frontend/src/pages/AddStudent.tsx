import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { UserPlus, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { useStudentContext } from "@/contexts/studentContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const courses = [
  "Computer Science", "Mathematics", "Physics", "Engineering", "Biology",
  "Chemistry", "Psychology", "Business Administration", "English Literature", "History",
];

const validStatuses = ["Active", "Inactive"] as const;
type CourseStatus = (typeof validStatuses)[number];

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  course: string;
  status: CourseStatus;
}

export default function AddStudent() {
  const navigate = useNavigate();
  const { addStudent } = useStudentContext();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    course: "",
    status: "Active",
  });

  const [errors, setErrors] = useState<Partial<StudentFormData>>({});

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value as CourseStatus }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (parseInt(formData.age) < 16 || parseInt(formData.age) > 100) {
      newErrors.age = "Age must be between 16 and 100";
    }
    if (!formData.course) newErrors.course = "Course selection is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const name = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

      await addStudent({
        name,
        email: formData.email.trim(),
        course: formData.course,
        age: parseInt(formData.age),
        courseStatus: formData.status,
      });

      toast.success("Student Added Successfully", {
        description: `${name} has been enrolled in ${formData.course}.`,
      });
      navigate("/students");
    } catch (error) {
      toast.warning("Failed to add student. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`space-y-6 relative ${!isAdmin && "pointer-events-none select-none blur-sm"}`}>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-muted">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Student</h1>
          <p className="text-muted-foreground">Fill in the student information to create a new enrollment</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" /> Student Information
            </CardTitle>
            <CardDescription>Enter the basic information for the new student</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className={errors.age ? "border-destructive" : ""}
                />
                {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
              </div>

              {/* Course */}
              <div className="space-y-2">
                <Label htmlFor="course">Course *</Label>
                <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
                  <SelectTrigger className={errors.course ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.course && <p className="text-sm text-destructive">{errors.course}</p>}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {validStatuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4  pt-6">
              <Button type="submit" className="text-white" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 text-white border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Adding Student...
                  </>
                ) : (
                  <>
                    <Save className="w-4  h-4 mr-2" /> Add Student
                  </>
                )}
              </Button>
              <Button type="button" className="text-black" variant="outline" onClick={() => navigate("/students")} disabled={isSubmitting}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {!isAdmin && (
        <Dialog open>
          <DialogContent className="text-center max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="text-red-600 text-lg">Access Denied</DialogTitle>
            </DialogHeader>
            <p className="mb-4 text-gray-600">Only admins can add students.</p>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}