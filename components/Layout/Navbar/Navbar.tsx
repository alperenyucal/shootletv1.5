import { Button, Space, Menu, Drawer } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { MenuOutlined } from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import { usePageOffset } from '../../../hooks/page';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.less';
import classNames from 'classnames';

export interface NavbarProps {
  fixed?: boolean;
  transparent?: boolean;
  color?: 'black' | 'white';
  logoType?: 'dark' | 'light';
}

export const Navbar: React.FC<NavbarProps> = ({
  fixed = false,
  transparent = false,
  color,
  logoType,
}) => {
  const breakpoint = useBreakpoint();
  const { pageYOffset } = usePageOffset();
  const [showDrawerMenu, setShowDrawerMenu] = useState(false);

  const isTransparent = useMemo(
    () => transparent && pageYOffset < 20,
    [pageYOffset, transparent],
  );

  const customClassName = useMemo(
    () =>
      classNames(styles.navbar, 'st-container', {
        [styles.fixed]: fixed,
        [styles.black]: color === 'black',
        [styles.white]: color === 'white',
        [styles.transparent]: isTransparent,
      }),
    [color, fixed, isTransparent],
  );

  const isLight = useMemo(() => {
    if (logoType) return logoType === 'light';
    if (color) return color === 'white';

    return isTransparent;
  }, [color, isTransparent, logoType]);

  return (
    <div className={customClassName}>
      <Link href="/" passHref>
        <div>
          <Image
            src={isLight ? '/shootlet-light.png' : '/shootlet-logo.png'}
            layout="intrinsic"
            width={140}
            height={50}
            alt=""
            objectFit="contain"
          />
        </div>
      </Link>
      {!breakpoint.lg ? (
        <>
          <Button
            shape="circle"
            size="large"
            className="st-push"
            type="text"
            onClick={() => {
              setShowDrawerMenu(true);
            }}
          >
            <MenuOutlined />
          </Button>
          <Drawer
            forceRender
            title={<span>Welcome Guest!</span>}
            placement="right"
            onClose={() => {
              setShowDrawerMenu(false);
            }}
            visible={showDrawerMenu}
            bodyStyle={{ padding: 0 }}
          >
            <Menu mode="inline">
              <Menu.Item key="register">
                <Button type="primary" block>
                  <Link href="/register">Register</Link>
                </Button>
              </Menu.Item>
              <Menu.Item key="login">
                <Button block>
                  <Link href="/login">Sign In</Link>
                </Button>
              </Menu.Item>
              <Menu.Divider />
            </Menu>
          </Drawer>
        </>
      ) : (
        <>
          <Space align="center" style={{ marginLeft: '50px' }}>
            <Button type="text">
              <Link href="/dashboard">Switch to selling</Link>
            </Button>
            <Button type="text">
              <Link href="/places">Places</Link>
            </Button>
          </Space>
          <Space className="st-push">
            <Button type="text">
              <Link href="/login">Log in</Link>
            </Button>
            <Button ghost={!isTransparent} type="primary">
              <Link href="/register">Join Us</Link>
            </Button>
          </Space>
        </>
      )}
    </div>
  );
};

export default Navbar;
