import { useContext, useEffect, useState } from "react";
import { RiEyeOffFill, RiEyeFill } from "react-icons/ri";

import UsersService from "../../services/UsersService";
import Handlers from "../../services/Handlers";
import Helpers from "../../services/Helpers";
import { UsersContext } from "../../contexts/UsersContext";

import styles from "../../styles/pages/settings.module.scss";
import NotFound from "../NotFound";

const Products: React.FC = () => {
  const { token: [token], isLoggedIn, user } = useContext(UsersContext);

  if (!isLoggedIn) return <NotFound />

  return (
    <div className={styles.content}>
    </div>
  );
}

export default Products;