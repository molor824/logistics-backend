import {
  getAccount,
  getAccounts,
} from "#controller/finance/contact-info/customer-account-calculations/account.js";
import authenticationHandler from "#firmware/authenticationHandler.js";
import financeHandler from "#firmware/financeHandler.js";
import { Router } from "express";

const router = Router();
router.get("/", authenticationHandler, financeHandler, getAccounts);
router.get("/:id", authenticationHandler, financeHandler, getAccount);

export default router;
