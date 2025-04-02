import e from "express";
import validationHandler from "../firmware/validationHandler.js";
import { addUser, userValidationSchema } from "../controller/user.js";

const router = e.Router();

router.post("/", validationHandler(userValidationSchema), addUser);

export default router;
