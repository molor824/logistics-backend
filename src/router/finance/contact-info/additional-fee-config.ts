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

router.use(authenticationHandler, financeHandler);

router.get("/", getAll);
router.post("/", validateNewConfig, create);
router.put("/:id", validateNewConfig, update);
router.delete("/:id", remove);

export default router;
