import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "CustomerAccount",
      required: true,
    },
    cash: { type: Number, required: true },
    nonCash: { type: Number, required: true },
    receipt: { type: String, required: true },
    payer: { type: String, required: true },
  },
  { timestamps: true }
);
const CustomerTransaction = model("CustomerTransaction", schema);
export default CustomerTransaction;
