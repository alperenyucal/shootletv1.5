import '../styles/globals.less';
import 'flag-icon-css/css/flag-icons.min.css';

import type { AppProps } from 'next/app';
import LayoutProvider from '../components/Layout/LayoutProvider';
import setupAxios from '../lib/redux/setupAxios';
import store from '../lib/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { LoadingScreen } from '../components/templates';
import '../lib/locale/setupLocale';

setupAxios(store);
const persistor = persistStore(store);

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingScreen />}
        persistor={persistor}
      >
        <LayoutProvider>
          <Component {...pageProps} />
        </LayoutProvider>
      </PersistGate>
    </Provider>
  );
};

export default CustomApp;
