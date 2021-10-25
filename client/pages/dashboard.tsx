import { NextPage } from "next";
import React, { useContext, useState } from "react";
import { RiHammerLine, RiArticleLine, RiArrowRightSLine, RiDeleteBinLine, RiDraftLine } from "react-icons/ri";

import ProductsService from "../services/ProductsService";
import { UsersContext } from "../contexts/UsersContext";
import { ProductsContext } from "../contexts/ProductsContext";
import { CategoriesInterface, ProductsInterface } from "../interfaces/ProductsInterfaces";

import styles from "../styles/pages/dashboard.module.scss";
import NotFound from "../components/NotFound";
import ComboBox from "../components/ComboBox";

const productFormDataInitialState: ProductsInterface = {
  sku: "",
  name: "",
  description: "",
  price: "",
  category: ""
};

const categoryFormDataInitialState: CategoriesInterface = {
  name: "",
  parent: ""
};

const Dashboard: NextPage = () => {
  const { token: [token], isAdmin } = useContext(UsersContext);
  const { callback: [callback, setCallback], categories } = useContext(ProductsContext);
  
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [productFormData, setProductFormData] = useState<ProductsInterface>(productFormDataInitialState);
  const [categoryFormData, setCategoryFormData] = useState<CategoriesInterface>(categoryFormDataInitialState);
  const [isUpdateCategoryFormActive, setIsUpdateCategoryFormActive] = useState<boolean>(false);

  // Input Handlers
  const handleProductFormDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setProductFormData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));

  const handleProductFormSelectInputChange = (category: string) => 
    setProductFormData(prevState => ({ ...prevState, category }));
  
  const handleCategoryFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCategoryFormData(prevState => ({ ...prevState, [event.target.name]: event.target.value }));

  const handleCategoryFormSelectInputChange = (parent: string) => 
    setCategoryFormData(prevState => ({ ...prevState, parent }));

  // Products Section Form Handler
  const handleProductFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!productFormData.sku || !productFormData.name || !productFormData.description || !productFormData.price)
        return alert("Please fill in all the fields!");

      const { data } = await ProductsService.createProduct(token, productFormData);
      setProductFormData(productFormDataInitialState);
      setCallback(!callback);

      alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  // Categories Section Form Handler
  const handleCategoryFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!categoryFormData.name)
        return alert("Please fill in the \"name\" field!");

      if (!isUpdateCategoryFormActive) {
        const { data } = await ProductsService.createCategory(token, categoryFormData);
        setCategoryFormData(categoryFormDataInitialState);
        setCallback(!callback);
  
        alert(data.message);
      } else {
        const { data } = await ProductsService.updateCategory(token, categoryFormData._id, categoryFormData);
        setCategoryFormData(categoryFormDataInitialState);
        setIsUpdateCategoryFormActive(false);
        setCallback(!callback);
  
        alert(data.message);
      }
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  const handleCategoryUpdate = async (category: CategoriesInterface) => {
    setIsUpdateCategoryFormActive(true);
    setCategoryFormData({
      _id: category._id,
      name: category.name,
      parent: category.parent
    });
  }

  const handleCategoryDelete = async (category: CategoriesInterface) => {
    try {
      const { data } = await ProductsService.deleteCategory(token, category._id);
      setCallback(!callback);

      alert(data.message);
    } catch (error: any) {
      return alert(error.response?.data.message);
    }
  }

  if (!isAdmin)
    return <NotFound />

  return (
    <div className={styles.page}>
      <div className={styles.sections}>
        <div className={`${styles.section} ${currentSection === 0 ? styles.selected : ""}`} onClick={() => setCurrentSection(0)}>
          <div className={styles.icon}><RiHammerLine /></div>
          <div className={styles.text}>
            <h2>Products</h2>
            <h3>Create a new product</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>

        <div className={`${styles.section} ${currentSection === 1 ? styles.selected : ""}`} onClick={() => setCurrentSection(1)}>
          <div className={styles.icon}><RiArticleLine /></div>
          <div className={styles.text}>
            <h2>Categories</h2>
            <h3>Manage categories</h3>
          </div>
          <div className={styles.arrow}><RiArrowRightSLine /></div>
        </div>
      </div>

      <div className={styles.content}>
        {currentSection === 0 && (
          <div className={styles.container}>
            <div className={styles.top_section}>
              <h2>Products</h2>
            </div>

            <form onSubmit={handleProductFormSubmit}>
              <div className={styles.field}>
                <label htmlFor="sku">SKU (stock keeping unit)</label>
                <input type="text" id="sku" name="sku" autoComplete="off" value={productFormData.sku} onChange={handleProductFormDataChange} />
              </div>

              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" autoComplete="off" value={productFormData.name} onChange={handleProductFormDataChange} />
              </div>

              <div className={styles.field}>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" autoComplete="off" rows={7} value={productFormData.description} onChange={handleProductFormDataChange} />
              </div>

              <div className={styles.field}>
                <label htmlFor="category">Category</label>
                <ComboBox styles={styles} options={categories} handler={handleProductFormSelectInputChange} value={productFormData.category} />
              </div>

              <div className={styles.field}>
                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" autoComplete="off" value={productFormData.price} onChange={handleProductFormDataChange} />
              </div>

              <button type="submit">Create product</button>
            </form>
          </div>
        )}

        {currentSection === 1 && (
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.top_section}>
                <h2>Create Category</h2>
              </div>

              <form onSubmit={handleCategoryFormSubmit}>
                <div className={styles.field}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" autoComplete="off" value={categoryFormData.name} onChange={handleCategoryFormDataChange} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="parent">Parent category</label>
                  <ComboBox styles={styles} options={categories} handler={handleCategoryFormSelectInputChange} value={categoryFormData.parent} />
                </div>

                <button type="submit">{isUpdateCategoryFormActive ? "Update category" : "Create category"}</button>
              </form>
            </div>

            {categories.length && (
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
                        <div className={styles.button} onClick={() => handleCategoryUpdate(category)}><RiDraftLine /></div>
                        <div className={styles.button} onClick={() => handleCategoryDelete(category)}><RiDeleteBinLine /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;