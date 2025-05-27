export type CustomerAccount = {
  _id: string;
  account: string;
  customerName: string;
  openingBalance: number;
  closingBalance: number;
  debit: number;
  credit: number;
};
export type CustomerTransaction = {
  _id: string;
  account: CustomerAccount;
  cash: number;
  nonCash: number;
  receipt: string;
  payer: string;
};
export type PostCustomerTransaction = {
  account: string;
  cash: number;
  nonCash: number;
  receipt: string;
  payer: string;
};
export type PutCustomerTransaction = Omit<
  PostCustomerTransaction,
  "account"
> & {
  _id: string;
};
