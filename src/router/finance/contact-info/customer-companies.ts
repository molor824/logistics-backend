import e from "express";
import authenticationHandler from "#firmware/authenticationHandler.js";
import financeHandler from "#firmware/financeHandler.js";
import {
  get,
  post,
  put,
  remove,
  validationSchema,
} from "#controller/finance/contact-info/customer-companies.js";

const router = e.Router();

router.use(authenticationHandler, financeHandler);

router.get("/", get);
router.post("/", validationSchema, post);
router.put("/:id", validationSchema, put);
router.delete("/:id", remove);

export default router;
