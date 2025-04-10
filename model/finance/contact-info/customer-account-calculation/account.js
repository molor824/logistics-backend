import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    account: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    openingBalance: { type: Number, required: true },
    closingBalance: { type: Number, required: true },
    debit: { type: Number, required: true },
    credit: { type: Number, required: true },
  },
  { timestamps: true }
);
const CustomerAccount = mongoose.model("CustomerAccount", schema);
export default CustomerAccount;
