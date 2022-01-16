import type { AppProps } from "next/app";
import { UserProvider } from "../contexts/user-context";

import "../styles/globals.scss";
import styles from "../styles/components/layout.module.scss";
import Header from "../components/header";

const App = ({ Component, pageProps }: AppProps) => {
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