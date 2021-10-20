import { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { RiUserLine, RiLockPasswordLine, RiBookmarkLine, RiArrowRightSLine } from "react-icons/ri";

import UsersService from "../services/UsersService";
import AuthService from "../services/AuthService";
import CloudService from "../services/CloudService";
import { UsersContext } from "../contexts/UsersContext";
import { AccountFormDataInterface, PasswordFormDataInterface } from "../interfaces/UsersInterfaces";

import styles from "../styles/pages/account.module.scss";
import NotFound from "../components/NotFound";

const accountFormDataInitialState: AccountFormDataInterface = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: ""
};

const passwordFormDataInitialState: PasswordFormDataInterface = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
};

const Account: NextPage = () => {
  const { token: [token], isLoggedIn, user, callback: [callback, setCallback] } = useContext(UsersContext);
  
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [accountFormData, setAccountFormData] = useState<AccountFormDataInterface>(accountFormDataInitialState);
  const [passwordFormData, setPasswordFormData] = useState<PasswordFormDataInterface>(passwordFormDataInitialState);

  useEffect(() => {
    setAccountFormData({
      firstName: user.firstName !== undefined ? user.firstName : "",
      lastName: user.lastName !== undefined ? user.lastName : "",
      email: user.email !== undefined ? user.email : "",
      phoneNumber: user.phoneNumber !== undefined ? user.phoneNumber : ""
    });
  }, [user]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files)
        return alert("No file uploaded!");

      const uploadData = new FormData();
      uploadData.append("file", event.target.files[0], "file");

      const { data } = await CloudService.uploadAvatar(token, user._id, uploadData);
      setCallback(!callback);

      return alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }
  
  const handleFileRemove = () => {

  }

  const handleAccountFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  const handleAccountFormDataUpdate = async (name: "firstName" | "lastName" | "email" | "phoneNumber") => {
    try {
      if (name === "email" && !AuthService.checkEmailValidity(accountFormData.email))
        return alert("Please use a valid email address!");

      else if (name === "phoneNumber" && !UsersService.checkPhoneNumberValidity(accountFormData.phoneNumber))
        return alert("Please use a valid phone number!");

      const { data } = await UsersService.updateUser(token, user._id, { name, value: accountFormData[name] });
      setCallback(!callback);

      alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  const handlePasswordFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  const handlePasswordFormDataSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!passwordFormData.currentPassword || !passwordFormData.newPassword || !passwordFormData.confirmPassword)
        return alert("Please fill in all the fields!");

      else if (passwordFormData.newPassword !== passwordFormData.confirmPassword)
        return alert("The new passwords are not identical.");

      const { data } = await UsersService.changePassword(token, user._id, passwordFormData);
      setPasswordFormData(passwordFormDataInitialState);
      setCurrentSection(0);

      alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  if (!isLoggedIn)
    return <NotFound />

  return (
    <div className={styles.page}>
      <div className={styles.sections}>
        <div className={`${styles.section} ${currentSection === 0 ? styles.selected : ""}`} onClick={() => setCurrentSection(0)}>
          <div className={styles.icon}><RiUserLine /></div>
          <div className={styles.text}>
            <h2>Account</h2>
            <h3>View your account details</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>

        <div className={`${styles.section} ${currentSection === 1 ? styles.selected : ""}`} onClick={() => setCurrentSection(1)}>
          <div className={styles.icon}><RiLockPasswordLine /></div>
          <div className={styles.text}>
            <h2>Password</h2>
            <h3>Change your password</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>

        <div className={`${styles.section} ${currentSection === 2 ? styles.selected : ""}`} onClick={() => setCurrentSection(2)}>
          <div className={styles.icon}><RiBookmarkLine /></div>
          <div className={styles.text}>
            <h2>Address Book</h2>
            <h3>Manage your addresses</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>
      </div>

      <div className={styles.content}>
        {currentSection === 0 && (
          <div className={styles.container}>
            <div className={styles.avatar}>
              <div className={styles.wrapper}>
                {user.avatarUrl ? (
                  <Image src={user.avatarUrl} alt="Avatar" layout="fill" />
                ): (
                  <Image src="/unknown-avatar.png" alt="Avatar" layout="fill" />
                )}
              </div>
              <div className={styles.text}>
                <h2>Avatar</h2>
                <h3>Min. image size 300px × 300px</h3>
                <div className={styles.buttons}>
                  <label htmlFor="file" className={styles.upload_button}>Upload</label>
                  <input id="file" type="file" onChange={event => handleFileUpload(event)}/>
                  <h3 className={styles.remove_button} onClick={handleFileRemove}>Remove</h3>
                </div>
              </div>
            </div>

            <form>
              <div className={`${styles.field} ${accountFormData.firstName && user.firstName !== accountFormData.firstName ? styles.active : ""}`}>
                <div className={styles.top_section}>
                  <label htmlFor="firstName">First Name</label>
                  <h3 className={styles.change_button} onClick={() => accountFormData.firstName && user.firstName !== accountFormData.firstName && handleAccountFormDataUpdate("firstName")}>Change</h3>
                </div>
                <input type="text" id="firstName" name="firstName" autoComplete="off" value={accountFormData.firstName} onChange={handleAccountFormDataChange} />
              </div>

              <div className={`${styles.field} ${accountFormData.lastName && user.lastName !== accountFormData.lastName ? styles.active : ""}`}>
                <div className={styles.top_section}>
                  <label htmlFor="lastName">Last Name</label>
                  <h3 className={styles.change_button} onClick={() => accountFormData.lastName && user.lastName !== accountFormData.lastName && handleAccountFormDataUpdate("lastName")}>Change</h3>
                </div>
                <input type="text" id="lastName" name="lastName" autoComplete="off" value={accountFormData.lastName} onChange={handleAccountFormDataChange} />
              </div>

              <div className={`${styles.field} ${accountFormData.email && user.email !== accountFormData.email ? styles.active : ""}`}>
                <div className={styles.top_section}>
                  <label htmlFor="email">Email</label>
                  <h3 className={styles.change_button} onClick={() => accountFormData.email && user.email !== accountFormData.email && handleAccountFormDataUpdate("email")}>Change</h3>
                </div>
                <input type="text" id="email" name="email" autoComplete="off" value={accountFormData.email} onChange={handleAccountFormDataChange} />
              </div>

              <div className={`${styles.field} ${accountFormData.phoneNumber && user.phoneNumber !== accountFormData.phoneNumber ? styles.active : ""}`}>
                <div className={styles.top_section}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <h3 className={styles.change_button} onClick={() => accountFormData.phoneNumber && user.phoneNumber !== accountFormData.phoneNumber && handleAccountFormDataUpdate("phoneNumber")}>Change</h3>
                </div>
                <input type="text" id="phoneNumber" name="phoneNumber" autoComplete="off" value={accountFormData.phoneNumber} onChange={handleAccountFormDataChange} />
              </div>
            </form>
          </div>
        )}

        {currentSection === 1 && (
          <div className={styles.container}>
            <form onSubmit={handlePasswordFormDataSubmit}>
              <div className={styles.field}>
                <div className={styles.top_section}>
                  <label htmlFor="currentPassword">Current Password</label>
                </div>
                <input type="password" id="currentPassword" name="currentPassword" autoComplete="off" value={passwordFormData.currentPassword} onChange={handlePasswordFormDataChange} />
              </div>

              <div className={styles.field}>
                <div className={styles.top_section}>
                  <label htmlFor="newPassword">New Password</label>
                </div>
                <input type="password" id="newPassword" name="newPassword" autoComplete="off" value={passwordFormData.newPassword} onChange={handlePasswordFormDataChange} />
              </div>

              <div className={styles.field}>
                <div className={styles.top_section}>
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                </div>
                <div className={styles.input_container}>
                  <input type="password" id="confirmPassword" name="confirmPassword" autoComplete="off" value={passwordFormData.confirmPassword} onChange={handlePasswordFormDataChange} />
                  <div className={`${styles.validity} ${passwordFormData.confirmPassword ? (passwordFormData.newPassword === passwordFormData.confirmPassword ? styles.true : styles.false) : ""}`} />
                </div>
              </div>

              <button type="submit">Change Password</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;