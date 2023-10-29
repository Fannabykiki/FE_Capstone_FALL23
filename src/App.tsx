import { AuthContext } from "@/context/Auth";
// import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { IAuthState } from "./interfaces/shared/state";
import Routers from "./routers";

const checkTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  // const tokenInfo = jwtDecode(token);
  // const currentDate = new Date();
  // if (currentDate >= new Date(tokenInfo.exp * 1000)) {
  //   localStorage.removeItem("token");
  //   return false;
  // }
  return true;
};

function App() {
  const [authenticate, setAuthenticate] = useState<IAuthState>({
    isAuthenticated: false,
    userInfo: null,
  });

  useEffect(() => {
    const isTokenValid = checkTokenValid();
    setAuthenticate({ isAuthenticated: isTokenValid, userInfo: null });
  }, []);

  useEffect(() => {
    if (authenticate.isAuthenticated) {
      // Get profile
    }
  }, [authenticate.isAuthenticated]);

  return (
    <div>
      <AuthContext.Provider value={{ ...authenticate, setAuthenticate }}>
        <Routers />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
