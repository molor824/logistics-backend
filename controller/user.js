import User from "../model/user.js";
import asyncHandler from "../firmware/asyncHandler.js";
import { passwordInvalid, userNotFound } from "../error/errors.js";
import { generateToken } from "../util/jwt.js";
import bcrypt from "bcrypt";

const MAX_AGE = 1000 * 3600;

export const userValidationSchema = {
  email: { type: "email", required: true, min: 4 },
  phoneNumber: { type: "phone", required: true, min: 8 },
  registrationNumber: { type: "string", min: 8, required: true },
  gender: { type: "enum", enums: ["M", "F"], required: true },
  lastName: { type: "string", required: true, min: 2 },
  firstName: { type: "string", required: true, min: 2 },
  age: { type: "number", required: true },
  role: { type: "enum", enums: ["ADMIN", "FINANCE"], required: true },
  password: { type: "string", required: true, min: 8 },
};
export const loginValidationSchema = {
  email: { type: "email", required: true },
  password: { type: "string", required: true },
};
export const addUser = asyncHandler(async (req, res) => {
  const { body, user } = req;
  const newUser = new User({
    ...body,
    password: bcrypt.hashSync(body.password, 10),
    signedBy: user._id,
  });
  await newUser.save();
  res.json("OK");
});

function respondTokenCookie(token, res) {
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: MAX_AGE,
  });
}
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw userNotFound();
  }
  res.json("OK");
});
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw userNotFound(email);
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    throw passwordInvalid(email);
  }
  const token = generateToken(email, user._id);

  respondTokenCookie(token, res);
  res.json("OK");
});
export const logout = asyncHandler((req, res) => {
  res.clearCookie("jwt");
  res.json("OK");
});
export const getProfile = asyncHandler(async (req, res) => {
  const {
    email,
    signedBy,
    phoneNumber,
    lastName,
    firstName,
    age,
    role,
    gender,
    registrationNumber,
  } = req.user;
  res.json({
    email,
    signedBy,
    phoneNumber,
    lastName,
    firstName,
    age,
    role,
    gender,
    registrationNumber,
  });
});
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});
