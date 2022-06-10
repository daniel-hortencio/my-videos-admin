import axios from 'axios'
import router from 'next/router'

import { recoverUserAuthCookies, destroyUserAuthCookies, updateToken } from '../utils/cookies'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    Accept: 'application/json',
  },
})

api.interceptors.request.use(config => {

  const cookies = recoverUserAuthCookies()

  const user = cookies?.user.id
  const token = cookies?.token
  const refreshToken = cookies?.refreshToken.id

  config.headers.user = user;
  config.headers.token = token;
  config.headers['refresh-token'] = refreshToken;

  return config
})

api.interceptors.response.use(
  (response) => {
    const { newToken } = response.data
    if (newToken) {
      updateToken(newToken)
    }

    return response
  },
  (error) => {
    const { status, data } = error.response

    if (status === 401 && data.message === "REFRESH_TOKEN_EXPIRED") {
      destroyUserAuthCookies()
      router.push('/dashboard/sessao-expirou')

      return;
    }

    return error
  }
)
