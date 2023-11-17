import { AuthContext } from "@/context/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { IAuthState } from "./interfaces/shared/state";
import { JwtTokenInfo } from "./interfaces/user";
import Routers from "./routers";
import { userApi } from "./utils/api/user";
import { taskApi } from "./utils/api/task";

const checkTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const tokenInfo = jwtDecode<JwtTokenInfo>(token);
  const currentDate = new Date();
  if (currentDate >= new Date(tokenInfo.exp * 1000)) {
    localStorage.removeItem("token");
    return false;
  }
  return true;
};

function App() {
  const [authenticate, setAuthenticate] = useState<IAuthState>({
    isAuthenticated: false,
    userInfo: null,
  });

  const { mutate: getProfile } = useMutation({
    mutationFn: userApi.getProfile,
    mutationKey: [userApi.getProfileKey],
    onSuccess: (data) => {
      setAuthenticate({ ...authenticate, userInfo: data });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  useQuery({
    queryKey: [taskApi.getTaskTypeKey],
    queryFn: async ({ signal }) => taskApi.getTaskType(signal),
    staleTime: Infinity,
  });

  useEffect(() => {
    const isTokenValid = checkTokenValid();
    setAuthenticate({ isAuthenticated: isTokenValid, userInfo: null });
  }, []);

  useEffect(() => {
    if (authenticate.isAuthenticated) {
      getProfile();
    }
  }, [authenticate.isAuthenticated, getProfile]);

  return (
    <AuthContext.Provider
      value={{ ...authenticate, setAuthenticate, refetchProfile: getProfile }}
    >
      <Routers />
    </AuthContext.Provider>
  );
}

export default App;
