const express = require("express");
const connect = require("./dbConnect/db");
require("dotenv").config();
const authroutes = require("./routes/auth")
const studentroutes = require("./routes/student")
connect(); // connect first

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/auth",authroutes)
app.use("/api/student",studentroutes)


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});