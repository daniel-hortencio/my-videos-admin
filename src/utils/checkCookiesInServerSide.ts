import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { recoverUserAuthCookies } from "./cookies";

export const checkCookiesInServerSide = (ctx: GetServerSidePropsContext) => {
  const userData = recoverUserAuthCookies(ctx);

  if (!userData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
