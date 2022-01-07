import { useLayout } from '../src/hooks/layout';
import Error, { ErrorProps } from 'next/error';

const CustomError: React.FC<ErrorProps> = ({ title, statusCode }) => {
  useLayout({
    navbar: { show: false },
    footer: { show: false },
    header: { show: false },
  });
  return <Error
    title={title}
    statusCode={statusCode}
  />;
};

export default CustomError;
