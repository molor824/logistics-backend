import { body } from "express-validator";
import asyncHandler from "../../../firmware/asyncHandler.js";
import validateAll from "../../../firmware/validateAll.js";
import AdditionalFeeConfig from "../../../model/finance/contact-info/additional-fee-config.js";

export const validateNewConfig = validateAll([
  body("categoryCode").isString().isLength({ min: 2 }).escape(),
  body("feeCode").isString().isLength({ min: 2 }).escape(),
  body("feeName").isString().isLength({ min: 2 }).escape(),
  body("measurmentUnit").isString().isLength({ min: 2 }).escape(),
  body("feeAmount").isInt({ min: 0 }),
]);
export const getAll = asyncHandler(async (req, res) => {
  const configs = await AdditionalFeeConfig.find({});
  res.json(configs);
});
export const update = asyncHandler(async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  await AdditionalFeeConfig.findByIdAndUpdate(id, body);
  res.json("OK");
});
export const create = asyncHandler(async (req, res) => {
  const { body } = req;
  const config = new AdditionalFeeConfig(body);
  await config.save();
  res.json("OK");
});
export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await AdditionalFeeConfig.findByIdAndDelete(id);
  res.json("OK");
});
