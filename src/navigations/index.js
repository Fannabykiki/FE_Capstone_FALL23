import React, { useCallback } from "react";
import { values } from "lodash";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  matchRoutes,
} from "react-router-dom";

import { privateRoutes, publicRoutes, routes } from "./routes";
import { useSelector } from "react-redux";
import { authSelector } from "../containers/app/selectors";
import UserLayout from "../pages/User/HomeUser/views/UserLayout";
import HomeAdminLayout from "../pages/Admin/HomeAdmin/views/HomeAdmin";
import ProfileLayout from "../components/Layout/ProfileLayout";

const Navigations = () => {
  const { isLogin, isAdmin } = useSelector(authSelector);

  const renderRoute = useCallback(
    (route, isPrivate) => {
      if (!route || !values(route)) {
        return undefined;
      }
      return values(route).map(
        ({ route: subRoute, element, ...props }, index) => (
          <Route
            key={index}
            {...props}
            element={
              <GuardRoute
                isLogin={!!isLogin}
                isPrivate={!!isPrivate}
                redirectPath={
                  isPrivate
                    ? routes.Login.path
                    : isAdmin
                    ? routes.AdminDashboard.path
                    : routes.User.path
                }
              >
                {element}
              </GuardRoute>
            }
            children={subRoute}
          />
        )
      );
    },
    [isLogin, isAdmin]
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {renderRoute(publicRoutes)}
          {renderRoute(privateRoutes, true)}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const GuardRoute = ({ children, isLogin, isPrivate, redirectPath }) => {
  const location = useLocation();

  if (isPrivate && isLogin) {
    if (
      matchRoutes(
        [
          routes.AdminDashboard,
          routes.AdminUser,
          routes.AdminView,
          routes.AdminProject,
        ],
        location
      )
    ) {
      return <HomeAdminLayout>{children}</HomeAdminLayout>;
    } else if (
      matchRoutes(
        [
          routes.UserOverViewSummary,
          routes.UserOverViewDashboard,
          routes.UserProjectId,
        ],
        location
      )
    ) {
      return <UserLayout>{children}</UserLayout>;
    } else if (
      matchRoutes([routes.ChangePassword, routes.UserProfile], location)
    ) {
      return <ProfileLayout>{children}</ProfileLayout>;
    }

    return children;
  } else if (!isPrivate && !isLogin) {
    return children;
  } else {
    return (
      <Navigate
        to={redirectPath}
        state={{
          from: location.pathname,
          search: location.search,
        }}
        replace
      />
    );
  }
};

export default Navigations;
