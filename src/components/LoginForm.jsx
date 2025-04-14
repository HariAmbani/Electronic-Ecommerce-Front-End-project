import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { AuthContext } from '../Context/AuthContext'

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');

const onFinish = async (values) => {
  const response = await fetch("http://localhost:3015/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (response.ok) {
    const { token, user } = await response.json(); // Get user data from response
    Object.entries(user).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    login(user); // Assuming this updates context
  } else {
    alert("Invalid credentials, check username and password");
  }
};


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        validateStatus={error ? 'error' : ''}
        help={error}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;