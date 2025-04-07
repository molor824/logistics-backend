import mongoose from "mongoose";

const schema = mongoose.Schema({
  categoryCode: { type: Number, required: true },
  feeCode: { type: Number, required: true },
  feeName: { type: String, required: true },
  measureUnit: { type: String, enums: ["TRAILER"], required: true },
  feeAmount: { type: Number, required: true },
});

const AdditionalFeeConfig = mongoose.model("AdditionalFeeConfig", schema);
export default AdditionalFeeConfig;
