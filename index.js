import express from "express";
import * as errors from "./error/errors.js";
import errorHandler from "./error/handler.js";

const PORT = 8123;
let app = express();

app.get("/", (req, res, next) => {
  try {
    res.json("Hello, world!");
  } catch (e) {
    next(e);
  }
});
app.all("*", (req, res, next) => {
  next(errors.notFoundURL(req.url));
});
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`listening at port http://localhost:${PORT}`)
);
