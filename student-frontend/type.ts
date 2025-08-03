export type Student = {
    _id: string;
    name: string;
    course: string;
    profilepicture
    createdAt: string; // ISO string like "2025-07-31T12:34:56.789Z"
    updatedAt: string;
  };
  
  export type User = {
    _id: string;
    name: string;
    firstName?:string;
    lastName?:string;

    role: "admin" | "student" | "guest";
    profileImage?:String;
    createdAt: string;
    updatedAt: string;
  };