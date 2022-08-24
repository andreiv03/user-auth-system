import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import { AuthContext, userInitialState } from "../context/auth.context";

import styles from "../styles/pages/home.module.scss";

const Home: NextPage = () => {
  const { token: [, setToken], user: [user, setUser] } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const { default: authService } = await import("../services/auth.service");
      await authService.logout();

      setToken("");
      setUser(userInitialState);
      localStorage.removeItem("authenticated");
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              layout="fill"
            />
          </div>
        </div>

        {user._id ? (
          <>
            <h1>Hi, {user.firstName}!</h1>
            <p>Here you can see your account information</p>

            <div className={styles.field}>
              <h3>First name:</h3>
              <h4>{user.firstName}</h4>
            </div>

            <div className={styles.field}>
              <h3>Last name:</h3>
              <h4>{user.lastName}</h4>
            </div>

            <div className={styles.field}>
              <h3>Email:</h3>
              <h4>{user.email}</h4>
            </div>

            <button type="button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <h1>You're not authenticated!</h1>
            <p>Please sign in or create a new account in order to access your account</p>

            <Link href="/login"><button type="button">Sign in</button></Link>
            <Link href="/register"><button type="button">Join now</button></Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;