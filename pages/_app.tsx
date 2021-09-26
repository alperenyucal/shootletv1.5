import type { AppProps } from 'next/app';
import LayoutProvider from '../components/Layout/LayoutProvider';
import '../styles/globals.less';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <LayoutProvider>
      <Component {...pageProps} />
    </LayoutProvider>
  );
};

export default MyApp;
