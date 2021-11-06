import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { RiUserLine, RiLockPasswordLine, RiLinkUnlinkM, RiArrowRightSLine } from "react-icons/ri";

import UsersService from "../../services/UsersService";
import Handlers from "../../services/Handlers";
import Helpers from "../../services/Helpers";
import { UsersContext } from "../../contexts/UsersContext";
import { AccountFormDataInterface as FormData } from "../../interfaces/UsersInterfaces";

import styles from "../../styles/pages/account.module.scss";
import NotFound from "../../components/NotFound";

const formDataInitialState: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: ""
};

const Account: NextPage = () => {
  const router = useRouter();
  const { token: [token, setToken], isLoggedIn, user, callback: [callback, setCallback] } = useContext(UsersContext);
  const [formData, setFormData] = useState<FormData>(formDataInitialState);

  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  }, [user]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber)
        return alert("Please fill in all the fields!");
      
      else if (formData.firstName === user.firstName && formData.lastName === user.lastName && formData.email === user.email && formData.phoneNumber === user.phoneNumber)
        return alert("Please modify at least one field!");

      else if (!Helpers.checkEmailValidity(formData.email))
        return alert("Please use a valid email address!");

      else if (!Helpers.checkPhoneNumberValidity(formData.phoneNumber))
        return alert("Please use a valid phone number!");

      const { data } = await UsersService.updateUser(token, user._id, formData);
      setCallback(!callback);

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
        <div className={`${styles.section} ${styles.selected}`}>
          <div className={styles.icon}><RiUserLine /></div>
          <div className={styles.text}>
            <h2>Account</h2>
            <h3>Modify your account details</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>

        <div className={styles.section} onClick={() => router.push("/account/change-password")}>
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
          <h2>User account</h2>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className={`${styles.field} ${formData.firstName && user.firstName !== formData.firstName ? styles.active : ""}`}>
            <label htmlFor="firstName">First name</label>
            <input type="text" id="firstName" name="firstName" autoComplete="off" value={formData.firstName} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
          </div>

          <div className={`${styles.field} ${formData.lastName && user.lastName !== formData.lastName ? styles.active : ""}`}>
            <label htmlFor="lastName">Last name</label>
            <input type="text" id="lastName" name="lastName" autoComplete="off" value={formData.lastName} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
          </div>

          <div className={`${styles.field} ${formData.email && user.email !== formData.email ? styles.active : ""}`}>
            <label htmlFor="email">Email</label>
            
            <div className={styles.input_container}>
              <input type="text" id="email" name="email" autoComplete="off" value={formData.email} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
              <div className={`${styles.validity} ${formData.email && formData.email !== user.email ? (Helpers.checkEmailValidity(formData.email) ? styles.true : styles.false) : ""}`} />
            </div>
          </div>

          <div className={`${styles.field} ${formData.phoneNumber && user.phoneNumber !== formData.phoneNumber ? styles.active : ""}`}>
            <label htmlFor="phoneNumber">Phone number</label>
            
            <div className={styles.input_container}>
              <input type="text" id="phoneNumber" name="phoneNumber" autoComplete="off" value={formData.phoneNumber} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
              <div className={`${styles.validity} ${formData.phoneNumber && formData.phoneNumber !== user.phoneNumber ? (Helpers.checkPhoneNumberValidity(formData.phoneNumber) ? styles.true : styles.false) : ""}`} />
            </div>
          </div>

          <button type="submit">Update account</button>
        </form>
      </div>
    </div>
  );
}

export default Account;