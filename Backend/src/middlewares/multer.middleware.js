import multer from "multer";
import path from "path";
import fs from "fs";

const createUploader = ({ folder, allowedTypes, maxSizeMB }) => {
  // ensure the destination folder exists
  const uploadPath = `./public/uploads/${folder}`;
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error(`Only ${allowedTypes.join(", ")} files are allowed`),
        false,
      );
    }
    cb(null, true);
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
  });
};

const uploadUserPicture = createUploader({
  folder: "users",
  allowedTypes: ["image/png", "image/jpeg", "image/webp"],
  maxSizeMB: 5,
});

const uploadCategoryIcon = createUploader({
  folder: "categories",
  allowedTypes: ["image/png", "image/jpeg", "image/svg+xml"],
  maxSizeMB: 1,
});

export { uploadUserPicture, uploadCategoryIcon };
