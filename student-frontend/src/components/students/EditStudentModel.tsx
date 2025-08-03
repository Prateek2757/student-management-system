import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type CourseStatus = "Active" | "Inactive";

interface Student {
  _id: string;
  name: string;
  email: string;
  age:number;
  course: string;
  courseStatus: CourseStatus;
  createdAt?: string;
}

interface EditStudentModalProps {
  editingStudent: Student | null;
  form: Partial<Student>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Student>>>;
  onClose: () => void;
  onSubmit: () => void;
  statuses: ("All Status" | CourseStatus)[];
}

export function EditStudentModal({
  editingStudent,
  form,
  setForm,
  onClose,
  onSubmit,
  statuses,
}: EditStudentModalProps) {
  if (!editingStudent) return null;

  const handleInputChange = (
    key: keyof Student,
    value: string | CourseStatus
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={!!editingStudent} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              value={form.course || ""}
              onChange={(e) => handleInputChange("course", e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min={1}
              value={form.age || ""}
              onChange={(e) =>
                handleInputChange("age", parseInt(e.target.value).toString())
              }
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.courseStatus || ""}
              onChange={(e) =>
                handleInputChange(
                  "courseStatus",
                  e.target.value as CourseStatus
                )
              }
              required
            >
              {statuses
                .filter((s): s is CourseStatus => s !== "All Status")
                .map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="px-6 py-2"
            >
              Cancel
            </Button>
            <Button type="submit" className="px-6 text-white py-2">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
