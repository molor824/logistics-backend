import dotenv from "dotenv";
import express from "express";
import * as errors from "./error/errors.js";
import errorHandler from "./firmware/errorHandler.js";
import userRouter from "./router/user.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_URI } = process.env;
if (!MONGO_URI) throw new Error("Mongo URI not found");

const db = await mongoose.connect(MONGO_URI);
console.log(`MongoDB connected to ${db.connection.host}:${db.connection.port}`);

const PORT = process.env.PORT || 8123;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Welcome to logistics api.");
});
app.use("/api/user", userRouter);
app.all("*", (req, res, next) => {
  next(errors.notFoundURL(req.url));
});
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`listening at port http://localhost:${PORT}`)
);
