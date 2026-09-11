import ApiError from "../utils/ApiError.js";

const validateReqBody = (schema) => (req, _, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(
      400,
      "Data Validation failed",
      result.error.flatten().fieldErrors,
    );
  }

  req.body = result.data;
  next();
};

const validateReqQuery = (schema) => (req, _, next) => {
  const result = schema.safeParse(req.query);

  if (!result.success) {
    throw new ApiError(
      400,
      "Query Validation failed",
      result.error.flatten().fieldErrors,
    );
  }

  req.query = result.data;
  next();
};

export { validateReqBody, validateReqQuery };
