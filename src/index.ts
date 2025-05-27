import dotenv from "dotenv";
import express from "express";
import * as errors from "#error/errors.js";
import errorHandler from "#firmware/errorHandler.js";
import userRouter from "#router/user.js";
import financeRouter from "#router/finance/index.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const { MONGO_URI } = process.env;
if (!MONGO_URI) throw new Error("Mongo URI not found");

const PORT = 8123;
const app = express();

const frontendPath = path.join(import.meta.dirname, "../frontend");

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
app.use("/api/finance", financeRouter);
app.use("/assets", express.static(path.join(frontendPath, "dist/assets")));

app.get("/api", (req, res) => {
  res.json("Welcome to logistics api.");
});
app.all("*", (req, res, next) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/assets")) {
    next(errors.notFoundURL(req.url));
  }
  res.sendFile(path.join(frontendPath, "dist/index.html"));
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
