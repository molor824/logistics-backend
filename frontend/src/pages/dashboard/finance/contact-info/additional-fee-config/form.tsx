import { FormProps } from "@/components/table";
import TableForm from "@/components/table-form";
import {
  ProFormDigit,
  ProFormGroup,
  ProFormText,
} from "@ant-design/pro-components";

export default function Form({
  value,
  open,
  onCancel,
  onFinish,
}: FormProps<any>) {
  return (
    <TableForm
      title="Нэмэлт хураамж тохиргоо нэмэх"
      open={open}
      onCancel={onCancel}
      onFinish={onFinish}
    >
      <ProFormGroup>
        <ProFormText
          initialValue={value?.categoryCode}
          label="Ангилал код"
          name="categoryCode"
          required
        />
        <ProFormText
          initialValue={value?.feeCode}
          label="Хураамжийн код"
          name="feeCode"
          required
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText
          initialValue={value?.feeName}
          label="Хураамжийн нэр"
          name="feeName"
          required
        />
        <ProFormText
          initialValue={value?.measurmentUnit}
          label="Хэмжих нэгж"
          name="measurmentUnit"
          required
        />
      </ProFormGroup>
      <ProFormDigit
        label="Хураамжийн дүн"
        name="feeAmount"
        initialValue={value?.feeAmount}
        fieldProps={{ suffix: "₮" }}
        width="sm"
        required
      />
    </TableForm>
  );
}
