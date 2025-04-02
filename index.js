import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import * as errors from "./error/errors.js";
import errorHandler from "./error/handler.js";
import userRouter from "./router/user.js";
import cookieParser from "cookie-parser";

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
