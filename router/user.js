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
import validationHandler from "../firmware/validationHandler.js";

const router = e.Router();

router.get("/", adminHandler, getAllUsers);
router.get("/profile", getProfile);
router.post("/logout", logout);
router.post("/login", validationHandler(loginValidation), login);
router.post("/", validationHandler(newUserValidation), adminHandler, addUser);
router.put(
  "/:id",
  validationHandler(newUserValidation),
  adminHandler,
  updateUser
);
router.delete("/:id", adminHandler, deleteUser);

export default router;
