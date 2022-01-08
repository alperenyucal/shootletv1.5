import { Spinner } from '../..';
import styles from './LoadingScreen.module.less';


export function LoadingScreen() {
  return (
    <div className={styles.page}>
      <Spinner />
    </div>
  );
}
