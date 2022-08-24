import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/auth.context";

import "../styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default App;