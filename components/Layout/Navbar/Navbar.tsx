import { Button, Space, Menu, Drawer, Dropdown } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { MenuOutlined } from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import { usePageOffset } from '../../../lib/hooks/page';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.less';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/redux';
import { logout, selectAuth } from '../../../lib/redux/auth/authSlice';
import { AvatarSection } from './Avatar/Avatar';
import { useRouter } from 'next/router';

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
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isAuthorized, user } = useAppSelector(selectAuth);

  function handleLogout() {
    dispatch(logout());
    router.push('/');
  }

  const breakpoint = useBreakpoint();

  const { pageYOffset } = usePageOffset();
  const [showDrawerMenu, setShowDrawerMenu] = useState(false);

  const isTransparent = useMemo(
    () => transparent && pageYOffset < 20,
    [pageYOffset, transparent],
  );

  const isLight = useMemo(() => {
    if (logoType) return logoType === 'light';
    if (color) return color === 'white';

    return isTransparent;
  }, [color, isTransparent, logoType]);


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


  const UserMenu = (
    <Menu>
      {/* <Menu.Item>Profile</Menu.Item>
      <Menu.Item>Dashboard</Menu.Item>
      <Menu.Item>Settings</Menu.Item>
      <Menu.Item>Switch language</Menu.Item>
      <Menu.Item>My Wallet</Menu.Item>
      <Menu.Item>{"Help & Support"}</Menu.Item>
      <Menu.Divider /> */}
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );
  return (
    <div className={customClassName}>
      <Link
        href="/"
        passHref
      >
        <div>
          <Image
            src={isLight ? '/shootlet-light.png' : '/shootlet-logo.png'}
            layout="intrinsic"
            width={140}
            height={50}
            alt="logo"
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
            title={
              isAuthorized ? <AvatarSection user={user} /> :
                <span>Welcome Guest!</span>
            }
            placement="right"
            onClose={() => {
              setShowDrawerMenu(false);
            }}
            visible={showDrawerMenu}
            bodyStyle={{ padding: 0 }}
          >
            <Menu mode="inline">
              <Menu.Item key="register">
                <Button
                  type="primary"
                  block
                >
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
          <Space
            align="center"
            style={{ marginLeft: '50px' }}
          >
            <Button type="text">
              <Link href="/dashboard">Switch to selling</Link>
            </Button>
            <Button type="text">
              <Link href="/places">Places</Link>
            </Button>
          </Space>
          <Space className="st-push">
            {isAuthorized ? (
              <>
                <Button type="text">
                  <Link href="/my-events">My Events</Link>
                </Button>

                {/* <Button type="text">Messages</Button> */}
                <Dropdown
                  trigger={['click']}
                  overlay={UserMenu}
                >
                  <div className={styles['avatar-wrapper']}>
                    <AvatarSection user={user} />
                  </div>
                </Dropdown>
              </>
            ) : (
              <>
                <Button type="text">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  ghost={!isTransparent}
                  type="primary"
                >
                  <Link href="/register">Join Us</Link>
                </Button>
              </>
            )}
          </Space>
        </>
      )}
    </div>
  );
};

export default Navbar;
