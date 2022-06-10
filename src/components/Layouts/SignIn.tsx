import { FormEvent, ReactNode } from "react";
import Link from "next/link";
import Loader from "react-spinners/PulseLoader";

import { PrimaryButton } from "../Buttons";

interface Link {
  text: string;
  href: string;
}

interface SignInLayoutProps {
  children: ReactNode;
  onSubmit: (e: FormEvent) => void;
  title: string;
  buttonText: string;
  canSubmit: boolean;
  links: Link[];
  submitInProgress: boolean;
}

const SignInLayout = ({
  children,
  onSubmit,
  title,
  buttonText,
  canSubmit,
  links,
  submitInProgress,
}: SignInLayoutProps) => {
  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <video
        muted
        autoPlay
        loop
        id="myVideo"
        className="absolute top-0 z-0 h-full w-full object-cover opacity-10"
      >
        <source src="/videos/background-sign-in.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <div className="bg-white p-8 shadow-2xl w-full max-w-sm absolute z-10">
        <form onSubmit={(e) => onSubmit(e)} className="mb-2">
          <h1 className="text-2xl font-bold mb-8 text-center">{title}</h1>

          <div className="mb-6">{children}</div>

          {submitInProgress ? (
            <div className="bg-blue-500 p-2 flex items-center justify-center">
              <Loader color="#fff" size={12} margin={4} />
            </div>
          ) : (
            <PrimaryButton
              type="submit"
              disabled={!canSubmit}
              className="block w-full"
            >
              {buttonText}
            </PrimaryButton>
          )}
        </form>

        <div className="flex justify-between">
          {links?.map((link) => (
            <Link href={link.href} key={link.href}>
              <a className="text-gray-400 hover:text-blue-500 transition-colors block">
                {link.text}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignInLayout;
