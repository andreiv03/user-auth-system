import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import AuthService from "../services/AuthService";
import Handlers from "../services/Handlers";
import Helpers from "../services/Helpers";
import { UsersContext } from "../contexts/UsersContext";
import { RegisterFormDataInterface as FormData } from "../interfaces/AuthInterfaces";

import styles from "../styles/pages/auth.module.scss";
import NotFound from "../components/NotFound";

const formDataInitialState: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
};

const Register: NextPage = () => {
  const router = useRouter();
  const { token: [, setToken], isLoggedIn } = useContext(UsersContext);

  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  useEffect(() => setPasswordStrength(Helpers.checkPasswordStrength(formData.password)), [formData.password]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password)
        return alert("Please fill in all the fields!");

      else if (!Helpers.checkEmailValidity(formData.email))
        return alert("Please use a valid email address!");

      else if (passwordStrength === "Weak")
        return alert("Your password is too weak!");

      const { data } = await AuthService.register(formData);
      setToken(data.accessToken);

      localStorage.setItem("isLoggedIn", "true");
      return router.push("/");
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  if (isLoggedIn)
    return <NotFound />

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Create an account</h1>
        <h3 className={styles.paragraph}>Let's get you all set up so you can verify your personal account and begin setting up your profile.</h3>
      
        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <div className={styles.field}>
            <input type="text" id="firstName" name="firstName" autoComplete="given-name" placeholder=" " value={formData.firstName} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="firstName">First Name</label>
          </div>

          <div className={styles.field}>
            <input type="text" id="lastName" name="lastName" autoComplete="family-name" placeholder=" " value={formData.lastName} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="lastName">Last Name</label>
          </div>

          <div className={styles.field}>
            <input type="email" id="email" name="email" autoComplete="email" placeholder=" " value={formData.email} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="email">Email</label>

            <div className={`${styles.validity} ${formData.email ? (Helpers.checkEmailValidity(formData.email) ? styles.true : styles.false) : ""}`} />
          </div>

          <div className={styles.field}>
            <input type={isPasswordVisible ? "text" : "password"} id="password" name="password" autoComplete="new-password" placeholder=" " value={formData.password} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="password">Password {formData.password && <span className={`${formData.password ? (passwordStrength === "Weak" ? styles.weak : passwordStrength === "Medium" ? styles.medium : styles.strong) : ""}`}>({passwordStrength})</span>}</label>

            <div className={`${styles.validity} ${formData.password ? (passwordStrength === "Weak" ? styles.weak : passwordStrength === "Medium" ? styles.medium : styles.strong) : ""}`} />
            <div className={styles.show_button} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}</div>
          </div>

          <button type="submit">Sign up</button>
        </form>

        <h3 className={styles.paragraph}>Already have an account? <Link href="/login">Sign in</Link></h3>
        <h3 className={styles.paragraph}>Go back <Link href="/">Home</Link></h3>
        <h4 className={styles.caption}>By creating an account you agree to the <Link href="/">Terms and Conditions</Link> and <Link href="/">Privacy Policy</Link></h4>
      </div>

      <div className={styles.background} />
    </div>
  );
}

export default Register;