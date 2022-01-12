import { Button, Table, Col, Form, Row, Space, message, Modal } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import UserSelect from '../../components/UserSelect/UserSelect';
import { AdminBase } from '../../components/templates';
import UserSelect from '../../components/UserSelect/UserSelect';

interface FormValues {
  email: string;
  password: string;
}

const defaultValues = {
  color: '#000000',
  enabled: true,
};

const apiEndpoint = '/api/admin';

export default function Admins() {
  const [data, setData] = useState<any>([]);
  const [formStatus, setFormStatus] = useState<'Create' | null>(null);
  const [initialValues, setInitials] = useState<any>(null);
  const [form] = Form.useForm<FormValues>();
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    axios(apiEndpoint).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
    setShouldUpdate(false);
  }, [formStatus, shouldUpdate]);

  useEffect(() => {
    form.resetFields();
  }, [form, initialValues]);

  return (
    <AdminBase
      title="Admins"
      selectedKey="admins"
      openKey="user"
    >
      <Row gutter={20}>
        <Col span={14}>
          <div
            className="st-fill-horizontal"
            style={{
              display: 'flex',
              justifyContent: 'end',
              padding: '10px 0',
            }}
          >
            <Button
              disabled={formStatus !== null}
              onClick={() => {
                setFormStatus('Create');
                setInitials(defaultValues);
              }}
              className="st-push"
              type="primary"
            >
              Add Admin
            </Button>
          </div>
          <Table
            columns={[
              {
                title: 'Username',
                dataIndex: 'user',
                render: (user) => user.username,
              },
              {
                title: 'Action',
                dataIndex: '_id',
                render: (id) => (
                  <Space>
                    <Button
                      size="small"
                      onClick={() => {
                        handleDeleteClick(id);
                      }}
                    >
                      Delete
                    </Button>
                  </Space>
                ),
              },
            ]}
            rowKey={(record: any) => record._id}
            dataSource={data}
          />
        </Col>
        <Col
          span={9}
          offset={1}
        >
          {formStatus !== null ? (
            <>
              <h2 style={{ margin: 'auto', paddingBottom: '20px' }}>
                {formStatus}
              </h2>
              <Form
                labelCol={{ span: 6 }}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={initialValues}
                form={form}
              >
                <Form.Item
                  required
                  label="Username"
                  name="user"
                >
                  <UserSelect />
                </Form.Item>

                <Space>
                  <Button
                    onClick={() => {
                      setFormStatus(null);
                      setInitials(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    htmlType="submit"
                    type="primary"
                  >
                    Save
                  </Button>
                </Space>
              </Form>
            </>
          ) : (
            <h3>Nothing selected</h3>
          )}
        </Col>
      </Row>
    </AdminBase>
  );

  async function handleFinish(values: FormValues) {
    try {
      if (formStatus === 'Create') {
        await axios.post(apiEndpoint, values);
        message.success('Admin added successfully');
      }
      setFormStatus(null);
      setInitials(null);
    } catch (error) {
      message.error('Some error occured');
    }
  }

  async function handleDeleteClick(id: string) {
    Modal.confirm({
      content: (
        <>
          Admin{' '}
          <b>
            {data.find((x: any) => x._id === id).user.username}
          </b> will be deleted.
        </>
      ),
      okText: 'Submit',
      async onOk() {
        try {
          await axios.delete(`${apiEndpoint}/${id}`);
          setShouldUpdate(true);
          setFormStatus(null);
          message.success('Admin deleted!');
        } catch {
          message.error('Some error occured');
        }
      },
    });
  }
}
