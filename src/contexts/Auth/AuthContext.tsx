import { createContext } from "react";

import { RefreshTokenTypes, UserTypes } from "../../types";

export interface IAuthContext {
  user: UserTypes;
  setUserAuth: (
    user: UserTypes,
    token: string,
    refreshToken: RefreshTokenTypes
  ) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as IAuthContext);
