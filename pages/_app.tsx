import type { AppProps } from "next/app";
import { useEffect } from "react";

import { UserProvider } from "../contexts/user-context";

import "../styles/globals.scss";
import styles from "../styles/components/layout.module.scss";
import Header from "../components/header";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const connectDatabase = async () => {
      try {
        const { default: axios } = await import("../services/axios");
        await axios.get<null>("/database");
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    }

    connectDatabase();
  }, []);

  return (
    <UserProvider>
      <main className={styles.layout}>
        <Header />
        <div className={styles.page}>
          <Component {...pageProps} />
        </div>
      </main>
    </UserProvider>
  );
}

export default App;