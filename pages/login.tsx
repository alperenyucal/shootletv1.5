import { Alert, Button, Col, Form, Input, Row } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface FormValues {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const [form] = Form.useForm<FormValues>();
  const breakpoint = useBreakpoint();

  const [loginError, setLoginError] = useState(false);

  return (
    <>
      <Row>
        <span className={breakpoint.xl ? 'arc-push' : undefined}>
          Not a member?{' '}
          <b>
            <Link href="/register">Register</Link>
          </b>
        </span>
      </Row>
      <Row
        style={{
          paddingTop: breakpoint.xl ? 0 : '20px',
          height: breakpoint.xl ? '100%' : undefined,
        }}
        align="middle"
      >
        <Col offset={breakpoint.xl ? 5 : 0} span={24} xl={14}>
          <h1>Sign In</h1>
          <Form
            form={form}
            name="login-form"
            layout="vertical"
            onFinish={handleFinish}
          >
            {loginError && (
              <Alert
                closable={loginError}
                onClose={() => {
                  setLoginError(false);
                }}
                message="Wrong username or password"
                type="error"
                style={{ marginBottom: '20px' }}
              />
            )}
            <Form.Item
              label="Username"
              name="username"
              rules={[{ message: 'Please enter your username!' }]}
            >
              <Input placeholder="Username" size="large" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ message: 'Please enter your password!' }]}
            >
              <Input type="password" placeholder="Password" size="large" />
            </Form.Item>
            <Row>
              <Link href="/forgot-password">Forgot Password?</Link>
              <div className="arc-push">
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      disabled={
                        !form.isFieldsTouched(true) ||
                        !!form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  )}
                </Form.Item>
              </div>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );

  async function handleFinish({ username, password }: FormValues) {
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      if (router.query.ref) router.push('/' + router.query.ref.toString());
      else router.push('/');
    } catch (error) {
      setLoginError(true);
    }
  }
}
