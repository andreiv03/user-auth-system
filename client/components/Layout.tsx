import { useRouter } from "next/router";

import UsersContextProvider from "../contexts/UsersContext";
import ProductsContextProvider from "../contexts/ProductsContext";

import styles from "../styles/components/layout.module.scss";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const isAuthPathname = router.pathname !== "/register" && router.pathname !== "/login";

  return (
    <UsersContextProvider>
      <ProductsContextProvider>
        {isAuthPathname && (
          <Header />
        )}
        <div className={styles.page}>{children}</div>
      </ProductsContextProvider>
    </UsersContextProvider>
  );
}

export default Layout;