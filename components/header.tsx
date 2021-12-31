import { useRouter } from "next/router";
import { useContext } from "react";
import { SiNextdotjs } from "react-icons/si";
import { RiHomeSmile2Fill, RiSettings3Fill, RiShieldUserFill } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";

import Handlers from "../utils/handlers";
import { UserContext } from "../contexts/user-context";

import styles from "../styles/components/header.module.scss";
import Link from "./link";

const Header: React.FC = () => {
  const router = useRouter();
  const { token: [, setToken] } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href="/"><SiNextdotjs /></Link>
        </div>

        <div className={styles.items}>
          <div className={styles.item}>
            <Link href="/" styles={styles}><RiHomeSmile2Fill /></Link>
          </div>

          <div className={styles.item}>
            <Link href="/settings" styles={styles}><RiSettings3Fill /></Link>
          </div>
        </div>
      </div>

      <div className={styles.user}>
        {false ? (
          <div onClick={() => Handlers.handleLogout(router, setToken)}><MdOutlineLogout/></div>
        ) : (
          <Link href="/login"><RiShieldUserFill /></Link>
        )}
      </div>
    </header>
  );
}

export default Header;
