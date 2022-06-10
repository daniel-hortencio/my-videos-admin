import { NextComponentType } from "next/types";
import { AuthProvider } from "../contexts/Auth";

import "../styles/globals.css";

interface Props {
  Component: any;
  pageProps: any;
}
function MyApp({ Component, pageProps }: Props) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
