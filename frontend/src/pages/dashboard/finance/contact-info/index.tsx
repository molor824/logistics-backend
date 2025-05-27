import AdditionalFeeConfigTable from "./additional-fee-config";
import CustomerCompanyTable from "./customer-company";
import CustomerAccountCalculationTable from "./customer-account-calculation";
import TicketCancelTable from "./ticket-cancel";
import Tabs from "@/components/tabs";

const TAB_ITEMS = [
  {
    label: "Харилцагч компани",
    value: "customer-company",
    children: <CustomerCompanyTable />,
  },
  {
    label: "Нэмэлт хураамж тохиргоо",
    value: "additional-fee-config",
    children: <AdditionalFeeConfigTable />,
  },
  {
    label: "Харилцагчдын дансны тооцоо",
    value: "customer-account-calculation",
    children: <CustomerAccountCalculationTable />,
  },
  {
    label: "Э/Х тасалбар хүчингүй болгох",
    value: "ticket-cancel",
    children: <TicketCancelTable />,
  },
];

export default function ContactInfoPage() {
  return <Tabs tabs={TAB_ITEMS} />;
}
