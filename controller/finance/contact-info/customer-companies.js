import asyncHandler from "../../../firmware/asyncHandler.js";
import CustomerCompanies from "../../../model/finance/contact-info/customer-companies.js";

export const validationSchema = {
  abbreviation: {
    type: "string",
    required: true,
    min: 3,
  },
  companyName: {
    type: "string",
    required: true,
    min: 4,
  },
  isBroker: {
    type: "boolean",
    required: true,
  },
  account: {
    type: "string",
    required: true,
    min: 4,
  },
  contactNumber: {
    type: "number",
    required: true,
  },
};

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
