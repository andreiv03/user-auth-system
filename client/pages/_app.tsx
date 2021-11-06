import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { UsersContextProvider } from "../contexts/UsersContext";
import { CategoriesContextProvider } from "../contexts/CategoriesContext";

import "../styles/globals.scss";
import Header from "../components/Header";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);

  useEffect(() => {
    if (router.pathname === "/register" || router.pathname === "/login") setIsHeaderVisible(false);
    else setIsHeaderVisible(true);
  }, [router]);

  return (
    <UsersContextProvider>
      <CategoriesContextProvider>
        {isHeaderVisible && <Header />}      
        <Component {...pageProps} />
      </CategoriesContextProvider>
    </UsersContextProvider>
  );
}

export default App;