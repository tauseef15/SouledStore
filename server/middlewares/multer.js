const multer = require("multer");

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save with original file name
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
