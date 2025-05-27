import { Button } from "antd";
import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import TableForm from "@/components/table-form";
import { ProFormText } from "@ant-design/pro-components";

export default function ChangePasswordForm() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        icon={<AiFillLock />}
        type="link"
        size="small"
        onClick={() => setModalOpen(true)}
      >
        Пассворд өөрчлөх
        <TableForm
          title="Пассворд өөрчлөх"
          onCancel={() => setModalOpen(false)}
          onFinish={async (value) => console.log(value)}
          open={modalOpen}
        >
          <ProFormText
            label="Хуучин пассворд"
            name="previousPassword"
            placeholder="Хуучин пассворд оруулна уу"
            required
          />
          <ProFormText
            label="Шинэ пассворд"
            name="newPassword"
            placeholder="Шинэ пассворд оруулна уу"
            required
            rules={[
              {
                min: 4,
              },
            ]}
          />
        </TableForm>
      </Button>
    </>
  );
}
