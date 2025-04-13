import {
  addTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  newTransactionValidation,
  updateTransaction,
  updateTransactionValidation,
} from "#controller/finance/contact-info/customer-account-calculations/transactions.js";
import authenticationHandler from "#firmware/authenticationHandler.js";
import financeHandler from "#firmware/financeHandler.js";
import { Router } from "express";

const router = Router();

router.use(authenticationHandler, financeHandler);

router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.post("/", newTransactionValidation, addTransaction);
router.put("/:id", updateTransactionValidation, updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
