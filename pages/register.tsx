import { Button, Checkbox, Form, Input } from 'antd';
// import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { AuthForm } from '../components/templates';

const Register: NextPage = () => {
  // const router = useRouter();

  return (
    <AuthForm
      header={
        <span>
          {'Already Have an Account? '}
          <b>
            <Link href="/login">Sign In</Link>
          </b>
        </span>
      }
    >
      <h1>Register</h1>

      <Form
        requiredMark={false}
        layout="vertical"
        name="register"
        // onFinish={onFinish}
        validateTrigger={['onBlur', 'onChange', 'onSubmit']}
      >
        <Form.Item name="email">
          <Input
            size="large"
            placeholder="Email"
            autoComplete="nope"
          />
        </Form.Item>
        <Form.Item>
          <Input
            size="large"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item name="confirm">
          <Input
            size="large"
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
        >
          <Checkbox>
            I Have Read <Link href="#">Terms of Service</Link>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </AuthForm>
  );
};

export default Register;
