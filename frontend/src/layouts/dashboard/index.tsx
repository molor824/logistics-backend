import CurrentDate from "@/components/current-date";
import UserProfile from "@/components/user-profile";
import { useUser } from "@/providers/user";
import { PageLoading, ProLayout } from "@ant-design/pro-components";
import { Link, Navigate, Outlet, useLocation } from "react-router";
import logo from "@/assets/header-logo.png";

const ADMIN_ROUTES = [
  {
    name: "Хэрэглэгчийн бүртгэл",
    path: "/dashboard/admin",
  },
];
const FINANCE_ROUTES = [
  {
    name: "Талбайн бүртгэл",
    path: "/dashboard/site-registration",
  },
  {
    name: "Лавлах мэдээлэл",
    path: "/dashboard/contact-info",
  },
  {
    name: "Тайлан",
    path: "/dashboard/report",
  },
];
const ROUTES: Record<string, typeof ADMIN_ROUTES> = {
  ADMIN: ADMIN_ROUTES,
  FINANCE: FINANCE_ROUTES,
};
export default function DashboardLayout() {
  const { user, loading } = useUser();
  const { pathname } = useLocation();

  if (loading) {
    return <PageLoading />;
  }
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  const routes = ROUTES[user.role];
  if (!routes) {
    throw new Error(`Route not found for role ${user.role}`);
  }

  return (
    <ProLayout
      // style={{ borderRadius: "100px" }}
      fixSiderbar={true}
      siderWidth={300}
      token={{
        header: {
          colorBgHeader: "#0077F4",
          colorTextMenu: "#B3B3B3",
          colorTextMenuActive: "#fff",
          colorTextMenuSelected: "#fff",
          colorTextMenuSecondary: "#eef",
          colorHeaderTitle: "#eef",
        },
      }}
      location={{ pathname }}
      fixedHeader
      logo={logo}
      title={false}
      layout="top"
      menu={{
        type: "sub",
        request: async () => routes,
      }}
      menuItemRender={(item, dom) => <Link to={item.path!}>{dom}</Link>}
      headerRender={(_, dom: any) => (
        <div className="flex justify-between">
          <div className="flex-1">{dom}</div>
          <div className="px-4 flex gap-4">
            <CurrentDate />
            <UserProfile />
          </div>
        </div>
      )}
    >
      <Outlet />
    </ProLayout>
  );
}
