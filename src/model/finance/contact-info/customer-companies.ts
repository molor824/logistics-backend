import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    abbreviation: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    isBroker: {
      type: Boolean,
      required: true,
    },
    account: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CustomerCompanies = mongoose.model("CustomerCompanies", schema);
export default CustomerCompanies;
