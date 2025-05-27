import { http } from "@/api";
import Schema from "./type";

const URL = "/finance/contact-info/additional-fee-configs";

export async function getAll() {
  return await http.get<Schema[]>(URL);
}
export async function update(data: Schema) {
  await http.put(`${URL}/${data._id}`, data);
}
export async function create(data: Schema) {
  await http.post(URL, data);
}
export async function remove(id: string) {
  await http.del(`${URL}/${id}`);
}
