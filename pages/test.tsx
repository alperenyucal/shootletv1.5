import { NextPage } from 'next';
import { useLayout } from '../lib/hooks/layout';

const Test: NextPage = () => {
  useLayout({
    navbar: { transparent: true },
  });

  return <div>sasas</div>;
};

export default Test;
