import dotenv from "dotenv";
import express from "express";
import * as errors from "./error/errors.js";
import errorHandler from "./firmware/errorHandler.js";
import userRouter from "./router/user.js";
import customerCompanyRouter from "./router/finance/contact-info/customer-companies.js";
import additionalFeeConfigRouter from "./router/finance/contact-info/additional-fee-config.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const { MONGO_URI } = process.env;
if (!MONGO_URI) throw new Error("Mongo URI not found");

const PORT = process.env.PORT || 8123;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/finance/contact-info/customer-companies", customerCompanyRouter);
app.use(
  "/api/finance/contact-info/additional-fee-configs",
  additionalFeeConfigRouter
);

app.get("/", (req, res) => {
  res.json("Welcome to logistics api.");
});
app.all("*", (req, res, next) => {
  next(errors.notFoundURL(req.url));
});
app.use(errorHandler);

mongoose.connect(MONGO_URI).then((db) => {
  console.log(
    `MongoDB connected to ${db.connection.host}:${db.connection.port}`
  );
});

app.listen(PORT, () =>
  console.log(`listening at port http://localhost:${PORT}`)
);
