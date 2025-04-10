import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    account: {
      type: mongoose.Types.ObjectId,
      ref: "CustomerAccount",
      required: true,
    },
    cash: { type: Number, required: true },
    nonCash: { type: Number, required: true },
    receipt: { type: String, required: true },
    payer: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { required: true }
);
const CustomerTransaction = mongoose.model("CustomerTransaction", schema);
export default CustomerTransaction;
