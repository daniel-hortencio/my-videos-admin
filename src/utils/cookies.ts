import { GetServerSidePropsContext, } from "next";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { IAuthUser } from "../contexts/Auth/AuthProvider";

export const saveUserAuthInCookies = (auth: IAuthUser) => {

  const { user, token, refreshToken } = auth
  setCookie(null, "MyVideos.userId", user.id, { path: '/' });
  setCookie(null, "MyVideos.userEmail", user.email, { path: '/' });
  setCookie(null, "MyVideos.userName", user.name, { path: '/' });
  setCookie(null, "MyVideos.userLanguage", user.language as string, { path: '/' });

  setCookie(null, "MyVideos.token", token, { path: '/' });

  setCookie(null, "MyVideos.refreshTokenId", refreshToken.id, { path: '/', maxAge: refreshToken.expiresIn });
}

export const updateToken = (token: string, ctx?: GetServerSidePropsContext | undefined) => {
  setCookie(ctx, "MyVideos.token", token, {
    path: '/',
  })
}

export const recoverUserAuthCookies = (ctx?: GetServerSidePropsContext | undefined) => {
  const cookies = parseCookies(ctx);

  const {
    "MyVideos.userId": userId,
    "MyVideos.userEmail": userEmail,
    "MyVideos.userName": userName,
    "MyVideos.userLanguage": userLanguage,
    "MyVideos.token": token,
    "MyVideos.refreshTokenId": refreshTokenId
  } = cookies

  if (userId && userEmail && userName && token && refreshTokenId) {
    return {
      user: {
        id: userId,
        email: userEmail,
        name: userName,
        language: userLanguage
      },
      token,
      refreshToken: {
        userId: userId,
        id: refreshTokenId
      }
    }
  }

  return undefined
}

export const destroyUserAuthCookies = () => {
  destroyCookie(null, "MyVideos.userId", { path: '/' })
  destroyCookie(null, "MyVideos.userEmail", { path: '/' })
  destroyCookie(null, "MyVideos.userName", { path: '/' })
  destroyCookie(null, "MyVideos.userLanguage", { path: '/' })
  destroyCookie(null, "MyVideos.token", { path: '/' })
  destroyCookie(null, "MyVideos.refreshTokenId", { path: '/' })
}