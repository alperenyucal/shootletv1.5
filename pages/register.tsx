import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AuthForm } from '../components/templates';
import { useAppDispatch } from '../lib/hooks/redux';
import { login } from '../lib/redux/auth/authSlice';
import { passwordValidator, usernameValidator } from '../lib/utils/validators';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  confirmPassword: string;
  password: string;
}


const Register: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [t] = useTranslation();

  const [form] = Form.useForm<FormValues>();


  return (
    <AuthForm
      header={
        <span>
          {t('auth:Form.Text.AlreadyHaveAccount')}{' '}
          <b>
            <Link href="/login">{t('auth:SignIn')}</Link>
          </b>
        </span>
      }
    >
      <h1>{t('auth:Register')}</h1>

      <Form
        form={form}
        requiredMark={false}
        layout="vertical"
        name="register"
        onFinish={handleFinish}
        validateTrigger={['onBlur', 'onChange', 'onSubmit']}
      >
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name="firstname"
              rules={[{
                validateTrigger: 'onBlur',
                validator: (_, username) =>
                  usernameValidator.validateAsync(username),
              }]}
            >
              <Input
                size="large"
                placeholder={t('auth:Form.Labels.Firstname')}
                autoComplete="nope"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
            >
              <Input
                size="large"
                placeholder={t('auth:Form.Labels.Lastname')}
                autoComplete="nope"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="email"
          rules={[{
            validateTrigger: 'onSubmit',
            validator: async (_, email) => {
              const res = await axios.post('api/auth/check-email', {
                email,
              });

              return !res.data.userExists ?
                Promise.resolve() :
                Promise.reject(
                  new Error(t('auth:Form.Messages.EmailIsInUse')),
                );
            },
          }]}
        >
          <Input
            size="large"
            placeholder="Email"
            autoComplete="nope"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{
            validator: (_, password) =>
              passwordValidator.validateAsync(password),
          }]}
          hasFeedback
        >
          <Input
            size="large"
            type="password"
            placeholder={t('auth:Form.Labels.Password')}
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t('auth:Form.Messages.PasswordsDontMatch')),
                );
              },
            }),
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder={t('auth:Form.Labels.ConfirmPassword')}
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[{
            validateTrigger: 'onSubmit',
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(
                new Error(t('auth:Form.Messages.CheckAgreement')),
              ),
          }]}
        >
          <Checkbox>
            {t('auth:Form.Text.IHaveRead')}{' '}
            <Link href="/">
              {t('auth:Form.Text.TermsofService')}
            </Link>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            {t('auth:Register')}
          </Button>
        </Form.Item>
      </Form>
    </AuthForm>
  );

  async function handleFinish({ email, password, ...rest }: FormValues) {
    try {
      await axios.post('/api/auth/register', {
        email,
        password,
        ...rest,
      });
      const res = await axios.post('/api/auth/login', {
        email,
        password,
      });

      dispatch(login(res.data));

      if (router.query.ref) router.push('/' + router.query.ref.toString());
      else router.push('/');
    } catch (error) {
    }
  }
};


export default Register;
