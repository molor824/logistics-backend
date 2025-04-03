import { invalidToken, missingToken } from "../error/errors.js";
import User from "../model/user.js";
import { verifyToken } from "../util/jwt.js";
import asyncHandler from "./asyncHandler.js";

const authenticationHandler = asyncHandler(async (req, res, next) => {
  const jwt = req.cookies.jwt;
  if (!jwt) {
    throw missingToken();
  }

  const decoded = verifyToken(jwt);
  if (!decoded) {
    throw invalidToken();
  }

  const user = await User.findById(decoded.id);
  if (!user || user.email !== decoded.email) {
    throw invalidToken();
  }

  req.user = user;
  next();
});
export default authenticationHandler;
