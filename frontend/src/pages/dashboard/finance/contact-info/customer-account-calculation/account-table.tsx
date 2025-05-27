import { localeColumnSorter, numberColumnSorter } from "@/utils/sorter";
import Table from "@/components/table";
import { finance } from "@/api";
import Form from "./account-form";

const COLUMNS = [
  {
    title: "Данс",
    dataIndex: "account",
    sorter: localeColumnSorter("account"),
  },
  {
    title: "Харилцагчийн нэр",
    dataIndex: "customerName",
    sorter: localeColumnSorter("customerName"),
  },
  {
    title: "Эхний үлдэгдэл",
    dataIndex: "openingBalance",
    sorter: numberColumnSorter("openingBalance"),
  },
  {
    title: "Дебит",
    dataIndex: "debit",
    sorter: numberColumnSorter("debit"),
  },
  {
    title: "Кредит",
    dataIndex: "credit",
    sorter: numberColumnSorter("credit"),
  },
  {
    title: "Эцсийн үлдэгдэл",
    dataIndex: "closingBalance",
    sorter: numberColumnSorter("closingBalance"),
  },
];

export default function AccountTable() {
  const customerAccountCalculations =
    finance.contactInfo.customerAccountCalculations;
  return (
    <Table
      columns={COLUMNS}
      onData={customerAccountCalculations.getAccounts}
      onAdd={customerAccountCalculations.addAccount as any}
      onEdit={(customer, value) =>
        customerAccountCalculations.updateAccount({ ...customer, ...value })
      }
      onDelete={({ _id }) => customerAccountCalculations.deleteAccount(_id)}
      form={Form}
    />
  );
}
