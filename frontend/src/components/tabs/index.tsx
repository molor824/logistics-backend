import { ConfigProvider, Radio } from "antd";
import { ComponentProps, ReactNode, useState } from "react";

export type Tab = {
  value: string;
  label: string;
  children?: ReactNode;
};
type Props = {
  tabs: Tab[];
  defaultTab?: number;
  radioGroupProps?: ComponentProps<(typeof Radio)["Group"]>;
};
export default function Tabs({
  tabs,
  defaultTab = 0,
  radioGroupProps = {},
}: Props) {
  const [value, setValue] = useState(tabs[defaultTab].value);
  return (
    <div className="flex flex-col gap-4">
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              buttonCheckedBg: "#E6F7FF",
            },
          },
        }}
      >
        <Radio.Group
          {...radioGroupProps}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          {tabs.map(({ value: value1, label }) => (
            <Radio.Button key={value1} value={value1}>
              {label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </ConfigProvider>
      {tabs.find((tab) => tab.value === value)?.children}
    </div>
  );
}
