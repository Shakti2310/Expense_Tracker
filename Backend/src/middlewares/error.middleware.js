import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // MongoDB duplicate key error
  if (err.code === 11000) {
    error = new ApiError(
      409,
      "Category with this name already exists"
    );
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