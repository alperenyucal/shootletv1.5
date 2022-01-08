import { CalendarOutlined, CameraOutlined, EnvironmentOutlined, UserOutlined }
  from '@ant-design/icons';
import { Menu, PageHeader } from 'antd';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useLayout } from '../../../lib/hooks/layout';
import styles from './AdminBase.module.less';
import { LoadingScreen } from '..';
import Error404 from '../../../pages/404';

interface AdminBaseProps {
  children?: React.ReactNode;
  // selectedKey?: string;
  // openKey?: string;
  onBack?: () => void;
  routes?: [];
  subtitle?: string;
  title?: string;
}

export function AdminBase({
  children,
  // selectedKey,
  // openKey,
  onBack,
  routes,
  subtitle,
  title,
}: AdminBaseProps) {
  const [isAdmin, setAdmin] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useLayout({
    navbar: { show: false },
    header: { show: false },
    footer: { show: false },
  });

  useEffect(() => {
    axios('/api/admin/isAdmin')
      .then((res) => {
        setAdmin(res.data.isAdmin);
      })
      .catch(() => {
        setAdmin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!isAdmin) return <Error404 />;

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Layout style={{ minHeight: '100vh' }}>
            <Header className="header"></Header>
            <Layout>
              <Sider
                width={200}
                className="site-layout-background"
              >
                <Menu >
                  <SubMenu
                    key="user"
                    icon={<UserOutlined />}
                    title="User"
                  >
                    <Menu.Item
                      key="users"
                      disabled
                    >
                      <Link href="/admin/users">Users</Link>
                    </Menu.Item>
                    <Menu.Item key="admins">
                      <Link href="/admin/admins">Admins</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="event"
                    icon={<CalendarOutlined />}
                    title="Event"
                  >
                    <Menu.Item key="eventTypes">
                      <Link href="/admin/eventTypes">Event Types</Link>
                    </Menu.Item>
                    <Menu.Item
                      key="userEvents"
                      disabled
                    >
                      <Link href="/admin/userEvents">User Events</Link>
                    </Menu.Item>
                    <Menu.Item
                      key="offers"
                      disabled
                    >
                      <Link href="/admin/offers">Offers</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="service"
                    icon={<CameraOutlined />}
                    title="Service"
                  >
                    <Menu.Item key="serviceTypes">
                      <Link href="/admin/serviceTypes">Service Types</Link>
                    </Menu.Item>
                    <Menu.Item key="services">
                      <Link href="/admin/services">Services</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="location"
                    icon={<EnvironmentOutlined />}
                    title="Location"
                  >
                    <Menu.Item key="countries">
                      <Link href="/admin/countries">Countries</Link>
                    </Menu.Item>
                    <Menu.Item key="cities">
                      <Link href="/admin/cities">Cities</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout
                className={styles.layout}

              >
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <PageHeader
                    title={title}
                    breadcrumb={{ routes }}
                    subTitle={subtitle}
                    onBack={onBack}
                  />
                  {children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </>
      )}
    </>
  );
}
