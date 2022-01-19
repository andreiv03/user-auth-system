import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from "../styles/components/not-found.module.scss";

const NotFound: React.FC = () => {
  const router = useRouter();
  
  useEffect(() => {
    const redirectTimeout = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(redirectTimeout);
  }, []);

  return (
    <div className={styles.not_found}>
      <h1>Not found</h1>
    </div>
  );
}

export default NotFound;