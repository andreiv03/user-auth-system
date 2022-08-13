import Image from "next/image";
import styles from "../styles/components/header.module.scss";

const Header: React.FC = () => {
  

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/assets/logo-v1.svg"
          alt="E-commerce Website"
          layout="fill"
        />
      </div>
    </header>
  );
}

export default Header;