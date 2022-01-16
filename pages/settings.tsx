import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, useContext } from "react";

import AuthService from "../services/auth-service";
import { UserContext, userInitialState } from "../contexts/user-context";

import styles from "../styles/pages/settings.module.scss";
import NotFound from "../components/not-found";
import LoadingSpinner from "../components/loading-spinner";
import Account from "../components/settings/account";
import Avatar from "../components/settings/avatar";
import Security from "../components/settings/security";

const Settings: NextPage = () => {
  const router = useRouter();
  const { token: [token, setToken], user: [user, setUser], callback } = useContext(UserContext);
  const wrapperRef = useRef({} as HTMLDivElement);

  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(1);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(loadingTimeout);
  }, [isLoading]);

  const handleItemChange = (item: number) => {
    if (!isLoading && activeItem !== item) {
      wrapperRef.current.scroll(0, 0);
      setIsLoading(true);
      setActiveItem(item);
    }
  }

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setToken("");
      setUser(userInitialState);
      localStorage.removeItem("authenticated");
      router.push("/");
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  if (!user._id) return <NotFound condition={user._id !== ""} />

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
            <h2 title="Avatar">Avatar</h2>
          </div>

          <div className={`${styles.item} ${activeItem === 3 ? styles.active : ""}`} onClick={() => handleItemChange(3)}>
            <h2 title="Security">Security</h2>
          </div>

          <div className={styles.item} onClick={handleLogout}>
            <h2 title="Logout">Logout</h2>
          </div>
        </div>
      </div>

      <div className={`${styles.wrapper} ${isLoading ? styles.loading : ""}`} ref={wrapperRef}>
        {isLoading && <LoadingSpinner />}
        {activeItem === 1 && <Account token={token} user={user} callback={callback} />}
        {activeItem === 2 && <Avatar token={token} user={user} callback={callback} />}
        {activeItem === 3 && <Security token={token} user={user} />}
      </div>
    </div>
  );
}

export default Settings;