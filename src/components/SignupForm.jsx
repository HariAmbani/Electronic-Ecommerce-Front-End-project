import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Select, notification, Upload } from "antd";

const { Option } = Select;

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const SignupForm = ({ switchToLoginTab, clearForm }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      setUploadedFile(newFileList[0].originFileObj);
    } else {
      setUploadedFile(null);
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("fullname", values.fullname);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("state", values.state);
    formData.append("password", values.password);

    if (uploadedFile) {
      formData.append("profilePhotoName", uploadedFile.name);
      formData.append("profilePhoto", uploadedFile);
    }

    try {
      const response = await fetch("http://localhost:3015/users/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        notification.success({
          message: "Account Created",
          description: `${values.username}, your account has been successfully created.`,
          placement: "top",
          duration: 4,
        });

        // Reset the form fields after successful signup
        form.resetFields();

        // Switch to login tab
        if (switchToLoginTab) {
          switchToLoginTab();
        }

        // Call clearForm if provided (optional for additional state clearing)
        if (clearForm) {
          clearForm();
        }
      } else {
        notification.error({
          message: "Signup Failed",
          description: data.message || "Email already exists",
          placement: "topLeft",
          duration: 4,
        });
      }
    } catch (error) {
      notification.error({
        message: "Server Error",
        description: "Error while creating user. Check console for more info.",
        placement: "topLeft",
        duration: 4,
      });
      console.error("Fetch error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="signup"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 32 }}
      style={{ maxWidth: 1600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form} // Pass the form instance here
    >
      <Form.Item
        label="Full Name"
        name="fullname"
        rules={[{ required: true, message: "Please input your full name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input a username!" }, { min: 4, message: "Username must be at least 4 characters long." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }, { type: "email", message: "Please enter a valid email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input your phone number!" }, { pattern: /^[6-9]\d{9}$/, message: "Please enter a valid 10-digit Indian phone number!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="State"
        name="state"
        rules={[{ required: true, message: "Please select your state!" }]}
      >
        <Select placeholder="Select your state">
          {indianStates.map((state) => (
            <Option key={state} value={state}>
              {state}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }, { min: 6, message: "Password must be at least 6 characters!" }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[{ required: true, message: "Please confirm your password!" }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue("password") === value) { return Promise.resolve(); } return Promise.reject(new Error("Passwords do not match!")); } })]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="File upload"
        name="file"
        rules={[{ required: true, message: "Please upload a profile picture!" }]}
        valuePropName="fileList"
        getValueFromEvent={(e) => { if (Array.isArray(e)) return e; return e && e.fileList; }}
      >
        <Upload fileList={fileList} onChange={handleUpload} beforeUpload={() => false}>
          <Button>Upload profile picture</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;




// you may need
// const response = await fetch("http://localhost:3015/users/create", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(values),
// });