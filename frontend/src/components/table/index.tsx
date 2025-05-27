import { Table as AiTable, Card, TableColumnType } from "antd";
import { useRequest } from "ahooks";
import { Button, DatePicker, Input, message } from "antd";
import { FC, useState } from "react";
import { FiEdit3, FiEye } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { LuCircleMinus } from "react-icons/lu";
import { TbReload } from "react-icons/tb";

export type FormProps<T> = {
  value?: T;
  open?: boolean;
  onFinish?: (value: Record<string, any>) => Promise<void>;
  onCancel?: () => void;
};
type Props<T> = {
  columns?: TableColumnType<T>[];
  form?: FC<FormProps<T>>;
  rightHeader?: JSX.Element;
  leftHeader?: JSX.Element;
  onData?: () => Promise<T[]>;
  onDelete?: (value: T) => Promise<void>;
  onEdit?: (value: T, formValue: Record<string, any>) => Promise<void>;
  onAdd?: (value: Record<string, any>) => Promise<void>;
};
export default function Table<T extends Record<string, any>>({
  columns,
  form: FormFC,
  rightHeader,
  leftHeader,
  onDelete,
  onData,
  onEdit,
  onAdd,
}: Props<T>) {
  const [editForm, setEditForm] = useState<T | null>(null);
  const [newForm, setNewForm] = useState(false);
  const {
    loading,
    run: requestData,
    data,
  } = useRequest(async () => onData && (await onData()), {
    refreshDeps: [onData],
  });
  const { loading: deleting, run: runDelete } = useRequest(
    async (value: T) => onDelete && (await onDelete(value)),
    {
      onSuccess: requestData,
      manual: true,
      refreshDeps: [onDelete],
    }
  );
  const runForm = async (
    formPromise: Promise<void>,
    successMessage: string
  ) => {
    try {
      await formPromise;
      message.success(successMessage);
      requestData();
      setNewForm(false);
      setEditForm(null);
    } catch (e) {
      console.error(e);
      message.error("Алдаа гарлаа");
    }
  };

  return (
    <Card style={{ border: "none" }}>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          {leftHeader || (
            <div className="flex gap-4 items-center">
              <p>Нийт ({data?.length})</p>
              <DatePicker.RangePicker />
            </div>
          )}
          {rightHeader || (
            <div className="flex gap-4 items-center">
              <Input.Search placeholder="Хайх" />
              <Button
                icon={<TbReload />}
                onClick={requestData}
                loading={loading}
                className="aspect-square"
                type="default"
              />
              {FormFC && (
                <Button
                  icon={<IoMdAdd />}
                  type="default"
                  loading={loading}
                  onClick={() => setNewForm(true)}
                >
                  Нэмэх
                  <FormFC
                    open={newForm}
                    onFinish={async (value) =>
                      onAdd && (await runForm(onAdd(value), "Амжилттай нэмлээ"))
                    }
                    onCancel={() => setNewForm(false)}
                  />
                </Button>
              )}
            </div>
          )}
        </div>
        <AiTable<T>
          loading={loading}
          rowKey="_id"
          dataSource={data}
          style={{ overflowX: "scroll" }}
          columns={
            columns && [
              ...columns,
              {
                title: "Үйлдэл",
                align: "center",
                fixed: "right",
                render: (_, record) => (
                  <div className="flex gap-4 justify-center">
                    <Button icon={<FiEye />} type="default" />
                    {FormFC && (
                      <Button
                        icon={<FiEdit3 />}
                        type="default"
                        style={{ aspectRatio: 1 }}
                        onClick={() => setEditForm(record)}
                      >
                        <FormFC
                          open={editForm === record}
                          onFinish={async (value) =>
                            onEdit &&
                            (await runForm(
                              onEdit(record, value),
                              "Амжилттай өөрчиллөө"
                            ))
                          }
                          onCancel={() => setEditForm(null)}
                          value={record}
                        />
                      </Button>
                    )}
                    <Button
                      icon={<LuCircleMinus />}
                      onClick={() => runDelete(record)}
                      loading={deleting}
                      type="default"
                      className="aspect-square"
                      danger
                    />
                  </div>
                ),
              },
            ]
          }
        />
      </div>
    </Card>
  );
}
