import Tabs from "@/components/tabs";
import CapacityTable from "./capacity";

const TAB_OPTIONS = [
  {
    value: "load-factor",
    label: "Ачаа дөхөлт",
  },
  {
    value: "capacity",
    label: "Үлдэгдэл",
    children: <CapacityTable />,
  },
  {
    value: "site-received",
    label: "Талбайд ирсэнээр",
  },
];
export default function SiteRegistrationPage() {
  return (
    <>
      <Tabs tabs={TAB_OPTIONS} defaultTab={1} />
    </>
  );
}
