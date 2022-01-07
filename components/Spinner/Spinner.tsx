import styles from './Spinner.module.less';

export const Spinner: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.lt} />
    <div className={styles.rt} />
    <div className={styles.lb} />
    <div className={styles.rb} />
  </div>
);

export default Spinner;
