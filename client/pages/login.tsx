import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import axios from "axios";

import styles from "../styles/pages/Auth.module.scss";
import AuthService from "../services/AuthService";

export interface FormData {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleShowPassword = (): void => setShowPassword(!showPassword);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      const { data } = await AuthService.login(formData);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return alert(error.response?.data.message);
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login to WEBSITE_NAME</h1>
      <h3 className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in commodo libero.</h3>
    
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.container}>
          <input type="email" id="email" name="email" placeholder=" " value={formData.email} onChange={handleFormDataChange} />
          <label htmlFor="email">Email</label>
        </div>

        <div className={styles.container}>
          <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder=" " value={formData.password} onChange={handleFormDataChange} />
          <label htmlFor="password">Password</label>

          <div className={styles.show_button} onClick={handleShowPassword}>{showPassword ? <RiEyeOffFill /> : <RiEyeFill />}</div>
        </div>

        <button type="submit">Login</button>
      </form>

      <h3 className={styles.caption}>Do you need an account? <Link href="/register">Register</Link></h3>
    </div>
  );
}

export default Login;