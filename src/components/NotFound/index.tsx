import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { PrimaryButton } from "../Buttons";

interface NotFound {
  image: ReactNode;
  link?: string;
  action?: () => void;
  title: string;
  text: string;
  buttonText: string;
}

const NotFound = ({
  image,
  link,
  action,
  title,
  text,
  buttonText,
}: NotFound) => {
  return (
    <div className="w-full bg-white flex flex-col items-center p-8 max-w-4xl mx-auto">
      <div className="block w-full max-w-sm mx-auto">
        <Image
          src={`/images/illustrations/${image}`}
          alt="Not Found"
          width="200"
          height="200"
          layout="responsive"
        />
      </div>
      <h1 className="text-4xl font-medium text-gray-600">{title}</h1>
      <h2 className="text-lg text-gray-600 mb-4">{text}</h2>
      {link && (
        <Link href={link}>
          <a className="flex items-center justify-center text-white p-2 bg-red-500 hover:bg-red-400">
            {buttonText}
          </a>
        </Link>
      )}

      {action && (
        <PrimaryButton onClick={action} type="button">
          {buttonText}
        </PrimaryButton>
      )}
    </div>
  );
};

export default NotFound;
