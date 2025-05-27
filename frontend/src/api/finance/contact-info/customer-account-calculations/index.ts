import { http } from "@/api";
import {
  CustomerAccount,
  CustomerTransaction,
  PostCustomerTransaction,
  PutCustomerTransaction,
} from "./types";

const URL = "/finance/contact-info/customer-account-calculations";

export function getAccounts() {
  return http.get<CustomerAccount[]>(`${URL}/accounts`);
}
export function getAccount(id: string) {
  return http.get<CustomerAccount>(`${URL}/accounts/${id}`);
}
export function addAccount(account: CustomerAccount) {
  return http.post(`${URL}/accounts`, account);
}
export function updateAccount(account: CustomerAccount) {
  return http.put(`${URL}/accounts/${account._id}`, account);
}
export function deleteAccount(id: string) {
  return http.del(`${URL}/accounts/${id}`);
}
export function getTransactions() {
  return http
    .get<CustomerTransaction[]>(`${URL}/transactions`)
    .then((transactions) => {
      console.log(transactions);
      return transactions;
    });
}
export function getTransaction(id: string) {
  return http.get<CustomerTransaction>(`${URL}/transactions/${id}`);
}
export function addTransaction(transaction: PostCustomerTransaction) {
  return http.post(`${URL}/transactions`, transaction);
}
export function updateTransaction(transaction: PutCustomerTransaction) {
  return http.put(`${URL}/transactions/${transaction._id}`, transaction);
}
export function deleteTransaction(id: string) {
  return http.del(`${URL}/transactions/${id}`);
}
