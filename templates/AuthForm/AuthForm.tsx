import styles from './AuthForm.module.less';

import { Col, Row } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { Page } from '../../components';
import classNames from 'classnames';

interface AuthFormProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export const AuthForm: React.FC<AuthFormProps> = ({ header, children }) => {
  const breakpoint = useBreakpoint();

  return (
    <Page className={classNames(breakpoint.md ? null : 'st-gradient')}>
      {!breakpoint.md && (
        <Link href="/" passHref>
          <Image
            src="/shootlet-light.png"
            layout="intrinsic"
            width={200}
            height={60}
            alt=""
            objectFit="cover"
          />
        </Link>
      )}
      <Row className={styles.formCard}>
        {breakpoint.md && (
          <Col
            span={12}
            className={classNames(
              styles.column,
              styles.leftColumn,
              'st-gradient',
            )}
          >
            <Link href="/" passHref>
              <Image
                src="/shootlet-light.png"
                layout="intrinsic"
                width={140}
                height={50}
                alt=""
                objectFit="contain"
              />
            </Link>
            <h2 className={styles.welcomeHeading}>
              {'Welcome' /* t("main:Welcome to React") */}
            </h2>
          </Col>
        )}
        <Col md={12} span={24} className={styles.column}>
          <Row justify="end">{header}</Row>
          <Row
            style={{
              paddingTop: breakpoint.md ? 0 : '20px',
              height: breakpoint.md ? '100%' : undefined,
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
    </Page>
  );
};
