import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { AuthContextProvider } from "../context/auth.context";

import "../styles/globals.scss";
import styles from "../styles/components/layout.module.scss";

const Header = dynamic(() => import("../components/header"));

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isHeaderVisible = ["/auth"].every(path => !router.pathname.includes(path));

  return (
    <AuthContextProvider>
      <main className={styles.layout}>
        {isHeaderVisible && <Header />}
        <Component {...pageProps} />
      </main>
    </AuthContextProvider>
  );
}

export default App;