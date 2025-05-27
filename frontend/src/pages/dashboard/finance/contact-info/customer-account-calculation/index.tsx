import AccountTable from "./account-table";
import TransactionTable from "./transaction-table";
import Tabs from "@/components/tabs";

const TAB_ITEMS = [
  {
    label: "Данс",
    value: "account",
    children: <AccountTable />,
  },
  {
    label: "Гүйлгээ",
    value: "transaction",
    children: <TransactionTable />,
  },
];

export default function CustomerAccountCalculationTable() {
  return (
    <div className="bg-white rounded-[8px]">
      <Tabs
        tabs={TAB_ITEMS}
        radioGroupProps={{
          style: {
            padding: "16px",
          },
        }}
      />
    </div>
  );
}
