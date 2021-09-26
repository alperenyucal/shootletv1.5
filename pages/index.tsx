import { Button } from 'antd';
import type { NextPage } from 'next';
import { useLayout } from '../hooks/layout';
import Link from 'next/link';
const Home: NextPage = () => {
  useLayout({ navbar: { show: true } });

  return (
    <div>
      <Button>
        <Link href="/test"> test</Link>
      </Button>
    </div>
  );
};

export default Home;
