import { userNotAdmin } from "../error/errors.js";
import asyncHandler from "./asyncHandler.js";

const adminHandler = asyncHandler((req, res, next) => {
  if (!req.user?.isAdmin) {
    throw userNotAdmin();
  }
  next();
});
export default adminHandler;
