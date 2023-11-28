import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, matchRoutes } from "react-router-dom";

import { adminPaths, paths, userPaths } from "@/routers/paths";
import { checkTokenValid } from "@/utils/common";
import { useAuthContext } from "@/context/Auth";

interface Props {
  Component: React.FunctionComponent;
  title: string;
  requireAuth?: boolean;
}

export default function PageContainer({
  Component,
  title,
  requireAuth = true,
  ...props
}: Props) {
  const [mounted, setMounted] = useState(false);

  const { isAuthenticated, userInfo } = useAuthContext();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    document.title = `Dev Tasker - ${title}`;
  }, [title]);

  useEffect(() => {
    if (!isAuthenticated) {
      const isTokenValid = checkTokenValid();
      if (!isTokenValid && requireAuth) {
        navigate(paths.login, {
          state: {
            from: location.pathname,
            search: location.search,
          },
          replace: true,
        });
      }
    } else {
      if (userInfo?.isAdmin) {
        const redirectPath = matchRoutes(
          Object.values(adminPaths).map((path) => ({ path })),
          location
        )
          ? location.pathname
          : paths.admin.index;

        navigate({ pathname: redirectPath, search: location.search });
      } else {
        const redirectPath = matchRoutes(
          Object.values(userPaths).map((path) => ({ path })) as {
            path: string;
          }[],
          location
        )
          ? location.pathname
          : paths.user;

        navigate({ pathname: redirectPath, search: location.search });
      }
    }
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, requireAuth, isAuthenticated, userInfo?.isAdmin]);

  if (mounted && ((isAuthenticated && userInfo) || !requireAuth)) {
    return <Component {...props} />;
  }
  return null;
}
