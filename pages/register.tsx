import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { AuthContext } from "../context/auth.context";
import { handleFormDataChange } from "../utils/handlers";
import { checkEmailValidity, checkPasswordStrength } from "../utils/helpers";

import styles from "../styles/pages/auth.module.scss";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const formDataInitialState: FormData = {
  email: "",
  firstName: "",
  lastName: "",
  password: ""
};

const Register: NextPage = () => {
  const router = useRouter();
  const { token: [, setToken] } = useContext(AuthContext);

  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleFormValidity = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) return true;
    if (!isEmailValid) return true;
    return false;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setFormData(prevState => ({ ...prevState, password: "" }));

      const { default: authService } = await import("../services/auth.service");
      const { data } = await authService.register(formData);

      localStorage.setItem("authenticated", "true");
      setToken(data.accessToken);
      router.push("/");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }

  useEffect(() => {
    setIsEmailValid(checkEmailValidity(formData.email));
  }, [formData.email]);

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(formData.password));
  }, [formData.password]);

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

        <h1>Create an account</h1>
        <p>Sign up for free and live the best experience on our website</p>
      
        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <div className={styles.field}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              placeholder=" "
              value={formData.firstName}
              onChange={event => handleFormDataChange(event.target.name, event.target.value, setFormData)}
            />
            <label htmlFor="firstName">First name</label>
          </div>

          <div className={styles.field}>
            <input
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              placeholder=" "
              value={formData.lastName}
              onChange={event => handleFormDataChange(event.target.name, event.target.value, setFormData)}
            />
            <label htmlFor="lastName">Last name</label>
          </div>

          <div className={`${styles.field} ${formData.email && !isEmailValid ? styles.invalid : ""}`}>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder=" "
              value={formData.email}
              onChange={event => handleFormDataChange(event.target.name, event.target.value, setFormData)}
            />
            <label htmlFor="email">Email {formData.email && `(${isEmailValid ? "Valid" : "Invalid"})`}</label>
          </div>

          <div className={styles.field}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder=" "
              value={formData.password}
              onChange={event => handleFormDataChange(event.target.name, event.target.value, setFormData)}
            />
            <label htmlFor="password">Password {formData.password && `(${passwordStrength})`}</label>

            <div className={styles.show_button} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
            </div>
          </div>

          <button type="submit" disabled={handleFormValidity()}>Sign up</button>
          <h4>By creating an account you agree to the <Link href="/">Terms and Conditions</Link> and <Link href="/">Privacy Policy</Link></h4>
        </form>

        <div className={styles.bottom_section}>
          <Link href="/login"><button type="button">Already have an account? <span>Sign in now</span></button></Link>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.cookies.refreshToken)
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  
  return {
    props: {}
  };
}

export default Register;