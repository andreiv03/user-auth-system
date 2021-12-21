import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { RiSettings4Fill, RiShieldKeyholeFill, RiCheckboxMultipleBlankFill, RiCollageFill, RiLogoutBoxFill, RiArrowRightSLine } from "react-icons/ri";
import debounce from "lodash.debounce";

import Handlers from "../utils/handlers";
import { UsersContext } from "../contexts/users-context";

import styles from "../styles/pages/settings.module.scss";
import NotFound from "../components/NotFound";
import LoadingSpinner from "../components/LoadingSpinner";
import Account from "../components/settings/Account";
import Security from "../components/settings/Security";
import Products from "../components/settings/Products";
import Categories from "../components/settings/Categories";

const Settings: NextPage = () => {
  const router = useRouter();
  const { token: [, setToken], user, isLoggedIn } = useContext(UsersContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [activeItem, setActiveItem] = useState(1);

  const sectionWrapperRef = useRef({} as HTMLDivElement);
  const handleLoading = useMemo(() => debounce(() => setIsLoading(false), 500), []);

  useEffect(() => {
    handleLoading();
    return () => handleLoading.cancel();
  }, [isLoading, handleLoading]);

  const handleItemChange = (id: number) => {
    if (!isLoading && id !== activeItem) {
      sectionWrapperRef.current.scroll(0, 0);
      setIsLoading(true);
      setActiveItem(id);
    }
  }

  if (!isLoggedIn) return <NotFound />

  return (
    <div className={styles.page}>
      <div className={`${styles.sidebar} ${isSidebarActive ? styles.active : ""}`}>
        <div className={styles.top_section}>
          <h1>Settings</h1>
        </div>

        <div className={styles.items}>
          <div className={`${styles.item} ${activeItem === 1 ? styles.active : ""}`} onClick={() => handleItemChange(1)}>
            <div className={styles.container}>
              <RiSettings4Fill />
              <h2>Account</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <div className={`${styles.item} ${activeItem === 2 ? styles.active : ""}`} onClick={() => handleItemChange(2)}>
            <div className={styles.container}>
              <RiShieldKeyholeFill />
              <h2>Security</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          {user.isAdmin && (
            <div className={`${styles.item} ${activeItem === 3 ? styles.active : ""}`} onClick={() => handleItemChange(3)}>
              <div className={styles.container}>
                <RiCheckboxMultipleBlankFill />
                <h2>Products</h2>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          )}

          {user.isAdmin && (
            <div className={`${styles.item} ${activeItem === 4 ? styles.active : ""}`} onClick={() => handleItemChange(4)}>
              <div className={styles.container}>
                <RiCollageFill />
                <h2>Categories</h2>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          )}

          <div className={styles.item} onClick={() => Handlers.handleLogout(router, setToken)}>
            <div className={styles.container}>
              <RiLogoutBoxFill />
              <h2>Logout</h2>
            </div>
            <p>Sign out of your account.</p>
          </div>
        </div>

        <div className={styles.toggle} onClick={() => setIsSidebarActive(!isSidebarActive)}><RiArrowRightSLine /></div>
      </div>

      <div ref={sectionWrapperRef} className={`${styles.wrapper} ${isLoading ? styles.loading : ""}`}>
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