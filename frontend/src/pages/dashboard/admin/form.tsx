import {
  ProFormDigit,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { ROLE_TAG_PROPS } from ".";
import { FormProps } from "@/components/table";
import { Schema as AdminSchema } from "@/api/admin";
import TableForm from "@/components/table-form";

function formText<T>(
  name: string,
  label: string,
  value?: T,
  rules: any[] = [],
  description?: string
) {
  return (
    <ProFormText
      name={name}
      label={label}
      initialValue={value}
      required
      width="sm"
      rules={rules}
      extra={description}
    />
  );
}
function formSelect<T>(
  name: string,
  options: { value: any; label: string }[],
  fieldProps: any,
  label: string,
  value?: T,
  rules: any[] = []
) {
  return (
    <ProFormSelect
      name={name}
      label={label}
      options={options}
      fieldProps={fieldProps}
      initialValue={value}
      rules={rules}
      width="sm"
      required
    />
  );
}

export default function AdminForm({
  value,
  open,
  onFinish,
  onCancel,
}: FormProps<AdminSchema>) {
  return (
    <TableForm
      onFinish={onFinish}
      onCancel={onCancel}
      open={open}
      title="Системд нэвтрэх бүртгэл үүсгэх"
    >
      <ProFormGroup>
        {formText("lastName", "Овог", value?.lastName)}
        {formText("firstName", "Нэр", value?.firstName)}
      </ProFormGroup>
      <ProFormGroup>
        {formSelect(
          "role",
          Object.entries(ROLE_TAG_PROPS).map(([value, { text }]) => ({
            label: text,
            value,
          })),
          {},
          "Үүрэг",
          value?.role
        )}
        {formText(
          "registrationNumber",
          "Регистрийн дугаар",
          value?.registrationNumber
        )}
      </ProFormGroup>
      <ProFormGroup>
        <ProFormDigit
          name="age"
          label="Нас"
          initialValue={value?.age}
          rules={[{ required: true, message: "Заавал бөглөнө үү" }]}
          width="sm"
        />
        {formSelect(
          "gender",
          [
            { value: "M", label: "Эр" },
            { value: "F", label: "Эм" },
            { value: "O", label: "Бусад" },
          ],
          {},
          "Хүйс",
          value?.gender
        )}
      </ProFormGroup>
      <ProFormGroup>
        {formText(
          "email",
          "И-мэйл",
          value?.email,
          [{ type: "email" }],
          "Уг мэйл-ээр нэвтрэх эрх үүснэ."
        )}
        {formText("phoneNumber", "Утасны дугаар", value?.phoneNumber)}
      </ProFormGroup>
      <ProFormText.Password
        label="Системд нэвтрэх нууц үг"
        required
        name="password"
        rules={[{ min: 8 }]}
        width="sm"
      />
    </TableForm>
  );
}
