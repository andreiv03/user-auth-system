import { useContext, useEffect, useState } from "react";

import UsersService from "../../services/UsersService";
import Handlers from "../../services/Handlers";
import Helpers from "../../services/Helpers";
import { UsersContext } from "../../contexts/UsersContext";
import { AccountFormDataInterface as FormData } from "../../interfaces/UsersInterfaces";

import styles from "../../styles/pages/settings.module.scss";
import NotFound from "../NotFound";

const formDataInitialState: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: ""
};

const Account: React.FC = () => {
  const { token: [token], callback: [callback, setCallback], isLoggedIn, user } = useContext(UsersContext);
  const [formData, setFormData] = useState<FormData>(formDataInitialState);

  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  }, [user]);

  const handleProfileFormValidity = () => {
    if (!formData.firstName || !formData.lastName) return true;
    if (formData.firstName === user.firstName && formData.lastName === user.lastName) return true;
    return false;
  }

  const handleAccountFormValidity = () => {
    if (!formData.email || !formData.phoneNumber) return true;
    if (formData.email === user.email && formData.phoneNumber === user.phoneNumber) return true;
    if (!Helpers.checkEmailValidity(formData.email)) return true;
    if (!Helpers.checkPhoneNumberValidity(formData.phoneNumber)) return true;
    return false;
  }

  const handleProfileFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await UsersService.updateAccount(token, user._id, formData);
      setCallback(!callback);
      return alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  const handleAccountFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await UsersService.updateAccount(token, user._id, formData);
      setCallback(!callback);
      return alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  if (!isLoggedIn) return <NotFound />

  return (
    <div className={styles.content}>
      <div className={styles.top_section}>
        <h2>Account</h2>
      </div>

      <div className={styles.section}>
        <h3>Profile</h3>
        <p>This information will be displayed publicly, so be careful what you share.</p>

        <form onSubmit={handleProfileFormSubmit}>
          <div className={styles.field}>
            <input type="text" id="firstName" name="firstName" autoComplete="given-name" placeholder=" "
              value={formData.firstName} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="firstName">First name</label>
          </div>

          <div className={styles.field}>
            <input type="text" id="lastName" name="lastName" autoComplete="family-name" placeholder=" "
              value={formData.lastName} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="lastName">Last name</label>
          </div>

          <button type="submit" disabled={handleProfileFormValidity()}>Update</button>
        </form>
      </div>

      <div className={styles.section}>
        <h3>Personal informations</h3>
        <p>Here you can modify your account details.</p>

        <form onSubmit={handleAccountFormSubmit}>
          <div className={styles.field}>
            <input type="email" id="email" name="email" autoComplete="email" placeholder=" "
              value={formData.email} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="email">Email</label>

            <div className={`${styles.validity}
              ${formData.email !== user.email && formData.email ? (Helpers.checkEmailValidity(formData.email) ? styles.true : styles.false) : ""}`} />
          </div>

          <div className={styles.field}>
            <input type="text" id="phoneNumber" name="phoneNumber" autoComplete="tel-national" placeholder=" "
              value={formData.phoneNumber} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="phoneNumber">Phone number</label>

            <div className={`${styles.validity}
              ${formData.phoneNumber !== user.phoneNumber && formData.phoneNumber ? (Helpers.checkPhoneNumberValidity(formData.phoneNumber) ? styles.true : styles.false) : ""}`} />
          </div>

          <button type="submit" disabled={handleAccountFormValidity()}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Account;