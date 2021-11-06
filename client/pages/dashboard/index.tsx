import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { RiHammerLine, RiArticleLine, RiArrowRightSLine } from "react-icons/ri";

import ProductsService from "../../services/ProductsService";
import APIs from "../../services/APIs";
import Handlers from "../../services/Handlers";
import Helpers from "../../services/Helpers";
import { UsersContext } from "../../contexts/UsersContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { ProductFormDataInterface as FormData } from "../../interfaces/ProductsInterfaces";

import styles from "../../styles/pages/dashboard.module.scss";
import NotFound from "../../components/NotFound";
import ComboBox from "../../components/ComboBox";

const formDataInitialState: FormData = {
  sku: "",
  name: "",
  description: "",
  price: "",
  category: ""
};

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { token: [token], user } = useContext(UsersContext);
  const { categories, callback: [callback, setCallback] } = useContext(CategoriesContext);

  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [fileUploaded, setFileUploaded] = useState<File>({} as File);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!formData.sku || !formData.name || !formData.description || !formData.price)
        return alert("Please fill in all the fields!");
      
      else if (!fileUploaded)
        return alert("Please upload an image!");

      else if (fileUploaded.size > 1024 * 1024)
        return alert("The uploaded image is too big!");
      
      const { data: googleDriveUploadData } = await APIs.googleDriveUpload(token, fileUploaded);

      const { data: createProductData } = await ProductsService.createProduct(token, formData, googleDriveUploadData);
      setFormData(formDataInitialState);
      setFileUploaded({} as File);
      setCallback(!callback);

      return alert(createProductData.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  if (!user.isAdmin)
    return <NotFound />

  return (
    <div className={styles.page}>
      <div className={styles.sections}>
        <div className={`${styles.section} ${styles.selected}`}>
          <div className={styles.icon}><RiHammerLine /></div>
          <div className={styles.text}>
            <h2>Products</h2>
            <h3>Create a new product</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>

        <div className={styles.section} onClick={() => router.push("/dashboard/categories")}>
          <div className={styles.icon}><RiArticleLine /></div>
          <div className={styles.text}>
            <h2>Categories</h2>
            <h3>Manage categories</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.top_section}>
          <h2>Products</h2>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ante odio.</h3>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className={styles.file}>
            <div className={styles.container}>
              <label htmlFor="file" className={`${fileUploaded.type ? styles.extension : ""} ${fileUploaded.size > 1024 * 1024 ? styles.error : ""}`}>
                {fileUploaded.type && <span>{fileUploaded.type === "image/png" ? "png" : "jpg"}</span>}
              </label>
              <div className={styles.details}>
                <h3>{fileUploaded.name ? Helpers.shortenFileName(fileUploaded.name) : "No file uploaded"}</h3>
                <h4>{fileUploaded.size ? `${fileUploaded.size} bytes ` : ""}<span>{fileUploaded.size > 1024 * 1024 ? "(too big)" : ""}</span></h4>
              </div>
            </div>
            <input type="file" id="file" onChange={event => Handlers.handleFileUpload(event, setFileUploaded)} />
          </div>

          <div className={styles.field}>
            <label htmlFor="sku">SKU (stock keeping unit)</label>
            <input type="text" id="sku" name="sku" autoComplete="off" value={formData.sku} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
          </div>

          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" autoComplete="off" value={formData.name} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" autoComplete="off" rows={7} value={formData.description} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
          </div>

          <div className={styles.field}>
            <label htmlFor="category">Category</label>
            <ComboBox styles={styles} options={categories} name="category" value={formData.category} setState={setFormData} />
          </div>

          <div className={styles.field}>
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" autoComplete="off" value={formData.price} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
          </div>

          <button type="submit">Create product</button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;