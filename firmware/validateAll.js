import { validationError } from "../error/errors.js";
import asyncHandler from "./asyncHandler.js";

/**
 * @param {import("express-validator").ContextRunner[]} validations
 */
export default function validateAll(validations) {
  return asyncHandler(async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        throw validationError(result.array());
      }
    }
    next();
  });
}
