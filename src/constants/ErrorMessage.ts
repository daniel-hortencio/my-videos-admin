export const ErrorMessage = (errorMessage: string) => {
  const Errors = {
    INCORRECT_USERNAME_OR_PASSWORD: 'Nome ou usuário inválidos',
    DEFAULT: "Erro desconhecido"
  }

  return Errors[errorMessage as keyof typeof Errors] || Errors.DEFAULT
}