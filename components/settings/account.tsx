import { useEffect, useState } from "react";

import type { AccountFormDataInterface as FormData } from "../../interfaces/user-interfaces";
import type { AccountPropsInterface as PropsInterface } from "../../interfaces";

import styles from "../../styles/pages/settings.module.scss";

const formDataInitialState: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: ""
};

const Account: React.FC<PropsInterface> = ({ token, user, callback: [callback, setCallback] }) => {
  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  }, [user]);

  useEffect(() => {
    if (formData.email === user.email || !formData.email) return;

    const checkEmailValidity = async () => {
      const { default: Helpers } = await import("../../utils/helpers");
      setIsEmailValid(Helpers.checkEmailValidity(formData.email));
    }

    checkEmailValidity();
  }, [formData.email]);

  useEffect(() => {
    if (formData.phoneNumber === user.phoneNumber || !formData.phoneNumber) return;

    const checkPhoneNumberValidity = async () => {
      const { default: Helpers } = await import("../../utils/helpers");
      setIsPhoneNumberValid(Helpers.checkPhoneNumberValidity(formData.phoneNumber));
    }

    checkPhoneNumberValidity();
  }, [formData.phoneNumber]);

  const handleProfileFormValidity = () => {
    if (!formData.firstName || !formData.lastName) return true;
    if (formData.firstName === user.firstName && formData.lastName === user.lastName) return true;
    return false;
  }

  const handleContactFormValidity = () => {
    if (!formData.email || !formData.phoneNumber) return true;
    if (formData.email === user.email && formData.phoneNumber === user.phoneNumber) return true;
    if (!isEmailValid || !isPhoneNumberValid) return true;
    return false;
  }

  const handleProfileFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { default: UserService } = await import("../../services/user-service");
      const { data } = await UserService.updateUser(token, user._id, formData);
      setCallback(!callback);
      alert(data.message);
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  const handleContactFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { default: UserService } = await import("../../services/user-service");
      const { data } = await UserService.updateUser(token, user._id, formData);
      setCallback(!callback);
      alert(data.message);
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <h3>Profile</h3>
        <p>This information will be displayed publicly, so be careful what you share.</p>

        <form onSubmit={handleProfileFormSubmit}>
          <div className={styles.field}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              placeholder=" "
              value={formData.firstName}
              onChange={async event => {
                const { name, value } = event.target;
                const { default: Handlers } = await import("../../utils/handlers");
                Handlers.handleFormDataChange(name, value, setFormData);
              }}
            />
            <label htmlFor="firstName">First name</label>
          </div>

          <div className={styles.field}>
            <input
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              placeholder=" "
              value={formData.lastName}
              onChange={async event => {
                const { name, value } = event.target;
                const { default: Handlers } = await import("../../utils/handlers");
                Handlers.handleFormDataChange(name, value, setFormData);
              }}
            />
            <label htmlFor="lastName">Last name</label>
          </div>

          <button type="submit" disabled={handleProfileFormValidity()}>Update</button>
        </form>
      </div>

      <div className={styles.section}>
        <h3>Contact</h3>
        <p>From here you can modify your contact information.</p>

        <form onSubmit={handleContactFormSubmit}>
          <div className={styles.field}>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder=" "
              value={formData.email}
              onChange={async event => {
                const { name, value } = event.target;
                const { default: Handlers } = await import("../../utils/handlers");
                Handlers.handleFormDataChange(name, value, setFormData);
              }}
            />
            <label htmlFor="email">Email</label>
            <div className={`${styles.validity} ${formData.email !== user.email && formData.email ? (isEmailValid ? styles.true : styles.false) : ""}`} />
          </div>

          <div className={styles.field}>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              autoComplete="tel-national"
              placeholder=" "
              value={formData.phoneNumber}
              onChange={async event => {
                const { name, value } = event.target;
                const { default: Handlers } = await import("../../utils/handlers");
                Handlers.handleFormDataChange(name, value, setFormData);
              }}
            />
            <label htmlFor="phoneNumber">Phone number</label>
            <div className={`${styles.validity} ${formData.phoneNumber !== user.phoneNumber && formData.phoneNumber ? (isPhoneNumberValid ? styles.true : styles.false) : ""}`} />
          </div>

          <button type="submit" disabled={handleContactFormValidity()}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Account;