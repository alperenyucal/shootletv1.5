import classNames from 'classnames';
import styles from './Page.module.less';

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  centerItems?: boolean;
}

export const Page: React.FC<PageProps> = ({ centerItems = true, ...props }) => {
  return (
    <div
      className={classNames(props.className, styles.page, {
        [styles.centered]: centerItems,
      })}
    >
      {props.children}
    </div>
  );
};

export default Page;
