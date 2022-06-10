import { ReactNode } from "react";

import Topbar from "../Topbar";

interface LayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <Topbar />
      <main
        className="p-4 overflow-y-scroll"
        style={{ height: "calc(100vh - 3rem)" }}
      >
        <div className="max-w-screen-2xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default UserLayout;
