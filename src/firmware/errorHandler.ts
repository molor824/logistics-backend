import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  try {
    const { status, error } = err;
    if (typeof status !== "number") {
      throw err;
    }
    console.error(error);
    res.status(status).json(error);
  } catch {
    console.error(err);
    res.status(500).json({
      type: "UNHANDLED_ERROR",
      message: err,
    });
  }
};
export default errorHandler;
