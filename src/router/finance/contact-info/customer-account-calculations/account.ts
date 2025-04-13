import {
  accountValidation,
  addAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  updateAccount,
} from "#controller/finance/contact-info/customer-account-calculations/account.js";
import authenticationHandler from "#firmware/authenticationHandler.js";
import financeHandler from "#firmware/financeHandler.js";
import { Router } from "express";

const router = Router();

router.use(authenticationHandler, financeHandler);

router.get("/", getAccounts);
router.get("/:id", getAccount);
router.post("/", accountValidation, addAccount);
router.put("/:id", accountValidation, updateAccount);
router.delete("/:id", deleteAccount);

export default router;
