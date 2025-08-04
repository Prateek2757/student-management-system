const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads/ directory exists
const ensureUploadsDirectoryExists = () => {
  const dir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
ensureUploadsDirectoryExists();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadsDirectoryExists();
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Export the configured upload middleware
const upload = multer({ storage });

module.exports = upload;