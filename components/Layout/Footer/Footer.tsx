import { Col, Row } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './Footer.module.less';

export type FooterProps = React.ComponentProps<'div'>;

export const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  return (
    <footer
      {...props}
      className={classNames('st-container', styles.footer)}
    >
      <Row>
        <Col
          lg={9}
          span={24}
        >
          <Image
            src="/shootlet-light.png"
            layout="intrinsic"
            width={140}
            height={50}
            alt=""
            objectFit="contain"
          />
        </Col>
        <Col
          lg={5}
          span={24}
        >
          text 1
        </Col>
        <Col
          lg={5}
          span={24}
        >
          text 2
        </Col>
        <Col
          lg={5}
          span={24}
        >
          text 3
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
