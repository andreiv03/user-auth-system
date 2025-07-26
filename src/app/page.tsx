"use client";

import Image from "next/image";
import Link from "next/link";

import { AuthContext } from "@/contexts/auth-context";
import { useContextHook } from "@/hooks/use-context-hook";

import styles from "@/styles/pages/home.module.scss";

export default function Home() {
  const { user, logout } = useContextHook(AuthContext);

  return (
    <div className={styles["page"]}>
      <div className={styles["container"]}>
        <div className={styles["wrapper"]}>
          <div className={styles["logo"]}>
            <Image src="/logo.svg" alt="Logo" layout="fill" />
          </div>
        </div>

        {user?._id ? (
          <>
            <h1>Hi, {user.firstName}!</h1>
            <p>Here you can see your account information</p>

            <div className={styles["field"]}>
              <h3>First name:</h3>
              <h4>{user.firstName}</h4>
            </div>

            <div className={styles["field"]}>
              <h3>Last name:</h3>
              <h4>{user.lastName}</h4>
            </div>

            <div className={styles["field"]}>
              <h3>Email:</h3>
              <h4>{user.email}</h4>
            </div>

            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h1>You are not authenticated!</h1>
            <p>Please sign in or create a new account</p>

            <Link href="/login">
              <button type="button">Sign in</button>
            </Link>

            <Link href="/register">
              <button type="button">Join now</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
