import e from "express";
import authenticationHandler from "../../../firmware/authenticationHandler.js";
import financeHandler from "../../../firmware/financeHandler.js";
import {
  get,
  post,
  put,
  remove,
  validationSchema,
} from "../../../controller/finance/contact-info/customer-companies.js";
import validationHandler from "../../../firmware/validationHandler.js";

const router = e.Router();

router.get("/", authenticationHandler, financeHandler, get);
router.post(
  "/",
  validationHandler(validationSchema),
  authenticationHandler,
  financeHandler,
  post
);
router.put(
  "/:id",
  validationHandler(validationSchema),
  authenticationHandler,
  financeHandler,
  put
);
router.delete("/:id", authenticationHandler, financeHandler, remove);

export default router;
