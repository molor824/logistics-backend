import e from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getProfile,
  login,
  loginValidation,
  logout,
  updateUser,
  newUserValidation,
} from "../controller/user.js";
import adminHandler from "../firmware/adminHandler.js";
import authenticationHandler from "../firmware/authenticationHandler.js";

const router = e.Router();

router.get("/", authenticationHandler, adminHandler, getAllUsers);
router.get("/profile", authenticationHandler, getProfile);
router.post("/logout", logout);
router.post("/login", loginValidation, login);
router.post(
  "/",
  newUserValidation,
  authenticationHandler,
  adminHandler,
  addUser
);
router.put(
  "/:id",
  newUserValidation,
  authenticationHandler,
  adminHandler,
  updateUser
);
router.delete("/:id", authenticationHandler, adminHandler, deleteUser);

export default router;
