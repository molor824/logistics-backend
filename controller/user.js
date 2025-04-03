import User from "../model/user.js";
import asyncHandler from "../firmware/asyncHandler.js";
import { passwordInvalid, userNotFound } from "../error/errors.js";
import { generateToken } from "../util/jwt.js";

const MAX_AGE = 1000 * 3600;

export const userValidationSchema = {
  email: { type: "email", required: true },
  phoneNumber: { type: "phone", required: true },
  lastName: { type: "string", required: true },
  firstName: { type: "string", required: true },
  age: { type: "number", required: true },
  role: { type: "enum", enums: ["ADMIN", "FINANCE"], required: true },
};
export const loginValidationSchema = {
  email: { type: "email", required: true },
  password: { type: "string", required: true },
};
export const addUser = asyncHandler(async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.json({ ...savedUser, password: undefined, __v: undefined });
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
  const token = generateToken(email, user._id.toString("base64"));

  respondTokenCookie(token, res);
  res.json("OK");
});
export const logout = asyncHandler((req, res) => {
  res.clearCookie("jwt");
  res.json("OK");
});
export const getProfile = asyncHandler(async (req, res) => {
  const { email, phoneNumber, lastName, firstName, age, role } = req.user;
  res.json({ email, phoneNumber, lastName, firstName, age, role });
});
