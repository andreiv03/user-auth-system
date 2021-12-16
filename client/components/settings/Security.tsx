import { useContext, useEffect, useState } from "react";
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";

import UsersService from "../../services/UsersService";
import Handlers from "../../services/Handlers";
import Helpers from "../../services/Helpers";
import { UsersContext } from "../../contexts/UsersContext";
import { PasswordFormDataInterface as FormData } from "../../interfaces/UsersInterfaces";

import styles from "../../styles/pages/settings.module.scss";
import NotFound from "../NotFound";

const formDataInitialState: FormData = {
  currentPassword: "",
  newPassword: ""
};

const Security: React.FC = () => {
  const { token: [token], isLoggedIn, user } = useContext(UsersContext);
  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [newPasswordStrength, setNewPasswordStrength] = useState("");

  useEffect(() => setNewPasswordStrength(Helpers.checkPasswordStrength(formData.newPassword)), [formData.newPassword]);

  const handleFormValidity = () => {
    if (!formData.currentPassword || !formData.newPassword) return true;
    if (newPasswordStrength === "Weak") return true;
    return false;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await UsersService.changePassword(token, user._id, formData);
      setFormData(formDataInitialState);
      return alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  if (!isLoggedIn) return <NotFound />

  return (
    <div className={styles.content}>
      <div className={styles.top_section}>
        <h2>Security</h2>
      </div>

      <div className={styles.section}>
        <h3>Change password</h3>
        <p>It&apos;s a good idea to use a strong password that you&apos;re not using elsewhere.</p>

        <form onSubmit={handleFormSubmit}>
          <div className={styles.field}>
            <input type={isPasswordVisible ? "text" : "password"} id="currentPassword" name="currentPassword" autoComplete="current-password" placeholder=" "
              value={formData.currentPassword} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="password">Current password</label>

            <div className={styles.show_button} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}</div>
          </div>

          <div className={styles.field}>
            <input type={isPasswordVisible ? "text" : "password"} id="newPassword" name="newPassword" autoComplete="new-password" placeholder=" "
              value={formData.newPassword} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="newPassword">New Password {formData.newPassword && <span className={`${formData.newPassword ? newPasswordStrength === "Weak" ? styles.weak : newPasswordStrength === "Medium" ? styles.medium : styles.strong : ""}`}>({newPasswordStrength})</span>}</label>

            <div className={`${styles.validity}
              ${formData.newPassword ? newPasswordStrength === "Weak" ? styles.weak : newPasswordStrength === "Medium" ? styles.medium : styles.strong : ""}`} />
            <div className={styles.show_button} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}</div>
          </div>

          <button type="submit" disabled={handleFormValidity()}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Security;