import { useRequest } from "ahooks";
import { ProForm, ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { useNavigate } from "react-router";
import { LoginResponseError } from "@/api/errors";
import { auth } from "@/api";
import { useUser } from "@/providers/user";

export default function LoginPage() {
  const navigate = useNavigate();
  const { refresh } = useUser();
  const { runAsync, loading } = useRequest(
    async (value) => {
      await auth.login(value);
      message.success("Амжилттай нэвтэрлээ");
      refresh();
      navigate("/");
    },
    {
      manual: true,
      onError: (e) => {
        switch (e.message) {
          case LoginResponseError.NotFound:
            message.error("И-мэйл эсвэл нууц үг буруу байна");
            break;
          default:
            message.error(`Unknown error ${e.message}`);
            console.error(e);
        }
      },
    }
  );

  return (
    <>
      <ProForm
        layout="vertical"
        onFinish={runAsync}
        disabled={loading}
        submitter={{
          render({ submit }) {
            return (
              <Button type="primary" htmlType="submit" onClick={submit}>
                Нэвтрэх
              </Button>
            );
          },
        }}
      >
        <ProFormGroup title="Нэвтрэх" direction="vertical">
          <ProFormText
            rules={[{ required: true }, { type: "email" }]}
            name="email"
            label={"И-мэйл"}
          />
          <ProFormText.Password
            name="password"
            label={"Нууц үг"}
            rules={[
              {
                required: true,
              },
            ]}
          />
        </ProFormGroup>
      </ProForm>
    </>
  );
}
