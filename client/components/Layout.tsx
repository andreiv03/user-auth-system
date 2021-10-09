import React from "react";

import styles from "../styles/components/layout.module.scss";
import UsersContextProvider from "../contexts/UsersContext";

const Layout: React.FC = ({ children }) => {
  return (
    <UsersContextProvider>
      <div className={styles.page}>{children}</div>
    </UsersContextProvider>
  );
}

export default Layout;