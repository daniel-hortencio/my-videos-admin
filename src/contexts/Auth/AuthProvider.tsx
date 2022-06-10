import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { RefreshTokenTypes, UserTypes } from "../../types";
import { AuthContext, IAuthContext } from "./AuthContext";

import {
  saveUserAuthInCookies,
  recoverUserAuthCookies,
  destroyUserAuthCookies,
} from "../../utils/cookies";

interface AuthProviderProps {
  children: ReactNode;
}

export interface IAuthUser {
  user: UserTypes;
  refreshToken: RefreshTokenTypes;
  token: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<IAuthUser>({} as IAuthUser);
  const { push } = useRouter();

  function setUserAuth(
    user: UserTypes,
    token: string,
    refreshToken: RefreshTokenTypes
  ) {
    destroyUserAuthCookies();
    saveUserAuthInCookies({ user, refreshToken, token });
    setAuth({ user, refreshToken, token });
  }

  function signOut() {
    destroyUserAuthCookies();
    setAuth({} as IAuthUser);
    push("/");
  }

  useEffect(() => {
    const recoveredUserAuth = recoverUserAuthCookies();

    if (recoveredUserAuth) {
      setAuth(recoveredUserAuth as IAuthUser);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        setUserAuth,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
