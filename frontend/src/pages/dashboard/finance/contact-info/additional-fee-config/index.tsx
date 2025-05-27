import Table from "@/components/table";
import Form from "./form";
import { localeColumnSorter, numberColumnSorter } from "@/utils/sorter";
import { finance } from "@/api";

const COLUMNS = [
  {
    title: "Ангилал код",
    dataIndex: "categoryCode",
    sorter: numberColumnSorter("categoryCode"),
  },
  {
    title: "Хураамжийн код",
    dataIndex: "feeCode",
    sorter: numberColumnSorter("feeCode"),
  },
  {
    title: "Хураамжийн нэр",
    dataIndex: "feeName",
    sorter: localeColumnSorter("feeName"),
  },
  {
    title: "Хэмжих нэгж",
    dataIndex: "measurmentUnit",
    sorter: localeColumnSorter("measurmentUnit"),
  },
  {
    title: "Хураамжийн дүн",
    dataIndex: "feeAmount",
    sorter: numberColumnSorter("feeAmount"),
  },
];

export default function AdditionalFeeConfigTable() {
  return (
    <Table
      columns={COLUMNS}
      onData={finance.contactInfo.additionalFeeConfigs.getAll}
      onAdd={finance.contactInfo.additionalFeeConfigs.create as any}
      onEdit={(old, $new) =>
        finance.contactInfo.additionalFeeConfigs.update({ ...old, ...$new })
      }
      onDelete={({ _id }) =>
        finance.contactInfo.additionalFeeConfigs.remove(_id)
      }
      form={Form}
    />
  );
}
