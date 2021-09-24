import type { AppProps } from 'next/app';
import '../styles/globals.less';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
