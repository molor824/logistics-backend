import { http } from "..";

export type User = {
  email: string;
  signedBy: string;
  phoneNumber: string;
  lastName: string;
  firstName: string;
  age: number;
  role: string;
  gender: string;
  registrationNumber: string;
};
export async function info() {
  return await http.get<User>("/users/profile");
}
