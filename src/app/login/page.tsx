"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { AuthContext } from "@/contexts/auth-context";
import { useContextHook } from "@/hooks/use-context-hook";

import styles from "@/styles/pages/auth.module.scss";

export default function Login() {
  const { login } = useContextHook(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      login({ email, password });
    } catch {
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className={styles["page"]}>
      <div className={styles["container"]}>
        <div className={styles["wrapper"]}>
          <div className={styles["logo"]}>
            <Image src="/logo.svg" alt="Logo" layout="fill" />
          </div>
        </div>

        <h1>Welcome back</h1>
        <p>Enter your email address and password in order to access your account</p>

        <form className={styles["form"]} onSubmit={submitForm} noValidate>
          <div className={styles["field"]}>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder=" "
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className={styles["field"]}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder=" "
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="password">Password</label>

            <div
              className={styles["show_button"]}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
            </div>
          </div>

          <button type="submit" disabled={!email || !password}>
            Sign in
          </button>
        </form>

        <div className={styles["bottom_section"]}>
          <Link href="/register">
            <button type="button">
              No customer account yet? <span>Register now</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
