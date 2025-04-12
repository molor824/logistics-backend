import { Router } from "express";
import additionalFeeConfigRouter from "./contact-info/additional-fee-config.js";
import customerCompaniesRouter from "./contact-info/customer-companies.js";
import customerAccountRouter from "./contact-info/customer-account-calculations/account.js";
import customerTransactionsRouter from "./contact-info/customer-account-calculations/transactions.js";

const router = Router();
router.use("/contact-info/additional-fee-config", additionalFeeConfigRouter);
router.use("/contact-info/customer-companies", customerCompaniesRouter);
router.use(
  "/contact-info/customer-account-calculations/accounts",
  customerAccountRouter
);
router.use(
  "/contact-info/customer-account-calculations/transactions",
  customerTransactionsRouter
);
export default router;
