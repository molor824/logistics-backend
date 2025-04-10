import mongoose from "mongoose";

const schema = mongoose.Schema({
  categoryCode: { type: String, required: true },
  feeCode: { type: String, required: true },
  feeName: { type: String, required: true },
  measurmentUnit: { type: String, required: true },
  feeAmount: { type: Number, required: true },
});

const AdditionalFeeConfig = mongoose.model("AdditionalFeeConfig", schema);
export default AdditionalFeeConfig;
