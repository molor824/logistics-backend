import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in .env file");

export function generateToken(email, id) {
  return jwt.sign({ email, id }, JWT_SECRET, {
    expiresIn: "1h",
  });
}
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return false;
  }
}
