import { FormProps } from "@/components/table";
import TableForm from "@/components/table-form";
import {
  ProFormDigit,
  ProFormGroup,
  ProFormText,
} from "@ant-design/pro-components";

export default function Form(props: FormProps<any>) {
  const { value } = props;
  return (
    <TableForm {...props} title="Дансны зузаатгал нэмэх">
      <ProFormGroup>
        <ProFormText
          initialValue={value?.account}
          name="account"
          label="Данс"
          width="sm"
          required
        />
        <ProFormText
          initialValue={value?.customerName}
          name="customerName"
          label="Харилцагчийн нэр"
          width="sm"
          required
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormDigit
          initialValue={value?.openingBalance}
          name="openingBalance"
          label="Эхний үлдэгдэл"
          fieldProps={{
            suffix: "₮",
          }}
          width="sm"
          required
        />
        <ProFormDigit
          initialValue={value?.closingBalance}
          name="closingBalance"
          label="Эцсийн үлдэгдэл"
          fieldProps={{
            suffix: "₮",
          }}
          width="sm"
          required
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormDigit
          initialValue={value?.debit}
          name="debit"
          label="Дебит"
          width="sm"
          required
        />
        <ProFormDigit
          initialValue={value?.credit}
          name="credit"
          label="Кредит"
          width="sm"
          required
        />
      </ProFormGroup>
    </TableForm>
  );
}
