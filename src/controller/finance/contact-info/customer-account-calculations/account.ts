import { accountNotFound } from "#error/errors.js";
import asyncHandler from "#firmware/asyncHandler.js";
import CustomerAccount from "#model/finance/contact-info/customer-account-calculation/account.js";

const getById = async (id: string) => {
  const account = await CustomerAccount.findById(id);
  if (!account) {
    throw accountNotFound(id);
  }
  return account;
};
export const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await CustomerAccount.find({});
  res.json(accounts);
});
export const getAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.json(getById(id));
});
export const addAccount = asyncHandler(async (req, res) => {
  const account = new CustomerAccount(req.body);
  await account.save();
  res.json("OK");
});
export const editAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const account = await getById(id);
  Object.assign(account, req.body);
  await account.save();
  res.json("OK");
});
export const deleteAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const account = await getById(id);
  await account.deleteOne();
  res.json("OK");
});
