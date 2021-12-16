import { useContext } from "react";
import { RiMapPinUserFill } from "react-icons/ri";

import { UsersContext } from "../contexts/UsersContext";

import styles from "../styles/components/header.module.scss";
import Link from "./Link";

const Header: React.FC = () => {
  const { isLoggedIn } = useContext(UsersContext);

  return (
    <header className={styles.header}>
      
    </header>
  );
}

export default Header;