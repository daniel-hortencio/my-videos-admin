import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import { MdClose, MdMenu } from "react-icons/md";

import { menuLinks } from "../../constants/menuLinks";

import { useAuth } from "../../contexts/Auth";

const Topbar = () => {
  const { route } = useRouter();
  const { signOut, user } = useAuth();
  const [menuExpanded, setMenuExpanded] = useState(false);

  function getMenuStyle() {
    let style = "flex flex-col bg-white fixed h-full w-56 z-20 top-0 pt-12";

    if (menuExpanded) {
      style += " left-0 shadow-md";
    } else {
      style += " -left-56";
    }

    return style;
  }

  function getLinkStyle(href: string) {
    let style =
      "h-12 flex font-semibold text-gray-500 items-center px-4 hover:text-blue-400 flex items-center";

    if (href === route) {
      style += " text-blue-500 hover:text-blue-500";
    }

    return style;
  }

  function getMenuButtonStyle() {
    return "h-8 w-8 absolute top-2 left-2 flex items-center justify-center";
  }

  return (
    <header className="h-12 bg-white shadow-md z-10 relative">
      <button
        onClick={() => setMenuExpanded(true)}
        className={`${getMenuButtonStyle()}`}
      >
        <MdMenu size={24} className="text-gray-500 hover:text-blue-400" />
      </button>
      <h1 className="w-full ml-16 max-w-screen-2xl h-12 flex items-center">
        <span>Bem vindo, {user?.name}</span>
      </h1>
      <nav className={`${getMenuStyle()}`} style={{ transition: "left 0.2s" }}>
        <button
          onClick={() => setMenuExpanded(false)}
          className={`${getMenuButtonStyle()}`}
        >
          <MdClose size={24} className="text-gray-500 hover:text-blue-400" />
        </button>
        {menuLinks.map((item) => (
          <Link href={item.href} key={item.label}>
            <a className={getLinkStyle(item.href)}>
              {item.icon} <span className="ml-1">{item.label}</span>
            </a>
          </Link>
        ))}
        <button className={`${getLinkStyle("")}`} onClick={signOut}>
          <FiLogOut size={22} /> <span className="ml-1">LogOut</span>
        </button>
      </nav>
    </header>
  );
};

export default Topbar;
