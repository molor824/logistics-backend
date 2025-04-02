import validate from "../util/validate.js";
import asyncHandler from "./asyncHandler.js";

export default function validationHandler(schema) {
  return asyncHandler((req, res, next) => {
    req.body = validate(req.body, schema);
    next();
  });
}
