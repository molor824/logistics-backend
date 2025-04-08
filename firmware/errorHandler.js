const errorHandler = (err, req, res, next) => {
  console.error(err);
  try {
    const { status, error } = err;
    if (typeof status !== "number") {
      throw err;
    }
    res.status(status).json(error);
  } catch {
    res.status(500).json({
      type: "UNHANDLED_ERROR",
      message: err,
    });
  }
};
export default errorHandler;
