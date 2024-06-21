import multer from "multer";

const storagePath = process.env.NODE_ENV === "development" ? "frontend/public/uploads" : "frontend/dist/uploads";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, storagePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: 500000 }, // 500kb
});

const upload = multer({ storage: storage });

export default upload;
