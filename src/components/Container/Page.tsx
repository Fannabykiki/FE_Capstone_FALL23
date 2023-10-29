import { AuthContext } from "@/context/Auth";
import { checkTokenValid } from "@/utils/common";
import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  useEffect(() => {
    document.title = `Dev Tasker - ${title}`;
  }, [title]);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      const isTokenValid = checkTokenValid();
      if (!isTokenValid && requireAuth) {
        navigate("/login");
      }
    }
  }, [location, navigate, requireAuth, isAuthenticated]);

  if (isAuthenticated || !requireAuth) {
    return <Component {...props} />;
  }
  return null;
}
