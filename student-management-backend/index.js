const express = require("express");
const connect = require("./dbConnect/db");
const cors =require("cors")
require("dotenv").config();
const authroutes = require("./routes/auth")
const studentroutes = require("./routes/student")
const path = require("path");
connect(); // connect first

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/auth/uploads", express.static(path.join(__dirname, "uploads"))); 
app.use("/",authroutes)
app.use("/api/auth",authroutes)
app.use("/api/student",studentroutes)




app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});