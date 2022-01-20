import dynamic from "next/dynamic";
import { useState } from "react";
import { RiEdit2Fill, RiDeleteBinFill } from "react-icons/ri";

import type { CategoriesInterface, CategoryFormDataInterface as FormData } from "../../interfaces/categories-interfaces";
import type { CategoriesComponentPropsInterface as PropsInterface } from "../../interfaces";

import styles from "../../styles/pages/settings.module.scss";
const SelectInput = dynamic(() => import("../select-input"));

const formDataInitialState: FormData = {
  name: "",
  parent: ""
};

const Categories: React.FC<PropsInterface> = ({ token, categories, callback: [callback, setCallback] }) => {
  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [categoryUpdate, setCategoryUpdate] = useState<CategoriesInterface>({} as CategoriesInterface);

  const handleUpdateFormCancel = () => {
    setFormData(formDataInitialState);
    setCategoryUpdate({} as CategoriesInterface);
  }

  const handleCategoryUpdate = async (category: CategoriesInterface) => {
    setFormData({ name: category.name, parent: category.parent });
    setCategoryUpdate({ _id: category._id, name: category.name, parent: category.parent });
  }

  const handleCategoryDelete = async (id: string) => {
    try {
      const { default: CategoriesService } = await import("../../services/categories-service");
      const { data } = await CategoriesService.deleteCategory(token, id);
      setFormData(formDataInitialState);
      setCategoryUpdate({} as CategoriesInterface);
      setCallback(!callback);
      alert(data.message);
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  const handleFormValidity = () => {
    if (!formData.name) return true;
    if (categoryUpdate._id && formData.name === categoryUpdate.name && formData.parent === categoryUpdate.parent) return true;
    return false;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let data;

      const { default: CategoriesService } = await import("../../services/categories-service");
      if (!categoryUpdate._id) ({ data } = await CategoriesService.createCategory(token, formData));
      else ({ data } = await CategoriesService.updateCategory(token, categoryUpdate._id, formData));

      setFormData(formDataInitialState);
      setCategoryUpdate({} as CategoriesInterface);
      setCallback(!callback);
      alert(data.message);
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <h3>{!categoryUpdate._id ? "Create" : "Update"} category</h3>
        <p>From here you can {!categoryUpdate._id ? "create" : "update"} a category.</p>

        <form onSubmit={handleFormSubmit} autoComplete="off">
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

          <SelectInput styles={styles} options={categories} name="parent" value={formData.parent} disabled={formData.name} setState={setFormData} />
          <button type="submit" disabled={handleFormValidity()}>
            {!categoryUpdate._id ? "Create" : "Update"}
          </button>
          {categoryUpdate._id && <button type="button" onClick={handleUpdateFormCancel}>Cancel</button>}
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