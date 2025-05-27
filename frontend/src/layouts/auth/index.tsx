import { image } from "@/resources";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div
      className="w-screen h-screen object-fill"
      style={{ backgroundImage: `url(${image.AuthBackground})` }}
    >
      <div className="w-full h-full max-w-[600px] ml-auto overflow-y-scroll p-8 bg-white flex flex-col gap-4 justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
