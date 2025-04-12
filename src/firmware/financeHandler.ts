import { userNotFinance } from "#error/errors.js";
import asyncHandler from "./asyncHandler.js";

const financeHandler = asyncHandler(async (req, res, next) => {
  const { role } = res.locals.user ?? {};
  if (role !== "FINANCE") {
    throw userNotFinance();
  }
  next();
});

export default financeHandler;
