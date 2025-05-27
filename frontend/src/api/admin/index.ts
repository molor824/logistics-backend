import { http } from "..";
import { User } from "../user";

type Schema = User & { _id: string };

export type { Schema };
export async function get() {
  return await http.get<Schema[]>("/users");
}
export async function post(value: User) {
  return await http.post<undefined>("/users", value);
}
export async function put(value: Schema) {
  return await http.put<undefined>(`/users/${value._id}`, value);
}
export async function del(id: string) {
  return await http.del<undefined>(`/users/${id}`);
}
