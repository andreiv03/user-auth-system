import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

import styles from "../styles/pages/auth.module.scss";
import AuthService from "../services/AuthService";

export interface FormData {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (!formData.email || !formData.password)
        return alert("Please fill in all the fields!");

      await AuthService.login(formData);

      localStorage.setItem("firstLogin", "true");
      router.push("/");
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.top_section}>
          <h1 className={styles.title}>Login to WEBSITE</h1>
          <h3 className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in commodo libero.</h3>
        </div>
      
        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <div className={styles.field}>
            <input type="email" id="email" name="email" autoComplete="email" placeholder=" " value={formData.email} onChange={handleFormDataChange} />
            <label htmlFor="email">Email</label>
          </div>

          <div className={styles.field}>
            <input type={showPassword ? "text" : "password"} id="password" name="password" autoComplete="current-password" placeholder=" " value={formData.password} onChange={handleFormDataChange} />
            <label htmlFor="password">Password</label>

            <div className={styles.show_button} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <RiEyeOffFill /> : <RiEyeFill />}</div>
          </div>

          <button type="submit">Login</button>
        </form>

        <div className={styles.bottom_section}>
          <h3 className={styles.caption}>Do you need an account? <Link href="/register">Register</Link></h3>
        </div>
      </div>

      <div className={styles.background} />
    </div>
  );
}

export default Login;