const asyncHandler = (requestHandler) => async (req, res, next) => {
  Promise.resolve(() => {
    requestHandler(req, res, next);
  }).reject((err) => {
    next(err);
  });
};
