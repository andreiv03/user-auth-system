import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { RiUserLine, RiLockPasswordLine, RiLinkUnlinkM, RiArrowRightSLine } from "react-icons/ri";

import UsersService from "../services/UsersService";
import AuthService from "../services/AuthService";
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
  const router = useRouter();
  const { token: [token, setToken], isLoggedIn, user, callback: [callback, setCallback] } = useContext(UsersContext);
  
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [accountFormData, setAccountFormData] = useState<AccountFormDataInterface>(accountFormDataInitialState);
  const [passwordFormData, setPasswordFormData] = useState<PasswordFormDataInterface>(passwordFormDataInitialState);

  useEffect(() => {
    setAccountFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  }, [user]);

  // Input Handlers
  const handleAccountFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAccountFormData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));

  const handlePasswordFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordFormData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));

  // Account Section Form Handler
  const handleAccountFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!accountFormData.firstName || !accountFormData.lastName || !accountFormData.email || !accountFormData.phoneNumber)
        return alert("Please fill in all the fields!");
      
      else if (accountFormData.firstName === user.firstName && accountFormData.lastName === user.lastName && accountFormData.email === user.email && accountFormData.phoneNumber === user.phoneNumber)
        return alert("Please modify at least one field!");

      else if (!AuthService.checkEmailValidity(accountFormData.email))
        return alert("Please use a valid email address!");

      else if (!UsersService.checkPhoneNumberValidity(accountFormData.phoneNumber))
        return alert("Please use a valid phone number!");

      const { data } = await UsersService.updateUser(token, user._id, accountFormData);
      setCallback(!callback);

      alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  // Change Password Section Form Handler
  const handlePasswordFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!passwordFormData.currentPassword || !passwordFormData.newPassword || !passwordFormData.confirmPassword)
        return alert("Please fill in all the fields!");

      else if (passwordFormData.newPassword !== passwordFormData.confirmPassword)
        return alert("The new passwords are not identical.");

      const { data } = await UsersService.changePassword(token, user._id, passwordFormData);
      setPasswordFormData(passwordFormDataInitialState);

      alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  const handleLogout = async () => {
    try {
      await AuthService.logout();

      setToken("");
      localStorage.removeItem("isLoggedIn");

      router.push("/");
    } catch (error: any) {
      return alert(error.response.data.message);
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

        <div className={styles.section} onClick={handleLogout}>
          <div className={styles.icon}><RiLinkUnlinkM /></div>
          <div className={styles.text}>
            <h2>Logout</h2>
            <h3>Sign out from your account</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>
      </div>

      <div className={styles.content}>
        {currentSection === 0 && (
          <div className={styles.container}>
            <div className={styles.top_section}>
              <h2>User account</h2>
            </div>

            <form onSubmit={handleAccountFormSubmit}>
              <div className={`${styles.field} ${accountFormData.firstName && user.firstName !== accountFormData.firstName ? styles.active : ""}`}>
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" name="firstName" autoComplete="off" value={accountFormData.firstName} onChange={handleAccountFormDataChange} />
              </div>

              <div className={`${styles.field} ${accountFormData.lastName && user.lastName !== accountFormData.lastName ? styles.active : ""}`}>
                <label htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" name="lastName" autoComplete="off" value={accountFormData.lastName} onChange={handleAccountFormDataChange} />
              </div>

              <div className={`${styles.field} ${accountFormData.email && user.email !== accountFormData.email ? styles.active : ""}`}>
                <label htmlFor="email">Email</label>
                
                <div className={styles.input_container}>
                  <input type="text" id="email" name="email" autoComplete="off" value={accountFormData.email} onChange={handleAccountFormDataChange} />
                  <div className={`${styles.validity} ${accountFormData.email && accountFormData.email !== user.email ? (AuthService.checkEmailValidity(accountFormData.email) ? styles.true : styles.false) : ""}`} />
                </div>
              </div>

              <div className={`${styles.field} ${accountFormData.phoneNumber && user.phoneNumber !== accountFormData.phoneNumber ? styles.active : ""}`}>
                <label htmlFor="phoneNumber">Phone number</label>
                
                <div className={styles.input_container}>
                  <input type="text" id="phoneNumber" name="phoneNumber" autoComplete="off" value={accountFormData.phoneNumber} onChange={handleAccountFormDataChange} />
                  <div className={`${styles.validity} ${accountFormData.phoneNumber && accountFormData.phoneNumber !== user.phoneNumber ? (UsersService.checkPhoneNumberValidity(accountFormData.phoneNumber) ? styles.true : styles.false) : ""}`} />
                </div>
              </div>

              <button type="submit">Update account</button>
            </form>
          </div>
        )}

        {currentSection === 1 && (
          <div className={styles.container}>
            <div className={styles.top_section}>
              <h2>Change password</h2>
            </div>

            <form onSubmit={handlePasswordFormSubmit}>
              <div className={`${styles.field} ${styles.active}`}>
                <label htmlFor="currentPassword">Current password</label>
                <input type="password" id="currentPassword" name="currentPassword" autoComplete="off" value={passwordFormData.currentPassword} onChange={handlePasswordFormDataChange} />
              </div>

              <div className={`${styles.field} ${styles.active}`}>
                <label htmlFor="newPassword">New password</label>
                <input type="password" id="newPassword" name="newPassword" autoComplete="off" value={passwordFormData.newPassword} onChange={handlePasswordFormDataChange} />
              </div>

              <div className={`${styles.field} ${styles.active}`}>
                <label htmlFor="confirmPassword">Confirm new password</label>
                
                <div className={styles.input_container}>
                  <input type="password" id="confirmPassword" name="confirmPassword" autoComplete="off" value={passwordFormData.confirmPassword} onChange={handlePasswordFormDataChange} />
                  <div className={`${styles.validity} ${passwordFormData.confirmPassword ? (passwordFormData.newPassword === passwordFormData.confirmPassword ? styles.true : styles.false) : ""}`} />
                </div>
              </div>

              <button type="submit">Change password</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;