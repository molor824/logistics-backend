import { finance } from "@/api";
import { FormProps } from "@/components/table";
import TableForm from "@/components/table-form";
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";

export default function Form(props: FormProps<any>) {
  const { value } = props;
  const { data: accounts } = useRequest(
    finance.contactInfo.customerAccountCalculations.getAccounts
  );
  return (
    <TableForm {...props} title="Дансны зузаатгал нэмэх">
      <ProFormGroup>
        <ProFormSelect
          initialValue={value?.account._id}
          options={accounts?.map((a) => ({ label: a.account, value: a._id }))}
          name="account"
          label="Данс"
          width="sm"
          required
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormDigit
          initialValue={value?.cash}
          name="cash"
          label="Бэлэн"
          fieldProps={{
            suffix: "₮",
          }}
          width="sm"
          required
        />
        <ProFormDigit
          initialValue={value?.nonCash}
          name="nonCash"
          label="Бэлэн бус"
          fieldProps={{
            suffix: "₮",
          }}
          width="sm"
          required
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText
          initialValue={value?.receipt}
          name="receipt"
          label="Баримт"
          width="sm"
          required
        />
        <ProFormText
          initialValue={value?.payer}
          name="payer"
          label="Төлөгч"
          width="sm"
          required
        />
      </ProFormGroup>
    </TableForm>
  );
}
