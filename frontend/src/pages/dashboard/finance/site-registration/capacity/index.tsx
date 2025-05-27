import Table from "@/components/table";
import { TableColumnGroupType } from "antd";

const SAMPLE_DATA = Array(100)
  .fill(null)
  .map((_, id) => ({
    id,
    arrivalDate: "2023-01-01",
    entryYear: "2023",
    arrivalDeparture: "2023-01-01",
    containerNumber: "1234567890",
    capacity: 20,
    brokerName: "TI Logistics",
    emptyOrLoaded: true,
    forSale: true,
    salePrice: 100000,
    brokerCode: "1234567890",
    locationNumber: "1234567890",
    unloadedAtYard: true,
    arrivedAtYard: true,
    unloaded: false,
    vacated: false,
    loaded: true,
    reArrivedAtYard: true,
    vacatedAfterUnload: true,
    leftAfterUnload: false,
    loadedAfterVacated: false,
    loadedAfterReturn: true,
  }));
const CAPACITY_COLUMNS: TableColumnGroupType<any>[] = [
  {
    title: "Чингэлэг",
    onHeaderCell: () => ({ style: { width: 10, overflowX: "scroll" } }),
    onCell: () => ({ style: { width: 10, overflowX: "scroll" } }),
    children: [
      {
        title: "Дөхөлт огноо",
        dataIndex: "arrivalDate",
      },
      {
        title: "Орох жил",
        dataIndex: "entryYear",
      },
      {
        title: "Ирэх Явах",
        dataIndex: "arrivalDeparture",
      },
      {
        title: "Чингэлэг дугаар",
        dataIndex: "containerNumber",
      },
      { title: "Даац", dataIndex: "capacity" },
      {
        title: "Зуучийн нэр",
        dataIndex: "brokerName",
      },
      {
        title: "Хоосон ачаатай",
        dataIndex: "emptyOrLoaded",
      },
      { title: "Зарах эсэх", dataIndex: "forSale" },
      {
        title: "Зарах үнэ",
        dataIndex: "salePrice",
      },
    ],
  },
  {
    title: "Талбайн бүртгэл",
    colSpan: 10,
    children: [
      {
        title: "Зууч код",
        dataIndex: "brokerCode",
      },
      {
        title: "Байр №",
        dataIndex: "locationNumber",
      },
      {
        title: "Талбайд задарсан",
        dataIndex: "unloadedAtYard",
      },
      {
        title: "Талбайд ирсэн",
        dataIndex: "arrivedAtYard",
      },
      { title: "Задарсан", dataIndex: "unloaded" },
      { title: "Суларсан", dataIndex: "vacated" },
      { title: "Ачилт хийсэн", dataIndex: "loaded" },
      {
        title: "Талбайд ирсэн",
        dataIndex: "reArrivedAtYard",
      },
      {
        title: "Задарснаас хойш суларсан",
        dataIndex: "vacatedAfterUnload",
      },
      {
        title: "Задарснаас хойш талбайгаас явсан",
        dataIndex: "leftAfterUnload",
      },
      {
        title: "Суларснаас хойш ачилт хийсэн",
        dataIndex: "loadedAfterVacated",
      },
      {
        title: "Буцаж ирснээс хойш ачилт хийсэн",
        dataIndex: "loadedAfterReturn",
      },
    ],
  },
];

export default function CapacityTable() {
  return (
    <Table columns={CAPACITY_COLUMNS as any} onData={async () => SAMPLE_DATA} />
  );
}
