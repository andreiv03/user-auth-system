import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { RiUserLine, RiLockPasswordLine, RiLinkUnlinkM, RiArrowRightSLine } from "react-icons/ri";

import UsersService from "../../services/UsersService";
import Handlers from "../../services/Handlers";
import { UsersContext } from "../../contexts/UsersContext";
import { PasswordFormDataInterface as FormData } from "../../interfaces/UsersInterfaces";

import styles from "../../styles/pages/account.module.scss";
import NotFound from "../../components/NotFound";

const formDataInitialState: FormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
};

const Account: NextPage = () => {
  const router = useRouter();
  const { token: [token, setToken], isLoggedIn, user } = useContext(UsersContext);
  const [formData, setFormData] = useState<FormData>(formDataInitialState);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword)
        return alert("Please fill in all the fields!");

      else if (formData.newPassword !== formData.confirmPassword)
        return alert("The passwords don't match.");

      const { data } = await UsersService.changePassword(token, user._id, formData);
      setFormData(formDataInitialState);

      return alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  if (!isLoggedIn)
    return <NotFound />

  return (
    <div className={styles.page}>
      <div className={styles.sections}>
        <div className={styles.section} onClick={() => router.push("/account")}>
          <div className={styles.icon}><RiUserLine /></div>
          <div className={styles.text}>
            <h2>Account</h2>
            <h3>Modify your account details</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>

        <div className={`${styles.section} ${styles.selected}`}>
          <div className={styles.icon}><RiLockPasswordLine /></div>
          <div className={styles.text}>
            <h2>Password</h2>
            <h3>Change your password</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>

        <div className={styles.section} onClick={() => Handlers.handleLogout(router, setToken)}>
          <div className={styles.icon}><RiLinkUnlinkM /></div>
          <div className={styles.text}>
            <h2>Logout</h2>
            <h3>Sign out from your account</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.top_section}>
          <h2>Change password</h2>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className={`${styles.field} ${styles.active}`}>
            <label htmlFor="currentPassword">Current password</label>
            <input type="password" id="currentPassword" name="currentPassword" autoComplete="off" value={formData.currentPassword} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
          </div>

          <div className={`${styles.field} ${styles.active}`}>
            <label htmlFor="newPassword">New password</label>
            <input type="password" id="newPassword" name="newPassword" autoComplete="off" value={formData.newPassword} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
          </div>

          <div className={`${styles.field} ${styles.active}`}>
            <label htmlFor="confirmPassword">Confirm new password</label>
            
            <div className={styles.input_container}>
              <input type="password" id="confirmPassword" name="confirmPassword" autoComplete="off" value={formData.confirmPassword} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
              <div className={`${styles.validity} ${formData.confirmPassword ? (formData.newPassword === formData.confirmPassword ? styles.true : styles.false) : ""}`} />
            </div>
          </div>

          <button type="submit">Change password</button>
        </form>
      </div>
    </div>
  );
}

export default Account;