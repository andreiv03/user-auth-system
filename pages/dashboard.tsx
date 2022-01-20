import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef, useContext } from "react";

import { UserContext } from "../contexts/user-context";
import type { CategoriesInterface } from "../interfaces/categories-interfaces";

import styles from "../styles/pages/settings.module.scss";
const NotFound = dynamic(() => import("../components/not-found"));
const LoadingSpinner = dynamic(() => import("../components/loading-spinner"));
const Products = dynamic(() => import("../components/dashboard/products"));
const Categories = dynamic(() => import("../components/dashboard/categories"));

const categoriesInitialState: CategoriesInterface[] = [{
  _id: "",
  name: "",
  parent: ""
}];

const Dashboard: NextPage = () => {
  const { token: [token], user: [user] } = useContext(UserContext);
  
  const [categories, setCategories] = useState<CategoriesInterface[]>(categoriesInitialState);
  const [callback, setCallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(1);
  const wrapperRef = useRef({} as HTMLDivElement);
  
  useEffect(() => {
    if (!user._id || !user.isAdmin) return;

    const getCategories = async () => {
      try {
        const { default: CategoriesService } = await import("../services/categories-service");
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