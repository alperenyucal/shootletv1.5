import styles from './AuthForm.module.less';

import { Col, Row } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import classNames from 'classnames';
import { useLayout } from '../../hooks/layout';

interface AuthFormProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export const AuthForm: React.FC<AuthFormProps> = ({ header, children }) => {
  const breakpoint = useBreakpoint();

  useLayout({
    header: { show: false },
    navbar: { show: false },
    footer: { show: false },
  });

  return (
    <div
      className={classNames(styles.authForm, {
        'st-gradient-2': !breakpoint.lg,
      })}
    >
      {!breakpoint.lg && (
        <Link href="/" passHref>
          <div>
            <Image
              src="/shootlet-light.png"
              layout="intrinsic"
              width={200}
              height={60}
              alt=""
              objectFit="contain"
            />
          </div>
        </Link>
      )}
      <Row className={styles.formCard}>
        {breakpoint.lg && (
          <Col
            span={12}
            className={classNames(
              styles.column,
              styles.leftColumn,
              'st-gradient-2',
            )}
          >
            <Link href="/" passHref>
              <div>
                <Image
                  src="/shootlet-light.png"
                  layout="intrinsic"
                  width={140}
                  height={50}
                  alt=""
                  objectFit="contain"
                />
              </div>
            </Link>
            <h2 className={styles.welcomeHeading}>{'Welcome'}</h2>
          </Col>
        )}
        <Col lg={12} span={24} className={styles.column}>
          <Row justify="end">{header}</Row>
          <Row
            style={{
              paddingTop: breakpoint.lg ? 0 : '20px',
              height: breakpoint.lg ? '100%' : undefined,
            }}
            align="middle"
            justify="center"
          >
            <Col span={24} lg={20} xl={16}>
              {children}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
