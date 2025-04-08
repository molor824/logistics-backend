import User from "../model/user.js";
import asyncHandler from "../firmware/asyncHandler.js";
import { passwordInvalid, userNotFound } from "../error/errors.js";
import { generateToken } from "../util/jwt.js";
import bcrypt from "bcrypt";
import { checkSchema } from "express-validator";

const MAX_AGE = 1000 * 3600;

export const newUserValidation = checkSchema({
  email: {
    isEmail: true,
    trim: true,
  },
  phoneNumber: {
    trim: true,
    isString: true,
    matches: { options: /^(\+\d{1,3})?(\s?[0-9]){2,12}$/ },
  },
  registrationNumber: {
    isString: true,
    matches: { options: /^[А-ЯЁӨҮ]{2}[0-9]{8}$/ },
  },
  gender: {
    isIn: {
      options: [["M", "F"]],
    },
    optional: true,
  },
  lastName: {
    isString: true,
    isAlphanumeric: true,
    trim: true,
    escape: true,
    isLength: {
      options: { min: 2 },
    },
  },
  firstName: {
    isString: true,
    escape: true,
    isAlphanumeric: true,
    isLength: {
      options: { min: 2 },
    },
  },
  age: {
    isInt: true,
    toInt: true,
  },
  role: {
    isIn: {
      options: [["ADMIN", "FINANCE", "CASHIER", "VEHICLE_MANAGER"]],
    },
  },
  password: {
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      },
    },
  },
});
export const loginValidation = checkSchema({
  email: {
    isEmail: true,
    trim: true,
  },
  password: {
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
      },
    },
  },
});
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
