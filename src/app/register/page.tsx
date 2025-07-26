"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { AuthContext } from "@/contexts/auth-context";
import { useContextHook } from "@/hooks/use-context-hook";
import { calculatePasswordStrength, validateEmail } from "@/utils/helpers";

import styles from "@/styles/pages/auth.module.scss";

export default function Register() {
  const { register } = useContextHook(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const isFormValid = () => {
    if (!firstName || !lastName || !email || !password) {
      return true;
    }

    if (!isEmailValid) {
      return true;
    }

    return false;
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      register({ firstName, lastName, email, password });
    } catch {
      alert("Registration failed. Please check your details and try again.");
    }
  };

  useEffect(() => {
    setIsEmailValid(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  return (
    <div className={styles["page"]}>
      <div className={styles["container"]}>
        <div className={styles["wrapper"]}>
          <div className={styles["logo"]}>
            <Image src="/logo.svg" alt="Logo" layout="fill" />
          </div>
        </div>

        <h1>Create an account</h1>
        <p>Sign up for free and live the best experience on our website</p>

        <form className={styles["form"]} onSubmit={submitForm} noValidate>
          <div className={styles["field"]}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              placeholder=" "
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <label htmlFor="firstName">First name</label>
          </div>

          <div className={styles["field"]}>
            <input
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              placeholder=" "
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <label htmlFor="lastName">Last name</label>
          </div>

          <div className={`${styles["field"]} ${email && !isEmailValid ? styles["invalid"] : ""}`}>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder=" "
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="email">
              Email {email && `(${isEmailValid ? "Valid" : "Invalid"})`}
            </label>
          </div>

          <div className={styles["field"]}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder=" "
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="password">Password {password && `(${passwordStrength})`}</label>

            <div
              className={styles["show_button"]}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
            </div>
          </div>

          <button type="submit" disabled={isFormValid()}>
            Sign up
          </button>
          <h4>
            By creating an account you agree to the <Link href="/">Terms and Conditions</Link> and{" "}
            <Link href="/">Privacy Policy</Link>
          </h4>
        </form>

        <div className={styles["bottom_section"]}>
          <Link href="/login">
            <button type="button">
              Already have an account? <span>Sign in now</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
