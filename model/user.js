import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    signedBy: { type: mongoose.Types.ObjectId, ref: "User", required: false },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["M", "F"], required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["ADMIN", "FINANCE", "VEHICLE_MANAGER", "CASHIER"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
