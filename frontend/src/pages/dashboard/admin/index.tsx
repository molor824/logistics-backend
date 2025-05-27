import { admin, enums } from "@/api";
import Table from "@/components/table";
import { PageLoading, ProColumnType } from "@ant-design/pro-components";
import { Tag } from "antd";
import AdminForm from "./form";
import { useUser } from "@/providers/user";
import Title from "antd/es/typography/Title";
import { localeColumnSorter } from "@/utils/sorter";

export const ROLE_TAG_PROPS: Record<string, { color: string; text: string }> = {
  [enums.RoleColumn.VehicleManager]: {
    color: "blue",
    text: "Тээврийн менежер",
  },
  [enums.RoleColumn.Finance]: { color: "red", text: "Санхүү" },
  [enums.RoleColumn.Cashier]: { color: "orange", text: "Кассир" },
  [enums.RoleColumn.Admin]: { color: "gray", text: "Админ" },
};

const COLUMNS: ProColumnType<any>[] = [
  {
    title: "Овог",
    dataIndex: "lastName",
    sorter: localeColumnSorter("surname"),
  },
  {
    title: "Нэр",
    dataIndex: "firstName",
    sorter: localeColumnSorter("name"),
  },
  {
    title: "Үүрэг",
    dataIndex: "role",
    sorter: localeColumnSorter("role"),
    render: (_, { role }) => {
      const props = ROLE_TAG_PROPS[role];
      if (!props) throw new Error(`Role ${role} not found!`);
      return <Tag color={props.color}>{props.text}</Tag>;
    },
  },
  {
    title: "Регистрийн дугаар",
    dataIndex: "registrationNumber",
    sorter: localeColumnSorter("registrationNumber"),
  },
  {
    title: "Нас",
    dataIndex: "age",
    sorter: ({ age: a }, { age: b }) => a - b,
  },
  {
    title: "Хүйс",
    dataIndex: "gender",
    sorter: localeColumnSorter("gender"),
    render: (_, { gender }) => (
      <p>{gender === "M" ? "Эр" : gender === "F" ? "Эм" : "Бусад"}</p>
    ),
  },
  {
    title: "Утасны дугаар",
    dataIndex: "phoneNumber",
    sorter: localeColumnSorter("phoneNumber"),
  },
  {
    title: "И-мэйл",
    dataIndex: "email",
    sorter: localeColumnSorter("email"),
  },
  {
    title: "Бүртгэсэн огноо",
    dataIndex: "createdAt",
    sorter: localeColumnSorter("createdAt"),
  },
  {
    title: "Бүртгэсэн ажилтан",
    dataIndex: "registeredBy",
    sorter: localeColumnSorter("registeredBy"),
    render: () => <p>Админ</p>,
  },
];

export default function AdminPage() {
  const { loading, user } = useUser();

  if (loading) return <PageLoading />;
  if (!user) return <Title>Нэвтрэх боломжгүй</Title>;

  return (
    <Table
      columns={COLUMNS as any}
      onData={() => admin.get()}
      onEdit={(value, newValue) => admin.put({ ...value, ...newValue })}
      onAdd={(value) => admin.post(value as any)}
      onDelete={({ _id }) => admin.del(_id)}
      form={AdminForm}
    />
  );
}
