import multer from "multer";

const path = process.env.NODE_ENV === "development" ? "frontend/public" : "frontend/dist";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const extension = file.mimetype.slice(6); // png or jpeg or jpg etc
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
  limits: { fileSize: 500000 }, // 500kb
});

const upload = multer({ storage: storage });

export default upload;
