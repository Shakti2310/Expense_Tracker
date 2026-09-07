import multer from "multer";
import path from "path";
import fs from "fs";

const createUploader = ({ folder, allowedTypes, allowedExtensions, maxSizeMB }) => {
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
    const ext = path.extname(file.originalname).toLowerCase();

    const mimetypeOk = allowedTypes.includes(file.mimetype);
    const extensionOk = allowedExtensions.includes(ext);

    // accept if EITHER check passes — covers the octet-stream edge case
    if (!mimetypeOk && !extensionOk) {
      return cb(
        new Error(`Only ${allowedExtensions.join(", ")} files are allowed`),
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
  allowedExtensions: [".png", ".jpg", ".jpeg", ".webp"],
  maxSizeMB: 5,
});

const uploadCategoryIcon = createUploader({
  folder: "categories",
  allowedTypes: ["image/png", "image/jpeg", "image/svg+xml"],
  allowedExtensions: [".png", ".jpg", ".jpeg", ".svg"],
  maxSizeMB: 1,
});

export { uploadUserPicture, uploadCategoryIcon };