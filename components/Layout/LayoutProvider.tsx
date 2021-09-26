import { ReactNode, useState } from 'react';
import { defaultLayoutState, LayoutContext } from './LayoutContext';
import { PageHeader } from 'antd';
import Spinner from '../Spinner/Spinner';
import { Navbar } from '.';
import styles from './Layout.module.less';

const PageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [layoutState, setLayoutState] = useState(defaultLayoutState);

  return (
    <LayoutContext.Provider value={{ setLayoutState }}>
      <div className={styles.layout}>
        {layoutState.navbar?.show && <Navbar {...layoutState.navbar} />}
        {layoutState.header?.show && (
          <PageHeader {...layoutState.header} className="arc-header light" />
        )}
        {children}
        {layoutState.loading && (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </LayoutContext.Provider>
  );
};

export default PageProvider;
