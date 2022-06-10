import { api } from '../api'

interface SignInDTO {
  email: string;
  password: string;
}

export const signIn = async (dto: SignInDTO) => {
  return await api.post('/sign-in', dto)
}