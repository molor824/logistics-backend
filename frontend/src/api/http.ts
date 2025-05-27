import axios from "axios";
import { Response } from "./type";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error("API_URL is not defined");
}

async function request<T = void>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any
) {
  const response = await axios<Response<T>>({
    method,
    url: API_URL + url,
    data,
    withCredentials: true,
  });
  if (response.status >= 400) throw new Error(JSON.stringify(response.data));
  return response.data as T;
}
export function get<T = void>(url: string) {
  return request<T>(url, "GET", undefined);
}
export function put<T = void>(url: string, data?: any) {
  return request<T>(url, "PUT", data);
}
export function post<T = void>(url: string, data?: any) {
  return request<T>(url, "POST", data);
}
export function del<T = void>(url: string) {
  return request<T>(url, "DELETE", undefined);
}
