import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Types } from "mongoose";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in .env file");

export function generateToken(email: string, id: Types.ObjectId) {
  return jwt.sign({ email, id: id.toString("base64") }, JWT_SECRET!, {
    expiresIn: "1h",
  });
}
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET!);
  } catch {
    return null;
  }
}
