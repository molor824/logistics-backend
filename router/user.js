import e from "express";
import validationHandler from "../firmware/validationHandler.js";
import {
  addUser,
  deleteUser,
  getProfile,
  login,
  loginValidationSchema,
  logout,
  userValidationSchema,
} from "../controller/user.js";
import authenticationHandler from "../firmware/authenticationHandler.js";
import adminHandler from "../firmware/adminHandler.js";

const router = e.Router();

router.get("/profile", authenticationHandler, getProfile);
router.delete("/profile", authenticationHandler, logout);
router.delete("/:id", authenticationHandler, adminHandler, deleteUser);
router.post(
  "/login",
  validationHandler(loginValidationSchema),
  authenticationHandler,
  login
);
router.post(
  "/",
  validationHandler(userValidationSchema),
  authenticationHandler,
  adminHandler,
  addUser
);

export default router;
