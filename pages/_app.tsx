import type { AppProps } from 'next/app';
import LayoutProvider from '../src/components/Layout/LayoutProvider';
import '../src/styles/globals.less';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <LayoutProvider>
      <Component {...pageProps} />
    </LayoutProvider>
  );
};

export default MyApp;
