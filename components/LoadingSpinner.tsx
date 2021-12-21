import styles from "../styles/components/loading-spinner.module.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default LoadingSpinner;