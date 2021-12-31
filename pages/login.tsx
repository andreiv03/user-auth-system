import type { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import AuthService from "../services/auth-service";
import Handlers from "../utils/handlers";
import { UserContext } from "../contexts/user-context";
import type { LoginFormDataInterface as FormData } from "../interfaces/auth-interfaces";

import styles from "../styles/pages/auth.module.scss";

const formDataInitialState: FormData = {
  email: "",
  password: ""
};

const Login: NextPage = () => {
  const router = useRouter();
  const { token: [, setToken] } = useContext(UserContext);

  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await AuthService.login(formData);
      setToken(data.accessToken);
      localStorage.setItem("authenticated", "true");
      router.push("/");
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1>Welcome back!</h1>
        <p>Enter your email address and password in order to access your account.</p>
      
        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <div className={styles.field}>
            <input type="email" id="email" name="email" autoComplete="email" placeholder=" "
              value={formData.email} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="email">Email</label>
          </div>

          <div className={styles.field}>
            <input type={isPasswordVisible ? "text" : "password"} id="password" name="password" autoComplete="current-password" placeholder=" "
              value={formData.password} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="password">Password</label>

            <div className={styles.show_button} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}</div>
          </div>

          <button type="submit" disabled={!formData.email || !formData.password}>Sign in</button>
        </form>

        <h3>Do you need an account? <Link href="/register">Sign up</Link></h3>
        <h3>Go back <Link href="/">Home</Link></h3>
      </div>
    </div>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { refreshToken } = context.req.cookies;

  return (
    refreshToken ? {
      redirect: {
        destination: "/",
        permanent: true
      }
    } : {
      props: {}
    }
  );
}

export default Login;