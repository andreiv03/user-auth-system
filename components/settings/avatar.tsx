import { useRef, useState } from "react";
import type { AccountComponentPropsInterface as PropsInterface } from "../../interfaces";

import styles from "../../styles/pages/settings.module.scss";

const Avatar: React.FC<PropsInterface> = ({ token, user, callback: [callback, setCallback] }) => {
  const [previewSource, setPreviewSource] = useState("");
  const formRef = useRef({} as HTMLFormElement);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") return;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => reader.readyState === 2 && setPreviewSource(reader.result as string);
  }

  const handleRemove = async () => {
    try {
      const { default: CloudinaryService } = await import("../../services/cloudinary-service");
      await CloudinaryService.delete(token, user.avatar.publicId);

      const { default: UserService } = await import("../../services/user-service");
      const { data } = await UserService.updateAvatar(token, user._id, { publicId: "", url: "" });

      setCallback(!callback);
      setPreviewSource("");
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

      const { default: CloudinaryService } = await import("../../services/cloudinary-service");
      ({ data } = await CloudinaryService.upload(token, previewSource));
      if (user.avatar.publicId) await CloudinaryService.delete(token, user.avatar.publicId);
      
      const { default: UserService } = await import("../../services/user-service");
      ({ data } = await UserService.updateAvatar(token, user._id, data));

      setCallback(!callback);
      setPreviewSource("");
      alert(data.message);
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <div className={styles.avatar}>
          <img src={previewSource ? previewSource : user.avatar.url ? user.avatar.url : "/avatar.jpg"} alt="Avatar" />
        </div>

        <form ref={formRef} onSubmit={handleFormSubmit}>
          <div className={`${styles.file} ${styles.avatar}`}>
            <input type="file" id="file" onChange={handleUpload} />
          </div>

          {previewSource ? (
            <>
              <button type="submit">Save</button>
              <button type="reset" onClick={() => { formRef.current.reset(), setPreviewSource("") }}>Cancel</button>
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