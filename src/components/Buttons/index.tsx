import { ReactNode } from "react";
import { getClassName } from "../../utils/getClassName";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled,
}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export const PrimaryButton = ({ className = "", ...props }: ButtonProps) => {
  return (
    <Button
      type={props.type || "button"}
      className={getClassName(
        `flex items-center justify-center text-white p-2 bg-blue-500 hover:bg-blue-400`,
        className
      )}
      {...props}
    />
  );
};

export const SecondaryButton = ({ className = "", ...props }: ButtonProps) => {
  return (
    <Button
      type={props.type || "button"}
      className={getClassName(
        "flex items-center justify-center bg-gray-400 hover:bg-gray-300 text-white p-2",
        className
      )}
      {...props}
    />
  );
};
