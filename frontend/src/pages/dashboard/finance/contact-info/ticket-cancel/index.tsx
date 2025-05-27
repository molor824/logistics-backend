import Table from "@/components/table";
import { localeColumnSorter } from "@/utils/sorter";
import { Tag } from "antd";

const STATE_TAG_PROPS: Record<string, any> = {
  NEW: {
    color: "green",
    label: "Шинээр ирсэн",
  },
  CANCEL: {
    color: "orange",
    label: "Цуцлагдсан",
  },
};
const SAMPLE_DATA = Array(100)
  .fill(null)
  .map((_, id) => ({
    id,
    date: "2024-10-20",
    ticketNumber: "410024214",
    code: "2015",
    feeName: "Хураамж",
    category: "Сунгалт олголтоор",
    requestedByCashier: "Тээврийн менежер",
    status: "NEW",
  }));
const COLUMNS = [
  {
    title: "Огноо",
    dataIndex: "date",
    sorter: localeColumnSorter("date"),
  },
  {
    title: "ЭХ тасалбарын №",
    dataIndex: "ehTicketNumber",
    sorter: localeColumnSorter("ehTicketNumber"),
  },
  {
    title: "Код",
    dataIndex: "code",
    sorter: localeColumnSorter("code"),
  },
  {
    title: "Хураамжийн нэр",
    dataIndex: "feeName",
    sorter: localeColumnSorter("feeName"),
  },
  {
    title: "Ангилал",
    dataIndex: "category",
    sorter: localeColumnSorter("category"),
  },
  {
    title: "Хүсэлт явуулсан кассир",
    dataIndex: "requestedByCashier",
    sorter: localeColumnSorter("requestedByCashier"),
  },
  {
    title: "Төлөв",
    dataIndex: "status",
    sorter: localeColumnSorter("status"),
    render: (_: any, { status }: any) => {
      const tagProps = STATE_TAG_PROPS[status];
      if (!tagProps) throw new Error(`status ${status} does not exist`);
      return <Tag color={tagProps.color}>{tagProps.label}</Tag>;
    },
  },
];
export default function TicketCancelTable() {
  return <Table columns={COLUMNS} onData={async () => SAMPLE_DATA} />;
}
