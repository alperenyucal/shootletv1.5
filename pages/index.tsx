import type { NextPage } from 'next';
import { useLayout } from '../hooks/layout';
import { Fade } from 'react-slideshow-image';

const Home: NextPage = () => {
  useLayout({
    navbar: { show: true, fixed: true, transparent: true },
    header: { show: false },
  });

  return (
    <div style={{ position: 'relative', zIndex: -9999 }}>
      <Fade arrows={false}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: 800,
            background: 'url(/mainpage1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div
          style={{
            display: 'flex',
            width: '100%',
            height: 800,
            background: 'url(/mainpage2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Fade>
    </div>
  );
};

export default Home;
