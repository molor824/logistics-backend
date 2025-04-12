import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./model/user.js";
import bcrypt from "bcrypt";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

await mongoose.connect(MONGO_URI);
console.log("Connected to mongo");

const admin = new User({
  email: "admin@email.com",
  lastName: "Admin",
  firstName: "Molor",
  registrationNumber: "12345678",
  age: 18,
  gender: "M",
  phoneNumber: "+97612312312",
  password: bcrypt.hashSync("admin123", 10),
  role: "ADMIN",
});
console.log(await admin.save());
