import { userNotAdmin } from "../error/errors.js";
import asyncHandler from "./asyncHandler.js";

const adminHandler = asyncHandler((req, res, next) => {
  const { role } = res.locals.user ?? {};
  if (role !== "ADMIN") {
    throw userNotAdmin();
  }
  next();
});
export default adminHandler;
