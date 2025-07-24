const express = require("express");
const connect = require("./dbConnect/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

connect(); // connect first

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});