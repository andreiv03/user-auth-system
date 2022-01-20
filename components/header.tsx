import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { IoLogoJavascript } from "react-icons/io";
import { RiHomeSmile2Fill, RiSettings3Fill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

import { UserContext, userInitialState } from "../contexts/user-context";

import styles from "../styles/components/header.module.scss";
const Link = dynamic(() => import("./link"));

const profileVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.1,
      ease: "easeIn"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: "easeIn"
    }
  }
};

const Header: React.FC = () => {
  const router = useRouter();
  const { token: [, setToken], user: [user, setUser] } = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => setIsActive(false));
    return () => router.events.off("routeChangeComplete", () => setIsActive(false));
  }, [router.events]);

  const handleLogout = async () => {
    try {
      const { default: AuthService } = await import("../services/auth-service");
      await AuthService.logout();
      setIsActive(false);
      setToken("");
      setUser(userInitialState);
      localStorage.removeItem("authenticated");
      router.push("/");
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}><Link href="/"><IoLogoJavascript /></Link></div>

      <div className={styles.items}>
        <div className={styles.item}><Link href="/" styles={styles}><RiHomeSmile2Fill /></Link></div>
        <div className={styles.item}><Link href="/settings" styles={styles}><RiSettings3Fill /></Link></div>
      </div>

      <div className={styles.user} onClick={() => setIsActive(!isActive)}>
        <div className={styles.avatar}>
          {user._id ? (
            <img src={user.avatar.url ? user.avatar.url : "/avatar.jpg"} alt="Avatar" />
          ) : (
            <img src="/avatar.jpg" alt="Unknown avatar" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div className={styles.profile} initial="initial" animate="animate" exit="exit" variants={profileVariants}>
            <div className={styles.top_section}>
              {user._id ? (
                <img src={user.avatar.url ? user.avatar.url : "/avatar.jpg"} alt="Avatar" />
              ) : (
                <img src="/avatar.jpg" alt="Unknown avatar" />
              )}

              <div className={styles.info}>
                <h3>{user._id ? `${user.firstName} ${user.lastName}` : "Not logged in"}</h3>
                {user.email ? <h4>{user.email.length > 25 ? `${user.email.slice(0, 20)}...` : user.email}</h4> : null}
              </div>
            </div>
            
            {user._id ? (
              <div className={styles.button} onClick={handleLogout}><Link href="/">Sign out</Link></div>
            ) : (
              <div className={styles.button}><Link href="/login">Login</Link> or <Link href="/register">Register</Link></div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;