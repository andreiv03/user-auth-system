import { ReactNode } from "react";

import styles from "../styles/components/layout.module.scss";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <div className={styles.page}>{children}</div>
    </>
  );
}

export default Layout;