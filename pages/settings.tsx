import type { GetServerSidePropsContext, NextPage } from "next";
import { useState, useEffect, useRef, useContext } from "react";

import { UserContext } from "../contexts/user-context";

import styles from "../styles/pages/settings.module.scss";
import LoadingSpinner from "../components/loading-spinner";
import Account from "../components/settings/account";
import Security from "../components/settings/security";

const Settings: NextPage = () => {
  const { token, user, callback } = useContext(UserContext)

  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(1);

  const wrapperRef = useRef({} as HTMLDivElement);

  useEffect(() => {
    const handleLoading = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(handleLoading);
  }, [isLoading]);

  const handleItemChange = (id: number) => {
    if (!isLoading && id !== activeItem) {
      wrapperRef.current.scroll(0, 0);
      setIsLoading(true);
      setActiveItem(id);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div className={styles.top_section}>
          <h1>Settings</h1>
        </div>

        <div className={styles.items}>
          <div className={`${styles.item} ${activeItem === 1 ? styles.active : ""}`} onClick={() => handleItemChange(1)}>
            <h2 title="Account">Account</h2>
          </div>

          <div className={`${styles.item} ${activeItem === 2 ? styles.active : ""}`} onClick={() => handleItemChange(2)}>
            <h2 title="Security">Security</h2>
          </div>
        </div>
      </div>

      <div className={`${styles.wrapper} ${isLoading ? styles.loading : ""}`} ref={wrapperRef}>
        {isLoading && <LoadingSpinner />}
        {activeItem === 1 && <Account token={token} user={user} callback={callback} />}
        {activeItem === 2 && <Security token={token} user={user} />}
      </div>
    </div>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { refreshToken } = context.req.cookies;

  return (
    !refreshToken ? {
      redirect: {
        destination: "/login",
        permanent: true
      }
    } : {
      props: {}
    }
  );
}

export default Settings;