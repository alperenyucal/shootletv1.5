import { NextPage } from 'next';
import { useLayout } from '../src/hooks/layout';

const Test: NextPage = () => {
  useLayout({
    navbar: { transparent: true },
  });

  return <div>sasas</div>;
};

export default Test;
