import type { GetServerSidePropsContext, NextPage } from "next";
import { useState, useEffect, useRef, useContext } from "react";

import CategoriesModel from "../models/categories-model";
import { UserContext } from "../contexts/user-context";
import type { DashboardPropsInterface as PropsInterface } from "../interfaces";

import styles from "../styles/pages/settings.module.scss";
import LoadingSpinner from "../components/loading-spinner";
import Products from "../components/dashboard/products";
import Categories from "../components/dashboard/categories";

const Dashboard: NextPage<PropsInterface> = ({ categories }) => {
  const { token, user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(1);

  const wrapperRef = useRef({} as HTMLDivElement);

  useEffect(() => {
    const handleLoading = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(handleLoading);
  }, [isLoading]);

  const handleItemChange = (id: number) => {
    if (!isLoading && id !== activeItem) {
      wrapperRef.current.scroll(0, 0);
      setIsLoading(true);
      setActiveItem(id);
    }
  }

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
        {activeItem === 1 && <Products categories={categories} token={token} user={user} />}
        {activeItem === 2 && <Categories categories={categories} token={token} user={user} />}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { refreshToken } = context.req.cookies;

  if (!refreshToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: true
      }
    };
  }

  const categories = await CategoriesModel.find().select("name parent");

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories))
    }
  };
}

export default Dashboard;