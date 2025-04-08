import { validationError } from "../error/errors.js";

export default function validationHandler(validator) {
  return (req, res, next) => {
    const errors = validator.run(req);
    if (!errors.isEmpty()) {
      throw validationError(errors.array());
    }
    next();
  };
}
