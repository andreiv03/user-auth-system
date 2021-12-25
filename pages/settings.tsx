import { NextPage } from "next";
import { useContext, useState, useEffect, useRef } from "react";

import { UsersContext } from "../contexts/users-context";

import styles from "../styles/pages/settings.module.scss";
import NotFound from "../components/not-found";
import LoadingSpinner from "../components/loading-spinner";
import Account from "../components/settings/account";
import Security from "../components/settings/security";
import Products from "../components/settings/products";
import Categories from "../components/settings/categories";

const Settings: NextPage = () => {
  const { user, isLoggedIn } = useContext(UsersContext);

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

  if (!isLoggedIn) return <NotFound />

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

          {user.isAdmin && (
            <div className={`${styles.item} ${activeItem === 3 ? styles.active : ""}`} onClick={() => handleItemChange(3)}>
              <h2 title="Products">Products</h2>
            </div>
          )}

          {user.isAdmin && (
            <div className={`${styles.item} ${activeItem === 4 ? styles.active : ""}`} onClick={() => handleItemChange(4)}>
              <h2 title="Categories">Categories</h2>
            </div>
          )}
        </div>
      </div>

      <div ref={wrapperRef} className={`${styles.wrapper} ${isLoading ? styles.loading : ""}`}>
        {isLoading && <LoadingSpinner />}
        {activeItem === 1 && <Account />}
        {activeItem === 2 && <Security />}
        {activeItem === 3 && <Products />}
        {activeItem === 4 && <Categories />}
      </div>
    </div>
  );
}

export default Settings;