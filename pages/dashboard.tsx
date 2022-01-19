import type { NextPage } from "next";
import { useState, useEffect, useRef, useContext } from "react";

import CategoriesService from "../services/categories-service";
import { UserContext } from "../contexts/user-context";

import styles from "../styles/pages/settings.module.scss";
import NotFound from "../components/not-found";
import LoadingSpinner from "../components/loading-spinner";
import Products from "../components/dashboard/products";
import Categories from "../components/dashboard/categories";
import { CategoriesInterface } from "../interfaces/categories-interfaces";

const categoriesInitialState: CategoriesInterface[] = [{
  _id: "",
  name: "",
  parent: ""
}];

const Dashboard: NextPage = () => {
  const { token: [token], user: [user] } = useContext(UserContext);
  const wrapperRef = useRef({} as HTMLDivElement);

  const [categories, setCategories] = useState<CategoriesInterface[]>(categoriesInitialState);
  const [callback, setCallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(1);

  useEffect(() => {
    if (!user._id || !user.isAdmin) return;

    const getCategories = async () => {
      try {
        const { data } = await CategoriesService.getCategories();
        setCategories(data);
      } catch (error: any) {
        return alert(error.response.data.message);
      }
    }

    getCategories();
  }, [user, callback]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(loadingTimeout);
  }, [isLoading]);

  const handleItemChange = (item: number) => {
    if (!isLoading && activeItem !== item) {
      wrapperRef.current.scroll(0, 0);
      setIsLoading(true);
      setActiveItem(item);
    }
  }

  if (!user._id || !user.isAdmin) return <NotFound />

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div className={styles.top_section}>
          <h1>Dashboard</h1>
        </div>

        <div className={styles.items}>
          <div className={`${styles.item} ${activeItem === 1 ? styles.active : ""}`} onClick={() => handleItemChange(1)}>
            <h2 title="Products">Products</h2>
          </div>

          <div className={`${styles.item} ${activeItem === 2 ? styles.active : ""}`} onClick={() => handleItemChange(2)}>
            <h2 title="Categories">Categories</h2>
          </div>
        </div>
      </div>

      <div ref={wrapperRef} className={`${styles.wrapper} ${isLoading ? styles.loading : ""}`}>
        {isLoading && <LoadingSpinner />}
        {activeItem === 1 && <Products token={token} categories={categories} />}
        {activeItem === 2 && <Categories token={token} categories={categories} callback={[callback, setCallback]} />}
      </div>
    </div>
  );
}

export default Dashboard;