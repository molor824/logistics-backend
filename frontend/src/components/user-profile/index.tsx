import { useUser } from "@/providers/user";
import { Button, Dropdown, Skeleton } from "antd";
import {
  AiOutlineDown,
  AiOutlineUser,
  AiOutlineUserDelete,
} from "react-icons/ai";
import ChangePasswordForm from "./change-password-form";
import { useRequest } from "ahooks";
import { auth } from "@/api";
import { useNavigate } from "react-router";

export default function UserProfile() {
  const { user, loading, refresh } = useUser();
  const navigate = useNavigate();
  const { run: logout } = useRequest(
    async () => {
      await auth.logout();
      refresh();
      navigate("/auth/login");
    },
    {
      manual: true,
      onError: (e) => {
        console.error(e);
      },
    }
  );

  if (loading) return <Skeleton avatar loading title></Skeleton>;
  if (!user) return <Button type="default">Бүртгүүлэх</Button>;

  const menuItems = [
    {
      label: (
        <Button icon={<AiOutlineUser />} type="link" size="small">
          Профайл
        </Button>
      ),
      key: "profile",
    },
    {
      label: <ChangePasswordForm />,
      key: "change-password",
    },
    {
      label: (
        <Button
          icon={<AiOutlineUserDelete />}
          type="link"
          size="small"
          danger
          onClick={logout}
        >
          Бүртгэл гаргах
        </Button>
      ),
      key: "logout",
    },
  ];
  let role = "";

  switch (user.role) {
    case "ADMIN":
      role = "Админ";
      break;
    case "FINANCE":
      role = "Санхүү";
      break;
    default:
      throw new Error(`Role ${user.role} does not exist`);
  }

  return (
    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
      <Button type="link" className="my-auto">
        <div className="flex gap-4 text-white items-center">
          <div className="flex flex-col gap-2 text-sm/2">
            <p>{`${user.lastName} ${user.firstName}`}</p>
            <p className="opacity-70">{role}</p>
          </div>
          <AiOutlineDown />
        </div>
      </Button>
    </Dropdown>
  );
}
