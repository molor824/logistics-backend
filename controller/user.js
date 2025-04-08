import User from "../model/user.js";
import asyncHandler from "../firmware/asyncHandler.js";
import { passwordInvalid, userNotFound } from "../error/errors.js";
import { generateToken } from "../util/jwt.js";
import bcrypt from "bcrypt";
import validateAll from "../firmware/validateAll.js";
import { body } from "express-validator";

const MAX_AGE = 1000 * 3600;

export const newUserValidation = validateAll([
  body("email").trim().isEmail(),
  body("phoneNumber")
    .trim()
    .matches(/^(\+\d{1,3}\s?)?([0-9]){2,12}$/),
  body("registrationNumber")
    .trim()
    .matches(/^[А-ЯЁӨҮ]{2}[0-9]{8}$/),
  body("gender").trim().isIn(["M", "F", "O"]),
  body("lastName").trim().escape(),
  body("firstName").trim().escape(),
  body("age").isInt({ min: 18 }),
  body("role").isIn(["ADMIN", "FINANCE", "CASHIER", "VEHICLE_MANAGER"]),
  body("password").isLength({ min: 8 }),
]);
export const loginValidation = validateAll([
  body("email").isEmail(),
  body("password"),
]);
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
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const user = await User.findById(id);
  if (!user) {
    throw userNotFound(id);
  }
  if (!bcrypt.compareSync(body.password, user.password)) {
    throw passwordInvalid(id);
  }

  await User.findByIdAndUpdate(id, { ...body, password: undefined });
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
  await User.findByIdAndDelete(id);
  res.json("OK");
});
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw userNotFound(email);
  }
  if (!bcrypt.compareSync(password, user.password)) {
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
