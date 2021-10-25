import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import AuthService from "../services/AuthService";
import { UsersContext } from "../contexts/UsersContext";
import { LoginFormDataInterface as FormData } from "../interfaces/AuthInterfaces";

import styles from "../styles/pages/auth.module.scss";
import NotFound from "../components/NotFound";

const formDataInitialState: FormData = {
  email: "",
  password: ""
};

const Login: NextPage = () => {
  const router = useRouter();
  const { token: [, setToken], isLoggedIn } = useContext(UsersContext);

  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    setFormData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!formData.email || !formData.password)
        return alert("Please fill in all the fields!");

      const { data } = await AuthService.login(formData);

      setToken(data.accessToken);
      localStorage.setItem("isLoggedIn", "true");

      router.push("/");
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  if (isLoggedIn)
    return <NotFound />

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome back!</h1>
        <h3 className={styles.paragraph}>Enter your email address and password in order to access your account.</h3>
      
        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <div className={styles.field}>
            <input type="email" id="email" name="email" autoComplete="email" placeholder=" " value={formData.email} onChange={handleFormDataChange} />
            <label htmlFor="email">Email</label>
          </div>

          <div className={styles.field}>
            <input type={isPasswordVisible ? "text" : "password"} id="password" name="password" autoComplete="current-password" placeholder=" " value={formData.password} onChange={handleFormDataChange} />
            <label htmlFor="password">Password</label>

            <div className={styles.show_button} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}</div>
          </div>

          <button type="submit">Sign in</button>
        </form>

        <h3 className={styles.paragraph}>Do you need an account? <Link href="/register">Sign up</Link></h3>
        <h3 className={styles.paragraph}>Go back <Link href="/">Home</Link></h3>
      </div>

      <div className={styles.background} />
    </div>
  );
}

export default Login;