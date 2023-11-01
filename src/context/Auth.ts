import { IAuthState } from "@/interfaces/shared/state";
import React, { Dispatch, SetStateAction, useContext } from "react";

interface IAuthContext extends IAuthState {
  setAuthenticate: Dispatch<SetStateAction<IAuthState>>;
}

export const AuthContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  userInfo: null,
  setAuthenticate: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
