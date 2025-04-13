import { accountNotFound, transactionNotFound } from "#error/errors.js";
import asyncHandler from "#firmware/asyncHandler.js";
import CustomerAccount from "#model/finance/contact-info/customer-account-calculation/account.js";
import CustomerTransaction from "#model/finance/contact-info/customer-account-calculation/transaction.js";

const getById = async (id: string) => {
  const transaction = await CustomerTransaction.findById(id);
  if (!transaction) {
    throw transactionNotFound(id);
  }
  return transaction;
};

export const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await CustomerTransaction.find({});
  res.json(transactions);
});
export const getTransaction = asyncHandler(async (req, res) => {
  res.json(await getById(req.params.id));
});
export const addTransaction = asyncHandler(async (req, res) => {
  const transaction = new CustomerTransaction(req.body);
  await transaction.save();
  res.json("OK");
});
export const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await getById(req.params.id);
  Object.assign(transaction, req.body);
  await transaction.save();
});
