import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import AuthService from "../services/AuthService";
import styles from "../styles/components/header.module.scss";

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AuthService.logout();

      localStorage.removeItem("isLoggedIn");
      router.push("/");
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={handleLogout}>WEBSITE</div>
      
      <div className={styles.links}>
        <Link href="/"><a>Home</a></Link>
        <Link href="/account"><a>Account</a></Link>
        <Link href="/login"><a>Login</a></Link>
      </div>

      <div className={styles.buttons}>

      </div>
    </header>
  );
}

export default Header;