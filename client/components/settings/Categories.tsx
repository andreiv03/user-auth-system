import { useContext, useState } from "react";
import { RiEdit2Fill, RiDeleteBinFill } from "react-icons/ri";

import CategoriesService from "../../services/CategoriesService";
import Handlers from "../../services/Handlers";
import { UsersContext } from "../../contexts/UsersContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { CategoriesInterface, CategoryFormDataInterface as FormData, CategoryUpdateInterface } from "../../interfaces/CategoriesInterfaces";

import styles from "../../styles/pages/settings.module.scss";
import NotFound from "../NotFound";
import SelectInput from "../SelectInput";

const formDataInitialState: FormData = {
  name: "",
  parent: ""
};

const Categories: React.FC = () => {
  const { token: [token], isLoggedIn, user } = useContext(UsersContext);
  const { callback: [callback, setCallback], categories } = useContext(CategoriesContext);

  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [categoryUpdate, setCategoryUpdate] = useState<CategoryUpdateInterface>({} as CategoryUpdateInterface);

  const handleFormValidity = () => {
    if (!formData.name) return true;
    if (categoryUpdate.id && formData.name === categoryUpdate.name) return true;
    return false;
  }

  const handleUpdateFormCancel = () => {
    setFormData(formDataInitialState);
    setCategoryUpdate({} as CategoryUpdateInterface);
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let data;
      if (!categoryUpdate.id) ({ data } = await CategoriesService.createCategory(token, formData));
      else ({ data } = await CategoriesService.updateCategory(token, categoryUpdate.id, formData));

      setFormData(formDataInitialState);
      setCategoryUpdate({} as CategoryUpdateInterface);
      setCallback(!callback);
      return alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  const handleCategoryUpdate = async (category: CategoriesInterface) => {
    setFormData({ name: category.name, parent: category.parent });
    setCategoryUpdate({ id: category._id, name: category.name });
  }

  const handleCategoryDelete = async (id: string) => {
    try {
      const { data } = await CategoriesService.deleteCategory(token, id);
      setFormData(formDataInitialState);
      setCategoryUpdate({} as CategoryUpdateInterface);
      setCallback(!callback);
      return alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  if (!isLoggedIn || !user.isAdmin) return <NotFound />

  return (
    <div className={styles.content}>
      <div className={styles.top_section}>
        <h2>Categories</h2>
      </div>

      <div className={styles.section}>
        <h3>{!categoryUpdate.id ? "Create" : "Update"} category</h3>
        <p>From here you can {!categoryUpdate.id ? "create" : "update"} a category.</p>

        <form onSubmit={handleFormSubmit} autoComplete="off">
          <div className={styles.field}>
            <input type="text" id="name" name="name" placeholder=" "
              value={formData.name} onChange={event => Handlers.handleFormDataChange(event, setFormData)} />
            <label htmlFor="name">Name</label>
          </div>

          <SelectInput styles={styles} options={categories} name="parent" value={formData.parent} setState={setFormData} />
          <button type="submit" disabled={handleFormValidity()}>{!categoryUpdate.id ? "Create" : "Update"}</button>
          {categoryUpdate.id && <button type="button" onClick={handleUpdateFormCancel}>Cancel</button>}
        </form>
      </div>

      {categories.length ? (
        <div className={styles.section}>
          <h3>Manage categories</h3>
          <p>View, modify or delete any category.</p>

          <div className={styles.items}>
            {categories.map(category => (
              <div key={category.name} className={styles.item}>
                <div className={styles.content}>
                  <h3>{category.name}</h3>
                  <h4>Parent: {category.parent ? category.parent : "N/A"}</h4>
                </div>

                <div className={styles.buttons}>
                  <div className={styles.button} onClick={() => handleCategoryUpdate(category)}><RiEdit2Fill /></div>
                  <div className={styles.button} onClick={() => handleCategoryDelete(category._id)}><RiDeleteBinFill /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Categories;