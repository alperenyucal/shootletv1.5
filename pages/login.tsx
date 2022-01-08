import styles from '../styles/pages/login.module.less';
import { Alert, Button, Form, Input, Row } from 'antd';
import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AuthForm } from '../components/templates';
import { useAppDispatch } from '../lib/hooks/redux';
import { login } from '../lib/redux/auth/authSlice';

interface FormValues {
  email: string;
  password: string;
}


const Login: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm<FormValues>();

  const [loginError, setLoginError] = useState(false);

  return (
    <AuthForm
      header={
        <span>
          Not a member?{' '}
          <b>
            <Link href="/register">Register</Link>
          </b>
        </span>
      }
    >
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
            message="Wrong email or password"
            type="error"
            style={{ marginBottom: '20px' }}
          />
        )}
        <Form.Item
          name="email"
          rules={[{ message: 'Please enter your email!' }]}
        >
          <Input
            placeholder="email"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ message: 'Please enter your password!' }]}
        >
          <Input
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Row
          justify="center"
          className={styles.submitRow}
        >
          <Link href="/forgot-password">Forgot Password?</Link>
          <Button
            type="primary"
            htmlType="submit"
            className="st-push"
          >
            Submit
          </Button>
        </Row>
      </Form>
    </AuthForm>
  );

  async function handleFinish({ email, password }: FormValues) {
    try {
      const res = await axios.post(
        '/api/auth/login', { email, password });
      console.log(res);

      dispatch(login(res.data));
      if (router.query.ref) router.push('/' + router.query.ref.toString());
      else router.push('/');
    } catch (error) {
      setLoginError(true);
    }
  }
};

export default Login;
