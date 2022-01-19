import type { NextPage } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { UserContext } from "../contexts/user-context";
import type { RegisterFormDataInterface as FormData } from "../interfaces/auth-interfaces";

import styles from "../styles/pages/auth.module.scss";
const NotFound = dynamic(() => import("../components/not-found"));

const formDataInitialState: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
};

const Register: NextPage = () => {
  const router = useRouter();
  const { token: [, setToken], user: [user] } = useContext(UserContext);

  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  useEffect(() => {
    if (!formData.email) return;

    const checkEmailValidity = async () => {
      const { default: Helpers } = await import("../utils/helpers");
      setIsEmailValid(Helpers.checkEmailValidity(formData.email));
    }

    checkEmailValidity();
  }, [formData.email]);

  useEffect(() => {
    if (!formData.password) return;

    const checkPasswordStrength = async () => {
      const { default: Helpers } = await import("../utils/helpers");
      setPasswordStrength(Helpers.checkPasswordStrength(formData.password));
    }

    checkPasswordStrength();
  }, [formData.password]);

  const handlePasswordStrengthClassNames = () =>
    formData.password ? passwordStrength === "Weak" ? styles.weak : passwordStrength === "Medium" ? styles.medium : styles.strong : "";

  const handleFormValidity = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) return true;
    if (!isEmailValid) return true;
    if (passwordStrength === "Weak") return true;
    return false;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { default: AuthService } = await import("../services/auth-service");
      const { data } = await AuthService.register(formData);
      setToken(data.accessToken);
      localStorage.setItem("authenticated", "true");
      router.push("/");
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  if (user._id) return <NotFound />

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>Create an account</h1>
          <p>Let&apos;s get you all set up so you can verify your personal account and begin setting up your profile.</p>
        
          <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
            <div className={styles.field}>
              <input
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="off"
                placeholder=" "
                value={formData.firstName}
                onChange={async event => {
                  const { name, value } = event.target;
                  const { default: Handlers } = await import("../utils/handlers");
                  Handlers.handleFormDataChange(name, value, setFormData);
                }}
              />
              <label htmlFor="firstName">First name</label>
            </div>

            <div className={styles.field}>
              <input
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="off"
                placeholder=" "
                value={formData.lastName}
                onChange={async event => {
                  const { name, value } = event.target;
                  const { default: Handlers } = await import("../utils/handlers");
                  Handlers.handleFormDataChange(name, value, setFormData);
                }}
              />
              <label htmlFor="lastName">Last name</label>
            </div>

            <div className={styles.field}>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder=" "
                value={formData.email}
                onChange={async event => {
                  const { name, value } = event.target;
                  const { default: Handlers } = await import("../utils/handlers");
                  Handlers.handleFormDataChange(name, value, setFormData);
                }}
              />
              <label htmlFor="email">Email</label>
              <div className={`${styles.validity} ${formData.email ? (isEmailValid ? styles.true : styles.false) : ""}`} />
            </div>

            <div className={styles.field}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder=" "
                value={formData.password}
                onChange={async event => {
                  const { name, value } = event.target;
                  const { default: Handlers } = await import("../utils/handlers");
                  Handlers.handleFormDataChange(name, value, setFormData);
                }}
              />
              <label htmlFor="password">
                Password {formData.password && <span className={handlePasswordStrengthClassNames()}>({passwordStrength})</span>}
              </label>

              <div className={`${styles.validity} ${handlePasswordStrengthClassNames()}`} />
              <div className={styles.show_button} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
              </div>
            </div>

            <button type="submit" disabled={handleFormValidity()}>Sign up</button>
          </form>

          <h3>Already have an account? <Link href="/login">Sign in</Link></h3>
          <h3>Go back <Link href="/">Home</Link></h3>
          <h4>By creating an account you agree to the <Link href="/">Terms and Conditions</Link> and <Link href="/">Privacy Policy</Link></h4>
        </div>
      </div>
    </div>
  );
}

export default Register;