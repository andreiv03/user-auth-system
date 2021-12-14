import Link from "next/link";
import { useContext, useState } from "react";
import {  } from "react-icons/ri";

import { UsersContext } from "../contexts/UsersContext";
import styles from "../styles/components/header.module.scss";

const Header: React.FC = () => {
  const { isLoggedIn, user } = useContext(UsersContext);

  return (
    <header className={styles.header}>
      
    </header>
  );
}

export default Header;