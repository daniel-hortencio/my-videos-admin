import { FormEvent, useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

import SignInLayout from "../components/Layouts/SignIn";
import InputText from "../components/Inputs/Text";

import { signIn } from "../services/signIn";
import { useAuth } from "../contexts/Auth";

import { isValidEmail, isValidPassword } from "../utils/inputValidations";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { recoverUserAuthCookies } from "../utils/cookies";

import { ErrorMessage } from "../constants/ErrorMessage";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [errorCredentials, setErrorCredentials] = useState("");

  const [submitInProgress, setSubmitInProgress] = useState(false);
  const [areValidData, setAreValidData] = useState(false);

  const router = useRouter();

  const { setUserAuth } = useAuth();

  useEffect(() => {
    setAreValidData(isValidEmail(email) && isValidPassword(password));
  }, [email, password]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSubmitInProgress(true);

    signIn({ email, password })
      .then((res: any) => {
        if (res.isAxiosError) {
          setErrorCredentials(ErrorMessage(res.response.errorMessage));
        } else {
          const { data } = res;
          setUserAuth(data.user, data.token, data.refreshToken);
          router.push("/dashboard");
        }
      })
      .catch((err: any) => {
        console.log({ err });
      })
      .finally(() => {
        setSubmitInProgress(false);
      });
  };

  const linksToRedirect = [
    //{ text: "Não possui cadastro?", href: "/register" },
    {
      text: "Esqueceu sua senha?",
      //href: "/forgot-password"
      href: "/",
    },
  ];

  return (
    <SignInLayout
      onSubmit={handleSubmit}
      submitInProgress={submitInProgress}
      title="Admin"
      buttonText="Logar"
      canSubmit={areValidData}
      links={linksToRedirect}
    >
      <InputText
        label="Email"
        id="signin-email"
        placeholder="yourEmail@domain.com"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setErrorCredentials("")}
      />
      <InputText
        label="Senha"
        id="singin-password"
        placeholder="asd123/*-QWE456"
        type="password"
        value={password}
        onChange={(e) => setPasword(e.target.value)}
        onBlur={() => setErrorCredentials("")}
      />
      <div
        className={`flex items-center px-2 border-2 border-yellow-300 overflow-hidden overflow-y-hidden ${
          errorCredentials ? "h-8 py-2 opacity-100 mb-0" : "h-0 opacity-0 -mb-4"
        } `}
        style={{ transition: "all .3s" }}
      >
        <FiAlertTriangle size={20} className="text-yellow-500" />
        <h2 className="ml-4 font-semibold text-yellow-500">
          Usuário ou senha inválidos!
        </h2>
      </div>
    </SignInLayout>
  );
};

export default SignInPage;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const userData = recoverUserAuthCookies(ctx);

  if (userData) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
