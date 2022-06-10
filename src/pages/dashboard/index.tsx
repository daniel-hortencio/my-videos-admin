/* eslint-disable @next/next/no-img-element */
import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import Layout from "../../components/Layouts/User";

import { recoverUserAuthCookies } from "../../utils/cookies";

import { checkCookiesInServerSide } from "../../utils/checkCookiesInServerSide";

const Home = () => {
  return <Layout>Home</Layout>;
};

export default Home;

const fn = (ctx: GetServerSidePropsContext) => {
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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  return checkCookiesInServerSide(ctx);
};
