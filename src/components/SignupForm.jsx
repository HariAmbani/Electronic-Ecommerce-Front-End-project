import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = async (values) => {
  try {
    const response = await fetch("http://localhost:3015/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const text = await response.text();

    if (response.ok) {
      alert(`${values.username} your account has been successfully created`);
      console.log("Server response:", text);
    } else {
      alert("Failed to create user");
      console.error("Server error:", text);
    }

    console.log("Success:", values);
  } catch (error) {
    alert("Error while creating user : ",error);
    console.error("Fetch error:", error);
  }
};


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const SignupForm = () => (
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
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email ',
        },
      ]}
    >
        
      <Input type="email"/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
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
        Signup
      </Button>
    </Form.Item>
  </Form>
);
export default SignupForm;