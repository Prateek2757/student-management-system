const express = require("express");
const connect = require("./dbConnect/db");
require("dotenv").config();
const authroutes = require("./routes/auth")

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/auth",authroutes)

connect(); // connect first

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});