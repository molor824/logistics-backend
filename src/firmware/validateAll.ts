import { ValidationChain } from "express-validator";
import { validationError } from "#error/errors.js";
import asyncHandler from "./asyncHandler.js";

export default function validateAll(validations: ValidationChain[]) {
  return asyncHandler(async (req, res, next) => {
    await Promise.all(
      validations.map(async (validation) => {
        const result = await validation.run(req);
        if (!result.isEmpty()) {
          throw validationError(result.array());
        }
      })
    );
    next();
  });
}
