import { accountNotFound, transactionNotFound } from "#error/errors.js";
import asyncHandler from "#firmware/asyncHandler.js";
import validateAll from "#firmware/validateAll.js";
import CustomerAccount from "#model/finance/contact-info/customer-account-calculation/account.js";
import CustomerTransaction from "#model/finance/contact-info/customer-account-calculation/transaction.js";
import { body } from "express-validator";

const getById = async (id: string) => {
  const transaction = await CustomerTransaction.findById(id);
  if (!transaction) {
    throw transactionNotFound(id);
  }
  return transaction;
};
const getAccount = async (transaction: any) => {
  const account = await CustomerAccount.findById(transaction.account);
  if (!account) {
    throw accountNotFound(transaction.account.toString());
  }
  return { ...transaction, account };
};

export const newTransactionValidation = validateAll([
  body("account._id").isMongoId(),
  body("cash").isInt({ min: 0 }),
  body("nonCash").isInt({ min: 0 }),
  body("receipt").notEmpty().escape(),
  body("payer").notEmpty().escape(),
]);
export const updateTransactionValidation = validateAll([
  body("cash").isInt({ min: 0 }),
  body("nonCash").isInt({ min: 0 }),
  body("receipt").notEmpty().escape(),
  body("payer").notEmpty().escape(),
]);
export const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await CustomerTransaction.find({});
  res.json(await Promise.all(transactions.map(getAccount)));
});
export const getTransaction = asyncHandler(async (req, res) => {
  const transactions = await getById(req.params.id);
  res.json(await getAccount(transactions));
});
export const addTransaction = asyncHandler(async (req, res) => {
  const { body } = req;
  const transaction = new CustomerTransaction({
    ...body,
    account: body.account._id,
  });
  await transaction.save();
  res.json("OK");
});
export const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await getById(req.params.id);
  Object.assign(transaction, req.body);
  await transaction.save();
  res.json("OK");
});
export const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await getById(req.params.id);
  await transaction.deleteOne();
  res.json("OK");
});
