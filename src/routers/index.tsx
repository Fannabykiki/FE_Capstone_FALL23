import Dashboard from "@/features/Dashboard";
import Login from "@/features/Login";
import Register from "@/features/Register";

import { paths } from "./paths";
import { DashboardLayout, PageContainer } from "@/components";

import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.dashboard} element={<DashboardLayout />}>
          <Route
            index
            element={<PageContainer Component={Dashboard} title="Dashboard" />}
          />
        </Route>
        <Route
          path={paths.login}
          element={
            <PageContainer
              requireAuth={false}
              Component={Login}
              title="Login"
            />
          }
        />
        <Route
          path={paths.register}
          element={
            <PageContainer
              requireAuth={false}
              Component={Register}
              title="Register"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
