import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import { AuthContext } from "../../context/auth.context";
import { handleFormDataChange } from "../../utils/handlers";

import styles from "../../styles/pages/auth.module.scss";

interface FormData {
  email: string;
  password: string;
};

const formDataInitialState: FormData = {
  email: "",
  password: ""
};

const Login: NextPage = () => {
  const router = useRouter();
  const { token: [, setToken] } = useContext(AuthContext);

  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      setFormData(prevState => ({ ...prevState, password: "" }));

      const { default: authService } = await import("../../services/auth.service");
      const { data } = await authService.login(formData);

      localStorage.setItem("authenticated", "true");
      setToken(data.accessToken);
      router.push("/");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Image
              src="/assets/logo-v2.svg"
              alt="Logo"
              layout="fill"
            />
          </div>
        </div>

        <h1>Welcome back</h1>
        <p>Enter your email address and password in order to access your account.</p>

        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <div className={styles.field}>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder=" "
              value={formData.email}
              onChange={event => handleFormDataChange(event.target.name, event.target.value, setFormData)}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className={styles.field}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder=" "
              value={formData.password}
              onChange={event => handleFormDataChange(event.target.name, event.target.value, setFormData)}
            />
            <label htmlFor="password">Password</label>

            <div className={styles.show_button} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
            </div>
          </div>

          <button type="submit" disabled={!formData.email || !formData.password}>Sign in</button>
        </form>

        <div className={styles.bottom_section}>
          <Link href="/auth/register"><button type="button">No customer account yet? <span>Register now</span></button></Link>
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

export default Login;