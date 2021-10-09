import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiEyeFill, RiEyeOffFill, RiInformationFill } from "react-icons/ri";

import styles from "../styles/pages/auth.module.scss";
import AuthService from "../services/AuthService";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface FormErrors {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: string;
};

const Register: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({ firstName: "", lastName: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({ firstName: true, lastName: true, email: true, password: "" });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const router = useRouter();

  const handleFormErros = (name: string, value: string): (boolean | string) => {
    if (name === "firstName" || name === "lastName") return value.length < 3;
    else if (name === "email") return !AuthService.validateEmail(value);
    else return AuthService.passwordStrength(value);
  }

  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    setFormErrors({
      ...formErrors,
      [event.target.name]: handleFormErros(event.target.name, event.target.value)
    });
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password)
        return alert("Please fill in all the fields!");

      else if (formErrors.firstName || formErrors.lastName || formErrors.email)
        return alert(`"First Name", "Last Name" and "Email" fields must have valid values before you can register!`);

      await AuthService.register(formData);

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
          <h1 className={styles.title}>Register to WEBSITE</h1>
          <h3 className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in commodo libero.</h3>
        </div>
      
        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <div className={!formData.firstName ? styles.field : `${styles.field} ${formErrors.firstName ? styles.error : styles.valid}`}>
            <input type="text" id="firstName" name="firstName" autoComplete="given-name" placeholder=" " value={formData.firstName} onChange={handleFormDataChange} />
            <label htmlFor="firstName">First Name</label>
          </div>

          <div className={!formData.lastName ? styles.field : `${styles.field} ${formErrors.lastName ? styles.error : styles.valid}`}>
            <input type="text" id="lastName" name="lastName" autoComplete="family-name" placeholder=" " value={formData.lastName} onChange={handleFormDataChange} />
            <label htmlFor="lastName">Last Name</label>
          </div>

          <div className={!formData.email ? styles.field : `${styles.field} ${formErrors.email ? styles.error : styles.valid}`}>
            <input type="email" id="email" name="email" autoComplete="email" placeholder=" " value={formData.email} onChange={handleFormDataChange} />
            <label htmlFor="email">Email</label>
          </div>

          <div className={`${!formData.password ? styles.field : `${styles.field} ${formErrors.password === "Weak" ? styles.error : formErrors.password === "Medium" ? styles.warning : styles.valid}`} ${showTooltip ? styles.tooltip_active : ""}`}>
            <input type={showPassword ? "text" : "password"} id="password" name="password" autoComplete="new-password" placeholder=" " value={formData.password} onChange={handleFormDataChange} />
            <label htmlFor="password">Password{formData.password && <span> ({formErrors.password})</span>}</label>
            
            <p className={styles.info_text}>You can create an account even if the password is weak, but it will be poorly secured.</p>

            <div className={styles.show_button} onClick={() => !showTooltip && setShowPassword(!showPassword)}>{showPassword ? <RiEyeOffFill /> : <RiEyeFill />}</div>
            <div className={styles.info_button} onClick={() => setShowTooltip(!showTooltip)}><RiInformationFill /></div>
          </div>

          <label className={styles.checkbox} htmlFor="checkbox">
            <span>I agree with all service agreement.</span>

            <input type="checkbox" id="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            <span className={styles.checkmark} />
          </label>

          <button type="submit">Register</button>
        </form>

        <div className={styles.bottom_section}>
          <h3 className={styles.caption}>Do you have an account? <Link href="/login">Login</Link></h3>
        </div>
      </div>

      <div className={styles.background} />
    </div>
  );
}

export default Register;