type ErrorProperty = {
  INCORRECT_USERNAME_OR_PASSWORD: string;
  INTERNAL_SERVER_ERROR: string;
}

interface IErrors {
  pt: ErrorProperty;
  en: ErrorProperty;
  es: ErrorProperty;
}

export const Errors: IErrors = {
  pt: {
    INCORRECT_USERNAME_OR_PASSWORD: "Nome ou senha informados estão incorretos",
    INTERNAL_SERVER_ERROR: "Estamos com problemas nos nossos servidores."
  },
  en: {
    INCORRECT_USERNAME_OR_PASSWORD: "Name or password entered is incorrect",
    INTERNAL_SERVER_ERROR: "We are having problems with our servers."
  },
  es: {
    INCORRECT_USERNAME_OR_PASSWORD: "Nombre o contraseña ingresados ​​son incorrectos",
    INTERNAL_SERVER_ERROR: "Estamos com problemas en nuestros servidores."
  }

}