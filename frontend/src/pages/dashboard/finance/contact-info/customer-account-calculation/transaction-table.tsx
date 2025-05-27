import Table from "@/components/table";
import { localeColumnSorter, numberColumnSorter } from "@/utils/sorter";
import Form from "./transaction-form.tsx";
import { finance } from "@/api";

const COLUMNS = [
  {
    title: "Огноо",
    dataIndex: "createdAt",
    sorter: localeColumnSorter("createdAt"),
  },
  {
    title: "Данс",
    dataIndex: "account",
    render: (_: any, { account }: any) => account.account,
    sorter: (a: any, b: any) =>
      String(a.account.account).localeCompare(String(b.account.account)),
  },
  {
    title: "Бэлэн",
    dataIndex: "cash",
    sorter: numberColumnSorter("cash"),
    render: (_: any, { cash }: any) => `${cash} ₮`,
  },
  {
    title: "Бэлэн бус",
    dataIndex: "nonCash",
    sorter: numberColumnSorter("nonCash"),
    render: (_: any, { nonCash }: any) => `${nonCash} ₮`,
  },
  {
    title: "Баримт",
    dataIndex: "receipt",
    sorter: numberColumnSorter("receipt"),
  },
  {
    title: "Төлөгч",
    dataIndex: "payer",
    sorter: localeColumnSorter("payer"),
  },
];

const customerAccountCalculations =
  finance.contactInfo.customerAccountCalculations;

export default function TransactionTable() {
  return (
    <Table
      columns={COLUMNS}
      onData={customerAccountCalculations.getTransactions}
      onAdd={customerAccountCalculations.addTransaction as any}
      onEdit={(value, newValue) =>
        customerAccountCalculations.updateTransaction({ ...value, ...newValue })
      }
      onDelete={({ _id }) => customerAccountCalculations.deleteTransaction(_id)}
      form={Form}
    />
  );
}
