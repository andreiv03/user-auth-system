import Link from "next/link";
import React, { useContext, useState } from "react";
import { RiUserLine, RiShieldUserLine, RiShoppingBag3Line, RiSearchEyeLine } from "react-icons/ri";

import { UsersContext } from "../contexts/UsersContext";
import { ProductsContext } from "../contexts/ProductsContext";

import styles from "../styles/components/header.module.scss";

const Header: React.FC = () => {
  const { isLoggedIn, isAdmin } = useContext(UsersContext);
  const [test, setTest] = useState("")

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">VET RUE SHOP</Link>
        </div>
        
        <div className={styles.buttons}>
          {isLoggedIn ? (
            <Link href="/account"><a><RiUserLine /></a></Link>
          ) : (
            <Link href="/login"><a><RiUserLine /></a></Link>
          )}
          {isAdmin && <Link href="/dashboard"><a><RiShieldUserLine /></a></Link>}
          <Link href="/"><a><RiShoppingBag3Line /></a></Link>
          <Link href="/"><a><RiSearchEyeLine /></a></Link>
        </div>
      </div>

      <div className={styles.search_field}>
        <input type="text" name="search" id="search" value={test} onChange={e => setTest(e.target.value)} />
        <button><RiSearchEyeLine /></button>
      </div>
    </header>
  );
}

export default Header;