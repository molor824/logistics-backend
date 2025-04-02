import User from "../model/user.js";
import asyncHandler from "../firmware/asyncHandler.js";

export const userValidationSchema = {
  email: { type: "email", required: true },
  phoneNumber: { type: "phone", required: true },
  lastName: { type: "string", required: true },
  firstName: { type: "string", required: true },
  age: { type: "number", required: true },
  role: { type: "enum", enums: ["ADMIN", "FINANCE"], required: true },
};
export const addUser = asyncHandler(async (req, res) => {
  // const newUser = new User(req.body);
  // await newUser.save();
  res.end();
});
