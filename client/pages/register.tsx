import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import axios from "axios";
import { passwordStrength as handlePasswordStrength } from "check-password-strength";

import styles from "../styles/pages/Auth.module.scss";
import AuthService from "../services/AuthService";

export interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

interface FormErrors {
  first_name: boolean;
  last_name: boolean;
  email: boolean;
};

const handleFormErros = (name: string, value: string): boolean => {
  if (name === "first_name" || name === "last_name") return value.length < 3;
  else return !AuthService.validateEmail(value);
}

const Register: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({ first_name: "", last_name: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({ first_name: true, last_name: true, email: true });
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    if (event.target.name === "password") 
      setPasswordStrength(handlePasswordStrength(event.target.value).id);
    else setFormErrors({
      ...formErrors,
      [event.target.name]: handleFormErros(event.target.name, event.target.value)
    });
  }

  const handlePasswordStrengthColor = (): string => {
    if (passwordStrength === 0 || passwordStrength === 1) return styles.error;
    else if (passwordStrength === 2) return styles.warning;
    else return styles.valid;
  }

  const handleShowPassword = (): void => setShowPassword(!showPassword);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      const { data } = await AuthService.register(formData);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return alert(error.response?.data.message);
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register to WEBSITE_NAME</h1>
      <h3 className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in commodo libero.</h3>
    
      <form className={styles.form} onSubmit={handleFormSubmit} autoComplete="off">
        <div className={styles.container}>
          <input type="text" id="first_name" name="first_name" placeholder=" " value={formData.first_name} onChange={handleFormDataChange} />
          <label htmlFor="first_name">First Name</label>

          <div className={!formData.first_name ? styles.underline : `${styles.underline} ${formErrors.first_name ? styles.error : styles.valid}`} />
        </div>

        <div className={styles.container}>
          <input type="text" id="last_name" name="last_name" placeholder=" " value={formData.last_name} onChange={handleFormDataChange} />
          <label htmlFor="last_name">Last Name</label>

          <div className={!formData.last_name ? styles.underline : `${styles.underline} ${formErrors.last_name ? styles.error : styles.valid}`} />
        </div>

        <div className={styles.container}>
          <input type="email" id="email" name="email" placeholder=" " value={formData.email} onChange={handleFormDataChange} />
          <label htmlFor="email">Email</label>

          <div className={!formData.email ? styles.underline : `${styles.underline} ${formErrors.email ? styles.error : styles.valid}`} />
        </div>

        <div className={styles.container}>
          <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder=" " value={formData.password} onChange={handleFormDataChange} />
          <label htmlFor="password">Password 
            <span className={handlePasswordStrengthColor()}>{formData.password && ` (${handlePasswordStrength(formData.password).value})`}</span>
          </label>

          <div className={!formData.password ? styles.underline : `${styles.underline} ${handlePasswordStrengthColor()}`} />
          <div className={styles.show_button} onClick={handleShowPassword}>{showPassword ? <RiEyeOffFill /> : <RiEyeFill />}</div>
        </div>

        <label className={styles.checkbox} htmlFor="checkbox">I agree with all service agreement.
          <input type="checkbox" id="checkbox" checked={checkboxValue} onChange={() => setCheckboxValue(!checkboxValue)} />
          <span className={styles.checkmark} />
        </label>

        <button type="submit">Register</button>
      </form>

      <h3 className={styles.caption}>Do you have an account? <Link href="/login">Login</Link></h3>
    </div>
  );
}

export default Register;