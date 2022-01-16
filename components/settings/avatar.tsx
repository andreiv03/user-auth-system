import React, { useRef, useState } from "react";

import UserService from "../../services/user-service";
import APIs from "../../services/apis";
import Handlers from "../../utils/handlers";
import type { AccountPropsInterface as PropsInterface } from "../../interfaces";

import styles from "../../styles/pages/settings.module.scss";

const Avatar: React.FC<PropsInterface> = ({ token, user, callback: [callback, setCallback] }) => {
  const [file, setFile] = useState<File>({} as File);
  const [url, setUrl] = useState<string>("");
  const formRef = useRef({} as HTMLFormElement);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") return;

    const reader = new FileReader();
    reader.onload = () => reader.readyState === 2 && setUrl(reader.result as string);
    reader.readAsDataURL(event.target.files[0]);

    Handlers.handleFileUpload(event, setFile);
  }

  const handleRemove = async () => {
    try {
      const { data } = await APIs.googleDriveDelete(token, user.avatar.fileId);
      await UserService.updateAvatar(token, user._id, { fileId: "", url: "" });

      setCallback(!callback);
      setFile({} as File);
      setUrl("");
      alert(data.message);
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formRef.current.reset();
    
    try {
      let data;
      ({ data } = await APIs.googleDriveUpload(token, file));
      ({ data } = await UserService.updateAvatar(token, user._id, data));

      setCallback(!callback);
      setFile({} as File);
      setUrl("");
      alert(data.message);
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <div className={styles.avatar}>
          {user._id ? (
            <img src={url && typeof url === "string" ? url : user.avatar.url ? user.avatar.url : "/avatar.jpg"} alt="Avatar" />
          ) : (
            <img src="/avatar.jpg" alt="Unknown avatar" />
          )}
        </div>

        <form ref={formRef} onSubmit={handleFormSubmit}>
          <div className={`${styles.file} ${styles.avatar}`}>
            <input type="file" id="file" onChange={handleUpload} />
          </div>

          {url ? (
            <>
              <button type="submit">Save</button>
              <button type="reset" onClick={() => { setFile({} as File), setUrl("") }}>Cancel</button>
            </>
          ) : (
            <>
              <label htmlFor="file" className={styles.button}>Upload</label>
              <button type="reset" disabled={!user.avatar.url} onClick={handleRemove}>Remove</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Avatar;