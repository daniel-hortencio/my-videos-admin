import { FormEvent, useEffect, useState } from "react";

import SignInLayout from "../components/Layouts/SignIn";
import InputText from "../components/Inputs/Text";

import { isValidEmail } from "../utils/inputValidations";

const SignIn = () => {
  const [email, setEmail] = useState("");

  const [areValidData, setAreValidData] = useState(false);
  const [submitInProgress, setSubmitInProgress] = useState(false);

  useEffect(() => {
    setAreValidData(isValidEmail(email));
  }, [email]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  const linksToRedirect = [
    { text: "Voltar ao sign in", href: "/" },
    { text: "Não possui cadastro?", href: "/register" },
  ];

  return (
    <SignInLayout
      onSubmit={handleSubmit}
      submitInProgress={submitInProgress}
      title="Esqueceu sua senha?"
      canSubmit={areValidData}
      buttonText="Confirmar"
      links={linksToRedirect}
    >
      <InputText
        label="Email"
        id="forgot-email"
        placeholder="yourEmail@domain.com"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </SignInLayout>
  );
};

export default SignIn;
