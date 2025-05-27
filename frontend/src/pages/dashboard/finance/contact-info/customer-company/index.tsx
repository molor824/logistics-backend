import Table from "@/components/table";
import { Switch } from "antd";
import CustomerCompanyForm from "./form";
import { localeColumnSorter, numberColumnSorter } from "@/utils/sorter";
import { customerCompanies } from "@/api/finance/contact-info";

const COLUMNS = [
  {
    title: "Товчлол",
    dataIndex: "abbreviation",
    sorter: localeColumnSorter("abbreviation"),
  },
  {
    title: "Компаний нэр",
    dataIndex: "companyName",
    sorter: localeColumnSorter("companyName"),
  },
  {
    title: "Зууч эсэх",
    dataIndex: "isBroker",
    render: (_: any, record: any) => (
      <Switch checked={record.isBroker} disabled />
    ),
    sorter: numberColumnSorter("isBroker"),
  },
  {
    title: "Данс",
    dataIndex: "account",
    sorter: localeColumnSorter("account"),
  },
  {
    title: "Харилцах дугаар",
    dataIndex: "contactNumber",
    sorter: localeColumnSorter("contactNumber"),
  },
];

export default function CustomerCompanyTable() {
  return (
    <Table
      columns={COLUMNS}
      onData={customerCompanies.get}
      onAdd={customerCompanies.post as any}
      onEdit={(value, newValue) =>
        customerCompanies.put({ ...value, ...newValue })
      }
      onDelete={({ _id }) => customerCompanies.del(_id)}
      form={CustomerCompanyForm}
    />
  );
}
