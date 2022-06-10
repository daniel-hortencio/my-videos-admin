import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import SignInLayout from "../components/Layouts/SignIn";
import InputText from "../components/Inputs/Text";

import { isValidEmail, isValidPassword } from "../utils/inputValidations";
//import { apiBFF } from "../modules/BFF/services/apiBFF";

import { registerUser } from "../services/registerUser";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");

  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [areValidData, setAreValidData] = useState(false);

  const { push } = useRouter();

  useEffect(() => {
    setAreValidData(
      !!name &&
        isValidEmail(email) &&
        isValidPassword(password) &&
        password === confirmPassword
    );
  }, [name, email, password, confirmPassword]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    registerUser
      .create({ name, email, password })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Você se cadastrou com sucesso!",
          showConfirmButton: true,
          confirmButtonText: "Voltar para o Login",
        }).then(({ isConfirmed }) => {
          if (isConfirmed) {
            push("/");
          }
        });
      })
      .catch((err) => console.log({ err }));
  }

  const linksToRedirect = [
    { text: "Já possui cadastro?", href: "/" },
    //{ text: "Esqueceu sua senha?", href: "/forgot-password" },
  ];

  return (
    <SignInLayout
      onSubmit={handleSubmit}
      submitInProgress={submitInProgress}
      title="Cadastre-se"
      canSubmit={areValidData}
      buttonText="Cadastrar"
      links={linksToRedirect}
    >
      <InputText
        label="Nome"
        id="register-name"
        placeholder="John Doe"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputText
        label="Email"
        id="register-email"
        placeholder="yourEmail@domain.com"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputText
        label="Senha"
        id="register-password"
        placeholder="asd123/*-QWE456"
        type="password"
        value={password}
        onChange={(e) => setPasword(e.target.value)}
      />
      <InputText
        label="Confirmar Senha"
        id="register-confirm-password"
        placeholder="asd123/*-QWE456"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPasword(e.target.value)}
      />
    </SignInLayout>
  );
};

export default SignIn;
