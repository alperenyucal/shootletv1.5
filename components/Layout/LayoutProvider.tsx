import { ReactNode, useState } from 'react';
import { defaultLayoutState, LayoutContext } from './LayoutContext';
import { PageHeader } from 'antd';
import Spinner from '../Spinner/Spinner';
import { Navbar } from '.';
import styles from './Layout.module.less';
import classNames from 'classnames';

const PageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [layoutState, setLayoutState] = useState(defaultLayoutState);

  return (
    <LayoutContext.Provider value={{ setLayoutState }}>
      <div className={styles.layout}>
        <header
          className={layoutState.header?.show ? 'st-gradient-1' : undefined}
          style={{
            paddingBottom: layoutState.header?.show ? 100 : undefined,
          }}
        >
          {layoutState.navbar?.show && <Navbar {...layoutState.navbar} />}
          {layoutState.header?.show && (
            <PageHeader
              className="st-container st-force-white"
              {...layoutState.header}
            />
          )}
        </header>
        <main
          style={
            layoutState.header?.show
              ? { position: 'relative', top: -100, marginBottom: 100 }
              : { position: 'relative' }
          }
        >
          {children}
          {layoutState.loading && (
            <div>
              <Spinner />
            </div>
          )}
        </main>
        <footer></footer>
      </div>
    </LayoutContext.Provider>
  );
};

export default PageProvider;
