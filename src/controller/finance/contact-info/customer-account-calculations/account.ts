import { accountNotFound } from "#error/errors.js";
import asyncHandler from "#firmware/asyncHandler.js";
import CustomerAccount from "#model/finance/contact-info/customer-account-calculation/account.js";

export const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await CustomerAccount.find({});
  res.status(200).json(accounts);
});
export const getAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const account = await CustomerAccount.findById(id);
  if (!account) {
    throw accountNotFound(id);
  }
  res.status(200).json(account);
});
