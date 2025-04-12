import e from "express";
import authenticationHandler from "#firmware/authenticationHandler.js";
import financeHandler from "#firmware/financeHandler.js";
import {
  create,
  getAll,
  remove,
  update,
  validateNewConfig,
} from "#controller/finance/contact-info/additional-fee-config.js";

const router = e.Router();

router.get("/", authenticationHandler, financeHandler, getAll);
router.post(
  "/",
  validateNewConfig,
  authenticationHandler,
  financeHandler,
  create
);
router.put(
  "/:id",
  validateNewConfig,
  authenticationHandler,
  financeHandler,
  update
);
router.delete("/:id", authenticationHandler, financeHandler, remove);

export default router;
