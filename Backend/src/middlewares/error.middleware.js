import multer from "multer";
import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Multer-specific errors (file size, unexpected field, too many files, etc.)
  if (err instanceof multer.MulterError) {
    let message = "File upload error";

    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File is too large";
    } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = `Unexpected file field: ${err.field}`;
    }

    error = new ApiError(400, message);
  }

  // Custom fileFilter errors (thrown manually inside createUploader's fileFilter)
  else if (err.message?.includes("files are allowed")) {
    error = new ApiError(400, err.message);
  }

  // MongoDB duplicate key error
  else if (err.code === 11000) {
    error = new ApiError(409, "Duplicate value error");
  }

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: error.message || "Internal Server Error",
    errors: error.error || [],
    data: null,
  });
};

export default errorHandler;