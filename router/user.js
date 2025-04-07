import e from "express";
import validationHandler from "../firmware/validationHandler.js";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getProfile,
  login,
  loginValidationSchema,
  logout,
  userValidationSchema,
} from "../controller/user.js";
import authenticationHandler from "../firmware/authenticationHandler.js";
import adminHandler from "../firmware/adminHandler.js";

const router = e.Router();

router.get("/", authenticationHandler, adminHandler, getAllUsers);
router.get("/profile", authenticationHandler, getProfile);
router.post("/logout", authenticationHandler, logout);
router.post("/login", validationHandler(loginValidationSchema), login);
router.post(
  "/",
  validationHandler(userValidationSchema),
  authenticationHandler,
  adminHandler,
  addUser
);
router.delete("/:id", authenticationHandler, adminHandler, deleteUser);

export default router;
