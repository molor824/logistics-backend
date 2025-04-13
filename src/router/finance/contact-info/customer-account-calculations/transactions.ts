import {
  getTransaction,
  getTransactions,
} from "#controller/finance/contact-info/customer-account-calculations/transactions.js";
import authenticationHandler from "#firmware/authenticationHandler.js";
import financeHandler from "#firmware/financeHandler.js";
import { Router } from "express";

const router = Router();

router.use(authenticationHandler, financeHandler);

router.get("/", getTransactions);
router.get("/:id", getTransaction);

export default router;
