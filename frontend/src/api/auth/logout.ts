import { http } from "..";

export default async function logout() {
  await http.post<undefined>("/users/logout");
}
