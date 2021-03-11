import styled from '@emotion/styled';
import { Form, Input, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { login } from '../../store/modules/user';

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
  padding-top: 40px;
`;

export interface LoginFormValues {
  userName: string;
  password: string;
}
const initialValues: LoginFormValues = {
  userName: '',
  password: '',
};
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const Login: React.FC = () => {
  const [form] = useForm<LoginFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  async function onFinish(values: LoginFormValues) {
    try {
      setIsSubmitting(true);
      await dispatch(login(values));
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Container>
      <Form
        {...layout}
        name="basic"
        initialValues={initialValues}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="用户名"
          name="userName"
          rules={[{ required: true, message: '输入用户名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={isSubmitting}>
          登陆
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
