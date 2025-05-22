import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();
const __dirname = path.resolve();


const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });


router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  res.json({ imageUrl: `http://localhost:3000/uploads/${req.file.filename}` });
});

export default router;
