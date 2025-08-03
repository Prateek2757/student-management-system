import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Users, UserPlus, BookOpen } from "lucide-react";
  import { useStudentContext } from "@/contexts/studentContext";
  
  export default function Dashboard() {
    const { students } = useStudentContext();
    console.log(students);
    
  
    const total = students.length;
    const active = students.filter((s) => s.courseStatus === "Active").length;
    const inactive = students.filter((s) => s.courseStatus === "Inactive").length;
  
    const coursesMap: Record<string, number> = {};
    students.forEach((s) => {
      if (s.course in coursesMap) coursesMap[s.course]++;
      else coursesMap[s.course] = 1;
    });
  
    const uniqueCourses = Object.keys(coursesMap).length;
    const sortedCourses = Object.entries(coursesMap)
      .map(([course, count]) => ({ course, count, percentage: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);
  
    const stats = [
      {
        title: "Total Students",
        value: total.toString(),
        description: "Total enrolled students",
        icon: Users,
        trend: `+${((active / (total || 1)) * 100).toFixed(1)}% Active`,
        bg: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
      },
      {
        title: "Active Students",
        value: active.toString(),
        description: "Currently active students",
        icon: UserPlus,
        trend: `${inactive} inactive`,
        bg: "bg-gradient-to-r from-green-400 to-emerald-500 text-white",
      },
      {
        title: "Active Courses",
        value: uniqueCourses.toString(),
        description: "Unique courses with enrollment",
        icon: BookOpen,
        trend: `${uniqueCourses} total courses`,
        bg: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
      },
     
    ];
  
    const recentStudents = students.slice(-5).reverse();
  
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your students today.
          </p>
        </div>
  
        {/* Stat Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index} className={`shadow-lg rounded-xl overflow-hidden ${stat.bg}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="w-5 h-5 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-sm opacity-90">{stat.description}</p>
                <p className="text-xs mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>
  
        {/* Student List + Course Distribution */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Students */}
          <Card className="col-span-4 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Recent Students</CardTitle>
              <CardDescription>Latest registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/30 to-primary/50 flex items-center justify-center font-bold text-primary">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">{student.course}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          student.courseStatus === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {student.courseStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
  
          {/* Course Distribution */}
          <Card className="col-span-4 md:col-span-3 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle>Course Distribution</CardTitle>
              <CardDescription>Students by course enrollment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sortedCourses.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{item.course}</span>
                    <span className="text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }