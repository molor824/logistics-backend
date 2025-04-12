import { body } from "express-validator";
import asyncHandler from "#firmware/asyncHandler.js";
import validateAll from "#firmware/validateAll.js";
import CustomerCompanies from "#model/finance/contact-info/customer-companies.js";

export const validationSchema = validateAll([
  body("abbreviation").isString().isLength({ min: 3 }).escape(),
  body("companyName").isString().isLength({ min: 4 }).escape(),
  body("isBroker").isBoolean(),
  body("account").isString().isLength({ min: 4 }).escape(),
  body("contactNumber").isInt({ min: 0 }),
]);

export const get = asyncHandler(async (req, res) => {
  const companies = await CustomerCompanies.find({});
  res.json(companies);
});
export const post = asyncHandler(async (req, res) => {
  const company = new CustomerCompanies(req.body);
  await company.save();
  res.json("OK");
});
export const put = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await CustomerCompanies.findByIdAndUpdate(id, req.body);
  res.json("OK");
});
export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await CustomerCompanies.findByIdAndDelete(id);
  res.json("OK");
});
