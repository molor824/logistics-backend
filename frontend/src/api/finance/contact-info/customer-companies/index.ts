import { http } from "@/api";
import { Schema } from "./type";

export type { Schema };

export async function get() {
  return await http.get<Schema[]>("/finance/contact-info/customer-companies");
}
export async function del(id: string) {
  return await http.del<undefined>(
    `/finance/contact-info/customer-companies/${id}`
  );
}
export async function post(value: Omit<Schema, "id">) {
  return await http.post<undefined>(
    "/finance/contact-info/customer-companies",
    value
  );
}
export async function put(value: Schema) {
  return await http.put<undefined>(
    `/finance/contact-info/customer-companies/${value._id}`,
    value
  );
}
