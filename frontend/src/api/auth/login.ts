import * as http from "../http";

export type Login = {
  email: string;
  password: string;
};
async function login(value: Login) {
  await http.post<undefined>("/users/login", value);
}
export default login;
