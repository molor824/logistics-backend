import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import MainRoutes from "@/routes";
import DefaultConfigProvider from "@/providers/default-config";
import UserProvider from "./providers/user";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DefaultConfigProvider>
      <UserProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </UserProvider>
    </DefaultConfigProvider>
  </StrictMode>
);
