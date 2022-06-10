/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import Layout from "../../components/Layouts/User";

import { recoverUserAuthCookies } from "../../utils/cookies";

import { usersService } from "../../services/users";

import { useAuth } from "../../contexts/Auth";

const Home = () => {
  const [users, setUsers] = useState<any>([]);

  const { user: adminUser } = useAuth();

  useEffect(() => {
    usersService
      .getAll()
      .then(({ data }) => {
        const { allUsers } = data;
        setUsers(allUsers);
      })
      .catch((err) => console.log({ err }));
  }, []);

  const TagYou = () => {
    return (
      <span className="px-2 py-1 bg-yellow-400 w-min text-white">Você</span>
    );
  };

  const TagAdmin = () => {
    return (
      <span className="px-2 py-1 bg-blue-400 w-min text-white">Admin</span>
    );
  };

  const TagOwner = () => {
    return <span className="px-2 py-1 bg-red-400 w-min text-white">Owner</span>;
  };

  return (
    <Layout>
      <header className="mb-8">
        <h1 className="font-semibold text-3xl mb-4">Usuários</h1>
      </header>
      {users?.length > 0 && (
        <table className="border w-full">
          <thead>
            <tr>
              <td className="font-bold">Id</td>
              <td className="font-bold">Nome</td>
              <td className="font-bold">Email</td>
              <td className="font-bold">Roles</td>
              <td className="font-bold">Videos</td>
              <td className="font-bold">Playlists</td>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any) => (
              <tr key={user?.id} className="h-10 border-b-2">
                <td>{user?.id}</td>
                <td>
                  {user?.name} {user?.id === adminUser?.id && <TagYou />}{" "}
                </td>
                <td>{user?.email}</td>
                <td>
                  {user?.roles.includes("Owner") && <TagOwner />}{" "}
                  {user?.roles.includes("Admin") && <TagAdmin />}
                </td>
                <td>{user?.videos}</td>
                <td>{user?.playlists}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
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
