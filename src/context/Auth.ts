import { IAuthState } from "@/interfaces/shared/state";
import React, { Dispatch, SetStateAction, useContext } from "react";

interface IAuthContext extends IAuthState {
  setAuthenticate: Dispatch<SetStateAction<IAuthState>>;
  refetchProfile: VoidFunction;
}

export const AuthContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  userInfo: null,
  setAuthenticate: () => {},
  refetchProfile: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
