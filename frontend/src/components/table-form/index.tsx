import { ModalForm } from "@ant-design/pro-components";
import { FormProps } from "../table";
import { PropsWithChildren } from "react";

type Props = Omit<FormProps<any>, "value"> & {
  title: string;
  submitText?: string;
  cancelText?: string;
};
export default function TableForm({
  open,
  onCancel,
  onFinish,
  title,
  submitText = "Хадгалах",
  cancelText = "Болих",
  children,
}: PropsWithChildren<Props>) {
  return (
    <ModalForm
      onFinish={onFinish}
      onOpenChange={(open) => !open && onCancel?.()}
      open={open}
      modalProps={{
        style: { maxWidth: "max-content" },
      }}
      title={
        <div>
          {title}
          <div className="mt-4 w-[calc(100%+46px)] translate-x-[-23px] h-[1px] bg-gray-300" />
        </div>
      }
      submitter={{
        searchConfig: {
          submitText: submitText,
          resetText: cancelText,
        },
      }}
    >
      {children}
    </ModalForm>
  );
}
