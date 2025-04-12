import { Types } from "mongoose";
import { invalidToken, missingToken } from "../error/errors.js";
import User from "../model/user.js";
import { verifyToken } from "../util/jwt.js";
import asyncHandler from "./asyncHandler.js";

export type AuthUser = InstanceType<typeof User>;

const authenticationHandler = asyncHandler(async (req, res, next) => {
  const jwt = req.cookies.jwt;
  if (!jwt) {
    throw missingToken();
  }

  const decoded = verifyToken(jwt);
  if (!decoded || typeof decoded === "string") {
    throw invalidToken();
  }

  const user = await User.findById(Types.ObjectId.createFromBase64(decoded.id));
  if (!user || user.email !== decoded.email) {
    throw invalidToken();
  }

  res.locals.user = user;
  next();
});
export default authenticationHandler;
