import Table from "@/components/table";
import { localeColumnSorter, numberColumnSorter } from "@/utils/sorter";
import { Select, TableColumnProps } from "antd";

const SAMPLE_DATA = Array(100)
  .fill(null)
  .map((_, id) => ({
    id,
    status: "2024/10/20",
    type: 1001 + id,
    receiptNumber: 21000,
    date: 50000,
    cash: 60000,
    nonCash: 60000,
    totalPayment: 60000,
    craneFee: 60000,
    roadUsage: 60000,
    cargoStorage: 60000,
    containerWagonCleaning: 60000,
    wagonUsage: 60000,
    tlWagonUsage: 60000,
    customsInspection: 60000,
    autoLoader: 60000,
    vehicleEntry: 60000,
  }));
const SAMPLE_COLUMNS: TableColumnProps[] = [
  { title: "Төлөв", dataIndex: "status", sorter: localeColumnSorter("status") },
  { title: "Төрөл", dataIndex: "type", sorter: localeColumnSorter("type") },
  {
    title: "Баримт дугаар",
    dataIndex: "receiptNumber",
    sorter: numberColumnSorter("receiptNumber"),
  },
  { title: "Огноо", dataIndex: "date", sorter: numberColumnSorter("date") },
  {
    title: "Нийт төлсөн",
    dataIndex: "totalPaid",
    sorter: numberColumnSorter("totalPaid"),
  },
  { title: "Бэлнээр", dataIndex: "cash", sorter: numberColumnSorter("cash") },
  {
    title: "Бэлэн бусаар",
    dataIndex: "nonCash",
    sorter: numberColumnSorter("nonCash"),
  },
  {
    title: "Нийт төлбөр",
    dataIndex: "totalPayment",
    sorter: numberColumnSorter("totalPayment"),
  },
  {
    title: "Краны хөлс",
    dataIndex: "craneFee",
    sorter: numberColumnSorter("craneFee"),
  },
  {
    title: "Зам талбай ашиглалт",
    dataIndex: "roadUsage",
    sorter: numberColumnSorter("roadUsage"),
  },
  {
    title: "Ачаа хадгаламж",
    dataIndex: "cargoStorage",
    sorter: numberColumnSorter("cargoStorage"),
  },
  {
    title: "Чингэлэг вагон цэвэрлэгээ",
    dataIndex: "containerWagonCleaning",
    sorter: numberColumnSorter("containerWagonCleaning"),
  },
  {
    title: "Вагон ашиглалт",
    dataIndex: "wagonUsage",
    sorter: numberColumnSorter("wagonUsage"),
  },
  {
    title: "TL вагон ашиглалт",
    dataIndex: "tlWagonUsage",
    sorter: numberColumnSorter("tlWagonUsage"),
  },
  {
    title: "Гаалийн үзлэг",
    dataIndex: "customsInspection",
    sorter: numberColumnSorter("customsInspection"),
  },
  {
    title: "Авто ачигч",
    dataIndex: "autoLoader",
    sorter: numberColumnSorter("autoLoader"),
  },
  {
    title: "Машин оролт",
    dataIndex: "vehicleEntry",
    sorter: numberColumnSorter("vehicleEntry"),
  },
];
export default function ReportPage() {
  return (
    <Table
      columns={SAMPLE_COLUMNS}
      onData={async () => SAMPLE_DATA}
      rightHeader={
        <Select
          defaultValue="all"
          style={{ width: 200 }}
          options={[
            { label: "Бүгд", value: "all" },
            { label: "Сунгалт авто гаралтаар", value: "autoExitExtension" },
            { label: "Олголт", value: "issuance" },
            { label: "Сунгалт олголтоор", value: "issuanceExtension" },
            { label: "Ведомость", value: "register" },
            { label: "Авто гаралт", value: "autoExit" },
          ]}
        />
      }
    />
  );
}
