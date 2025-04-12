import { transactionNotFound } from "#error/errors.js";
import asyncHandler from "#firmware/asyncHandler.js";
import CustomerTransaction from "#model/finance/contact-info/customer-account-calculation/transaction.js";

export const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await CustomerTransaction.find({});
  res.status(200).json(transactions);
});
export const getTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const transaction = await CustomerTransaction.findById(id);
  if (!transaction) {
    throw transactionNotFound(id);
  }
  res.status(200).json(transaction);
});
