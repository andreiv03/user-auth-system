import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { RiHammerLine, RiArticleLine, RiArrowRightSLine, RiDeleteBinLine, RiDraftLine } from "react-icons/ri";

import CategoriesService from "../../services/CategoriesService";
import Handlers from "../../services/Handlers";
import { UsersContext } from "../../contexts/UsersContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { CategoriesInterface } from "../../interfaces/CategoriesInterfaces";

import styles from "../../styles/pages/dashboard.module.scss";
import NotFound from "../../components/NotFound";
import ComboBox from "../../components/ComboBox";

const formDataInitialState: CategoriesInterface = {
  _id: "",
  name: "",
  parent: ""
};

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { token: [token], user } = useContext(UsersContext);
  const { categories, callback: [callback, setCallback] } = useContext(CategoriesContext);
  
  const [formData, setFormData] = useState<CategoriesInterface>(formDataInitialState);
  const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!formData.name)
        return alert("Please fill in the \"name\" field!");

      if (!isUpdateForm) {
        const { data } = await CategoriesService.createCategory(token, formData);
        alert(data.message);
      } else {
        const { data } = await CategoriesService.updateCategory(token, formData);
        alert(data.message);
      }

      setFormData(formDataInitialState);
      setIsUpdateForm(false);
      setCallback(!callback);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  const handleCategoryDelete = async (id: string) => {
    try {
      const { data } = await CategoriesService.deleteCategory(token, id);
      setCallback(!callback);

      return alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  if (!user.isAdmin)
    return <NotFound />

  return (
    <div className={styles.page}>
      <div className={styles.sections}>
        <div className={styles.section} onClick={() => router.push("/dashboard")}>
          <div className={styles.icon}><RiHammerLine /></div>
          <div className={styles.text}>
            <h2>Products</h2>
            <h3>Create a new product</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>

        <div className={`${styles.section} ${styles.selected}`}>
          <div className={styles.icon}><RiArticleLine /></div>
          <div className={styles.text}>
            <h2>Categories</h2>
            <h3>Manage categories</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={styles.top_section}>
            <h2>Create Category</h2>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ante odio.</h3>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" autoComplete="off" value={formData.name} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            </div>

            <div className={styles.field}>
              <label htmlFor="parent">Parent category</label>
              <ComboBox styles={styles} options={categories} name="parent" value={formData.parent} setState={setFormData} />
            </div>

            <button type="submit">{isUpdateForm ? "Update category" : "Create category"}</button>
          </form>
        </div>

        {categories.length ? (
          <div className={styles.wrapper}>
            <div className={styles.top_section}>
              <h2>Categories</h2>
            </div>

            <div className={styles.items}>
              {categories.map(category => (
                <div key={category.name} className={styles.item}>
                  <div className={styles.text}>
                    <h3>{category.name}</h3>
                    <h4>Parent: {category.parent ? category.parent : "N/A"}</h4>
                  </div>

                  <div className={styles.buttons}>
                    <div className={styles.button} onClick={() => { setFormData(category), setIsUpdateForm(true) }}><RiDraftLine /></div>
                    <div className={styles.button} onClick={() => handleCategoryDelete(category._id)}><RiDeleteBinLine /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;