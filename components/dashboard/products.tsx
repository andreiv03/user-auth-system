import dynamic from "next/dynamic";
import { useState } from "react";

import Helpers from "../../utils/helpers";
import type { ProductFormDataInterface as FormData } from "../../interfaces/products-interfaces";
import type { ProductsComponentPropsInterface as PropsInterface } from "../../interfaces";

import styles from "../../styles/pages/settings.module.scss";
const SelectInput = dynamic(() => import("../select-input"));

const formDataInitialState: FormData = {
  sku: "",
  name: "",
  description: "",
  price: "",
  category: ""
};

const Products: React.FC<PropsInterface> = ({ token, categories }) => {
  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [file, setFile] = useState<File>({} as File);
  const [previewSource, setPreviewSource] = useState("");

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") return;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => reader.readyState === 2 && setPreviewSource(reader.result as string);

    setFile(event.target.files[0]);
  }

  const handleFormValidity = () => {
    if (!formData.sku || !formData.name || !formData.description || !formData.price) return true;
    if (!file.name || file.size > 1024 * 1024) return true;
    return false;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let data;

      const { default: CloudinaryService } = await import("../../services/cloudinary-service");
      ({ data } = await CloudinaryService.upload(token, previewSource));

      const { default: ProductsService } = await import("../../services/products-service");
      ({ data } = await ProductsService.createProduct(token, formData, data));

      setFormData(formDataInitialState);
      setFile({} as File);
      setPreviewSource("");
      alert(data.message);
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <h3>Create product</h3>
        <p>From here you can create new products.</p>

        <form onSubmit={handleFormSubmit} autoComplete="off">
          <div className={styles.file}>
            <input type="file" id="file" onChange={handleUpload} />

            <div className={styles.container}>
              <label htmlFor="file" className={`${file.type ? styles.extension : ""} ${file.size > 1024 * 1024 ? styles.error : ""}`}>
                {file.type && <span>{file.type === "image/png" ? "png" : "jpg"}</span>}
              </label>

              <div className={styles.details}>
                <h3>{file.name ? Helpers.shortenFileName(file.name) : "No file"}</h3>
                <h4>{file.size ? Helpers.formatFileSize(file.size) : ""}{file.size > 1024 * 1024 ? <span> (too big)</span> : ""}</h4>
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <input
              type="text"
              id="sku"
              name="sku"
              placeholder=" "
              value={formData.sku}
              onChange={async event => {
                const { name, value } = event.target;
                const { default: Handlers } = await import("../../utils/handlers");
                Handlers.handleFormDataChange(name, value, setFormData);
              }}
            />
            <label htmlFor="sku">SKU (stock keeping unit)</label>
          </div>

          <div className={styles.field}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder=" "
              value={formData.name}
              onChange={async event => {
                const { name, value } = event.target;
                const { default: Handlers } = await import("../../utils/handlers");
                Handlers.handleFormDataChange(name, value, setFormData);
              }}
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className={`${styles.field} ${styles.textarea}`}>
            <textarea
              id="description"
              name="description"
              placeholder=" "
              value={formData.description}
              onChange={async event => {
                const { name, value } = event.target;
                const { default: Handlers } = await import("../../utils/handlers");
                Handlers.handleFormDataChange(name, value, setFormData);
              }}
            />
            <label htmlFor="description">Description</label>
          </div>
          
          <SelectInput styles={styles} options={categories} name="category" value={formData.category} setState={setFormData} />

          <div className={styles.field}>
            <input
              type="number"
              id="price"
              name="price"
              placeholder=" "
              value={formData.price}
              onChange={async event => {
                const { name, value } = event.target;
                const { default: Handlers } = await import("../../utils/handlers");
                Handlers.handleFormDataChange(name, value, setFormData);
              }}
            />
            <label htmlFor="price">Price</label>
          </div>

          <button type="submit" disabled={handleFormValidity()}>Create</button>
        </form>
      </div>
    </div>
  );
}

export default Products;