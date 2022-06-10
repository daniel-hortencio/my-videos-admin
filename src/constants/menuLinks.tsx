import { BiHome } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";

export const menuLinks = [
  { href: "/dashboard", label: "Home", icon: <BiHome size={20} /> },
  {
    href: "/dashboard/users",
    label: "Usuários",
    icon: <FiUsers size={20} />,
  },
];
