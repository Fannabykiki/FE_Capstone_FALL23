import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useLocation,
  useNavigate,
  matchRoutes,
  useParams,
} from "react-router-dom";

import { adminPaths, paths, userPaths } from "@/routers/paths";
import { checkTokenValid } from "@/utils/common";
import { useAuthContext } from "@/context/Auth";
import { taskApi } from "@/utils/api/task";

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
  const { isAuthenticated, userInfo } = useAuthContext();

  const navigate = useNavigate();

  const location = useLocation();

  const { projectId } = useParams();

  useQuery({
    queryKey: [taskApi.getTaskStatusKey, projectId],
    queryFn: ({ signal }) => taskApi.getTaskStatus(signal, projectId!),
    initialData: [],
    enabled: Boolean(projectId),
    staleTime: Infinity,
  });

  useEffect(() => {
    document.title = `Dev Tasker - ${title}`;
  }, [title]);

  useEffect(() => {
    if (!isAuthenticated) {
      const isTokenValid = checkTokenValid();
      if (!isTokenValid && requireAuth) {
        navigate("/login");
      }
    } else {
      if (userInfo?.isAdmin) {
        navigate({
          pathname: matchRoutes(
            Object.values(adminPaths).map((path) => ({ path })),
            location
          )
            ? location.pathname
            : paths.admin.index,
          search: location.search,
        });
      } else {
        navigate({
          pathname: matchRoutes(
            Object.values(userPaths).map((path) => ({ path })) as {
              path: string;
            }[],
            location
          )
            ? location.pathname
            : paths.dashboard,
          search: location.search,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, requireAuth, isAuthenticated, userInfo?.isAdmin]);

  if ((isAuthenticated && userInfo) || !requireAuth) {
    return <Component {...props} />;
  }
  return null;
}
