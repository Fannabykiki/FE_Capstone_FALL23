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

  const { refetch: refetchStatus } = useQuery({
    queryKey: [taskApi.getTaskStatusKey, projectId],
    queryFn: ({ signal }) => taskApi.getTaskStatus(signal, projectId!),
    initialData: [],
    enabled: Boolean(projectId),
    staleTime: 60000,
  });

  useEffect(() => {
    if (projectId) {
      refetchStatus();
    }
  }, [projectId, refetchStatus]);

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
          : paths.dashboard;

        navigate({ pathname: redirectPath, search: location.search });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, requireAuth, isAuthenticated, userInfo?.isAdmin]);

  if ((isAuthenticated && userInfo) || !requireAuth) {
    return <Component {...props} />;
  }
  return null;
}
