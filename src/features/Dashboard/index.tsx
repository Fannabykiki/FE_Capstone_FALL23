import { useAuthContext } from "@/context/Auth";
import { paths } from "@/routers/paths";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { userInfo } = useAuthContext();

  useLayoutEffect(() => {
    if (userInfo) {
      navigate(userInfo.isAdmin ? paths.admin.index : paths.user);
    }
  }, [navigate, userInfo]);
  return <></>;
}
